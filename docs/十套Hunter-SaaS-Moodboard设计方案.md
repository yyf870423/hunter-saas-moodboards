# Hunter SaaS 十套 Moodboard 设计方案

## 1. 目标与边界

本轮以“科技产品 + 专业猎头服务”为共同底色，保留十套肉眼可辨的产品方向。差异不依赖换色，而来自工作模型、信息架构、组件几何、材质、反馈方式和动效语义。

共同边界：

- 不采用纯开发工具、监控大屏或赛博朋克风格。
- 控件必须有足够厚度、边界和点击面积，避免过细、过轻、漂浮。
- 不展示思维导图、关系网络或其他连线图。
- 每套覆盖 Dashboard 与完整组件页面，组件页面包含表单、选择、数据列表、业务资产、状态、Modal、Drawer、Toast 和四种专属动效。
- Dashboard 和组件页面在十套方案中分别使用独立 React DOM。
- 每套组件页面独立维护下拉框、复选、多选、日期、上传、Tabs、Modal、Drawer、Toast 和动效状态。
- 方案之间仅共享静态演示数据与 Lucide 图标库，不共享组件 DOM、交互状态或动效实现。

## 2. 设计语言组合方法

十套方案不再自创视觉体系。每套方案均由以下四层成熟来源共同约束：

1. **控件系统**：采用正式设计系统已经验证的尺寸、状态、键盘操作、可访问性和设计 token。
2. **业务布局**：采用真实 SaaS 产品中与 Hunter 场景相近的信息架构，不从营销页面或静态概念稿推导业务界面。
3. **交互节奏**：采用真实产品处理高频操作、批量动作、审核、会话、Agent 任务或关系数据的成熟方式。
4. **动效系统**：使用正式设计系统的语义动效、持续时间和缓动规则；业务页面只组合已有语义，不另造一套“炫技动画”。

实现允许使用 Radix Primitives 等成熟无障碍基础组件和 Motion for React，但每套页面必须拥有独立 DOM、状态、样式 token 和动效编排。不能用同一个页面结构换主题色生成十套结果。

## 3. 十套成熟组合矩阵

| 编号 | Hunter 场景 | 成熟组合 | 明确采用的设计语言 | 交互与动效来源 | 禁止混入 |
|---|---|---|---|---|---|
| 01 | 高频运营与批量处理 | **Atlassian Design System + Linear + Ashby** | Atlassian 的紧凑控件、语义 token 和数据状态；Linear 的低噪声导航与列表层级；Ashby 的招聘管线和批量处理结构 | Atlassian semantic motion：popup、fade、reposition；Linear 的行级聚焦和快捷操作 | 大面积卡片墙、营销型指标、装饰动画 |
| 02 | 人才信号与优先级判断 | **Fluent 2 + Raycast + OpenRouter** | Fluent 2 的层级、材质和响应式布局；Raycast 的命令反馈与结果聚焦；OpenRouter 的实时状态和来源表达 | Fluent 2 的 enter/exit、elevation、container transform；Raycast 的即时选中反馈 | 监控大屏、终端字体、赛博朋克霓虹 |
| 03 | 客户服务与关系经营 | **Shopify Polaris + Attio + Mercury** | Polaris 的商务表单、资源列表和明确操作层级；Attio 的对象详情与关系上下文；Mercury 的克制金融级质感 | Polaris 的资源操作反馈；Attio 的对象切换和属性编辑；Fluent 的自然短动效 | 奢侈品落地页、巨大衬线标题、纯装饰材质 |
| 04 | 候选人职业叙事与持续跟进 | **Adobe Spectrum + Notion + Granola** | Spectrum 的内容型组件和可访问状态；Notion 的块级内容组织；Granola 的记录、摘要与后续行动 | Spectrum 的状态切换；Notion 的块级编辑反馈；Granola 的记录生成与摘要出现 | 杂志排版、纸张阴影堆叠、不可编辑的静态时间线 |
| 05 | 沟通、日程与下一步行动 | **Material 3 Expressive + Front + Intercom Inbox** | Material 3 的触控尺寸、状态层和自适应组件；Front 的共享收件箱；Intercom 的会话、联系人和侧栏上下文 | Material motion physics；Front 的会话选中与批量状态；Intercom 的 composer 和 drawer | 社交聊天 App 化、夸张气泡、只适合移动端的布局 |
| 06 | Agent 长任务、过程观察与交付 | **Fluent 2 + WorkBuddy + Vercel AI** | Fluent 2 的多面板工作区；WorkBuddy 的任务列表、连续上下文和交付物；Vercel AI 的生成中、流式结果和工具状态 | Fluent 2 的层级转场；Vercel AI 的流式状态；WorkBuddy 的任务与结果切换 | 开发者 IDE、原始 JSON 日志、固定流水线图 |
| 07 | 研究材料、证据与批注 | **IBM Carbon + Dovetail + Notion** | Carbon 的结构化研究工作区、数据和标签；Dovetail 的研究材料、证据片段和洞察；Notion 的文档块与批注 | Carbon productive motion 为主、expressive motion 只用于完成反馈；Dovetail 的证据定位 | 仿纸张纹理、档案袋装饰、盖章动画 |
| 08 | 业务上下文中的 AI 建议 | **shadcn/ui(Base UI) + Intercom Copilot + Sana** | shadcn/Base UI 的开放组件和完整状态；Intercom Copilot 的上下文建议；Sana 的知识回答、来源和后续动作 | Base UI 的无障碍 open/close；Intercom 的建议采纳/拒绝；Fluent 的 focus 与 elevation | 独立聊天首页、悬浮魔法按钮、没有依据的自动改写 |
| 09 | 公司、岗位和人才机会探索 | **Salesforce Lightning + Attio + Clay** | Lightning 的对象列表、筛选、可配置列和行操作；Attio 的对象关系与视图；Clay 的多源补全和逐步丰富 | Lightning 的选择与内联编辑；Clay 的列级运行状态；Atlassian 的 popup/reposition | 连线关系图、无限画布、金融终端式信息墙 |
| 10 | AI 建议、证据与写入决策 | **IBM Carbon + Stripe Dashboard + Persona** | Carbon 的严谨表单和状态；Stripe 的风险信息、详情与确认层级；Persona 的验证步骤和失败解释 | Carbon 的 productive motion；Stripe 的危险操作确认；Persona 的步骤状态和恢复提示 | 法务文书风、审计终端、红色占主导的恐吓式界面 |

每套组合只采用与 Hunter 任务相符的规则，不复制第三方品牌资产、商标、专有插图或完整页面布局。

## 4. 完整组件范围

每套组件页面必须用自己的 DOM 和交互逻辑覆盖：

1. 命令：主按钮、次按钮、危险按钮、禁用按钮、分裂按钮及菜单。
2. 输入：搜索、普通输入、校验错误、多行文本、标签、文件上传。
3. 选择：单选下拉、多选下拉、日期/时间、Checkbox、Radio、Toggle、Slider。
4. 数据：Tabs、列表或表格、状态、分数、分页或记录切换。
5. 业务：候选人、岗位、公司、Agent 任务、证据或沟通记录。
6. 浮层：Modal、Drawer、Toast，包含打开和关闭交互。
7. 动效：四个与该方案工作模型一致的独立触发器和动画结果。

所有可见且可用的按钮必须产生明确结果，结果至少属于以下一种：

- 页面或区域切换；
- 筛选、排序或选中状态变化；
- 内容加载、进度或业务状态变化；
- 打开或关闭菜单、Modal、Drawer、Toast；
- 显示成功、失败、警告或下一步说明。

不允许存在点击后没有任何视觉、内容或状态反馈的按钮。

每个交互组件必须实现并可验收以下状态：

- `hover`：鼠标进入后有边框、底色、阴影、文字或图标中的合理变化，不能只依赖浏览器光标。
- `pressed`：按下时有短时位移、缩放、材质或状态层反馈，释放后恢复或进入新状态。
- `focus-visible`：键盘聚焦轮廓清晰，不得被 `outline: none` 直接移除。
- `selected/open`：Tabs、列表行、下拉、多选和菜单必须明确展示当前选择或展开状态。
- `loading`：异步命令立即进入加载态，并防止重复提交。
- `success/error`：执行完成或失败后显示与动作相邻的结果，并保留可理解的下一步。
- `disabled`：视觉和行为同时禁用，不响应 hover、pressed 和 click。
- `close/recover`：下拉、Modal、Drawer、Toast 必须提供明确关闭方式，并支持适用的点击外部、`Escape` 和恢复操作。
- `touch`：iPad 与 iPhone 不依赖 hover 才能发现关键操作，点击区不小于 40px。

## 5. 字体与边界基线

- 正文默认 14–16px，辅助信息默认不低于 12px；只有编号、来源代码等真正的元信息可以使用 11px。
- 表单、按钮、菜单项和表格正文不得使用 8–10px 字号。
- 常规按钮高度为 36–40px，主操作高度可为 40–44px，图标按钮保持稳定正方形点击区。
- 标题字号按容器匹配：Dashboard 主标题 28–36px，卡片标题 16–20px，Modal 标题 18–22px。
- 按钮文字和图标必须完整落在按钮内；输入框、菜单、日期面板、Toast、Modal 和 Drawer 不得超出所属区域或视口。
- 长文本应截断、换行或进入内部滚动区域，不允许通过撑大列宽破坏页面布局。

## 6. 响应式要求

- 16:9 宽屏：保持完整工作布局，核心内容不做营销式放大。
- iPad：次要区域可下移，复杂表格允许容器内横向滚动，页面本身不能溢出。
- iPhone：多栏改为单栏或可控的内部滚动，不丢失关键命令、状态和浮层入口。
- 所有视口下文本不得遮挡，按钮点击区域保持稳定，弹层不得超出屏幕。

## 7. 验收标准

1. 隐去颜色和名称后，仍可根据布局与组件几何区分十套方案。
2. 十套 Dashboard 根 DOM 与十套组件根 DOM 均不重复。
3. 任一方案的交互状态变化不影响其他方案。
4. 下拉框可再次点击关闭、点击外部关闭、选择后关闭；多选支持继续选择并由“完成”关闭。
5. Checkbox 勾选图标在水平和垂直方向居中。
6. 不存在思维导图、关系网络和连线图组件。
7. 桌面、iPad、iPhone 共 60 个页面组合无脚本错误或页面横向溢出。
8. 首页使用每套真实 Dashboard 截图，不使用与实际内容不一致的占位图。
9. 自动检查所有可见交互元素的边界框，确保没有按钮、输入框、菜单或浮层越出所属容器或视口。
10. 每套 Dashboard 至少覆盖导航切换、主要业务动作和一项内容展开；组件页的全部命令按钮均有可见反馈。
11. 使用鼠标和键盘逐项验证 hover、pressed、focus-visible、open、loading、success/error 和 disabled，不允许只有静态默认态。
12. 每套实现必须能从代码中的 token、组件结构和动效规则回查到本文件的成熟组合，不能出现无来源的临时设计语言。
