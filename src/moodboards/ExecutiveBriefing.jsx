import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  Activity, ArrowRight, BellRing, CalendarDays, Check, ChevronDown, CircleAlert,
  Command, Cpu, Filter, Focus, LoaderCircle, Orbit, Plus, Radar, Search,
  Sparkles, Upload, UsersRound, X, Zap,
} from "lucide-react";
import { candidates } from "../data/boards";

const signals = [
  { title: "具身智能人才流动升温", meta: "8 家目标公司 · 24 位候选人", level: "高优先", detail: "近 7 天有 6 位候选人更新经历，其中 3 位来自已配置的对标公司。" },
  { title: "智元新创新增结构岗位", meta: "公司动态 · 2 小时前", level: "机会", detail: "招聘页面新增灵巧手结构与传动方向岗位，可补充新的关键词组合。" },
  { title: "3 位候选人重新开放机会", meta: "人才状态 · 今天", level: "跟进", detail: "历史沟通记录显示其中 2 位更关注平台自主权和团队规模。" },
];

export function ExecutiveBriefingDashboard() {
  const [active, setActive] = useState(0);
  const [scope, setScope] = useState("全部信号");
  const [toast, setToast] = useState("");
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="signal-dashboard">
      <header className="signal-topbar">
        <div className="signal-logo"><Orbit /><b>Hunter</b><span>Signals</span></div>
        <nav>{["信号", "人才", "公司", "任务"].map((item) => <button key={item} className={scope.includes(item) || (item === "信号" && scope === "全部信号") ? "is-active" : ""} onClick={() => { setScope(item === "信号" ? "全部信号" : item); setToast(`已切换到${item}`); }}>{item}</button>)}</nav>
        <button className="signal-command" onClick={() => setCommandOpen(true)}><Command /><span>快速查找</span><kbd>⌘ K</kbd></button>
      </header>

      <main className="signal-main">
        <section className="signal-heading"><div><small>THURSDAY · 06 AUG</small><h1>今天值得关注的信号</h1><p>从人才、公司和任务变化中筛出需要你判断的事项。</p></div><div className="signal-live"><i /><span><b>实时监测中</b><small>最后更新 1 分钟前</small></span></div></section>

        <div className="signal-layout">
          <section className="signal-focus">
            <header><span><Radar />优先信号</span><em>{active + 1} / {signals.length}</em></header>
            <AnimatePresence mode="wait"><motion.article key={active} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -14 }} transition={{ duration: .2 }}>
              <small>{signals[active].level}</small><h2>{signals[active].title}</h2><p>{signals[active].detail}</p><dl><div><dt>影响范围</dt><dd>{signals[active].meta}</dd></div><div><dt>建议动作</dt><dd>查看候选人并安排跟进</dd></div></dl>
              <footer><button onClick={() => setToast("该信号已暂缓至明天")}>稍后处理</button><button onClick={() => setToast("已打开相关候选人")}>查看相关内容<ArrowRight /></button></footer>
            </motion.article></AnimatePresence>
            <nav>{signals.map((signal, index) => <button key={signal.title} aria-label={`查看信号 ${index + 1}`} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} />)}</nav>
          </section>

          <aside className="signal-stream">
            <header><h2>信号流</h2><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>{scope}<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="signal-menu" sideOffset={6}>{["全部信号", "人才变化", "公司动态", "任务异常"].map(item => <DropdownMenu.Item key={item} onSelect={() => setScope(item)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></header>
            {signals.map((signal, index) => <button key={signal.title} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}><i className={`tone-${index}`}><Activity /></i><span><b>{signal.title}</b><small>{signal.meta}</small></span><em>{signal.level}</em></button>)}
            <button className="signal-more" onClick={() => setToast("已加载 6 条更多信号")}>加载更多信号<ArrowRight /></button>
          </aside>

          <section className="signal-pulse">
            <header><h2>人才脉冲</h2><span>过去 24 小时</span></header>
            <div className="signal-pulse-chart">{[32, 46, 39, 62, 51, 74, 68, 86, 65, 92, 76, 98].map((value, index) => <motion.i key={index} initial={{ height: 0 }} animate={{ height: `${value}%` }} transition={{ delay: index * .025 }} />)}</div>
            <footer><span><strong>28</strong>新增线索</span><span><strong>9</strong>高相关</span><span><strong>4</strong>需跟进</span></footer>
          </section>

          <section className="signal-agents">
            <header><h2>Agent 活动</h2><button onClick={() => setToast("已进入 Agent 列表")}>查看全部</button></header>
            {["调研智元新创组织变化", "补全 12 位候选人资料", "解析自动驾驶岗位"].map((item, index) => <button key={item} onClick={() => setToast(`已打开：${item}`)}><i className={index === 0 ? "is-running" : ""}>{index === 0 ? <Cpu /> : <Check />}</i><span><b>{item}</b><small>{index === 0 ? "正在运行 · 06:42" : "今天已完成"}</small></span><ArrowRight /></button>)}
          </section>
        </div>
      </main>

      <AnimatePresence>{commandOpen && <motion.div className="signal-command-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setCommandOpen(false)}><motion.div className="signal-command-panel" initial={{ opacity: 0, scale: .97, y: -12 }} animate={{ opacity: 1, scale: 1, y: 0 }} onMouseDown={(event) => event.stopPropagation()}><label><Search /><input autoFocus placeholder="搜索候选人、公司、岗位或命令" /><kbd>ESC</kbd></label><span>建议命令</span>{["新建候选人", "开始人才寻访", "查看需处理 Agent"].map((item) => <button key={item} onClick={() => { setCommandOpen(false); setToast(`已执行：${item}`); }}><Command /><b>{item}</b><ArrowRight /></button>)}</motion.div></motion.div>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="signal-toast" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><Zap /><span>{toast}</span><button aria-label="关闭" onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function ExecutiveBriefingComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(["机器人", "多模态"]);
  const [motionStep, setMotionStep] = useState(1);
  const [tab, setTab] = useState("实时信号");
  const [handlingMode, setHandlingMode] = useState("进入队列");
  const [threshold, setThreshold] = useState(80);
  const notify = (text) => setToast(text);
  const save = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("信号规则已保存"); }, 700); };

  return (
    <div className="signal-components">
      <header><div><small>FLUENT 2 × RAYCAST × OPENROUTER</small><h1>信号与命令组件</h1><p>以清晰层级、即时反馈和实时状态组织高优先级工作。</p></div><button className="signal-primary" onClick={save} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Check />}{loading ? "保存中" : "保存规则"}</button></header>

      <section className="signal-command-strip"><button className="signal-primary" onClick={() => notify("已新建监测任务")}><Plus />新建监测</button><button onClick={() => setDrawer(true)}><Focus />打开上下文</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>更多命令<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="signal-menu" sideOffset={6}><DropdownMenu.Item onSelect={() => notify("已刷新全部信号")}>刷新全部信号</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("已导出信号摘要")}>导出信号摘要</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("监测任务已停止")}>停止监测</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("危险操作需要确认")}>停止任务</button><button disabled>不可用命令</button></section>

      <div className="signal-spec-grid">
        <section className="signal-form">
          <header><h2>监测条件</h2><span>组件状态</span></header>
          <div>
            <label><span>搜索对象</span><div className="signal-input"><Search /><input defaultValue="具身智能算法" /></div></label>
            <label><span>监测范围</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="signal-select">人才与公司<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="signal-menu"><DropdownMenu.Item onSelect={() => notify("范围：人才与公司")}>人才与公司</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("范围：只看人才")}>只看人才</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("范围：只看公司")}>只看公司</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
            <label className="is-error"><span>通知邮箱</span><input defaultValue="signal@" /><small><CircleAlert />请输入完整邮箱地址</small></label>
            <label><span>生效日期</span><Popover.Root><Popover.Trigger asChild><button className="signal-select"><CalendarDays />2026-08-08<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="signal-calendar"><b>快速日期</b>{["今天", "明天", "下周一"].map(item => <button key={item} onClick={() => notify(`已选择${item}`)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
            <label className="span-2"><span>监测关键词</span><div className="signal-tags">{tags.map(tag => <em key={tag}>{tag}<button aria-label={`删除${tag}`} onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "VLA"])}><Plus />添加</button></div></label>
            <label className="span-2"><span>分析说明</span><textarea defaultValue="优先识别候选人开放机会、团队变化和新岗位信号。" /></label>
            <label className="span-2"><span>导入名单</span><button className="signal-upload" onClick={() => notify("已打开文件选择器")}><Upload /><span><b>上传 XLSX 或 CSV</b><small>系统会先校验字段</small></span></button></label>
          </div>
        </section>

        <aside className="signal-settings">
          <header><h2>信号策略</h2></header>
          <button className="signal-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>只推送高相关信号</b><small>过滤重复和弱关联变化</small></span></button>
          <div className="signal-switch"><span><b>实时通知</b><small>出现高优先级信号时提醒</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div>
          <div className="signal-radio"><span>处理方式</span>{["进入队列", "立即提醒"].map((item) => <button key={item} onClick={() => { setHandlingMode(item); notify(`处理方式：${item}`); }}><i className={handlingMode === item ? "is-active" : ""}>{handlingMode === item && <em />}</i>{item}</button>)}</div>
          <label className="signal-slider"><span><b>相关度阈值</b><strong>{threshold}</strong></span><Slider.Root value={[threshold]} onValueChange={([value]) => setThreshold(value)}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="相关度阈值" /></Slider.Root></label>
        </aside>
      </div>

      <section className="signal-data">
        <header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["实时信号", "已处理", "监测对象"].map(item => <Tabs.Trigger key={item} value={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("筛选器已展开")}><Filter />筛选</button></header>
        {candidates.slice(0, 3).map((item, index) => <button className="signal-data-row" key={item.name} onClick={() => setDrawer(true)}><i className={`tone-${index}`}><Activity /></i><span><b>{item.name} 更新了职业状态</b><small>{item.company} · {item.role}</small></span><em>{index === 0 ? "高优先" : "待判断"}</em><time>{index + 3} 分钟前</time><ArrowRight /></button>)}
        <footer><span>显示 3 / 24 条</span><button onClick={() => notify("已加载下一批信号")}>加载更多</button></footer>
      </section>

      <section className="signal-motion">
        <header><div><small>FLUENT MOTION</small><h2>状态变化</h2></div><nav>{["进入", "聚焦", "转换", "完成"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header>
        <div><AnimatePresence mode="wait"><motion.article key={motionStep} initial={{ opacity: 0, y: motionStep === 2 ? 0 : 18, scale: motionStep === 2 ? .96 : 1 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }}><i><Radar /></i><span><small>信号 {String(motionStep).padStart(2, "0")}</small><b>{["", "新的人才变化进入信号流", "优先信号获得视觉焦点", "信号展开为完整上下文", "处理完成并返回稳定状态"][motionStep]}</b></span><Check /></motion.article></AnimatePresence></div>
      </section>

      <Dialog.Root><Dialog.Trigger asChild><button className="signal-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="signal-overlay" /><Dialog.Content className="signal-modal"><div className="signal-modal-icon"><BellRing /></div><Dialog.Title>启用实时信号提醒</Dialog.Title><Dialog.Description>高优先级人才与公司变化会在工作台即时出现。</Dialog.Description><footer><Dialog.Close asChild><button>取消</button></Dialog.Close><Dialog.Close asChild><button className="signal-primary" onClick={() => notify("实时提醒已启用")}>确认启用</button></Dialog.Close></footer><Dialog.Close asChild><button className="signal-close" aria-label="关闭"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="signal-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="signal-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><span><Radar />信号上下文</span><button onClick={() => setDrawer(false)}><X /></button></header><h2>林昊更新了职业状态</h2><p>结合最近一次沟通和公开资料，候选人可能重新开放机会。</p><dl><div><dt>来源</dt><dd>公开资料、历史沟通</dd></div><div><dt>置信度</dt><dd>92%</dd></div><div><dt>建议</dt><dd>今天联系</dd></div></dl><button className="signal-primary" onClick={() => notify("已创建跟进任务")}>创建跟进任务</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="signal-toast" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}><Zap /><span>{toast}</span><button aria-label="关闭" onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
