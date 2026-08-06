import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  Archive, CalendarDays, Check, ChevronDown, CircleAlert, Clock3, FileText,
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
  const [active, setActive] = useState(0);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState([]);
  const [toast, setToast] = useState("");
  const current = threads[active];
  const send = () => { if (message.trim()) { setSent([...sent, message.trim()]); setMessage(""); setToast("消息已加入发送队列"); } };

  return (
    <div className="inbox-dashboard">
      <aside className="inbox-appbar"><b>H</b>{[Inbox, UsersRound, CalendarDays, FileText].map((Icon, index) => <button key={index} className={index === 0 ? "is-active" : ""} onClick={() => setToast(["收件箱", "联系人", "日程", "资料"][index])}><Icon /></button>)}<span>于</span></aside>
      <aside className="inbox-list"><header><div><small>共享收件箱</small><h1>人才沟通</h1></div><button onClick={() => setToast("新会话窗口已打开")}><Plus /></button></header><label><Search /><input placeholder="搜索会话" /></label><nav><button className="is-active" onClick={() => setToast("正在查看全部会话")}>全部 <em>12</em></button><button onClick={() => setToast("正在查看未读会话")}>未读 <em>2</em></button></nav>{threads.map((thread, index) => <button key={thread.name} className={active === index ? "is-active" : ""} onClick={() => setActive(index)}><i>{thread.name[0]}</i><span><b>{thread.name}<time>{thread.time}</time></b><small>{thread.role}</small><p>{thread.preview}</p></span>{thread.unread > 0 && <em>{thread.unread}</em>}</button>)}</aside>

      <main className="inbox-conversation"><header><i>{current.name[0]}</i><div><h2>{current.name}</h2><p>{current.role} · 在线</p></div><button onClick={() => setToast("正在发起电话")}><Phone /></button><button onClick={() => setToast("已打开会话操作")}><MoreHorizontal /></button></header><section><time>今天</time><div className="inbox-message is-received"><p>你好，之前提到的具身智能算法负责人岗位，团队刚补充了更完整的信息。</p><small>11:31</small></div><div className="inbox-message is-sent"><p>可以的，我对团队方向有兴趣，周三下午方便沟通。</p><small>11:36 · 已读</small></div><div className="inbox-message is-received"><p>{current.preview}</p><small>{current.time}</small></div>{sent.map((item, index) => <motion.div key={`${item}-${index}`} className="inbox-message is-sent" initial={{ opacity: 0, y: 12, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }}><p>{item}</p><small>刚刚 · 发送中</small></motion.div>)}</section><footer><textarea value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} placeholder="输入消息，Enter 发送" /><div><span><button onClick={() => setToast("已打开附件选择")}><Paperclip /></button><button onClick={() => setToast("已打开表情选择")}><Smile /></button></span><button className="inbox-send" onClick={send} disabled={!message.trim()}><Send />发送</button></div></footer></main>

      <aside className="inbox-context"><header><h2>候选人信息</h2><button onClick={() => setToast("已收起信息栏")}><X /></button></header><i>{current.name[0]}</i><h3>{current.name}</h3><p>{current.role}</p><dl><div><dt>当前公司</dt><dd>穹境机器人</dd></div><div><dt>流程阶段</dt><dd>技术复试</dd></div><div><dt>最近沟通</dt><dd>今天</dd></div></dl><button onClick={() => setToast("已打开候选人详情")}>查看完整资料</button><section><h4>下一步</h4><button onClick={() => setToast("已创建沟通日程")}><CalendarDays /><span><b>安排沟通</b><small>周三下午</small></span></button></section></aside>
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
