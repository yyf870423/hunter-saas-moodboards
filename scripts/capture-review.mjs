import { chromium } from "@playwright/test";
import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";

const baseUrl = process.env.REVIEW_BASE_URL || "http://127.0.0.1:4173/hunter-saas-moodboards/";
const output = process.env.REVIEW_OUTPUT || "/tmp/hunter-moodboard-review";
const boards = [
  "precision-desk", "editorial-intelligence", "talent-constellation", "calm-focus", "command-center",
  "human-studio", "bauhaus-workflow", "data-atelier", "kinetic-blueprint", "adaptive-modules",
  "kinetic-ledger", "physical-telemetry", "institutional-trust", "ai-state-atlas", "expedition-search",
  "compile-workshop", "guided-service", "teamwork-fabric", "pattern-library", "digital-curatorial",
];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const profiles = [
  { name: "desktop", viewport: { width: 1440, height: 900 }, views: ["components", "motion"], thumbHeight: 430 },
  { name: "iphone", viewport: { width: 390, height: 844 }, views: ["main", "components", "motion"], thumbHeight: 620 },
];

for (const profile of profiles) {
  for (const view of profile.views) {
    const page = await browser.newPage({ viewport: profile.viewport, deviceScaleFactor: 1 });
    const suffix = view === "main" ? "" : `${view}.html`;
    for (const board of boards) {
      await page.goto(`${baseUrl}boards/${board}/${suffix}`, { waitUntil: "networkidle" });
      await page.screenshot({ path: join(output, `${profile.name}-${view}-${board}.png`), fullPage: true });
    }
    await page.close();

    const cards = [];
    for (const board of boards) {
      const png = await readFile(join(output, `${profile.name}-${view}-${board}.png`));
      cards.push(`<figure><figcaption>${board}</figcaption><img src="data:image/png;base64,${png.toString("base64")}"></figure>`);
    }
    const contactPage = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 1 });
    await contactPage.setContent(`<style>html{background:#111;color:#fff;font:12px Arial}body{margin:20px;display:grid;grid-template-columns:repeat(${profile.name === "iphone" ? 4 : 2},1fr);gap:16px}figure{margin:0;background:#222;padding:8px}figcaption{padding:3px 0 8px}img{display:block;width:100%;height:${profile.thumbHeight}px;object-fit:cover;object-position:top}</style>${cards.join("")}`);
    await contactPage.screenshot({ path: join(output, `${profile.name}-${view}-contact-sheet.png`), fullPage: true });
    await contactPage.close();
  }
}

await browser.close();
console.log(output);
