import { useMemo, useState } from "react";
import { candidates, papers } from "../data/boards";
import {
  ArrowRight,
  Bot,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  Clock3,
  FileText,
  GripVertical,
  Inbox,
  LoaderCircle,
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
const conversations = [
  {
    name: "林昊",
    role: "具身智能算法负责人",
    preview: "周三下午可以，麻烦先发岗位资料。",
    time: "11:42",
    unread: 2,
  },
  {
    name: "周雨澄",
    role: "VLA 研究员",
    preview: "我比较关注团队的研究方向和规模。",
    time: "10:18",
    unread: 0,
  },
  {
    name: "陈松",
    role: "感知算法专家",
    preview: "这周出差，下周一可以电话沟通。",
    time: "昨天",
    unread: 0,
  },
];
function IToast({ text, close }) {
  return text ? (
    <div className="inbx-toast">
      <Check />
      <span>{text}</span>
      <button onClick={close}>
        <X />
      </button>
    </div>
  ) : null;
}
function IModal({ type, close, done }) {
  return (
    <div className="inbx-shade">
      <section className="inbx-modal" role="dialog">
        <header>
          <span>{type === "new" ? <UserRound /> : <Trash2 />}</span>
          <div>
            <small>CANDIDATE PROFILE</small>
            <h2>{type === "new" ? "新建候选人" : "删除候选人"}</h2>
          </div>
        </header>
        {type === "new" ? (
          <>
            <label>
              姓名
              <input defaultValue="赵星羽" />
            </label>
            <label>
              当前职位
              <input defaultValue="机器人平台架构师" />
            </label>
          </>
        ) : (
          <p>候选人资料和未结束的关联记录将一并删除且无法恢复。</p>
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
  const [active, setActive] = useState(0);
  const [messages, setMessages] = useState([
    "候选人询问团队规模和研究方向。",
    "建议先说明团队的研究自主权，再补充当前产品落地阶段。",
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [toast, setToast] = useState("");
  const send = () => {
    if (!input.trim()) return;
    setMessages((v) => [...v, input]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((v) => [
        ...v,
        "已生成一版自然的回复草稿，并引用了岗位解析中的团队信息。",
      ]);
      setTyping(false);
    }, 600);
  };
  return (
    <section className="inbx-page inbx-agent">
      <aside className="inbx-app">
        <b>H</b>
        {[Inbox, UserRound, CalendarDays, Bot].map((I, i) => (
          <button className={i === 3 ? "active" : ""} key={i}>
            <I />
          </button>
        ))}
        <span>于</span>
      </aside>
      <aside className="inbx-threads">
        <header>
          <div>
            <small>Agent 协作</small>
            <h1>候选人沟通</h1>
          </div>
          <button onClick={() => setToast("已创建新会话")}>
            <Plus />
          </button>
        </header>
        <label>
          <Search />
          <input placeholder="搜索会话" />
        </label>
        {conversations.map((c, i) => (
          <button
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
            key={c.name}
          >
            <i>{c.name[0]}</i>
            <span>
              <b>
                {c.name}
                <time>{c.time}</time>
              </b>
              <small>{c.preview}</small>
            </span>
            {c.unread > 0 && <em>{c.unread}</em>}
          </button>
        ))}
      </aside>
      <main>
        <header>
          <div>
            <i>{conversations[active].name[0]}</i>
            <span>
              <b>{conversations[active].name}</b>
              <small>{conversations[active].role}</small>
            </span>
          </div>
          <button onClick={() => setToast("已打开候选人资料")}>
            候选人资料
          </button>
        </header>
        <section>
          {messages.map((m, i) => (
            <article className={i % 2 ? "agent" : "user"} key={`${m}-${i}`}>
              <i>{i % 2 ? <Bot /> : <UserRound />}</i>
              <div>
                <small>{i % 2 ? "Hunter Agent" : "你"}</small>
                <p>{m}</p>
              </div>
            </article>
          ))}
          {typing && (
            <article className="agent">
              <i>
                <LoaderCircle className="spin" />
              </i>
              <div>
                <small>Hunter Agent</small>
                <p>正在结合岗位与沟通上下文生成建议…</p>
              </div>
            </article>
          )}
        </section>
        <footer>
          <div>
            <button>
              <Paperclip />
            </button>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="回复或让 Agent 帮你准备内容"
            />
            <button onClick={send}>
              <Send />
            </button>
          </div>
          <small>Agent 建议不会自动发送给候选人。</small>
        </footer>
      </main>
      <aside className="inbx-context">
        <h2>沟通背景</h2>
        <article>
          <small>目标岗位</small>
          <b>具身智能算法负责人</b>
        </article>
        <article>
          <small>下一步</small>
          <b>发送团队资料</b>
          <button onClick={() => setToast("团队资料已加入草稿")}>
            加入消息
          </button>
        </article>
        <section>
          <Bot />
          <p>建议先回答候选人最关心的问题，再推进时间安排。</p>
        </section>
      </aside>
      <IToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function List() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");
  const [pipeline, setPipeline] = useState("全部");
  const [locations, setLocations] = useState(["上海", "北京"]);
  const [industry, setIndustry] = useState("人工智能 / 机器人");
  const [dateRange, setDateRange] = useState("近 14 天");
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
    <section className="inbx-page inbx-list">
      <header>
        <div>
          <small>TALENT INBOX</small>
          <h1>候选人管理</h1>
        </div>
        <button className="primary" onClick={() => setModal("new")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="inbx-toolbar">
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
            <section className="inbx-dropdown" role="menu">
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
            onClick={() => setFilter(filter === "location" ? "" : "location")}
          >
            地点 · {locations.length}
            <ChevronDown />
          </button>
          {filter === "location" && (
            <section className="inbx-dropdown inbx-multi" role="menu">
              {["上海", "北京", "深圳", "杭州"].map((item) => (
                <button
                  role="menuitemcheckbox"
                  aria-checked={locations.includes(item)}
                  onClick={() =>
                    setLocations((values) =>
                      values.includes(item)
                        ? values.filter((value) => value !== item)
                        : [...values, item],
                    )
                  }
                  key={item}
                >
                  {locations.includes(item) && <Check />}
                  {item}
                </button>
              ))}
              <footer>
                <button onClick={() => setLocations([])}>清空</button>
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
            <section className="inbx-industry" role="menu">
              <nav>
                {["人工智能", "先进制造", "汽车"].map((item) => (
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
                      setFilter("");
                    }}
                    key={item}
                  >
                    {item.split(" / ")[1]}
                  </button>
                ))}
              </div>
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
            <section className="inbx-dropdown inbx-date" role="menu">
              {["近 7 天", "近 14 天", "自定义"].map((item) => (
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
                  <button>07-01</button>
                  <span>至</span>
                  <button>08-07</button>
                </div>
              )}
              <footer>
                <button onClick={() => setFilter("")}>应用日期</button>
              </footer>
            </section>
          )}
        </div>
      </div>
      <section className="inbx-listtable">
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
      <footer className="inbx-pager">
        <span>1–4 / 48</span>
        <button disabled>上一页</button>
        <button onClick={() => setToast("已进入下一页")}>下一页</button>
      </footer>
      {modal && (
        <IModal
          type={modal}
          close={() => setModal("")}
          done={() => {
            setToast(modal === "new" ? "候选人已创建" : "候选人已删除");
            setModal("");
          }}
        />
      )}
      <IToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Pipeline() {
  const [drag, setDrag] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const stages = ["储备", "进行中", "成功", "失败"];
  return (
    <section className="inbx-page inbx-pipeline">
      <header>
        <div>
          <small>沟通驱动流程</small>
          <h1>候选人推进</h1>
        </div>
        <button onClick={() => setToast("已打开今日沟通计划")}>
          <CalendarDays />
          今日安排
        </button>
      </header>
      <div className="inbx-board">
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
              <b>{s}</b>
              <span>{i + 1}</span>
            </header>
            {conversations.slice(i % 3, (i % 3) + 1).map((c) => (
              <article
                draggable
                onDragStart={() => setDrag(c.name)}
                key={c.name}
              >
                <div>
                  <GripVertical />
                  <i>{c.name[0]}</i>
                  <span>
                    <b>{c.name}</b>
                    <small>{c.role}</small>
                  </span>
                </div>
                <p>{c.preview}</p>
                <footer>
                  <time>{c.time}</time>
                  <button onClick={() => setNote(c.name)}>
                    <MessageSquareText />
                  </button>
                </footer>
              </article>
            ))}
          </section>
        ))}
      </div>
      {note && (
        <div className="inbx-shade">
          <section className="inbx-modal">
            <header>
              <h2>添加沟通备注</h2>
            </header>
            <textarea
              defaultValue={`${note}：下次沟通先确认候选人的核心顾虑。`}
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
      <IToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Matching() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  return (
    <section className="inbx-page inbx-matching">
      <header>
        <div>
          <small>OUTREACH READY</small>
          <h1>可联系的匹配候选人</h1>
        </div>
        <button
          onClick={() => setToast("已批量生成联系草稿")}
          className="primary"
        >
          生成联系草稿
        </button>
      </header>
      <main>
        <section>
          {conversations.map((c, i) => (
            <article
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={c.name}
            >
              <header>
                <i>{c.name[0]}</i>
                <span>
                  <h2>{c.name}</h2>
                  <p>{c.role}</p>
                </span>
                <strong>{[94, 88, 83][i]}</strong>
              </header>
              <div>
                <span>方向匹配</span>
                <span>职级适配</span>
                <span>近期可沟通</span>
              </div>
              <p>{c.preview}</p>
              <footer>
                <button onClick={() => setToast("已标记不合适")}>不合适</button>
                <button onClick={() => setToast("已加入联系队列")}>
                  加入联系
                </button>
              </footer>
            </article>
          ))}
        </section>
        <aside>
          <small>建议沟通策略</small>
          <h2>{conversations[active].name}</h2>
          <p>
            先说明岗位与候选人当前方向的连接，再介绍团队的技术自主权和工作地点。
          </p>
          <blockquote>
            “看到你最近在 VLA
            方向的研究，我们正在协助一个完整负责机器人模型与数据闭环的团队…”
          </blockquote>
          <button onClick={() => setToast("沟通草稿已复制")}>复制草稿</button>
        </aside>
      </main>
      <IToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Cards() {
  const [tab, setTab] = useState("全部");
  const [toast, setToast] = useState("");
  return (
    <section className="inbx-page inbx-cards">
      <header>
        <div>
          <small>ACADEMIC RESULT CARDS</small>
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
        {papers.map((paper) => (
          <article key={paper.title}>
            <header>
              <i>
                <FileText />
              </i>
              <span>
                <b>{paper.title}</b>
                <small>{paper.authors}</small>
              </span>
              <time>{paper.year}</time>
            </header>
            <p>{paper.abstract}</p>
            <footer>
              <span>
                {paper.tier} · {paper.source}
              </span>
              <div>
                <button onClick={() => setToast("已加入稍后处理")}>
                  <Clock3 />
                </button>
                <button onClick={() => setToast("已打开论文详情")}>
                  <ArrowRight />
                </button>
              </div>
            </footer>
          </article>
        ))}
      </main>
      <button className="inbx-more" onClick={() => setToast("已加载更多论文")}>
        加载更多论文
      </button>
      <IToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function UploadPage() {
  const [state, setState] = useState("idle");
  const [toast, setToast] = useState("");
  const start = () => {
    setState("uploading");
    setTimeout(() => setState("done"), 750);
  };
  return (
    <section className="inbx-page inbx-upload">
      <header>
        <small>ATTACHMENT ANALYSIS</small>
        <h1>上传候选人资料</h1>
        <p>附件会先完成解析，再进入当前会话和候选人详情。</p>
      </header>
      <main>
        <section className="inbx-composer">
          <header>
            <i>林</i>
            <span>
              <b>林昊</b>
              <small>候选人会话</small>
            </span>
          </header>
          <textarea placeholder="可以补充这份文件的背景" />
          <button className="inbx-attach" onClick={start}>
            <Upload />
            <span>
              <b>添加简历附件</b>
              <small>PDF、DOCX</small>
            </span>
          </button>
          <footer>
            <button>
              <Paperclip />
              添加其他资料
            </button>
            <button className="primary" onClick={start}>
              上传并分析
            </button>
          </footer>
        </section>
        <aside>
          <h2>分析状态</h2>
          {state === "idle" ? (
            <div>
              <FileText />
              <p>添加文件后显示分析进度。</p>
            </div>
          ) : (
            <article>
              <FileText />
              <span>
                <b>林昊-简历.pdf</b>
                <small>
                  {state === "done" ? "解析完成" : "正在使用视觉模型解析"}
                </small>
                <i>
                  <em style={{ width: state === "done" ? "100%" : "58%" }} />
                </i>
              </span>
              {state === "done" ? <Check /> : <LoaderCircle className="spin" />}
            </article>
          )}
          {state === "done" && (
            <button onClick={() => setToast("已打开解析结果")}>
              查看解析结果
              <ArrowRight />
            </button>
          )}
        </aside>
      </main>
      <IToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Tasks() {
  const [done, setDone] = useState([]);
  const [toast, setToast] = useState("");
  const items = [
    "回复林昊并发送岗位资料",
    "确认周雨澄下周沟通时间",
    "跟进陈松的客户反馈",
    "整理今日沟通记录",
  ];
  return (
    <section className="inbx-page inbx-tasks">
      <header>
        <div>
          <small>NEXT ACTIONS</small>
          <h1>沟通任务</h1>
        </div>
        <button className="primary" onClick={() => setToast("已添加新任务")}>
          <Plus />
          添加任务
        </button>
      </header>
      <main>
        <section>
          <header>
            <h2>今天</h2>
            <span>{items.length - done.length} 项待办</span>
          </header>
          {items.map((x, i) => (
            <article className={done.includes(i) ? "done" : ""} key={x}>
              <button
                className="check"
                onClick={() =>
                  setDone((v) =>
                    v.includes(i) ? v.filter((n) => n !== i) : [...v, i],
                  )
                }
              >
                {done.includes(i) && <Check />}
              </button>
              <span>
                <b>{x}</b>
                <small>{i < 2 ? "候选人沟通" : "客户跟进"}</small>
              </span>
              <time>{10 + i * 2}:00</time>
              <button onClick={() => setToast("已打开任务详情")}>
                <MoreHorizontal />
              </button>
            </article>
          ))}
        </section>
        <aside>
          <h2>本周响应</h2>
          <strong>86%</strong>
          <p>重要会话在 2 小时内得到处理</p>
          <div>
            {[42, 64, 58, 78, 88, 72, 92].map((v, i) => (
              <i key={i} style={{ height: `${v}%` }}>
                <span>{"一二三四五六日"[i]}</span>
              </i>
            ))}
          </div>
          <footer>
            <CircleAlert />
            <span>2 条会话等待超过 4 小时</span>
          </footer>
        </aside>
      </main>
      <IToast text={toast} close={() => setToast("")} />
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
export function InboxExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
