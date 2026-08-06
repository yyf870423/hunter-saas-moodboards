import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  Archive, ArrowRight, CalendarDays, Check, ChevronDown, CircleAlert, Clock3, FileText,
  Inbox, LoaderCircle, Mail, MessageSquareText, MoreHorizontal, Paperclip,
  Phone, Plus, Search, Send, Smile, Upload, UserRound, UsersRound, X,
} from "lucide-react";
import { candidates } from "../data/boards";

const threads = [
  { name: "林昊", role: "具身智能算法负责人", preview: "周三下午可以，麻烦先发一下岗位资料。", time: "11:42", unread: 2 },
  { name: "周雨澄", role: "VLA 研究员", preview: "我比较关注团队的研究方向和规模。", time: "10:18", unread: 0 },
  { name: "陈松", role: "感知算法专家", preview: "这周出差，下周一可以电话沟通。", time: "昨天", unread: 0 },
];

export function ConversationDeskDashboard() {
  const [toast, setToast] = useState("");
  const [scope, setScope] = useState("全部");

  return (
    <div className="inbox-dashboard inbox-overview">
      <aside className="inbox-appbar"><b>H</b>{[Inbox, UsersRound, CalendarDays, FileText].map((Icon, index) => <button key={index} className={index === 0 ? "is-active" : ""} onClick={() => setToast(["收件箱", "联系人", "日程", "资料"][index])}><Icon /></button>)}<span>于</span></aside>
      <main className="inbox-overview-main">
        <header className="inbox-overview-head"><div><small>FRONT × INTERCOM · COMMUNICATION</small><h1>沟通工作台</h1><p>统一查看待回复会话、沟通节奏和下一步行动。</p></div><label><Search /><input placeholder="搜索候选人或会话" /></label><button onClick={() => setToast("新会话窗口已打开")}><Plus />新建会话</button></header>
        <section className="inbox-overview-metrics">{[["待回复", "12", "其中 4 条超过 2 小时"], ["今日会话", "36", "较昨日 +8"], ["已安排沟通", "9", "未来 7 天"], ["平均响应", "18 分钟", "目标 30 分钟内"]].map(([label, value, note], index) => <article key={label} className={`tone-${index}`}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>
        <section className="inbox-response-band"><header><div><h2>响应节奏</h2><span>过去 8 小时</span></div><nav>{["全部", "未读", "超时"].map(item => <button key={item} className={scope === item ? "is-active" : ""} onClick={() => setScope(item)}>{item}</button>)}</nav></header><div>{[42, 58, 34, 72, 65, 88, 76, 92].map((value, index) => <i key={index} style={{ height: `${value}%` }}><span>{index + 9}:00</span></i>)}</div></section>
        <div className="inbox-overview-grid"><section className="inbox-overview-threads"><header><div><h2>优先会话</h2><span>按等待时间排序</span></div><button onClick={() => setToast("已打开全部会话")}>查看全部<ArrowRight /></button></header>{threads.map((thread, index) => <button key={thread.name} onClick={() => setToast(`已打开与${thread.name}的会话`)}><i>{thread.name[0]}</i><span><b>{thread.name}</b><small>{thread.role}</small><p>{thread.preview}</p></span><div><time>{thread.time}</time>{thread.unread > 0 && <em>{thread.unread} 条未读</em>}</div><ArrowRight /></button>)}</section><aside className="inbox-overview-actions"><header><h2>下一步行动</h2><span>5 项</span></header>{[["安排候选人沟通", "林昊 · 周三下午", CalendarDays], ["发送岗位资料", "周雨澄 · 今天", Send], ["跟进客户反馈", "陈松 · 已等待 1 天", Clock3]].map(([title, meta, Icon]) => <button key={title} onClick={() => setToast(`${title}已完成`)}><i><Icon /></i><span><b>{title}</b><small>{meta}</small></span><Check /></button>)}<footer><MessageSquareText /><p>完成行动后，相关会话和候选人状态会同步更新。</p></footer></aside></div>
      </main>
      <AnimatePresence>{toast && <motion.div className="inbox-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function ConversationDeskComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("全部会话");
  const [motionStep, setMotionStep] = useState(1);
  const [tags, setTags] = useState(["重点候选人", "本周跟进"]);
  const [ownerMode, setOwnerMode] = useState("我负责");
  const [priority, setPriority] = useState(65);
  const notify = (text) => setToast(text);
  const send = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("消息已发送"); }, 700); };
  return (
    <div className="inbox-components">
      <header><div><small>MATERIAL 3 × FRONT × INTERCOM</small><h1>沟通与收件箱组件</h1><p>会话、联系人上下文和下一步动作保持在同一工作区。</p></div><button className="inbox-primary" onClick={send} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Send />}{loading ? "发送中" : "发送消息"}</button></header>
      <section className="inbox-actions"><button className="inbox-primary" onClick={() => notify("已创建新会话")}><Plus />新建会话</button><button onClick={() => setDrawer(true)}><UserRound />联系人详情</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>会话操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="inbox-menu"><DropdownMenu.Item onSelect={() => notify("会话已标为未读")}>标为未读</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("会话已分配")}>分配给同事</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("会话已归档")}>归档会话</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("归档需要确认")}><Archive />归档</button><button disabled>已关闭</button></section>

      <div className="inbox-spec-grid">
        <section className="inbox-form"><header><h2>消息与联系人</h2><span>表单状态</span></header><div>
          <label><span>搜索会话</span><div className="inbox-input"><Search /><input placeholder="姓名、公司或消息内容" /></div></label>
          <label><span>消息渠道</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="inbox-select">站内消息<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="inbox-menu">{["站内消息", "邮件", "短信"].map(item => <DropdownMenu.Item key={item} onSelect={() => notify(`消息渠道：${item}`)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
          <label className="is-error"><span>接收邮箱</span><input defaultValue="linhao@" /><small><CircleAlert />请输入完整邮箱地址</small></label>
          <label><span>预约发送</span><Popover.Root><Popover.Trigger asChild><button className="inbox-select"><CalendarDays />今天 16:00<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="inbox-calendar"><b>发送时间</b>{["立即发送", "今天 16:00", "明天 09:30"].map(item => <button key={item} onClick={() => notify(item)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
          <label className="span-2"><span>会话标签</span><div className="inbox-tags">{tags.map(tag => <em key={tag}>{tag}<button onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "待安排"])}><Plus />添加</button></div></label>
          <label className="span-2"><span>消息内容</span><textarea defaultValue="你好，岗位团队已经补充了更完整的信息，方便本周安排一次沟通吗？" /></label>
          <label className="span-2"><span>附件</span><button className="inbox-upload" onClick={() => notify("已打开附件选择")}><Upload /><span><b>添加岗位资料或附件</b><small>PDF、DOCX、图片</small></span></button></label>
        </div></section>
        <aside className="inbox-preferences"><header><h2>发送偏好</h2></header><button className="inbox-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>保存到沟通记录</b><small>候选人详情中同步显示</small></span></button><div className="inbox-switch"><span><b>送达提醒</b><small>消息送达后通知</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div><div className="inbox-radio"><span>回复归属</span>{["我负责", "团队共享"].map((item) => <button key={item} onClick={() => { setOwnerMode(item); notify(`回复归属：${item}`); }}><i className={ownerMode === item ? "is-active" : ""}>{ownerMode === item && <em />}</i>{item}</button>)}</div><label className="inbox-slider"><span><b>提醒优先级</b><strong>{priority}</strong></span><Slider.Root value={[priority]} onValueChange={([value]) => setPriority(value)}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="提醒优先级" /></Slider.Root></label></aside>
      </div>

      <section className="inbox-data"><header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["全部会话", "未读", "待跟进"].map(item => <Tabs.Trigger value={item} key={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("筛选器已打开")}><Search />筛选</button></header>{threads.map((thread, index) => <button className="inbox-data-row" key={thread.name} onClick={() => setDrawer(true)}><i>{thread.name[0]}</i><span><b>{thread.name}<time>{thread.time}</time></b><small>{thread.role}</small><p>{thread.preview}</p></span>{index === 0 && <em>未读</em>}</button>)}<footer><span>1–3 / 12</span><button onClick={() => notify("已进入下一页")}>下一页</button></footer></section>

      <section className="inbox-motion"><header><div><small>MATERIAL MOTION PHYSICS</small><h2>会话反馈</h2></div><nav>{["消息进入", "输入状态", "会话切换", "日程确认"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header><div><motion.article key={motionStep} initial={{ opacity: 0, x: motionStep === 3 ? 28 : 0, y: motionStep === 1 ? 18 : 0, scale: motionStep === 2 ? .94 : 1 }} animate={{ opacity: 1, x: 0, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 360, damping: 28 }}><i>林</i><span><small>林昊 · 刚刚</small><b>{["", "新消息平稳进入当前会话", "输入状态提示正在响应", "切换会话时保留列表位置", "沟通日程已确认"][motionStep]}</b></span><Check /></motion.article></div></section>

      <Dialog.Root><Dialog.Trigger asChild><button className="inbox-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="inbox-overlay" /><Dialog.Content className="inbox-modal"><Dialog.Title>发送岗位资料</Dialog.Title><Dialog.Description>消息和附件将发送给林昊，并保存到候选人沟通记录。</Dialog.Description><div><Mail /><span><b>1 条消息 · 1 个附件</b><small>预计立即发送</small></span></div><footer><Dialog.Close asChild><button>取消</button></Dialog.Close><Dialog.Close asChild><button className="inbox-primary" onClick={() => notify("岗位资料已发送")}>确认发送</button></Dialog.Close></footer><Dialog.Close asChild><button className="inbox-close"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="inbox-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="inbox-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><i>林</i><div><small>联系人</small><h2>林昊</h2></div><button onClick={() => setDrawer(false)}><X /></button></header><p>具身智能算法负责人，周三下午可安排下一轮沟通。</p><dl><div><dt>最近联系</dt><dd>今天</dd></div><div><dt>当前阶段</dt><dd>技术复试</dd></div><div><dt>未读消息</dt><dd>2</dd></div></dl><button className="inbox-primary" onClick={() => notify("已打开候选人详情")}>查看候选人详情</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="inbox-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
