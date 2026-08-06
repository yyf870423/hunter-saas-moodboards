export const boards = [
  {
    id: "01", slug: "precision-desk", family: "专业运营型", variant: "quiet",
    name: "静默运营台", en: "Quiet Operations",
    premise: "高密度、强对齐、稳定控件，服务每天数百次重复操作。",
    thesis: "像一张可靠的运营台账：信息紧凑但不拥挤，操作落点始终一致。",
    tags: ["高密度台账", "批量处理", "稳定效率"],
    accent: "#126a58", signal: "#d56630", canvas: "#eef2f0", ink: "#14211d", panel: "#ffffff", line: "#aebbb5", muted: "#5b6a64", radius: "3px",
    font: 'Inter, "PingFang SC", sans-serif', displayFont: 'Inter, "PingFang SC", sans-serif',
    references: ["Linear", "Ashby", "Stripe Dashboard"],
  },
  {
    id: "02", slug: "command-center", family: "高端顾问型", variant: "briefing",
    name: "高管简报", en: "Executive Briefing",
    premise: "用编辑式层级组织重点委托、风险、证据和下一步决策。",
    thesis: "像一份资深顾问交付的晨间简报，先给结论，再提供依据。",
    tags: ["编辑排版", "决策简报", "专业顾问"],
    accent: "#184c40", signal: "#a96828", canvas: "#f1f2ee", ink: "#17201d", panel: "#fffefa", line: "#aeb6b1", muted: "#5e6863", radius: "0px",
    font: '"Source Sans 3", "PingFang SC", sans-serif', displayFont: 'Georgia, "Noto Serif SC", serif',
    references: ["McKinsey Insights", "Monocle", "Granola Briefs"],
  },
  {
    id: "03", slug: "human-studio", family: "高端顾问型", variant: "client-room",
    name: "客户会客厅", en: "Client Room",
    premise: "以客户承诺、关键关系和服务节奏为中心的精致工作空间。",
    thesis: "界面像一间私密会客厅：稳重、有分量，并让服务状态清晰可见。",
    tags: ["客户中心", "深色框架", "高端服务"],
    accent: "#1f6658", signal: "#be5262", canvas: "#e9efec", ink: "#14201c", panel: "#ffffff", line: "#aabbb4", muted: "#5c6c65", radius: "12px",
    font: '"Avenir Next", "PingFang SC", sans-serif', displayFont: '"Noto Serif SC", Georgia, serif',
    references: ["Mercury", "Affinity CRM", "Pitch Rooms"],
  },
  {
    id: "04", slug: "kinetic-blueprint", family: "人才叙事型", variant: "journal",
    name: "人才纪事", en: "Talent Journal",
    premise: "沿人物时间、沟通和职业选择组织候选人工作。",
    thesis: "候选人不是字段集合；每次沟通和职业变化都应保留前因后果。",
    tags: ["人物时间线", "职业叙事", "连续跟进"],
    accent: "#27677a", signal: "#c04e64", canvas: "#eef2f2", ink: "#182528", panel: "#ffffff", line: "#afbec0", muted: "#5f6e71", radius: "8px",
    font: '"Avenir Next", "PingFang SC", sans-serif', displayFont: '"Noto Serif SC", Georgia, serif',
    references: ["Granola", "Read.cv", "Notion Calendar"],
  },
  {
    id: "05", slug: "physical-telemetry", family: "人才叙事型", variant: "conversation",
    name: "沟通工作台", en: "Conversation Desk",
    premise: "把会话、日程、人物背景和下一步操作放进连续沟通界面。",
    thesis: "猎头服务发生在一次次沟通里，界面应让上下文和行动自然衔接。",
    tags: ["会话驱动", "即时反馈", "跟进节奏"],
    accent: "#215c6b", signal: "#c34f69", canvas: "#edf2f3", ink: "#17272b", panel: "#ffffff", line: "#aebfc2", muted: "#5b6d71", radius: "14px",
    font: 'Inter, "PingFang SC", sans-serif', displayFont: '"Avenir Next", "PingFang SC", sans-serif',
    references: ["Intercom Inbox", "Front", "Superhuman"],
  },
  {
    id: "06", slug: "institutional-trust", family: "现代品牌型", variant: "swiss",
    name: "瑞士网格", en: "Swiss Recruitment Grid",
    premise: "严格网格、强字重和高对比区块建立明确秩序。",
    thesis: "用比例、边界和编号形成品牌辨识度，不依靠装饰或渐变。",
    tags: ["粗线网格", "强排版", "品牌秩序"],
    accent: "#d5352b", signal: "#1764ad", canvas: "#f2f2ec", ink: "#111111", panel: "#ffffff", line: "#111111", muted: "#52524d", radius: "0px",
    font: '"Helvetica Neue", "PingFang SC", sans-serif', displayFont: '"Arial Black", "PingFang SC", sans-serif',
    references: ["International Typographic Style", "Vercel", "Pitch"],
  },
  {
    id: "07", slug: "expedition-search", family: "现代品牌型", variant: "paperless",
    name: "无纸化工作室", en: "Paperless Studio",
    premise: "以材料、批注、页签和审阅动作组织招聘工作。",
    thesis: "保留纸面阅读的专注感，同时获得数字系统的搜索、更新与协作。",
    tags: ["材料阅读", "页签批注", "纸面质感"],
    accent: "#1f55a3", signal: "#c95543", canvas: "#eef0ec", ink: "#20211e", panel: "#fffefa", line: "#b7b9b1", muted: "#666962", radius: "2px",
    font: '"Source Sans 3", "PingFang SC", sans-serif', displayFont: 'Georgia, "Noto Serif SC", serif',
    references: ["Dovetail", "Notion", "Pitch Editor"],
  },
  {
    id: "08", slug: "guided-service", family: "智能协作型", variant: "copilot",
    name: "智能副驾", en: "Contextual Copilot",
    premise: "让 Agent 建议直接出现在正在处理的业务上下文中。",
    thesis: "智能不是另一个聊天窗口，而是在需要判断时给出可解释、可拒绝的建议。",
    tags: ["上下文建议", "人机协作", "可控智能"],
    accent: "#24685b", signal: "#d48528", canvas: "#edf2f0", ink: "#14231e", panel: "#ffffff", line: "#aebdb7", muted: "#596a63", radius: "10px",
    font: 'Inter, "PingFang SC", sans-serif', displayFont: '"Avenir Next", "PingFang SC", sans-serif',
    references: ["Intercom Copilot", "Granola", "Sana Agents"],
  },
  {
    id: "09", slug: "teamwork-fabric", family: "智能协作型", variant: "automation",
    name: "自动化流水线", en: "Guided Automation",
    premise: "用厚实的阶段块表达自动执行、人工确认、异常与恢复。",
    thesis: "不暴露技术细节，但让用户始终知道任务到了哪里、等待什么。",
    tags: ["阶段推进", "异常恢复", "人工门禁"],
    accent: "#245fa3", signal: "#d45f38", canvas: "#eaf0f4", ink: "#162432", panel: "#ffffff", line: "#a9b9c7", muted: "#596c7a", radius: "5px",
    font: 'Inter, "PingFang SC", sans-serif', displayFont: 'Inter, "PingFang SC", sans-serif',
    references: ["Linear Workflows", "Asana Workflows", "Temporal UI"],
  },
  {
    id: "10", slug: "pattern-library", family: "智能协作型", variant: "evidence",
    name: "证据审核台", en: "Evidence Review",
    premise: "通过差异对比、来源编号和明确裁决完成可信写入。",
    thesis: "AI 结论只有可追溯、可比较、可拒绝，才值得进入正式业务数据。",
    tags: ["差异审核", "证据来源", "可信写入"],
    accent: "#205d72", signal: "#b94b3f", canvas: "#edf1f2", ink: "#16272c", panel: "#ffffff", line: "#aebdc1", muted: "#5c6d72", radius: "1px",
    font: '"Source Sans 3", "PingFang SC", sans-serif', displayFont: '"Noto Serif SC", Georgia, serif',
    references: ["Dovetail", "Hebbia Matrix", "Stripe Identity"],
  },
];

export const boardBySlug = Object.fromEntries(boards.map((board) => [board.slug, board]));

export const viewMeta = {
  main: { name: "Dashboard", short: "Dashboard" },
  components: { name: "组件与交互", short: "组件与交互" },
};

export const candidates = [
  { name: "林昊", role: "具身智能算法负责人", company: "穹境机器人", score: 94, stage: "技术复试", initials: "林" },
  { name: "周雨澄", role: "VLA 研究员", company: "奇点智研", score: 88, stage: "待确认", initials: "周" },
  { name: "陈松", role: "感知算法专家", company: "逐光科技", score: 83, stage: "初次沟通", initials: "陈" },
  { name: "赵星羽", role: "机器人平台架构师", company: "远川智能", score: 79, stage: "人才储备", initials: "赵" },
];

export const jobs = [
  { title: "具身智能算法负责人", company: "穹境机器人", active: 18, progress: 72 },
  { title: "灵巧手结构工程师", company: "智元新创", active: 11, progress: 48 },
  { title: "自动驾驶感知专家", company: "逐光科技", active: 9, progress: 63 },
];

export const events = [
  ["11:42", "Agent 完成候选人证据核验", "success"],
  ["11:36", "人才寻访新增 12 位待确认候选人", "running"],
  ["11:31", "2 条推荐等待确认", "warning"],
  ["11:26", "岗位画像已更新并通过门禁", "success"],
];

export const workflow = ["理解岗位", "制定策略", "多渠道找人", "证据核验", "匹配评估", "人工确认"];
