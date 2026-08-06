import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  ArrowUpRight, Building2, CalendarDays, Check, ChevronDown, CircleAlert,
  ClipboardCheck, Clock3, Download, FileText, Filter, LoaderCircle, Mail,
  MoreHorizontal, Plus, Search, Send, Upload, UserPlus, UsersRound, X,
} from "lucide-react";
import { candidates, jobs } from "../data/boards";

export function ClientRoomDashboard() {
  const [view, setView] = useState("客户组合");
  const [client, setClient] = useState(0);
  const [toast, setToast] = useState("");
  const clients = [
    { name: "智元新创", owner: "周宁", roles: 6, progress: 18, health: "合作稳定", note: "本周需完成算法负责人 shortlist" },
    { name: "穹境机器人", owner: "林曦", roles: 4, progress: 11, health: "需要关注", note: "两位候选人等待客户反馈" },
    { name: "逐光科技", owner: "陈航", roles: 3, progress: 9, health: "合作稳定", note: "感知专家进入终面" },
  ];
  const current = clients[client];

  return (
    <div className="client-dashboard">
      <aside className="client-sidebar">
        <div className="client-brand"><b>Hunter</b><span>Client Service</span></div>
        <nav>{["客户组合", "服务承诺", "联系人", "交付记录"].map(item => <button key={item} className={view === item ? "is-active" : ""} onClick={() => { setView(item); setToast(`已切换到${item}`); }}>{item}</button>)}</nav>
        <footer><i>于</i><span><b>于一凡</b><small>高级顾问</small></span></footer>
      </aside>
      <main className="client-main">
        <header className="client-head"><div><small>客户服务 / {view}</small><h1>客户合作工作台</h1><p>清楚掌握承诺、推进状态和下一次关键沟通。</p></div><button onClick={() => setToast("新客户表单已打开")}><Plus />新建客户</button></header>

        <section className="client-summary">
          <article className="client-feature"><span>本周优先客户</span><h2>{current.name}</h2><p>{current.note}</p><footer><button onClick={() => setToast("已打开客户详情")}>打开客户详情<ArrowUpRight /></button><div><small>客户负责人</small><b>{current.owner}</b></div></footer></article>
          <article><span>合作岗位</span><strong>{current.roles}</strong><small>2 个本周新增</small></article>
          <article><span>流程中候选人</span><strong>{current.progress}</strong><small>5 人等待反馈</small></article>
          <article><span>服务状态</span><em>{current.health}</em><small>最近更新 34 分钟前</small></article>
        </section>

        <div className="client-grid">
          <section className="client-portfolio"><header><div><h2>客户组合</h2><span>9 家合作客户</span></div><button onClick={() => setToast("筛选器已打开")}><Filter />筛选</button></header>
            {clients.map((item, index) => <button key={item.name} className={client === index ? "is-active" : ""} onClick={() => setClient(index)}><i><Building2 /></i><span><b>{item.name}</b><small>{item.roles} 个岗位 · {item.progress} 人流程中</small></span><em>{item.health}</em><ArrowUpRight /></button>)}
          </section>
          <section className="client-commitments"><header><h2>近期承诺</h2><button onClick={() => setToast("已进入全部承诺")}>查看全部</button></header>
            {[["今天 16:00", "提交算法负责人候选人名单", "智元新创"], ["明天", "反馈两位终面候选人", "穹境机器人"], ["周五", "完成自动驾驶人才地图", "逐光科技"]].map(([time, title, company], index) => <button key={title} onClick={() => setToast(`已打开：${title}`)}><i className={index === 0 ? "is-urgent" : ""}><Clock3 /></i><span><small>{time} · {company}</small><b>{title}</b></span><ArrowUpRight /></button>)}
          </section>
          <section className="client-activity"><header><h2>最近交付</h2></header>{["推荐 3 位具身智能候选人", "更新智元新创人才地图", "完成岗位解析和关键词建议"].map((item, index) => <button key={item} onClick={() => setToast(`已打开交付：${item}`)}><Check /><span><b>{item}</b><small>{index + 1} 小时前</small></span></button>)}</section>
        </div>
      </main>
      <AnimatePresence>{toast && <motion.div className="client-toast" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function ClientRoomComponents() {
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("合作岗位");
  const [motionStep, setMotionStep] = useState(1);
  const [tags, setTags] = useState(["具身智能", "A 轮"]);
  const [contactMode, setContactMode] = useState("邮件");
  const [priority, setPriority] = useState(85);
  const notify = (message) => setToast(message);
  const save = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("客户资料已保存"); }, 700); };

  return (
    <div className="client-components">
      <header><div><small>POLARIS × ATTIO × MERCURY</small><h1>客户服务组件</h1><p>商务表单、对象关系和清晰的服务动作。</p></div><button className="client-primary" onClick={save} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Check />}{loading ? "保存中" : "保存资料"}</button></header>
      <section className="client-actions"><button className="client-primary" onClick={() => notify("已创建客户")}><Plus />新建客户</button><button onClick={() => setDrawer(true)}><Building2 />打开详情</button><DropdownMenu.Root><DropdownMenu.Trigger asChild><button>更多操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="client-menu"><DropdownMenu.Item onSelect={() => notify("已发送服务周报")}>发送服务周报</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("已导出客户资料")}>导出客户资料</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("客户已关闭")}>关闭客户</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root><button className="is-danger" onClick={() => notify("关闭合作需要确认")}>关闭合作</button><button disabled>不可编辑</button></section>

      <div className="client-spec-grid">
        <section className="client-form"><header><h2>客户资料</h2><span>基础信息</span></header><div>
          <label><span>搜索客户</span><div className="client-input"><Search /><input placeholder="公司名称或联系人" /></div></label>
          <label><span>公司名称</span><input defaultValue="智元新创" /></label>
          <label className="is-error"><span>企业邮箱</span><input defaultValue="contact@" /><small><CircleAlert />请输入完整邮箱地址</small></label>
          <label><span>合作阶段</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="client-select">正式合作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="client-menu">{["潜在客户", "洽谈中", "正式合作"].map(item => <DropdownMenu.Item key={item} onSelect={() => notify(`阶段：${item}`)}>{item}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
          <label><span>下次回访</span><Popover.Root><Popover.Trigger asChild><button className="client-select"><CalendarDays />2026-08-10<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="client-calendar"><b>安排回访</b>{["今天 16:00", "明天 10:00", "下周一 14:00"].map(item => <button key={item} onClick={() => notify(`回访时间：${item}`)}>{item}</button>)}</Popover.Content></Popover.Portal></Popover.Root></label>
          <label><span>客户标签</span><div className="client-tags">{tags.map(tag => <em key={tag}>{tag}<button onClick={() => setTags(tags.filter(item => item !== tag))}><X /></button></em>)}<button onClick={() => setTags([...tags, "重点客户"])}><Plus />添加</button></div></label>
          <label className="span-2"><span>服务备注</span><textarea defaultValue="客户重点关注具身智能算法和灵巧手结构方向。" /></label>
          <label className="span-2"><span>合作材料</span><button className="client-upload" onClick={() => notify("已打开材料上传")}><Upload /><span><b>上传合同或需求文件</b><small>PDF、DOCX，最大 20 MB</small></span></button></label>
        </div></section>

        <aside className="client-preferences"><header><h2>服务偏好</h2></header><button className="client-check" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked}><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>周报中包含候选人进展</b><small>自动汇总流程变化</small></span></button><div className="client-switch"><span><b>重要节点提醒</b><small>面试和 Offer 节点即时提醒</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled}><Switch.Thumb /></Switch.Root></div><div className="client-radio"><span>联系偏好</span>{["邮件", "飞书"].map((item) => <button key={item} onClick={() => { setContactMode(item); notify(`联系偏好：${item}`); }}><i className={contactMode === item ? "is-active" : ""}>{contactMode === item && <em />}</i>{item}</button>)}</div><label className="client-slider"><span><b>服务优先级</b><strong>{priority}</strong></span><Slider.Root value={[priority]} onValueChange={([value]) => setPriority(value)}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="服务优先级" /></Slider.Root></label></aside>
      </div>

      <section className="client-data"><header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["合作岗位", "候选人", "联系人"].map(item => <Tabs.Trigger value={item} key={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><button onClick={() => notify("已下载当前视图")}><Download />导出</button></header><div className="client-table-head"><span>名称</span><span>负责人</span><span>状态</span><span>最新动作</span><span>操作</span></div>{jobs.map((job, index) => <div className="client-row" key={job.title}><span><i><BriefcaseIcon /></i><b>{job.title}<small>{job.company}</small></b></span><span>于一凡</span><em>{index === 0 ? "优先推进" : "正常"}</em><time>今天 {10 + index}:30</time><button onClick={() => setDrawer(true)}>查看</button></div>)}<footer><span>1–3 / 6</span><div><button disabled>上一页</button><button onClick={() => notify("已进入下一页")}>下一页</button></div></footer></section>

      <section className="client-motion"><header><div><small>POLARIS RESOURCE FEEDBACK</small><h2>服务反馈</h2></div><nav>{["进入", "聚焦", "提醒", "交付"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header><div><motion.article key={motionStep} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}><i>{motionStep === 4 ? <Check /> : <Building2 />}</i><span><small>客户服务节点</small><b>{["", "新客户进入服务组合", "当前客户获得稳定焦点", "关键承诺到期前提醒", "周报已交付并留下记录"][motionStep]}</b></span><ArrowUpRight /></motion.article></div></section>

      <Dialog.Root><Dialog.Trigger asChild><button className="client-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="client-overlay" /><Dialog.Content className="client-modal"><Dialog.Title>发送客户服务周报</Dialog.Title><Dialog.Description>周报包含 6 个岗位和 18 位候选人的最新进展。</Dialog.Description><div><Mail /><span><b>接收人：周宁</b><small>zhouning@example.com</small></span></div><footer><Dialog.Close asChild><button>取消</button></Dialog.Close><Dialog.Close asChild><button className="client-primary" onClick={() => notify("服务周报已发送")}><Send />确认发送</button></Dialog.Close></footer><Dialog.Close asChild><button className="client-close"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>
      <AnimatePresence>{drawer && <><motion.div className="client-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="client-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><div><small>客户详情</small><h2>智元新创</h2></div><button onClick={() => setDrawer(false)}><X /></button></header><p>重点招聘具身智能算法、灵巧手结构和机器人平台方向。</p><dl><div><dt>合作岗位</dt><dd>6</dd></div><div><dt>流程中候选人</dt><dd>18</dd></div><div><dt>负责人</dt><dd>周宁</dd></div></dl><button className="client-primary" onClick={() => notify("已打开完整客户详情")}>打开完整详情</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="client-toast" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check /><span>{toast}</span><button onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

function BriefcaseIcon() { return <FileText />; }
