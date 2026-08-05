import { expect, test } from "@playwright/test";

const boards = [
  "precision-desk", "editorial-intelligence", "talent-constellation", "calm-focus", "command-center",
  "human-studio", "bauhaus-workflow", "data-atelier", "kinetic-blueprint", "adaptive-modules",
  "kinetic-ledger", "physical-telemetry", "institutional-trust", "ai-state-atlas", "expedition-search",
  "compile-workshop", "guided-service", "teamwork-fabric", "pattern-library", "digital-curatorial",
];
const views = ["", "components.html", "motion.html"];
const viewports = {
  desktop: { width: 1440, height: 900 },
  ipad: { width: 834, height: 1194 },
  iphone: { width: 390, height: 844 },
};

function route(board, view = "") { return `boards/${board}/${view}`; }

for (const [device, viewport] of Object.entries(viewports)) {
  for (const board of boards) {
    for (const view of views) {
      test(`${device} · ${board} · ${view || "main"}`, async ({ page }) => {
        const errors = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.setViewportSize(viewport);
        await page.goto(route(board, view), { waitUntil: "networkidle" });
        await expect(page.locator(".board")).toBeVisible();
        await expect(page.locator(".board-header")).toBeVisible();
        await expect(page.locator(view === "components.html" ? ".concept-components" : view === "motion.html" ? ".concept-motion" : ".tech-main")).toBeVisible();
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
        expect(errors).toEqual([]);
      });
    }
  }
}

test("catalog uses real previews and supports search", async ({ page }) => {
  await page.goto("");
  await expect(page.locator(".catalog-card")).toHaveCount(20);
  await expect(page.locator(".catalog-card img")).toHaveCount(20);
  await page.locator(".catalog-search input").fill("关系");
  expect(await page.locator(".catalog-card").count()).toBeGreaterThanOrEqual(2);
  await page.locator(".catalog-search input").fill("");
  await page.locator(".catalog-card").first().getByRole("link", { name: "组件" }).click();
  await expect(page.locator(".concept-components")).toBeVisible();
});

test("all component and motion pages use concept-specific roots", async ({ page }) => {
  const componentRoots = new Set();
  const motionRoots = new Set();
  for (const board of boards) {
    await page.goto(route(board, "components.html"));
    componentRoots.add(await page.locator(".concept-components").getAttribute("class"));
    await page.goto(route(board, "motion.html"));
    motionRoots.add(await page.locator(".concept-motion").getAttribute("class"));
  }
  expect(componentRoots.size).toBe(20);
  expect(motionRoots.size).toBe(20);
});

test("every component concept exposes a usable interaction", async ({ page }) => {
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const board of boards) {
    errors.length = 0;
    await page.goto(route(board, "components.html"));
    const firstAction = page.locator(".concept-components button:enabled").first();
    await expect(firstAction).toBeVisible();
    await firstAction.click();
    await expect(page.locator(".concept-components")).toBeVisible();
    expect(errors).toEqual([]);
  }
});

test("every motion concept exposes four working state transitions", async ({ page }) => {
  for (const board of boards) {
    await page.goto(route(board, "motion.html"));
    const stage = page.locator(".concept-motion > div").first();
    const controls = page.locator(".motion-trigger");
    await expect(controls).toHaveCount(4);
    for (let index = 0; index < 4; index += 1) {
      const before = await stage.evaluate((element) => element.outerHTML);
      await controls.nth(index).click();
      await expect.poll(() => stage.evaluate((element) => element.outerHTML)).not.toBe(before);
    }
  }
});

test("spatial routes were removed", async ({ request }) => {
  for (const board of boards) {
    const response = await request.get(route(board, "spatial.html"));
    expect(response.status()).toBe(404);
  }
});
