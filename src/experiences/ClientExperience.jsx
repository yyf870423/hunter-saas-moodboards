import { useState } from "react";
import { candidates, papers } from "../data/boards";
import {
  ArrowUpRight,
  Bot,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileText,
  GripVertical,
  LoaderCircle,
  Mail,
  MessageSquareText,
  MoreHorizontal,
  Paperclip,
  Plus,
  Search,
  Send,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";

const clients = [
  { name: "智元新创", owner: "周宁", roles: 6, people: 18, health: "合作稳定" },
  {
    name: "穹境机器人",
    owner: "林曦",
    roles: 4,
    people: 11,
    health: "需要关注",
  },
  { name: "逐光科技", owner: "陈航", roles: 3, people: 9, health: "合作稳定" },
];
function ClientToast({ text, close }) {
  return text ? (
    <div className="clix-toast">
      <Check />
      <span>{text}</span>
      <button onClick={close}>
        <X />
      </button>
    </div>
  ) : null;
}
function ClientModal({ type, close, done }) {
  return (
    <div className="clix-shade">
      <section className="clix-modal" role="dialog">
        <header>
          <div>
            <small>CANDIDATE PROFILE</small>
            <h2>{type === "new" ? "新建候选人" : "删除候选人"}</h2>
          </div>
        </header>
        {type === "new" ? (
          <div>
            <label>
              姓名
              <input defaultValue="赵星羽" />
            </label>
            <label>
              当前职位
              <input defaultValue="机器人平台架构师" />
            </label>
            <label>
              当前公司
              <input defaultValue="远川智能" />
            </label>
          </div>
        ) : (
          <p>确认删除候选人“赵星羽”吗？删除后无法恢复。</p>
        )}
        <footer>
          <button onClick={close}>取消</button>
          <button
            className={type === "new" ? "primary" : "danger"}
            onClick={done}
          >
            {type === "new" ? "创建候选人" : "确认删除"}
          </button>
        </footer>
      </section>
    </div>
  );
}
function Agent() {
  const [msgs, setMsgs] = useState([
    "整理智元新创本周需要我跟进的事项。",
    "当前有 2 位候选人等待客户反馈，算法负责人 shortlist 需要在今天 16:00 前提交。",
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
        "已结合最近沟通记录生成跟进顺序，并草拟了三条客户沟通要点。",
      ]);
      setBusy(false);
    }, 650);
  };
  return (
    <section className="clix-page clix-agent">
      <aside className="clix-clientbar">
        <b>H</b>
        <nav>
          {clients.map((c, i) => (
            <button className={i === 0 ? "active" : ""} key={c.name}>
              {c.name[0]}
            </button>
          ))}
        </nav>
        <span>于</span>
      </aside>
      <main>
        <header>
          <div>
            <Building2 />
            <span>
              <b>智元新创</b>
              <small>客户协作空间</small>
            </span>
          </div>
          <button onClick={() => setToast("客户资料已打开")}>
            客户资料
            <ArrowUpRight />
          </button>
        </header>
        <section className="clix-agentbody">
          <div className="clix-chat">
            <header>
              <small>客户服务 Agent</small>
              <h1>本周交付协作</h1>
            </header>
            <section className="clix-chatlog">
              {msgs.map((m, i) => (
                <article
                  className={i % 2 ? "assistant" : "user"}
                  key={`${m}-${i}`}
                >
                  <i>{i % 2 ? <Bot /> : <UserRound />}</i>
                  <p>{m}</p>
                </article>
              ))}
              {busy && (
                <article className="assistant">
                  <i>
                    <LoaderCircle className="spin" />
                  </i>
                  <p>正在整理承诺、沟通记录和岗位进展…</p>
                </article>
              )}
            </section>
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
                placeholder="补充客户背景或交付要求"
              />
              <button onClick={send} disabled={busy || !input.trim()}>
                <Send />
              </button>
            </footer>
          </div>
          <aside className="clix-service">
            <h2>本周承诺</h2>
            {[
              ["算法负责人 shortlist", "今天 16:00", "紧急"],
              ["终面候选人反馈", "明天", "待客户"],
              ["人才地图更新", "周五", "进行中"],
            ].map(([a, b, c]) => (
              <article key={a}>
                <small>{b}</small>
                <b>{a}</b>
                <em>{c}</em>
              </article>
            ))}
            <button
              className="primary"
              onClick={() => setToast("已生成客户周报")}
            >
              生成客户周报
            </button>
          </aside>
        </section>
      </main>
      <ClientToast text={toast} close={() => setToast("")} />
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
  return (
    <section className="clix-page clix-list">
      <header>
        <div>
          <small>TALENT DIRECTORY</small>
          <h1>候选人管理</h1>
        </div>
        <button className="primary" onClick={() => setModal("new")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="clix-listbar">
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
            <section className="clix-dropdown" role="menu">
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
                  <i className={pipeline === item ? "checked" : ""}>
                    {pipeline === item && <Check />}
                  </i>
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
            <section className="clix-dropdown clix-multi" role="menu">
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
                    <i className={companies.includes(item) ? "checked" : ""}>
                      {companies.includes(item) && <Check />}
                    </i>
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
            <section className="clix-industry" role="menu">
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
            <section className="clix-dropdown clix-date" role="menu">
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
                  <span>—</span>
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
      <section className="clix-ledger">
        <header>
          <span>候选人</span>
          <span>当前职位</span>
          <span>公司</span>
          <span>地点 / 学历</span>
          <span>流程</span>
          <span>更新时间</span>
          <span>操作</span>
        </header>
        {candidates
          .filter((candidate) =>
            `${candidate.name}${candidate.role}${candidate.company}${candidate.city}`.includes(
              q,
            ),
          )
          .map((candidate) => (
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
                <button
                  className="has-tooltip"
                  data-tooltip="查看候选人"
                  aria-label="查看候选人"
                  onClick={() => setToast(`已打开${candidate.name}`)}
                >
                  <ArrowUpRight />
                </button>
                <button
                  className="has-tooltip"
                  data-tooltip="删除候选人"
                  aria-label="删除候选人"
                  onClick={() => setModal("delete")}
                >
                  <Trash2 />
                </button>
              </div>
            </article>
          ))}
      </section>
      <footer className="clix-paging">
        <span>显示 1–4，共 48 位候选人</span>
        <div>
          <button disabled>上一页</button>
          <button onClick={() => setToast("已进入下一页")}>下一页</button>
        </div>
      </footer>
      {modal && (
        <ClientModal
          type={modal}
          close={() => setModal("")}
          done={() => {
            setToast(modal === "new" ? "候选人已创建" : "候选人已删除");
            setModal("");
          }}
        />
      )}
      <ClientToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Pipeline() {
  const [drag, setDrag] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const lanes = [
    { name: "储备", kind: "reserve", people: ["赵星羽", "许澄"] },
    { name: "进行中", kind: "progress", people: ["陈松", "周雨澄"] },
    { name: "成功", kind: "success", people: ["林昊"] },
    { name: "失败", kind: "failure", people: ["顾航"] },
  ];
  return (
    <section className="clix-page clix-pipeline">
      <header>
        <div>
          <small>智元新创 · 具身智能团队</small>
          <h1>客户招聘进展</h1>
        </div>
        <button onClick={() => setToast("交付视图已发送给客户")}>
          <Mail />
          发送进展
        </button>
      </header>
      <div className="clix-board">
        {lanes.map((lane, i) => (
          <section
            data-lane-kind={lane.kind}
            key={lane.name}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              setToast(`${drag}已移动到${lane.name}`);
              setDrag("");
            }}
          >
            <header>
              <span>
                <b>{lane.name}</b>
                <small>
                  {
                    [
                      "尚未进入岗位流程",
                      "推荐、面试与 Offer",
                      "已经入职",
                      "放弃、落选或不合适",
                    ][i]
                  }
                </small>
              </span>
              <em>{lane.people.length}</em>
            </header>
            {lane.people.map((p, n) => (
              <article draggable onDragStart={() => setDrag(p)} key={p}>
                <div>
                  <GripVertical />
                  <i>{p[0]}</i>
                </div>
                <h2>{p}</h2>
                <p>
                  {[
                    "机器人平台架构师",
                    "感知算法专家",
                    "VLA 研究员",
                    "具身智能负责人",
                  ][i] || "算法工程师"}
                </p>
                <footer>
                  <span>{i < 2 ? "周宁" : "客户 HR"}</span>
                  <button onClick={() => setNote(p)}>
                    <MessageSquareText />
                  </button>
                </footer>
              </article>
            ))}
          </section>
        ))}
      </div>
      {note && (
        <div className="clix-shade">
          <section className="clix-modal">
            <header>
              <h2>添加客户流程备注</h2>
            </header>
            <textarea
              defaultValue={`${note}：客户希望补充一段产品落地经历。`}
            />
            <footer>
              <button onClick={() => setNote("")}>取消</button>
              <button
                className="primary"
                onClick={() => {
                  setToast("流程备注已保存");
                  setNote("");
                }}
              >
                保存备注
              </button>
            </footer>
          </section>
        </div>
      )}
      <ClientToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Matching() {
  const [pick, setPick] = useState(0);
  const [toast, setToast] = useState("");
  const names = ["林昊", "周雨澄", "陈松"];
  return (
    <section className="clix-page clix-matching">
      <header>
        <div>
          <small>CLIENT SHORTLIST</small>
          <h1>算法负责人候选人名单</h1>
          <p>提交前确认候选人价值、风险与客户关心的问题。</p>
        </div>
        <button
          className="primary"
          onClick={() => setToast("Shortlist 已发送给客户")}
        >
          提交客户
        </button>
      </header>
      <main>
        <nav>
          {names.map((n, i) => (
            <button
              className={pick === i ? "active" : ""}
              onClick={() => setPick(i)}
              key={n}
            >
              <i>{n[0]}</i>
              <span>
                <b>{n}</b>
                <small>
                  {["具身智能算法负责人", "VLA 研究员", "感知算法专家"][i]}
                </small>
              </span>
              <strong>{[94, 88, 83][i]}</strong>
            </button>
          ))}
        </nav>
        <article>
          <header>
            <div>
              <small>推荐顺位 0{pick + 1}</small>
              <h2>{names[pick]}</h2>
              <p>当前：{["穹境机器人", "奇点智研", "逐光科技"][pick]}</p>
            </div>
            <em>建议推荐</em>
          </header>
          <section>
            <h3>对客户的核心价值</h3>
            <p>
              同时具备研究深度、产品落地和团队管理经验，可直接承担从数据闭环到模型交付的完整责任。
            </p>
            <div>
              {["VLA 模型", "团队管理", "机器人量产"].map((x) => (
                <span key={x}>{x}</span>
              ))}
            </div>
          </section>
          <aside>
            <h3>需要提前确认</h3>
            <p>
              候选人更关注技术自主权，需要向客户确认团队决策边界和汇报关系。
            </p>
          </aside>
          <footer>
            <button onClick={() => setToast("已标记稍后决定")}>稍后决定</button>
            <button onClick={() => setToast("已加入 Shortlist")}>
              加入名单
            </button>
          </footer>
        </article>
      </main>
      <ClientToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Cards() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  return (
    <section className="clix-page clix-cards">
      <header>
        <div>
          <small>ACADEMIC LIBRARY</small>
          <h1>论文搜索结果</h1>
        </div>
        <button onClick={() => setToast("论文筛选已打开")}>筛选结果</button>
      </header>
      <main>
        {papers.map((paper, i) => (
          <article
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
            key={paper.title}
          >
            <header>
              <i>
                <FileText />
              </i>
              <em>{paper.tier}</em>
            </header>
            <h2>{paper.title}</h2>
            <p>{paper.authors}</p>
            <dl>
              <div>
                <dt>发表年份</dt>
                <dd>{paper.year}</dd>
              </div>
              <div>
                <dt>引用次数</dt>
                <dd>{paper.cited}</dd>
              </div>
            </dl>
            <footer>
              <span>{paper.institutions}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setToast("已打开论文详情");
                }}
              >
                <ArrowUpRight />
              </button>
            </footer>
          </article>
        ))}
      </main>
      <footer className="clix-card-pager">
        <button disabled>上一组</button>
        <span>1 / 3</span>
        <button onClick={() => setToast("已切换下一组")}>下一组</button>
      </footer>
      <ClientToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function UploadPage() {
  const [state, setState] = useState("idle");
  const [toast, setToast] = useState("");
  const start = () => {
    setState("loading");
    setTimeout(() => setState("done"), 800);
  };
  return (
    <section className="clix-page clix-upload">
      <header>
        <div>
          <small>CLIENT DOCUMENT INTAKE</small>
          <h1>接收客户资料</h1>
        </div>
        <span>资料只进入当前客户空间</span>
      </header>
      <div className="clix-upload-layout">
        <section>
          <header>
            <Paperclip />
            <div>
              <h2>岗位说明与客户资料</h2>
              <p>上传后先校验内容，再生成可确认的岗位信息。</p>
            </div>
          </header>
          <button className="clix-drop" onClick={start}>
            <Upload />
            <b>选择 PDF 或 DOCX</b>
            <small>也可以拖放文件到这里</small>
          </button>
          <label>
            资料说明
            <textarea defaultValue="客户补充了团队背景、汇报关系和候选人偏好。" />
          </label>
          <button
            className="primary"
            onClick={start}
            disabled={state === "loading"}
          >
            {state === "loading" ? "正在分析" : "开始分析"}
          </button>
        </section>
        <aside>
          <h2>处理状态</h2>
          {[
            ["文件安全校验", state !== "idle"],
            ["内容结构解析", state === "done"],
            ["客户字段建议", state === "done"],
          ].map(([x, done], i) => (
            <article key={x}>
              <i>
                {done ? (
                  <Check />
                ) : state === "loading" && i === 1 ? (
                  <LoaderCircle className="spin" />
                ) : (
                  i + 1
                )}
              </i>
              <span>
                <b>{x}</b>
                <small>
                  {done
                    ? "已完成"
                    : state === "loading" && i === 1
                      ? "处理中"
                      : "等待"}
                </small>
              </span>
            </article>
          ))}
          {state === "done" && (
            <button onClick={() => setToast("已打开资料确认页")}>
              查看解析结果
              <ArrowUpRight />
            </button>
          )}
        </aside>
      </div>
      <ClientToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Tasks() {
  const [toast, setToast] = useState("");
  const [selected, setSelected] = useState(0);
  const items = [
    { title: "提交算法负责人名单", status: "今天到期", progress: 82 },
    { title: "等待终面候选人反馈", status: "等待客户", progress: 64 },
    { title: "更新客户人才地图", status: "进行中", progress: 43 },
    { title: "整理月度交付报告", status: "未开始", progress: 0 },
  ];
  return (
    <section className="clix-page clix-tasks">
      <header>
        <div>
          <small>SERVICE COMMITMENTS</small>
          <h1>客户交付进度</h1>
        </div>
        <button className="primary" onClick={() => setToast("已添加服务承诺")}>
          <Plus />
          新增承诺
        </button>
      </header>
      <main>
        <section>
          {items.map((item, i) => (
            <button
              className={selected === i ? "active" : ""}
              onClick={() => setSelected(i)}
              key={item.title}
            >
              <i className={`tone-${i}`}>
                {i < 2 ? (
                  <Clock3 />
                ) : i === 2 ? (
                  <LoaderCircle className="spin" />
                ) : (
                  <CalendarDays />
                )}
              </i>
              <span>
                <small>{item.status}</small>
                <b>{item.title}</b>
                <em>
                  <i style={{ width: `${item.progress}%` }} />
                </em>
              </span>
              <strong>{item.progress}%</strong>
            </button>
          ))}
        </section>
        <aside>
          <small>当前承诺</small>
          <h2>{items[selected].title}</h2>
          <p>
            与客户确认交付标准后，系统会同步候选人、岗位和沟通记录中的相关进展。
          </p>
          <dl>
            <div>
              <dt>负责人</dt>
              <dd>于一凡</dd>
            </div>
            <div>
              <dt>客户</dt>
              <dd>智元新创</dd>
            </div>
            <div>
              <dt>截止</dt>
              <dd>今天 16:00</dd>
            </div>
          </dl>
          <footer>
            <button onClick={() => setToast("已标记风险")}>标记风险</button>
            <button className="primary" onClick={() => setToast("交付已完成")}>
              完成交付
            </button>
          </footer>
        </aside>
      </main>
      <ClientToast text={toast} close={() => setToast("")} />
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
export function ClientExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
