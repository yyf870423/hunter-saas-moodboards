import { chromium } from "@playwright/test";
import { mkdirSync, rmSync } from "node:fs";
import { boards } from "../src/data/boards.js";

const baseUrl = process.env.MOODBOARD_BASE_URL || "http://127.0.0.1:4173/hunter-saas-moodboards";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
rmSync("public/previews", { recursive: true, force: true });
mkdirSync("public/previews", { recursive: true });

for (const board of boards) {
  await page.goto(`${baseUrl}/boards/${board.slug}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: `public/previews/${board.slug}.png`, fullPage: false });
  process.stdout.write(`captured ${board.slug}\n`);
}

await browser.close();
