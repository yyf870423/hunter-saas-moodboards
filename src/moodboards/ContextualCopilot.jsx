import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  ArrowRight, BrainCircuit, CalendarDays, Check, ChevronDown, CircleAlert,
  FileSearch, LoaderCircle, MessageSquareText, Plus, RefreshCw, Search,
  ShieldCheck, Sparkles, ThumbsDown, ThumbsUp, Upload, UserRound, X,
} from "lucide-react";
import { candidates } from "../data/boards";

const suggestions = [
  { field: "当前职位", before: "算法工程师", after: "具身智能算法负责人", reason: "候选人主页与最近公开资料均显示已负责团队。", confidence: 92 },
  { field: "技能标签", before: "机器人学习", after: "VLA、机器人学习、多模态", reason: "近期论文与项目经历持续覆盖 VLA 和多模态动作生成。", confidence: 86 },
  { field: "公开链接", before: "暂无", after: "个人主页、OpenReview", reason: "两个来源均能与候选人身份交叉确认。", confidence: 84 },
];

export function ContextualCopilotDashboard() {
  const [toast, setToast] = useState("");
  const [scope, setScope] = useState("待审核");
  return (
    <div className="copilot-dashboard copilot-overview">
      <aside className="copilot-sidebar"><div><Sparkles /><b>Hunter</b></div><nav>{["智能概览", "候选人", "岗位", "公司", "Agent"].map((item, idx) => <button key={item} className={idx === 0 ? "is-active" : ""} onClick={() => setToast(`已切换到${item}`)}>{item}</button>)}</nav><span>于</span></aside>
      <main className="copilot-overview-main"><header><div><small>INTERCOM COPILOT × SANA · ASSISTANCE</small><h1>智能建议概览</h1><p>集中查看建议质量、待审核内容和采纳后的业务影响。</p></div><label><Search /><input placeholder="搜索建议或业务对象" /></label><button onClick={() => setToast("建议策略已打开")}><BrainCircuit />建议策略</button></header>
        <section className="copilot-overview-metrics">{[["待审核建议", "12", "其中 4 条高优先"], ["本周采纳", "38", "采纳率 76%"], ["避免重复写入", "9", "代码门禁拦截"], ["平均可信度", "87%", "过去 30 天"]].map(([label, value, note], index) => <article key={label} className={`tone-${index}`}><span>{label}</span><strong>{value}</strong><small>{note}</small></article>)}</section>
        <div className="copilot-overview-grid"><section className="copilot-suggestion-queue"><header><div><h2>待审核建议</h2><span>按可信度和影响排序</span></div><nav>{["待审核", "已采纳", "已忽略"].map(item => <button key={item} className={scope === item ? "is-active" : ""} onClick={() => setScope(item)}>{item}</button>)}</nav></header>{suggestions.map((item, index) => <article key={item.field}><i className={`tone-${index}`}><Sparkles /></i><span><small>候选人 · 林昊 · {item.field}</small><b>{item.after}</b><p>{item.reason}</p></span><em>{item.confidence}%</em><div><button onClick={() => setToast(`${item.field}建议已忽略`)}><ThumbsDown />忽略</button><button onClick={() => setToast(`${item.field}建议已采纳`)}><ThumbsUp />采纳</button></div></article>)}</section>
          <aside className="copilot-impact"><header><h2>建议影响</h2><span>本周</span></header>{[["候选人资料", 18, "+12%"], ["岗位解析", 9, "+5%"], ["公司资料", 7, "+8%"]].map(([label, value, change]) => <button key={label} onClick={() => setToast(`已打开${label}建议`)}><span><b>{label}</b><small>{value} 条已采纳</small></span><em>{change}</em><ArrowRight /></button>)}<section><ShieldCheck /><span><b>所有建议均通过代码门禁</b><small>非法结构不会进入审核和写库流程</small></span></section></aside>
        </div>
      </main>
      <AnimatePresence>{toast && <motion.div className="copilot-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function ContextualCopilotComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("待审核");
  const [motionStep, setMotionStep] = useState(1);
  const [tags, setTags] = useState(["资料建议", "高可信"]);
  const [reviewMode, setReviewMode] = useState("逐条审核");
  const [threshold, setThreshold] = useState(60);
  const notify = (text) => setToast(text);
  const apply = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("建议已应用"); }, 650); };
  return (
    <div className="copilot-components">
      <header><div><small>SHADCN/BASE UI × INTERCOM COPILOT × SANA</small><h1>上下文建议组件</h1><p>建议紧邻业务字段，依据、采纳和拒绝均可见。</p></div><button className="copilot-primary" onClick={apply} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Sparkles />}{loading ? "应用中" : "应用建议"}</button></header>
      <section className="copilot-actions"><button className="copilot-primary" onClick={() => notify("已生成新建议")}><Sparkles />生成建议</button><button onClick={() => setDrawer(true)}><FileSearch />查看依据</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>建议操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="copilot-menu"><DropdownMenu.Item onSelect={() => notify("建议已标记待定")}>标记待定</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("建议摘要已复制")}>复制摘要</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("建议已拒绝")}>拒绝建议</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("拒绝建议需要确认")}>拒绝</button><button disabled>已应用</button></section>

      <div className="copilot-spec-grid"><section className="copilot-form"><header><h2>建议配置</h2><span>上下文输入</span></header><div>
        <label><span>搜索建议</span><div className="copilot-input"><Search /><input placeholder="字段、来源或候选人" /></div></label>
        <label><span>建议类型</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="copilot-select">候选人资料<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="copilot-menu">{["候选人资料", "岗位资料", "公司资料"].map(item => <DropdownMenu.Item key={item} onSelect={() => notify(`建议类型：${item}`)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
        <label className="is-error"><span>业务对象</span><input placeholder="请选择对象" /><small><CircleAlert />需要选择一个业务对象</small></label>
        <label><span>审核日期</span><Popover.Root><Popover.Trigger asChild><button className="copilot-select"><CalendarDays />今天<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="copilot-calendar"><b>审核日期</b>{["今天", "明天", "本周内"].map(item => <button key={item} onClick={() => notify(item)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
        <label className="span-2"><span>建议标签</span><div className="copilot-tags">{tags.map(tag => <em key={tag}>{tag}<button onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "需确认"])}><Plus />添加</button></div></label>
        <label className="span-2"><span>补充要求</span><textarea defaultValue="保留来源证据，不覆盖用户手动维护的信息。" /></label>
        <label className="span-2"><span>补充材料</span><button className="copilot-upload" onClick={() => notify("已打开材料上传")}><Upload /><span><b>上传候选人相关资料</b><small>用于补充当前上下文</small></span></button></label>
      </div></section><aside className="copilot-preferences"><header><h2>建议策略</h2></header><button className="copilot-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>必须显示来源</b><small>没有来源不进入审核</small></span></button><div className="copilot-switch"><span><b>隐藏重复建议</b><small>前后相同不展示</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div><div className="copilot-radio"><span>审核方式</span>{["逐条审核", "批量审核"].map((item) => <button key={item} onClick={() => { setReviewMode(item); notify(`审核方式：${item}`); }}><i className={reviewMode === item ? "is-active" : ""}>{reviewMode === item && <em />}</i>{item}</button>)}</div><label className="copilot-slider"><span><b>参考阈值</b><strong>{threshold}</strong></span><Slider.Root value={[threshold]} onValueChange={([value]) => setThreshold(value)}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="参考阈值" /></Slider.Root></label></aside></div>

      <section className="copilot-data"><header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["待审核", "已采纳", "已忽略"].map(item => <Tabs.Trigger value={item} key={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("已重新生成建议")}><RefreshCw />重新生成</button></header>{suggestions.map((item) => <article className="copilot-data-row" key={item.field}><header><span><Sparkles />{item.field}</span><em>{item.confidence}% 可信</em></header><div><span><small>当前</small><b>{item.before}</b></span><ArrowRight /><span className="is-new"><small>建议</small><b>{item.after}</b></span></div><p><ShieldCheck />{item.reason}</p><footer><button onClick={() => notify("建议已忽略")}><ThumbsDown />忽略</button><button onClick={() => notify("建议已采纳")}><ThumbsUp />采纳</button></footer></article>)}<footer><span>1–3 / 12</span><button onClick={() => notify("已进入下一页")}>下一页</button></footer></section>

      <section className="copilot-motion"><header><div><small>BASE UI STATE × FLUENT ELEVATION</small><h2>建议反馈</h2></div><nav>{["建议出现", "依据展开", "采纳合并", "拒绝收起"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header><div><motion.article key={motionStep} initial={{ opacity: 0, scale: .97, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}><i><Sparkles /></i><span><small>当前职位</small><b>{["", "建议在业务字段旁出现", "来源依据展开但不打断阅读", "采纳后内容平稳合并", "拒绝后建议收起并留下状态"][motionStep]}</b></span><Check /></motion.article></div></section>

      <Dialog.Root><Dialog.Trigger asChild><button className="copilot-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="copilot-overlay" /><Dialog.Content className="copilot-modal"><Dialog.Title>应用 3 条资料建议</Dialog.Title><Dialog.Description>系统会更新候选人字段，并保留建议来源和原值。</Dialog.Description><div><ShieldCheck /><span><b>3 条建议通过门禁</b><small>不会覆盖用户手动锁定字段</small></span></div><footer><Dialog.Close asChild><button>取消</button></Dialog.Close><Dialog.Close asChild><button className="copilot-primary" onClick={() => notify("3 条建议已应用")}>确认应用</button></Dialog.Close></footer><Dialog.Close asChild><button className="copilot-close"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="copilot-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="copilot-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><div><small>建议依据</small><h2>当前职位更新</h2></div><button onClick={() => setDrawer(false)}><X /></button></header><p>候选人个人主页与最近公开资料均显示已负责具身智能算法团队。</p><dl><div><dt>来源数量</dt><dd>2</dd></div><div><dt>可信度</dt><dd>92%</dd></div><div><dt>字段影响</dt><dd>当前职位</dd></div></dl><button className="copilot-primary" onClick={() => notify("已打开完整证据")}>查看完整证据</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="copilot-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
