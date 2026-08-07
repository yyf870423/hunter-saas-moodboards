import { useMemo, useState } from "react";
import { candidates, papers } from "../data/boards";
import {
  ArrowRight,
  BookOpenText,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  FileText,
  GripVertical,
  History,
  LoaderCircle,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
const notes = [
  {
    name: "林昊",
    role: "具身智能算法负责人",
    company: "穹境机器人",
    updated: "今天",
    story: "确认可了解新的职业机会，更关注技术自主权。",
  },
  {
    name: "周雨澄",
    role: "VLA 研究员",
    company: "奇点智研",
    updated: "昨天",
    story: "新增一篇多模态动作生成论文。",
  },
  {
    name: "陈松",
    role: "感知算法专家",
    company: "逐光科技",
    updated: "3 天前",
    story: "下周一可以电话沟通。",
  },
];
function JToast({ text, close }) {
  return text ? (
    <div className="jnlx-toast">
      <BookOpenText />
      <span>{text}</span>
      <button onClick={close}>
        <X />
      </button>
    </div>
  ) : null;
}
function JModal({ type, close, done }) {
  return (
    <div className="jnlx-shade">
      <article className="jnlx-modal" role="dialog">
        <header>
          <small>CANDIDATE ARCHIVE</small>
          <h2>{type === "add" ? "新建候选人" : "删除候选人"}</h2>
        </header>
        {type === "add" ? (
          <>
            <label>
              姓名
              <div>
                <button className="active">赵星羽</button>
                <button>待确认</button>
              </div>
            </label>
            <textarea defaultValue="机器人平台架构师，当前就职于远川智能。" />
          </>
        ) : (
          <p>候选人资料和未结束的关联记录将一并删除且无法恢复。</p>
        )}
        <footer>
          <button onClick={close}>取消</button>
          <button
            className={type === "add" ? "primary" : "danger"}
            onClick={done}
          >
            {type === "add" ? "创建候选人" : "确认删除"}
          </button>
        </footer>
      </article>
    </div>
  );
}
function Agent() {
  const [messages, setMessages] = useState([
    "结合林昊最近一年的经历和沟通记录，帮我准备下次联系。",
    "他的核心变化是从研究转向产品交付，同时开始带领 8 人算法团队。建议先确认团队自主权和岗位汇报关系。",
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setMessages((v) => [...v, input]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setMessages((v) => [
        ...v,
        "已补充到联系提纲，并保留了对应的经历和公开资料来源。",
      ]);
      setBusy(false);
    }, 650);
  };
  return (
    <section className="jnlx-page jnlx-agent">
      <aside>
        <b>H</b>
        <nav>
          {[BookOpenText, Search, CalendarDays, Sparkles].map((I, i) => (
            <button className={i === 3 ? "active" : ""} key={i}>
              <I />
            </button>
          ))}
        </nav>
        <span>于</span>
      </aside>
      <main>
        <header>
          <div>
            <small>林昊 · 人才纪事</small>
            <h1>准备下一次联系</h1>
          </div>
          <button onClick={() => setToast("已打开完整人物档案")}>
            人物档案
            <ArrowRight />
          </button>
        </header>
        <div className="jnlx-agent-layout">
          <section>
            <div className="jnlx-thread">
              {messages.map((m, i) => (
                <article className={i % 2 ? "agent" : "user"} key={`${m}-${i}`}>
                  <span>{i % 2 ? <Bot /> : <UserRound />}</span>
                  <p>{m}</p>
                </article>
              ))}
              {busy && (
                <article className="agent">
                  <span>
                    <LoaderCircle className="spin" />
                  </span>
                  <p>正在整理时间线和沟通背景…</p>
                </article>
              )}
            </div>
            <footer>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="补充你想了解的内容"
              />
              <button onClick={send} disabled={busy}>
                <ArrowRight />
              </button>
            </footer>
          </section>
          <aside>
            <small>人物摘要</small>
            <h2>林昊</h2>
            <p>
              具身智能算法负责人
              <br />
              穹境机器人
            </p>
            {[
              ["最近联系", "18 天前"],
              ["职业意愿", "开放机会"],
              ["优先方向", "VLA / 机器人学习"],
            ].map(([a, b]) => (
              <dl key={a}>
                <dt>{a}</dt>
                <dd>{b}</dd>
              </dl>
            ))}
            <button onClick={() => setToast("已创建下次联系提醒")}>
              创建提醒
            </button>
          </aside>
        </div>
      </main>
      <JToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function List() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");
  const [pipeline, setPipeline] = useState("全部");
  const [companies, setCompanies] = useState(["穹境机器人"]);
  const [industry, setIndustry] = useState("人工智能 / 机器人");
  const [dateRange, setDateRange] = useState("近 30 天");
  const [modal, setModal] = useState("");
  const [toast, setToast] = useState("");
  const shown = useMemo(
    () =>
      candidates.filter((candidate) =>
        `${candidate.name}${candidate.role}${candidate.company}${candidate.city}`.includes(
          q,
        ),
      ),
    [q],
  );
  return (
    <section className="jnlx-page jnlx-list">
      <header>
        <div>
          <small>人才数据库</small>
          <h1>候选人管理</h1>
        </div>
        <button className="primary" onClick={() => setModal("add")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="jnlx-dbbar">
        <label>
          <Search />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="搜索姓名、手机号、公司、职位、技能或经历"
          />
        </label>
        <div>
          <button
            onClick={() => setFilter(filter === "pipeline" ? "" : "pipeline")}
          >
            {pipeline === "全部" ? "流程状态" : pipeline}
            <ChevronDown />
          </button>
          {filter === "pipeline" && (
            <section className="jnlx-select" role="menu">
              {["全部", "在流程中", "不在流程中"].map((item) => (
                <button
                  role="menuitemradio"
                  aria-checked={pipeline === item}
                  onClick={() => {
                    setPipeline(item);
                    setFilter("");
                  }}
                  key={item}
                >
                  {pipeline === item && <Check />}
                  {item}
                </button>
              ))}
            </section>
          )}
        </div>
        <div>
          <button
            onClick={() => setFilter(filter === "company" ? "" : "company")}
          >
            公司 · {companies.length}
            <ChevronDown />
          </button>
          {filter === "company" && (
            <section className="jnlx-select jnlx-checklist" role="menu">
              {["穹境机器人", "奇点智研", "逐光科技", "远川智能"].map(
                (item) => (
                  <button
                    role="menuitemcheckbox"
                    aria-checked={companies.includes(item)}
                    onClick={() =>
                      setCompanies((values) =>
                        values.includes(item)
                          ? values.filter((value) => value !== item)
                          : [...values, item],
                      )
                    }
                    key={item}
                  >
                    {companies.includes(item) && <Check />}
                    {item}
                  </button>
                ),
              )}
              <footer>
                <button onClick={() => setCompanies([])}>清空</button>
                <button onClick={() => setFilter("")}>完成</button>
              </footer>
            </section>
          )}
        </div>
        <div>
          <button
            onClick={() => setFilter(filter === "industry" ? "" : "industry")}
          >
            行业
            <ChevronDown />
          </button>
          {filter === "industry" && (
            <section className="jnlx-industry" role="menu">
              <aside>
                {["人工智能", "先进制造", "汽车"].map((item) => (
                  <button
                    className={industry.startsWith(item) ? "active" : ""}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </aside>
              <main>
                {[
                  "人工智能 / 机器人",
                  "人工智能 / 大模型",
                  "人工智能 / 自动驾驶",
                ].map((item) => (
                  <button
                    className={industry === item ? "active" : ""}
                    onClick={() => {
                      setIndustry(item);
                      setFilter("");
                    }}
                    key={item}
                  >
                    {item.split(" / ")[1]}
                  </button>
                ))}
              </main>
            </section>
          )}
        </div>
        <div>
          <button onClick={() => setFilter(filter === "date" ? "" : "date")}>
            <CalendarDays />
            {dateRange}
            <ChevronDown />
          </button>
          {filter === "date" && (
            <section className="jnlx-select jnlx-date" role="menu">
              {["近 7 天", "近 30 天", "自定义"].map((item) => (
                <button
                  className={dateRange === item ? "active" : ""}
                  onClick={() => setDateRange(item)}
                  key={item}
                >
                  {item}
                </button>
              ))}
              {dateRange === "自定义" && (
                <div>
                  <time>2026-07-01</time>
                  <span>至</span>
                  <time>2026-08-07</time>
                </div>
              )}
              <footer>
                <button onClick={() => setFilter("")}>应用日期</button>
              </footer>
            </section>
          )}
        </div>
      </div>
      <section className="jnlx-database">
        <header>
          <span>姓名</span>
          <span>当前职位</span>
          <span>公司</span>
          <span>地点 / 学历</span>
          <span>流程</span>
          <span>更新时间</span>
          <span />
        </header>
        {shown.map((candidate) => (
          <article key={candidate.name}>
            <span>
              <i>{candidate.name[0]}</i>
              <b>{candidate.name}</b>
            </span>
            <span>{candidate.role}</span>
            <span>{candidate.company}</span>
            <span>
              {candidate.city} · {candidate.education}
            </span>
            <em>{candidate.stage}</em>
            <time>{candidate.updated}</time>
            <div>
              <button onClick={() => setToast(`已打开${candidate.name}`)}>
                <MoreHorizontal />
              </button>
              <button onClick={() => setModal("delete")}>
                <Trash2 />
              </button>
            </div>
          </article>
        ))}
      </section>
      <footer className="jnlx-pages">
        <span>1–4 / 48 位候选人</span>
        <button disabled>上一页</button>
        <button onClick={() => setToast("已进入下一页")}>下一页</button>
      </footer>
      {modal && (
        <JModal
          type={modal}
          close={() => setModal("")}
          done={() => {
            setToast(modal === "add" ? "候选人已创建" : "候选人已删除");
            setModal("");
          }}
        />
      )}
      <JToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Pipeline() {
  const [drag, setDrag] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const stages = ["储备", "进行中", "成功", "失败"];
  return (
    <section className="jnlx-page jnlx-pipeline">
      <header>
        <div>
          <small>候选人关系周期</small>
          <h1>人才跟进泳道</h1>
        </div>
        <button onClick={() => setToast("本周跟进视图已保存")}>
          <History />
          保存视图
        </button>
      </header>
      <div className="jnlx-board">
        {stages.map((s, i) => (
          <section
            data-lane-kind={["reserve", "progress", "success", "failure"][i]}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              setToast(`${drag}已移动到${s}`);
              setDrag("");
            }}
            key={s}
          >
            <header>
              <h2>{s}</h2>
              <span>{i + 1}</span>
            </header>
            {notes.slice(i % 3, (i % 3) + 1).map((n) => (
              <article
                draggable
                onDragStart={() => setDrag(n.name)}
                key={n.name}
              >
                <div>
                  <GripVertical />
                  <time>{n.updated}</time>
                </div>
                <h3>{n.name}</h3>
                <p>{n.story}</p>
                <footer>
                  <span>{n.company}</span>
                  <button onClick={() => setNote(n.name)}>
                    <MessageSquareText />
                  </button>
                </footer>
              </article>
            ))}
          </section>
        ))}
      </div>
      {note && (
        <div className="jnlx-shade">
          <article className="jnlx-modal">
            <header>
              <h2>{note} · 跟进备注</h2>
            </header>
            <textarea defaultValue="下次联系时先分享团队背景，再确认职业意愿。" />
            <footer>
              <button onClick={() => setNote("")}>取消</button>
              <button
                className="primary"
                onClick={() => {
                  setToast("备注已保存");
                  setNote("");
                }}
              >
                保存
              </button>
            </footer>
          </article>
        </div>
      )}
      <JToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Matching() {
  const [person, setPerson] = useState(0);
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState("");
  return (
    <section className="jnlx-page jnlx-matching">
      <header>
        <small>人物与岗位</small>
        <h1>职业叙事中的匹配</h1>
        <p>把候选人的经历变化、选择偏好和岗位机会放在同一段上下文里。</p>
      </header>
      <nav>
        {notes.map((n, i) => (
          <button
            className={person === i ? "active" : ""}
            onClick={() => setPerson(i)}
            key={n.name}
          >
            <i>{n.name[0]}</i>
            <span>
              <b>{n.name}</b>
              <small>{n.role}</small>
            </span>
          </button>
        ))}
      </nav>
      <main>
        <article>
          <time>2024—现在</time>
          <div>
            <small>当前经历</small>
            <h2>{notes[person].company}</h2>
            <p>{notes[person].story}</p>
          </div>
        </article>
        <article>
          <time>目标机会</time>
          <div>
            <small>具身智能算法负责人</small>
            <h2>角色范围与职业方向一致</h2>
            <p>岗位提供完整的数据、模型和产品闭环，同时要求带领算法团队。</p>
          </div>
        </article>
        <section>
          <header>
            <h3>匹配判断</h3>
            <strong>{[92, 87, 81][person]}</strong>
          </header>
          <p>
            技能、方向和管理范围匹配；建议在推荐前确认候选人对团队决策权的预期。
          </p>
          <button onClick={() => setOpen((v) => !v)}>
            {open ? "收起判断依据" : "查看判断依据"}
          </button>
          {open && (
            <blockquote>
              沟通记录、公开履历和论文方向均支持这一判断。
            </blockquote>
          )}
          <footer>
            <button onClick={() => setToast("已保存到人才纪事")}>
              保存记录
            </button>
            <button
              className="primary"
              onClick={() => setToast("已加入岗位流程")}
            >
              加入流程
            </button>
          </footer>
        </section>
      </main>
      <JToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Cards() {
  const [scope, setScope] = useState("全部");
  const [toast, setToast] = useState("");
  return (
    <section className="jnlx-page jnlx-cards">
      <header>
        <div>
          <small>论文研究记录</small>
          <h1>论文搜索结果</h1>
        </div>
        <nav>
          {["全部", "强烈建议", "已导入"].map((s) => (
            <button
              className={scope === s ? "active" : ""}
              onClick={() => setScope(s)}
              key={s}
            >
              {s}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {papers.map((paper) => (
          <article key={paper.title}>
            <time>{paper.year}</time>
            <i />
            <section>
              <header>
                <span>{paper.tier}</span>
                <button onClick={() => setToast("记录操作已打开")}>
                  <MoreHorizontal />
                </button>
              </header>
              <h2>{paper.title}</h2>
              <p>{paper.abstract}</p>
              <footer>
                <b>{paper.authors}</b>
                <button onClick={() => setToast("已打开论文详情")}>
                  打开论文
                  <ArrowRight />
                </button>
              </footer>
            </section>
          </article>
        ))}
      </main>
      <button className="jnlx-load" onClick={() => setToast("已加载更多记录")}>
        加载更多论文
      </button>
      <JToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function UploadPage() {
  const [blocks, setBlocks] = useState([]);
  const [toast, setToast] = useState("");
  const load = () => {
    setBlocks([
      { title: "基本资料", state: "完成" },
      { title: "工作经历", state: "解析中" },
      { title: "项目与论文", state: "等待" },
    ]);
    setTimeout(
      () => setBlocks((v) => v.map((x) => ({ ...x, state: "完成" }))),
      750,
    );
  };
  return (
    <section className="jnlx-page jnlx-upload">
      <header>
        <small>资料进入人才纪事</small>
        <h1>上传候选人材料</h1>
        <p>文件会被整理成可确认的内容块，再写入人物时间线。</p>
      </header>
      <button className="jnlx-drop" onClick={load}>
        <Upload />
        <span>
          <b>选择简历或个人资料</b>
          <small>PDF、DOCX，单个文件不超过 50 MB</small>
        </span>
      </button>
      <section className="jnlx-blocks">
        {blocks.length ? (
          blocks.map((b, i) => (
            <article key={b.title}>
              <span>{i + 1}</span>
              <div>
                <b>{b.title}</b>
                <small>{b.state}</small>
              </div>
              {b.state === "完成" ? (
                <Check />
              ) : (
                <LoaderCircle className="spin" />
              )}
            </article>
          ))
        ) : (
          <div>
            <FileText />
            <p>上传后，解析出的内容块会显示在这里。</p>
          </div>
        )}
      </section>
      {blocks.length > 0 && (
        <button
          className="primary"
          onClick={() => setToast("已打开内容确认页")}
        >
          查看解析内容
        </button>
      )}
      <JToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Tasks() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const tasks = [
    "补全林昊的公开资料",
    "整理周雨澄的论文经历",
    "生成陈松的联系提纲",
  ];
  return (
    <section className="jnlx-page jnlx-tasks">
      <header>
        <small>持续记录</small>
        <h1>人才任务日志</h1>
      </header>
      <main>
        <nav>
          {tasks.map((t, i) => (
            <button
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={t}
            >
              <span>
                <b>{t}</b>
                <small>
                  {i === 0 ? "运行中" : i === 1 ? "等待确认" : "已完成"}
                </small>
              </span>
              <time>{i + 1} 小时前</time>
            </button>
          ))}
        </nav>
        <article>
          <header>
            <div>
              <small>信息补全</small>
              <h2>{tasks[active]}</h2>
            </div>
            <button onClick={() => setToast("任务已暂停")}>暂停</button>
          </header>
          {[
            ["读取人物已有资料", "已完成"],
            ["搜索公开来源", "已完成"],
            ["核验新的经历变化", "运行中"],
            ["生成审核建议", "等待"],
          ].map(([a, b], i) => (
            <section key={a}>
              <i>
                {i < 2 ? (
                  <Check />
                ) : i === 2 ? (
                  <LoaderCircle className="spin" />
                ) : (
                  <Clock3 />
                )}
              </i>
              <div>
                <b>{a}</b>
                <small>{b}</small>
                {i === 2 && (
                  <p>正在比较公开主页、论文作者信息和已有工作经历。</p>
                )}
              </div>
            </section>
          ))}
          <footer>
            <button onClick={() => setToast("已打开完整运行记录")}>
              查看完整记录
            </button>
          </footer>
        </article>
      </main>
      <JToast text={toast} close={() => setToast("")} />
    </section>
  );
}
const pages = {
  agent: Agent,
  list: List,
  pipeline: Pipeline,
  matching: Matching,
  cards: Cards,
  upload: UploadPage,
  tasks: Tasks,
};
export function JournalExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
