import { chromium } from "@playwright/test";
import { mkdir, readFile, rm } from "node:fs/promises";
import { join } from "node:path";
import { boards, viewMeta } from "../src/data/boards.js";

const baseUrl = process.env.REVIEW_BASE_URL || "http://127.0.0.1:4173/hunter-saas-moodboards/";
const output = process.env.REVIEW_OUTPUT || "/tmp/hunter-moodboard-overlays";
const prefixes = {
  "precision-desk": "opsx", "command-center": "cmdx", "human-studio": "clix",
  "kinetic-blueprint": "jnlx", "physical-telemetry": "inbx", "institutional-trust": "wbx",
  "expedition-search": "rsx", "guided-service": "cpx", "teamwork-fabric": "oppx",
  "pattern-library": "dcx",
};

function toolbarSelector(board) {
  const prefix = prefixes[board];
  return ["toolbar", "listbar", "searchbar", "filters", "dbbar", "filterrail"]
    .map((name) => `.${prefix}-${name} button`)
    .join(",");
}

function route(board) {
  return `${baseUrl}boards/${board}/${viewMeta.list.file}?theme=light`;
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const cards = [];

for (const board of boards) {
  await page.goto(route(board.slug), { waitUntil: "networkidle" });
  await page.locator(toolbarSelector(board.slug)).first().click();
  await page.getByRole("menu").waitFor();
  const menuPath = join(output, `${board.slug}-menu.png`);
  await page.screenshot({ path: menuPath });

  await page.getByRole("menu").locator("button").first().click();
  await page.locator("header button.primary").first().click();
  await page.getByRole("dialog").waitFor();
  const modalPath = join(output, `${board.slug}-modal.png`);
  await page.screenshot({ path: modalPath });

  for (const [label, path] of [["下拉菜单", menuPath], ["新增 Modal", modalPath]]) {
    const png = await readFile(path);
    cards.push(`<figure><figcaption>${board.name} · ${label}</figcaption><img src="data:image/png;base64,${png.toString("base64")}"></figure>`);
  }
}

const sheet = await browser.newPage({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1 });
await sheet.setContent(`<style>html{background:#0c0d0f;color:#fff;font:12px Inter,Arial}body{margin:18px;display:grid;grid-template-columns:repeat(2,1fr);gap:14px}figure{margin:0;padding:7px;background:#17191d;border:1px solid #30333a}figcaption{padding:3px 2px 8px}img{display:block;width:100%;height:430px;object-fit:cover;object-position:top}</style>${cards.join("")}`);
await sheet.screenshot({ path: join(output, "overlay-contact-sheet.png"), fullPage: true });
await browser.close();
console.log(`${output} (${cards.length} overlay states)`);
