import { useMemo, useState } from "react";
import { candidates, papers } from "../data/boards";
import {
  Activity,
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileUp,
  Filter,
  GripVertical,
  LoaderCircle,
  MessageCircle,
  Plus,
  Search,
  Send,
  Sparkles,
  Trash2,
  X,
  Zap,
} from "lucide-react";

const signals = [
  {
    name: "周雨澄",
    role: "VLA 研究员",
    source: "OpenReview",
    level: "高优先",
    time: "4 分钟前",
  },
  {
    name: "林昊",
    role: "具身智能负责人",
    source: "公开主页",
    level: "建议联系",
    time: "18 分钟前",
  },
  {
    name: "陈松",
    role: "感知算法专家",
    source: "招聘平台",
    level: "观察",
    time: "1 小时前",
  },
];
function CmdFlash({ text, clear }) {
  return text ? (
    <div className="cmdx-flash" role="status">
      <Zap />
      <b>{text}</b>
      <button onClick={clear}>
        <X />
      </button>
    </div>
  ) : null;
}
function CmdDialog({ kind, close, done }) {
  return (
    <div className="cmdx-overlay">
      <section className="cmdx-dialog" role="dialog">
        <header>
          <Sparkles />
          <div>
            <small>COMMAND ACTION</small>
            <h2>{kind === "add" ? "新建候选人" : "删除候选人"}</h2>
          </div>
        </header>
        {kind === "add" ? (
          <div className="cmdx-dialog-fields">
            <label>
              姓名
              <input defaultValue="赵星羽" />
            </label>
            <label>
              当前公司
              <div>
                <button className="active">远川智能</button>
                <button>待补充</button>
              </div>
            </label>
          </div>
        ) : (
          <p>删除后候选人资料和未结束的关联记录将无法恢复。</p>
        )}
        <footer>
          <button onClick={close}>取消</button>
          <button
            className={kind === "add" ? "primary" : "danger"}
            onClick={done}
          >
            {kind === "add" ? "确认添加" : "确认删除"}
          </button>
        </footer>
      </section>
    </div>
  );
}
function Agent() {
  const [input, setInput] = useState("");
  const [log, setLog] = useState([
    "帮我判断今天最值得联系的具身智能候选人。",
    "已汇总 12 条变化信号，正在核验其中 4 位候选人的职业状态。",
  ]);
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setLog((v) => [...v, input]);
    setInput("");
    setBusy(true);
    setTimeout(() => {
      setLog((v) => [
        ...v,
        "建议优先联系周雨澄：近期论文与岗位方向高度一致，并公开表达了新的职业兴趣。",
      ]);
      setBusy(false);
    }, 700);
  };
  return (
    <section className="cmdx-page cmdx-agent">
      <header>
        <div>
          <Activity />
          <span>
            <b>人才信号控制台</b>
            <small>实时聚合公开变化与业务动作</small>
          </span>
        </div>
        <nav>
          <button onClick={() => setFlash("已保存当前会话")}>保存</button>
          <button
            onClick={() => setFlash("已创建跟进任务")}
            className="primary"
          >
            创建任务
          </button>
        </nav>
      </header>
      <main>
        <aside>
          <small>TODAY</small>
          <strong>24</strong>
          <span>条新信号</span>
          {signals.map((s, i) => (
            <button className={i === 0 ? "active" : ""} key={s.name}>
              <i />
              <span>
                <b>{s.name}</b>
                <small>{s.level}</small>
              </span>
            </button>
          ))}
        </aside>
        <div className="cmdx-conversation">
          <section>
            {log.map((m, i) => (
              <article className={i % 2 ? "agent" : "user"} key={`${m}-${i}`}>
                <span>{i % 2 ? <Bot /> : "于"}</span>
                <p>{m}</p>
              </article>
            ))}
            {busy && (
              <article className="agent">
                <span>
                  <LoaderCircle className="spin" />
                </span>
                <p>正在交叉检查来源与最近变化…</p>
              </article>
            )}
          </section>
          <footer>
            <label>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="输入指令或补充判断条件"
              />
              <kbd>Enter</kbd>
            </label>
            <button onClick={send} disabled={busy}>
              <Send />
            </button>
          </footer>
        </div>
        <aside className="cmdx-context">
          <h2>判断上下文</h2>
          {[
            ["目标岗位", "具身智能算法负责人"],
            ["关键方向", "VLA · 机器人学习"],
            ["城市", "北京 · 上海"],
          ].map(([a, b]) => (
            <article key={a}>
              <small>{a}</small>
              <b>{b}</b>
            </article>
          ))}
          <button onClick={() => setFlash("已展开全部证据")}>
            展开来源证据
            <ArrowRight />
          </button>
        </aside>
      </main>
      <CmdFlash text={flash} clear={() => setFlash("")} />
    </section>
  );
}
function List() {
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState("");
  const [pipeline, setPipeline] = useState("全部");
  const [companies, setCompanies] = useState(["穹境机器人", "奇点智研"]);
  const [industry, setIndustry] = useState("人工智能 / 机器人");
  const [dateRange, setDateRange] = useState("近 7 天");
  const [modal, setModal] = useState("");
  const [flash, setFlash] = useState("");
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
    <section className="cmdx-page cmdx-list">
      <header>
        <div>
          <small>CANDIDATE DIRECTORY</small>
          <h1>候选人管理</h1>
        </div>
        <button className="primary" onClick={() => setModal("add")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="cmdx-commandbar">
        <Search />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="搜索姓名、手机号、公司、职位、技能或经历"
        />
        <span>⌘ K</span>
      </div>
      <div className="cmdx-filterrail">
        <div>
          <button
            onClick={() => setMenu(menu === "pipeline" ? "" : "pipeline")}
          >
            <Filter />
            {pipeline === "全部" ? "流程状态" : pipeline}
            <ChevronDown />
          </button>
          {menu === "pipeline" && (
            <div className="cmdx-menu" role="menu">
              {["全部", "在流程中", "不在流程中"].map((x) => (
                <button
                  role="menuitemradio"
                  aria-checked={pipeline === x}
                  key={x}
                  onClick={() => {
                    setPipeline(x);
                    setMenu("");
                  }}
                >
                  <i className={pipeline === x ? "active" : ""} />
                  <span>{x}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div>
          <button onClick={() => setMenu(menu === "company" ? "" : "company")}>
            公司 · {companies.length}
            <ChevronDown />
          </button>
          {menu === "company" && (
            <div className="cmdx-menu cmdx-multi" role="menu">
              {["穹境机器人", "奇点智研", "逐光科技", "远川智能"].map(
                (item) => (
                  <button
                    role="menuitemcheckbox"
                    aria-checked={companies.includes(item)}
                    onClick={() =>
                      setCompanies((current) =>
                        current.includes(item)
                          ? current.filter((value) => value !== item)
                          : [...current, item],
                      )
                    }
                    key={item}
                  >
                    <i className={companies.includes(item) ? "active" : ""}>
                      {companies.includes(item) && <Check />}
                    </i>
                    <span>{item}</span>
                  </button>
                ),
              )}
              <footer>
                <button onClick={() => setCompanies([])}>清空</button>
                <button onClick={() => setMenu("")}>完成</button>
              </footer>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => setMenu(menu === "industry" ? "" : "industry")}
          >
            行业
            <ChevronDown />
          </button>
          {menu === "industry" && (
            <div className="cmdx-industry-menu" role="menu">
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
                      setMenu("");
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
        <div>
          <button onClick={() => setMenu(menu === "date" ? "" : "date")}>
            <CalendarDays />
            {dateRange}
            <ChevronDown />
          </button>
          {menu === "date" && (
            <div className="cmdx-calendar" role="menu">
              <header>
                <button>‹</button>
                <b>2026 年 8 月</b>
                <button>›</button>
              </header>
              <div>
                {[
                  "一",
                  "二",
                  "三",
                  "四",
                  "五",
                  "六",
                  "日",
                  ...Array.from({ length: 14 }, (_, i) => String(i + 1)),
                ].map((x, i) => (
                  <button
                    className={i > 6 && i < 13 ? "active" : ""}
                    key={`${x}-${i}`}
                  >
                    {x}
                  </button>
                ))}
              </div>
              <footer>
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
                  <div className="cmdx-date-inputs">
                    <button>2026-07-01</button>
                    <span>至</span>
                    <button>2026-08-07</button>
                  </div>
                )}
                <button onClick={() => setMenu("")}>应用</button>
              </footer>
            </div>
          )}
        </div>
        <span>{shown.length} 条结果</span>
      </div>
      <section className="cmdx-signal-table">
        <header>
          <span>候选人</span>
          <span>当前公司</span>
          <span>地点 / 学历</span>
          <span>流程</span>
          <span>更新时间</span>
          <span>动作</span>
        </header>
        {shown.map((candidate) => (
          <article key={candidate.name}>
            <span>
              <i>
                <Activity />
              </i>
              <b>
                {candidate.name}
                <small>{candidate.role}</small>
              </b>
            </span>
            <span>{candidate.company}</span>
            <span>
              {candidate.city} · {candidate.education}
            </span>
            <em>{candidate.stage}</em>
            <time>{candidate.updated}</time>
            <div>
              <button onClick={() => setFlash(`已打开${candidate.name}`)}>
                查看
              </button>
              <button onClick={() => setModal("delete")}>
                <Trash2 />
              </button>
            </div>
          </article>
        ))}
      </section>
      <footer className="cmdx-pager">
        <button disabled>←</button>
        <b>1</b>
        <button onClick={() => setFlash("已切换到第 2 页")}>2</button>
        <button onClick={() => setFlash("已切换到下一页")}>→</button>
      </footer>
      {modal && (
        <CmdDialog
          kind={modal}
          close={() => setModal("")}
          done={() => {
            setFlash(modal === "add" ? "候选人已创建" : "候选人已删除");
            setModal("");
          }}
        />
      )}
      <CmdFlash text={flash} clear={() => setFlash("")} />
    </section>
  );
}
function Pipeline() {
  const [drag, setDrag] = useState("");
  const [focus, setFocus] = useState("周雨澄");
  const [note, setNote] = useState("");
  const [flash, setFlash] = useState("");
  const stages = ["储备", "进行中", "成功", "失败"];
  return (
    <section className="cmdx-page cmdx-pipeline">
      <header>
        <div>
          <small>LIVE PIPELINE</small>
          <h1>具身智能招聘流</h1>
        </div>
        <span>
          <i />
          实时同步
        </span>
      </header>
      <div className="cmdx-stagebar">
        {stages.map((s, i) => (
          <section
            data-lane-kind={["reserve", "progress", "success", "failure"][i]}
            key={s}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              setFlash(`${drag}已进入${s}`);
              setDrag("");
            }}
          >
            <header>
              <b>{s}</b>
              <em>{i + 2}</em>
            </header>
            {(i === 0
              ? signals.slice(0, 2)
              : i === 1
                ? signals.slice(1)
                : i === 2
                  ? [signals[0]]
                  : [signals[2]]
            ).map((p) => (
              <article
                draggable
                onDragStart={() => setDrag(p.name)}
                onClick={() => setFocus(p.name)}
                className={focus === p.name ? "active" : ""}
                key={`${s}-${p.name}`}
              >
                <GripVertical />
                <span>
                  <b>{p.name}</b>
                  <small>{p.role}</small>
                  <em>{p.level}</em>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setNote(p.name);
                  }}
                >
                  <MessageCircle />
                </button>
              </article>
            ))}
          </section>
        ))}
      </div>
      {note && (
        <div className="cmdx-overlay">
          <section className="cmdx-note" role="dialog">
            <header>
              <MessageCircle />
              <h2>{note} · 流程备注</h2>
            </header>
            <textarea defaultValue="候选人希望先了解团队规模和技术自主权。" />
            <footer>
              <button onClick={() => setNote("")}>取消</button>
              <button
                className="primary"
                onClick={() => {
                  setFlash("备注已保存");
                  setNote("");
                }}
              >
                保存
              </button>
            </footer>
          </section>
        </div>
      )}
      <CmdFlash text={flash} clear={() => setFlash("")} />
    </section>
  );
}
function Matching() {
  const [active, setActive] = useState(0);
  const [flash, setFlash] = useState("");
  return (
    <section className="cmdx-page cmdx-matching">
      <header>
        <small>MATCH SIGNAL</small>
        <h1>岗位适配判断</h1>
        <p>不只比较技能，还综合职级、职业方向和可验证证据。</p>
      </header>
      <main>
        <div className="cmdx-orbit">
          <strong>
            {[94, 88, 76][active]}
            <small>综合匹配</small>
          </strong>
          {["技能重合 92", "职级适配 96", "方向一致 94", "证据完整 89"].map(
            (x, i) => (
              <span style={{ "--i": i }} key={x}>
                {x}
              </span>
            ),
          )}
        </div>
        <section>
          <nav>
            {signals.map((s, i) => (
              <button
                className={active === i ? "active" : ""}
                onClick={() => setActive(i)}
                key={s.name}
              >
                <b>{s.name}</b>
                <small>{s.role}</small>
              </button>
            ))}
          </nav>
          <article>
            <header>
              <div>
                <Activity />
                <span>
                  <small>优先推荐</small>
                  <h2>{signals[active].name}</h2>
                </span>
              </div>
              <em>{signals[active].level}</em>
            </header>
            <p>
              近期研究和公开经历均指向目标方向；当前角色范围与岗位责任接近，没有明显降级或越级风险。
            </p>
            <div>
              <button onClick={() => setFlash("已展开 8 条来源证据")}>
                查看证据
              </button>
              <button
                className="primary"
                onClick={() => setFlash("已加入岗位流程")}
              >
                加入流程
              </button>
            </div>
          </article>
        </section>
      </main>
      <CmdFlash text={flash} clear={() => setFlash("")} />
    </section>
  );
}
function Cards() {
  const [tab, setTab] = useState("全部");
  const [flash, setFlash] = useState("");
  return (
    <section className="cmdx-page cmdx-cards">
      <header>
        <div>
          <small>ACADEMIC SEARCH SIGNALS</small>
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
      <div className="cmdx-cardstream">
        {papers.map((paper, i) => (
          <article key={paper.title}>
            <header>
              <span>{paper.source}</span>
              <time>{paper.year}</time>
            </header>
            <i className={`pulse p${i}`} />
            <h2>{paper.title}</h2>
            <p>{paper.authors}</p>
            <dl>
              <div>
                <dt>引用次数</dt>
                <dd>{paper.cited}</dd>
              </div>
              <div>
                <dt>导入建议</dt>
                <dd className="cmdx-tier">{paper.tier}</dd>
              </div>
            </dl>
            <footer>
              <button onClick={() => setFlash("已忽略本篇论文")}>忽略</button>
              <button onClick={() => setFlash("已打开论文详情")}>
                查看论文
                <ArrowRight />
              </button>
            </footer>
          </article>
        ))}
      </div>
      <footer className="cmdx-more">
        <button onClick={() => setFlash("已加载更多论文")}>加载更多</button>
      </footer>
      <CmdFlash text={flash} clear={() => setFlash("")} />
    </section>
  );
}
function UploadPage() {
  const [step, setStep] = useState(0);
  const [flash, setFlash] = useState("");
  const start = () => {
    setStep(1);
    setTimeout(() => setStep(2), 700);
  };
  return (
    <section className="cmdx-page cmdx-upload">
      <header>
        <small>SMART INTAKE</small>
        <h1>将材料转成可用信号</h1>
      </header>
      <main>
        <button
          className="cmdx-drop"
          onClick={start}
          onDrop={(e) => {
            e.preventDefault();
            start();
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <FileUp />
          <span>
            <b>拖入简历、名单或公开资料</b>
            <small>系统会先识别内容类型，再决定后续处理</small>
          </span>
          <kbd>选择文件</kbd>
        </button>
        <section className="cmdx-scan">
          <header>
            <b>分析过程</b>
            <span>
              {step === 0 ? "等待文件" : step === 1 ? "正在分析" : "分析完成"}
            </span>
          </header>
          {[
            ["文件校验", step > 0],
            ["内容分类", step > 1],
            ["候选人识别", step > 1],
            ["来源证据整理", step > 1],
          ].map(([x, done], i) => (
            <article key={x}>
              <i
                className={
                  done ? "done" : step === 1 && i === 1 ? "running" : ""
                }
              >
                {done ? (
                  <Check />
                ) : step === 1 && i === 1 ? (
                  <LoaderCircle className="spin" />
                ) : (
                  i + 1
                )}
              </i>
              <span>
                <b>{x}</b>
                <small>
                  {done ? "已通过" : step === 1 && i === 1 ? "处理中" : "等待"}
                </small>
              </span>
            </article>
          ))}
        </section>
      </main>
      {step === 2 && (
        <button
          className="cmdx-result"
          onClick={() => setFlash("已打开 3 条候选人线索")}
        >
          发现 3 条候选人线索
          <ArrowRight />
        </button>
      )}
      <CmdFlash text={flash} clear={() => setFlash("")} />
    </section>
  );
}
function Tasks() {
  const [active, setActive] = useState(0);
  const [states, setStates] = useState(["运行中", "需处理", "已完成", "失败"]);
  const [flash, setFlash] = useState("");
  const names = [
    "寻找具身智能人才",
    "核验候选人公开资料",
    "分析岗位关键词",
    "同步客户反馈",
  ];
  return (
    <section className="cmdx-page cmdx-tasks">
      <aside>
        <small>RUNTIME</small>
        <h1>任务脉冲</h1>
        {names.map((n, i) => (
          <button
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
            key={n}
          >
            <i className={`s${i}`} />
            <span>
              <b>{n}</b>
              <small>{states[i]}</small>
            </span>
            <time>{i * 12 + 4}m</time>
          </button>
        ))}
      </aside>
      <main>
        <header>
          <div>
            <Activity />
            <span>
              <small>{states[active]}</small>
              <h2>{names[active]}</h2>
            </span>
          </div>
          <button
            onClick={() => {
              setStates((v) =>
                v.map((x, i) =>
                  i === active ? (x === "失败" ? "运行中" : "已暂停") : x,
                ),
              );
              setFlash("任务状态已更新");
            }}
          >
            {states[active] === "失败" ? "重试" : "暂停"}
          </button>
        </header>
        <section className="cmdx-task-summary" aria-label="任务进度摘要">
          {[
            ["已处理", "42", "位候选人"],
            ["已核验证据", "126", "条公开资料"],
            ["当前步骤", "3 / 4", "核验候选人经历"],
          ].map(([label, value, note]) => (
            <article key={label}>
              <small>{label}</small>
              <strong>{value}</strong>
              <span>{note}</span>
            </article>
          ))}
        </section>
        <div className="cmdx-task-events">
          {[
            ["读取岗位与目标范围", "完成"],
            ["搜索公开来源", "完成"],
            ["核验候选人经历", "运行中"],
            ["生成候选人建议", "等待"],
          ].map(([a, b], i) => (
            <article key={a}>
              <i>
                {i < 2 ? (
                  <Check />
                ) : i === 2 ? (
                  <LoaderCircle className="spin" />
                ) : (
                  <Clock3 />
                )}
              </i>
              <span>
                <b>{a}</b>
                <small>{b}</small>
              </span>
              <time>{i < 2 ? `${8 - i * 3} 分钟前` : ""}</time>
            </article>
          ))}
        </div>
      </main>
      <CmdFlash text={flash} clear={() => setFlash("")} />
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
export function CommandExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
