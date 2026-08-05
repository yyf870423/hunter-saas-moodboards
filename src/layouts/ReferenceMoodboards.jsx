import {
  Activity, AlertTriangle, ArrowRight, BadgeCheck, BookOpen, Bot, Box, BriefcaseBusiness,
  Building2, Check, ChevronRight, CircleDot, Clock3, Command, Compass, FileCheck2, FileText,
  Filter, Flag, FolderSearch, Gauge, GitBranch, Layers3, MapPinned, MessageSquareText, Network,
  PanelRight, Pause, Play, ScanSearch, Search, ShieldCheck, Sparkles, Stamp, Target, TimerReset,
  UserRoundCheck, UsersRound, Waypoints, Wrench,
} from "lucide-react";
import { useMemo, useState } from "react";
import { candidates, events, workflow } from "../data/boards";

const Badge = ({ children, tone = "ok" }) => <span className={`ref-badge ref-${tone}`}>{children}</span>;
const Person = ({ name, index = 0 }) => <span className={`ref-avatar avatar-${index}`}>{name.slice(0, 1)}</span>;
const MiniScore = ({ value }) => <span className="ref-score"><i style={{ width: `${value}%` }} /><b>{value}</b></span>;

function KineticLedger() {
  const [batch, setBatch] = useState(0);
  const states = ["待判断", "已确认", "下一批"];
  return (
    <section className="mood ref-mood kinetic-ledger">
      <header className="ledger-top"><strong>HUNTER / SIGNAL LEDGER</strong><span>感知算法负责人</span><button><Command size={15} /> 命令</button></header>
      <div className="ledger-status"><span>当前批次 08 / 24</span><h1>{states[batch]}</h1><div><b>17</b><small>条可信证据</small></div></div>
      <div className="ledger-grid">
        <aside className="ledger-ticker"><span>LIVE</span>{events.map(([time, title, tone]) => <p key={title} className={tone}><time>{time}</time>{title}</p>)}</aside>
        <div className="ledger-list">{candidates.map((person, index) => <button key={person.name} className={index === batch % candidates.length ? "active" : ""} onClick={() => setBatch(index)}><b>0{index + 1}</b><Person name={person.name} index={index} /><span><strong>{person.name}</strong><small>{person.role}</small></span><MiniScore value={person.score} /><ChevronRight size={18} /></button>)}</div>
        <aside className="ledger-receipt"><span>EVIDENCE / 017</span><h2>{candidates[batch % candidates.length].name}</h2><p>主导真实场景感知模型交付，团队规模和职责范围与岗位高度重合。</p><dl><div><dt>来源</dt><dd>公开履历</dd></div><div><dt>可信度</dt><dd>0.92</dd></div><div><dt>风险</dt><dd>职级待确认</dd></div></dl><button>展开原始证据 <ArrowRight size={14} /></button></aside>
      </div>
      <footer className="ledger-actions"><button>标记不合适</button><button>暂时跳过</button><button className="primary" onClick={() => setBatch((batch + 1) % 3)}><Check size={15} />确认并进入下一位</button></footer>
    </section>
  );
}

function PhysicalTelemetry() {
  const [paused, setPaused] = useState(false);
  const samples = [32, 48, 40, 67, 56, 78, 62, 88, 73, 91, 76, 84];
  return (
    <section className="mood ref-mood physical-telemetry">
      <aside className="telemetry-source"><strong>H / TELEMETRY</strong><span>SOURCE LAYERS</span>{["猎聘 / 12", "脉脉 / 08", "公开网页 / 31", "学术库 / 17"].map((item, i) => <button className={i === 0 ? "active" : ""} key={item}><i />{item}</button>)}<div><Gauge size={18} /><span>吞吐率<strong>3.8 / min</strong></span></div></aside>
      <div className="telemetry-stage">
        <header><div><span>RUN / agent-87f2</span><h1>候选人探索遥测</h1></div><Badge tone="live">正在运行</Badge><button onClick={() => setPaused(!paused)}>{paused ? <Play size={15} /> : <Pause size={15} />}{paused ? "继续回放" : "暂停回放"}</button></header>
        <div className="telemetry-plot"><div className="telemetry-axis">{["12:08", "12:12", "12:16", "12:20", "12:24"].map(t => <span key={t}>{t}</span>)}</div><svg viewBox="0 0 100 40" preserveAspectRatio="none"><polyline points={samples.map((v, i) => `${i * 9},${39 - v * .36}`).join(" ")} /><line x1="64" y1="0" x2="64" y2="40" /></svg><div className="telemetry-cloud">{Array.from({ length: 46 }, (_, i) => <i key={i} style={{ left: `${(i * 37) % 96}%`, top: `${(i * 61) % 84}%`, opacity: .25 + (i % 5) * .13 }} />)}</div><span className="telemetry-cursor">12:18:42<small>读取候选人详情</small></span></div>
        <div className="telemetry-metrics"><article><span>扫描卡片</span><strong>40</strong><small>+12 / 当前页</small></article><article><span>已读详情</span><strong>19</strong><small>47.5% 转化</small></article><article><span>候选结果</span><strong>08</strong><small>5 条待确认</small></article><article><span>平均延迟</span><strong>2.4s</strong><small>接口稳定</small></article></div>
      </div>
      <aside className="telemetry-events"><header><span>EVENT TRACE</span><Filter size={14} /></header>{events.map(([time, title, tone], i) => <article key={title} className={tone}><time>{time}:0{i}</time><i /><div><strong>{title}</strong><p>{i === 1 ? "当前详情包含附件，进入视觉解析队列。" : "事件已记录，可从 checkpoint 继续。"}</p></div></article>)}</aside>
    </section>
  );
}

function InstitutionalTrust() {
  const [approved, setApproved] = useState(false);
  return (
    <section className="mood ref-mood institutional-trust">
      <header className="trust-header"><div><ShieldCheck size={23} /><span><strong>Hunter Business Ledger</strong><small>受控写入 · 全程审计</small></span></div><nav><a>待审批</a><a>审计记录</a><a>权限</a></nav><button><UserRoundCheck size={15} />于一凡</button></header>
      <div className="trust-summary"><span>WRITE REQUEST / 2026-0817</span><h1>候选人信息补全审批</h1><p>3 项资料建议通过双重门禁，等待业务确认后写入。</p><div><Badge>{approved ? "已批准" : "等待审批"}</Badge><small>最后检查 11:42</small></div></div>
      <div className="trust-layout">
        <main className="trust-ledger"><header><h2>字段变更账本</h2><span>3 项变更 · 6 条证据</span></header><table><thead><tr><th>字段</th><th>当前值</th><th>建议值</th><th>证据</th><th>影响</th></tr></thead><tbody>{[["公司","逐光科技","穹境机器人","2 条","更新关联"],["职位","感知算法专家","感知算法负责人","3 条","影响匹配"],["地点","上海","上海 · 杭州","1 条","扩展筛选"]].map((r, i) => <tr key={r[0]}><td><FileCheck2 size={15} />{r[0]}</td><td>{r[1]}</td><td><strong>{r[2]}</strong></td><td><button>{r[3]}</button></td><td><Badge tone={i === 1 ? "warn" : "neutral"}>{r[4]}</Badge></td></tr>)}</tbody></table></main>
        <aside className="trust-responsibility"><span>责任与门禁</span><dl><div><dt>发起人</dt><dd>候选人信息补全 Agent</dd></div><div><dt>业务确认</dt><dd>于一凡</dd></div><div><dt>强制检查</dt><dd>Schema · 来源 · 去重</dd></div><div><dt>写入范围</dt><dd>候选人 1 位</dd></div></dl><p><AlertTriangle size={15} />职位变化将触发一次重新匹配，不影响原始简历。</p><button className="trust-reject">退回修改</button><button className="trust-approve" onClick={() => setApproved(true)}><Stamp size={15} />{approved ? "审批已记录" : "批准写入"}</button></aside>
      </div>
    </section>
  );
}

function AiStateAtlas() {
  const [chapter, setChapter] = useState(1);
  const chapters = ["研究范围", "岗位变化", "人才迁移", "组织对标", "行动结论"];
  return (
    <section className="mood ref-mood ai-state-atlas">
      <aside className="atlas-index"><strong>HUNTER / ATLAS 26</strong><span>具身智能人才状态图册</span>{chapters.map((name, i) => <button key={name} className={chapter === i ? "active" : ""} onClick={() => setChapter(i)}><b>0{i + 1}</b>{name}</button>)}<footer>REPORT 08 / 2026</footer></aside>
      <article className="atlas-report"><header><span>CHAPTER 0{chapter + 1}</span><div>阅读进度 {20 + chapter * 20}%</div></header><h1>{chapters[chapter]}：<br />系统交付能力成为招聘分水岭</h1><p className="atlas-deck">来自 46 个岗位、318 位候选人和 127 篇论文的交叉观察。</p><div className="atlas-chart"><div className="atlas-ring"><strong>{64 + chapter * 4}%</strong><span>岗位提及<br />真实部署</span></div><div className="atlas-bars">{[42, 67, 53, 84, 72].map((v, i) => <i key={i} style={{ height: `${v}%` }}><small>{["感知", "规划", "数据", "部署", "管理"][i]}</small></i>)}</div><aside><b>关键变化</b><p>单一研究成果正在让位于跨栈交付、数据闭环和团队协作能力。</p><button>查看原始样本</button></aside></div><div className="atlas-notes"><span>01</span><p>17 位候选人同时具备研究与量产经历，其中 6 位可通过现有关系路径触达。</p><span>02</span><p>高职级并不天然等同于岗位适配，角色范围仍需独立判断。</p></div></article>
      <aside className="atlas-margin"><span>本章索引</span><b>图 2.4</b><p>能力信号变化</p><b>样本</b><p>2025.08—2026.08</p><b>来源</b><p>岗位 · 简历 · 论文</p><button><BookOpen size={15} />打开注释</button></aside>
    </section>
  );
}

function ExpeditionSearch() {
  const [selected, setSelected] = useState(2);
  const stations = [["目标确认", 12, 72], ["公开搜索", 31, 49], ["渠道探索", 53, 65], ["证据核验", 72, 34], ["交付", 89, 52]];
  return (
    <section className="mood ref-mood expedition-search">
      <header className="expedition-header"><div><Compass size={23} /><span><strong>EXPEDITION 014</strong><small>具身智能关键人才探索</small></span></div><Badge tone="live">航程进行中</Badge><button><TimerReset size={15} />保存 checkpoint</button></header>
      <div className="expedition-map"><div className="map-contours" /><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M8 78 C22 55, 30 56, 36 48 S55 75, 63 53 S77 27, 92 51" /></svg>{stations.map(([name, left, top], i) => <button key={name} className={`${i <= selected ? "reached" : ""} ${i === selected ? "active" : ""}`} style={{ left: `${left}%`, top: `${top}%` }} onClick={() => setSelected(i)}><i>{i < selected ? <Check size={12} /> : i + 1}</i><span>{name}<small>{i < selected ? "已完成" : i === selected ? "探索中" : "待抵达"}</small></span></button>)}<div className="expedition-coordinate">31°14′N / 121°28′E</div></div>
      <aside className="expedition-log"><span>FIELD LOG / DAY 02</span><h1>{stations[selected][0]}</h1><p>{selected === 2 ? "正在从猎聘、脉脉与公开网络验证 31 位潜在候选人的近期经历。" : "航点上下文已保留，可检查本阶段产物。"}</p><dl><div><dt>已探索</dt><dd>31 个实体</dd></div><div><dt>新发现</dt><dd>8 位候选人</dd></div><div><dt>下一检查</dt><dd>来源可信度</dd></div></dl><button>打开本阶段记录 <ArrowRight size={15} /></button><footer><Flag size={14} />下一个里程碑：完成 12 位重点候选人的证据核验</footer></aside>
    </section>
  );
}

function CompileWorkshop() {
  const [stage, setStage] = useState(1);
  const tasks = ["解析输入", "组装候选人", "质量检查", "交付结果"];
  return (
    <section className="mood ref-mood compile-workshop">
      <header className="workshop-header"><strong>HUNTER / COMPILE WORKSHOP</strong><span>岗位匹配工单 #0826</span><button><Wrench size={15} />工坊设置</button></header>
      <aside className="workshop-schedule"><span>TODAY'S RUN</span><h1>把岗位要求<br />编译成候选人</h1>{tasks.map((t, i) => <button className={stage === i ? "active" : ""} onClick={() => setStage(i)} key={t}><b>0{i + 1}</b><span>{t}<small>{i < stage ? "DONE" : i === stage ? "RUNNING" : "QUEUED"}</small></span></button>)}</aside>
      <div className="workshop-bench"><div className="halftone" /><header><span>WORKPIECE / CANDIDATE</span><Badge tone="warn">质量检查中</Badge></header><div className="workshop-machine"><div className="machine-key"><Person name="林昊" /><strong>林昊</strong><small>具身智能算法负责人</small></div><ArrowRight /><div className="machine-gauge"><span>MATCH</span><strong>94</strong><i><em /></i></div><ArrowRight /><div className="machine-stamp"><BadgeCheck /><b>证据<br />通过</b></div></div><div className="workshop-parts">{["VLA", "量产部署", "团队管理", "硕士", "上海"].map((t, i) => <button key={t} className={i === 3 ? "warning" : ""}><Box size={14} />{t}<small>{i === 3 ? "待确认" : "已装配"}</small></button>)}</div><footer><button>退回上一步</button><button className="primary" onClick={() => setStage(Math.min(3, stage + 1))}>通过当前工序 <ArrowRight size={15} /></button></footer></div>
      <aside className="workshop-quality"><span>QUALITY BOARD</span><div><b>03</b><small>检查项</small></div>{["角色层级门禁", "来源可信度", "重复候选人"].map((t, i) => <p key={t}><i className={i === 1 ? "waiting" : ""}>{i === 1 ? "…" : "✓"}</i>{t}</p>)}<button>查看检查清单</button></aside>
    </section>
  );
}

function GuidedService() {
  const [step, setStep] = useState(1);
  const steps = ["告诉 Hunter 目标", "确认搜索策略", "查看候选结果", "开始联系"];
  return (
    <section className="mood ref-mood guided-service">
      <header className="guide-header"><strong>Hunter</strong><nav><a>任务</a><a>人才</a><a>公司</a></nav><button><MessageSquareText size={15} />需要帮助</button></header>
      <div className="guide-stage"><div className="guide-path">{steps.map((name, i) => <button key={name} className={`${i <= step ? "done" : ""} ${i === step ? "active" : ""}`} onClick={() => setStep(i)}><i>{i < step ? <Check size={13} /> : i + 1}</i><span>{name}</span></button>)}</div><article><span>第 {step + 1} 步 / 共 4 步</span><h1>{steps[step]}</h1><p>{step === 1 ? "Hunter 已根据岗位补齐 5 组搜索关键词和 8 家对标公司。确认后可以离开，任务会继续运行。" : "当前步骤的主要信息会在这里集中呈现，复杂字段按需要展开。"}</p><div className="guide-suggestion"><Sparkles size={21} /><div><strong>建议采用宽召回策略</strong><p>先从具身智能、VLA 与机器人平台三个方向召回，再用角色和交付经验筛选。</p></div><button>查看细节</button></div><div className="guide-choices"><button><CircleDot />严格匹配<small>结果更少，确认成本低</small></button><button className="selected"><CircleDot />宽召回<small>结果更全，由 Hunter 分层</small></button></div><footer><button>返回</button><button className="primary" onClick={() => setStep(Math.min(3, step + 1))}>确认并继续 <ArrowRight size={15} /></button></footer></article></div>
      <aside className="guide-next"><span>接下来会发生</span><div className="guide-illustration"><i /><i /><i /><Waypoints /></div><ol><li>多渠道寻找候选人</li><li>核验公开资料与证据</li><li>按匹配度分层</li></ol><p><Clock3 size={14} />预计 2—4 小时完成，可以关闭页面。</p></aside>
    </section>
  );
}

function TeamworkFabric() {
  const [focus, setFocus] = useState("候选人核验");
  const lanes = [
    ["岗位", BriefcaseBusiness, ["岗位画像", "搜索策略"]],
    ["人员", UsersRound, ["林昊", "周雨澄", "于一凡"]],
    ["证据", FileText, ["公开履历", "论文 6 篇"]],
    ["Agent", Bot, ["候选人核验", "匹配评估"]],
  ];
  return (
    <section className="mood ref-mood teamwork-fabric">
      <header className="fabric-header"><div><Network size={21} /><span><strong>协作关系织网</strong><small>感知算法负责人</small></span></div><nav><a className="active">关系流</a><a>责任</a><a>历史</a></nav><button><UsersRound size={15} />邀请协作</button></header>
      <div className="fabric-canvas"><svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M22 15 C42 15 39 38 57 38 S72 62 88 62" /><path d="M22 62 C39 62 39 86 58 86" /><path d="M45 38 C55 38 54 15 70 15" /></svg>{lanes.map(([name, Icon, items], index) => <section key={name} className={`fabric-lane lane-${index}`}><header><Icon size={16} /><span>{name}</span><b>{items.length}</b></header><div>{items.map((item, i) => <button className={focus === item ? "active" : ""} key={item} onClick={() => setFocus(item)}><i>{index === 1 ? <Person name={item} index={i} /> : <Icon size={15} />}</i><span>{item}<small>{["已确认", "处理中", "可追踪"][i % 3]}</small></span></button>)}</div></section>)}</div>
      <aside className="fabric-inspector"><span>当前关系对象</span><h1>{focus}</h1><Badge tone="live">处理中</Badge><p>该任务由岗位搜索策略触发，完成后将 6 条核验证据交给匹配评估。</p><dl><div><dt>负责人</dt><dd><Person name="于一凡" />于一凡</dd></div><div><dt>上游</dt><dd>搜索策略</dd></div><div><dt>下游</dt><dd>匹配评估</dd></div></dl><button>打开对象详情 <ArrowRight size={15} /></button></aside>
    </section>
  );
}

function PatternLibrary() {
  const [selected, setSelected] = useState(0);
  const samples = useMemo(() => Array.from({ length: 12 }, (_, i) => ({ name: ["林昊", "周雨澄", "陈松", "宋北辰"][i % 4], role: ["VLA", "端到端感知", "机器人平台", "数据闭环"][i % 4], score: 94 - i * 2 })), []);
  return (
    <section className="mood ref-mood pattern-library">
      <header className="library-header"><strong>HUNTER LIBRARY</strong><label><Search size={16} /><input placeholder="搜索候选人、公司、论文或证据" /></label><button><FolderSearch size={15} />已保存视图</button><button>比较托盘 3</button></header>
      <aside className="library-filters"><span>条件树</span>{[["实体类型", ["候选人 128", "公司 34", "论文 417"]],["能力方向", ["VLA 42", "感知 67", "规划 31"]],["证据状态", ["已核验 86", "待确认 29"]]].map(([title, values]) => <section key={title}><h2>{title}</h2>{values.map((v, i) => <label key={v}><input type="checkbox" defaultChecked={i === 0} /> <i />{v}</label>)}</section>)}</aside>
      <main className="library-wall"><header><div><h1>候选人资料样本</h1><span>128 个结果 · 匹配度排序</span></div><button><Filter size={15} />筛选 4</button></header><div>{samples.map((item, i) => <button key={i} className={selected === i ? "active" : ""} onClick={() => setSelected(i)}><div className={`sample-portrait portrait-${i % 5}`}><span>{item.name.slice(0, 1)}</span><i /><i /></div><strong>{item.name}</strong><small>{item.role} · {item.score} 匹配</small><span><Badge tone={i % 3 === 0 ? "warn" : "neutral"}>{i % 3 === 0 ? "待确认" : "已核验"}</Badge><b>＋</b></span></button>)}</div></main>
      <aside className="library-inspector"><header><span>资料检查器</span><PanelRight size={16} /></header><div className="inspector-portrait">{samples[selected].name.slice(0, 1)}</div><h1>{samples[selected].name}</h1><p>{samples[selected].role} · 穹境机器人</p><MiniScore value={samples[selected].score} /><dl><div><dt>匹配证据</dt><dd>6 条</dd></div><div><dt>公开资料</dt><dd>4 个来源</dd></div><div><dt>关系路径</dt><dd>2 跳</dd></div></dl><button>加入比较</button><button className="primary">打开完整资料</button></aside>
    </section>
  );
}

function DigitalCuratorial() {
  const [exhibit, setExhibit] = useState(0);
  const exhibits = ["林昊", "具身智能人才图", "VLA 研究档案", "穹境机器人"];
  return (
    <section className="mood ref-mood digital-curatorial">
      <header className="gallery-header"><div><strong>HUNTER COLLECTION</strong><small>人才与组织成果馆藏</small></div><nav>{["人物", "组织", "研究", "关系"].map((t, i) => <button className={exhibit === i ? "active" : ""} onClick={() => setExhibit(i)} key={t}>{t}</button>)}</nav><span>COLLECTION 08 / 26</span></header>
      <aside className="gallery-catalog"><span>展览目录</span>{exhibits.map((name, i) => <button className={exhibit === i ? "active" : ""} onClick={() => setExhibit(i)} key={name}><b>0{i + 1}</b>{name}</button>)}<footer>已确认成果 · 内部资料</footer></aside>
      <main className="gallery-exhibit"><span>EXHIBIT 0{exhibit + 1}</span><div className={`gallery-art art-${exhibit}`}><i /><i /><i /><strong>{exhibits[exhibit].slice(0, 1)}</strong></div><h1>{exhibits[exhibit]}</h1><p>{exhibit === 0 ? "具备研究与量产双重经历的感知算法负责人，可通过两跳关系路径触达。" : "由 Hunter 已确认业务数据形成的重点成果。"}</p><div className="gallery-pagination"><button>←</button><span>0{exhibit + 1} / 04</span><button>→</button></div></main>
      <aside className="gallery-label"><span>展签 / LABEL</span><h2>{exhibit === 0 ? "人物档案" : "业务成果"}</h2><dl><div><dt>收录时间</dt><dd>2026.08.05</dd></div><div><dt>来源</dt><dd>4 个公开来源</dd></div><div><dt>可信度</dt><dd>0.92</dd></div><div><dt>关系</dt><dd>岗位 · 公司 · 论文</dd></div></dl><blockquote>“完成从算法原型到真实设备部署的全链路交付。”</blockquote><button>打开成果详情 <ArrowRight size={15} /></button></aside>
    </section>
  );
}

export const referenceLayouts = {
  "kinetic-ledger": KineticLedger,
  "physical-telemetry": PhysicalTelemetry,
  "institutional-trust": InstitutionalTrust,
  "ai-state-atlas": AiStateAtlas,
  "expedition-search": ExpeditionSearch,
  "compile-workshop": CompileWorkshop,
  "guided-service": GuidedService,
  "teamwork-fabric": TeamworkFabric,
  "pattern-library": PatternLibrary,
  "digital-curatorial": DigitalCuratorial,
};
