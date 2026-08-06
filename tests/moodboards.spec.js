import { expect, test } from "@playwright/test";
import { existsSync } from "node:fs";

const boards = [
  "precision-desk", "editorial-intelligence", "talent-constellation", "calm-focus", "command-center",
  "human-studio", "bauhaus-workflow", "data-atelier", "kinetic-blueprint", "adaptive-modules",
  "kinetic-ledger", "physical-telemetry", "institutional-trust", "ai-state-atlas", "expedition-search",
  "compile-workshop", "guided-service", "teamwork-fabric", "pattern-library", "digital-curatorial",
];
const views = ["", "components.html"];
const viewports = {
  desktop: { width: 1440, height: 900 },
  ipad: { width: 834, height: 1194 },
  iphone: { width: 390, height: 844 },
};

function route(board, view = "") { return `boards/${board}/${view}`; }

for (const [device, viewport] of Object.entries(viewports)) {
  for (const board of boards) {
    for (const view of views) {
      test(`${device} · ${board} · ${view || "dashboard"}`, async ({ page }) => {
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize(viewport);
        await page.goto(route(board, view), { waitUntil: "networkidle" });
        await expect(page.locator(".board")).toBeVisible();
        await expect(page.locator(".board-header")).toBeVisible();
        await expect(page.locator(view ? ".component-system" : ".hunter-dashboard")).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
        expect(errors).toEqual([]);
      });
    }
  }
}

test("catalog uses real previews, two views and search", async ({ page }) => {
  await page.goto("");
  await expect(page.locator(".catalog-card")).toHaveCount(20);
  await expect(page.locator(".catalog-card img")).toHaveCount(20);
  await expect(page.locator(".catalog-card").first().locator(".catalog-card-nav a")).toHaveCount(2);
  await page.locator(".catalog-search input").fill("关系");
  expect(await page.locator(".catalog-card").count()).toBeGreaterThanOrEqual(1);
  await page.locator(".catalog-search input").fill("");
  await page.locator(".catalog-card").first().getByRole("link", { name: "组件与动效" }).click();
  await expect(page.locator(".component-system")).toBeVisible();
});

test("all dashboards and component systems expose twenty distinct variants", async ({ page }) => {
  const dashboardRoots = new Set();
  const componentRoots = new Set();
  for (const board of boards) {
    await page.goto(route(board));
    dashboardRoots.add(await page.locator(".hunter-dashboard").getAttribute("class"));
    await page.goto(route(board, "components.html"));
    componentRoots.add(await page.locator(".component-system").getAttribute("class"));
  }
  expect(dashboardRoots.size).toBe(20);
  expect(componentRoots.size).toBe(20);
});

test("component page covers Hunter controls, assets, mind map, states and motion", async ({ page }) => {
  await page.goto(route(boards[0], "components.html"));
  for (const selector of [
    ".cs-app-nav", ".cs-actions", ".cs-form-grid", ".cs-choice-grid", ".cs-data-zone",
    ".cs-entity-zone", ".cs-map-shell", ".cs-state-grid", ".cs-motion-stage",
  ]) await expect(page.locator(selector)).toBeVisible();

  await page.getByText("单选下拉").locator("..").locator(".cs-select").click();
  await expect(page.locator(".cs-dropdown.single")).toBeVisible();
  await page.getByText("时间范围").locator("..").locator(".cs-select").click();
  await expect(page.locator(".cs-calendar")).toBeVisible();
  await page.locator(".cs-segmented button").nth(2).click();
  await expect(page.locator(".entity.agent")).toBeVisible();
  await page.locator(".map-node.branch").first().locator("b").click();
  await expect(page.locator(".map-branch").first()).toHaveClass(/collapsed/);
  await page.getByTitle("放大").click();
  await expect(page.locator(".cs-map-toolbar > em")).toHaveText("110%");
  await page.getByRole("button", { name: "绑定候选人" }).click();
  await expect(page.locator(".cs-map-notice")).toContainText("候选人选择器");
  await page.getByText("打开 Modal").click();
  await expect(page.locator(".cs-modal")).toBeVisible();
});

test("each moodboard exposes four style-specific business motions", async ({ page }) => {
  for (const board of boards) {
    await page.goto(route(board, "components.html"));
    const controls = page.locator(".cs-motion-stage > nav button");
    await expect(controls).toHaveCount(4);
    const root = page.locator(".component-system");
    for (let index = 0; index < 4; index += 1) {
      await controls.nth(index).click();
      await expect(root).toHaveClass(new RegExp(`motion-state-${index + 1}`));
    }
  }
});

test("removed legacy pages are not generated", async () => {
  for (const board of boards) {
    for (const file of ["motion.html", "spatial.html"]) {
      expect(existsSync(route(board, file))).toBe(false);
    }
  }
});
