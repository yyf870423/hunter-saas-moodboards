import {
  Activity, Aperture, ArrowRight, BadgeCheck, Binary, Bot, BrainCircuit, BriefcaseBusiness,
  Check, ChevronRight, CircleGauge, CircleUserRound, Command, Crosshair, Database, FileCheck2,
  Fingerprint, Gauge, GitBranch, Layers3, Link2, ListFilter, LockKeyhole, MapPin, Network,
  Radio, ScanLine, Search, ShieldCheck, SlidersHorizontal, Sparkles, Target, TimerReset,
  UsersRound, Waypoints, Zap,
} from "lucide-react";
import { useState } from "react";
import { candidates, events, workflow } from "../data/boards";

const MiniPerson = ({ person, active, onClick }) => (
  <button className={active ? "active" : ""} onClick={onClick}>
    <span>{person.name.slice(0, 1)}</span><div><strong>{person.name}</strong><small>{person.role}</small></div><b>{person.score}</b>
  </button>
);

function NeuralPrecision() {
  const [channel, setChannel] = useState(0);
  return <section className="tech-main neural-console">
    <header><div className="instrument-mark"><Activity/><span>HUNTER / SIGNAL LAB</span></div><nav><button className="active">MATCH</button><button>SOURCE</button><button>CALIBRATE</button></nav><button className="console-command"><Command/>运行匹配</button></header>
    <aside className="neural-rails">
      <span className="rail-code">POSITION / 24-071</span><h1>具身智能<br/>算法负责人</h1>
      <dl><div><dt>目标职级</dt><dd>总监 / 负责人</dd></div><div><dt>最低经验</dt><dd>8 YEAR</dd></div><div><dt>地点</dt><dd>北京 · 上海</dd></div></dl>
      <label><SlidersHorizontal/>校准通道</label>
      {["角色层级", "技术能力", "行业轨迹", "稳定性"].map((item, index)=><button key={item} className={channel===index?"active":""} onClick={()=>setChannel(index)}><i/>{item}<b>{[92,88,73,81][index]}</b></button>)}
    </aside>
    <main className="neural-scope">
      <div className="scope-head"><div><span>LIVE CANDIDATE SIGNAL</span><strong>通道 {String(channel+1).padStart(2,"0")} / 相位校准</strong></div><div><b>94.2</b><small>综合信号</small></div></div>
      <div className="scope-screen" aria-label="候选人匹配信号">
        <div className="scope-grid"/><svg viewBox="0 0 900 280" preserveAspectRatio="none"><path className="signal-a" d="M0 150 C40 145 48 30 88 145 S145 245 185 148 S250 45 300 150 S360 220 420 145 S500 72 555 150 S640 235 700 142 S790 35 900 150"/><path className="signal-b" d="M0 175 C55 170 70 92 120 170 S215 215 270 166 S360 115 420 172 S515 220 575 166 S680 120 740 170 S835 202 900 165"/></svg>
        <span className="scope-cursor"/><div className="scope-legend"><span><i/>岗位基准</span><span><i/>林昊信号</span></div>
      </div>
      <div className="neural-list">{candidates.map((person,index)=><MiniPerson key={person.name} person={person} active={index===0}/>)}</div>
    </main>
    <aside className="calibration-panel"><div className="calibration-title"><Crosshair/><span>证据校准器</span></div><div className="candidate-lock"><span>林</span><div><b>林昊</b><small>穹境机器人 · 算法负责人</small></div><Fingerprint/></div>{["具身智能量产经验","团队规模 34 人","VLA 论文 6 篇"].map((text,i)=><div className="evidence-gauge" key={text}><span>{text}</span><i><em style={{width:`${[96,84,78][i]}%`}}/></i><b>{["已验证","高可信","待核验"][i]}</b></div>)}<button className="lock-action"><Target/>锁定人才信号</button></aside>
  </section>;
}

function EvidenceOS() {
  const [evidence, setEvidence] = useState(0);
  const notes=["负责 30 人算法团队，完成两代机器人产品量产。","主导 VLA 数据闭环和真机部署，覆盖 12 个任务。","近三年连续发表具身智能方向论文。"];
  return <section className="tech-main evidence-os">
    <header><div><Binary/><strong>EVIDENCE / OS</strong><span>候选人研究工作区</span></div><nav><button>原始资料</button><button className="active">证据编排</button><button>写入预览</button></nav><button><FileCheck2/>提交审核</button></header>
    <aside className="evidence-index"><span>CASE / 2026-081</span><h1>林昊</h1><p>具身智能算法负责人</p>{["身份与履历","项目证据","论文与专利","角色判断"].map((item,i)=><button className={i===evidence?"active":""} key={item} onClick={()=>setEvidence(i)}><b>0{i+1}</b><span>{item}</span><ChevronRight/></button>)}<footer><ShieldCheck/><span>来源完整度</span><b>87%</b></footer></aside>
    <article className="evidence-document"><div className="document-meta"><span>PUBLIC PROFILE / RESUME / PAPER</span><small>最后核验 14:32</small></div><h2>具身智能从研究原型走向量产，需要同时解决数据、模型与机器人系统协同。</h2><p>林昊自 2018 年进入机器人行业，早期负责视觉感知与定位，随后将工作范围扩展到端到端策略学习与多模态模型。</p><blockquote className={evidence===0?"active":""} onClick={()=>setEvidence(0)}><sup>01</sup>{notes[0]}<span>简历 · 工作经历</span></blockquote><p>他在现公司推动算法组织从单任务研发调整为平台化团队，建立了数据采集、训练评测和真机回归流程。</p><blockquote className={evidence===1?"active":""} onClick={()=>setEvidence(1)}><sup>02</sup>{notes[1]}<span>项目主页 · 2025</span></blockquote><blockquote className={evidence===2?"active":""} onClick={()=>setEvidence(2)}><sup>03</sup>{notes[2]}<span>OpenAlex · 作者记录</span></blockquote></article>
    <aside className="evidence-compose"><div className="compose-head"><Link2/><span>证据 {String(evidence+1).padStart(2,"0")}</span><b>可信</b></div><p>{notes[evidence]}</p><dl><div><dt>来源</dt><dd>{["候选人简历","个人项目主页","OpenAlex"][evidence]}</dd></div><div><dt>支持字段</dt><dd>{["管理经验","项目经历","学术成果"][evidence]}</dd></div><div><dt>可信度</dt><dd>{["0.96","0.88","0.91"][evidence]}</dd></div></dl><label>建议写入</label><div className="evidence-proposal"><span>岗位角色</span><strong>算法负责人 / 技术总监</strong><button><Check/>采纳</button></div><footer><button>查看原文</button><button className="primary-proof">加入结论</button></footer></aside>
  </section>;
}

function RelationshipRadar() {
  const [range,setRange]=useState(2);
  const nodes=[{n:"林昊",x:48,y:44,t:"candidate"},{n:"穹境",x:67,y:28,t:"company"},{n:"周雨澄",x:72,y:66,t:"candidate"},{n:"王蕾",x:26,y:30,t:"contact"},{n:"奇点智研",x:30,y:72,t:"company"},{n:"VLA",x:52,y:78,t:"topic"}];
  return <section className="tech-main relationship-radar"><header><div><Radio/><strong>HUNTER RADAR</strong></div><nav><button className="active">关系探测</button><button>触达路径</button><button>人物库</button></nav><button className="radar-launch"><ScanLine/>发射探测</button></header><aside><span>扫描参数</span><h1>具身智能<br/>关键人才</h1><label>关系深度 <b>{range} 跳</b></label><input type="range" min="1" max="4" value={range} onChange={e=>setRange(e.target.value)}/>{["同公司关系","论文合作者","已有联系人","共同项目"].map((item,i)=><button key={item} className={i<3?"on":""}><i>{i<3&&<Check/>}</i>{item}</button>)}<footer><b>42</b><span>有效关系节点</span></footer></aside><main><div className="radar-stage"><div className="radar-rings"/><div className="radar-sweep"/>{nodes.map((node,i)=><button key={node.n} className={`radar-node ${node.t} n${i}`} style={{left:`${node.x}%`,top:`${node.y}%`}}><i/>{node.n}</button>)}<div className="radar-center"><Target/><span>岗位</span></div></div><div className="radar-readout"><span>扫描半径 2 跳</span><span>高可信路径 7</span><span>可直接联系 3</span></div></main><aside className="radar-path"><div><Waypoints/><span>最短触达路径</span></div>{["你 · 已有联系人","王蕾 · 前同事","林昊 · 目标候选人"].map((item,i)=><article key={item}><i>{i+1}</i><div><strong>{item.split(" · ")[0]}</strong><span>{item.split(" · ")[1]}</span></div>{i<2&&<em/>}</article>)}<div className="path-confidence"><small>关系可信度</small><strong>89%</strong><i><em/></i></div><button><Link2/>查看关系证据</button></aside></section>;
}

function FocusChamber() {
  const [focus,setFocus]=useState("role");
  return <section className={`tech-main focus-chamber focus-${focus}`}><header><div><Aperture/><strong>FOCUS / 04</strong></div><span>当前决策：是否推进林昊</span><button><TimerReset/>稍后处理</button></header><nav>{[["role","角色"],["skill","能力"],["risk","风险"]].map(([id,label])=><button key={id} className={focus===id?"active":""} onClick={()=>setFocus(id)}><i/>{label}</button>)}</nav><main><div className="focus-orbit"><span className="orbit-a"/><span className="orbit-b"/><div className="focus-person"><span>LH</span><h1>林昊</h1><p>穹境机器人 · 算法负责人</p><b>94</b><small>岗位适配</small></div>{focus==="role"&&<aside className="focus-fact fact-a"><small>当前角色</small><strong>算法负责人</strong><span>与目标层级一致</span></aside>}{focus==="skill"&&<aside className="focus-fact fact-b"><small>核心能力</small><strong>VLA · 真机部署</strong><span>证据完整</span></aside>}{focus==="risk"&&<aside className="focus-fact fact-c"><small>需要确认</small><strong>到岗周期</strong><span>预计 8–12 周</span></aside>}</div><div className="focus-actions"><button>暂不推进</button><button className="focus-primary"><Check/>进入沟通</button></div></main><aside className="focus-queue"><span>NEXT / 03</span>{candidates.slice(1).map(person=><button key={person.name}><span>{person.name.slice(0,1)}</span><div><b>{person.name}</b><small>{person.company}</small></div><strong>{person.score}</strong></button>)}</aside></section>;
}

function MissionControl() {
  const [paused,setPaused]=useState(false);
  return <section className={`tech-main mission-control ${paused?"paused":""}`}><header><div><CircleGauge/><strong>HUNTER CONTROL</strong><span>全局任务总线</span></div><div className="mission-stats"><span><i/>运行 12</span><span><i/>等待 4</span><span><i/>异常 2</span></div><button onClick={()=>setPaused(!paused)}>{paused?"恢复任务":"暂停自动化"}</button></header><aside className="mission-channels"><span>任务频道</span>{["人才寻访","信息补全","岗位解析","学术搜索","公司调研"].map((item,i)=><button key={item} className={i===0?"active":""}><i>{[12,3,1,2,1][i]}</i><span>{item}</span><b>{["LIVE","READY","READY","RUN","WARN"][i]}</b></button>)}<footer><Database/><span>工作区</span><b>6.2 GB</b></footer></aside><main className="mission-bus"><div className="bus-heading"><div><span>EVENT BUS / LIVE</span><h1>人才寻访 · 具身智能算法负责人</h1></div><button><ListFilter/>过滤事件</button></div><div className="bus-track"><span className="bus-line"/>{events.map((event,i)=><article key={event[0]} className={event[2]}><time>{event[0]}</time><i/><div><strong>{event[1]}</strong><small>{["已写入候选池","正在读取公开证据","需要人工判断","岗位版本 #07","平台登录态失效"][i]}</small></div><b>{event[2].toUpperCase()}</b></article>)}</div></main><aside className="incident-dock"><div><Zap/><span>需要接管</span><b>02</b></div><article><span>PLATFORM</span><strong>脉脉登录已失效</strong><p>结果和 checkpoint 已保留。</p><button>打开平台处理</button></article><article><span>GATE</span><strong>2 条证据冲突</strong><p>公司任职时间存在差异。</p><button>进入审核</button></article><footer><ShieldCheck/>全部写入仍受门禁保护</footer></aside></section>;
}

function HumanSignal() {
  const [person,setPerson]=useState(0);
  return <section className="tech-main human-signal"><header><div><Fingerprint/><strong>HUMAN SIGNAL LAB</strong></div><nav><button className="active">人物</button><button>关系</button><button>联系节律</button></nav><button><Search/>查找人物</button></header><aside className="human-list"><span>RELATIONSHIP SAMPLE</span>{candidates.map((item,i)=><MiniPerson key={item.name} person={item} active={person===i} onClick={()=>setPerson(i)}/>)}</aside><main><div className="bio-profile"><div className="bio-avatar"><span>{candidates[person].name.slice(0,1)}</span><i/><em/></div><div><small>IDENTITY VERIFIED / 0.92</small><h1>{candidates[person].name}</h1><p>{candidates[person].company} · {candidates[person].role}</p></div><button><CircleUserRound/>打开档案</button></div><div className="pulse-board"><div className="pulse-label"><span>CONTACT RHYTHM</span><b>最佳联系窗口 18:30–20:00</b></div><svg viewBox="0 0 900 180" preserveAspectRatio="none"><path d="M0 100 L90 100 L110 74 L126 125 L145 24 L164 135 L184 100 L300 100 L330 82 L348 115 L370 48 L390 122 L414 100 L530 100 L555 70 L575 130 L600 30 L624 132 L645 100 L900 100"/></svg><div className="pulse-days">{["MON","TUE","WED","THU","FRI","SAT"].map((d,i)=><span key={d} className={i===4?"active":""}>{d}</span>)}</div></div><div className="trust-cells"><article><span>信任信号</span><strong>稳定</strong><div className="trust-rings"><i/><i/></div></article><article><span>共同关系</span><strong>3 人</strong><div className="face-stack"><i>王</i><i>陈</i><i>周</i></div></article><article><span>最近互动</span><strong>12 天前</strong><small>浏览岗位资料</small></article></div></main><aside className="human-contact"><span>NEXT CONTACT</span><h2>建议通过共同联系人王蕾建立首次沟通。</h2><div className="contact-path"><i>你</i><em/><i>王</i><em/><i>{candidates[person].name.slice(0,1)}</i></div><label>沟通主题</label><p>具身智能算法负责人 · 团队搭建与产品量产</p><button><Radio/>记录一次联系</button></aside></section>;
}

function LogicCircuit() {
  const [running,setRunning]=useState(false);
  const gates=["目标职级","8 年经验","机器人行业","VLA 经验","管理跨度"];
  return <section className={`tech-main logic-circuit ${running?"circuit-running":""}`}><header><div><GitBranch/><strong>RECRUITMENT LOGIC / 07</strong></div><span>岗位规则电路 · 版本 12</span><button onClick={()=>setRunning(!running)}><Zap/>{running?"停止信号":"运行电路"}</button></header><aside><span>INPUT TERMINALS</span><h1>具身智能<br/>算法负责人</h1>{gates.map((gate,i)=><button key={gate}><i>{i+1}</i><span>{gate}</span><b>{i<2?"AND":"WEIGHT"}</b></button>)}</aside><main className="circuit-board"><svg viewBox="0 0 900 520" preserveAspectRatio="none"><path d="M20 70 H220 V120 H350"/><path d="M20 155 H260 V165 H350"/><path d="M20 250 H180 V280 H350"/><path d="M20 350 H245 V325 H350"/><path d="M20 440 H300 V370 H350"/><path d="M470 142 H590 V220 H690"/><path d="M470 345 H590 V290 H690"/><path d="M810 255 H880"/></svg><div className="gate gate-and"><Binary/><b>HARD</b><span>硬门禁</span></div><div className="gate gate-score"><Gauge/><b>SCORE</b><span>软评分</span></div><div className="gate gate-output"><ShieldCheck/><b>PASS</b><span>结果池</span></div>{gates.map((gate,i)=><span className={`pulse p${i+1}`} key={gate}/>)}</main><aside className="circuit-output"><span>OUTPUT / 04</span>{candidates.map((item,i)=><article key={item.name} className={i===3?"blocked":""}><i>{i===3?<LockKeyhole/>:<Check/>}</i><div><b>{item.name}</b><small>{i===3?"角色层级不足":"通过全部硬门禁"}</small></div><strong>{i===3?"BLOCK":item.score}</strong></article>)}<footer><span>硬门禁拒绝</span><b>1</b><span>进入评分</span><b>3</b></footer></aside></section>;
}

function TalentSpectrometer() {
  const [sample,setSample]=useState(0);
  const spectrums=[[82,94,76,88,71],[74,89,96,63,84],[91,72,68,90,78]];
  return <section className="tech-main talent-spectrum"><header><div><Aperture/><strong>TALENT SPECTROMETER</strong><span>能力样本分析</span></div><button><SlidersHorizontal/>调节权重</button></header><aside className="spectrum-benchmark"><span>REFERENCE SAMPLE</span><h1>岗位基准谱</h1>{["模型能力","机器人系统","数据闭环","团队管理","行业网络"].map((item,i)=><div key={item}><label>{item}<b>{[90,85,78,82,70][i]}</b></label><i><em style={{width:`${[90,85,78,82,70][i]}%`}}/></i></div>)}<footer><BriefcaseBusiness/><span>具身智能算法负责人</span></footer></aside><main><div className="spectrum-stage"><div className="prism"><span/><span/><span/></div><div className="spectrum-beam input-beam"/><div className="spectrum-bars">{spectrums[sample].map((value,i)=><i key={i} style={{"--v":`${value}%`}}><em/><b>{value}</b></i>)}</div><div className="spectrum-axis">{["MODEL","ROBOT","DATA","LEAD","NETWORK"].map(x=><span key={x}>{x}</span>)}</div></div><div className="sample-selector">{candidates.slice(0,3).map((item,i)=><button key={item.name} onClick={()=>setSample(i)} className={sample===i?"active":""}><span>{item.name.slice(0,1)}</span><div><b>{item.name}</b><small>{item.company}</small></div><strong>{item.score}</strong></button>)}</div></main><aside className="spectrum-inspector"><span>SAMPLE 0{sample+1}</span><h2>{candidates[sample].name}</h2><p>{candidates[sample].role}</p><div className="spectrum-score"><CircleGauge/><b>{candidates[sample].score}</b><span>光谱重合度</span></div><dl><div><dt>最强波段</dt><dd>{["机器人系统","数据闭环","模型能力"][sample]}</dd></div><div><dt>证据完整</dt><dd>{["92%","86%","90%"][sample]}</dd></div><div><dt>角色适配</dt><dd>通过</dd></div></dl><button>打开样本证据</button></aside></section>;
}

function SearchBlueprint() {
  const [layer,setLayer]=useState(0);
  return <section className="tech-main search-blueprint"><header><div><Layers3/><strong>SEARCH BLUEPRINT / R08</strong></div><span>X 128.04 / Y 076.20</span><button><Zap/>执行图纸</button></header><aside className="blueprint-layers"><span>LAYERS</span>{["关键词网络","目标公司","期望城市","详情规则","停止条件"].map((item,i)=><button key={item} className={layer===i?"active":""} onClick={()=>setLayer(i)}><i>{i===layer&&<Check/>}</i><span>{item}</span><b>0{i+1}</b></button>)}<footer><small>REVISION</small><strong>R08</strong><span>已保存 14:08</span></footer></aside><main className="blueprint-canvas"><div className="blue-grid"/><div className="blue-ruler ruler-x">{[0,20,40,60,80,100].map(x=><span key={x}>{x}</span>)}</div><div className="blue-ruler ruler-y">{[0,20,40,60,80].map(x=><span key={x}>{x}</span>)}</div><div className="blue-node node-a"><span>KEYWORD / A</span><strong>具身智能 + VLA</strong><i/></div><div className="blue-node node-b"><span>COMPANY / 06</span><strong>智元 · 银河通用 · 星尘</strong><i/></div><div className="blue-node node-c"><span>CITY / 02</span><strong>北京 · 上海</strong><i/></div><div className="blue-node node-d"><span>DETAIL GATE</span><strong>经验 ≥ 8 YEAR</strong><i/></div><svg viewBox="0 0 900 520" preserveAspectRatio="none"><path d="M190 135 H380 V110 H550"/><path d="M190 135 V340 H390"/><path d="M700 130 V330 H560"/><path d="M500 390 H760"/></svg><span className="dimension dim-a">420 px / QUERY FLOW</span><span className="dimension dim-b">4 ACTIVE LAYERS</span></main><aside className="blueprint-notes"><span>ANNOTATION / {String(layer+1).padStart(2,"0")}</span><h2>{["关键词网络","目标公司","期望城市","详情规则","停止条件"][layer]}</h2><p>每组条件作为独立搜索单元，组内关键词需同时满足；多组之间并行执行。</p><label>参数标注</label><div><small>关系</small><b>满足所有关键词</b></div><div><small>优先级</small><b>P0 / REQUIRED</b></div><button>编辑本图层</button></aside></section>;
}

function CopilotDeck() {
  const [mode,setMode]=useState("match");
  return <section className="tech-main copilot-deck"><header><div><BrainCircuit/><strong>HUNTER COPILOT</strong></div><div className="deck-switch">{[["match","匹配"],["source","寻访"],["research","研究"]].map(([id,label])=><button key={id} className={mode===id?"active":""} onClick={()=>setMode(id)}>{label}</button>)}</div><button className="deck-command"><Command/>命令中心</button></header><aside className="deck-dock">{[[BriefcaseBusiness,"岗位"],[UsersRound,"人才"],[Network,"Mapping"],[Bot,"Agent"],[Database,"资产"]].map(([Icon,label],i)=><button key={label} className={i===1?"active":""}><Icon/><span>{label}</span></button>)}</aside><main className="deck-workspace"><div className="deck-module module-primary"><header><div><span>PRIMARY MODULE</span><h1>{mode==="match"?"人岗匹配工作台":mode==="source"?"自动寻访控制台":"岗位情报研究"}</h1></div><b>LIVE</b></header><div className="deck-candidates">{candidates.slice(0,3).map((item,i)=><article key={item.name}><span>{item.name.slice(0,1)}</span><div><strong>{item.name}</strong><small>{item.role}</small></div><i><em style={{width:`${item.score}%`}}/></i><b>{item.score}</b></article>)}</div></div><div className="deck-module module-context"><header><span>CONTEXT</span><Gauge/></header><strong>岗位角色适配</strong><p>目标为算法负责人，重点判断团队搭建与量产交付。</p><div><span>层级</span><b>一致</b></div><div><span>方向</span><b>高度相关</b></div></div><div className="deck-module module-queue"><header><span>TASK STACK</span><b>04</b></header>{workflow.slice(0,4).map((item,i)=><button key={item}><i>{i<2?<Check/>:i+1}</i><span>{item}</span><ChevronRight/></button>)}</div><div className="deck-module module-agent"><div><Sparkles/><span>副驾建议</span></div><p>林昊满足角色与技术门槛，建议优先核验到岗周期。</p><button>采纳并进入沟通</button></div></main></section>;
}

export const techLayoutsA = {
  "precision-desk": NeuralPrecision,
  "editorial-intelligence": EvidenceOS,
  "talent-constellation": RelationshipRadar,
  "calm-focus": FocusChamber,
  "command-center": MissionControl,
  "human-studio": HumanSignal,
  "bauhaus-workflow": LogicCircuit,
  "data-atelier": TalentSpectrometer,
  "kinetic-blueprint": SearchBlueprint,
  "adaptive-modules": CopilotDeck,
};
