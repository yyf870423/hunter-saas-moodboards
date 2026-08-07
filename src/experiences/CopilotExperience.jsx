import { useMemo, useState } from "react";
import { candidates, papers } from "../data/boards";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  FileCheck2,
  FileText,
  GripVertical,
  LoaderCircle,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
const suggestions = [
  {
    field: "当前职位",
    before: "算法专家",
    after: "具身智能算法负责人",
    confidence: 94,
    reason: "个人主页和最近公开演讲均使用该职位。",
  },
  {
    field: "技能标签",
    before: "机器人学习",
    after: "VLA、机器人学习、数据闭环",
    confidence: 89,
    reason: "项目和论文内容支持新增标签。",
  },
  {
    field: "职业状态",
    before: "未知",
    after: "开放了解机会",
    confidence: 82,
    reason: "最近沟通记录中明确表达。",
  },
];
function CToast({ text, close }) {
  return text ? (
    <div className="cpx-toast">
      <Sparkles />
      <span>{text}</span>
      <button onClick={close}>
        <X />
      </button>
    </div>
  ) : null;
}
function CModal({ type, close, done }) {
  return (
    <div className="cpx-shade">
      <section className="cpx-modal" role="dialog">
        <header>
          <Sparkles />
          <div>
            <small>CONTEXTUAL COPILOT</small>
            <h2>{type === "add" ? "添加候选人" : "删除候选人"}</h2>
          </div>
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
          <p>删除候选人后，相关建议和审核记录也会一并清理。</p>
        )}
        <footer>
          <button onClick={close}>取消</button>
          <button
            className={type === "add" ? "primary" : "danger"}
            onClick={done}
          >
            {type === "add" ? "确认添加" : "确认删除"}
          </button>
        </footer>
      </section>
    </div>
  );
}
function Agent() {
  const [messages, setMessages] = useState([
    "帮我检查林昊的资料有哪些值得更新。",
    "我发现 3 项可更新内容，均有公开来源支持。你可以逐项采纳，也可以继续追问依据。",
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
        "已补充说明：当前职位来自个人主页，职业状态来自最近一次用户沟通。",
      ]);
      setBusy(false);
    }, 650);
  };
  return (
    <section className="cpx-page cpx-agent">
      <aside>
        <header>
          <i>林</i>
          <span>
            <b>林昊</b>
            <small>候选人资料</small>
          </span>
        </header>
        <nav>
          {["基本信息", "工作经历", "项目论文", "沟通记录"].map((x, i) => (
            <button className={i === 0 ? "active" : ""} key={x}>
              {x}
            </button>
          ))}
        </nav>
        <section>
          <small>当前职位</small>
          <h2>算法专家</h2>
          <p>穹境机器人 · 上海</p>
        </section>
        <button onClick={() => setToast("已进入资料编辑")}>编辑资料</button>
      </aside>
      <main>
        <header>
          <div>
            <Sparkles />
            <span>
              <b>资料补全副驾</b>
              <small>建议只在当前候选人上下文中生效</small>
            </span>
          </div>
          <button onClick={() => setToast("建议已暂时收起")}>收起建议</button>
        </header>
        <div className="cpx-thread">
          {messages.map((m, i) => (
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
              <p>正在核对建议与来源…</p>
            </article>
          )}
        </div>
        <footer>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="追问建议依据或补充要求"
          />
          <button onClick={send}>
            <ArrowRight />
          </button>
        </footer>
      </main>
      <aside className="cpx-suggestions">
        <header>
          <h2>3 项建议</h2>
          <span>等待审核</span>
        </header>
        {suggestions.map((s) => (
          <article key={s.field}>
            <header>
              <small>{s.field}</small>
              <strong>{s.confidence}%</strong>
            </header>
            <del>{s.before}</del>
            <b>{s.after}</b>
            <p>{s.reason}</p>
            <footer>
              <button onClick={() => setToast(`${s.field}建议已忽略`)}>
                <ThumbsDown />
              </button>
              <button onClick={() => setToast(`${s.field}建议已采纳`)}>
                <ThumbsUp />
                采纳
              </button>
            </footer>
          </article>
        ))}
      </aside>
      <CToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function List() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState("");
  const [pipeline, setPipeline] = useState("全部");
  const [education, setEducation] = useState(["硕士", "博士"]);
  const [industry, setIndustry] = useState("人工智能 / 机器人");
  const [dateRange, setDateRange] = useState("最近更新");
  const [modal, setModal] = useState("");
  const [toast, setToast] = useState("");
  const rows = useMemo(
    () =>
      candidates.filter((candidate) =>
        `${candidate.name}${candidate.role}${candidate.company}${candidate.city}`.includes(
          q,
        ),
      ),
    [q],
  );
  return (
    <section className="cpx-page cpx-list">
      <header>
        <div>
          <small>CANDIDATES WITH CONTEXT</small>
          <h1>候选人管理</h1>
        </div>
        <button className="primary" onClick={() => setModal("add")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="cpx-searchbar">
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
            {pipeline === "全部" ? "流程状态" : pipeline}
            <ChevronDown />
          </button>
          {open === "pipeline" && (
            <section className="cpx-dropdown" role="menu">
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
          <button
            onClick={() => setOpen(open === "education" ? "" : "education")}
          >
            学历 · {education.length}
            <ChevronDown />
          </button>
          {open === "education" && (
            <section className="cpx-dropdown cpx-multi" role="menu">
              {["本科", "硕士", "博士"].map((item) => (
                <button
                  role="menuitemcheckbox"
                  aria-checked={education.includes(item)}
                  onClick={() =>
                    setEducation((values) =>
                      values.includes(item)
                        ? values.filter((value) => value !== item)
                        : [...values, item],
                    )
                  }
                  key={item}
                >
                  {education.includes(item) && <Check />}
                  {item}
                </button>
              ))}
              <footer>
                <button onClick={() => setEducation([])}>清空</button>
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
            <section className="cpx-industry" role="menu">
              <aside>
                {["人工智能", "汽车", "先进制造"].map((item) => (
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
                      setOpen("");
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
          <button onClick={() => setOpen(open === "date" ? "" : "date")}>
            <CalendarDays />
            {dateRange}
            <ChevronDown />
          </button>
          {open === "date" && (
            <section className="cpx-dropdown cpx-date" role="menu">
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
      <section className="cpx-table">
        <header>
          <span>候选人</span>
          <span>当前职位</span>
          <span>公司</span>
          <span>地点 / 学历</span>
          <span>流程</span>
          <span>更新时间</span>
          <span>操作</span>
        </header>
        {rows.map((candidate) => (
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
      <footer className="cpx-pages">
        <span>1–4 / 48</span>
        <button disabled>上一页</button>
        <button onClick={() => setToast("已进入下一页")}>下一页</button>
      </footer>
      {modal && (
        <CModal
          type={modal}
          close={() => setModal("")}
          done={() => {
            setToast(modal === "add" ? "候选人已添加" : "候选人已删除");
            setModal("");
          }}
        />
      )}
      <CToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Pipeline() {
  const [drag, setDrag] = useState("");
  const [toast, setToast] = useState("");
  const [note, setNote] = useState("");
  const lanes = ["储备", "进行中", "成功", "失败"];
  return (
    <section className="cpx-page cpx-pipeline">
      <header>
        <div>
          <small>COPILOT ASSISTED PIPELINE</small>
          <h1>招聘流程</h1>
        </div>
        <span>
          <Sparkles />
          Agent 建议不会自动移动候选人
        </span>
      </header>
      <div className="cpx-board">
        {lanes.map((l, i) => (
          <section
            data-lane-kind={["reserve", "progress", "success", "failure"][i]}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              setToast(`${drag}已移动到${l}`);
              setDrag("");
            }}
            key={l}
          >
            <header>
              <b>{l}</b>
              <em>{i + 1}</em>
            </header>
            {["赵星羽", "陈松", "周雨澄", "林昊"]
              .slice(i % 4, (i % 4) + 1)
              .map((n) => (
                <article draggable onDragStart={() => setDrag(n)} key={n}>
                  <header>
                    <i>{n[0]}</i>
                    <span>
                      <b>{n}</b>
                      <small>具身智能方向</small>
                    </span>
                    <button onClick={() => setNote(n)}>
                      <MessageSquareText />
                    </button>
                  </header>
                  <p>
                    {i === 0
                      ? "建议补充当前团队规模"
                      : i === 1
                        ? "建议发送岗位资料"
                        : "流程信息完整"}
                  </p>
                  {i < 2 && (
                    <aside>
                      <Sparkles />
                      <span>Agent 建议</span>
                      <button onClick={() => setToast("建议已应用")}>
                        应用
                      </button>
                    </aside>
                  )}
                </article>
              ))}
          </section>
        ))}
      </div>
      {note && (
        <div className="cpx-shade">
          <section className="cpx-modal">
            <header>
              <h2>流程备注</h2>
            </header>
            <textarea
              defaultValue={`${note}：保留用户填写的原始备注，Agent 只提供建议。`}
            />
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
          </section>
        </div>
      )}
      <CToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Matching() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const candidates = ["林昊", "周雨澄", "陈松"];
  return (
    <section className="cpx-page cpx-matching">
      <header>
        <div>
          <small>CONTEXTUAL MATCHING</small>
          <h1>人岗匹配建议</h1>
        </div>
        <button onClick={() => setToast("已重新生成建议")}>更新建议</button>
      </header>
      <main>
        <nav>
          {candidates.map((n, i) => (
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
        </nav>
        <article>
          <header>
            <div>
              <small>岗位：具身智能算法负责人</small>
              <h2>{candidates[active]}</h2>
            </div>
            <em>强烈推荐</em>
          </header>
          <section>
            <h3>为什么推荐</h3>
            <p>
              候选人当前责任范围与岗位接近，技能、管理经验和研究方向均有可验证证据。
            </p>
            <div>
              {["技能匹配", "职级适配", "方向一致"].map((x) => (
                <span key={x}>
                  <Check />
                  {x}
                </span>
              ))}
            </div>
          </section>
          <aside>
            <Sparkles />
            <div>
              <b>副驾提醒</b>
              <p>候选人更关注团队自主权，推荐前建议确认汇报关系和决策范围。</p>
            </div>
          </aside>
          <footer>
            <button onClick={() => setToast("建议已忽略")}>忽略建议</button>
            <button
              className="primary"
              onClick={() => setToast("已加入岗位流程")}
            >
              采纳并加入流程
            </button>
          </footer>
        </article>
      </main>
      <CToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Cards() {
  const [tab, setTab] = useState("全部");
  const [toast, setToast] = useState("");
  return (
    <section className="cpx-page cpx-cards">
      <header>
        <div>
          <small>AI ACADEMIC REVIEW</small>
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
              <FileText />
              <span>
                <small>
                  {paper.source} · {paper.year}
                </small>
                <b>{paper.title}</b>
              </span>
              <strong>{paper.cited}</strong>
            </header>
            <div>
              <span>{paper.tier}</span>
              <b>{paper.institutions}</b>
            </div>
            <p>{paper.abstract}</p>
            <footer>
              <button onClick={() => setToast("论文已忽略")}>
                <ThumbsDown />
                忽略
              </button>
              <button onClick={() => setToast("已导入论文")}>
                <ThumbsUp />
                导入
              </button>
            </footer>
          </article>
        ))}
      </main>
      <button className="cpx-more" onClick={() => setToast("已加载更多论文")}>
        加载更多
      </button>
      <CToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function UploadPage() {
  const [phase, setPhase] = useState(0);
  const [toast, setToast] = useState("");
  const start = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 700);
  };
  return (
    <section className="cpx-page cpx-upload">
      <header>
        <small>GUIDED IMPORT</small>
        <h1>上传并补全候选人</h1>
        <p>系统先解析文件，再把可核验的新增内容交给你确认。</p>
      </header>
      <main>
        <section>
          <button className="cpx-drop" onClick={start}>
            <Upload />
            <span>
              <b>选择候选人简历</b>
              <small>PDF 或 DOCX</small>
            </span>
          </button>
          <div>
            <label>
              目标岗位
              <input defaultValue="具身智能算法负责人" />
            </label>
            <label>
              是否联网补全
              <button className="cpx-switch" role="switch" aria-checked="true">
                <i />
              </button>
            </label>
          </div>
          <button className="primary" onClick={start}>
            开始处理
          </button>
        </section>
        <aside>
          <header>
            <Sparkles />
            <h2>处理预览</h2>
          </header>
          {phase === 0 ? (
            <p>上传文件后，解析字段和 Agent 建议会显示在这里。</p>
          ) : (
            <>
              {[
                ["简历解析", phase > 0],
                ["公开资料补全", phase > 1],
                ["字段建议", phase > 1],
              ].map(([x, done], i) => (
                <article key={x}>
                  <i>{done ? <Check /> : <LoaderCircle className="spin" />}</i>
                  <span>
                    <b>{x}</b>
                    <small>{done ? "完成" : "处理中"}</small>
                  </span>
                </article>
              ))}
              {phase === 2 && (
                <button onClick={() => setToast("已打开候选人确认页")}>
                  查看确认结果
                  <ArrowRight />
                </button>
              )}
            </>
          )}
        </aside>
      </main>
      <CToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Tasks() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const items = [
    "补全林昊公开资料",
    "核验周雨澄论文经历",
    "更新陈松职业状态",
    "生成赵星羽匹配建议",
  ];
  return (
    <section className="cpx-page cpx-tasks">
      <header>
        <div>
          <small>COPILOT TASKS</small>
          <h1>建议生成进度</h1>
        </div>
        <span>4 个任务</span>
      </header>
      <main>
        <section>
          {items.map((x, i) => (
            <button
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={x}
            >
              <i>
                {i === 0 ? (
                  <LoaderCircle className="spin" />
                ) : i === 2 ? (
                  <CircleAlert />
                ) : (
                  <Check />
                )}
              </i>
              <span>
                <b>{x}</b>
                <small>
                  {i === 0 ? "运行中" : i === 2 ? "需要处理" : "已完成"}
                </small>
              </span>
              <ArrowRight />
            </button>
          ))}
        </section>
        <aside>
          <header>
            <small>当前任务</small>
            <h2>{items[active]}</h2>
          </header>
          <div className="cpx-progress">
            <i>
              <span style={{ width: `${active === 0 ? 68 : 100}%` }} />
            </i>
            <b>{active === 0 ? 68 : 100}%</b>
          </div>
          {[
            ["读取已有字段", "已完成"],
            ["搜索配置的数据源", "已完成"],
            ["核验公开来源", "运行中"],
            ["生成审核建议", "等待"],
          ].map(([a, b], i) => (
            <article key={a}>
              <i>
                {i < 2 ? (
                  <Check />
                ) : i === 2 ? (
                  <LoaderCircle className="spin" />
                ) : (
                  i + 1
                )}
              </i>
              <span>
                <b>{a}</b>
                <small>{b}</small>
              </span>
            </article>
          ))}
          <footer>
            <button onClick={() => setToast("任务已暂停")}>暂停</button>
            <button onClick={() => setToast("已打开运行详情")}>运行详情</button>
          </footer>
        </aside>
      </main>
      <CToast text={toast} close={() => setToast("")} />
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
export function CopilotExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
