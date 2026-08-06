import { ArrowLeft, Bot, BriefcaseBusiness, CalendarRange, GalleryVerticalEnd, Layers3, ListFilter, Moon, PanelsTopLeft, Sun, Upload } from "lucide-react";
import { viewMeta } from "../data/boards";

const icons = {
  main: GalleryVerticalEnd,
  agent: Bot,
  list: ListFilter,
  pipeline: PanelsTopLeft,
  matching: BriefcaseBusiness,
  cards: Layers3,
  upload: Upload,
  tasks: CalendarRange,
};

function boardHref(slug, view) {
  const suffix = view === "main" ? "" : viewMeta[view].file;
  return `${import.meta.env.BASE_URL}boards/${slug}/${suffix}`;
}

export function BoardHeader({ board, view, theme, onThemeChange }) {
  return (
    <header className="board-header">
      <a className="catalog-back has-tooltip" href={import.meta.env.BASE_URL} data-tooltip="返回十套方案" aria-label="返回十套方案">
        <ArrowLeft size={16} aria-hidden="true" />
        <span>十套方案</span>
      </a>
      <div className="board-identity">
        <div>
          <strong>{board.name}</strong>
          <small>{board.en}</small>
        </div>
      </div>
      <nav className="view-nav" aria-label="Moodboard 页面">
        {Object.entries(viewMeta).map(([key, meta]) => {
          const Icon = icons[key];
          return (
            <a
              key={key}
              className={`${view === key ? "active " : ""}has-tooltip`}
              href={boardHref(board.slug, key)}
              data-tooltip={meta.name}
              aria-label={meta.name}
            >
              <Icon size={15} aria-hidden="true" />
              <span>{meta.short}</span>
            </a>
          );
        })}
      </nav>
      <div className="theme-switch" role="group" aria-label="显示模式">
        <button className={`${theme === "light" ? "active " : ""}has-tooltip`} onClick={() => onThemeChange("light")} data-tooltip="浅色模式" aria-label="浅色模式"><Sun size={15} /></button>
        <button className={`${theme === "dark" ? "active " : ""}has-tooltip`} onClick={() => onThemeChange("dark")} data-tooltip="深色模式" aria-label="深色模式"><Moon size={15} /></button>
      </div>
    </header>
  );
}
