import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  ArrowRight, Building2, CalendarDays, Check, ChevronDown, CircleAlert,
  Filter, Layers3, LoaderCircle, MapPin, Plus, Search, Sparkles, Target,
  TrendingUp, Upload, UserRoundPlus, UsersRound, X, Zap,
} from "lucide-react";

const opportunities = [
  { company: "智元新创", signal: "新增 6 个机器人岗位", people: "28 位潜在人选", score: 94, type: "招聘机会" },
  { company: "穹境机器人", signal: "完成新一轮融资", people: "12 位关键联系人", score: 88, type: "BD 机会" },
  { company: "逐光科技", signal: "感知团队扩张", people: "19 位相关候选人", score: 83, type: "人才机会" },
];

export function GuidedAutomationDashboard() {
  const [selected, setSelected] = useState(0);
  const [scope, setScope] = useState("全部机会");
  const [toast, setToast] = useState("");
  const current = opportunities[selected];
  return (
    <div className="opportunity-dashboard">
      <aside className="opportunity-sidebar"><div><Target /><b>Hunter</b></div><nav>{["机会", "公司", "岗位", "人才"].map((item, index) => <button key={item} className={index === 0 ? "is-active" : ""} onClick={() => setToast(`已切换到${item}`)}>{item}</button>)}</nav><section><small>本周新增机会</small><strong>38</strong><span>较上周 +12%</span></section></aside>
      <main className="opportunity-main"><header><div><small>ATTIO × CLAY · OPPORTUNITIES</small><h1>机会探索</h1><p>把公司、岗位和人才变化整理成可立即处理的业务机会。</p></div><label><Search /><input placeholder="搜索公司、岗位或人才" /></label><button onClick={() => setToast("新建机会表单已打开")}><Plus />新建机会</button></header><section className="opportunity-toolbar"><nav>{["全部机会", "招聘机会", "BD 机会", "人才机会"].map(item => <button key={item} className={scope === item ? "is-active" : ""} onClick={() => setScope(item)}>{item}</button>)}</nav><button onClick={() => setToast("筛选器已打开")}><Filter />筛选</button></section>

        <div className="opportunity-grid"><section className="opportunity-list">{opportunities.filter(item => scope === "全部机会" || item.type === scope).map((item, index) => <button key={item.company} className={selected === index ? "is-active" : ""} onClick={() => setSelected(index)}><i><Building2 /></i><span><small>{item.type}</small><b>{item.company}</b><p>{item.signal}</p></span><div><strong>{item.score}</strong><small>机会分</small></div><ArrowRight /></button>)}</section>
          <section className="opportunity-detail"><header><div><small>{current.type}</small><h2>{current.company}</h2></div><span>{current.score} / 100</span></header><article><h3>为什么值得关注</h3><p>{current.signal}，近期公开信息显示团队仍在扩张，适合同时启动客户跟进和相关人才储备。</p></article><div className="opportunity-facts"><span><MapPin /><b>上海、北京</b><small>主要招聘地点</small></span><span><UsersRound /><b>{current.people}</b><small>系统可进一步处理</small></span><span><TrendingUp /><b>过去 7 天</b><small>信号持续增强</small></span></div><footer><button onClick={() => setToast("机会已标记稍后处理")}>稍后处理</button><button onClick={() => setToast("已创建机会跟进任务")}>创建跟进任务<ArrowRight /></button></footer></section>
          <aside className="opportunity-enrichment"><header><h2>数据补全</h2><span>3 / 4</span></header>{["公司信息", "招聘岗位", "关键联系人", "人才储备"].map((item, index) => <button key={item} onClick={() => setToast(`已打开${item}`)}><i className={index < 3 ? "is-done" : ""}>{index < 3 ? <Check /> : <LoaderCircle className="is-spin" />}</i><span><b>{item}</b><small>{index < 3 ? "已补全" : "正在发现"}</small></span></button>)}<footer><Zap /><p>系统已发现 6 个可直接使用的岗位搜索关键词。</p></footer></aside>
        </div>
      </main>
      <AnimatePresence>{toast && <motion.div className="opportunity-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function GuidedAutomationComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("全部机会");
  const [motionStep, setMotionStep] = useState(1);
  const [tags, setTags] = useState(["具身智能", "高增长"]);
  const [targetMode, setTargetMode] = useState("客户");
  const [minimumScore, setMinimumScore] = useState(75);
  const notify = (text) => setToast(text);
  const enrich = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("机会信息已补全"); }, 800); };
  return (
    <div className="opportunity-components">
      <header><div><small>LIGHTNING × ATTIO × CLAY</small><h1>机会与对象组件</h1><p>对象列表、组合筛选和多源补全使用成熟 CRM 交互。</p></div><button className="opportunity-primary" onClick={enrich} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Sparkles />}{loading ? "补全中" : "补全机会"}</button></header>
      <section className="opportunity-actions"><button className="opportunity-primary" onClick={() => notify("已创建机会")}><Plus />新建机会</button><button onClick={() => setDrawer(true)}><Building2 />打开对象</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>对象操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="opportunity-menu"><DropdownMenu.Item onSelect={() => notify("已加入关注列表")}>加入关注列表</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("机会已分配")}>分配负责人</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("机会已关闭")}>关闭机会</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("关闭机会需要确认")}>关闭机会</button><button disabled>已完成</button></section>

      <div className="opportunity-spec-grid"><section className="opportunity-form"><header><h2>机会信息</h2><span>对象字段</span></header><div>
        <label><span>搜索机会</span><div className="opportunity-input"><Search /><input placeholder="公司、岗位或联系人" /></div></label>
        <label><span>机会类型</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="opportunity-select">招聘机会<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="opportunity-menu">{["招聘机会", "BD 机会", "人才机会"].map(item => <DropdownMenu.Item key={item} onSelect={() => notify(`机会类型：${item}`)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
        <label className="is-error"><span>公司名称</span><input placeholder="请输入公司" /><small><CircleAlert />公司名称不能为空</small></label>
        <label><span>下次跟进</span><Popover.Root><Popover.Trigger asChild><button className="opportunity-select"><CalendarDays />明天<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="opportunity-calendar"><b>跟进日期</b>{["今天", "明天", "下周"].map(item => <button key={item} onClick={() => notify(item)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
        <label className="span-2"><span>机会标签</span><div className="opportunity-tags">{tags.map(tag => <em key={tag}>{tag}<button onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "需跟进"])}><Plus />添加</button></div></label>
        <label className="span-2"><span>机会说明</span><textarea defaultValue="公司近期新增多个机器人岗位，可同步开展客户跟进和人才储备。" /></label>
        <label className="span-2"><span>补充名单</span><button className="opportunity-upload" onClick={() => notify("已打开名单上传")}><Upload /><span><b>上传公司或联系人名单</b><small>XLSX、CSV</small></span></button></label>
      </div></section><aside className="opportunity-preferences"><header><h2>发现策略</h2></header><button className="opportunity-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>合并重复公司信号</b><small>相同公司只保留一个机会</small></span></button><div className="opportunity-switch"><span><b>持续补全信息</b><small>发现新来源时更新</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div><div className="opportunity-radio"><span>优先目标</span>{["客户", "人才"].map((item) => <button key={item} onClick={() => { setTargetMode(item); notify(`优先目标：${item}`); }}><i className={targetMode === item ? "is-active" : ""}>{targetMode === item && <em />}</i>{item}</button>)}</div><label className="opportunity-slider"><span><b>最低机会分</b><strong>{minimumScore}</strong></span><Slider.Root value={[minimumScore]} onValueChange={([value]) => setMinimumScore(value)}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="最低机会分" /></Slider.Root></label></aside></div>

      <section className="opportunity-data"><header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["全部机会", "招聘", "BD", "人才"].map(item => <Tabs.Trigger value={item} key={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("筛选器已打开")}><Filter />筛选</button></header><div className="opportunity-table-head"><span>公司</span><span>机会信号</span><span>相关对象</span><span>机会分</span><span>操作</span></div>{opportunities.map(item => <div className="opportunity-data-row" key={item.company}><span><i><Building2 /></i><b>{item.company}<small>{item.type}</small></b></span><span>{item.signal}</span><span>{item.people}</span><strong>{item.score}</strong><button onClick={() => setDrawer(true)}>查看</button></div>)}<footer><span>1–3 / 38</span><button onClick={() => notify("已进入下一页")}>下一页</button></footer></section>

      <section className="opportunity-motion"><header><div><small>LIGHTNING OBJECT STATE × CLAY RUN STATUS</small><h2>机会变化</h2></div><nav>{["信号进入", "对象补全", "机会确认", "跟进排期"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header><div><motion.article key={motionStep} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }}><i>{motionStep === 2 ? <LoaderCircle className="is-spin" /> : <Building2 />}</i><span><small>智元新创 · 招聘机会</small><b>{["", "新招聘信号进入机会列表", "多源信息按字段逐步补全", "机会通过判断进入正式列表", "跟进任务已安排到明天"][motionStep]}</b></span><Check /></motion.article></div></section>

      <Dialog.Root><Dialog.Trigger asChild><button className="opportunity-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="opportunity-overlay" /><Dialog.Content className="opportunity-modal"><Dialog.Title>创建机会跟进任务</Dialog.Title><Dialog.Description>任务将关联智元新创，并保留当前信号和已补全信息。</Dialog.Description><div><Target /><span><b>招聘机会 · 94 分</b><small>包含 6 个岗位和 28 位潜在人选</small></span></div><footer><Dialog.Close asChild><button>取消</button></Dialog.Close><Dialog.Close asChild><button className="opportunity-primary" onClick={() => notify("机会跟进任务已创建")}>确认创建</button></Dialog.Close></footer><Dialog.Close asChild><button className="opportunity-close"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="opportunity-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="opportunity-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><div><small>机会详情</small><h2>智元新创</h2></div><button onClick={() => setDrawer(false)}><X /></button></header><p>近期新增 6 个机器人岗位，同时发现 28 位潜在人选。</p><dl><div><dt>机会类型</dt><dd>招聘机会</dd></div><div><dt>机会分</dt><dd>94</dd></div><div><dt>负责人</dt><dd>于一凡</dd></div></dl><button className="opportunity-primary" onClick={() => notify("已打开完整机会")}>打开完整机会</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="opportunity-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
