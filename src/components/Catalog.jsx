import { ArrowUpRight, Box, Component, GalleryVerticalEnd, Orbit, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { boards } from "../data/boards";

const views = [
  ["", "主要风格", GalleryVerticalEnd],
  ["components.html", "组件", Component],
  ["motion.html", "动效", Orbit],
  ["spatial.html", "3D", Box],
];

export function Catalog() {
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return boards;
    return boards.filter((board) => [board.name, board.en, board.premise, ...board.tags].join(" ").toLowerCase().includes(value));
  }, [query]);

  return (
    <main className="catalog">
      <header className="catalog-intro">
        <div>
          <span className="catalog-kicker">HUNTER SAAS · UX DIRECTION STUDY</span>
          <h1>十种真正不同的<br />招聘智能工作方式</h1>
        </div>
        <div className="catalog-summary">
          <p>每套方向分别定义信息架构、视觉语言、组件系统、动效节奏和 3D 空间隐喻，不是同一套后台模板的换色版本。</p>
          <label className="catalog-search">
            <Search size={17} aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索风格、能力或关键词" />
          </label>
        </div>
      </header>

      <section className="catalog-grid" aria-label="Moodboard 列表">
        {visible.map((board) => (
          <article
            className={`catalog-card catalog-${board.slug}`}
            key={board.slug}
            style={{ "--card-accent": board.accent, "--card-signal": board.signal, "--card-canvas": board.canvas, "--card-ink": board.ink }}
          >
            <div className="catalog-visual" aria-hidden="true">
              <span className="visual-number">{board.id}</span>
              <div className="visual-composition"><i /><i /><i /><i /><i /></div>
            </div>
            <div className="catalog-card-copy">
              <div className="catalog-card-title">
                <div><h2>{board.name}</h2><p>{board.en}</p></div>
                <a href={`${import.meta.env.BASE_URL}boards/${board.slug}/`} title={`打开${board.name}`}><ArrowUpRight size={19} /></a>
              </div>
              <p className="catalog-premise">{board.premise}</p>
              <div className="catalog-tags">{board.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <nav className="catalog-card-nav" aria-label={`${board.name}页面`}>
                {views.map(([file, name, Icon]) => (
                  <a key={name} href={`${import.meta.env.BASE_URL}boards/${board.slug}/${file}`}><Icon size={14} />{name}</a>
                ))}
              </nav>
            </div>
          </article>
        ))}
      </section>
      {visible.length === 0 && <div className="catalog-empty">没有匹配的方案。请更换搜索词。</div>}
      <footer className="catalog-footer"><span>Hunter SaaS Moodboard Study</span><span>Desktop · iPad · iPhone</span></footer>
    </main>
  );
}
