import {
  AlertTriangle, Bell, BriefcaseBusiness, CalendarDays, Check, CheckCircle2, ChevronDown,
  ChevronLeft, ChevronRight, CircleHelp, CircleUserRound, Clock3, Copy, Download, ExternalLink,
  FileText, Filter, Info, Link2, LoaderCircle, LockKeyhole, Mail, MapPin, MoreHorizontal, Paperclip,
  Plus, Search, Settings2, Sparkles, Trash2, UploadCloud, UsersRound, X,
} from "lucide-react";
import { useState } from "react";
import { candidates } from "../data/boards";

const Section = ({ index, title, note, children, className = "" }) => <section className={`component-section ${className}`}><header><span>{index}</span><div><h2>{title}</h2>{note && <p>{note}</p>}</div></header><div className="component-section-body">{children}</div></section>;
const SampleLabel = ({ children }) => <span className="sample-label">{children}</span>;

export function ComponentLab({ board }) {
  const [activeTab, setActiveTab] = useState("全部");
  const [switchOn, setSwitchOn] = useState(true);
  const [checked, setChecked] = useState(["候选人"]);
  const [selectedTags, setSelectedTags] = useState(["具身智能", "VLA"]);
  const [menu, setMenu] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [toast, setToast] = useState(false);
  const [page, setPage] = useState(1);

  const toggleCheck = (name) => setChecked((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);
  const addTag = (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    const value = event.currentTarget.value.trim();
    if (value && !selectedTags.includes(value)) setSelectedTags([...selectedTags, value]);
    event.currentTarget.value = "";
  };

  return (
    <div className="component-lab">
      <header className="lab-intro"><div><span>DESIGN SYSTEM / {board.id}</span><h1>{board.name}组件系统</h1></div><p>覆盖 Hunter 在岗位、候选人、公司、论文、人才地图和 Agent 场景中的核心控件及异常状态。</p></header>

      <Section index="01" title="动作与状态" note="命令强度、图标动作和异步反馈">
        <div className="sample-group"><SampleLabel>按钮层级</SampleLabel><div className="sample-row"><button className="button primary"><Sparkles size={15}/>开始分析</button><button className="button secondary">保存草稿</button><button className="button ghost">取消</button><button className="button danger"><Trash2 size={15}/>删除</button><button className="button primary" disabled>不可用</button><button className="button primary"><LoaderCircle className="spin" size={15}/>处理中</button></div></div>
        <div className="sample-group"><SampleLabel>图标动作</SampleLabel><div className="sample-row icon-samples"><button title="搜索"><Search/></button><button title="筛选"><Filter/></button><button title="下载"><Download/></button><button title="复制"><Copy/></button><button title="设置"><Settings2/></button><button title="更多"><MoreHorizontal/></button></div></div>
        <div className="sample-group"><SampleLabel>业务状态</SampleLabel><div className="sample-row"><span className="status status-success">已完成</span><span className="status status-running">运行中</span><span className="status status-warning">待确认</span><span className="status status-danger">已中断</span><span className="status status-neutral">草稿</span><span className="source-chip"><Link2 size={12}/>脉脉</span><span className="risk-chip"><AlertTriangle size={12}/>职级风险</span></div></div>
      </Section>

      <Section index="02" title="输入与选择" note="支持键盘、错误态、禁用态和批量输入">
        <div className="form-grid">
          <label className="field"><span>岗位名称 <b>*</b></span><input defaultValue="具身智能算法负责人"/><small>用于岗位列表和外部沟通。</small></label>
          <label className="field"><span>公司</span><div className="input-with-icon"><Search/><input placeholder="输入公司名称"/></div></label>
          <label className="field error"><span>联系邮箱</span><div className="input-with-icon"><Mail/><input defaultValue="linhao@"/></div><small>请输入有效邮箱地址。</small></label>
          <label className="field"><span>期望城市</span><div className="select-control"><MapPin/><span>北京、上海</span><ChevronDown/></div></label>
          <label className="field"><span>日期范围</span><div className="date-range"><CalendarDays/><span>2026-07-01</span><i/> <span>2026-08-06</span></div></label>
          <label className="field"><span>打开详情上限</span><div className="number-input"><button>−</button><input value="80" readOnly/><button>+</button></div></label>
          <label className="field disabled"><span>受权限限制</span><div className="input-with-icon"><LockKeyhole/><input value="仅管理员可以修改" readOnly/></div></label>
          <label className="field"><span>数据源</span><div className="select-control"><span>百度 AI 搜索</span><ChevronDown/></div></label>
        </div>
        <div className="sample-group"><SampleLabel>可创建多选</SampleLabel><div className="tag-input">{selectedTags.map(tag=><span key={tag}>{tag}<button onClick={()=>setSelectedTags(selectedTags.filter(item=>item!==tag))}><X/></button></span>)}<input placeholder="输入后按回车添加" onKeyDown={addTag}/></div><small className="field-help">可输入多个，按回车或逗号确认。</small></div>
        <div className="choice-grid">
          <div><SampleLabel>复选</SampleLabel>{["候选人","岗位","论文"].map(name=><button className="check-control" key={name} onClick={()=>toggleCheck(name)}><i className={checked.includes(name)?"checked":""}>{checked.includes(name)&&<Check/>}</i>{name}</button>)}</div>
          <div><SampleLabel>单选</SampleLabel>{["人工确认","通过门禁后自动确认"].map((name,i)=><label className="radio-control" key={name}><input type="radio" name="approval" defaultChecked={i===0}/><i/>{name}</label>)}</div>
          <div><SampleLabel>开关</SampleLabel><button className={`switch-control ${switchOn?"on":""}`} onClick={()=>setSwitchOn(!switchOn)}><i/><span>{switchOn?"自动寻访已开启":"自动寻访已关闭"}</span></button></div>
          <div><SampleLabel>上传</SampleLabel><button className="upload-control"><UploadCloud/><span>拖入简历或选择文件<small>PDF、DOCX，最大 20 MB</small></span></button></div>
        </div>
      </Section>

      <Section index="03" title="导航与浮层" note="适配多页面、上下文操作与风险确认">
        <div className="navigation-showcase">
          <div><SampleLabel>Tabs</SampleLabel><nav className="tabs-control">{["全部","运行中","需要处理","已完成"].map(name=><button key={name} className={activeTab===name?"active":""} onClick={()=>setActiveTab(name)}>{name}{name==="需要处理"&&<b>3</b>}</button>)}</nav></div>
          <div><SampleLabel>面包屑</SampleLabel><nav className="breadcrumb"><a>岗位管理</a><ChevronRight/><a>感知算法负责人</a><ChevronRight/><span>匹配结果</span></nav></div>
          <div className="dropdown-demo"><SampleLabel>菜单</SampleLabel><button className="button secondary" onClick={()=>setMenu(!menu)}>更多操作 <ChevronDown size={14}/></button>{menu&&<div className="dropdown-menu"><button><Copy/>复制岗位</button><button><ExternalLink/>在新页打开</button><hr/><button className="danger-text"><Trash2/>删除岗位</button></div>}</div>
          <div><SampleLabel>分页</SampleLabel><nav className="pagination"><button><ChevronLeft/></button>{[1,2,3,4].map(n=><button key={n} className={page===n?"active":""} onClick={()=>setPage(n)}>{n}</button>)}<span>…</span><button>12</button><button><ChevronRight/></button></nav></div>
        </div>
        <div className="overlay-actions"><button className="button primary" onClick={()=>setModal(true)}>打开确认 Modal</button><button className="button secondary" onClick={()=>setDrawer(true)}>打开详情 Drawer</button><button className="button secondary" onClick={()=>{setToast(true);setTimeout(()=>setToast(false),2600)}}><Bell size={15}/>触发 Toast</button></div>
      </Section>

      <Section index="04" title="数据展示" note="表格、列表、实体条目、时间线与指标">
        <div className="metric-row"><article><span>开放岗位</span><strong>24</strong><small><i className="up"/>较上周 +3</small></article><article><span>推进中</span><strong>86</strong><small>18 位等待反馈</small></article><article><span>Agent 成功率</span><strong>91.4%</strong><small><i className="progress"><em style={{width:"91%"}}/></i></small></article><article><span>平均交付</span><strong>2.8d</strong><small>目标 3 天以内</small></article></div>
        <div className="entity-grid"><article className="entity-card candidate-entity"><header><span className="entity-avatar">林</span><div><h3>林昊</h3><p>具身智能算法负责人</p></div><MoreHorizontal/></header><div><span>穹境机器人</span><b>94 匹配</b></div><footer><span className="status status-warning">技术复试</span><button>查看详情</button></footer></article><article className="entity-card position-entity"><header><BriefcaseBusiness/><div><h3>自动驾驶感知负责人</h3><p>智元新创 · 北京</p></div></header><div className="chip-row"><span>VLA</span><span>量产部署</span><span>团队管理</span></div><footer><span>已匹配 128 人</span><button>进入岗位</button></footer></article><article className="entity-card paper-entity"><span>PAPER / 2026</span><h3>Learning Generalist Robots with Scalable World Models</h3><p>ICRA · 8 authors · OpenAlex</p><footer><span className="status status-success">强相关</span><button><ExternalLink/>论文详情</button></footer></article></div>
        <div className="table-shell"><table><thead><tr><th><button className="table-check"/></th><th>候选人</th><th>当前公司</th><th>匹配度</th><th>流程阶段</th><th>更新时间</th><th/></tr></thead><tbody>{candidates.map((person,index)=><tr key={person.name}><td><button className="table-check"/></td><td><div className="cell-person"><span>{person.name.slice(0,1)}</span><strong>{person.name}</strong></div></td><td>{person.company}</td><td><b className="table-score">{person.score}</b></td><td><span className={`status status-${index===1?"warning":"neutral"}`}>{person.stage}</span></td><td>今天 {11-index}:3{index}</td><td><button className="table-more"><MoreHorizontal/></button></td></tr>)}</tbody></table></div>
        <div className="timeline"><article className="done"><i><Check/></i><div><time>11:42</time><strong>证据核验完成</strong><p>8 条证据通过可信度门禁。</p></div></article><article className="running"><i><LoaderCircle/></i><div><time>11:36</time><strong>正在进行匹配评估</strong><p>已完成 31 / 48 位候选人。</p></div></article><article><i><Clock3/></i><div><time>待开始</time><strong>生成审核建议</strong><p>完成后进入人工确认。</p></div></article></div>
      </Section>

      <Section index="05" title="系统反馈" note="空、错、加载、权限和风险边界">
        <div className="feedback-grid"><article className="feedback-state loading-state"><LoaderCircle className="spin"/><h3>正在整理候选人</h3><p>已处理 31 / 80，预计还需 12 分钟。</p><i className="feedback-progress"><em style={{width:"39%"}}/></i></article><article className="feedback-state"><Search/><h3>没有匹配结果</h3><p>请减少筛选条件或扩大时间范围。</p><button>清空筛选</button></article><article className="feedback-state error-state"><AlertTriangle/><h3>人才平台登录失效</h3><p>任务已暂停，已有进度不会丢失。</p><button>打开平台处理</button></article><article className="feedback-state permission-state"><LockKeyhole/><h3>没有编辑权限</h3><p>你仍然可以查看和导出当前数据。</p><button>联系管理员</button></article></div>
        <div className="banner-row"><div className="banner info"><Info/><span><strong>任务将在后台继续</strong>你可以离开此页面，完成后会收到通知。</span><button><X/></button></div><div className="banner warning"><AlertTriangle/><span><strong>2 项结果需要确认</strong>Agent 无法确认候选人的当前职级。</span><button>立即处理</button></div></div>
        <div className="skeleton-demo"><div className="skeleton-avatar"/><div><i/><i/><i/></div></div>
      </Section>

      {modal&&<div className="overlay" role="presentation"><section className="modal" role="dialog" aria-modal="true"><header><div><AlertTriangle/><h2>删除候选人？</h2></div></header><p>删除后，候选人的推进记录和关联关系也会一并移除。此操作无法撤销。</p><div className="modal-object"><span className="entity-avatar">林</span><div><strong>林昊</strong><small>具身智能算法负责人</small></div></div><footer><button className="button secondary" onClick={()=>setModal(false)}>取消</button><button className="button danger" onClick={()=>{setModal(false);setToast(true)}}>确认删除</button></footer></section></div>}
      {drawer&&<div className="drawer-layer"><button className="drawer-scrim" aria-label="关闭" onClick={()=>setDrawer(false)}/><aside className="drawer"><header><div><span>候选人详情</span><h2>林昊</h2></div><button onClick={()=>setDrawer(false)}><X/></button></header><div className="drawer-profile"><span className="entity-avatar">林</span><div><strong>具身智能算法负责人</strong><p>北京 · 12 年经验 · 穹境机器人</p></div></div><dl><div><dt>联系方式</dt><dd>linhao@example.com</dd></div><div><dt>核心技能</dt><dd>VLA、强化学习、数据闭环、团队管理</dd></div><div><dt>数据来源</dt><dd><a>脉脉公开资料 <ExternalLink/></a></dd></div></dl><footer><button className="button primary wide">打开完整详情</button></footer></aside></div>}
      {toast&&<div className="toast"><CheckCircle2/><div><strong>操作已完成</strong><span>候选人状态已经更新。</span></div><button onClick={()=>setToast(false)}><X/></button></div>}
    </div>
  );
}
