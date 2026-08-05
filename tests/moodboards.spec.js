import { expect, test } from "@playwright/test";
import { PNG } from "pngjs";

const boards = [
  "precision-desk", "editorial-intelligence", "talent-constellation", "calm-focus", "command-center",
  "human-studio", "bauhaus-workflow", "data-atelier", "kinetic-blueprint", "adaptive-modules",
];
const views = ["", "components.html", "motion.html", "spatial.html"];
const viewports = {
  desktop: { width: 1440, height: 810 },
  ipad: { width: 834, height: 1194 },
  iphone: { width: 390, height: 844 },
};

function route(board, view) { return `boards/${board}/${view}`; }

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
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
        expect(overflow).toBeLessThanOrEqual(1);
        expect(errors).toEqual([]);

        if (!view) {
          await expect(page.locator(".mood")).toBeVisible();
          if (device === "desktop") await page.screenshot({ path: `screenshots/${board}-main-desktop.png`, fullPage: true });
        }
        if (view === "components.html") {
          await expect(page.locator(".component-section")).toHaveCount(5);
          if (device === "desktop") await page.screenshot({ path: `screenshots/${board}-components-desktop.png`, fullPage: true });
        }
        if (view === "motion.html") {
          await expect(page.locator(".motion-demo")).toHaveCount(12);
          if (device === "desktop") await page.screenshot({ path: `screenshots/${board}-motion-desktop.png`, fullPage: true });
        }
        if (view === "spatial.html") {
          const canvas = page.locator("canvas");
          await expect(canvas).toBeVisible();
          await page.waitForTimeout(650);
          const png = PNG.sync.read(await canvas.screenshot());
          const colors = new Set();
          let opaque = 0;
          for (let index = 0; index < png.data.length; index += 64) {
            const alpha = png.data[index + 3];
            if (alpha > 220) opaque += 1;
            colors.add(`${png.data[index] >> 4}-${png.data[index + 1] >> 4}-${png.data[index + 2] >> 4}`);
          }
          expect(colors.size).toBeGreaterThan(8);
          expect(opaque).toBeGreaterThan(100);
          if (device !== "ipad") await page.screenshot({ path: `screenshots/${board}-spatial-${device}.png`, fullPage: true });
        }
      });
    }
  }
}

test("catalog navigation and filter", async ({ page }) => {
  await page.goto("");
  await expect(page.locator(".catalog-card")).toHaveCount(10);
  await page.locator(".catalog-search input").fill("关系");
  await expect(page.locator(".catalog-card")).toHaveCount(2);
  await page.locator(".catalog-search input").fill("");
  await page.locator(".catalog-card").first().getByRole("link", { name: "组件" }).click();
  await expect(page.locator(".component-lab")).toBeVisible();
});

test("component interactions are usable", async ({ page }) => {
  await page.goto(route("precision-desk", "components.html"));
  const attentionTab = page.locator(".tabs-control button").nth(2);
  await attentionTab.click();
  await expect(attentionTab).toHaveClass(/active/);
  await page.getByRole("button", { name: "打开确认 Modal" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("dialog").getByRole("button", { name: "取消" }).click();
  await page.getByRole("button", { name: "打开详情 Drawer" }).click();
  await expect(page.locator(".drawer")).toBeVisible();
  await page.locator(".drawer header button").click();
  const tagInput = page.locator(".tag-input input");
  await tagInput.fill("强化学习");
  await tagInput.press("Enter");
  await expect(page.locator(".tag-input")).toContainText("强化学习");
});

test("motion controls create visible state changes", async ({ page }) => {
  await page.goto(route("adaptive-modules", "motion.html"));
  await page.getByRole("button", { name: "触发通知" }).click();
  await expect(page.locator(".motion-toast")).toBeVisible();
  await page.getByRole("button", { name: "打开命令面板" }).click();
  await expect(page.locator(".command-pop")).toBeVisible();
});
