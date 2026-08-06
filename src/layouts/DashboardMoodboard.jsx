import {
  Activity, ArrowRight, Bot, BriefcaseBusiness, Building2, CalendarDays, Check,
  ChevronRight, CircleAlert, Clock3, FileSearch, Filter, LayoutDashboard, Mail,
  Map, Menu, MessageSquareText, MoreHorizontal, Network, Plus, Search, Sparkles,
  UserRound, UsersRound,
} from "lucide-react";
import { candidates, events, jobs, workflow } from "../data/boards";

const navItems = [
  [LayoutDashboard, "工作台"], [UserRound, "候选人"], [BriefcaseBusiness, "岗位"],
  [Building2, "公司"], [Bot, "Agent"], [Map, "人才地图"],
];

function Avatar({ candidate, small = false }) {
  return <span className={`db-avatar${small ? " small" : ""}`}>{candidate.initials}</span>;
}

function Sidebar({ compact = false }) {
  return <aside className={`db-sidebar${compact ? " compact" : ""}`}>
    <div className="db-brand"><span>H</span><b>Hunter</b></div>
    <nav>{navItems.map(([Icon, label], index) => <button className={index === 0 ? "active" : ""} key={label}><Icon /><span>{label}</span>{index === 4 && <em>3</em>}</button>)}</nav>
    <div className="db-account"><span>于</span><div><b>于一凡</b><small>个人工作空间</small></div></div>
  </aside>;
}

function Topbar({ title = "工作台", subtitle = "今天有 8 项工作需要处理" }) {
  return <header className="db-topbar">
    <div><small>{subtitle}</small><h1>{title}</h1></div>
    <label><Search /><input placeholder="搜索候选人、岗位或公司" /></label>
    <button className="db-icon-btn" title="消息"><MessageSquareText /><i /></button>
    <button className="db-primary"><Plus />导入简历</button>
  </header>;
}

function MetricStrip({ editorial = false }) {
  const values = [["待确认", "18", "+6"], ["流程中", "32", "+4"], ["进行中岗位", "7", "2 紧急"], ["Agent 运行", "3", "1 待处理"]];
  return <section className={`db-metrics${editorial ? " editorial" : ""}`}>{values.map(([label, value, note], index) => <article key={label}><span>0{index + 1}</span><small>{label}</small><b>{value}</b><em>{note}</em></article>)}</section>;
}

function PriorityQueue({ title = "今天优先处理" }) {
  const items = [
    ["联系林昊确认到岗时间", "具身智能算法负责人", "今天 14:00", "high"],
    ["审核 12 位寻访候选人", "穹境机器人", "今天", "normal"],
    ["补充灵巧手岗位画像", "智元新创", "明天", "normal"],
    ["处理脉脉登录状态", "自动寻访", "已暂停", "warn"],
  ];
  return <section className="db-panel db-priority"><header><div><small>PRIORITY</small><h2>{title}</h2></div><button>查看全部 <ArrowRight /></button></header><div className="db-priority-list">{items.map(([name, context, time, level], index) => <article className={level} key={name}><button className="db-check"><Check /></button><span className="db-order">{String(index + 1).padStart(2, "0")}</span><div><b>{name}</b><small>{context}</small></div><time><Clock3 />{time}</time><button className="db-more"><MoreHorizontal /></button></article>)}</div></section>;
}

function CandidateTable({ compact = false, title = "重点候选人" }) {
  return <section className={`db-panel db-candidates${compact ? " compact" : ""}`}><header><div><small>TALENT</small><h2>{title}</h2></div><button><Filter />筛选</button></header><div className="db-table"><div className="db-tr db-th"><span>候选人</span><span>当前公司</span><span>匹配</span><span>流程</span><span /></div>{candidates.map((candidate) => <div className="db-tr" key={candidate.name}><span className="db-person"><Avatar candidate={candidate} /><b>{candidate.name}<small>{candidate.role}</small></b></span><span>{candidate.company}</span><span className="db-score"><i style={{ width: `${candidate.score}%` }} /><b>{candidate.score}</b></span><span><em className="db-stage">{candidate.stage}</em></span><span><ChevronRight /></span></div>)}</div></section>;
}

function Pipeline({ title = "岗位推进" }) {
  return <section className="db-panel db-pipeline"><header><div><small>PIPELINE</small><h2>{title}</h2></div><button>岗位管理 <ArrowRight /></button></header>{jobs.map((job, index) => <article key={job.title}><div><span>0{index + 1}</span><b>{job.title}</b><small>{job.company} · {job.active} 位候选人</small></div><strong>{job.progress}%</strong><i><em style={{ width: `${job.progress}%` }} /></i></article>)}</section>;
}

function AgentPanel({ flow = false }) {
  return <section className={`db-panel db-agent${flow ? " flow" : ""}`}><header><div><small>AGENT</small><h2>自动化任务</h2></div><button><Sparkles />新建任务</button></header>{flow && <div className="db-flow">{workflow.slice(0, 5).map((step, index) => <span className={index < 3 ? "done" : index === 3 ? "current" : ""} key={step}><i>{index < 3 ? <Check /> : index + 1}</i><b>{step}</b></span>)}</div>}<div className="db-event-list">{events.map(([time, label, status]) => <article key={label} className={status}><time>{time}</time><i /><span><b>{label}</b><small>{status === "running" ? "正在处理" : status === "warning" ? "需要确认" : "已完成"}</small></span></article>)}</div></section>;
}

function CalendarPanel() {
  return <section className="db-panel db-calendar"><header><div><small>AUG 06</small><h2>今天日程</h2></div><button><CalendarDays /></button></header>{[["10:30", "与穹境机器人同步画像"], ["14:00", "林昊首次沟通"], ["16:30", "智元岗位周报"]].map(([time, name], index) => <article key={name}><time>{time}</time><i className={`tone-${index}`} /><div><b>{name}</b><small>{index === 1 ? "候选人沟通" : "客户会议"}</small></div></article>)}</section>;
}

function RelationshipPanel() {
  return <section className="db-panel db-relations"><header><div><small>RELATIONSHIP</small><h2>可触达人才</h2></div><button><Network /></button></header><div className="db-relation-map"><span className="self">你</span><i className="line a" /><i className="line b" /><i className="line c" />{candidates.slice(0, 3).map((candidate, index) => <span className={`node n-${index}`} key={candidate.name}><Avatar candidate={candidate} small /><b>{candidate.name}</b><small>{index + 1} 跳</small></span>)}</div><footer><b>7 条可用关系路径</b><button>查看路径 <ArrowRight /></button></footer></section>;
}

function BriefPanel() {
  return <section className="db-brief"><div className="db-brief-index">06 / AUG</div><div><span>今日顾问简报</span><h1>三个决定<br />值得优先处理</h1><p>穹境机器人希望本周完成算法负责人的首轮沟通；两位候选人的到岗时间仍待确认。</p></div><button>进入今日工作 <ArrowRight /></button></section>;
}

function ClientPortfolio() {
  const clients = [["穹境机器人", "3 个岗位", "18 人推进", "稳定"], ["智元新创", "2 个岗位", "11 人推进", "需关注"], ["逐光科技", "2 个岗位", "9 人推进", "稳定"]];
  return <section className="db-panel db-clients"><header><div><small>CLIENT PORTFOLIO</small><h2>重点客户</h2></div><button>全部客户</button></header>{clients.map(([name, roles, people, state], index) => <article key={name}><span>{String(index + 1).padStart(2, "0")}</span><div><b>{name}</b><small>{roles} · {people}</small></div><em className={state === "需关注" ? "warn" : ""}>{state}</em><ChevronRight /></article>)}</section>;
}

function TimelinePanel() {
  return <section className="db-panel db-timeline"><header><div><small>CAREER & CONTACT</small><h2>林昊 · 人才纪事</h2></div><button>打开详情</button></header>{[["2022—至今", "穹境机器人", "算法负责人，带领 24 人团队"], ["2020—2022", "奇点智研", "VLA 与机器人学习"], ["08 月 04 日", "最近联系", "已查看岗位资料，等待首次沟通"]].map(([time, title, desc], index) => <article key={time}><time>{time}</time><i className={index === 2 ? "contact" : ""} /><div><b>{title}</b><p>{desc}</p></div></article>)}</section>;
}

function InboxPanel() {
  return <section className="db-panel db-inbox"><header><div><small>CONVERSATIONS</small><h2>沟通</h2></div><button><Plus /></button></header>{candidates.slice(0, 3).map((candidate, index) => <article className={index === 0 ? "active" : ""} key={candidate.name}><Avatar candidate={candidate} /><div><b>{candidate.name}<time>{["10:42", "昨天", "周一"][index]}</time></b><p>{["到岗时间可以再沟通一下。", "已发送岗位资料，等待回复。", "希望进一步了解团队情况。"][index]}</p></div>{index === 0 && <em>2</em>}</article>)}</section>;
}

function EvidencePanel() {
  return <section className="db-panel db-evidence"><header><div><small>DECISION EVIDENCE</small><h2>推荐依据</h2></div><em>可信度 0.92</em></header><blockquote>“负责具身智能算法团队，推动 VLA 模型从研究原型进入真机部署。”<footer>个人主页 · 2026-08-04</footer></blockquote><article><span>岗位层级</span><b>高度适配</b><em>3 条证据</em></article><article><span>量产经验</span><b>已核验</b><em>2 条证据</em></article><button>审核建议 <ArrowRight /></button></section>;
}

function HandoffPanel() {
  return <section className="db-panel db-handoff"><header><div><small>HANDOFFS</small><h2>待交接与审批</h2></div><button>查看全部</button></header>{[["Agent", "候选人补全结果", "等待你审核"], ["于一凡", "林昊推荐材料", "交给客户确认"], ["Hunter", "岗位寻访任务", "等待平台恢复"]].map(([owner, name, status], index) => <article key={name}><span className={`owner o-${index}`}>{owner === "Agent" ? <Bot /> : owner[0]}</span><div><b>{name}</b><small>{owner} · {status}</small></div><ArrowRight /></article>)}</section>;
}

function EfficiencyDashboard({ board }) {
  return <div className={`hunter-dashboard family-efficiency variant-${board.variant}`}><Sidebar compact={board.variant === "ledger"} /><div className="db-workspace"><Topbar title={board.variant === "queue" ? "优先队列" : board.variant === "modules" ? "我的工作区" : board.variant === "ledger" ? "招聘台账" : "工作台"} /><MetricStrip /><div className="db-dashboard-grid"><PriorityQueue /><CandidateTable compact={board.variant === "ledger"} /><Pipeline /><AgentPanel /></div></div></div>;
}

function ConsultantDashboard({ board }) {
  return <div className={`hunter-dashboard family-consultant variant-${board.variant}`}><nav className="db-consultant-nav"><div className="db-brand"><span>H</span><b>Hunter Advisory</b></div>{navItems.slice(0, 5).map(([Icon, label], index) => <button className={index === 0 ? "active" : ""} key={label}><Icon />{label}</button>)}<button className="profile">于</button></nav><main><div className="db-consultant-tools"><span>{board.family} · {board.name}</span><label><Search /><input placeholder="搜索委托、客户或人才" /></label><button className="db-primary"><Plus />新建委托</button></div>{board.variant === "briefing" && <><BriefPanel /><div className="db-consultant-grid"><ClientPortfolio /><CalendarPanel /><CandidateTable /></div></>}{board.variant === "client-room" && <><div className="db-client-hero"><span>重点客户</span><h1>穹境机器人</h1><p>具身智能团队扩张期 · 3 个进行中岗位 · 本周需确认 4 位候选人</p><button>打开客户档案 <ArrowRight /></button></div><div className="db-consultant-grid"><ClientPortfolio /><Pipeline /><CalendarPanel /></div></>}{board.variant === "dossier" && <><div className="db-dossier-title"><span>DECISION DOSSIER / 026</span><h1>林昊 · 推荐决策档案</h1><p>具身智能算法负责人 · 穹境机器人</p></div><div className="db-dossier-grid"><CandidateTable compact title="候选人摘要" /><EvidencePanel /><TimelinePanel /></div></>}{board.variant === "global" && <><div className="db-global-overview"><div><span>GLOBAL ADVISORY</span><h1>跨区域人才交付</h1><p>北京 · 上海 · 深圳 · 新加坡</p></div><div className="timezone"><span>北京<b>14:32</b></span><span>新加坡<b>14:32</b></span><span>伦敦<b>07:32</b></span></div></div><div className="db-global-grid"><ClientPortfolio /><CalendarPanel /><Pipeline /><CandidateTable compact /></div></>}</main></div>;
}

function PeopleDashboard({ board }) {
  return <div className={`hunter-dashboard family-people variant-${board.variant}`}><Sidebar /><div className="db-workspace"><Topbar title={board.name} subtitle="人物、关系与沟通始终保持上下文" />{board.variant === "journal" && <div className="db-people-grid journal"><div className="person-focus"><Avatar candidate={candidates[0]} /><span>重点候选人</span><h2>林昊</h2><p>具身智能算法负责人<br />穹境机器人</p><button>安排沟通</button></div><TimelinePanel /><CalendarPanel /><RelationshipPanel /></div>}{board.variant === "relationships" && <div className="db-people-grid relationships"><RelationshipPanel /><CandidateTable /><div className="relationship-actions"><span>最佳联系路径</span><h2>你 → 王蕾 → 林昊</h2><p>王蕾在过去 30 天内与林昊有 3 次互动。</p><button>准备联系建议</button></div></div>}{board.variant === "mosaic" && <div className="db-mosaic"><div className="mosaic-intro"><span>CAREER MOSAIC</span><h1>从经历片段看见<br />完整人才能力</h1><p>当前比较 4 位候选人</p></div><div className="mosaic-skill"><small>关键能力</small><b>VLA</b><span>真机部署 · 团队管理 · 多模态</span></div><div className="mosaic-talent"><Avatar candidate={candidates[0]} /><b>林昊</b><span>匹配 94</span></div><div className="mosaic-project"><small>代表项目</small><b>双臂机器人长序列操作</b><p>从研究原型到真实场景部署</p></div><CandidateTable compact /></div>}{board.variant === "conversation" && <div className="db-conversation-grid"><InboxPanel /><div className="conversation-thread"><header><Avatar candidate={candidates[0]} /><div><b>林昊</b><small>具身智能算法负责人</small></div><button><MoreHorizontal /></button></header><div className="thread-day">今天</div><p className="message received">岗位方向很有兴趣，想再了解一下团队规模和汇报关系。</p><p className="message sent">好的，我整理一份团队背景和岗位重点给你，下午也可以电话沟通。</p><footer><input placeholder="输入消息或记录沟通结果" /><button><ArrowRight /></button></footer></div><CalendarPanel /></div>}</div></div>;
}

function BrandDashboard({ board }) {
  return <div className={`hunter-dashboard family-brand variant-${board.variant}`}><header className="db-brand-top"><div className="db-brand"><span>H</span><b>Hunter</b></div><nav>{navItems.slice(0, 5).map(([, label], index) => <button className={index === 0 ? "active" : ""} key={label}>{label}</button>)}</nav><button className="db-primary"><Plus />新建</button><button className="profile">于</button></header><main><div className="db-brand-heading"><span>{board.id} / {board.family}</span><h1>{board.name}</h1><p>{board.thesis}</p></div>{board.variant === "swiss" && <div className="db-swiss-grid"><MetricStrip editorial /><PriorityQueue /><CandidateTable /><AgentPanel /></div>}{board.variant === "signals" && <div className="db-signal-grid"><section className="signal-summary"><span>今日状态</span><b>12</b><p>项工作已完成，8 项正在推进</p></section><Pipeline /><PriorityQueue /><AgentPanel /></div>}{board.variant === "paperless" && <div className="db-paper-grid"><section className="paper-note"><span>今日工作纸</span><h2>具身智能人才交付</h2><p>优先确认岗位角色层级，再审核 12 位寻访候选人。</p><em>于一凡 · 08/06</em></section><CandidateTable /><EvidencePanel /><CalendarPanel /></div>}{board.variant === "columns" && <div className="db-column-grid"><PriorityQueue /><CandidateTable compact /><AgentPanel flow /><Pipeline /></div>}</main></div>;
}

function IntelligenceDashboard({ board }) {
  return <div className={`hunter-dashboard family-intelligence variant-${board.variant}`}><Sidebar compact /><div className="db-workspace"><Topbar title={board.name} subtitle="智能能力服务于当前业务决定" />{board.variant === "copilot" && <div className="db-copilot-grid"><PriorityQueue /><section className="db-panel db-suggestion"><header><Sparkles /><div><small>HUNTER 建议</small><h2>先处理林昊的沟通</h2></div></header><p>候选人已查看岗位资料，且到岗周期是当前唯一未确认风险。</p><div><button>暂不处理</button><button className="db-primary">采纳建议</button></div></section><CandidateTable /><AgentPanel /></div>}{board.variant === "automation" && <div className="db-automation-grid"><AgentPanel flow /><PriorityQueue title="等待你的确认" /><section className="db-panel automation-result"><span>本轮结果</span><b>12</b><p>位候选人进入待确认，3 位因岗位层级不匹配被过滤。</p><button>查看结果 <ArrowRight /></button></section><Pipeline /></div>}{board.variant === "evidence" && <div className="db-evidence-grid"><EvidencePanel /><CandidateTable /><AgentPanel /><section className="db-panel write-impact"><span>写入影响</span><h2>将更新 4 个字段</h2>{["当前职位", "团队规模", "公开主页", "论文关联"].map((item) => <p key={item}><Check />{item}<em>有证据</em></p>)}<button>进入审核</button></section></div>}{board.variant === "handoff" && <div className="db-handoff-grid"><HandoffPanel /><PriorityQueue /><CandidateTable compact /><AgentPanel /></div>}</div></div>;
}

export function DashboardMoodboard({ board }) {
  if (board.family === "专业效率型") return <EfficiencyDashboard board={board} />;
  if (board.family === "高端顾问型") return <ConsultantDashboard board={board} />;
  if (board.family === "人物关系型") return <PeopleDashboard board={board} />;
  if (board.family === "现代品牌型") return <BrandDashboard board={board} />;
  return <IntelligenceDashboard board={board} />;
}
