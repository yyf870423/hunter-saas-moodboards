import { ArrowUpRight, Bot, GalleryVerticalEnd, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { boards } from "../data/boards";

const views = [
  ["", "工作台", GalleryVerticalEnd],
  ["agent.html", "Agent 对话", Bot],
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
          <span className="catalog-kicker">HUNTER SAAS · DESIGN DIRECTION STUDY</span>
          <h1>十套差异明确的<br />科技猎头产品语言</h1>
        </div>
        <div className="catalog-summary">
          <p>以专业猎头工作为主体，叠加克制的智能感与品牌气质。每套方案都有独立的 Dashboard DOM、组件结构、交互状态和业务动效。</p>
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
            <a className="catalog-visual" href={`${import.meta.env.BASE_URL}boards/${board.slug}/`} aria-label={`预览${board.name}`}>
              <img src={`${import.meta.env.BASE_URL}previews/${board.slug}.png`} alt="" />
            </a>
            <div className="catalog-card-copy">
              <div className="catalog-card-title">
                <div><h2>{board.name}</h2><p>{board.en}</p></div>
                <a className="has-tooltip" href={`${import.meta.env.BASE_URL}boards/${board.slug}/`} data-tooltip={`打开${board.name}`} aria-label={`打开${board.name}`}><ArrowUpRight size={19} /></a>
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
