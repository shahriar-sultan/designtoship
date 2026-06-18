import { chromium, type Page } from "@playwright/test";
import { spawn, type ChildProcess } from "child_process";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";

const BASE_URL = "http://localhost:3000";
const SCREENSHOT_DIR = path.join(process.cwd(), "scripts", ".visual-check-output");

interface SectionDef {
  name: string;
  selector: string;
}

interface CheckFailure {
  section: string;
  check: string;
  detail: string;
}

const SECTIONS: SectionDef[] = [
  { name: "hero", selector: "section.bg-landing-bg" },
  { name: "course-outline", selector: "#course-outline" },
  { name: "the-shift", selector: "#the-shift" },
  { name: "what-you-learn", selector: "#what-you-learn" },
  { name: "curriculum", selector: "#curriculum" },
  { name: "how-it-works", selector: "#how-it-works" },
  { name: "who-is-this-for", selector: "#who-is-this-for" },
  { name: "instructor", selector: "#instructor" },
  { name: "pricing", selector: "#pricing" },
  { name: "faq", selector: "#faq" },
  { name: "footer", selector: "footer" },
];

function parseRgb(color: string): [number, number, number] | null {
  const hex = color.match(/^#([0-9a-f]{6})$/i);
  if (hex) {
    const n = parseInt(hex[1], 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const rgb = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
  return null;
}

function isPureWhite(rgb: [number, number, number]): boolean {
  return rgb[0] === 255 && rgb[1] === 255 && rgb[2] === 255;
}

async function waitForServer(url: string, timeoutMs = 120_000): Promise<void> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      await new Promise<void>((resolve, reject) => {
        const req = http.get(url, (res) => {
          res.resume();
          if (res.statusCode && res.statusCode < 500) resolve();
          else reject(new Error(`Status ${res.statusCode}`));
        });
        req.on("error", reject);
        req.setTimeout(3000, () => {
          req.destroy();
          reject(new Error("timeout"));
        });
      });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error(`Server did not respond at ${url} within ${timeoutMs}ms`);
}

function startDevServer(): ChildProcess {
  return spawn("npm", ["run", "dev"], {
    cwd: process.cwd(),
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: "3000" },
  });
}

async function checkContrast(page: Page, section: string): Promise<CheckFailure[]> {
  const issues = await page.evaluate(() => {
    const results: { tag: string; text: string; color: string; bg: string }[] = [];

    const getEffectiveBg = (el: Element): string => {
      let node: Element | null = el;
      while (node) {
        const bg = getComputedStyle(node).backgroundColor;
        if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") return bg;
        node = node.parentElement;
      }
      return "rgb(255, 255, 255)";
    };

    const textEls = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a, button, li, label");
    textEls.forEach((el) => {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") return;
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const color = style.color;
      const bg = getEffectiveBg(el);
      results.push({
        tag: el.tagName,
        text: (el.textContent ?? "").slice(0, 40),
        color,
        bg,
      });
    });
    return results;
  });

  const failures: CheckFailure[] = [];
  for (const issue of issues) {
    const textRgb = parseRgb(issue.color);
    const bgRgb = parseRgb(issue.bg);
    if (textRgb && bgRgb && isPureWhite(textRgb) && isPureWhite(bgRgb)) {
      failures.push({
        section,
        check: "contrast",
        detail: `${issue.tag} "${issue.text}" has #ffffff text on #ffffff background`,
      });
    }
  }
  return failures;
}

async function checkHorizontalOverflow(page: Page, section: string): Promise<CheckFailure[]> {
  const { overflows, viewportWidth } = await page.evaluate(() => {
    const vw = window.innerWidth;
    const bad: { tag: string; className: string; width: number }[] = [];
    document.querySelectorAll("*").forEach((el) => {
      const htmlEl = el as HTMLElement;
      if (htmlEl.offsetWidth > vw + 1) {
        bad.push({
          tag: htmlEl.tagName,
          className: htmlEl.className?.toString?.() ?? "",
          width: htmlEl.offsetWidth,
        });
      }
    });
    return { overflows: bad, viewportWidth: vw };
  });

  return overflows.slice(0, 5).map((o) => ({
    section,
    check: "horizontal-overflow",
    detail: `<${o.tag}${o.className ? `.${o.className.split(" ")[0]}` : ""}> width ${o.width}px > viewport ${viewportWidth}px`,
  }));
}

async function runChecks(page: Page): Promise<CheckFailure[]> {
  const failures: CheckFailure[] = [];

  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(2500);

  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, "full-page.png"),
    fullPage: true,
  });

  failures.push(...(await checkContrast(page, "full-page")));
  failures.push(...(await checkHorizontalOverflow(page, "full-page")));

  for (const section of SECTIONS) {
    const el = page.locator(section.selector).first();
    const count = await el.count();
    if (count === 0) {
      failures.push({
        section: section.name,
        check: "section-missing",
        detail: `Selector not found: ${section.selector}`,
      });
      continue;
    }

    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);

    const screenshotPath = path.join(SCREENSHOT_DIR, `${section.name}.png`);
    await el.screenshot({ path: screenshotPath });

    failures.push(...(await checkContrast(page, section.name)));
    failures.push(...(await checkHorizontalOverflow(page, section.name)));
  }

  return failures;
}

function printReport(failures: CheckFailure[]): void {
  if (failures.length === 0) {
    console.log("\n✅ All visual checks passed.");
    console.log(`Screenshots saved to ${SCREENSHOT_DIR}`);
    return;
  }

  console.log(`\n❌ ${failures.length} visual check failure(s):\n`);
  for (const f of failures) {
    console.log(`  [${f.section}] ${f.check}: ${f.detail}`);
  }
  console.log(`\nScreenshots saved to ${SCREENSHOT_DIR}`);
}

async function main(): Promise<void> {
  const devServer = startDevServer();
  let exitCode = 0;

  const onOutput = (chunk: Buffer) => {
    const text = chunk.toString();
    if (text.includes("Error") || text.includes("error")) process.stderr.write(text);
  };
  devServer.stdout?.on("data", onOutput);
  devServer.stderr?.on("data", onOutput);

  try {
    console.log("Waiting for dev server...");
    await waitForServer(BASE_URL);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    const failures = await runChecks(page);
    printReport(failures);

    await browser.close();

    if (failures.length > 0) exitCode = 1;
  } finally {
    devServer.kill("SIGTERM");
  }

  process.exit(exitCode);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
