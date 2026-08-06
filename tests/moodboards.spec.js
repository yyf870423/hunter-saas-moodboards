import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";
import { boards } from "../src/data/boards.js";

const roots = {
  "precision-desk": [".ops-dashboard", ".ops-components"],
  "command-center": [".signal-dashboard", ".signal-components"],
  "human-studio": [".client-dashboard", ".client-components"],
  "kinetic-blueprint": [".journal-dashboard", ".journal-components"],
  "physical-telemetry": [".inbox-dashboard", ".inbox-components"],
  "institutional-trust": [".task-dashboard", ".task-components"],
  "expedition-search": [".research-dashboard", ".research-components"],
  "guided-service": [".copilot-dashboard", ".copilot-components"],
  "teamwork-fabric": [".opportunity-dashboard", ".opportunity-components"],
  "pattern-library": [".decision-dashboard", ".decision-components"],
};

const prefixes = {
  "precision-desk": "ops", "command-center": "signal", "human-studio": "client",
  "kinetic-blueprint": "journal", "physical-telemetry": "inbox", "institutional-trust": "task",
  "expedition-search": "research", "guided-service": "copilot", "teamwork-fabric": "opportunity",
  "pattern-library": "decision",
};

const menuTriggers = {
  "precision-desk": "批量操作", "command-center": "更多命令", "human-studio": "更多操作",
  "kinetic-blueprint": "记录操作", "physical-telemetry": "会话操作", "institutional-trust": "任务操作",
  "expedition-search": "材料操作", "guided-service": "建议操作", "teamwork-fabric": "对象操作",
  "pattern-library": "决策操作",
};

const drawerTriggers = {
  "precision-desk": "打开详情", "command-center": "打开上下文", "human-studio": "打开详情",
  "kinetic-blueprint": "打开人物卡", "physical-telemetry": "联系人详情", "institutional-trust": "任务详情",
  "expedition-search": "材料详情", "guided-service": "查看依据", "teamwork-fabric": "打开对象",
  "pattern-library": "查看证据",
};

const dashboardActions = {
  "precision-desk": "筛选", "command-center": "稍后处理", "human-studio": "筛选",
  "kinetic-blueprint": "添加记录", "physical-telemetry": "查看完整资料",
  "institutional-trust": "查看读取内容", "expedition-search": "高亮",
  "guided-service": "编辑资料", "teamwork-fabric": "筛选", "pattern-library": "查看完整证据",
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

test("catalog exposes exactly ten independent mature combinations", async ({ page }) => {
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

test("all combinations own different dashboard and component DOM roots", async ({ page }) => {
  const dashboardRoots = new Set();
  const componentRoots = new Set();
  for (const board of boards) {
    await page.goto(route(board.slug));
    dashboardRoots.add(await page.locator(roots[board.slug][0]).getAttribute("class"));
    await page.goto(route(board.slug, "components.html"));
    componentRoots.add(await page.locator(roots[board.slug][1]).getAttribute("class"));
  }
  expect(dashboardRoots.size).toBe(10);
  expect(componentRoots.size).toBe(10);
});

for (const board of boards) {
  test(`${board.slug} dashboard actions provide visible feedback`, async ({ page }) => {
    await page.goto(route(board.slug), { waitUntil: "networkidle" });
    const prefix = prefixes[board.slug];
    const action = page.getByRole("button", { name: dashboardActions[board.slug], exact: true }).first();
    await action.hover();
    await action.click();
    await expect(page.locator(`.${prefix}-toast`)).toBeVisible();
    await page.locator(`.${prefix}-toast button`).click();
    await expect(page.locator(`.${prefix}-toast`)).toHaveCount(0);
  });

  test(`${board.slug} components cover pointer, keyboard, popup and state interactions`, async ({ page }) => {
    await page.goto(route(board.slug, "components.html"), { waitUntil: "networkidle" });
    const prefix = prefixes[board.slug];
    const root = page.locator(roots[board.slug][1]);

    const primary = root.locator(`.${prefix}-primary`).first();
    const beforeHover = await primary.evaluate((element) => getComputedStyle(element).backgroundColor);
    await primary.hover();
    await expect.poll(() => primary.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe(beforeHover);

    const menuTrigger = root.getByRole("button", { name: menuTriggers[board.slug], exact: true });
    await menuTrigger.click();
    await expect(page.getByRole("menu")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("menu")).toHaveCount(0);
    await menuTrigger.click();
    await page.getByRole("menuitem").first().click();
    await expect(page.locator(`.${prefix}-toast`)).toBeVisible();
    await page.locator(`.${prefix}-toast button`).click();

    const checkbox = root.locator('[role="checkbox"]');
    const checkedBefore = await checkbox.getAttribute("data-state");
    await checkbox.click();
    expect(await checkbox.getAttribute("data-state")).not.toBe(checkedBefore);

    const toggle = root.locator('[role="switch"]');
    const toggleBefore = await toggle.getAttribute("data-state");
    await toggle.click();
    expect(await toggle.getAttribute("data-state")).not.toBe(toggleBefore);

    const radioButtons = root.locator(`.${prefix}-radio button`);
    await radioButtons.nth(1).click();
    await expect(radioButtons.nth(1).locator("em")).toBeVisible();

    const slider = root.locator('[role="slider"]');
    const valueBefore = Number(await slider.getAttribute("aria-valuenow"));
    await slider.focus();
    await page.keyboard.press("ArrowLeft");
    expect(Number(await slider.getAttribute("aria-valuenow"))).toBeLessThan(valueBefore);

    const tabs = root.getByRole("tab");
    await tabs.nth(1).click();
    await expect(tabs.nth(1)).toHaveAttribute("data-state", "active");

    const motion = root.locator(`.${prefix}-motion`);
    const motionCopyBefore = await motion.locator("article b").innerText();
    await motion.locator("header nav button").nth(2).click();
    await expect.poll(() => motion.locator("article b").innerText()).not.toBe(motionCopyBefore);

    await root.getByRole("button", { name: drawerTriggers[board.slug], exact: true }).click();
    const drawer = page.locator(`.${prefix}-drawer`);
    await expect(drawer).toBeVisible();
    await drawer.locator("header button").first().click();
    await expect(drawer).toHaveCount(0);

    await root.getByRole("button", { name: "打开确认 Modal", exact: true }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await dialog.getByRole("button", { name: /取消|返回/ }).click();
    await expect(dialog).toHaveCount(0);

    await expect(root.locator("button:disabled").first()).toBeDisabled();
  });
}

test("mind maps, connector graphs and 3D visuals are removed", async ({ page }) => {
  for (const board of boards) {
    await page.goto(route(board.slug, "components.html"));
    await expect(page.getByText("思维导图", { exact: true })).toHaveCount(0);
    await expect(page.locator('.cs-map-shell, .mini-tree, .relationship-panel, [data-graph], canvas')).toHaveCount(0);
  }
});

test("legacy pages and removed board directories are not generated", async () => {
  const active = new Set(boards.map((board) => board.slug));
  for (const board of boards) {
    for (const file of ["motion.html", "spatial.html"]) expect(existsSync(route(board.slug, file))).toBe(false);
  }
  for (const removed of ["editorial-intelligence", "talent-constellation", "calm-focus", "digital-curatorial"]) {
    expect(active.has(removed)).toBe(false);
    expect(existsSync(`boards/${removed}`)).toBe(false);
  }
});
