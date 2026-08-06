import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  ArrowRight, BookOpenText, CalendarDays, Check, ChevronDown, CircleAlert,
  Clock3, FileUp, History, LoaderCircle, MessageSquareText, MoreHorizontal,
  Plus, Search, Sparkles, Upload, UserRound, X,
} from "lucide-react";
import { candidates } from "../data/boards";

const timeline = [
  { date: "今天 11:20", title: "确认可了解新的职业机会", body: "更关注团队技术自主权，希望下一份工作仍以 VLA 和机器人学习为主。", type: "沟通记录" },
  { date: "7 月 29 日", title: "公开资料新增一篇论文", body: "论文聚焦多模态动作生成，与目标岗位的研究方向高度一致。", type: "信息变化" },
  { date: "6 月 18 日", title: "加入穹境机器人", body: "负责具身智能基础模型与数据闭环，带领 8 人算法团队。", type: "职业经历" },
];

export function TalentJournalDashboard() {
  const [toast, setToast] = useState("");
  const [range, setRange] = useState("本周");

  return (
    <div className="journal-dashboard journal-overview">
      <aside className="journal-rail"><b>H</b><nav>{[BookOpenText, Search, CalendarDays, Sparkles].map((Icon, index) => <button key={index} className={index === 0 ? "is-active" : ""} onClick={() => setToast(["人才纪事", "搜索", "日程", "Agent"][index])}><Icon /></button>)}</nav><span>于</span></aside>
      <main className="journal-main journal-overview-main">
        <header className="journal-head"><div><small>NOTION × GRANOLA · TALENT JOURNAL</small><h1>人才动态概览</h1><p>集中查看人才变化、沟通节奏和待跟进事项。</p></div><div className="journal-head-actions"><nav>{["本周", "本月"].map(item => <button key={item} className={range === item ? "is-active" : ""} onClick={() => setRange(item)}>{item}</button>)}</nav><button onClick={() => setToast("新记录编辑器已打开")}><Plus />添加记录</button></div></header>
        <section className="journal-overview-metrics">{[["新增人才动态", "18", "+6"], ["需要跟进", "7", "今天 3 项"], ["重新开放机会", "4", "+2"], ["本周沟通", "26", "完成 81%"]].map(([label, value, note]) => <article key={label}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>
        <div className="journal-overview-grid">
          <section className="journal-change-feed"><header><div><h2>重要人才变化</h2><span>{range} · 12 条</span></div><button onClick={() => setToast("已打开全部人才动态")}>查看全部<ArrowRight /></button></header>{timeline.map((item, index) => <button key={item.title} onClick={() => setToast(`已打开动态：${item.title}`)}><time>{item.date}</time><i className={`tone-${index}`} /><span><small>{item.type}</small><b>{item.title}</b><p>{item.body}</p></span><ArrowRight /></button>)}</section>
          <section className="journal-talent-list"><header><div><h2>近期活跃人才</h2><span>按最近变化排序</span></div><button onClick={() => setToast("人才筛选已打开")}><Search />筛选</button></header>{candidates.map((item, index) => <button key={item.name} onClick={() => setToast(`已打开${item.name}的候选人详情`)}><i>{item.initials}</i><span><b>{item.name}</b><small>{item.role} · {item.company}</small></span><em>{["今天", "昨天", "3 天前", "本周"][index]}</em><ArrowRight /></button>)}</section>
          <aside className="journal-followup journal-overview-followup"><header><h2>今日跟进</h2><span>3 项</span></header>{[["发送岗位资料", "林昊 · 16:00 前"], ["确认下轮沟通", "周雨澄 · 今天"], ["更新职业状态", "陈松 · 今天"]].map(([title, meta], index) => <button key={title} onClick={() => setToast(`${title}已标记完成`)}><i>{index === 0 ? <MessageSquareText /> : index === 1 ? <Clock3 /> : <Check />}</i><span><b>{title}</b><small>{meta}</small></span></button>)}<div><BookOpenText /><p>本周重点：优先处理重新开放机会的人才，并保留每次沟通背景。</p></div></aside>
        </div>
      </main>
      <AnimatePresence>{toast && <motion.div className="journal-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function TalentJournalComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("全部记录");
  const [motionStep, setMotionStep] = useState(1);
  const [tags, setTags] = useState(["沟通记录", "职业变化"]);
  const [visibility, setVisibility] = useState("仅自己");
  const [importance, setImportance] = useState(70);
  const notify = (text) => setToast(text);
  const save = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("人才记录已保存"); }, 700); };
  return (
    <div className="journal-components">
      <header><div><small>SPECTRUM × NOTION × GRANOLA</small><h1>人才叙事组件</h1><p>内容块、记录流和后续行动保持连续。</p></div><button className="journal-primary" onClick={save} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Check />}{loading ? "保存中" : "保存记录"}</button></header>
      <section className="journal-actions"><button className="journal-primary" onClick={() => notify("已添加沟通记录")}><Plus />添加记录</button><button onClick={() => setDrawer(true)}><UserRound />打开人物卡</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>记录操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="journal-menu"><DropdownMenu.Item onSelect={() => notify("记录已置顶")}>置顶记录</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("记录已导出")}>导出记录</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("记录已删除")}>删除记录</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("删除需要确认")}>删除</button><button disabled>已归档</button></section>

      <div className="journal-spec-grid">
        <section className="journal-form"><header><h2>新建人才记录</h2><span>块级编辑</span></header><div>
          <label><span>搜索候选人</span><div className="journal-input"><Search /><input placeholder="姓名、公司或岗位" /></div></label>
          <label><span>记录类型</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="journal-select">沟通记录<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="journal-menu">{["沟通记录", "职业变化", "公开信息"].map(item => <DropdownMenu.Item key={item} onSelect={() => notify(`记录类型：${item}`)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
          <label className="is-error"><span>记录标题</span><input placeholder="请输入标题" /><small><CircleAlert />标题不能为空</small></label>
          <label><span>发生时间</span><Popover.Root><Popover.Trigger asChild><button className="journal-select"><CalendarDays />2026-08-06<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="journal-calendar"><b>选择时间</b>{["今天", "昨天", "自定义日期"].map(item => <button key={item} onClick={() => notify(`已选择${item}`)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
          <label className="span-2"><span>记录标签</span><div className="journal-tags">{tags.map(tag => <em key={tag}>{tag}<button onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "重要"])}><Plus />添加</button></div></label>
          <label className="span-2"><span>记录内容</span><textarea defaultValue="候选人更关注下一阶段的团队自主权和研究方向。" /></label>
          <label className="span-2"><span>相关材料</span><button className="journal-upload" onClick={() => notify("已打开材料选择器")}><Upload /><span><b>上传沟通纪要或附件</b><small>PDF、DOCX、音频</small></span></button></label>
        </div></section>
        <aside className="journal-preferences"><header><h2>记录偏好</h2></header><button className="journal-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>同步到候选人详情</b><small>保存后立即可见</small></span></button><div className="journal-switch"><span><b>创建跟进提醒</b><small>根据记录内容生成任务</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div><div className="journal-radio"><span>可见范围</span>{["仅自己", "团队"].map((item) => <button key={item} onClick={() => { setVisibility(item); notify(`可见范围：${item}`); }}><i className={visibility === item ? "is-active" : ""}>{visibility === item && <em />}</i>{item}</button>)}</div><label className="journal-slider"><span><b>重要程度</b><strong>{importance}</strong></span><Slider.Root value={[importance]} onValueChange={([value]) => setImportance(value)}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="重要程度" /></Slider.Root></label></aside>
      </div>

      <section className="journal-data"><header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["全部记录", "沟通", "职业变化"].map(item => <Tabs.Trigger value={item} key={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("历史筛选已打开")}><History />筛选历史</button></header>{timeline.map((item, index) => <button className="journal-data-row" key={item.title} onClick={() => setDrawer(true)}><time>{item.date}</time><i /><span><small>{item.type}</small><b>{item.title}</b><p>{item.body}</p></span><ArrowRight /></button>)}<footer><span>1–3 / 18</span><button onClick={() => notify("已加载更多记录")}>加载更多</button></footer></section>

      <section className="journal-motion"><header><div><small>SPECTRUM CONTENT TRANSITION</small><h2>内容变化</h2></div><nav>{["记录进入", "块展开", "人物切换", "提醒生成"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header><div><motion.article key={motionStep} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}><time>今天 11:20</time><span><small>人才记录</small><b>{["", "新记录进入时间流", "内容块展开并保留上下文", "人物档案平稳切换", "记录生成下一步提醒"][motionStep]}</b></span><Check /></motion.article></div></section>

      <Dialog.Root><Dialog.Trigger asChild><button className="journal-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="journal-overlay" /><Dialog.Content className="journal-modal"><Dialog.Title>保存人才记录</Dialog.Title><Dialog.Description>记录会同步到林昊的候选人详情，并创建一项本周跟进任务。</Dialog.Description><div><BookOpenText /><span><b>沟通记录</b><small>包含 1 项后续行动</small></span></div><footer><Dialog.Close asChild><button>取消</button></Dialog.Close><Dialog.Close asChild><button className="journal-primary" onClick={() => notify("人才记录已保存")}>确认保存</button></Dialog.Close></footer><Dialog.Close asChild><button className="journal-close"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="journal-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="journal-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><i>林</i><div><small>候选人</small><h2>林昊</h2></div><button onClick={() => setDrawer(false)}><X /></button></header><p>具身智能算法负责人，最近一次沟通确认可了解新的机会。</p><dl><div><dt>当前公司</dt><dd>穹境机器人</dd></div><div><dt>最近联系</dt><dd>今天</dd></div><div><dt>记录数量</dt><dd>18</dd></div></dl><button className="journal-primary" onClick={() => notify("已进入候选人详情")}>打开候选人详情</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="journal-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
