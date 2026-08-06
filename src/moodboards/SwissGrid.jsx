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
  const [task, setTask] = useState(0);
  const [toast, setToast] = useState("");
  const [message, setMessage] = useState("");
  const [events, setEvents] = useState(["已读取公司官网与招聘页面", "正在核验团队与业务信息", "已生成公司资料草稿"]);
  const current = tasks[task];

  const send = () => { if (message.trim()) { setEvents([...events, `用户补充：${message.trim()}`]); setMessage(""); setToast("补充信息已交给 Agent"); } };

  return (
    <div className="task-dashboard">
      <aside className="task-list"><header><div><Bot /><b>Hunter Agent</b></div><button onClick={() => setToast("新任务入口已打开")}><Plus /></button></header><label><Search /><input placeholder="搜索任务" /></label><nav><button className="is-active" onClick={() => setToast("显示进行中任务")}>进行中 <span>2</span></button><button onClick={() => setToast("显示全部任务")}>全部</button></nav>{tasks.map((item, index) => <button key={item.title} className={task === index ? "is-active" : ""} onClick={() => setTask(index)}><i className={`status-${index}`} >{index === 0 ? <LoaderCircle className="is-spin" /> : index === 1 ? <CircleAlert /> : <Check />}</i><span><b>{item.title}</b><small>{item.type} · {item.time}</small></span></button>)}</aside>

      <main className="task-context"><header><div><small>{current.type}</small><h1>{current.title}</h1></div><span className={`task-status status-${task}`}>{current.status}</span><button onClick={() => setToast("任务操作菜单已打开")}><MoreHorizontal /></button></header><section className="task-thread"><div className="task-request"><i>于</i><article><small>任务输入</small><p>请调研智元新创，重点关注公司业务、人才优势、核心团队和招聘方向。</p></article></div>{events.map((event, index) => <motion.div className="task-event" key={`${event}-${index}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><i>{index === events.length - 1 && task === 0 ? <LoaderCircle className="is-spin" /> : <Check />}</i><article><small>{index === events.length - 1 && task === 0 ? "正在处理" : "已完成"}</small><p>{event}</p>{index === 0 && <button onClick={() => setToast("已展开读取内容")}>查看读取内容<ArrowRight /></button>}</article></motion.div>)}</section><footer><textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="补充信息或调整要求" onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); send(); } }} /><div><button onClick={() => setToast("已打开附件选择")}><Upload /></button><span>Agent 会在下一步读取补充内容</span><button className="task-send" onClick={send} disabled={!message.trim()}><Send /></button></div></footer></main>

      <aside className="task-output"><header><div><small>交付结果</small><h2>公司资料草稿</h2></div><FileCheck2 /></header><section><span>状态</span><strong>已生成，可查看</strong><p>包含公司简介、融资情况、人才优势、面试流程、地点与业务等字段。</p><dl><div><dt>信息字段</dt><dd>12 项</dd></div><div><dt>证据来源</dt><dd>9 个</dd></div><div><dt>需要确认</dt><dd>3 项</dd></div></dl></section><button onClick={() => setToast("已打开公司草稿")}>查看公司草稿<ArrowRight /></button><div className="task-output-note"><CircleAlert /><span><b>需要人工确认</b><small>草稿不会直接写入公司资料</small></span></div></aside>
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
