import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  ArrowRight, BookOpen, CalendarDays, Check, ChevronDown, CircleAlert,
  FileCheck2, FileSearch, FileText, Filter, Highlighter, Library, LoaderCircle,
  MessageSquareText, Plus, Search, Sparkles, Upload, X,
} from "lucide-react";

const evidence = [
  { source: "公司官网", title: "公司定位与核心业务", excerpt: "聚焦具身智能机器人本体及通用智能系统研发。", confidence: "高" },
  { source: "招聘页面", title: "近期人才需求", excerpt: "正在招聘 VLA、运动控制、灵巧手结构与机器人平台岗位。", confidence: "高" },
  { source: "公开访谈", title: "团队文化与研发节奏", excerpt: "强调快速迭代、软硬件协同和产品落地。", confidence: "中" },
];

export function PaperlessStudioDashboard() {
  const [toast, setToast] = useState("");
  const [scope, setScope] = useState("进行中");
  return (
    <div className="research-dashboard research-overview">
      <header className="research-topbar"><div><Library /><b>Hunter Research</b></div><nav>{["概览", "资料库", "研究项目", "洞察"].map((item, index) => <button key={item} className={index === 0 ? "is-active" : ""} onClick={() => setToast(`已切换到${item}`)}>{item}</button>)}</nav><label><Search /><input placeholder="搜索项目、材料或洞察" /></label><button onClick={() => setToast("已打开新建研究项目")}><Plus />新建项目</button></header>
      <main className="research-overview-main"><header><div><small>IBM CARBON × DOVETAIL · RESEARCH</small><h1>研究与证据概览</h1><p>统一查看研究项目、证据质量和可交付的业务洞察。</p></div><nav>{["进行中", "已完成"].map(item => <button key={item} className={scope === item ? "is-active" : ""} onClick={() => setScope(item)}>{item}</button>)}</nav></header>
        <section className="research-overview-metrics">{[["进行中项目", "6", "2 个今天有更新"], ["已核验证据", "124", "覆盖 18 个来源"], ["待确认洞察", "9", "3 项高优先级"], ["来源可用率", "96%", "过去 7 天"]].map(([label, value, note]) => <article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>
        <div className="research-overview-grid"><section className="research-projects"><header><div><h2>研究项目</h2><span>{scope} · 最近更新排序</span></div><button onClick={() => setToast("项目筛选已打开")}><Filter />筛选</button></header>{[["智元新创公司调研", "公司调研", "18 条材料", "今天 11:42", 82], ["具身智能人才地图", "人才研究", "36 条材料", "今天 09:18", 64], ["灵巧手行业扫描", "行业研究", "21 条材料", "昨天", 100]].map(([title, type, material, time, progress]) => <button key={title} onClick={() => setToast(`已打开研究项目：${title}`)}><i><BookOpen /></i><span><small>{type}</small><b>{title}</b><p>{material} · 更新于 {time}</p></span><div><em style={{ width: `${progress}%` }} /><small>{progress}%</small></div><ArrowRight /></button>)}</section>
          <section className="research-source-health"><header><h2>证据来源</h2><span>过去 7 天</span></header>{evidence.map((item, index) => <button key={item.title} onClick={() => setToast(`已打开来源：${item.source}`)}><i className={`tone-${index}`}><FileCheck2 /></i><span><b>{item.source}</b><small>{item.title}</small></span><em>{item.confidence}可信</em></button>)}</section>
          <aside className="research-overview-insights"><header><h2>待确认洞察</h2><span>9 项</span></header>{[["重点招聘方向", "VLA、运动控制、灵巧手"], ["候选人吸引力", "技术自主权与产品落地"], ["潜在风险", "团队变化与竞业限制"]].map(([title, copy], index) => <button key={title} onClick={() => setToast(`已打开洞察：${title}`)}><i className={`tone-${index}`}><Sparkles /></i><span><b>{title}</b><small>{copy}</small></span><ArrowRight /></button>)}<footer><FileCheck2 /><p>洞察确认后可用于公司资料、岗位解析和人才寻访。</p></footer></aside></div>
      </main>
      <AnimatePresence>{toast && <motion.div className="research-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function PaperlessStudioComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("全部材料");
  const [motionStep, setMotionStep] = useState(1);
  const [tags, setTags] = useState(["公司资料", "招聘信息"]);
  const [trustMode, setTrustMode] = useState("严格");
  const [threshold, setThreshold] = useState(80);
  const notify = (text) => setToast(text);
  const importFile = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("材料已解析并加入项目"); }, 750); };
  return (
    <div className="research-components">
      <header><div><small>IBM CARBON × DOVETAIL × NOTION</small><h1>研究与证据组件</h1><p>材料、证据片段、批注和洞察拥有明确来源。</p></div><button className="research-primary" onClick={importFile} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Upload />}{loading ? "解析中" : "导入材料"}</button></header>
      <section className="research-actions"><button className="research-primary" onClick={() => notify("已新建研究项目")}><Plus />新建项目</button><button onClick={() => setDrawer(true)}><FileSearch />材料详情</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>材料操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="research-menu"><DropdownMenu.Item onSelect={() => notify("材料已加入洞察")}>加入洞察</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("材料引用已复制")}>复制引用</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("材料已移除")}>移除材料</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("移除材料需要确认")}>移除</button><button disabled>只读材料</button></section>

      <div className="research-spec-grid">
        <section className="research-form"><header><h2>材料信息</h2><span>来源与证据</span></header><div>
          <label><span>搜索材料</span><div className="research-input"><Search /><input placeholder="标题、来源或正文" /></div></label>
          <label><span>材料类型</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="research-select">网页资料<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="research-menu">{["网页资料", "PDF 文件", "访谈记录"].map(item => <DropdownMenu.Item key={item} onSelect={() => notify(`材料类型：${item}`)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
          <label className="is-error"><span>来源 URL</span><input defaultValue="company" /><small><CircleAlert />请输入完整的公开来源 URL</small></label>
          <label><span>获取日期</span><Popover.Root><Popover.Trigger asChild><button className="research-select"><CalendarDays />2026-08-06<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="research-calendar"><b>获取日期</b>{["今天", "昨天", "自定义"].map(item => <button key={item} onClick={() => notify(item)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
          <label className="span-2"><span>材料标签</span><div className="research-tags">{tags.map(tag => <em key={tag}>{tag}<button onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "已核验"])}><Plus />添加</button></div></label>
          <label className="span-2"><span>证据摘要</span><textarea defaultValue="该材料说明公司近期重点招聘 VLA、运动控制和灵巧手结构方向。" /></label>
          <label className="span-2"><span>原始文件</span><button className="research-upload" onClick={() => notify("已打开文件选择器")}><Upload /><span><b>上传 PDF 或 DOCX</b><small>解析后保留原始文件</small></span></button></label>
        </div></section>
        <aside className="research-preferences"><header><h2>研究设置</h2></header><button className="research-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>要求公开来源</b><small>没有来源的内容不作证据</small></span></button><div className="research-switch"><span><b>自动提取证据片段</b><small>仍需人工确认</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div><div className="research-radio"><span>可信度</span>{["严格", "平衡"].map((item) => <button key={item} onClick={() => { setTrustMode(item); notify(`可信度策略：${item}`); }}><i className={trustMode === item ? "is-active" : ""}>{trustMode === item && <em />}</i>{item}</button>)}</div><label className="research-slider"><span><b>证据阈值</b><strong>{threshold}</strong></span><Slider.Root value={[threshold]} onValueChange={([value]) => setThreshold(value)}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="证据阈值" /></Slider.Root></label></aside>
      </div>

      <section className="research-data"><header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["全部材料", "已核验", "待处理"].map(item => <Tabs.Trigger value={item} key={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("筛选器已打开")}><Filter />筛选</button></header>{evidence.map((item, index) => <button className="research-data-row" key={item.title} onClick={() => setDrawer(true)}><FileText /><span><b>{item.title}</b><small>{item.source} · {item.excerpt}</small></span><em>{item.confidence}可信</em><time>{index + 1} 小时前</time><ArrowRight /></button>)}<footer><span>1–3 / 18</span><button onClick={() => notify("已进入下一页")}>下一页</button></footer></section>

      <section className="research-motion"><header><div><small>CARBON PRODUCTIVE MOTION</small><h2>研究反馈</h2></div><nav>{["材料进入", "证据定位", "洞察生成", "核验完成"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header><div><motion.article key={motionStep} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .22 }}><i>{motionStep === 4 ? <FileCheck2 /> : <FileText />}</i><span><small>研究材料</small><b>{["", "新材料进入研究项目", "视图定位到对应证据片段", "多条证据形成可审核洞察", "核验完成并保留来源"][motionStep]}</b></span><Check /></motion.article></div></section>

      <Dialog.Root><Dialog.Trigger asChild><button className="research-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="research-overlay" /><Dialog.Content className="research-modal"><Dialog.Title>将证据加入公司资料</Dialog.Title><Dialog.Description>证据片段和原始来源会一并保留，写入前仍需确认。</Dialog.Description><div><FileCheck2 /><span><b>3 条已核验证据</b><small>来自官网、招聘页面和公开访谈</small></span></div><footer><Dialog.Close asChild><button>取消</button></Dialog.Close><Dialog.Close asChild><button className="research-primary" onClick={() => notify("证据已加入公司资料草稿")}>确认加入</button></Dialog.Close></footer><Dialog.Close asChild><button className="research-close"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="research-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="research-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><div><small>材料详情</small><h2>近期人才需求</h2></div><button onClick={() => setDrawer(false)}><X /></button></header><p>正在招聘 VLA、运动控制、灵巧手结构与机器人平台岗位。</p><dl><div><dt>来源</dt><dd>招聘页面</dd></div><div><dt>可信度</dt><dd>高</dd></div><div><dt>核验状态</dt><dd>已核验</dd></div></dl><button className="research-primary" onClick={() => notify("已打开原始来源")}>打开原始来源</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="research-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
