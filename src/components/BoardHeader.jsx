import { ArrowLeft, Component, GalleryVerticalEnd } from "lucide-react";
import { viewMeta } from "../data/boards";

const icons = {
  main: GalleryVerticalEnd,
  components: Component,
};

function boardHref(slug, view) {
  const suffix = view === "main" ? "" : `${view}.html`;
  return `${import.meta.env.BASE_URL}boards/${slug}/${suffix}`;
}

export function BoardHeader({ board, view }) {
  return (
    <header className="board-header">
      <a className="catalog-back" href={import.meta.env.BASE_URL} title="返回二十套方案">
        <ArrowLeft size={16} aria-hidden="true" />
        <span>二十套方案</span>
      </a>
      <div className="board-identity">
        <span className="board-index">{board.id}</span>
        <div>
          <strong>{board.name}</strong>
          <small>{board.en}</small>
        </div>
      </div>
      <nav className="view-nav" aria-label="Moodboard 页面">
        {Object.entries(viewMeta).map(([key, meta]) => {
          const Icon = icons[key];
          return (
            <a key={key} className={view === key ? "active" : ""} href={boardHref(board.slug, key)}>
              <Icon size={15} aria-hidden="true" />
              <span>{meta.short}</span>
            </a>
          );
        })}
      </nav>
    </header>
  );
}
