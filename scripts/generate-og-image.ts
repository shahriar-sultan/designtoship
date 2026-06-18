import { chromium } from "@playwright/test";
import * as http from "http";
import * as path from "path";

const BASE_URL = process.env.OG_BASE_URL ?? "http://localhost:3000";
const OUTPUT_PATH = path.join(process.cwd(), "app", "opengraph-image.png");
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

async function waitForServer(url: string, timeoutMs = 60_000): Promise<void> {
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
  throw new Error(
    `Server did not respond at ${url}. Start it first (npm run dev or npm run start).`,
  );
}

async function main(): Promise<void> {
  console.log(`Waiting for ${BASE_URL}...`);
  await waitForServer(BASE_URL);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({
    viewport: { width: OG_WIDTH, height: OG_HEIGHT },
    deviceScaleFactor: 2,
  });

  await page.goto(BASE_URL, { waitUntil: "networkidle" });
  await page.waitForSelector("section.bg-hero-tint");
  await page.waitForTimeout(1500);

  await page.screenshot({
    path: OUTPUT_PATH,
    type: "png",
    clip: { x: 0, y: 0, width: OG_WIDTH, height: OG_HEIGHT },
  });

  await browser.close();
  console.log(`OG image saved to ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
