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
  ShieldAlert,
  ShieldCheck,
  Trash2,
  Upload,
  UserRound,
  X,
} from "lucide-react";
const decisions = [
  {
    title: "更新林昊当前职位",
    type: "信息补全",
    risk: "低风险",
    confidence: 92,
  },
  {
    title: "导入 18 篇具身智能论文",
    type: "学术搜索",
    risk: "需检查",
    confidence: 86,
  },
  {
    title: "覆盖岗位软性要求",
    type: "岗位解析",
    risk: "中风险",
    confidence: 81,
  },
];
function DToast({ text, close }) {
  return text ? (
    <div className="dcx-toast">
      <ShieldCheck />
      <span>{text}</span>
      <button onClick={close}>
        <X />
      </button>
    </div>
  ) : null;
}
function DModal({ type, close, done }) {
  return (
    <div className="dcx-shade">
      <section className="dcx-modal" role="dialog">
        <header>
          <div className={type === "add" ? "normal" : "danger"}>
            {type === "add" ? <UserRound /> : <ShieldAlert />}
          </div>
          <span>
            <small>CANDIDATE CONTROL</small>
            <h2>{type === "add" ? "新建候选人" : "删除候选人"}</h2>
          </span>
        </header>
        {type === "add" ? (
          <>
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
  const [messages, setMessages] = useState([
    "解释为什么建议更新林昊的当前职位。",
    "个人主页和最近公开演讲均使用“具身智能算法负责人”，现有字段仍是“算法专家”。两条来源独立且时间更新。",
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
        "如果你仍不确定，可以选择暂不写入；该建议会保留在待审核列表。",
      ]);
      setBusy(false);
    }, 650);
  };
  return (
    <section className="dcx-page dcx-agent">
      <header>
        <div>
          <ShieldCheck />
          <b>Hunter Decisions</b>
        </div>
        <nav>
          <button className="active">待决定</button>
          <button>已完成</button>
          <button>规则</button>
        </nav>
        <span>3 项待处理</span>
      </header>
      <main>
        <aside>
          <small>审核队列</small>
          <h1>待决定事项</h1>
          {decisions.map((d, i) => (
            <button className={i === 0 ? "active" : ""} key={d.title}>
              <i>{i === 1 ? <ShieldAlert /> : <FileCheck2 />}</i>
              <span>
                <small>{d.type}</small>
                <b>{d.title}</b>
                <em>
                  {d.risk} · {d.confidence}%
                </em>
              </span>
              <ArrowRight />
            </button>
          ))}
        </aside>
        <section>
          <header>
            <div>
              <small>信息补全</small>
              <h2>更新林昊当前职位</h2>
            </div>
            <em>低风险</em>
          </header>
          <div className="dcx-thread">
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
                <p>正在重新核验来源与写入影响…</p>
              </article>
            )}
          </div>
          <footer>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="询问依据、风险或写入影响"
            />
            <button onClick={send}>
              <ArrowRight />
            </button>
          </footer>
        </section>
        <aside className="dcx-evidence">
          <header>
            <h2>证据与影响</h2>
            <strong>92%</strong>
          </header>
          <article>
            <small>写入前</small>
            <del>算法专家</del>
            <small>写入后</small>
            <b>具身智能算法负责人</b>
          </article>
          {["个人主页", "公开演讲"].map((x, i) => (
            <button key={x}>
              <FileCheck2 />
              <span>
                <b>{x}</b>
                <small>{i ? "2026-07-18" : "2026-08-01"}</small>
              </span>
              <ArrowRight />
            </button>
          ))}
          <footer>
            <button onClick={() => setToast("建议已拒绝")}>拒绝</button>
            <button
              className="primary"
              onClick={() => setToast("建议已确认写入")}
            >
              确认写入
            </button>
          </footer>
        </aside>
      </main>
      <DToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function List() {
  const [q, setQ] = useState("");
  const [menu, setMenu] = useState("");
  const [pipeline, setPipeline] = useState("全部");
  const [education, setEducation] = useState(["本科", "硕士"]);
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
    <section className="dcx-page dcx-list">
      <header>
        <div>
          <small>TALENT REGISTER</small>
          <h1>候选人管理</h1>
        </div>
        <button className="primary" onClick={() => setModal("add")}>
          <Plus />
          新建候选人
        </button>
      </header>
      <div className="dcx-toolbar">
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
            <section className="dcx-dropdown" role="menu">
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
          <button
            onClick={() => setMenu(menu === "education" ? "" : "education")}
          >
            学历 · {education.length}
            <ChevronDown />
          </button>
          {menu === "education" && (
            <section className="dcx-dropdown dcx-multi" role="menu">
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
            <section className="dcx-industry" role="menu">
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
            <section className="dcx-dropdown dcx-date" role="menu">
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
                <button onClick={() => setMenu("")}>应用日期</button>
              </footer>
            </section>
          )}
        </div>
      </div>
      <section className="dcx-table">
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
              <button onClick={() => setToast("已打开审核详情")}>审核</button>
              <button onClick={() => setModal("delete")}>
                <Trash2 />
              </button>
            </div>
          </article>
        ))}
      </section>
      <footer className="dcx-pages">
        <span>1–4 / 48</span>
        <button disabled>上一页</button>
        <button onClick={() => setToast("已进入下一页")}>下一页</button>
      </footer>
      {modal && (
        <DModal
          type={modal}
          close={() => setModal("")}
          done={() => {
            setToast(modal === "add" ? "候选人已创建" : "候选人已删除");
            setModal("");
          }}
        />
      )}
      <DToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Pipeline() {
  const [drag, setDrag] = useState("");
  const [note, setNote] = useState("");
  const [toast, setToast] = useState("");
  const lanes = ["储备", "进行中", "成功", "失败"];
  return (
    <section className="dcx-page dcx-pipeline">
      <header>
        <div>
          <small>CONTROLLED RECRUITING FLOW</small>
          <h1>受控招聘流程</h1>
        </div>
        <span>
          <ShieldCheck />
          关键阶段需要明确决定
        </span>
      </header>
      <div className="dcx-board">
        {lanes.map((l, i) => (
          <section
            data-lane-kind={["reserve", "progress", "success", "failure"][i]}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              setToast(i === 3 ? "该阶段需要先确认写入" : "候选人阶段已更新");
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
                    <GripVertical />
                    <i>{n[0]}</i>
                    <strong>{[78, 83, 88, 94][i % 4]}</strong>
                  </header>
                  <h2>{n}</h2>
                  <p>
                    {i < 2
                      ? "资料和岗位证据正在核验。"
                      : "已通过职级与范围门禁。"}
                  </p>
                  <footer>
                    <em>{i === 0 ? "需补证" : "低风险"}</em>
                    <button onClick={() => setNote(n)}>
                      <MessageSquareText />
                    </button>
                  </footer>
                </article>
              ))}
          </section>
        ))}
      </div>
      {note && (
        <div className="dcx-shade">
          <section className="dcx-modal">
            <header>
              <span>
                <h2>添加决策备注</h2>
              </span>
            </header>
            <textarea
              defaultValue={`${note}：确认写入前需要补充当前团队规模。`}
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
      <DToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Matching() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const people = ["林昊", "周雨澄", "陈松"];
  return (
    <section className="dcx-page dcx-matching">
      <header>
        <div>
          <small>EVIDENCE REVIEW</small>
          <h1>匹配决策</h1>
        </div>
        <button className="primary" onClick={() => setToast("匹配决策已提交")}>
          提交决定
        </button>
      </header>
      <main>
        <nav>
          {people.map((p, i) => (
            <button
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={p}
            >
              <span>
                <b>{p}</b>
                <small>{["算法负责人", "VLA 研究员", "感知专家"][i]}</small>
              </span>
              <strong>{[94, 88, 83][i]}</strong>
            </button>
          ))}
        </nav>
        <article>
          <header>
            <div>
              <small>候选人 {active + 1} / 3</small>
              <h2>{people[active]}</h2>
            </div>
            <em>建议推荐</em>
          </header>
          <section className="dcx-scoregrid">
            {[
              ["技能", 96],
              ["职级", 92],
              ["方向", 95],
              ["证据", 89],
            ].map(([a, b]) => (
              <div key={a}>
                <span>{a}</span>
                <strong>{b}</strong>
                <i>
                  <em style={{ width: `${b}%` }} />
                </i>
              </div>
            ))}
          </section>
          <section>
            <h3>支持推荐的证据</h3>
            {[
              "负责过完整 VLA 模型与数据闭环",
              "当前管理范围与岗位相近",
              "公开研究方向与目标问题一致",
            ].map((x) => (
              <p key={x}>
                <Check />
                {x}
              </p>
            ))}
          </section>
          <aside>
            <ShieldAlert />
            <div>
              <b>写入影响</b>
              <p>确认后候选人将进入“已推荐”阶段，并创建客户跟进任务。</p>
            </div>
          </aside>
          <footer>
            <button onClick={() => setToast("已标记不推荐")}>不推荐</button>
            <button onClick={() => setToast("已请求补充证据")}>补充证据</button>
            <button className="primary" onClick={() => setToast("已确认推荐")}>
              确认推荐
            </button>
          </footer>
        </article>
      </main>
      <DToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Cards() {
  const [tab, setTab] = useState("全部");
  const [toast, setToast] = useState("");
  return (
    <section className="dcx-page dcx-cards">
      <header>
        <div>
          <small>ACADEMIC IMPORT REVIEW</small>
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
              <i className={i % 3 === 1 ? "warn" : ""}>
                <FileText />
              </i>
              <span>
                <small>
                  {paper.source} · {paper.year}
                </small>
                <h2>{paper.title}</h2>
              </span>
              <strong>{paper.cited}</strong>
            </header>
            <p>{paper.abstract}</p>
            <div>
              <span>{paper.tier}</span>
              <span>{paper.institutions}</span>
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
      <button className="dcx-more" onClick={() => setToast("已加载更多论文")}>
        加载更多论文
      </button>
      <DToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function UploadPage() {
  const [phase, setPhase] = useState(0);
  const [toast, setToast] = useState("");
  const start = () => {
    setPhase(1);
    setTimeout(() => setPhase(2), 750);
  };
  return (
    <section className="dcx-page dcx-upload">
      <header>
        <small>VALIDATED INTAKE</small>
        <h1>上传并校验业务资料</h1>
        <p>格式、内容类型和写入边界必须通过检查后才能进入后续处理。</p>
      </header>
      <main>
        <section>
          <button className="dcx-drop" onClick={start}>
            <Upload />
            <span>
              <b>选择文件</b>
              <small>PDF、DOCX、XLSX</small>
            </span>
          </button>
          <label>
            资料用途
            <div>
              <button className="active">候选人简历</button>
              <button>岗位 JD</button>
              <button>公司资料</button>
            </div>
          </label>
          <button className="primary" onClick={start}>
            上传并检查
          </button>
        </section>
        <aside>
          <h2>准入检查</h2>
          {phase === 0 ? (
            <p>文件上传后显示校验结果。</p>
          ) : (
            <>
              {[
                ["文件格式", "通过"],
                ["内容类型", "通过"],
                ["必填信息", "通过"],
                ["重复数据", "发现 1 条"],
              ].map(([a, b], i) => (
                <article className={i === 3 ? "warn" : ""} key={a}>
                  <i>{i === 3 ? <ShieldAlert /> : <Check />}</i>
                  <span>
                    <b>{a}</b>
                    <small>{b}</small>
                  </span>
                </article>
              ))}
              {phase === 1 ? (
                <LoaderCircle className="spin" />
              ) : (
                <button onClick={() => setToast("已打开重复数据确认")}>
                  处理重复数据
                  <ArrowRight />
                </button>
              )}
            </>
          )}
        </aside>
      </main>
      <DToast text={toast} close={() => setToast("")} />
    </section>
  );
}
function Tasks() {
  const [active, setActive] = useState(0);
  const [toast, setToast] = useState("");
  const jobs = [
    "核验林昊职位更新",
    "检查论文批量导入",
    "确认岗位画像覆盖",
    "修正公司资料输出",
  ];
  return (
    <section className="dcx-page dcx-tasks">
      <header>
        <div>
          <small>VALIDATION RUNS</small>
          <h1>门禁与写入进度</h1>
        </div>
        <span>
          <ShieldCheck />
          所有写入均经过检查
        </span>
      </header>
      <main>
        <section>
          {jobs.map((j, i) => (
            <button
              className={active === i ? "active" : ""}
              onClick={() => setActive(i)}
              key={j}
            >
              <i className={i === 1 ? "warn" : ""}>
                {i === 0 ? (
                  <LoaderCircle className="spin" />
                ) : i === 1 ? (
                  <ShieldAlert />
                ) : (
                  <Check />
                )}
              </i>
              <span>
                <b>{j}</b>
                <small>
                  {i === 0 ? "运行中" : i === 1 ? "需要修正" : "已完成"}
                </small>
              </span>
              <strong>{[72, 48, 100, 100][i]}%</strong>
            </button>
          ))}
        </section>
        <article>
          <header>
            <div>
              <small>当前任务</small>
              <h2>{jobs[active]}</h2>
            </div>
            <button onClick={() => setToast("任务已暂停")}>暂停</button>
          </header>
          {[
            ["结构校验", "已通过"],
            ["业务字段检查", "已通过"],
            ["证据关联", "运行中"],
            ["写入确认", "等待"],
          ].map(([a, b], i) => (
            <section key={a}>
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
                {i === 2 && <p>正在确认每个建议都有可访问的来源证据。</p>}
              </span>
            </section>
          ))}
          <aside>
            <CircleAlert />
            <div>
              <b>检查失败时不会写入</b>
              <p>系统会要求 Agent 修正；达到重试上限后停止任务。</p>
            </div>
          </aside>
          <footer>
            <button onClick={() => setToast("已打开完整检查记录")}>
              查看检查记录
            </button>
          </footer>
        </article>
      </main>
      <DToast text={toast} close={() => setToast("")} />
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
export function DecisionExperience({ view }) {
  const Page = pages[view];
  return Page ? <Page /> : <div className="fatal-state">页面不存在。</div>;
}
