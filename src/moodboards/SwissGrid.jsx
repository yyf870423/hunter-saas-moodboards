import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  ArrowRight, Bot, CalendarDays, Check, ChevronDown, CircleAlert, Clock3,
  FileCheck2, FileText, LoaderCircle, MessageSquareText, MoreHorizontal,
  Pause, Play, Plus, Search, Send, Sparkles, Square, Upload, X,
} from "lucide-react";

const tasks = [
  { title: "调研智元新创", type: "公司调研", status: "运行中", time: "06:42" },
  { title: "补全林昊公开资料", type: "信息补全", status: "等待确认", time: "今天" },
  { title: "解析自动驾驶岗位", type: "岗位解析", status: "已完成", time: "昨天" },
];

export function SwissGridDashboard() {
  const [toast, setToast] = useState("");
  const [scope, setScope] = useState("进行中");

  return (
    <div className="task-dashboard task-overview">
      <aside className="task-overview-sidebar"><div><Bot /><b>Hunter Agent</b></div><nav>{["任务概览", "进行中", "需处理", "已完成"].map((item, index) => <button key={item} className={index === 0 ? "is-active" : ""} onClick={() => setToast(`已切换到${item}`)}>{item}</button>)}</nav><section><small>今日运行时间</small><strong>3.8 小时</strong><span>4 个任务并行</span></section><i>于</i></aside>
      <main className="task-overview-main"><header><div><small>WORKBUDDY × VERCEL AI · AGENT TASKS</small><h1>Agent 任务概览</h1><p>查看任务状态、人工处理点和已交付业务结果。</p></div><label><Search /><input placeholder="搜索 Agent 任务" /></label><button onClick={() => setToast("新任务入口已打开")}><Plus />新建任务</button></header>
        <section className="task-overview-metrics">{[["运行中", "4", "2 个预计今天完成"], ["需要处理", "3", "等待登录或确认"], ["今日完成", "11", "交付 9 项业务结果"], ["成功率", "94%", "过去 30 天"]].map(([label, value, note], index) => <article key={label} className={`tone-${index}`}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>
        <div className="task-overview-grid"><section className="task-overview-runs"><header><div><h2>任务运行情况</h2><span>最近更新 1 分钟前</span></div><nav>{["进行中", "需处理", "已完成"].map(item => <button key={item} className={scope === item ? "is-active" : ""} onClick={() => setScope(item)}>{item}</button>)}</nav></header>{tasks.map((item, index) => <button key={item.title} onClick={() => setToast(`已打开任务：${item.title}`)}><i className={`status-${index}`}>{index === 0 ? <LoaderCircle className="is-spin" /> : index === 1 ? <CircleAlert /> : <Check />}</i><span><small>{item.type}</small><b>{item.title}</b><p>{["正在核验团队与招聘信息", "等待用户确认候选人建议", "已写入岗位解析结果"][index]}</p></span><em>{item.status}</em><time>{item.time}</time><ArrowRight /></button>)}</section>
          <aside className="task-overview-delivery"><header><h2>今日交付</h2><span>9 项</span></header>{[["公司资料草稿", "3 份", FileCheck2], ["候选人补全建议", "18 条", Sparkles], ["岗位解析结果", "4 份", FileText]].map(([label, value, Icon]) => <button key={label} onClick={() => setToast(`已打开${label}`)}><i><Icon /></i><span><b>{label}</b><small>{value}</small></span><ArrowRight /></button>)}<section><CircleAlert /><span><b>3 个任务需要处理</b><small>处理后将从保留位置继续运行</small></span><button onClick={() => setToast("已打开需处理任务")}>立即处理</button></section></aside>
        </div>
      </main>
      <AnimatePresence>{toast && <motion.div className="task-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function SwissGridComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("运行中");
  const [motionStep, setMotionStep] = useState(1);
  const [tags, setTags] = useState(["公司调研", "高优先级"]);
  const [priorityMode, setPriorityMode] = useState("高");
  const [retryLimit, setRetryLimit] = useState(3);
  const notify = (text) => setToast(text);
  const start = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("Agent 任务已启动"); }, 800); };
  return (
    <div className="task-components">
      <header><div><small>FLUENT 2 × WORKBUDDY × VERCEL AI</small><h1>Agent 任务组件</h1><p>任务输入、持续执行、人工补充和交付结果保持连续。</p></div><button className="task-primary" onClick={start} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Play />}{loading ? "启动中" : "启动任务"}</button></header>
      <section className="task-actions"><button className="task-primary" onClick={() => notify("已创建 Agent 任务")}><Plus />新建任务</button><button onClick={() => setDrawer(true)}><FileText />任务详情</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>任务操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="task-menu"><DropdownMenu.Item onSelect={() => notify("任务已暂停")}>暂停任务</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("任务已复制")}>复制任务</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("任务已停止")}>停止任务</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("停止任务需要确认")}><Square />停止任务</button><button disabled>任务已完成</button></section>

      <div className="task-spec-grid">
        <section className="task-form"><header><h2>任务配置</h2><span>输入门禁</span></header><div>
          <label><span>搜索任务</span><div className="task-input"><Search /><input placeholder="任务名称或业务对象" /></div></label>
          <label><span>任务类型</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="task-select">公司调研<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="task-menu">{["公司调研", "岗位解析", "信息补全", "学术搜索"].map(item => <DropdownMenu.Item key={item} onSelect={() => notify(`任务类型：${item}`)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
          <label className="is-error"><span>任务名称</span><input placeholder="请输入任务名称" /><small><CircleAlert />任务名称不能为空</small></label>
          <label><span>计划开始</span><Popover.Root><Popover.Trigger asChild><button className="task-select"><CalendarDays />立即开始<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="task-calendar"><b>开始时间</b>{["立即开始", "今天 18:00", "明天 09:00"].map(item => <button key={item} onClick={() => notify(item)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
          <label className="span-2"><span>任务标签</span><div className="task-tags">{tags.map(tag => <em key={tag}>{tag}<button onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "需审核"])}><Plus />添加</button></div></label>
          <label className="span-2"><span>任务要求</span><textarea defaultValue="调研目标公司的业务、团队、人才优势和近期招聘方向，输出可审核的公司草稿。" /></label>
          <label className="span-2"><span>输入材料</span><button className="task-upload" onClick={() => notify("已打开材料上传")}><Upload /><span><b>上传任务相关文件</b><small>系统会在运行前校验</small></span></button></label>
        </div></section>
        <aside className="task-preferences"><header><h2>运行策略</h2></header><button className="task-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>结果需要人工确认</b><small>通过门禁后进入审核</small></span></button><div className="task-switch"><span><b>失败后自动修正</b><small>达到上限后停止</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div><div className="task-radio"><span>优先级</span>{["普通", "高"].map((item) => <button key={item} onClick={() => { setPriorityMode(item); notify(`优先级：${item}`); }}><i className={priorityMode === item ? "is-active" : ""}>{priorityMode === item && <em />}</i>{item}</button>)}</div><label className="task-slider"><span><b>最大修正次数</b><strong>{retryLimit}</strong></span><Slider.Root value={[retryLimit]} onValueChange={([value]) => setRetryLimit(value)} min={1} max={5} step={1}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="最大修正次数" /></Slider.Root></label></aside>
      </div>

      <section className="task-data"><header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["运行中", "需处理", "已完成"].map(item => <Tabs.Trigger value={item} key={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("任务筛选已打开")}><Search />筛选</button></header>{tasks.map((item, index) => <button className="task-data-row" key={item.title} onClick={() => setDrawer(true)}><i className={`status-${index}`}>{index === 0 ? <LoaderCircle className="is-spin" /> : index === 1 ? <CircleAlert /> : <Check />}</i><span><b>{item.title}</b><small>{item.type}</small></span><em>{item.status}</em><time>{item.time}</time><ArrowRight /></button>)}<footer><span>1–3 / 18</span><button onClick={() => notify("已进入下一页")}>下一页</button></footer></section>

      <section className="task-motion"><header><div><small>FLUENT TASK TRANSITION</small><h2>任务状态</h2></div><nav>{["接收任务", "执行过程", "结果出现", "请求确认"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header><div><motion.article key={motionStep} initial={{ opacity: 0, y: 16, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }}><i>{motionStep === 4 ? <CircleAlert /> : motionStep === 3 ? <FileCheck2 /> : <Bot />}</i><span><small>Agent 任务</small><b>{["", "任务进入运行队列", "执行记录按时间持续增加", "交付结果在右侧稳定出现", "Agent 请求用户确认关键结果"][motionStep]}</b></span><Check /></motion.article></div></section>

      <Dialog.Root><Dialog.Trigger asChild><button className="task-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="task-overlay" /><Dialog.Content className="task-modal"><Dialog.Title>停止 Agent 任务</Dialog.Title><Dialog.Description>当前运行位置和已生成结果会保留，可以稍后继续。</Dialog.Description><div><Pause /><span><b>运行 06:42</b><small>已完成 3 个处理步骤</small></span></div><footer><Dialog.Close asChild><button>返回</button></Dialog.Close><Dialog.Close asChild><button className="task-danger" onClick={() => notify("任务已停止")}>确认停止</button></Dialog.Close></footer><Dialog.Close asChild><button className="task-close"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="task-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="task-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><div><small>Agent 任务</small><h2>调研智元新创</h2></div><button onClick={() => setDrawer(false)}><X /></button></header><p>正在核验团队和招聘信息，已生成公司资料草稿。</p><dl><div><dt>运行状态</dt><dd>运行中</dd></div><div><dt>运行时间</dt><dd>06:42</dd></div><div><dt>交付结果</dt><dd>1 份草稿</dd></div></dl><button className="task-primary" onClick={() => notify("已打开完整运行详情")}>查看完整运行详情</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="task-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
