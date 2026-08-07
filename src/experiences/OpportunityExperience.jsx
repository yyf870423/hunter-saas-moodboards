import { useMemo, useState } from "react";
import { candidates, papers } from "../data/boards";
import {
  ArrowRight,
  Bot,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  FileText,
  FileSpreadsheet,
  GripVertical,
  LoaderCircle,
  MapPin,
  MessageSquareText,
  MoreHorizontal,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  Upload,
  UserRound,
  X,
  Zap,
} from "lucide-react";
const opportunities = [
  {
    company: "智元新创",
    type: "招聘扩张",
    signal: "新增 VLA 与灵巧手岗位",
    score: 94,
    city: "上海",
  },
  {
    company: "穹境机器人",
    type: "融资动态",
    signal: "完成新一轮融资并扩充团队",
    score: 88,
    city: "北京",
  },
  {
    company: "逐光科技",
    type: "人才流动",
    signal: "算法团队出现关键职位空缺",
    score: 83,
    city: "深圳",
  },
];
function OToast({ text, close }) {
  return text ? (
    <div className="oppx-toast">
      <Zap />
      <span>{text}</span>
      <button onClick={close}>
        <X />
      </button>
    </div>
  ) : null;
}
function OModal({ type, close, done }) {
  return (
    <div className="oppx-shade">
      <section className="oppx-modal" role="dialog">
        <header>
          <UserRound />
          <div>
            <small>CANDIDATE OBJECT</small>
            <h2>{type === "add" ? "新建候选人" : "删除候选人"}</h2>
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
    "帮我判断最近值得 BD 跟进的具身智能公司。",
    "已发现 9 家近期有招聘或融资变化的公司，正在补全岗位和关键联系人。",
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
        "已按上海地区重新排序，智元新创和远川智能进入高优先队列。",
      ]);
      setBusy(false);
    }, 650);
  };
  return (
    <section className="oppx-page oppx-agent">
      <aside>
        <div>
          <Target />
          <b>Hunter</b>
        </div>
        <nav>
          {["机会", "公司", "岗位", "人才"].map((x, i) => (
            <button className={i === 0 ? "active" : ""} key={x}>
              {x}
            </button>
          ))}
        </nav>
        <section>
          <small>本周新增机会</small>
          <strong>38</strong>
          <span>较上周 +12%</span>
        </section>
      </aside>
      <main>
        <header>
          <div>
            <small>BD 机会 Agent</small>
            <h1>寻找潜在客户</h1>
          </div>
          <button onClick={() => setToast("已保存为周期任务")}>
            保存为任务
          </button>
        </header>
        <div className="oppx-agent-layout">
          <section>
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
                  <p>正在补全公司、岗位和联系人…</p>
                </article>
              )}
            </div>
            <footer>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="补充行业、地点或公司阶段"
              />
              <button onClick={send}>
                <ArrowRight />
              </button>
            </footer>
          </section>
          <aside>
            <h2>机会预览</h2>
            {opportunities.map((o) => (
              <button key={o.company}>
                <i>
                  <Building2 />
                </i>
                <span>
                  <small>{o.type}</small>
                  <b>{o.company}</b>
                  <p>{o.signal}</p>
                </span>
                <strong>{o.score}</strong>
              </button>
            ))}
          </aside>
        </div>
      </main>
      <OToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function List() {
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState("");
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
    <section className="oppx-page oppx-list">
      <header>
        <div>
          <small>TALENT OBJECTS</small>
          <h1>候选人管理</h1>
        </div>
        <button className="primary" onClick={() => setModal("add")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="oppx-toolbar">
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
            onClick={() => setMenu(menu === "pipeline" ? "" : "pipeline")}
          >
            {pipeline === "全部" ? "流程状态" : pipeline}
            <ChevronDown />
          </button>
          {menu === "pipeline" && (
            <section className="oppx-dropdown" role="menu">
              {["全部", "在流程中", "不在流程中"].map((item) => (
                <button
                  role="menuitemradio"
                  aria-checked={pipeline === item}
                  onClick={() => {
                    setPipeline(item);
                    setMenu("");
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
          <button onClick={() => setMenu(menu === "company" ? "" : "company")}>
            公司 · {companies.length}
            <ChevronDown />
          </button>
          {menu === "company" && (
            <section className="oppx-dropdown oppx-multi" role="menu">
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
                <button onClick={() => setMenu("")}>完成</button>
              </footer>
            </section>
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
            <section className="oppx-industry" role="menu">
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
                      setMenu("");
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
          <button onClick={() => setMenu(menu === "date" ? "" : "date")}>
            <CalendarDays />
            {dateRange}
            <ChevronDown />
          </button>
          {menu === "date" && (
            <section className="oppx-dropdown oppx-date" role="menu">
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
                  <span>→</span>
                  <button>2026-08-07</button>
                </div>
              )}
              <footer>
                <button onClick={() => setMenu("")}>应用日期</button>
              </footer>
            </section>
          )}
        </div>
      </div>
      <section className="oppx-table">
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
              <MapPin />
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
      <footer className="oppx-pages">
        <span>1–4 / 48</span>
        <button disabled>上一页</button>
        <button onClick={() => setToast("已进入下一页")}>下一页</button>
      </footer>
      {modal && (
        <OModal
          type={modal}
          close={() => setModal("")}
          done={() => {
            setToast(modal === "add" ? "候选人已创建" : "候选人已删除");
            setModal("");
          }}
        />
      )}
      <OToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Pipeline() {
  const [drag, setDrag] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const lanes = ["储备", "进行中", "成功", "失败"];
  return (
    <section className="oppx-page oppx-pipeline">
      <header>
        <div>
          <small>BD OPPORTUNITY FLOW</small>
          <h1>客户机会泳道</h1>
        </div>
        <button onClick={() => setToast("已应用自动补全规则")}>
          <Sparkles />
          自动补全
        </button>
      </header>
      <div className="oppx-board">
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
              <span>{i + 1}</span>
            </header>
            {opportunities.slice(i % 3, (i % 3) + 1).map((o) => (
              <article
                draggable
                onDragStart={() => setDrag(o.company)}
                key={o.company}
              >
                <header>
                  <GripVertical />
                  <i>
                    <Building2 />
                  </i>
                  <strong>{o.score}</strong>
                </header>
                <h2>{o.company}</h2>
                <p>{o.signal}</p>
                <div>
                  <span>{o.type}</span>
                  <span>{o.city}</span>
                </div>
                <footer>
                  <small>{i < 2 ? "Agent 处理" : "于一凡"}</small>
                  <button onClick={() => setNote(o.company)}>
                    <MessageSquareText />
                  </button>
                </footer>
              </article>
            ))}
          </section>
        ))}
      </div>
      {note && (
        <div className="oppx-shade">
          <section className="oppx-modal">
            <header>
              <h2>机会备注</h2>
            </header>
            <textarea
              defaultValue={`${note}：优先确认当前招聘负责人和开放岗位。`}
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
      <OToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Matching() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  return (
    <section className="oppx-page oppx-matching">
      <header>
        <div>
          <small>COMPANY × TALENT</small>
          <h1>机会匹配</h1>
        </div>
        <button className="primary" onClick={() => setToast("已创建跟进任务")}>
          创建跟进
        </button>
      </header>
      <main>
        <section>
          {opportunities.map((o, i) => (
            <button
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={o.company}
            >
              <i>
                <Building2 />
              </i>
              <span>
                <small>{o.type}</small>
                <b>{o.company}</b>
                <p>{o.signal}</p>
              </span>
              <strong>{o.score}</strong>
            </button>
          ))}
        </section>
        <article>
          <header>
            <div>
              <small>当前机会</small>
              <h2>{opportunities[active].company}</h2>
            </div>
            <em>{opportunities[active].score} 分</em>
          </header>
          <div className="oppx-matchmatrix">
            <section>
              <span>开放岗位</span>
              <b>6</b>
              <small>VLA、运动控制、灵巧手</small>
            </section>
            <section>
              <span>储备候选人</span>
              <b>24</b>
              <small>其中 8 人高匹配</small>
            </section>
            <section>
              <span>关键联系人</span>
              <b>3</b>
              <small>已找到招聘负责人</small>
            </section>
          </div>
          <h3>建议动作</h3>
          <p>
            先补充招聘负责人的公开联系方式，再以当前岗位和人才储备作为首次联系依据。
          </p>
          <footer>
            <button onClick={() => setToast("已打开公司资料")}>查看公司</button>
            <button onClick={() => setToast("已进入联系人列表")}>
              查看联系人
            </button>
          </footer>
        </article>
      </main>
      <OToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Cards() {
  const [tab, setTab] = useState("全部");
  const [toast, setToast] = useState("");
  return (
    <section className="oppx-page oppx-cards">
      <header>
        <div>
          <small>ACADEMIC DISCOVERY</small>
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
              <span>{paper.source}</span>
              <button onClick={() => setToast("论文菜单已打开")}>
                <MoreHorizontal />
              </button>
            </header>
            <h2>{paper.title}</h2>
            <p>{paper.abstract}</p>
            <div>
              <span>
                <CalendarDays />
                {paper.year}
              </span>
              <strong>{paper.tier}</strong>
            </div>
            <footer>
              <button onClick={() => setToast("已忽略论文")}>忽略</button>
              <button onClick={() => setToast("已打开论文详情")}>
                查看论文
                <ArrowRight />
              </button>
            </footer>
          </article>
        ))}
      </main>
      <button className="oppx-more" onClick={() => setToast("已加载更多论文")}>
        加载更多
      </button>
      <OToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function UploadPage() {
  const [phase, setPhase] = useState(0);
  const [toast, setToast] = useState("");
  const start = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 800);
  };
  return (
    <section className="oppx-page oppx-upload">
      <header>
        <div>
          <small>OBJECT IMPORT</small>
          <h1>批量导入公司线索</h1>
        </div>
        <span>CSV / XLSX</span>
      </header>
      <main>
        <section>
          <button className="oppx-drop" onClick={start}>
            <FileSpreadsheet />
            <span>
              <b>选择公司线索表</b>
              <small>第一行需要包含字段名称</small>
            </span>
            <Upload />
          </button>
          <button className="primary" onClick={start}>
            上传并识别字段
          </button>
        </section>
        <aside>
          <h2>字段映射</h2>
          {phase === 0 ? (
            <p>上传后可预览字段映射和数据质量。</p>
          ) : (
            <>
              {[
                ["公司名称", "company_name", "已识别"],
                ["招聘信号", "hiring_signal", "已识别"],
                ["联系人", "contact", "需确认"],
              ].map(([a, b, c], i) => (
                <article key={a}>
                  <span>
                    <b>{a}</b>
                    <small>{b}</small>
                  </span>
                  <em className={i === 2 ? "warn" : ""}>{c}</em>
                </article>
              ))}
              <footer>
                <span>
                  {phase === 1
                    ? "正在检查 128 行数据"
                    : "发现 126 条可导入线索"}
                </span>
                {phase === 1 ? (
                  <LoaderCircle className="spin" />
                ) : (
                  <button onClick={() => setToast("已打开导入确认")}>
                    继续
                    <ArrowRight />
                  </button>
                )}
              </footer>
            </>
          )}
        </aside>
      </main>
      <OToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Tasks() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const jobs = [
    "补全 38 家公司资料",
    "寻找 24 位招聘联系人",
    "核验 16 条招聘信号",
    "生成本周 BD 建议",
  ];
  return (
    <section className="oppx-page oppx-tasks">
      <header>
        <div>
          <small>ENRICHMENT RUNS</small>
          <h1>机会补全进度</h1>
        </div>
        <button onClick={() => setToast("已创建补全任务")} className="primary">
          <Plus />
          新建任务
        </button>
      </header>
      <main>
        <nav>
          {jobs.map((j, i) => (
            <button
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={j}
            >
              <i className={`s${i}`}>
                {i === 0 ? (
                  <LoaderCircle className="spin" />
                ) : i === 2 ? (
                  <CircleAlert />
                ) : (
                  <Check />
                )}
              </i>
              <span>
                <b>{j}</b>
                <small>
                  {i === 0 ? "运行中" : i === 2 ? "部分失败" : "已完成"}
                </small>
              </span>
              <strong>{[68, 100, 76, 100][i]}%</strong>
            </button>
          ))}
        </nav>
        <article>
          <header>
            <div>
              <small>当前任务</small>
              <h2>{jobs[active]}</h2>
            </div>
            <button onClick={() => setToast("任务已暂停")}>暂停</button>
          </header>
          <div className="oppx-runbar">
            <i>
              <span style={{ width: `${[68, 100, 76, 100][active]}%` }} />
            </i>
            <b>{[68, 100, 76, 100][active]}%</b>
          </div>
          {[
            ["公司基础资料", "36 / 38"],
            ["招聘岗位", "112 个"],
            ["关键联系人", "21 人"],
            ["失败来源", "2 个"],
          ].map(([a, b], i) => (
            <section key={a}>
              <i>{i === 3 ? <CircleAlert /> : <Check />}</i>
              <span>
                <b>{a}</b>
                <small>{b}</small>
              </span>
              {i === 3 && (
                <button onClick={() => setToast("失败来源已重试")}>重试</button>
              )}
            </section>
          ))}
        </article>
      </main>
      <OToast text={toast} close={() => setToast("")} />
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
export function OpportunityExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
