import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";
import { boards } from "../src/data/boards.js";

const roots = {
  "precision-desk": [".qo-dashboard", ".qo-components"],
  "command-center": [".eb-dashboard", ".eb-components"],
  "human-studio": [".cr-dashboard", ".cr-components"],
  "kinetic-blueprint": [".tj-dashboard", ".tj-components"],
  "physical-telemetry": [".cd-dashboard", ".cd-components"],
  "institutional-trust": [".sg-dashboard", ".sg-components"],
  "expedition-search": [".ps-dashboard", ".ps-components"],
  "guided-service": [".cp-dashboard", ".cp-components"],
  "teamwork-fabric": [".ga-dashboard", ".ga-components"],
  "pattern-library": [".er-dashboard", ".er-components"],
};

const modalTriggers = {
  "precision-desk": "打开 Modal",
  "command-center": "打开确认 Modal",
  "human-studio": "确认服务动作",
  "kinetic-blueprint": "新建跟进 Modal",
  "physical-telemetry": "安排沟通 Modal",
  "institutional-trust": "OPEN MODAL",
  "expedition-search": "归档 Modal",
  "guided-service": "确认建议 Modal",
  "teamwork-fabric": "停止任务 Modal",
  "pattern-library": "写入确认 Modal",
};

const popupSelectors = {
  "command-center": "label.select",
};

const viewports = {
  desktop: { width: 1440, height: 900 },
  ipad: { width: 834, height: 1194 },
  iphone: { width: 390, height: 844 },
};

function route(board, view = "") {
  return `boards/${board}/${view}`;
}

for (const [device, viewport] of Object.entries(viewports)) {
  for (const board of boards) {
    for (const [view, rootIndex] of [["", 0], ["components.html", 1]]) {
      test(`${device} · ${board.slug} · ${view || "dashboard"}`, async ({ page }) => {
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize(viewport);
        await page.goto(route(board.slug, view), { waitUntil: "networkidle" });
        await expect(page.locator(".board-header")).toBeVisible();
        await expect(page.locator(roots[board.slug][rootIndex])).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
        expect(errors).toEqual([]);
      });
    }
  }
}

test("catalog exposes exactly ten independent directions", async ({ page }) => {
  await page.goto("");
  await expect(page.locator(".catalog-card")).toHaveCount(10);
  await expect(page.locator(".catalog-card img")).toHaveCount(10);
  await expect(page.locator(".catalog-card").first().locator(".catalog-card-nav a")).toHaveCount(2);
  await page.locator(".catalog-search input").fill("智能");
  expect(await page.locator(".catalog-card").count()).toBeGreaterThanOrEqual(1);
  await page.locator(".catalog-search input").fill("");
  await page.locator(".catalog-card").first().getByRole("link", { name: "组件与动效" }).click();
  await expect(page.locator(roots[boards[0].slug][1])).toBeVisible();
});

test("all directions use different dashboard and component DOM roots", async ({ page }) => {
  const dashboardRoots = new Set();
  const componentRoots = new Set();
  for (const board of boards) {
    await page.goto(route(board.slug));
    await expect(page.locator(roots[board.slug][0])).toBeVisible();
    dashboardRoots.add(await page.locator(roots[board.slug][0]).getAttribute("class"));
    await page.goto(route(board.slug, "components.html"));
    await expect(page.locator(roots[board.slug][1])).toBeVisible();
    componentRoots.add(await page.locator(roots[board.slug][1]).getAttribute("class"));
  }
  expect(dashboardRoots.size).toBe(10);
  expect(componentRoots.size).toBe(10);
});

for (const board of boards) {
  test(`${board.slug} owns complete dropdown, modal and motion interactions`, async ({ page }) => {
    await page.goto(route(board.slug, "components.html"));
    const root = page.locator(roots[board.slug][1]);
    const popup = root.locator(popupSelectors[board.slug] || "label.popup").first();
    const trigger = popup.locator(":scope > button");

    await trigger.click();
    await expect(popup.locator("menu")).toBeVisible();
    await trigger.click();
    await expect(popup.locator("menu")).toHaveCount(0);

    await trigger.click();
    await page.locator(".board-header").click();
    await expect(popup.locator("menu")).toHaveCount(0);

    await trigger.click();
    await popup.locator("menu > button").first().click();
    await expect(popup.locator("menu")).toHaveCount(0);

    const checkbox = root.locator("button:has(> i)").first();
    const mark = checkbox.locator(":scope > i");
    const before = await mark.getAttribute("class");
    await checkbox.click();
    expect(await mark.getAttribute("class")).not.toBe(before);

    await root.getByRole("button", { name: modalTriggers[board.slug], exact: true }).click();
    const modal = root.locator('[class$="-modal"]');
    await expect(modal).toBeVisible();
    await modal.getByRole("button").first().click();
    await expect(modal).toHaveCount(0);

    const motion = root.locator('section[class*="-motion"]').last();
    const controls = motion.locator(":scope > header button, :scope > nav button");
    await expect(controls).toHaveCount(4);
    const original = await motion.getAttribute("class");
    await controls.nth(2).click();
    expect(await motion.getAttribute("class")).not.toBe(original);
  });
}

test("mind maps and connector graph visuals are removed", async ({ page }) => {
  for (const board of boards) {
    await page.goto(route(board.slug, "components.html"));
    await expect(page.getByText("思维导图", { exact: true })).toHaveCount(0);
    await expect(page.locator('.cs-map-shell, .mini-tree, .relationship-panel, [data-graph]')).toHaveCount(0);
  }
});

test("legacy pages and removed board directories are not generated", async () => {
  const active = new Set(boards.map((board) => board.slug));
  for (const board of boards) {
    for (const file of ["motion.html", "spatial.html"]) {
      expect(existsSync(route(board.slug, file))).toBe(false);
    }
  }
  for (const removed of ["editorial-intelligence", "talent-constellation", "calm-focus", "digital-curatorial"]) {
    expect(active.has(removed)).toBe(false);
    expect(existsSync(`boards/${removed}`)).toBe(false);
  }
});
