import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Checkbox, Dialog, DropdownMenu, Popover, Slider, Switch, Tabs } from "radix-ui";
import {
  Archive, BriefcaseBusiness, CalendarDays, Check, ChevronDown, ChevronRight,
  CircleAlert, Clock3, Filter, Inbox, LoaderCircle, MoreHorizontal, Plus, Search,
  SlidersHorizontal, Sparkles, Upload, UserRoundCheck, UsersRound, X,
} from "lucide-react";
import { candidates, jobs } from "../data/boards";

export function QuietOperationsDashboard() {
  const [section, setSection] = useState("今日队列");
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState("");
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(false);

  const runBatch = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setToast("批量匹配已进入队列");
    }, 700);
  };

  const rows = candidates.filter((item) => `${item.name}${item.role}${item.company}`.includes(query));

  return (
    <div className="ops-dashboard">
      <aside className="ops-sidebar">
        <div className="ops-brand"><span>H</span><b>Hunter</b></div>
        <nav aria-label="运营导航">
          {["今日队列", "候选人", "岗位", "Agent"].map((item, index) => {
            const Icon = [Inbox, UsersRound, BriefcaseBusiness, Sparkles][index];
            return <button key={item} className={section === item ? "is-active" : ""} onClick={() => { setSection(item); setToast(`已切换到${item}`); }}><Icon />{item}</button>;
          })}
        </nav>
        <div className="ops-health"><i /><span><b>系统运行正常</b><small>2 个任务执行中</small></span></div>
      </aside>

      <main className="ops-main">
        <header className="ops-page-head">
          <div><small>运营工作台 / {section}</small><h1>今日招聘运营</h1></div>
          <label className="ops-search"><Search /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索候选人、岗位或公司" /></label>
          <button className="ops-primary" onClick={runBatch} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Sparkles />}{loading ? "正在创建" : "批量匹配"}</button>
        </header>

        <section className="ops-metrics" aria-label="今日指标">
          {[["待确认", "28", "+6"], ["流程中", "47", "+4"], ["今日推荐", "12", "75%"], ["需处理异常", "3", "-2"]].map(([label, value, delta]) => <article key={label}><span>{label}</span><strong>{value}</strong><em>{delta}</em></article>)}
        </section>

        <div className="ops-workgrid">
          <section className="ops-table-card">
            <header><div><h2>优先处理队列</h2><span>{rows.length} 位候选人</span></div><button onClick={() => setToast("筛选条件已打开")}><Filter />筛选</button></header>
            <div className="ops-table-head"><span>候选人</span><span>目标岗位</span><span>匹配度</span><span>阶段</span><span>更新时间</span></div>
            {rows.map((item, index) => (
              <button key={item.name} className={`ops-table-row ${selected === index ? "is-selected" : ""}`} onClick={() => setSelected(index)}>
                <span className="ops-person"><i>{item.initials}</i><b>{item.name}<small>{item.company}</small></b></span>
                <span>{item.role}</span><strong>{item.score}</strong><em>{item.stage}</em><time>12 分钟前</time>
              </button>
            ))}
            {!rows.length && <div className="ops-empty"><Search /><b>没有匹配的候选人</b><span>调整搜索词后重试</span></div>}
            <footer><span>第 1–{rows.length} 条，共 {rows.length} 条</span><div><button onClick={() => setToast("已经是第一页")} disabled>上一页</button><button onClick={() => setToast("已经是最后一页")}>下一页</button></div></footer>
          </section>

          <aside className="ops-detail">
            <header><span>当前候选人</span><button aria-label="更多操作" onClick={() => setToast("候选人操作菜单已打开")}><MoreHorizontal /></button></header>
            <div className="ops-detail-person"><i>{candidates[selected]?.initials || "林"}</i><h2>{candidates[selected]?.name || "林昊"}</h2><p>{candidates[selected]?.role || "具身智能算法负责人"}</p></div>
            <dl><div><dt>当前公司</dt><dd>{candidates[selected]?.company || "穹境机器人"}</dd></div><div><dt>匹配度</dt><dd>{candidates[selected]?.score || 94} / 100</dd></div><div><dt>推进阶段</dt><dd>{candidates[selected]?.stage || "技术复试"}</dd></div></dl>
            <button className="ops-primary ops-wide" onClick={() => setToast("已打开候选人详情")}>查看候选人详情<ChevronRight /></button>
          </aside>

          <section className="ops-jobs">
            <header><h2>岗位进度</h2><button onClick={() => setToast("已进入岗位管理")}>查看全部</button></header>
            {jobs.map((job) => <button key={job.title} onClick={() => setToast(`已选择${job.title}`)}><span><b>{job.title}</b><small>{job.company} · {job.active} 人流程中</small></span><strong>{job.progress}%</strong><i><em style={{ width: `${job.progress}%` }} /></i></button>)}
          </section>
        </div>
      </main>
      <AnimatePresence>{toast && <motion.div className="ops-toast" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><Check /><span>{toast}</span><button aria-label="关闭通知" onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}

export function QuietOperationsComponents() {
  const [tab, setTab] = useState("候选人");
  const [query, setQuery] = useState("");
  const [tags, setTags] = useState(["具身智能", "VLA"]);
  const [newTag, setNewTag] = useState("");
  const [checked, setChecked] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [toast, setToast] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);
  const [motionStep, setMotionStep] = useState(0);
  const [sortMode, setSortMode] = useState("匹配度");
  const [threshold, setThreshold] = useState(75);

  const notify = (message) => setToast(message);
  const submit = () => { setLoading(true); setTimeout(() => { setLoading(false); notify("候选人资料已保存"); }, 650); };
  const addTag = () => { if (newTag.trim()) { setTags([...tags, newTag.trim()]); setNewTag(""); notify("标签已添加"); } };

  return (
    <div className="ops-components">
      <header className="ops-spec-head"><div><small>ATLASSIAN DS × LINEAR × ASHBY</small><h1>紧凑运营组件</h1><p>稳定尺寸、明确状态和高频操作反馈。</p></div><button className="ops-primary" onClick={submit} disabled={loading}>{loading ? <LoaderCircle className="is-spin" /> : <Check />}{loading ? "保存中" : "保存变更"}</button></header>

      <section className="ops-actionbar">
        <button className="ops-primary" onClick={() => notify("已创建候选人")}><Plus />新建候选人</button>
        <button className="ops-secondary" onClick={() => setDrawer(true)}><UserRoundCheck />打开详情</button>
        <DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="ops-secondary">批量操作<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="ops-menu" sideOffset={6}><DropdownMenu.Item onSelect={() => notify("已加入人才库")}>加入人才库</DropdownMenu.Item><DropdownMenu.Item onSelect={() => notify("已导出选中记录")}>导出选中项</DropdownMenu.Item><DropdownMenu.Separator /><DropdownMenu.Item className="is-danger" onSelect={() => notify("已移出队列")}>移出队列</DropdownMenu.Item></DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root>
        <button className="ops-danger" onClick={() => notify("危险操作需要二次确认")}><Archive />归档</button>
        <button className="ops-secondary" disabled>无权限操作</button>
      </section>

      <div className="ops-component-grid">
        <section className="ops-form-panel">
          <header><h2>字段与选择</h2><span>完整交互状态</span></header>
          <div className="ops-fields">
            <label><span>搜索</span><div className="ops-field"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="姓名、公司、岗位" />{query && <button aria-label="清空" onClick={() => setQuery("")}><X /></button>}</div></label>
            <label><span>候选人姓名</span><input className="ops-input" defaultValue="林昊" /></label>
            <label className="is-error"><span>手机号</span><input className="ops-input" defaultValue="138001" /><small><CircleAlert />手机号格式不正确</small></label>
            <label><span>目标岗位</span><DropdownMenu.Root><DropdownMenu.Trigger asChild><button className="ops-select">具身智能算法负责人<ChevronDown /></button></DropdownMenu.Trigger><DropdownMenu.Portal><DropdownMenu.Content className="ops-menu" sideOffset={6}>{jobs.map((job) => <DropdownMenu.Item key={job.title} onSelect={() => notify(`已选择${job.title}`)}>{job.title}</DropdownMenu.Item>)}</DropdownMenu.Content></DropdownMenu.Portal></DropdownMenu.Root></label>
            <label className="ops-span-2"><span>技能标签</span><div className="ops-tag-field">{tags.map((tag) => <em key={tag}>{tag}<button aria-label={`删除${tag}`} onClick={() => setTags(tags.filter((item) => item !== tag))}><X /></button></em>)}<input value={newTag} onChange={(e) => setNewTag(e.target.value)} onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="输入后回车" /></div></label>
            <label><span>可约时间</span><Popover.Root><Popover.Trigger asChild><button className="ops-select"><CalendarDays />2026-08-12<ChevronDown /></button></Popover.Trigger><Popover.Portal><Popover.Content className="ops-calendar" sideOffset={6}><header><b>2026 年 8 月</b><button aria-label="关闭日期" onClick={() => notify("日期面板可点击外部关闭")}><X /></button></header><div>{[10,11,12,13,14,15,16,17,18,19,20,21,22,23].map(day => <button className={day === 12 ? "is-active" : ""} key={day} onClick={() => notify(`已选择 8 月 ${day} 日`)}>{day}</button>)}</div></Popover.Content></Popover.Portal></Popover.Root></label>
            <label><span>上传简历</span><button className="ops-upload" onClick={() => notify("已打开文件选择器")}><Upload /><span><b>选择 PDF 或 DOCX</b><small>最大 20 MB</small></span></button></label>
            <label className="ops-span-2"><span>跟进备注</span><textarea className="ops-textarea" defaultValue="候选人周三下午可进行下一轮沟通。" /></label>
          </div>
        </section>

        <section className="ops-choice-panel">
          <header><h2>偏好与阈值</h2></header>
          <button className="ops-check-row" onClick={() => setChecked(!checked)}><Checkbox.Root checked={checked} onCheckedChange={setChecked} className="ops-checkbox"><Checkbox.Indicator><Check /></Checkbox.Indicator></Checkbox.Root><span><b>只显示待确认候选人</b><small>减少已处理记录干扰</small></span></button>
          <div className="ops-radio"><span>排序方式</span>{["匹配度", "更新时间"].map((item) => <button key={item} className={sortMode === item ? "is-selected" : ""} onClick={() => { setSortMode(item); notify(`排序方式：${item}`); }}><i>{sortMode === item && <em />}</i>{item}</button>)}</div>
          <div className="ops-switch-row"><span><b>自动刷新</b><small>每 30 秒更新队列</small></span><Switch.Root checked={enabled} onCheckedChange={setEnabled} className="ops-switch"><Switch.Thumb /></Switch.Root></div>
          <label className="ops-slider"><span><b>最低匹配分</b><strong>{threshold}</strong></span><Slider.Root value={[threshold]} onValueChange={([value]) => setThreshold(value)} min={0} max={100} step={5}><Slider.Track><Slider.Range /></Slider.Track><Slider.Thumb aria-label="最低匹配分" /></Slider.Root></label>
        </section>
      </div>

      <section className="ops-data-panel">
        <header><Tabs.Root value={tab} onValueChange={setTab}><Tabs.List>{["候选人", "岗位", "Agent 任务"].map(item => <Tabs.Trigger key={item} value={item}>{item}</Tabs.Trigger>)}</Tabs.List></Tabs.Root><span>当前：{tab}</span></header>
        <div className="ops-table-head"><span>名称</span><span>关联业务</span><span>状态</span><span>更新时间</span><span>操作</span></div>
        {candidates.slice(0, 3).map((item) => <div className="ops-data-row" key={item.name}><span className="ops-person"><i>{item.initials}</i><b>{item.name}<small>{item.company}</small></b></span><span>{item.role}</span><em>{item.stage}</em><time>今天 11:42</time><button onClick={() => setDrawer(true)}>查看</button></div>)}
        <footer><span>1–3 / 28</span><div><button disabled>上一页</button><button onClick={() => notify("已进入下一页")}>下一页</button></div></footer>
      </section>

      <section className={`ops-motion motion-${motionStep}`}>
        <header><div><small>ATLASSIAN SEMANTIC MOTION</small><h2>交互与动效</h2></div><nav>{["行聚焦", "批次确认", "数字更新", "状态推入"].map((item, index) => <button key={item} className={motionStep === index + 1 ? "is-active" : ""} onClick={() => setMotionStep(index + 1)}>{item}</button>)}</nav></header>
        <div><motion.article key={motionStep} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}><span>{motionStep || 1}</span><div><b>{["选择一项动作查看反馈", "候选人行获得稳定焦点", "批量操作进入确认状态", "指标从 27 更新为 28", "新状态从右侧进入队列"][motionStep]}</b><small>动效用于解释状态变化，不改变布局尺寸。</small></div><Check /></motion.article></div>
      </section>

      <Dialog.Root><Dialog.Trigger asChild><button className="ops-secondary ops-modal-trigger">打开确认 Modal</button></Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="ops-overlay" /><Dialog.Content className="ops-modal"><Dialog.Title>确认批量加入人才库</Dialog.Title><Dialog.Description>将 12 位候选人加入当前岗位的人才库，系统会保留原始来源。</Dialog.Description><div className="ops-modal-summary"><UsersRound /><span><b>12 位候选人</b><small>其中 3 位可能重复</small></span></div><footer><Dialog.Close asChild><button className="ops-secondary">取消</button></Dialog.Close><Dialog.Close asChild><button className="ops-primary" onClick={() => notify("批量加入已提交")}>确认加入</button></Dialog.Close></footer><Dialog.Close asChild><button className="ops-modal-close" aria-label="关闭"><X /></button></Dialog.Close></Dialog.Content></Dialog.Portal></Dialog.Root>

      <AnimatePresence>{drawer && <><motion.div className="ops-drawer-mask" onClick={() => setDrawer(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} /><motion.aside className="ops-drawer" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}><header><div><small>候选人详情</small><h2>林昊</h2></div><button aria-label="关闭详情" onClick={() => setDrawer(false)}><X /></button></header><dl><div><dt>当前公司</dt><dd>穹境机器人</dd></div><div><dt>目标岗位</dt><dd>具身智能算法负责人</dd></div><div><dt>匹配度</dt><dd>94 / 100</dd></div></dl><button className="ops-primary ops-wide" onClick={() => notify("已进入完整详情")}>进入完整详情</button></motion.aside></>}</AnimatePresence>
      <AnimatePresence>{toast && <motion.div className="ops-toast" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}><Check /><span>{toast}</span><button aria-label="关闭通知" onClick={() => setToast("")}><X /></button></motion.div>}</AnimatePresence>
    </div>
  );
}
