import { lazy, Suspense } from "react";
import { boardBySlug } from "./data/boards";
import { Catalog } from "./components/Catalog";
import { BoardHeader } from "./components/BoardHeader";

const MainMoodboard = lazy(() => import("./layouts/MainMoodboard").then((module) => ({ default: module.MainMoodboard })));
const ComponentLab = lazy(() => import("./components/ComponentLab").then((module) => ({ default: module.ComponentLab })));
const MotionLab = lazy(() => import("./components/MotionLab").then((module) => ({ default: module.MotionLab })));

export function App() {
  const slug = document.body.dataset.board;
  const view = document.body.dataset.view || "catalog";

  if (!slug) return <Catalog />;

  const board = boardBySlug[slug];
  if (!board) return <div className="fatal-state">未找到 Moodboard。</div>;

  const style = {
    "--accent": board.accent,
    "--signal": board.signal,
    "--canvas": board.canvas,
    "--ink": board.ink,
    "--panel": board.panel,
    "--line": board.line,
    "--muted": board.muted,
    "--radius": board.radius,
    "--theme-font": board.font,
  };

  return (
    <div className={`board theme-${board.slug} view-${view}`} style={style}>
      <BoardHeader board={board} view={view} />
      <main className="board-content">
        <Suspense fallback={<div className="page-loading"><i /><span>正在载入设计方案</span></div>}>
          {view === "main" && <MainMoodboard board={board} />}
          {view === "components" && <ComponentLab board={board} />}
          {view === "motion" && <MotionLab board={board} />}
        </Suspense>
      </main>
    </div>
  );
}
