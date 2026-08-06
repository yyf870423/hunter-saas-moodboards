import {
  AlertTriangle, ArrowDown, ArrowRight, ArrowUp, Bot, BriefcaseBusiness, Building2,
  CalendarDays, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight,
  CircleAlert, Clock3, Download, ExternalLink, FileSearch, FileText, Filter, Info,
  LayoutDashboard, Link2, ListFilter, LoaderCircle, LockKeyhole, Mail, Map, Menu,
  Maximize2, MessageSquareText, MoreHorizontal, Network, Paperclip, Pause, Plus, RefreshCw,
  Search, SlidersHorizontal, Sparkles, Trash2, Upload, UserRound, UsersRound, X,
  ZoomIn, ZoomOut,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { candidates, jobs } from "../data/boards";

const familyClass = {
  "专业效率型": "efficiency", "高端顾问型": "consultant", "人物关系型": "people",
  "现代品牌型": "brand", "智能协作型": "intelligence",
};

function SectionTitle({ index, title, note }) {
  return <header className="cs-section-title"><span>{index}</span><div><h2>{title}</h2><p>{note}</p></div></header>;
}

function IconButton({ children, label }) {
  return <button className="cs-icon-button" title={label}>{children}</button>;
}

function AppNavigation() {
  return <div className="cs-app-nav"><div className="cs-wordmark"><span>H</span><b>Hunter</b></div><nav>{[[LayoutDashboard,"工作台"],[UserRound,"候选人"],[BriefcaseBusiness,"岗位"],[Building2,"公司"],[Bot,"Agent"],[Map,"人才地图"]].map(([Icon,label],index)=><button className={index===0?"active":""} key={label}><Icon/><span>{label}</span>{label==="Agent"&&<em>3</em>}</button>)}</nav><div className="cs-profile"><span>于</span><div><b>于一凡</b><small>个人工作空间</small></div></div></div>;
}

function ActionSpecimens({ loading, onLoading, onToast }) {
  return <div className="cs-actions"><div className="cs-action-row"><button className="cs-btn primary" onClick={onLoading}>{loading?<><LoaderCircle className="spin"/>处理中</>:<><Plus/>主要操作</>}</button><button className="cs-btn secondary"><Filter/>次要操作</button><button className="cs-btn quiet"><Download/>下载</button><button className="cs-btn danger"><Trash2/>删除</button><button className="cs-btn" disabled><LockKeyhole/>不可用</button></div><div className="cs-icon-actions"><IconButton label="搜索"><Search/></IconButton><IconButton label="筛选"><SlidersHorizontal/></IconButton><IconButton label="刷新"><RefreshCw/></IconButton><IconButton label="更多"><MoreHorizontal/></IconButton><button className="cs-split" onClick={onToast}><span>开始寻访</span><i><ChevronDown/></i></button></div></div>;
}

function FormSpecimens({ dropdown, setDropdown, dateOpen, setDateOpen, tags, setTags, upload, setUpload }) {
  const [tagInput,setTagInput]=useState("");
  const addTag=()=>{const value=tagInput.trim();if(value&&!tags.includes(value)){setTags([...tags,value]);setTagInput("")}};
  return <div className="cs-form-grid">
    <label className="cs-field"><span>搜索</span><div className="cs-input with-icon"><Search/><input defaultValue="具身智能 算法负责人"/><kbd>⌘ K</kbd></div><small>空格、中文或英文逗号均可分隔搜索条件</small></label>
    <label className="cs-field"><span>公司名称</span><div className="cs-input"><Building2/><input defaultValue="穹境机器人"/><CheckCircle2 className="valid"/></div></label>
    <label className="cs-field error"><span>联系邮箱</span><div className="cs-input"><Mail/><input defaultValue="linhao@"/><CircleAlert/></div><small>请输入完整邮箱地址</small></label>
    <div className="cs-field"><span>单选下拉</span><button className="cs-select" onClick={()=>setDropdown(dropdown==="single"?null:"single")}><span>推进中</span><ChevronDown/></button>{dropdown==="single"&&<div className="cs-dropdown single">{["全部状态","人才储备","推进中","已入职","失败"].map((item,index)=><button className={index===2?"selected":""} key={item}>{index===2&&<Check/>}{item}</button>)}</div>}</div>
    <div className="cs-field"><span>可搜索多选</span><button className="cs-select" onClick={()=>setDropdown(dropdown==="multi"?null:"multi")}><span><em>北京</em><em>上海</em></span><ChevronDown/></button>{dropdown==="multi"&&<div className="cs-dropdown multi"><label><Search/><input placeholder="搜索或回车添加"/></label>{["北京","上海","深圳","杭州"].map((item,index)=><button className={index<2?"selected":""} key={item}><i>{index<2&&<Check/>}</i>{item}</button>)}<footer>已选 2 项 <button>清空</button></footer></div>}</div>
    <div className="cs-field"><span>时间范围</span><button className="cs-select" onClick={()=>setDateOpen(!dateOpen)}><CalendarDays/><span>2026-07-01 — 2026-08-06</span><ChevronDown/></button>{dateOpen&&<div className="cs-calendar"><header><button><ChevronLeft/></button><b>2026 年 8 月</b><button><ChevronRight/></button></header><div className="week">{["一","二","三","四","五","六","日"].map(x=><span key={x}>{x}</span>)}</div><div className="days">{Array.from({length:35},(_,i)=>i-1).map((day,i)=><button className={day===6?"selected":day>0&&day<7?"range":""} disabled={day<1||day>31} key={i}>{day<1?31+day:day>31?day-31:day}</button>)}</div><footer><button>清除</button><button className="apply" onClick={()=>setDateOpen(false)}>应用</button></footer></div>}</div>
    <label className="cs-field wide"><span>岗位说明</span><textarea defaultValue="负责具身智能算法方向，推动 VLA 模型从研究原型进入真机部署。"/><small>支持多行内容，输入区域可调整高度</small></label>
    <div className="cs-field wide"><span>标签编辑</span><div className="cs-tag-editor">{tags.map(tag=><em key={tag}>{tag}<button onClick={()=>setTags(tags.filter(x=>x!==tag))}><X/></button></em>)}<input value={tagInput} onChange={e=>setTagInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addTag()}}} placeholder="输入后按回车"/><button onClick={addTag}><Plus/></button></div></div>
    <div className="cs-field wide"><span>文件上传</span><button className={`cs-upload ${upload?"uploading":""}`} onClick={()=>setUpload(!upload)}>{upload?<><LoaderCircle/><div><b>正在解析 林昊简历.pdf</b><i><em/></i><small>已完成 68%</small></div><X/></>:<><Upload/><div><b>上传简历或拖入文件</b><small>支持 PDF、DOCX，最大 20 MB</small></div><span>选择文件</span></>}</button></div>
  </div>;
}

function ChoiceSpecimens({ progress, setProgress }) {
  const [checks,setChecks]=useState([true,false,true]);
  const [radio,setRadio]=useState(1);const [toggle,setToggle]=useState(true);
  return <div className="cs-choice-grid"><div><span className="cs-label">复选框</span>{["仅看已确认","包括人才储备","隐藏已入库"].map((item,index)=><button className="cs-check-row" onClick={()=>setChecks(checks.map((x,i)=>i===index?!x:x))} key={item}><i className={checks[index]?"checked":""}>{checks[index]&&<Check/>}</i><span>{item}</span></button>)}</div><div><span className="cs-label">单选</span>{["按匹配度排序","按更新时间排序","按流程阶段排序"].map((item,index)=><button className="cs-radio-row" onClick={()=>setRadio(index)} key={item}><i className={radio===index?"checked":""}/><span>{item}</span></button>)}</div><div><span className="cs-label">开关与滑杆</span><button className="cs-toggle-row" onClick={()=>setToggle(!toggle)}><span>自动确认低风险结果<small>系统门禁仍然生效</small></span><i className={toggle?"on":""}><em/></i></button><label className="cs-slider"><span>最低匹配分<b>{progress}</b></span><input type="range" min="0" max="100" value={progress} onChange={e=>setProgress(e.target.value)}/><i style={{"--value":`${progress}%`}}/></label></div></div>;
}

function DataSpecimens({ activeTab, setActiveTab, selectedRows, setSelectedRows, sort, setSort }) {
  const toggleRow=name=>setSelectedRows(selectedRows.includes(name)?selectedRows.filter(x=>x!==name):[...selectedRows,name]);
  const rows=useMemo(()=>[...candidates].sort((a,b)=>sort==="down"?b.score-a.score:a.score-b.score),[sort]);
  return <div className="cs-data-zone"><div className="cs-metric-row">{[["待确认","18","+6"],["流程中","32","+4"],["本周推荐","11","+18%"],["进行中岗位","7","2 紧急"]].map(([label,value,note],index)=><article key={label}><small>{label}</small><b>{value}</b><em className={index===3?"warn":""}>{note}</em><i><span style={{height:`${[42,68,54,78][index]}%`}}/><span style={{height:`${[64,48,82,52][index]}%`}}/><span style={{height:`${[74,72,64,88][index]}%`}}/></i></article>)}</div><div className="cs-tabs">{["全部","待确认","推进中","已入库"].map((tab,index)=><button className={activeTab===index?"active":""} onClick={()=>setActiveTab(index)} key={tab}>{tab}<em>{[64,18,32,14][index]}</em></button>)}</div><div className="cs-filterbar"><label><Search/><input placeholder="搜索候选人"/></label><button><Building2/>公司<ChevronDown/></button><button><BriefcaseBusiness/>岗位<ChevronDown/></button><button><ListFilter/>更多筛选<em>2</em></button><span/>{selectedRows.length>0&&<strong>已选 {selectedRows.length} 人 <button>批量加入流程</button></strong>}</div><div className="cs-table-wrap"><table><thead><tr><th><i className={selectedRows.length===rows.length?"checked":""}/></th><th>候选人</th><th>当前公司</th><th><button onClick={()=>setSort(sort==="down"?"up":"down")}>匹配度 {sort==="down"?<ArrowDown/>:<ArrowUp/>}</button></th><th>流程</th><th>更新时间</th><th/></tr></thead><tbody>{rows.map(candidate=><tr className={selectedRows.includes(candidate.name)?"selected":""} key={candidate.name}><td><button className="table-check" onClick={()=>toggleRow(candidate.name)}><i className={selectedRows.includes(candidate.name)?"checked":""}>{selectedRows.includes(candidate.name)&&<Check/>}</i></button></td><td><span className="table-person"><i>{candidate.initials}</i><b>{candidate.name}<small>{candidate.role}</small></b></span></td><td>{candidate.company}</td><td><span className="table-score"><i><em style={{width:`${candidate.score}%`}}/></i><b>{candidate.score}</b></span></td><td><em className="cs-status info">{candidate.stage}</em></td><td>今天 {candidate.score%4+9}:32</td><td><button><MoreHorizontal/></button></td></tr>)}</tbody></table></div><footer className="cs-pagination"><span>共 64 条</span><button disabled><ChevronLeft/></button>{[1,2,3,4].map(n=><button className={n===1?"active":""} key={n}>{n}</button>)}<button><ChevronRight/></button></footer></div>;
}

function EntitySpecimens({ cardMode, setCardMode }) {
  return <div className="cs-entity-zone"><div className="cs-segmented"><button className={cardMode===0?"active":""} onClick={()=>setCardMode(0)}>业务资产</button><button className={cardMode===1?"active":""} onClick={()=>setCardMode(1)}>学术资产</button><button className={cardMode===2?"active":""} onClick={()=>setCardMode(2)}>自动化</button></div><div className={`cs-entity-grid mode-${cardMode}`}>
    {cardMode===0&&<><article className="entity candidate"><header><span className="entity-avatar">林</span><div><small>候选人</small><h3>林昊</h3><p>具身智能算法负责人 · 穹境机器人</p></div><em>94</em></header><div className="entity-tags"><span>VLA</span><span>真机部署</span><span>团队管理</span></div><dl><div><dt>当前流程</dt><dd>技术复试</dd></div><div><dt>最近联系</dt><dd>今天 10:42</dd></div></dl><footer><button>查看详情</button><button className="primary">加入流程</button></footer></article><article className="entity position"><header><BriefcaseBusiness/><div><small>岗位</small><h3>具身智能算法负责人</h3><p>穹境机器人 · 北京</p></div></header><div className="entity-progress"><span>人才进展 <b>18</b></span><i><em style={{width:"72%"}}/></i><small>储备 6 · 推进 9 · 已入职 1 · 失败 2</small></div><footer><button>岗位详情</button><button className="primary">开始寻访</button></footer></article><article className="entity company"><header><Building2/><div><small>公司</small><h3>穹境机器人</h3><p>具身智能 · B 轮 · 北京</p></div></header><blockquote>核心团队来自机器人与自动驾驶领域，目前处于研发团队扩张期。</blockquote><dl><div><dt>进行中岗位</dt><dd>3</dd></div><div><dt>关联候选人</dt><dd>42</dd></div></dl><footer><button>打开公司</button><button><Network/>人才地图</button></footer></article></>}
    {cardMode===1&&<><article className="entity paper"><header><FileText/><div><small>论文 · 强烈建议</small><h3>Vision-Language-Action Models for Generalist Robot Control</h3><p>CoRL 2025 · 12 位作者</p></div></header><p className="abstract">研究提出可扩展的视觉—语言—动作训练框架，并在多类真实机器人任务上进行验证。</p><div className="entity-tags"><span>VLA</span><span>机器人学习</span><span>真实部署</span></div><footer><button><ExternalLink/>查看论文</button><button className="primary">导入系统</button></footer></article><article className="entity patent"><header><FileSearch/><div><small>专利</small><h3>一种机器人长序列操作的控制方法</h3><p>CN 118765432 A · 2025-08-12</p></div></header><dl><div><dt>申请人</dt><dd>穹境机器人</dd></div><div><dt>发明人</dt><dd>林昊等 5 人</dd></div></dl><footer><button>专利详情</button><button><Link2/>关联候选人</button></footer></article></>}
    {cardMode===2&&<><article className="entity agent"><header><span className="agent-mark"><Sparkles/></span><div><small>Agent · 运行中</small><h3>公司调研 · 穹境机器人</h3><p>已运行 08:42</p></div><em className="pulse-dot"/></header><div className="agent-steps">{["理解任务","公开搜索","证据核验","生成草稿"].map((step,index)=><span className={index<2?"done":index===2?"current":""} key={step}><i>{index<2?<Check/>:index+1}</i><b>{step}</b></span>)}</div><footer><button><Pause/>暂停</button><button className="primary">查看运行</button></footer></article><article className="entity sourcing"><header><UsersRound/><div><small>人才寻访</small><h3>具身智能算法负责人</h3><p>猎聘 + 脉脉 · 并行运行</p></div></header><div className="source-lines"><span><i className="liepin">猎</i><b>猎聘</b><em>已查看 18 / 40</em></span><span><i className="maimai">脉</i><b>脉脉</b><em>已查看 11 / 30</em></span></div><footer><button>停止</button><button className="primary">查看结果</button></footer></article><article className="entity mapping"><header><Map/><div><small>人才地图</small><h3>具身智能核心团队</h3><p>5 层 · 86 个节点 · 42 位候选人</p></div></header><div className="mini-tree"><i/><span/><span/><span/><span/></div><footer><button>打开地图</button><button><Download/>导出当前 Tab</button></footer></article></>}
  </div></div>;
}

const mapBranches = [
  { id: "algorithm", title: "算法与模型", count: 18, people: ["林昊", "赵雨澄"], children: ["VLA 模型", "强化学习"] },
  { id: "hardware", title: "硬件与结构", count: 12, people: ["周骁"], children: ["灵巧手", "关节模组"] },
  { id: "product", title: "产品与交付", count: 9, people: ["韩知远", "陈嘉"], children: ["产品定义", "客户交付"] },
];

function MindMapSpecimen({ board }) {
  const [zoom, setZoom] = useState(100);
  const [selected, setSelected] = useState("algorithm");
  const [collapsed, setCollapsed] = useState([]);
  const [order, setOrder] = useState(mapBranches.map((branch) => branch.id));
  const [dragging, setDragging] = useState(null);
  const [notice, setNotice] = useState(null);
  const branches = order.map((id) => mapBranches.find((branch) => branch.id === id));
  const toggleBranch = (id) => setCollapsed((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  const dropBranch = (target) => {
    if (!dragging || dragging === target) return setDragging(null);
    const next = [...order];
    const from = next.indexOf(dragging);
    const to = next.indexOf(target);
    next.splice(from, 1);
    next.splice(to, 0, dragging);
    setOrder(next);
    setDragging(null);
    setNotice("节点位置已调整");
  };
  const active = mapBranches.find((branch) => branch.id === selected);
  return <div className="cs-map-shell">
    <header className="cs-map-toolbar">
      <div><button className="active"><Network/>组织结构</button><button><UsersRound/>关键人才</button></div>
      <span/>
      <button title="缩小" onClick={() => setZoom(Math.max(70, zoom - 10))}><ZoomOut/></button><em>{zoom}%</em><button title="放大" onClick={() => setZoom(Math.min(130, zoom + 10))}><ZoomIn/></button><button title="适应画布" onClick={() => setZoom(100)}><Maximize2/></button>
    </header>
    <div className="cs-map-workspace">
      <div className="cs-map-viewport">
        <div className="cs-map-canvas" style={{ "--map-zoom": zoom / 100 }}>
          <button className="map-node root selected"><span>具身智能核心团队</span><small>86 个节点 · 42 位候选人</small><i>根节点</i></button>
          <div className="map-trunk"/>
          <div className="map-branches">
            {branches.map((branch, branchIndex) => <div className={`map-branch ${collapsed.includes(branch.id) ? "collapsed" : ""} ${dragging === branch.id ? "dragging" : ""}`} draggable onDragStart={() => setDragging(branch.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => dropBranch(branch.id)} key={branch.id}>
              <button className={`map-node branch ${selected === branch.id ? "selected" : ""}`} onClick={() => setSelected(branch.id)}>
                <span>{branch.title}</span><small>{branch.count} 位候选人</small><i>{String(branchIndex + 1).padStart(2, "0")}</i>
                <b onClick={(event) => { event.stopPropagation(); toggleBranch(branch.id); }}>{collapsed.includes(branch.id) ? "+" : "−"}</b>
              </button>
              {!collapsed.includes(branch.id) && <div className="map-children">{branch.children.map((child, index) => <button className={`map-node child ${selected === `${branch.id}-${index}` ? "selected" : ""}`} onClick={() => setSelected(`${branch.id}-${index}`)} key={child}><span>{child}</span><small>{index + 3} 位</small><i/></button>)}</div>}
            </div>)}
          </div>
        </div>
      </div>
      <aside className="cs-map-inspector">
        <header><div><small>当前节点</small><h3>{active?.title || "VLA 模型"}</h3></div><button><MoreHorizontal/></button></header>
        <dl><div><dt>节点层级</dt><dd>第 2 层</dd></div><div><dt>关联人才</dt><dd>{active?.count || 7} 位</dd></div></dl>
        <section><span>已绑定候选人</span><div className="map-people">{(active?.people || ["林昊"]).map((person) => <button key={person}><i>{person[0]}</i><b>{person}</b><X/></button>)}</div><button className="map-bind" onClick={() => setNotice("已打开候选人选择器")}><Plus/>绑定候选人</button></section>
        <section><span>节点备注</span><textarea defaultValue="重点关注具备真机部署与跨团队交付经历的负责人。"/></section>
        <footer><button onClick={() => setNotice("节点存在子节点，删除前需要先处理下级结构")}><Trash2/>删除节点</button><button className="primary" onClick={() => setNotice("节点修改已保存")}><Check/>保存修改</button></footer>
      </aside>
    </div>
    <footer className="cs-map-legend"><span><i className="root"/>根节点</span><span><i className="linked"/>已关联人才</span><span><i className="empty"/>待补充</span><em>拖动一级节点可调整顺序；节点名称变化不会改变布局位置。</em></footer>
    {notice && <div className="cs-map-notice"><Info/><span>{notice}</span><button onClick={() => setNotice(null)}><X/></button></div>}
  </div>;
}

function StateSpecimens({ onModal, onDrawer, onToast }) {
  return <div className="cs-state-grid"><article className="state-card success"><CheckCircle2/><div><b>操作成功</b><p>候选人已加入岗位流程。</p></div><button onClick={onToast}>查看</button></article><article className="state-card warning"><AlertTriangle/><div><b>需要处理</b><p>人才平台登录状态已失效。</p></div><button>去处理</button></article><article className="state-card error"><CircleAlert/><div><b>导入失败</b><p>文件格式无法识别，请重新选择。</p></div><button><RefreshCw/>重试</button></article><article className="state-card info"><Info/><div><b>正在解析简历</b><p>已完成文本提取，正在识别经历。</p><i><em/></i></div><span>68%</span></article><article className="state-card empty"><FileSearch/><div><b>没有匹配结果</b><p>调整搜索条件后重新尝试。</p></div><button>清空筛选</button></article><article className="state-card permission"><LockKeyhole/><div><b>没有操作权限</b><p>可以查看内容，但不能修改。</p></div><button disabled>申请权限</button></article><article className="state-card skeleton"><span/><div><i/><i/><i/></div></article><article className="state-actions"><button onClick={onModal}>打开 Modal</button><button onClick={onDrawer}>打开 Drawer</button><button onClick={onToast}>显示 Toast</button></article></div>;
}

function MotionSpecimens({ motion, setMotion, board }) {
  const labels={quiet:["更新行","展开详情","完成操作","刷新数据"],queue:["任务置顶","完成收拢","逾期提醒","批量推进"],modules:["重排模块","展开上下文","吸附面板","恢复布局"],ledger:["标记差异","折叠分组","批量选中","写入完成"],briefing:["揭示简报","定位批注","切换重点","更新摘要"],"client-room":["切换客户","提亮事项","确认预约","收起档案"],dossier:["展开档案","定位证据","比较差异","确认归档"],global:["切换时区","联动地区","平移日程","同步状态"],journal:["展开时间线","切换人物","记录联系","回到现在"],relationships:["显示路径","聚合节点","高亮联系人","隐藏弱关系"],mosaic:["重组片段","加入比较","对齐能力","提示缺口"],conversation:["接收消息","发送消息","创建日程","标记跟进"],swiss:["区块揭示","编号推进","网格切换","完成写入"],signals:["状态迁移","更新色带","筛选数据","完成收束"],paperless:["滑入材料","添加批注","并排比较","归档页面"],columns:["展开详情列","跨列移动","收窄列表","恢复列宽"],copilot:["生成建议","采纳合并","拒绝收起","解释来源"],automation:["推进步骤","停靠确认","失败回退","恢复执行"],evidence:["连接证据","高亮差异","通过门禁","拒绝写入"],handoff:["交接任务","迁移责任","处理冲突","完成归档"]};
  return <div className={`cs-motion-stage motion-${motion}`}><nav>{labels[board.variant].map((label,index)=><button className={motion===index+1?"active":""} onClick={()=>setMotion(index+1)} key={label}>{label}</button>)}</nav><div className="motion-canvas"><article className="motion-item primary"><span>01</span><div><b>林昊 · 推荐材料</b><small>具身智能算法负责人</small></div><em>待确认</em></article><article className="motion-item secondary"><span>02</span><div><b>候选人信息补全</b><small>Agent 已完成证据核验</small></div><em>已完成</em></article><i className="motion-path"/><div className="motion-feedback"><CheckCircle2/><b>状态已更新</b><small>所有业务数据已通过门禁</small></div></div></div>;
}

export function SystemComponentLab({ board }) {
  const [dropdown,setDropdown]=useState(null);const [dateOpen,setDateOpen]=useState(false);const [tags,setTags]=useState(["VLA","真机部署","团队管理"]);const [upload,setUpload]=useState(false);const [progress,setProgress]=useState(72);const [activeTab,setActiveTab]=useState(0);const [selectedRows,setSelectedRows]=useState([]);const [sort,setSort]=useState("down");const [cardMode,setCardMode]=useState(0);const [modal,setModal]=useState(false);const [drawer,setDrawer]=useState(false);const [toast,setToast]=useState(false);const [loading,setLoading]=useState(false);const [motion,setMotion]=useState(0);
  useEffect(()=>{if(!loading)return;const timer=setTimeout(()=>setLoading(false),900);return()=>clearTimeout(timer)},[loading]);
  useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(false),2600);return()=>clearTimeout(timer)},[toast]);
  return <section className={`component-system family-${familyClass[board.family]} variant-${board.variant} motion-state-${motion}`}>
    <header className="cs-hero"><div><span>{board.family} / {board.id}</span><h1>{board.name}</h1><p>{board.thesis}</p></div><dl><div><dt>设计理念</dt><dd>{board.premise}</dd></div><div><dt>参考范例</dt><dd>{board.references.join(" · ")}</dd></div><div><dt>组件覆盖</dt><dd>导航、表单、数据、业务资产、反馈、浮层与状态动效</dd></div></dl></header>
    <section className="cs-section section-navigation"><SectionTitle index="01" title="导航与操作" note="应用导航、按钮、图标操作和组合命令"/><div className="cs-two-column"><AppNavigation/><ActionSpecimens loading={loading} onLoading={()=>setLoading(true)} onToast={()=>setToast(true)}/></div></section>
    <section className="cs-section section-forms"><SectionTitle index="02" title="表单与选择" note="输入、下拉、日期、标签、上传及实时校验"/><FormSpecimens dropdown={dropdown} setDropdown={setDropdown} dateOpen={dateOpen} setDateOpen={setDateOpen} tags={tags} setTags={setTags} upload={upload} setUpload={setUpload}/><ChoiceSpecimens progress={progress} setProgress={setProgress}/></section>
    <section className="cs-section section-data"><SectionTitle index="03" title="数据与列表" note="指标、Tabs、筛选、表格、批量操作和分页"/><DataSpecimens activeTab={activeTab} setActiveTab={setActiveTab} selectedRows={selectedRows} setSelectedRows={setSelectedRows} sort={sort} setSort={setSort}/></section>
    <section className="cs-section section-entities"><SectionTitle index="04" title="Hunter 业务组件" note="候选人、岗位、公司、论文、专利、Agent、寻访和人才地图"/><EntitySpecimens cardMode={cardMode} setCardMode={setCardMode}/></section>
    <section className="cs-section section-mapping"><SectionTitle index="05" title="人才地图与思维导图" note="无限层级、节点关联、展开收起、拖动排序、缩放和冲突反馈"/><MindMapSpecimen board={board}/></section>
    <section className="cs-section section-states"><SectionTitle index="06" title="反馈与状态" note="成功、警告、错误、加载、空状态和权限受限"/><StateSpecimens onModal={()=>setModal(true)} onDrawer={()=>setDrawer(true)} onToast={()=>setToast(true)}/></section>
    <section className="cs-section section-motion"><SectionTitle index="07" title="组件动效" note="动效直接服务于业务状态变化，并支持减少动态效果"/><MotionSpecimens motion={motion} setMotion={setMotion} board={board}/></section>
    {modal&&<div className="cs-overlay"><div className="cs-modal" role="dialog" aria-modal="true"><header><div><small>确认操作</small><h2>将候选人加入岗位流程？</h2></div></header><p>林昊将进入“具身智能算法负责人”的技术复试阶段，现有候选人资料不会被修改。</p><footer><button onClick={()=>setModal(false)}>取消</button><button className="primary" onClick={()=>{setModal(false);setToast(true)}}>确认加入</button></footer></div></div>}
    {drawer&&<aside className="cs-drawer"><header><div><small>候选人详情</small><h2>林昊</h2></div><button onClick={()=>setDrawer(false)}><X/></button></header><div className="drawer-profile"><span>林</span><div><b>具身智能算法负责人</b><p>穹境机器人 · 北京 · 12 年经验</p></div></div><dl><div><dt>匹配度</dt><dd>94</dd></div><div><dt>当前流程</dt><dd>技术复试</dd></div><div><dt>最近联系</dt><dd>今天 10:42</dd></div></dl><section><h3>推荐摘要</h3><p>角色层级、VLA 经验和真机部署经历均与岗位高度匹配。</p></section><footer><button>查看完整详情</button><button className="primary">记录联系</button></footer></aside>}
    {toast&&<div className="cs-toast"><CheckCircle2/><div><b>操作已完成</b><small>候选人状态已经更新</small></div><button onClick={()=>setToast(false)}><X/></button></div>}
  </section>;
}
