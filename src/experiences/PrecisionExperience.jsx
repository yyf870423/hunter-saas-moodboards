import { useMemo, useState } from "react";
import { papers } from "../data/boards";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileText,
  Filter,
  GripVertical,
  LoaderCircle,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";

const people = [
  {
    name: "林昊",
    role: "具身智能算法负责人",
    company: "穹境机器人",
    city: "上海",
    date: "2026-08-06",
    tags: ["VLA", "管理"],
    stage: "技术复试",
  },
  {
    name: "周雨澄",
    role: "机器人学习研究员",
    company: "奇点智研",
    city: "北京",
    date: "2026-08-05",
    tags: ["强化学习"],
    stage: "待确认",
  },
  {
    name: "陈松",
    role: "感知算法专家",
    company: "逐光科技",
    city: "深圳",
    date: "2026-08-03",
    tags: ["感知", "量产"],
    stage: "初次沟通",
  },
];

function OpsNotice({ text, onClose }) {
  return text ? (
    <div className="opsx-toast" role="status">
      <Check />
      <span>{text}</span>
      <button onClick={onClose} aria-label="关闭通知">
        <X />
      </button>
    </div>
  ) : null;
}

function AgentPage() {
  const [messages, setMessages] = useState([
    "已读取岗位画像和 3 组寻访关键词。",
    "我会优先核验具身智能团队经历，再整理候选人证据。",
  ]);
  const [text, setText] = useState("");
  const [running, setRunning] = useState(false);
  const [notice, setNotice] = useState("");
  const send = () => {
    if (!text.trim()) return;
    setMessages((v) => [...v, text.trim()]);
    setText("");
    setRunning(true);
    window.setTimeout(() => {
      setMessages((v) => [
        ...v,
        "已收到补充要求，下一批候选人将排除纯学术背景。",
      ]);
      setRunning(false);
    }, 650);
  };
  return (
    <section className="opsx-page opsx-agent">
      <aside>
        <h2>任务队列</h2>
        {["寻找 VLA 负责人", "补全林昊资料", "分析岗位画像"].map((item, i) => (
          <button className={i === 0 ? "active" : ""} key={item}>
            <i />
            {item}
            <small>{i === 0 ? "运行中" : "已完成"}</small>
          </button>
        ))}
      </aside>
      <main>
        <header>
          <div>
            <Bot />
            <span>
              <b>寻找 VLA 负责人</b>
              <small>人才寻访 Agent</small>
            </span>
          </div>
          <button onClick={() => setNotice("任务已暂停")}>
            {running ? "停止" : "暂停任务"}
          </button>
        </header>
        <div className="opsx-thread">
          {messages.map((item, i) => (
            <article className={i % 2 ? "agent" : "user"} key={`${item}-${i}`}>
              <i>{i % 2 ? <Bot /> : <UserRound />}</i>
              <p>{item}</p>
            </article>
          ))}
          {running && (
            <article className="agent">
              <i>
                <LoaderCircle className="spin" />
              </i>
              <p>正在核验候选人的职级与岗位范围…</p>
            </article>
          )}
        </div>
        <footer>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="补充要求，按 Enter 发送"
          />
          <button onClick={send} disabled={running || !text.trim()}>
            发送
            <ArrowRight />
          </button>
        </footer>
      </main>
      <aside className="opsx-artifacts">
        <h2>当前产物</h2>
        {[
          ["候选人池", "48 人"],
          ["已核验证据", "126 条"],
          ["待确认", "12 人"],
        ].map(([a, b]) => (
          <article key={a}>
            <span>{a}</span>
            <b>{b}</b>
          </article>
        ))}
        <button onClick={() => setNotice("已打开当前候选人结果")}>
          查看当前结果
        </button>
      </aside>
      <OpsNotice text={notice} onClose={() => setNotice("")} />
    </section>
  );
}

function ListPage() {
  const [query, setQuery] = useState("");
  const [openFilter, setOpenFilter] = useState("");
  const [selected, setSelected] = useState([]);
  const [companies, setCompanies] = useState(["穹境机器人"]);
  const [education, setEducation] = useState(["硕士"]);
  const [industry, setIndustry] = useState("人工智能 / 机器人");
  const [pipelineState, setPipelineState] = useState("全部");
  const [modal, setModal] = useState("");
  const [notice, setNotice] = useState("");
  const [range, setRange] = useState("近 7 天");
  const rows = useMemo(
    () =>
      people.filter((p) =>
        `${p.name}${p.role}${p.company}${p.city}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );
  const toggle = (name) =>
    setSelected((v) =>
      v.includes(name) ? v.filter((x) => x !== name) : [...v, name],
    );
  const toggleFilterValue = (setter, value) =>
    setter((items) =>
      items.includes(value)
        ? items.filter((item) => item !== value)
        : [...items, value],
    );
  return (
    <section className="opsx-page opsx-list">
      <header>
        <div>
          <small>候选人管理</small>
          <h1>人才运营列表</h1>
        </div>
        <button className="primary" onClick={() => setModal("add")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="opsx-filters">
        <label>
          <Search />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="搜索姓名、公司、地点或经历"
          />
        </label>
        <div className="opsx-menu-wrap">
          <button
            onClick={() =>
              setOpenFilter(openFilter === "company" ? "" : "company")
            }
          >
            公司 {companies.length ? `· ${companies.length}` : ""}
            <ChevronDown />
          </button>
          {openFilter === "company" && (
            <div className="opsx-popover" role="menu">
              {["穹境机器人", "奇点智研", "逐光科技"].map((item) => (
                <button
                  role="menuitemcheckbox"
                  aria-checked={companies.includes(item)}
                  onClick={() => toggleFilterValue(setCompanies, item)}
                  key={item}
                >
                  <span
                    className={`fake-check ${companies.includes(item) ? "checked" : ""}`}
                  >
                    {companies.includes(item) && <Check />}
                  </span>
                  {item}
                </button>
              ))}
              <footer>
                <button onClick={() => setCompanies([])}>清空</button>
                <button onClick={() => setOpenFilter("")}>完成</button>
              </footer>
            </div>
          )}
        </div>
        <div className="opsx-menu-wrap">
          <button
            onClick={() =>
              setOpenFilter(openFilter === "education" ? "" : "education")
            }
          >
            学历 {education.length ? `· ${education.length}` : ""}
            <ChevronDown />
          </button>
          {openFilter === "education" && (
            <div className="opsx-popover" role="menu">
              {["本科", "硕士", "博士"].map((item) => (
                <button
                  role="menuitemcheckbox"
                  aria-checked={education.includes(item)}
                  onClick={() => toggleFilterValue(setEducation, item)}
                  key={item}
                >
                  <span
                    className={`fake-check ${education.includes(item) ? "checked" : ""}`}
                  >
                    {education.includes(item) && <Check />}
                  </span>
                  {item}
                </button>
              ))}
              <footer>
                <button onClick={() => setEducation([])}>清空</button>
                <button onClick={() => setOpenFilter("")}>完成</button>
              </footer>
            </div>
          )}
        </div>
        <div className="opsx-menu-wrap opsx-cascade-wrap">
          <button
            onClick={() =>
              setOpenFilter(openFilter === "industry" ? "" : "industry")
            }
          >
            行业
            <ChevronDown />
          </button>
          {openFilter === "industry" && (
            <div className="opsx-popover opsx-cascade" role="menu">
              <nav>
                {["人工智能", "先进制造", "汽车"].map((item) => (
                  <button
                    className={industry.startsWith(item) ? "active" : ""}
                    key={item}
                  >
                    {item}
                    <ArrowRight />
                  </button>
                ))}
              </nav>
              <section>
                {[
                  "人工智能 / 机器人",
                  "人工智能 / 大模型",
                  "人工智能 / 自动驾驶",
                ].map((item) => (
                  <button
                    className={industry === item ? "active" : ""}
                    onClick={() => {
                      setIndustry(item);
                      setOpenFilter("");
                    }}
                    key={item}
                  >
                    {industry === item && <Check />}
                    {item.split(" / ")[1]}
                  </button>
                ))}
              </section>
            </div>
          )}
        </div>
        <div className="opsx-menu-wrap">
          <button
            onClick={() =>
              setOpenFilter(openFilter === "pipeline" ? "" : "pipeline")
            }
          >
            {pipelineState === "全部" ? "流程状态" : pipelineState}
            <ChevronDown />
          </button>
          {openFilter === "pipeline" && (
            <div className="opsx-popover" role="menu">
              {["全部", "在流程中", "不在流程中"].map((item) => (
                <button
                  role="menuitemradio"
                  aria-checked={pipelineState === item}
                  onClick={() => {
                    setPipelineState(item);
                    setOpenFilter("");
                  }}
                  key={item}
                >
                  <span
                    className={`fake-radio ${pipelineState === item ? "checked" : ""}`}
                  />
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="opsx-menu-wrap">
          <button
            onClick={() => setOpenFilter(openFilter === "date" ? "" : "date")}
          >
            <CalendarDays />
            {range}
            <ChevronDown />
          </button>
          {openFilter === "date" && (
            <div className="opsx-popover opsx-date-menu" role="menu">
              <div className="opsx-segments">
                {["近 7 天", "近 30 天", "自定义"].map((item) => (
                  <button
                    className={range === item ? "active" : ""}
                    onClick={() => setRange(item)}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </div>
              {range === "自定义" && (
                <div className="opsx-date-inputs">
                  <button>2026-07-01</button>
                  <span>至</span>
                  <button>2026-08-07</button>
                </div>
              )}
              <footer>
                <button onClick={() => setOpenFilter("")}>应用日期</button>
              </footer>
            </div>
          )}
        </div>
        <span>{selected.length} 项已选</span>
      </div>
      <div className="opsx-table">
        <div className="head">
          <span>选择</span>
          <span>候选人</span>
          <span>当前公司</span>
          <span>地点</span>
          <span>标签</span>
          <span>更新时间</span>
          <span>操作</span>
        </div>
        {rows.map((p, i) => (
          <div className="row" key={p.name}>
            <button
              className={`opsx-checkbox ${selected.includes(p.name) ? "checked" : ""}`}
              onClick={() => toggle(p.name)}
              role="checkbox"
              aria-checked={selected.includes(p.name)}
            >
              {selected.includes(p.name) && <Check />}
            </button>
            <span>
              <i>{p.name[0]}</i>
              <b>
                {p.name}
                <small>{p.role}</small>
              </b>
            </span>
            <span
              className="truncate has-tooltip"
              data-tooltip={`${p.company} · 智能机器人事业部`}
            >
              {p.company} · 智能机器人事业部
            </span>
            <span>{p.city}</span>
            <span>
              {p.tags.map((t) => (
                <em key={t}>{t}</em>
              ))}
            </span>
            <time>{p.date}</time>
            <span className="actions">
              <button
                className="has-tooltip"
                data-tooltip="更多操作"
                aria-label="更多操作"
                onClick={() => setNotice(`已打开${p.name}操作菜单`)}
              >
                <MoreHorizontal />
              </button>
              <button
                className="has-tooltip"
                data-tooltip="删除"
                aria-label="删除"
                onClick={() => setModal(`delete:${p.name}`)}
              >
                <Trash2 />
              </button>
            </span>
          </div>
        ))}
      </div>
      <footer className="opsx-pagination">
        <span>1–{rows.length} / 48</span>
        <button disabled>上一页</button>
        <button onClick={() => setNotice("已进入第 2 页")}>下一页</button>
      </footer>
      {modal && (
        <div className="opsx-backdrop" role="presentation">
          <div className="opsx-modal" role="dialog" aria-modal="true">
            <header>
              <h2>{modal === "add" ? "新建候选人" : "删除候选人"}</h2>
            </header>
            {modal === "add" ? (
              <>
                <label>
                  姓名
                  <input defaultValue="赵星羽" />
                </label>
                <label>
                  当前公司
                  <input defaultValue="远川智能" />
                </label>
                <label>
                  备注
                  <textarea placeholder="填写补充信息" />
                </label>
              </>
            ) : (
              <p>确认删除“{modal.split(":")[1]}”吗？删除后无法恢复。</p>
            )}
            <footer>
              <button onClick={() => setModal("")}>取消</button>
              <button
                className={modal === "add" ? "primary" : "danger"}
                onClick={() => {
                  setNotice(modal === "add" ? "候选人已创建" : "候选人已删除");
                  setModal("");
                }}
              >
                {modal === "add" ? "确认创建" : "确认删除"}
              </button>
            </footer>
          </div>
        </div>
      )}
      <OpsNotice text={notice} onClose={() => setNotice("")} />
    </section>
  );
}

function PipelinePage() {
  const initial = {
    储备: ["赵星羽"],
    进行中: ["陈松", "周雨澄"],
    成功: ["林昊"],
    失败: ["许澄"],
  };
  const [lanes, setLanes] = useState(initial);
  const [drag, setDrag] = useState("");
  const [note, setNote] = useState("");
  const [notice, setNotice] = useState("");
  const move = (stage) => {
    if (!drag) return;
    setLanes((v) =>
      Object.fromEntries(
        Object.entries(v).map(([k, items]) => [
          k,
          k === stage
            ? [...items.filter((x) => x !== drag), drag]
            : items.filter((x) => x !== drag),
        ]),
      ),
    );
    setNotice(`${drag}已移动到${stage}`);
    setDrag("");
  };
  return (
    <section className="opsx-page opsx-pipeline">
      <header>
        <div>
          <small>具身智能算法负责人</small>
          <h1>招聘流程</h1>
        </div>
        <button onClick={() => setNotice("已保存当前流程视图")}>
          保存视图
        </button>
      </header>
      <div className="opsx-lanes">
        {Object.entries(lanes).map(([stage, items]) => (
          <section
            data-lane-kind={
              {
                储备: "reserve",
                进行中: "progress",
                成功: "success",
                失败: "failure",
              }[stage]
            }
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => move(stage)}
            key={stage}
          >
            <header>
              <b>{stage}</b>
              <span>{items.length}</span>
            </header>
            {items.map((name) => (
              <article draggable onDragStart={() => setDrag(name)} key={name}>
                <GripVertical />
                <span>
                  <b>{name}</b>
                  <small>
                    {people.find((p) => p.name === name)?.role ||
                      "机器人平台架构师"}
                  </small>
                </span>
                <button
                  className="has-tooltip"
                  data-tooltip="填写备注"
                  aria-label="填写备注"
                  onClick={() => setNote(name)}
                >
                  <MessageSquareText />
                </button>
              </article>
            ))}
            <button
              className="lane-add"
              onClick={() => setNotice(`已打开${stage}添加入口`)}
            >
              <Plus />
              添加候选人
            </button>
          </section>
        ))}
      </div>
      {note && (
        <div className="opsx-backdrop">
          <div className="opsx-modal" role="dialog">
            <header>
              <h2>填写流程备注</h2>
            </header>
            <textarea defaultValue={`${note}：已确认下周三技术面试。`} />
            <footer>
              <button onClick={() => setNote("")}>取消</button>
              <button
                className="primary"
                onClick={() => {
                  setNotice("备注已保存");
                  setNote("");
                }}
              >
                保存备注
              </button>
            </footer>
          </div>
        </div>
      )}
      <OpsNotice text={notice} onClose={() => setNotice("")} />
    </section>
  );
}

function MatchingPage() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [notice, setNotice] = useState("");
  const matches = [
    ...people,
    {
      name: "许澄",
      role: "大学副教授",
      company: "华东理工大学",
      city: "上海",
      date: "2026-08-01",
      tags: ["控制"],
      stage: "待确认",
    },
  ];
  return (
    <section className="opsx-page opsx-matching">
      <header>
        <div>
          <small>具身智能算法负责人</small>
          <h1>匹配结果</h1>
        </div>
        <div>
          <button>仅看新人</button>
          <button
            className="primary"
            onClick={() => setNotice("已重新计算匹配结果")}
          >
            重新匹配
          </button>
        </div>
      </header>
      <div className="opsx-match-layout">
        <aside>
          {matches.map((p, i) => (
            <button
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={p.name}
            >
              <span>
                <b>{p.name}</b>
                <small>{p.role}</small>
                <i className="opsx-score-track">
                  <em style={{ width: `${[94, 88, 83, 61][i]}%` }} />
                </i>
              </span>
              <strong>{[94, 88, 83, 61][i]}</strong>
            </button>
          ))}
        </aside>
        <main>
          <header>
            <div>
              <i>{matches[active].name[0]}</i>
              <span>
                <h2>{matches[active].name}</h2>
                <p>
                  {matches[active].role} · {matches[active].company}
                </p>
              </span>
            </div>
            <strong>
              {[94, 88, 83, 61][active]}
              <small>匹配分</small>
            </strong>
          </header>
          <section>
            <div className="opsx-match-verdict">
              <span>建议结论</span>
              <b>{active === 3 ? "有条件匹配" : "建议推进"}</b>
              <em>
                {active === 3 ? "职级范围需要确认" : "通过职级与岗位范围门禁"}
              </em>
            </div>
            <h3>匹配依据</h3>
            <p>
              具备目标岗位需要的多模态模型、机器人学习和团队协作经验，最近两段经历与岗位问题域一致。
            </p>
            <button onClick={() => setExpanded((v) => !v)}>
              {expanded ? "收起证据" : "展开完整证据"}
            </button>
            {expanded && (
              <ul>
                <li>负责 VLA 模型训练与真实机器人数据闭环。</li>
                <li>带领 8 人算法团队完成产品交付。</li>
                <li>公开论文与岗位研究方向一致。</li>
              </ul>
            )}
          </section>
          <footer>
            <button onClick={() => setNotice("已标记为不合适")}>不合适</button>
            <button
              onClick={() => setNotice("已加入岗位流程")}
              className="primary"
            >
              加入流程
            </button>
          </footer>
        </main>
      </div>
      <OpsNotice text={notice} onClose={() => setNotice("")} />
    </section>
  );
}

function CardsPage() {
  const [sort, setSort] = useState("全部");
  const [notice, setNotice] = useState("");
  return (
    <section className="opsx-page opsx-cards">
      <header>
        <div>
          <small>学术搜索 · 具身智能</small>
          <h1>论文搜索结果</h1>
        </div>
        <div className="opsx-segments">
          {["全部", "强烈建议", "已导入"].map((x) => (
            <button
              className={sort === x ? "active" : ""}
              onClick={() => setSort(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
      </header>
      <div className="opsx-card-grid">
        {papers.map((paper) => (
          <article key={paper.title}>
            <header>
              <em>{paper.tier}</em>
              <button onClick={() => setNotice("已打开论文操作菜单")}>
                <MoreHorizontal />
              </button>
            </header>
            <h2>{paper.title}</h2>
            <p>{paper.authors}</p>
            <dl>
              <div>
                <dt>年份</dt>
                <dd>{paper.year}</dd>
              </div>
              <div>
                <dt>引用</dt>
                <dd>{paper.cited}</dd>
              </div>
              <div>
                <dt>来源</dt>
                <dd className="opsx-source">{paper.source}</dd>
              </div>
            </dl>
            <footer>
              <span className="truncate">{paper.institutions}</span>
              <button onClick={() => setNotice("已打开论文详情")}>
                查看论文
                <ArrowRight />
              </button>
            </footer>
          </article>
        ))}
      </div>
      <footer className="opsx-pagination">
        <span>1–4 / 12</span>
        <button disabled>上一页</button>
        <button onClick={() => setNotice("已进入下一页")}>下一页</button>
      </footer>
      <OpsNotice text={notice} onClose={() => setNotice("")} />
    </section>
  );
}

function UploadPage() {
  const [files, setFiles] = useState([]);
  const [notice, setNotice] = useState("");
  const add = () => {
    setFiles([
      { name: "候选人简历-林昊.pdf", status: "解析中", progress: 34 },
      { name: "候选人名单.xlsx", status: "等待中", progress: 0 },
    ]);
    window.setTimeout(
      () =>
        setFiles((v) =>
          v.map((f, i) => ({
            ...f,
            status: i ? "格式错误" : "解析完成",
            progress: i ? 0 : 100,
          })),
        ),
      850,
    );
  };
  return (
    <section className="opsx-page opsx-upload">
      <header>
        <div>
          <small>资料导入</small>
          <h1>上传并分析候选人资料</h1>
        </div>
      </header>
      <button
        className="opsx-drop"
        onClick={add}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          add();
        }}
      >
        <Upload />
        <b>拖放文件到这里，或点击选择</b>
        <span>支持 PDF、DOCX、XLSX，单个文件不超过 50 MB</span>
      </button>
      <div className="opsx-upload-queue">
        <header>
          <b>处理队列</b>
          <span>{files.length} 个文件</span>
        </header>
        {files.length ? (
          files.map((f, i) => (
            <article key={f.name}>
              <FileText />
              <span>
                <b>{f.name}</b>
                <small>{f.status}</small>
                <i>
                  <em style={{ width: `${f.progress}%` }} />
                </i>
              </span>
              {f.status === "格式错误" ? (
                <button onClick={() => setNotice("已重新选择文件")}>
                  重新选择
                </button>
              ) : f.status === "解析完成" ? (
                <Check />
              ) : (
                <LoaderCircle className="spin" />
              )}
            </article>
          ))
        ) : (
          <p>尚未添加文件。</p>
        )}
      </div>
      <OpsNotice text={notice} onClose={() => setNotice("")} />
    </section>
  );
}

function TasksPage() {
  const [tasks, setTasks] = useState([
    { name: "调研智元新创", status: "运行中", progress: 68 },
    { name: "补全林昊资料", status: "需处理", progress: 45 },
    { name: "解析自动驾驶岗位", status: "已完成", progress: 100 },
    { name: "导入论文结果", status: "失败", progress: 72 },
  ]);
  const [notice, setNotice] = useState("");
  const act = (i) =>
    setTasks((v) =>
      v.map((t, n) =>
        n === i
          ? {
              ...t,
              status:
                t.status === "运行中"
                  ? "已暂停"
                  : t.status === "失败"
                    ? "运行中"
                    : "运行中",
            }
          : t,
      ),
    );
  return (
    <section className="opsx-page opsx-tasks">
      <header>
        <div>
          <small>Agent 运行</small>
          <h1>任务进度</h1>
        </div>
        <button onClick={() => setNotice("已创建新任务")} className="primary">
          <Plus />
          新建任务
        </button>
      </header>
      <div className="opsx-task-summary">
        {[
          ["运行中", 4],
          ["需处理", 3],
          ["今日完成", 11],
          ["失败", 1],
        ].map(([a, b]) => (
          <article key={a}>
            <span>{a}</span>
            <strong>{b}</strong>
          </article>
        ))}
      </div>
      <div className="opsx-task-table">
        <div className="head">
          <span>任务</span>
          <span>状态</span>
          <span>进度</span>
          <span>更新时间</span>
          <span>操作</span>
        </div>
        {tasks.map((t, i) => (
          <div className="row" key={t.name}>
            <span>
              <i className={`state-${i}`}>
                {t.status === "失败" ? (
                  <CircleAlert />
                ) : t.status === "已完成" ? (
                  <Check />
                ) : (
                  <LoaderCircle
                    className={t.status === "运行中" ? "spin" : ""}
                  />
                )}
              </i>
              <b>
                {t.name}
                <small>
                  {["公司调研", "信息补全", "岗位解析", "学术搜索"][i]}
                </small>
              </b>
            </span>
            <em>{t.status}</em>
            <span className="progress">
              <i>
                <b style={{ width: `${t.progress}%` }} />
              </i>
              {t.progress}%
            </span>
            <time>{i + 2} 分钟前</time>
            <button
              onClick={() => {
                act(i);
                setNotice(
                  t.status === "失败" ? "任务已重新运行" : "任务状态已更新",
                );
              }}
            >
              {t.status === "运行中"
                ? "暂停"
                : t.status === "失败"
                  ? "重试"
                  : "查看"}
            </button>
          </div>
        ))}
      </div>
      <OpsNotice text={notice} onClose={() => setNotice("")} />
    </section>
  );
}

const pages = {
  agent: AgentPage,
  list: ListPage,
  pipeline: PipelinePage,
  matching: MatchingPage,
  cards: CardsPage,
  upload: UploadPage,
  tasks: TasksPage,
};
export function PrecisionExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
