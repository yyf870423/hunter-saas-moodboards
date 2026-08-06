import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  ArrowRight, CalendarDays, Check, ChevronDown, CircleAlert, FileCheck2,
  FileSearch, History, LoaderCircle, Plus, Search, ShieldAlert, ShieldCheck,
  Sparkles, Upload, UserRoundCheck, X,
} from "lucide-react";

const decisions = [
  { title: "更新林昊当前职位", type: "候选人信息补全", risk: "低风险", confidence: 92, state: "待决定" },
  { title: "导入 18 篇具身智能论文", type: "学术搜索", risk: "需检查", confidence: 86, state: "待决定" },
  { title: "覆盖岗位软性要求", type: "岗位解析", risk: "中风险", confidence: 81, state: "待决定" },
];

export function EvidenceReviewDashboard() {
  const [selected, setSelected] = useState(0);
  const [toast, setToast] = useState("");
  const [decision, setDecision] = useState("待决定");
  const current = decisions[selected];
  const decide = (value) => { setDecision(value); setToast(value === "已批准" ? "决策已批准，等待写入" : "决策已拒绝并保留原因"); };
  return (
    <div className="decision-dashboard">
      <header className="decision-topbar"><div><ShieldCheck /><b>Hunter Decisions</b></div><nav>{["待决定", "已完成", "规则"].map((item, index) => <button key={item} className={index === 0 ? "is-active" : ""} onClick={() => setToast(`已切换到${item}`)}>{item}</button>)}</nav><label><Search /><input placeholder="搜索决策" /></label><span>3 项待处理</span></header>
      <main className="decision-main"><aside className="decision-queue"><header><div><small>审核队列</small><h1>待决定事项</h1></div><span>{decisions.length}</span></header>{decisions.map((item, index) => <button key={item.title} className={selected === index ? "is-active" : ""} onClick={() => { setSelected(index); setDecision("待决定"); }}><i className={index === 1 ? "is-warning" : ""}>{index === 1 ? <ShieldAlert /> : <Sparkles />}</i><span><small>{item.type}</small><b>{item.title}</b><em>{item.risk} · {item.confidence}% 可信</em></span><ArrowRight /></button>)}</aside>

        <section className="decision-review"><header><div><small>{current.type}</small><h2>{current.title}</h2></div><span className={decision === "已批准" ? "is-approved" : decision === "已拒绝" ? "is-rejected" : ""}>{decision}</span></header><div className="decision-compare"><article><span>当前内容</span><p>算法工程师</p></article><ArrowRight /><article className="is-proposed"><span>建议内容</span><p>具身智能算法负责人</p></article></div><section className="decision-reason"><header><ShieldCheck /><h3>建议依据</h3><em>{current.confidence}% 可信</em></header><p>候选人个人主页和最近公开资料均显示其已负责具身智能算法团队。两个来源的姓名、公司和项目经历能够交叉确认。</p></section><footer><button onClick={() => decide("已拒绝")}>拒绝建议</button><button onClick={() => setToast("已打开完整证据")}>查看完整证据</button><button onClick={() => decide("已批准")}><Check />批准并应用</button></footer></section>

        <aside className="decision-evidence"><header><h2>证据与影响</h2><span>2 个来源</span></header>{[["个人主页", "公开资料", "直接支持"], ["OpenReview", "论文与任职", "交叉支持"]].map(([title, meta, level]) => <button key={title} onClick={() => setToast(`已打开证据：${title}`)}><FileSearch /><span><b>{title}</b><small>{meta}</small></span><em>{level}</em></button>)}<section><h3>写入影响</h3><dl><div><dt>更新字段</dt><dd>当前职位</dd></div><div><dt>保留原值</dt><dd>是</dd></div><div><dt>触发关联</dt><dd>重新匹配</dd></div></dl></section><div className="decision-receipt"><History /><span><b>操作会留下记录</b><small>可查看操作人、时间和原值</small></span></div></aside>
      </main>
      <AnimatePresence>{toast && <motion.div className="decision-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function EvidenceReviewComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("待决定");
  const [motionStep, setMotionStep] = useState(1);
  const [tags, setTags] = useState(["信息补全", "低风险"]);
  const [riskMode, setRiskMode] = useState("严格");
  const [confidence, setConfidence] = useState(80);
  const notify = (text) => setToast(text);
  const approve = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("决策已批准并写入"); }, 750); };
  return (
    <div className="decision-components">
      <header><div><small>IBM CARBON × STRIPE × PERSONA</small><h1>可信决策组件</h1><p>建议、证据、风险、写入影响和操作回执在同一上下文中。</p></div><button className="decision-primary" onClick={approve} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Check />}{loading ? "写入中" : "批准并应用"}</button></header>
      <section className="decision-actions"><button className="decision-primary" onClick={() => notify("决策已批准")}><Check />批准</button><button onClick={() => setDrawer(true)}><FileSearch />查看证据</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>决策操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="decision-menu"><DropdownMenu.Item onSelect={() => notify("已请求补充证据")}>请求补充证据</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("决策摘要已导出")}>导出决策摘要</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("建议已拒绝")}>拒绝建议</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("拒绝建议需要填写原因")}>拒绝</button><button disabled>已写入</button></section>

      <div className="decision-spec-grid"><section className="decision-form"><header><h2>决策信息</h2><span>校验与影响</span></header><div>
        <label><span>搜索决策</span><div className="decision-input"><Search /><input placeholder="业务对象、字段或来源" /></div></label>
        <label><span>决策类型</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="decision-select">候选人资料<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="decision-menu">{["候选人资料", "岗位资料", "学术论文"].map(item => <DropdownMenu.Item key={item} onSelect={() => notify(`决策类型：${item}`)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
        <label className="is-error"><span>拒绝原因</span><input placeholder="请输入原因" /><small><CircleAlert />拒绝时必须填写原因</small></label>
        <label><span>处理日期</span><Popover.Root><Popover.Trigger asChild><button className="decision-select"><CalendarDays />今天<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="decision-calendar"><b>处理日期</b>{["今天", "明天", "本周内"].map(item => <button key={item} onClick={() => notify(item)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
        <label className="span-2"><span>决策标签</span><div className="decision-tags">{tags.map(tag => <em key={tag}>{tag}<button onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "需复核"])}><Plus />添加</button></div></label>
        <label className="span-2"><span>处理说明</span><textarea defaultValue="两个公开来源能够交叉确认候选人的当前职位，可批准更新。" /></label>
        <label className="span-2"><span>补充证据</span><button className="decision-upload" onClick={() => notify("已打开证据上传")}><Upload /><span><b>上传补充证据</b><small>写入前会再次校验</small></span></button></label>
      </div></section><aside className="decision-preferences"><header><h2>决策门禁</h2></header><button className="decision-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>保留原始值</b><small>支持后续追溯</small></span></button><div className="decision-switch"><span><b>写入后重新关联</b><small>刷新匹配和去重</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div><div className="decision-radio"><span>风险处理</span>{["严格", "标准"].map((item) => <button key={item} onClick={() => { setRiskMode(item); notify(`风险处理：${item}`); }}><i className={riskMode === item ? "is-active" : ""}>{riskMode === item && <em />}</i>{item}</button>)}</div><label className="decision-slider"><span><b>最低可信度</b><strong>{confidence}</strong></span><Slider.Root value={[confidence]} onValueChange={([value]) => setConfidence(value)}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="最低可信度" /></Slider.Root></label></aside></div>

      <section className="decision-data"><header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["待决定", "已批准", "已拒绝"].map(item => <Tabs.Trigger value={item} key={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("历史记录已打开")}><History />操作记录</button></header>{decisions.map(item => <button className="decision-data-row" key={item.title} onClick={() => setDrawer(true)}><i className={item.risk === "需检查" ? "is-warning" : ""}>{item.risk === "需检查" ? <ShieldAlert /> : <ShieldCheck />}</i><span><b>{item.title}</b><small>{item.type}</small></span><em>{item.risk}</em><strong>{item.confidence}%</strong><ArrowRight /></button>)}<footer><span>1–3 / 16</span><button onClick={() => notify("已进入下一页")}>下一页</button></footer></section>

      <section className="decision-motion"><header><div><small>CARBON PRODUCTIVE MOTION × STRIPE CONFIRMATION</small><h2>决策反馈</h2></div><nav>{["证据汇聚", "风险确认", "决策提交", "写入回执"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header><div><motion.article key={motionStep} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}><i>{motionStep === 4 ? <FileCheck2 /> : <ShieldCheck />}</i><span><small>候选人资料更新</small><b>{["", "两个来源进入同一决策上下文", "风险和写入影响完成确认", "决策提交后立即禁用重复操作", "写入完成并生成可追溯回执"][motionStep]}</b></span><Check /></motion.article></div></section>

      <Dialog.Root><Dialog.Trigger asChild><button className="decision-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="decision-overlay" /><Dialog.Content className="decision-modal"><div className="decision-modal-icon"><ShieldCheck /></div><Dialog.Title>批准并应用资料更新</Dialog.Title><Dialog.Description>当前职位将更新为“具身智能算法负责人”，原始值和证据会保留。</Dialog.Description><section><span><b>写入字段</b><em>当前职位</em></span><span><b>后续动作</b><em>重新匹配</em></span></section><footer><Dialog.Close asChild><button>取消</button></Dialog.Close><Dialog.Close asChild><button className="decision-primary" onClick={() => notify("更新已写入并生成回执")}>确认写入</button></Dialog.Close></footer><Dialog.Close asChild><button className="decision-close"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="decision-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="decision-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><div><small>完整证据</small><h2>当前职位更新</h2></div><button onClick={() => setDrawer(false)}><X /></button></header><p>候选人个人主页和 OpenReview 资料均显示其当前负责具身智能算法团队。</p><dl><div><dt>来源数量</dt><dd>2</dd></div><div><dt>可信度</dt><dd>92%</dd></div><div><dt>风险</dt><dd>低</dd></div></dl><button className="decision-primary" onClick={() => notify("已打开原始来源")}>打开原始来源</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="decision-toast" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
