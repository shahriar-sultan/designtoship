import { chromium, type Page } from "@playwright/test";
import { spawn, type ChildProcess } from "child_process";
import * as fs from "fs";
import * as http from "http";
import * as path from "path";
import { PNG } from "pngjs";

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
  { name: "hero", selector: '[data-particle-shape="scattered-cloud"]' },
  { name: "interstitial-burst", selector: '[data-particle-shape="burst"]' },
  { name: "problem", selector: "#problem" },
  { name: "interstitial-fragmented", selector: '[data-particle-shape="fragmented-scatter"]' },
  { name: "what-you-ship", selector: "#what-you-ship" },
  { name: "interstitial-galaxy", selector: '[data-particle-shape="galaxy"]' },
  { name: "curriculum", selector: "#curriculum" },
  { name: "interstitial-timeline", selector: '[data-particle-shape="timeline-dots"]' },
  { name: "how-it-works", selector: "#how-it-works" },
  { name: "interstitial-cursor", selector: '[data-particle-shape="cursor-hand"][data-interstitial="true"]' },
  { name: "tools", selector: "#tools" },
  { name: "interstitial-app-grid", selector: '[data-particle-shape="app-grid"]' },
  { name: "who-is-this-for", selector: "#who-is-this-for" },
  { name: "interstitial-ripple", selector: '[data-particle-shape="ripple-rings"]' },
  { name: "instructor", selector: "#instructor" },
  { name: "interstitial-rising", selector: '[data-particle-shape="rising-diagonal"]' },
  { name: "pricing", selector: "#pricing" },
  { name: "interstitial-rocket", selector: '[data-particle-shape="rocket-detailed"][data-interstitial="true"]' },
  { name: "faq", selector: "#faq" },
  { name: "interstitial-heartbeat", selector: '[data-particle-shape="heartbeat"]' },
  { name: "footer", selector: '[data-particle-shape="dispersing-pulse"]' },
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

function checkHeroVignette(pngBuffer: Buffer, section: string): CheckFailure[] {
  const png = PNG.sync.read(pngBuffer);
  const { width, height, data } = png;
  const cx = Math.floor(width / 2);
  const cy = Math.floor(height / 2);
  const radius = Math.min(width, height) * 0.12;

  let darkCount = 0;
  let sampleCount = 0;

  for (let y = Math.floor(cy - radius); y <= Math.floor(cy + radius); y += 4) {
    for (let x = Math.floor(cx - radius); x <= Math.floor(cx + radius); x += 4) {
      if (x < 0 || y < 0 || x >= width || y >= height) continue;
      const dx = x - cx;
      const dy = y - cy;
      if (dx * dx + dy * dy > radius * radius) continue;

      const i = (width * y + x) << 2;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      if (r < 50 && g < 50 && b < 60) darkCount++;
      sampleCount++;
    }
  }

  if (sampleCount === 0 || darkCount < Math.max(3, sampleCount * 0.15)) {
    return [
      {
        section,
        check: "hero-vignette",
        detail: `Center region lacks dark vignette cluster (${darkCount}/${sampleCount} dark pixels)`,
      },
    ];
  }
  return [];
}

async function checkParticleCanvas(page: Page, section: string): Promise<CheckFailure[]> {
  const result = await page.evaluate(async () => {
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));

    const container = document.querySelector('[aria-hidden="true"].fixed canvas');
    const canvas = container as HTMLCanvasElement | null;
    if (!canvas) return { exists: false, hasPixels: false, reason: "canvas element not found" };
    if (canvas.width === 0 || canvas.height === 0) {
      return { exists: true, hasPixels: false, reason: "canvas has zero dimensions" };
    }

    const dataUrl = canvas.toDataURL("image/png");
    if (!dataUrl || dataUrl.length < 500) {
      return { exists: true, hasPixels: false, reason: "canvas toDataURL is empty or too small" };
    }

    const base64 = dataUrl.split(",")[1] ?? "";
    const binary = atob(base64);
    let nonTransparent = 0;
    for (let i = 0; i < binary.length; i++) {
      if (binary.charCodeAt(i) !== 0) nonTransparent++;
    }

    return {
      exists: true,
      hasPixels: nonTransparent > 100,
      reason: nonTransparent > 100 ? "ok" : "canvas appears blank",
    };
  });

  if (!result.exists) {
    return [{ section, check: "particle-canvas", detail: result.reason }];
  }
  if (!result.hasPixels) {
    return [{ section, check: "particle-canvas", detail: result.reason }];
  }
  return [];
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
  failures.push(...(await checkParticleCanvas(page, "full-page")));

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

    if (section.name === "hero") {
      const heroBuffer = fs.readFileSync(screenshotPath);
      failures.push(...checkHeroVignette(heroBuffer, section.name));
    }
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
