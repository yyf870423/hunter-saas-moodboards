import {
  Activity, AlertTriangle, ArrowRight, Bot, BriefcaseBusiness, Building2, CalendarDays, Check,
  ChevronRight, CircleUserRound, Clock3, Command, FileText, Filter, GitBranch, LayoutGrid,
  ListFilter, Map, MessageSquareText, MoreHorizontal, Network, PanelRight, Pause, Play, Search,
  Settings2, Sparkles, Target, UsersRound, WandSparkles,
} from "lucide-react";
import { useState } from "react";
import { candidates, events, workflow } from "../data/boards";

const IconButton = ({ icon: Icon, label, active = false }) => (
  <button className={`icon-button ${active ? "active" : ""}`} title={label} aria-label={label}><Icon size={17} /></button>
);

const Score = ({ value }) => <span className="score"><i style={{ width: `${value}%` }} />{value}</span>;
const Avatar = ({ name, tone = 0 }) => <span className={`avatar tone-${tone}`}>{name.slice(0, 1)}</span>;
const Status = ({ children, tone = "success" }) => <span className={`status status-${tone}`}>{children}</span>;

export function MainMoodboard({ board }) {
  const layouts = {
    "precision-desk": PrecisionDesk,
    "editorial-intelligence": EditorialDesk,
    "talent-constellation": TalentConstellation,
    "calm-focus": CalmFocus,
    "command-center": CommandCenter,
    "human-studio": HumanStudio,
    "bauhaus-workflow": BauhausWorkflow,
    "data-atelier": DataAtelier,
    "kinetic-blueprint": KineticBlueprint,
    "adaptive-modules": AdaptiveModules,
  };
  const Layout = layouts[board.slug];
  return <Layout />;
}

function PrecisionDesk() {
  const [selected, setSelected] = useState(0);
  return (
    <section className="mood mood-precision">
      <aside className="precision-rail">
        <div className="rail-mark">H</div>
        {[LayoutGrid, BriefcaseBusiness, UsersRound, Network, Bot].map((Icon, index) => <IconButton key={index} icon={Icon} label={["工作台", "岗位", "候选人", "人才地图", "Agent"][index]} active={index === 0} />)}
        <div className="rail-spacer" /><IconButton icon={Settings2} label="设置" />
      </aside>
      <div className="precision-workspace">
        <header className="precision-titlebar">
          <div><span>岗位 / 自动驾驶</span><h1>感知算法负责人</h1></div>
          <div className="title-actions"><Status>寻访中</Status><button className="button secondary">查看策略</button><button className="button primary"><Sparkles size={15} />继续匹配</button></div>
        </header>
        <div className="precision-toolbar">
          <label><Search size={15} /><input placeholder="搜索候选人、公司、技能" /></label>
          <button><Filter size={15} />筛选 <b>3</b></button><button>匹配度 ↓</button><span>共 128 位候选人</span>
        </div>
        <div className="precision-table-wrap">
          <table className="precision-table">
            <thead><tr><th>候选人</th><th>当前角色</th><th>公司</th><th>匹配</th><th>推进阶段</th><th /></tr></thead>
            <tbody>{candidates.map((person, index) => (
              <tr key={person.name} className={selected === index ? "selected" : ""} onClick={() => setSelected(index)}>
                <td><Avatar name={person.name} tone={index} /><strong>{person.name}</strong></td><td>{person.role}</td><td>{person.company}</td><td><Score value={person.score} /></td><td><Status tone={index === 1 ? "warning" : "neutral"}>{person.stage}</Status></td><td><MoreHorizontal size={17} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
      <aside className="precision-inspector">
        <div className="inspector-head"><span>候选人检查器</span><PanelRight size={16} /></div>
        <div className="inspector-person"><Avatar name={candidates[selected].name} tone={selected} /><h2>{candidates[selected].name}</h2><p>{candidates[selected].role}</p><Score value={candidates[selected].score} /></div>
        <dl className="precision-facts"><div><dt>核心信号</dt><dd>VLA · 端到端感知 · 团队管理</dd></div><div><dt>最近经历</dt><dd>{candidates[selected].company} / 4 年 2 个月</dd></div><div><dt>风险</dt><dd>当前职级可能高于岗位范围</dd></div></dl>
        <div className="inspector-evidence"><h3>匹配证据</h3><p>主导量产感知模型升级，负责 12 人算法团队，与岗位核心责任高度重合。</p><a href="#evidence">查看 6 条证据 <ArrowRight size={14} /></a></div>
        <button className="button primary wide">加入推进流程</button>
      </aside>
    </section>
  );
}

function EditorialDesk() {
  return (
    <section className="mood mood-editorial">
      <header className="editorial-masthead"><span>HUNTER RESEARCH REVIEW</span><h1>招聘情报周刊</h1><div><time>2026 · VOL. 32</time><button>目录</button></div></header>
      <nav className="editorial-sections"><a className="active">本期封面</a><a>岗位研究</a><a>人才观察</a><a>公司档案</a><a>学术前沿</a><span>内部研究资料</span></nav>
      <div className="editorial-layout">
        <article className="editorial-lead">
          <div className="section-number">01 / COVER STORY</div>
          <h2>具身智能的人才争夺，正在从模型能力转向系统交付</h2>
          <p className="editorial-deck">来自 46 个岗位、318 位候选人和 127 篇论文的交叉观察。</p>
          <div className="editorial-rule" />
          <div className="editorial-columns"><p>过去六个月，头部团队对人才的要求出现明显变化：单一模态能力不再构成充分条件，真实环境泛化、数据闭环和工程部署成为招聘描述中的高频信号。</p><p>Hunter 识别到 17 位同时具备研究与量产经历的候选人，其中 6 位可通过现有关系路径触达。值得注意的是，高职级并不天然等同于岗位适配。</p></div>
          <figure className="editorial-chart"><figcaption>岗位能力信号变化</figcaption><div className="bar-set"><i style={{height:"54%"}}/><i style={{height:"72%"}}/><i style={{height:"44%"}}/><i style={{height:"88%"}}/><i style={{height:"63%"}}/></div><div className="chart-labels"><span>感知</span><span>规划</span><span>控制</span><span>数据闭环</span><span>部署</span></div></figure>
        </article>
        <aside className="editorial-index">
          <h3>研究索引</h3>
          {["岗位定义与上下游", "对标团队的人员变化", "关键论文作者追踪", "可迁移能力样本"].map((item, i) => <a key={item}><b>0{i + 2}</b><span>{item}<small>{["12 min", "8 min", "15 min", "6 min"][i]}</small></span></a>)}
          <div className="editorial-note"><span>编辑批注</span><p>需要向业务方确认：该岗位是否承担量产结果，而不只是研究输出。</p></div>
        </aside>
        <aside className="editorial-margin">
          <span>关键证据</span><blockquote>“完成从算法原型到 1000 台设备部署的全链路交付。”</blockquote><cite>候选人公开履历 · 可信度 0.91</cite>
          <div className="margin-stat"><strong>17</strong><span>重点候选人</span></div><div className="margin-stat"><strong>6</strong><span>可直接触达</span></div>
          <button className="editorial-action">打开研究档案 <ArrowRight size={15}/></button>
        </aside>
      </div>
    </section>
  );
}

function TalentConstellation() {
  const [focus, setFocus] = useState("林昊");
  const nodes = [
    ["林昊", 48, 43, "person"], ["穹境机器人", 28, 28, "company"], ["感知负责人", 69, 26, "job"],
    ["VLA 论文", 70, 62, "paper"], ["周雨澄", 37, 69, "person"], ["具身智能", 52, 57, "topic"],
    ["逐光科技", 15, 58, "company"], ["陈松", 84, 44, "person"],
  ];
  return (
    <section className="mood mood-constellation">
      <aside className="constellation-tools"><strong>H</strong>{[Search, Target, Network, ListFilter, Map].map((Icon, i) => <IconButton key={i} icon={Icon} label="空间工具" active={i === 2} />)}</aside>
      <div className="constellation-canvas">
        <div className="constellation-grid" />
        <header><div><span>人才星图 / 具身智能</span><h1>关键人才关系空间</h1></div><div><Status tone="running">实时更新</Status><button><UsersRound size={15}/> 42 个实体</button></div></header>
        <svg className="constellation-links" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M28 28 L48 43 L69 26 M48 43 L52 57 L70 62 M52 57 L37 69 M28 28 L15 58 M52 57 L84 44" /></svg>
        {nodes.map(([name, left, top, type], index) => <button key={name} onClick={() => setFocus(name)} className={`space-node node-${type} ${focus === name ? "active" : ""}`} style={{left:`${left}%`,top:`${top}%`}}><i />{name}<small>{["94 匹配", "当前公司", "开放岗位", "共同作者 3", "关系 2 跳", "核心方向", "曾任公司", "81 匹配"][index]}</small></button>)}
        <div className="constellation-legend"><span><i className="person"/>人物</span><span><i className="company"/>公司</span><span><i className="paper"/>论文</span><span><i className="job"/>岗位</span></div>
        <div className="constellation-timeline"><button><Pause size={14}/></button><span>最近 90 天</span><div><i/><i/><i/><i/><i/></div><time>今天</time></div>
      </div>
      <aside className="constellation-inspector"><span>当前焦点</span><h2>{focus}</h2><p>{focus === "林昊" ? "具身智能算法负责人 · 94 匹配" : "与当前搜索方向存在有效关系"}</p><div className="radar"><i/><i/><i/><b>可信度<br/>0.91</b></div><h3>可到达路径</h3><ol><li><Avatar name="余"/>余老师 <ChevronRight size={13}/></li><li><Avatar name="周" tone={1}/>周雨澄 <ChevronRight size={13}/></li><li><Avatar name={focus} tone={2}/>{focus}</li></ol><button className="button primary wide">查看完整资料</button></aside>
    </section>
  );
}

function CalmFocus() {
  const [done, setDone] = useState(false);
  return (
    <section className="mood mood-calm">
      <header className="calm-nav"><strong>Hunter</strong><nav><a>今天</a><a>岗位</a><a>人才</a></nav><div><button><Search size={17}/></button><Avatar name="于" /></div></header>
      <div className="calm-stage">
        <div className="calm-progress"><span>今日判断</span><b>07 / 12</b><i><em style={{width:"58%"}}/></i></div>
        <article className={`calm-decision ${done ? "resolved" : ""}`}>
          <div className="calm-meta"><Status tone="neutral">待确认</Status><span>感知算法负责人</span><time>保存于 11:36</time></div>
          <div className="calm-person"><Avatar name="周雨澄" tone={1}/><div><h1>周雨澄</h1><p>VLA 研究员 · 奇点智研</p></div><strong>88<small>匹配</small></strong></div>
          <p className="calm-question">这位候选人是否值得进入第一轮沟通？</p>
          <div className="calm-evidence"><span>判断依据</span><p>近三年聚焦视觉语言动作模型，有机器人真机实验经验；当前职级与岗位范围一致。缺少量产部署证据，建议首轮重点确认。</p><button>查看 5 条来源证据</button></div>
          <div className="calm-actions"><button className="button secondary">暂时跳过</button><button className="button secondary danger-text">不合适</button><button className="button primary" onClick={() => setDone(true)}>{done ? <><Check size={16}/>已加入沟通</> : <>进入沟通 <ArrowRight size={16}/></>}</button></div>
        </article>
      </div>
      <footer className="calm-queue"><span>接下来</span>{candidates.slice(2).map((person, i) => <button key={person.name}><Avatar name={person.name} tone={i+2}/><span>{person.name}<small>{person.role}</small></span><b>{person.score}</b></button>)}<button className="queue-more">还有 3 项 <ChevronRight size={14}/></button></footer>
    </section>
  );
}

function CommandCenter() {
  return (
    <section className="mood mood-command">
      <header className="command-status"><strong>HUNTER / OPS</strong><div><span><i className="ok"/>系统正常</span><span>8 个 Agent 运行中</span><span>最后同步 11:42:08</span></div><button><Command size={15}/> 命令中心</button></header>
      <aside className="command-channels"><h2>任务频道</h2>{[[Activity,"全部活动",24],[Bot,"Agent",8],[BriefcaseBusiness,"岗位寻访",6],[UsersRound,"候选人",4],[AlertTriangle,"需要处理",3]].map(([Icon,name,count],i)=><button className={i===0?"active":""} key={name}><Icon size={16}/><span>{name}</span><b>{count}</b></button>)}<div className="command-capacity"><span>运行容量</span><strong>68%</strong><i><em/></i><small>17 / 25 workers</small></div></aside>
      <div className="command-stream"><header><div><h1>实时运行流</h1><span>自动滚动</span></div><button><Filter size={15}/>过滤</button></header><div className="event-stream">{events.map(([time,title,tone],index)=><article key={title} className={`event-${tone}`}><time>{time}<small>:0{index+2}</small></time><i/><div><strong>{title}</strong><p>{["6 条新证据已写入审核队列", "当前批次 31 / 80，预计 18 分钟完成", "关系来源可信度低于 0.7", "岗位要求与搜索策略已同步", "浏览器登录态失效，任务已在 checkpoint 暂停"][index]}</p></div><button><ChevronRight size={16}/></button></article>)}</div></div>
      <aside className="command-alerts"><header><h2>处置队列</h2><span>3</span></header><article className="alert-critical"><AlertTriangle size={18}/><div><strong>脉脉登录失效</strong><p>2 个任务已暂停，进度已保留。</p><button>立即处理</button></div></article><article><Clock3 size={18}/><div><strong>学术搜索超时风险</strong><p>已运行 42 分钟，仍在召回阶段。</p><button>查看过程</button></div></article><h3>今日概况</h3><div className="command-metrics"><span><strong>132</strong>新候选人</span><span><strong>24</strong>待确认</span><span><strong>91%</strong>任务成功</span><span><strong>18m</strong>平均耗时</span></div></aside>
    </section>
  );
}

function HumanStudio() {
  return (
    <section className="mood mood-human">
      <header className="human-header"><div><strong>Hunter</strong><span>关系工作室</span></div><nav><a className="active">人物</a><a>关系</a><a>沟通</a><a>机会</a></nav><button><WandSparkles size={16}/>探索关系</button></header>
      <div className="human-profile"><div className="portrait"><span>林</span><i/><i/></div><div className="human-intro"><span>重点候选人 · 最近更新于今天</span><h1>林昊</h1><p>具身智能算法负责人，关注 VLA、数据闭环与真机泛化。</p><div><Status>可联系</Status><Status tone="neutral">北京</Status><Status tone="neutral">关系 2 跳</Status></div></div><button><MoreHorizontal size={18}/></button></div>
      <div className="human-body">
        <article className="human-story"><header><h2>为什么值得认识</h2><span>由 8 条公开证据整理</span></header><p>他不是单纯的模型研究者。过去四年，他把算法原型推进到真实机器人平台，组织了数据采集、训练评估和现场部署的完整闭环。</p><blockquote>“让模型在真实世界持续学习，而不是只在固定基准上变好。”<cite>公开访谈 · 2025</cite></blockquote><div className="human-highlights"><span><b>12 人</b>团队规模</span><span><b>3 次</b>量产交付</span><span><b>6 篇</b>相关论文</span></div></article>
        <article className="human-path"><header><h2>关系路径</h2><button>查看关系图</button></header><div className="path-people"><div><Avatar name="余"/><span>余教授<small>直接联系人</small></span></div><i/><div><Avatar name="周" tone={1}/><span>周雨澄<small>同实验室</small></span></div><i/><div><Avatar name="林" tone={2}/><span>林昊<small>目标候选人</small></span></div></div><p>建议由余教授引荐。两人近期共同参与机器人学习闭门研讨。</p></article>
        <aside className="human-contact"><h2>联系节奏</h2><ol><li className="done"><i/><time>7 月 28 日</time><p>收藏公开资料</p></li><li className="done"><i/><time>8 月 3 日</time><p>确认关系路径</p></li><li className="current"><i/><time>今天</time><p>准备首次联系</p></li><li><i/><time>待安排</time><p>岗位沟通</p></li></ol><button className="button primary wide"><MessageSquareText size={16}/>准备联系</button></aside>
      </div>
    </section>
  );
}

function BauhausWorkflow() {
  return (
    <section className="mood mood-bauhaus">
      <header className="bauhaus-header"><strong>HUNTER</strong><div className="bauhaus-circle"/><nav><a>岗位</a><a>人才</a><a>流程</a></nav><button>菜单 +</button></header>
      <div className="bauhaus-grid">
        <section className="bauhaus-title"><span>WORKFLOW / 08.06</span><h1>把一个陌生岗位<br/>变成可执行的<br/><em>人才计划</em></h1><button>开始构建 <ArrowRight/></button></section>
        <section className="bauhaus-red"><b>03</b><span>待处理岗位</span><i/></section>
        <section className="bauhaus-blue"><Network size={44}/><strong>128</strong><span>关系节点</span></section>
        <section className="bauhaus-flow"><header><span>当前流程</span><b>72%</b></header>{workflow.slice(0,4).map((step,i)=><div key={step} className={i<3?"done":"active"}><i>{i<3?<Check size={13}/>:i+1}</i><span>{step}</span><b>{["完成","完成","完成","处理中"][i]}</b></div>)}</section>
        <section className="bauhaus-yellow"><Target size={34}/><h2>17 位</h2><p>达到推荐标准</p></section>
        <section className="bauhaus-note"><span>下一步</span><p>确认 6 位存在职级风险的候选人是否进入人工复核。</p><button>打开队列</button></section>
        <section className="bauhaus-stripes"><i/><i/><i/><i/><i/></section>
      </div>
    </section>
  );
}

function DataAtelier() {
  return (
    <section className="mood mood-atelier">
      <aside className="atelier-index"><strong>H</strong><span>ATELIER</span><nav><a className="active">01<br/><small>案卷</small></a><a>02<br/><small>人才</small></a><a>03<br/><small>证据</small></a><a>04<br/><small>沟通</small></a></nav><button><Settings2 size={16}/></button></aside>
      <main className="atelier-work"><header><div><span>PRIVATE SEARCH MANDATE · 024</span><h1>智能驾驶算法总监</h1></div><div className="atelier-status"><i/><span>研究进行中<small>更新于 11:42</small></span></div></header><div className="atelier-rule"/><section className="atelier-brief"><span>委托摘要</span><p>寻找兼具研究判断、量产经验与组织建设能力的算法负责人。候选人需要能在业务快速变化时保持技术路线稳定。</p></section><section className="atelier-landscape"><header><h2>人才图景</h2><span>样本 N = 128</span></header><div className="atelier-plot"><div className="axis-y"><span>研究深度</span></div><div className="plot-field">{candidates.map((p,i)=><button key={p.name} style={{left:`${24+i*19}%`,bottom:`${25+[48,20,39,12][i]}%`}}><i/><span>{p.name}</span></button>)}<em className="target-zone">目标区间</em></div><div className="axis-x">交付复杂度 →</div></div></section></main>
      <aside className="atelier-cabinet"><header><span>精选人选</span><b>04 / 17</b></header>{candidates.map((p,i)=><article key={p.name} className={i===0?"active":""}><span>0{i+1}</span><div><strong>{p.name}</strong><small>{p.role}</small></div><b>{p.score}</b></article>)}<div className="atelier-assessment"><span>顾问判断</span><p>林昊是目前唯一同时满足技术路线、组织规模和交付阶段要求的人选。</p><button>打开完整案卷 <ArrowRight size={14}/></button></div></aside>
    </section>
  );
}

function KineticBlueprint() {
  const [layer, setLayer] = useState(1);
  return (
    <section className="mood mood-blueprint">
      <header className="blueprint-header"><div><strong>HUNTER // BLUEPRINT</strong><span>人才寻访方案 B-042</span></div><nav><button>保存版本</button><button className="primary"><Play size={14}/>执行方案</button></nav></header>
      <aside className="blueprint-layers"><h2>图层</h2>{[[BriefcaseBusiness,"岗位定义"],[GitBranch,"搜索路径"],[UsersRound,"人才样本"],[Bot,"Agent 任务"]].map(([Icon,name],i)=><button key={name} className={layer===i?"active":""} onClick={()=>setLayer(i)}><Icon size={15}/><span>{name}</span><i/></button>)}<div className="blueprint-version"><span>VERSION</span><strong>V.08</strong><small>今天 11:36</small></div></aside>
      <div className="blueprint-canvas"><div className="ruler ruler-x">{Array.from({length:13},(_,i)=><i key={i}>{i*100}</i>)}</div><div className="ruler ruler-y">{Array.from({length:7},(_,i)=><i key={i}>{i*100}</i>)}</div><svg viewBox="0 0 1000 560" className="blueprint-lines"><path d="M120 290 H280 Q320 290 320 245 V160 H510"/><path d="M320 290 V420 H510"/><path d="M650 160 H750 V290 H880"/><path d="M650 420 H750 V290"/></svg><div className="blue-node node-a"><span>A01</span><BriefcaseBusiness/><strong>岗位画像</strong><small>已确认</small></div><div className="blue-node node-b"><span>B12</span><Search/><strong>论文作者召回</strong><small>132 人</small></div><div className="blue-node node-c"><span>B14</span><Network/><strong>关系网络扩展</strong><small>48 人</small></div><div className="blue-node node-d"><span>C07</span><Bot/><strong>证据核验 Agent</strong><small>运行中 · 68%</small></div><div className="blueprint-callout"><b>!</b><p>当前路径预计产生 17 位强匹配候选人</p></div></div>
      <aside className="blueprint-properties"><header><span>节点属性</span><MoreHorizontal size={16}/></header><h2>证据核验 Agent</h2><label>执行范围<input value="候选人公开资料与论文" readOnly/></label><label>门禁条件<select defaultValue="strict"><option value="strict">证据可信度 ≥ 0.6</option></select></label><div className="property-metrics"><span><b>31</b>已完成</span><span><b>14</b>处理中</span></div><button className="button secondary wide">查看运行过程</button></aside>
    </section>
  );
}

function AdaptiveModules() {
  const [compact, setCompact] = useState(false);
  return (
    <section className={`mood mood-modules ${compact?"compact":""}`}>
      <header className="modules-header"><div><strong>Hunter</strong><span>我的工作区</span></div><label className="workspace-switch"><button className={!compact?"active":""} onClick={()=>setCompact(false)}>舒展</button><button className={compact?"active":""} onClick={()=>setCompact(true)}>紧凑</button></label><button><Command size={15}/>快捷命令</button></header>
      <aside className="modules-dock">{[[LayoutGrid,"工作区"],[BriefcaseBusiness,"岗位"],[UsersRound,"候选人"],[Building2,"公司"],[Bot,"Agent"]].map(([Icon,name],i)=><button className={i===0?"active":""} key={name}><Icon size={19}/><span>{name}</span></button>)}</aside>
      <div className="module-grid">
        <article className="module module-focus"><header><span className="module-grip">⠿</span><h2>今日重点</h2><MoreHorizontal size={16}/></header><div className="focus-number"><strong>12</strong><span>项需要判断</span></div><ul><li><i className="red"/>3 个 Agent 需要处理</li><li><i className="orange"/>4 位候选人等待确认</li><li><i className="blue"/>5 个岗位有新结果</li></ul><button>进入处理队列 <ArrowRight size={15}/></button></article>
        <article className="module module-pipeline"><header><span className="module-grip">⠿</span><h2>岗位推进</h2><MoreHorizontal size={16}/></header><div className="pipeline-bars">{[["储备",42],["推进中",27],["已入职",6],["失败",11]].map(([name,value],i)=><div key={name}><span>{name}</span><i><em style={{width:`${value*2}%`}}/></i><b>{value}</b></div>)}</div></article>
        <article className="module module-agent"><header><span className="module-grip">⠿</span><h2>Agent 运行</h2><Status tone="running">3 运行中</Status></header>{events.slice(0,3).map(([time,title,tone])=><div className="module-event" key={title}><i className={tone}/><span>{title}<small>{time}</small></span><ChevronRight size={14}/></div>)}</article>
        <article className="module module-candidates"><header><span className="module-grip">⠿</span><h2>新候选人</h2><button>查看全部</button></header>{candidates.slice(0,3).map((p,i)=><div className="module-person" key={p.name}><Avatar name={p.name} tone={i}/><span>{p.name}<small>{p.role}</small></span><b>{p.score}</b></div>)}</article>
        <article className="module module-calendar"><header><span className="module-grip">⠿</span><h2>安排</h2><CalendarDays size={16}/></header><div><time>14:00</time><span>算法负责人首轮沟通<small>林昊 · 视频会议</small></span></div><div><time>16:30</time><span>岗位需求校准<small>智能驾驶团队</small></span></div></article>
      </div>
      <button className="module-add"><span>+</span>添加模块</button>
    </section>
  );
}
