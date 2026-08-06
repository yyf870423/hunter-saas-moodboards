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
  const [index, setIndex] = useState(0);
  const [resolved, setResolved] = useState([]);
  const [toast, setToast] = useState("");
  const suggestion = suggestions[index];
  const decide = (accepted) => { setResolved([...new Set([...resolved, index])]); setToast(accepted ? "建议已采纳并等待保存" : "建议已忽略"); if (index < suggestions.length - 1) setIndex(index + 1); };
  return (
    <div className="copilot-dashboard">
      <aside className="copilot-sidebar"><div><Sparkles /><b>Hunter</b></div><nav>{["候选人", "岗位", "公司", "Agent"].map((item, idx) => <button key={item} className={idx === 0 ? "is-active" : ""} onClick={() => setToast(`已切换到${item}`)}>{item}</button>)}</nav><span>于</span></aside>
      <main className="copilot-main"><header><div><small>候选人详情</small><h1>林昊</h1><p>具身智能算法负责人 · 穹境机器人</p></div><label><Search /><input placeholder="搜索候选人字段" /></label><button onClick={() => setToast("候选人编辑器已打开")}>编辑资料</button></header><section className="copilot-profile"><div className="copilot-person"><i>林</i><div><h2>林昊</h2><p>具身智能算法负责人</p><span>北京 · 8 年经验</span></div></div><dl><div><dt>当前公司</dt><dd>穹境机器人</dd></div><div><dt>最高学历</dt><dd>博士</dd></div><div><dt>行业</dt><dd>机器人、人工智能</dd></div><div><dt>当前流程</dt><dd>技术复试</dd></div></dl><article><h3>项目经历</h3><p>负责具身智能基础模型、数据闭环和策略学习，带领团队完成从研究到产品验证的多轮迭代。</p></article></section></main>

      <aside className="copilot-panel"><header><div><BrainCircuit /><span><small>智能副驾</small><h2>3 条资料建议</h2></span></div><button onClick={() => setToast("建议面板已收起")}><X /></button></header><div className="copilot-progress"><i><em style={{ width: `${((resolved.length) / suggestions.length) * 100}%` }} /></i><span>{resolved.length} / {suggestions.length} 已处理</span></div><AnimatePresence mode="wait"><motion.article key={index} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}><span>建议更新 · {suggestion.field}</span><div><small>当前内容</small><p>{suggestion.before}</p></div><div className="is-suggested"><small>建议内容</small><p>{suggestion.after}</p></div><section><ShieldCheck /><p>{suggestion.reason}</p></section><footer><em>{suggestion.confidence}% 可信</em><button onClick={() => decide(false)}><ThumbsDown />忽略</button><button onClick={() => decide(true)}><ThumbsUp />采纳</button></footer></motion.article></AnimatePresence><button className="copilot-all" onClick={() => setToast("已打开全部建议")}>查看全部建议<ArrowRight /></button></aside>
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
