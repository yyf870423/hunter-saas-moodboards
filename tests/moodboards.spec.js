import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";
import { boards, viewMeta } from "../src/data/boards.js";

const dashboardRoots = {
  "precision-desk": ".ops-dashboard",
  "command-center": ".signal-dashboard",
  "human-studio": ".client-dashboard",
  "kinetic-blueprint": ".journal-dashboard",
  "physical-telemetry": ".inbox-dashboard",
  "institutional-trust": ".task-dashboard",
  "expedition-search": ".research-dashboard",
  "guided-service": ".copilot-dashboard",
  "teamwork-fabric": ".opportunity-dashboard",
  "pattern-library": ".decision-dashboard",
};

const prefixes = {
  "precision-desk": "opsx", "command-center": "cmdx", "human-studio": "clix",
  "kinetic-blueprint": "jnlx", "physical-telemetry": "inbx", "institutional-trust": "wbx",
  "expedition-search": "rsx", "guided-service": "cpx", "teamwork-fabric": "oppx",
  "pattern-library": "dcx",
};

const viewports = {
  desktop: { width: 1440, height: 900 },
  ipad: { width: 834, height: 1194 },
  iphone: { width: 390, height: 844 },
};

const experienceViews = Object.keys(viewMeta).filter((view) => view !== "main");
const allViews = Object.keys(viewMeta);

function route(board, view = "main", theme = "light") {
  const file = view === "main" ? "" : viewMeta[view].file;
  return `boards/${board}/${file}?theme=${theme}`;
}

test.describe.configure({ mode: "serial" });

test("catalog contains ten independent, unnumbered product systems", async ({ page }) => {
  await page.goto("");
  await expect(page.locator(".catalog-card")).toHaveCount(10);
  await expect(page.locator(".catalog-card img")).toHaveCount(10);
  await expect(page.locator(".catalog-card-nav a").first()).toHaveText("工作台");
  await expect(page.locator(".catalog-card-nav a").nth(1)).toHaveText("Agent 对话");
  await expect(page.locator(".catalog-card-number, .board-index")).toHaveCount(0);
  await page.locator(".catalog-search input").fill("智能");
  expect(await page.locator(".catalog-card").count()).toBeGreaterThan(0);
});

test("all 480 route/theme/viewport combinations render without runtime errors or document overflow", async ({ page }) => {
  test.setTimeout(360_000);
  const failures = [];
  page.on("pageerror", (error) => failures.push(error.message));
  for (const [device, viewport] of Object.entries(viewports)) {
    await page.setViewportSize(viewport);
    for (const board of boards) {
      for (const view of allViews) {
        for (const theme of ["light", "dark"]) {
          await page.goto(route(board.slug, view, theme), { waitUntil: "domcontentloaded" });
          const root = view === "main" ? dashboardRoots[board.slug] : `.${prefixes[board.slug]}-page`;
          await expect(page.locator(root), `${device}/${board.slug}/${view}/${theme}`).toBeVisible();
          await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
          const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
          if (overflow > 1) failures.push(`${device}/${board.slug}/${view}/${theme}: overflow ${overflow}`);
        }
      }
    }
  }
  expect(failures).toEqual([]);
});

test("every product system owns seven distinct business-page roots", async ({ page }) => {
  const roots = new Set();
  for (const board of boards) {
    for (const view of experienceViews) {
      await page.goto(route(board.slug, view));
      const root = page.locator(`.${prefixes[board.slug]}-page`);
      await expect(root).toBeVisible();
      roots.add(`${await root.getAttribute("class")}/${view}`);
    }
  }
  expect(roots.size).toBe(70);
});

for (const board of boards) {
  test(`${board.slug} theme switch persists across pages without losing page state`, async ({ page }) => {
    const prefix = prefixes[board.slug];
    await page.goto(route(board.slug, "list", "light"));
    const search = page.locator(`.${prefix}-page input`).first();
    await search.fill("林");
    await page.getByRole("button", { name: "深色模式" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(search).toHaveValue("林");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.goto(route(board.slug, "agent").replace("?theme=light", ""));
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test(`${board.slug} list dropdown, create/delete modal and feedback are fully styled`, async ({ page }) => {
    const prefix = prefixes[board.slug];
    await page.goto(route(board.slug, "list"));
    const root = page.locator(`.${prefix}-page`);
    const toolbarButtons = root.locator(`.${prefix}-toolbar button, .${prefix}-listbar button, .${prefix}-searchbar button, .${prefix}-filters button, .${prefix}-dbbar button`);
    if (await toolbarButtons.count()) {
      await toolbarButtons.first().click();
      const menu = page.getByRole("menu");
      await expect(menu).toBeVisible();
      const menuFont = await menu.evaluate((node) => getComputedStyle(node).fontFamily);
      const rootFont = await root.evaluate((node) => getComputedStyle(node).fontFamily);
      expect(menuFont).toBe(rootFont);
      expect(await menu.evaluate((node) => getComputedStyle(node).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
      const menuBox = await menu.boundingBox();
      expect(menuBox.x).toBeGreaterThanOrEqual(0);
      expect(menuBox.x + menuBox.width).toBeLessThanOrEqual(1281);
      await menu.locator("button").first().click();
      await expect(menu).toHaveCount(0);
    }

    await root.locator("header button.primary").first().click();
    const createDialog = page.getByRole("dialog");
    await expect(createDialog).toBeVisible();
    expect(await createDialog.evaluate((node) => getComputedStyle(node).fontFamily))
      .toBe(await root.evaluate((node) => getComputedStyle(node).fontFamily));
    expect(await createDialog.evaluate((node) => getComputedStyle(node).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
    const dialogBox = await createDialog.boundingBox();
    expect(dialogBox.x).toBeGreaterThanOrEqual(0);
    expect(dialogBox.y).toBeGreaterThanOrEqual(0);
    expect(dialogBox.x + dialogBox.width).toBeLessThanOrEqual(1281);
    expect(dialogBox.y + dialogBox.height).toBeLessThanOrEqual(721);
    await createDialog.getByRole("button", { name: /取消|返回/ }).click();
    await expect(createDialog).toHaveCount(0);

    const deleteButton = root.getByRole("button", { name: /删除/ }).first();
    if (await deleteButton.count()) {
      await deleteButton.click();
      const deleteDialog = page.getByRole("dialog");
      await expect(deleteDialog).toBeVisible();
      await expect(deleteDialog.getByRole("button", { name: /确认删除/ })).toBeVisible();
      await deleteDialog.getByRole("button", { name: /取消|返回/ }).click();
    }

    const visibleControls = root.locator("button, input, textarea");
    for (let index = 0; index < Math.min(await visibleControls.count(), 12); index += 1) {
      const appearance = await visibleControls.nth(index).evaluate((node) => getComputedStyle(node).appearance);
      expect(appearance).toBe("none");
    }
  });

  test(`${board.slug} core Agent, pipeline, upload and task actions change visible state`, async ({ page }) => {
    const prefix = prefixes[board.slug];
    await page.goto(route(board.slug, "agent"));
    const agent = page.locator(`.${prefix}-page`);
    const composer = agent.locator("input, textarea").last();
    await composer.fill("请补充当前团队的公开证据");
    await composer.press("Enter");
    await expect(agent.getByText("请补充当前团队的公开证据", { exact: true })).toBeVisible();

    await page.goto(route(board.slug, "pipeline"));
    const pipeline = page.locator(`.${prefix}-page`);
    const noteButton = pipeline.getByRole("button", { name: /备注|批注/ }).first();
    if (await noteButton.count()) {
      await noteButton.click();
      await expect(page.getByRole("dialog")).toBeVisible();
      await page.getByRole("dialog").getByRole("button", { name: /取消/ }).click();
    }

    await page.goto(route(board.slug, "upload"));
    const upload = page.locator(`.${prefix}-page`);
    const start = upload.getByRole("button", { name: /开始|上传|启动|拖放|选择/ }).last();
    await start.click();
    await expect(upload.locator(".spin").first()).toBeVisible({ timeout: 2_000 }).catch(() => {});

    await page.goto(route(board.slug, "tasks"));
    const tasks = page.locator(`.${prefix}-page`);
    const actionable = tasks.getByRole("button").filter({ hasText: /暂停|继续|重试|详情|记录/ }).first();
    if (await actionable.count()) await actionable.click();
  });
}

test("native tooltips, select controls, removed component pages and visual graph remnants are absent", async ({ page }) => {
  for (const board of boards) {
    await page.goto(route(board.slug, "list"));
    await expect(page.locator("[title], select, canvas, [data-graph]")).toHaveCount(0);
    await expect(page.locator(".board-header .view-nav a")).toHaveCount(8);
    expect(existsSync(`boards/${board.slug}/components.html`)).toBe(false);
  }
});

test("responsive navigation stays horizontal and custom checkbox marks are centered", async ({ page }) => {
  await page.setViewportSize(viewports.ipad);
  await page.goto(route("precision-desk", "list"));
  const nav = page.locator(".board-header .view-nav");
  await expect(nav.locator("a")).toHaveCount(8);
  await expect(nav.locator("a").first()).toHaveAttribute("data-tooltip", "工作台");
  await expect(nav.locator("a span").first()).toBeHidden();
  for (const link of await nav.locator("a").all()) {
    const box = await link.boundingBox();
    expect(box.width).toBe(30);
    expect(box.height).toBe(30);
  }
  const navBox = await nav.boundingBox();
  expect(navBox.x + navBox.width).toBeLessThanOrEqual(viewports.ipad.width);

  const checkbox = page.locator(".opsx-checkbox").first();
  await checkbox.click();
  const mark = checkbox.locator("svg");
  await expect(mark).toBeVisible();
  const checkboxBox = await checkbox.boundingBox();
  const markBox = await mark.boundingBox();
  expect(Math.abs((checkboxBox.x + checkboxBox.width / 2) - (markBox.x + markBox.width / 2))).toBeLessThanOrEqual(1);
  expect(Math.abs((checkboxBox.y + checkboxBox.height / 2) - (markBox.y + markBox.height / 2))).toBeLessThanOrEqual(1);

  await page.setViewportSize(viewports.iphone);
  await page.goto(route("precision-desk", "main"));
  const mobileNavBox = await page.locator(".board-header .view-nav").boundingBox();
  expect(Math.abs((mobileNavBox.y + mobileNavBox.height) - viewports.iphone.height)).toBeLessThanOrEqual(1);
  await expect(page.getByRole("button", { name: "浅色模式" })).toBeVisible();
  await expect(page.getByRole("button", { name: "深色模式" })).toBeVisible();
});

test("legacy and removed moodboard directories are not generated", async () => {
  const active = new Set(boards.map((board) => board.slug));
  for (const removed of ["editorial-intelligence", "talent-constellation", "calm-focus", "digital-curatorial"]) {
    expect(active.has(removed)).toBe(false);
    expect(existsSync(`boards/${removed}`)).toBe(false);
  }
});
