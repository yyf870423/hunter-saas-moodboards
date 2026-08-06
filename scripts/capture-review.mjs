import { chromium } from "@playwright/test";
import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { boards, viewMeta } from "../src/data/boards.js";

const baseUrl = process.env.REVIEW_BASE_URL || "http://127.0.0.1:4173/hunter-saas-moodboards/";
const output = process.env.REVIEW_OUTPUT || "/tmp/hunter-moodboard-review";
const fullMatrix = process.env.REVIEW_FULL === "1";
const profiles = fullMatrix
  ? [
      { name: "desktop", viewport: { width: 1440, height: 900 } },
      { name: "ipad", viewport: { width: 834, height: 1194 } },
      { name: "iphone", viewport: { width: 390, height: 844 } },
    ]
  : [{ name: "desktop", viewport: { width: 1440, height: 900 } }];
const themes = ["light", "dark"];
const views = Object.keys(viewMeta);

function route(board, view, theme) {
  const suffix = view === "main" ? "" : viewMeta[view].file;
  return `${baseUrl}boards/${board}/${suffix}?theme=${theme}`;
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const profile of profiles) {
  const page = await browser.newPage({ viewport: profile.viewport, deviceScaleFactor: 1 });
  for (const board of boards) {
    for (const theme of themes) {
      for (const view of views) {
        const name = `${profile.name}-${board.slug}-${theme}-${view}.png`;
        await page.goto(route(board.slug, view, theme), { waitUntil: "networkidle" });
        await page.screenshot({ path: join(output, name), fullPage: true });
      }

      const cards = [];
      for (const view of views) {
        const png = await readFile(join(output, `${profile.name}-${board.slug}-${theme}-${view}.png`));
        cards.push(`<figure><figcaption>${viewMeta[view].short}</figcaption><img src="data:image/png;base64,${png.toString("base64")}"></figure>`);
      }
      const sheet = await browser.newPage({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 });
      await sheet.setContent(`<style>html{background:#0c0d0f;color:#fff;font:12px Inter,Arial}body{margin:18px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px}figure{margin:0;padding:7px;background:#17191d;border:1px solid #30333a}figcaption{padding:3px 2px 8px}img{display:block;width:100%;height:390px;object-fit:cover;object-position:top}</style>${cards.join("")}`);
      await sheet.screenshot({ path: join(output, `${profile.name}-${board.slug}-${theme}-contact-sheet.png`), fullPage: true });
      await sheet.close();
    }
  }
  await page.close();
}

await browser.close();
console.log(`${output} (${profiles.length * boards.length * themes.length * views.length} screenshots)`);
