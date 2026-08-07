import { useMemo, useState } from "react";
import { candidates, papers } from "../data/boards";
import {
  ArrowRight,
  BookOpen,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  FileCheck2,
  FileText,
  Filter,
  GripVertical,
  Highlighter,
  Library,
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
const evidence = [
  {
    title: "公司定位与核心业务",
    source: "公司官网",
    confidence: "高",
    quote: "聚焦具身智能机器人本体及通用智能系统研发。",
  },
  {
    title: "近期人才需求",
    source: "招聘页面",
    confidence: "高",
    quote: "正在招聘 VLA、运动控制、灵巧手结构与机器人平台岗位。",
  },
  {
    title: "团队文化与研发节奏",
    source: "公开访谈",
    confidence: "中",
    quote: "强调快速迭代、软硬件协同和产品落地。",
  },
];
function RToast({ text, close }) {
  return text ? (
    <div className="rsx-toast">
      <FileCheck2 />
      <span>{text}</span>
      <button onClick={close}>
        <X />
      </button>
    </div>
  ) : null;
}
function RModal({ type, close, done }) {
  return (
    <div className="rsx-shade">
      <section className="rsx-modal" role="dialog">
        <header>
          <small>CANDIDATE LIBRARY</small>
          <h2>{type === "add" ? "新建候选人" : "删除候选人"}</h2>
        </header>
        {type === "add" ? (
          <>
            <label>
              姓名
              <input defaultValue="赵星羽" />
            </label>
            <label>
              当前公司
              <input defaultValue="远川智能" />
            </label>
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
      </section>
    </div>
  );
}
function Agent() {
  const [msgs, setMsgs] = useState([
    "研究智元新创的具身智能团队，重点关注人员与招聘。",
    "我已找到公司官网、招聘页面和 3 篇公开访谈，将先核验团队定位，再整理招聘方向。",
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setMsgs((v) => [...v, input]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setMsgs((v) => [
        ...v,
        "已将时间范围缩小到近两年，并保留了 6 条可追溯证据。",
      ]);
      setBusy(false);
    }, 650);
  };
  return (
    <section className="rsx-page rsx-agent">
      <header>
        <div>
          <Library />
          <b>Hunter Research</b>
        </div>
        <nav>
          <button>资料库</button>
          <button className="active">研究项目</button>
          <button>洞察</button>
        </nav>
        <button onClick={() => setToast("已创建研究项目")}>
          <Plus />
          新建项目
        </button>
      </header>
      <main>
        <aside>
          <small>研究项目</small>
          <h1>
            智元新创
            <br />
            具身智能团队
          </h1>
          <p>公开资料、招聘信号和人才线索的交叉研究。</p>
          {[
            ["有效来源", "7"],
            ["证据片段", "18"],
            ["待确认洞察", "4"],
          ].map(([a, b]) => (
            <dl key={a}>
              <dt>{a}</dt>
              <dd>{b}</dd>
            </dl>
          ))}
        </aside>
        <section>
          <header>
            <small>研究 Agent</small>
            <h2>项目讨论</h2>
          </header>
          <div>
            {msgs.map((m, i) => (
              <article className={i % 2 ? "agent" : "user"} key={`${m}-${i}`}>
                <i>{i % 2 ? <Bot /> : <UserRound />}</i>
                <p>{m}</p>
              </article>
            ))}
            {busy && (
              <article className="agent">
                <i>
                  <LoaderCircle className="spin" />
                </i>
                <p>正在核验来源并定位相关证据…</p>
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
              placeholder="补充研究问题"
            />
            <button onClick={send}>
              <ArrowRight />
            </button>
          </footer>
        </section>
        <aside className="rsx-sources">
          <h2>当前来源</h2>
          {evidence.map((e, i) => (
            <button key={e.title}>
              <FileText />
              <span>
                <b>{e.source}</b>
                <small>{e.title}</small>
              </span>
              <em>{e.confidence}</em>
            </button>
          ))}
          <button onClick={() => setToast("已打开完整证据列表")}>
            查看全部来源
          </button>
        </aside>
      </main>
      <RToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function List() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState("");
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
    <section className="rsx-page rsx-list">
      <header>
        <div>
          <small>TALENT RESEARCH LIBRARY</small>
          <h1>候选人管理</h1>
        </div>
        <button className="primary" onClick={() => setModal("add")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="rsx-toolbar">
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
            onClick={() => setOpen(open === "pipeline" ? "" : "pipeline")}
          >
            <Filter />
            {pipeline === "全部" ? "流程状态" : pipeline}
            <ChevronDown />
          </button>
          {open === "pipeline" && (
            <section className="rsx-dropdown" role="menu">
              {["全部", "在流程中", "不在流程中"].map((item) => (
                <button
                  role="menuitemradio"
                  aria-checked={pipeline === item}
                  onClick={() => {
                    setPipeline(item);
                    setOpen("");
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
          <button onClick={() => setOpen(open === "company" ? "" : "company")}>
            公司 · {companies.length}
            <ChevronDown />
          </button>
          {open === "company" && (
            <section className="rsx-dropdown rsx-multi" role="menu">
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
                <button onClick={() => setOpen("")}>完成</button>
              </footer>
            </section>
          )}
        </div>
        <div>
          <button
            onClick={() => setOpen(open === "industry" ? "" : "industry")}
          >
            行业
            <ChevronDown />
          </button>
          {open === "industry" && (
            <section className="rsx-industry" role="menu">
              <nav>
                {["人工智能", "汽车", "先进制造"].map((item) => (
                  <button
                    className={industry.startsWith(item) ? "active" : ""}
                    key={item}
                  >
                    {item}
                  </button>
                ))}
              </nav>
              <div>
                {[
                  "人工智能 / 机器人",
                  "人工智能 / 大模型",
                  "人工智能 / 自动驾驶",
                ].map((item) => (
                  <button
                    className={industry === item ? "active" : ""}
                    onClick={() => {
                      setIndustry(item);
                      setOpen("");
                    }}
                    key={item}
                  >
                    {item.split(" / ")[1]}
                    {industry === item && <Check />}
                  </button>
                ))}
              </div>
            </section>
          )}
        </div>
        <div>
          <button onClick={() => setOpen(open === "date" ? "" : "date")}>
            <CalendarDays />
            {dateRange}
            <ChevronDown />
          </button>
          {open === "date" && (
            <section className="rsx-dropdown rsx-date" role="menu">
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
                  <button>2026-07-01</button>
                  <span>至</span>
                  <button>2026-08-07</button>
                </div>
              )}
              <footer>
                <button onClick={() => setOpen("")}>应用日期</button>
              </footer>
            </section>
          )}
        </div>
      </div>
      <section className="rsx-table">
        <header>
          <span>候选人</span>
          <span>当前职位</span>
          <span>公司</span>
          <span>地点 / 学历</span>
          <span>流程</span>
          <span>更新时间</span>
          <span>操作</span>
        </header>
        {shown.map((candidate) => (
          <article key={candidate.name}>
            <span>
              <i>{candidate.name[0]}</i>
              <b>
                {candidate.name}
                <small>{candidate.opportunity}</small>
              </b>
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
                查看
              </button>
              <button onClick={() => setModal("delete")}>
                <Trash2 />
              </button>
            </div>
          </article>
        ))}
      </section>
      <footer className="rsx-pages">
        <span>1–4 / 48</span>
        <button disabled>上一页</button>
        <button onClick={() => setToast("已进入下一页")}>下一页</button>
      </footer>
      {modal && (
        <RModal
          type={modal}
          close={() => setModal("")}
          done={() => {
            setToast(modal === "add" ? "候选人已创建" : "候选人已删除");
            setModal("");
          }}
        />
      )}
      <RToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Pipeline() {
  const [drag, setDrag] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const lanes = ["储备", "进行中", "成功", "失败"];
  return (
    <section className="rsx-page rsx-pipeline">
      <header>
        <div>
          <small>研究证据流程</small>
          <h1>材料审阅泳道</h1>
        </div>
        <button onClick={() => setToast("研究视图已保存")}>保存视图</button>
      </header>
      <div className="rsx-board">
        {lanes.map((lane, i) => (
          <section
            data-lane-kind={["reserve", "progress", "success", "failure"][i]}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              setToast(`${drag}已移动到${lane}`);
              setDrag("");
            }}
            key={lane}
          >
            <header>
              <b>{lane}</b>
              <span>{i + 1}</span>
            </header>
            {evidence.slice(i % 3, (i % 3) + 1).map((e) => (
              <article
                draggable
                onDragStart={() => setDrag(e.title)}
                key={e.title}
              >
                <div>
                  <GripVertical />
                  <FileText />
                </div>
                <small>{e.source}</small>
                <h2>{e.title}</h2>
                <blockquote>{e.quote}</blockquote>
                <footer>
                  <em>{e.confidence}可信</em>
                  <button onClick={() => setNote(e.title)}>
                    <MessageSquareText />
                  </button>
                </footer>
              </article>
            ))}
          </section>
        ))}
      </div>
      {note && (
        <div className="rsx-shade">
          <section className="rsx-modal">
            <header>
              <h2>添加研究批注</h2>
            </header>
            <textarea defaultValue="这条证据可以支持团队招聘方向，但仍需另一独立来源核验。" />
            <footer>
              <button onClick={() => setNote("")}>取消</button>
              <button
                className="primary"
                onClick={() => {
                  setToast("批注已保存");
                  setNote("");
                }}
              >
                保存批注
              </button>
            </footer>
          </section>
        </div>
      )}
      <RToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Matching() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  return (
    <section className="rsx-page rsx-matching">
      <header>
        <div>
          <small>EVIDENCE-BACKED MATCH</small>
          <h1>候选人证据评审</h1>
        </div>
        <button className="primary" onClick={() => setToast("评审结果已确认")}>
          确认评审
        </button>
      </header>
      <main>
        <aside>
          {["林昊", "周雨澄", "陈松"].map((n, i) => (
            <button
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={n}
            >
              <i>{n[0]}</i>
              <span>
                <b>{n}</b>
                <small>{["算法负责人", "VLA 研究员", "感知专家"][i]}</small>
              </span>
              <strong>{[94, 88, 83][i]}</strong>
            </button>
          ))}
        </aside>
        <article>
          <header>
            <small>候选人 {active + 1} / 3</small>
            <h2>{["林昊", "周雨澄", "陈松"][active]}</h2>
            <p>与具身智能算法负责人岗位的证据对照</p>
          </header>
          {evidence.map((e, i) => (
            <section key={e.title}>
              <div>
                <FileCheck2 />
                <span>
                  <small>{e.source}</small>
                  <b>{e.title}</b>
                </span>
                <em>{e.confidence}</em>
              </div>
              <blockquote>{e.quote}</blockquote>
              <p>
                {i === 0
                  ? "支持候选人的研究方向和岗位问题域一致。"
                  : "作为辅助证据，需要结合候选人本人经历判断。"}
              </p>
            </section>
          ))}
          <footer>
            <button onClick={() => setToast("已标记需要补证")}>需要补证</button>
            <button onClick={() => setToast("已加入岗位流程")}>加入流程</button>
          </footer>
        </article>
      </main>
      <RToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Cards() {
  const [tab, setTab] = useState("全部");
  const [toast, setToast] = useState("");
  return (
    <section className="rsx-page rsx-cards">
      <header>
        <div>
          <small>ACADEMIC RESEARCH CARDS</small>
          <h1>论文搜索结果</h1>
        </div>
        <nav>
          {["全部", "强烈建议", "已导入"].map((x) => (
            <button
              className={tab === x ? "active" : ""}
              onClick={() => setTab(x)}
              key={x}
            >
              {x}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {papers.map((paper, i) => (
          <article key={paper.title}>
            <header>
              <span>
                {paper.source} · {paper.year}
              </span>
              <button onClick={() => setToast("论文菜单已打开")}>
                <MoreHorizontal />
              </button>
            </header>
            <h2>{paper.title}</h2>
            <p>{paper.abstract}</p>
            <footer>
              <span>
                <FileCheck2 />
                {paper.cited} 次引用
              </span>
              <button onClick={() => setToast("已打开论文详情")}>
                打开论文
                <ArrowRight />
              </button>
            </footer>
          </article>
        ))}
      </main>
      <button className="rsx-more" onClick={() => setToast("已加载更多论文")}>
        加载更多
      </button>
      <RToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function UploadPage() {
  const [state, setState] = useState("idle");
  const [toast, setToast] = useState("");
  const start = () => {
    setState("reading");
    setTimeout(() => setState("done"), 800);
  };
  return (
    <section className="rsx-page rsx-upload">
      <header>
        <small>MATERIAL INGESTION</small>
        <h1>导入研究材料</h1>
        <p>保留原始内容、来源和页码，解析结果不会覆盖原件。</p>
      </header>
      <main>
        <section>
          <button className="rsx-drop" onClick={start}>
            <Upload />
            <span>
              <b>选择 PDF、DOCX 或网页快照</b>
              <small>支持批量上传，单个文件不超过 50 MB</small>
            </span>
          </button>
          <label>
            材料来源
            <input defaultValue="公司官网 / 公开访谈" />
          </label>
          <label>
            加入研究项目
            <div>
              <button className="active">智元新创</button>
              <button>新建项目</button>
            </div>
          </label>
          <button className="primary" onClick={start}>
            上传并解析
          </button>
        </section>
        <aside>
          <h2>材料读取</h2>
          {state === "idle" ? (
            <div>
              <BookOpen />
              <p>上传材料后显示页码、引用和解析进度。</p>
            </div>
          ) : (
            <article>
              <header>
                <FileText />
                <span>
                  <b>团队公开访谈.pdf</b>
                  <small>
                    {state === "done"
                      ? "18 页 · 解析完成"
                      : "正在读取第 11 / 18 页"}
                  </small>
                </span>
              </header>
              <i>
                <em style={{ width: state === "done" ? "100%" : "61%" }} />
              </i>
              {state === "done" && (
                <button onClick={() => setToast("已打开材料阅读页")}>
                  打开材料
                  <ArrowRight />
                </button>
              )}
            </article>
          )}
        </aside>
      </main>
      <RToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Tasks() {
  const [active, setActive] = useState(1);
  const [toast, setToast] = useState("");
  const steps = [
    "收集候选来源",
    "阅读公开材料",
    "提取证据片段",
    "交叉核验结论",
    "生成研究摘要",
  ];
  return (
    <section className="rsx-page rsx-tasks">
      <header>
        <div>
          <small>RESEARCH PROGRESS</small>
          <h1>公司研究任务</h1>
        </div>
        <span>
          <i />
          运行中
        </span>
      </header>
      <main>
        <article>
          <header>
            <Library />
            <div>
              <small>智元新创</small>
              <h2>具身智能团队研究</h2>
            </div>
            <strong>64%</strong>
          </header>
          <div className="rsx-taskline">
            {steps.map((s, i) => (
              <button
                className={active === i ? "active" : i < active ? "done" : ""}
                onClick={() => setActive(i)}
                key={s}
              >
                <i>
                  {i < active ? (
                    <Check />
                  ) : i === active ? (
                    <LoaderCircle className="spin" />
                  ) : (
                    i + 1
                  )}
                </i>
                <span>
                  <b>{s}</b>
                  <small>
                    {i < active ? "已完成" : i === active ? "处理中" : "等待"}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </article>
        <aside>
          <small>当前步骤</small>
          <h2>{steps[active]}</h2>
          <p>
            正在阅读公司官网、招聘页面和公开访谈，并保留每条结论对应的来源位置。
          </p>
          <dl>
            <div>
              <dt>已处理来源</dt>
              <dd>7 / 12</dd>
            </div>
            <div>
              <dt>证据片段</dt>
              <dd>18</dd>
            </div>
            <div>
              <dt>待核验</dt>
              <dd>4</dd>
            </div>
          </dl>
          <button onClick={() => setToast("任务已暂停")}>暂停研究</button>
        </aside>
      </main>
      <RToast text={toast} close={() => setToast("")} />
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
export function ResearchExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
