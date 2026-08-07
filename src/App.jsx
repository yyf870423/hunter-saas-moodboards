import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { boardBySlug } from "./data/boards";
import { Catalog } from "./components/Catalog";
import { BoardHeader } from "./components/BoardHeader";

const MainMoodboard = lazy(() =>
  import("./layouts/MainMoodboard").then((module) => ({
    default: module.MainMoodboard,
  })),
);
const ExperiencePage = lazy(() =>
  import("./experiences/ExperiencePage").then((module) => ({
    default: module.ExperiencePage,
  })),
);

function readTheme(slug) {
  const requested = new URLSearchParams(window.location.search).get("theme");
  if (requested === "light" || requested === "dark") return requested;
  const stored = window.sessionStorage.getItem(
    `hunter-moodboard-theme:${slug}`,
  );
  if (stored === "light" || stored === "dark") return stored;
  return "light";
}

export function App() {
  const slug = document.body.dataset.board;
  const view = document.body.dataset.view || "catalog";

  if (!slug) return <Catalog />;

  const board = boardBySlug[slug];
  if (!board) return <div className="fatal-state">未找到 Moodboard。</div>;

  const [theme, setTheme] = useState(() => readTheme(slug));
  const changeTheme = (nextTheme) => {
    setTheme(nextTheme);
    const url = new URL(window.location.href);
    if (url.searchParams.has("theme")) {
      url.searchParams.set("theme", nextTheme);
      window.history.replaceState({}, "", url);
    }
  };
  useEffect(() => {
    window.sessionStorage.setItem(`hunter-moodboard-theme:${slug}`, theme);
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [slug, theme]);

  const style = useMemo(() => {
    const palette = theme === "dark" ? board.dark : board;
    return {
      "--accent": palette.accent,
      "--signal": palette.signal,
      "--canvas": palette.canvas,
      "--ink": palette.ink,
      "--panel": palette.panel,
      "--line": palette.line,
      "--muted": palette.muted,
      "--radius": board.radius,
      "--theme-font": board.font,
      "--display-font": board.displayFont,
    };
  }, [board, theme]);

  return (
    <div
      className={`board theme-${board.slug} view-${view}`}
      data-theme={theme}
      style={style}
    >
      <BoardHeader
        board={board}
        view={view}
        theme={theme}
        onThemeChange={changeTheme}
      />
      <main className="board-content">
        <Suspense
          fallback={
            <div className="page-loading">
              <i />
              <span>正在载入设计方案</span>
            </div>
          }
        >
          {view === "main" && <MainMoodboard board={board} />}
          {view !== "main" && <ExperiencePage board={board} view={view} />}
        </Suspense>
      </main>
    </div>
  );
}
