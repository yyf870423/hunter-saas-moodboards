# Hunter SaaS 十套 Moodboard 设计方案

## 1. 目标与边界

本轮以“科技产品 + 专业猎头服务”为共同底色，保留十套肉眼可辨的产品方向。差异不依赖换色，而来自工作模型、信息架构、组件几何、材质、反馈方式和动效语义。

共同边界：

- 不采用纯开发工具、监控大屏或赛博朋克风格。
- 控件必须有足够厚度、边界和点击面积，避免过细、过轻、漂浮。
- 不展示思维导图、关系网络或其他连线图。
- 每套覆盖八个真实业务页面，不再设置独立的“组件与动效”展示页。
- 组件、状态和动效必须出现在真实业务操作中，不能以抽象状态演示代替业务交互。
- 十套方案分别建立自己的组件层、页面 DOM、交互状态和动效编排；不能共用同一套页面结构后换皮换色。
- 同一套风格的八个页面可以复用该风格内部的组件，保证设计语言一致；不同风格之间仅共享路由、图标、无障碍工具和测试基础设施。
- 每套风格同时提供独立设计的浅色与深色模式，每个页面均可切换。

## 2. 设计语言组合方法

十套方案不再自创视觉体系。每套方案均由以下四层成熟来源共同约束：

1. **控件系统**：采用正式设计系统已经验证的尺寸、状态、键盘操作、可访问性和设计 token。
2. **业务布局**：采用真实 SaaS 产品中与 Hunter 场景相近的信息架构，不从营销页面或静态概念稿推导业务界面。
3. **交互节奏**：采用真实产品处理高频操作、批量动作、审核、会话、Agent 任务或关系数据的成熟方式。
4. **动效系统**：使用正式设计系统的语义动效、持续时间和缓动规则；业务页面只组合已有语义，不另造一套“炫技动画”。

实现允许使用 Radix Primitives 等成熟无障碍基础组件和 Motion for React，但每套页面必须拥有独立 DOM、状态、样式 token 和动效编排。不能用同一个页面结构换主题色生成十套结果。

### 2.1 官方设计系统采用规则

每套方案必须指定一个**主设计系统**。只要主设计系统已经提供完整的颜色、字体、间距、圆角、阴影、材质、动效、明暗主题和组件状态，就直接采用官方方案，不再为 Hunter 重新发明一套近似规则。

1. **官方语义 token 是唯一真相源。** 页面使用背景、表面、文字、边界、焦点、操作和状态等语义 token，不从官网截图取色，也不在业务 CSS 中临时手写近似颜色。
2. **官方组件状态直接沿用。** 输入框、下拉框、表格、按钮、Modal、Tooltip、日期控件等已有官方状态时，直接采用其 normal、hover、pressed、focus、selected、disabled、loading 和 error 规则。
3. **官方材质与动效直接沿用。** 阴影层级、透明材质、遮罩、进出场时长和缓动使用官方定义，不自行拼接多层阴影或装饰渐变。
4. **真实产品只提供业务参考。** Linear、Ashby、WorkBuddy、Attio 等产品用于确定信息架构、工作模型和页面布局，不能覆盖主设计系统的组件与 token 规范。
5. **没有公开完整体系时才做受控补充。** 补充规则必须来自被引用产品可重复观察的稳定模式，并在文档中注明来源、适用范围和未采用官方方案的原因；不得以“更好看”为由自由发挥。
6. **版本可追踪。** 代码中的每套主题必须记录主设计系统、官方文档 URL、采用的包或 token 版本，以及 Hunter 使用的语义映射。

### 2.2 十套官方基线

| 方案 | 主设计系统（直接采用） | Hunter 采用范围 | 真实产品参考（只用于布局） |
|---|---|---|---|
| Linear × Ashby 运营台 | [Atlassian Design System](https://atlassian.design/) | Atlassian Light/Dark 语义颜色、紧凑控件、边界、焦点、Popup 与 Overlay 阴影 | Linear 列表层级、Ashby 招聘运营结构 |
| Raycast × OpenRouter 信号台 | [Fluent 2](https://fluent2.microsoft.design/) | Web Blue 品牌色阶、Neutral 层级、双层阴影、材质、进出场动效与排版 | Raycast 命令反馈、OpenRouter 来源与状态表达 |
| Attio × Mercury 客户台 | [Shopify Polaris](https://polaris.shopify.com/) | 当前 Light/Dark token、商务表单、Resource List、按钮 bevel、阴影与语义状态 | Attio 对象关系、Mercury 客户服务节奏 |
| Notion × Granola 人才纪事 | [Adobe Spectrum 2](https://spectrum.adobe.com/) | Spectrum 2 灰阶、Indigo 色阶、内容组件、字段状态、焦点与可访问性 | Notion 内容块、Granola 记录与摘要 |
| Front × Intercom 沟通台 | [Material 3 Expressive](https://m3.material.io/) | 官方角色色、Surface Container 层级、状态层、触控尺寸、形状与 Motion Physics | Front 共享收件箱、Intercom 会话上下文 |
| WorkBuddy × Vercel AI 任务空间 | [Vercel Geist](https://vercel.com/geist) | Geist Blue/Gray 完整色阶、两层页面背景、Material、组件、排版和 Grid；整体固定为蓝色体系 | WorkBuddy 的任务列表、连续上下文与宽松蓝色背景光感 |
| Dovetail × Arc 研究台 | [IBM Carbon for AI](https://carbondesignsystem.com/guidelines/carbon-for-ai/) | Carbon White/G100 主题、结构化数据组件、productive motion，以及 AI 官方蓝紫光感 | Dovetail 证据定位、Arc 研究工作区 |
| Intercom × Sana 智能副驾 | [Radix Themes](https://www.radix-ui.com/themes/docs/overview/getting-started) | 官方 Indigo + Mauve 明暗色阶、组件状态、透明层、Popover/Dialog 行为 | Intercom Copilot 建议、Sana 来源与后续动作 |
| Attio × Clay 机会探索 | [Salesforce Lightning Design System](https://www.lightningdesignsystem.com/) | SLDS 语义 token、对象列表、筛选器、可配置列、Inline Edit 和反馈状态 | Attio 对象视图、Clay 多源补全进度 |
| Primer × Persona 决策桌 | [GitHub Primer](https://primer.style/product/) | Primer Light/Dark 功能 token、表单、Overlay、危险操作、证据状态与响应式布局 | Persona 验证步骤、Stripe 风险与确认层级 |

采用官方系统不等于照搬品牌标识。Hunter 不复制第三方 Logo、商标、专有插图和完整页面，只直接使用其公开设计系统的基础规则与组件行为。

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
| 10 | AI 建议、证据与写入决策 | **GitHub Primer + Persona + Stripe Dashboard** | Primer 的严谨表单、Overlay 和语义状态；Stripe 的风险信息、详情与确认层级；Persona 的验证步骤和失败解释 | Primer 的功能 token 与 Overlay 行为；Stripe 的危险操作确认；Persona 的步骤状态和恢复提示 | 法务文书风、审计终端、红色占主导的恐吓式界面 |

每套组合只采用与 Hunter 任务相符的规则，不复制第三方品牌资产、商标、专有插图或完整页面布局。

## 4. 八类业务页面

每套风格制作以下八个页面，共 80 个业务页面：

1. **工作台 Dashboard**：指标、趋势、待办、通知、提醒、快捷操作和异常状态。
2. **Agent 对话**：消息发送、流式响应、停止、重试、来源、业务产物和异常处理。
3. **数据列表**：搜索、单选、多选、日期范围、筛选、排序、分页、截断、Tooltip、新增 Modal 和删除 Modal。
4. **招聘流程泳道**：候选人阶段、拖动、备注、阶段限制、失败回退和撤销。
5. **人岗匹配结果**：得分、证据、风险、理由展开、候选人比较、加入流程和标记不合适。
6. **卡片列表**：多条公司、岗位、候选人、论文或任务结果，覆盖筛选、排序、分页和批量动作。
7. **上传与分析**：文件选择、拖放、格式校验、重复检查、解析进度、失败重试、取消和结果预览。
8. **任务进度**：排队、运行、等待确认、暂停、失败、重试、恢复、完成、部分成功和长任务进度。

同一类页面只保持业务覆盖可比较，不保持相同排版。十套风格应分别选择侧栏、顶部导航、对象栏、任务栏、命令入口、上下文面板、分栏或单栏等不同结构。演示数据、信息主次、操作路径和动效反馈也应按各自工作模型独立设计。

## 5. 深浅模式

1. 每个业务页面的固定导航区域提供深色/浅色切换入口，不能只在首页或设置页切换。
2. 同一风格的模式选择跨八个页面保持一致；切换到另一套风格时，读取该风格自己的选择。
3. 首次访问默认跟随操作系统偏好，用户主动切换后以用户选择为准。
4. 分享链接允许用查询参数固定模式，保证评审和截图复现一致。
5. 深色模式必须单独定义背景层级、文字、边界、状态色、图表、浮层和阴影 token，禁止使用 CSS 反色或统一黑色模板。
6. 十套风格的深色模式仍应肉眼可辨，不能因进入深色模式而变成相同的深灰界面。
7. 模式切换不得造成页面跳顶、布局位移、表单值丢失或业务状态重置；用户开启减少动态效果时取消非必要过渡。

## 6. 组件与交互覆盖

八个业务页面合计必须自然覆盖：按钮、搜索、普通输入、校验错误、多行文本、标签、文件上传、单选、多选、日期/时间、Checkbox、Radio、Toggle、Slider、Tabs、表格、列表、状态、分数、分页、Modal、Drawer、Toast 和 Tooltip。不得为了补齐组件而恢复独立组件陈列页。

所有用户可见组件必须由对应风格的组件库完整控制，不允许出现浏览器或操作系统默认样式。该要求同样适用于通过 Portal 挂载到页面根节点之外的下拉菜单选项、日期面板、Tooltip、Modal、Drawer、Toast、确认按钮、关闭按钮和错误信息。每个浮层都必须显式设置对应风格的字体家族、字号、字重、行高、文字颜色、背景、边界、阴影、焦点、悬停、按下、禁用和错误状态，不能依赖父容器偶然继承。

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

## 7. 字体与边界基线

- 主要正文默认 14–16px，高密度表格、操作台与辅助信息使用 12–14px；只有编号、来源代码等真正的元信息可以使用 10–11px。
- 表单、主要按钮、菜单项和核心表格内容不得使用难以识别的微型字号。
- 常规按钮高度为 36–40px，主操作高度可为 40–44px，图标按钮保持稳定正方形点击区。
- 标题字号按容器匹配：Dashboard 主标题 28–36px，卡片标题 16–20px，Modal 标题 18–22px。
- 按钮文字和图标必须完整落在按钮内；输入框、菜单、日期面板、Toast、Modal 和 Drawer 不得超出所属区域或视口。
- 长文本应截断、换行或进入内部滚动区域，不允许通过撑大列宽破坏页面布局。
- 页面正文、表格、表单、菜单项和弹层使用该风格明确指定的中英文字体栈；字体资源加载失败时使用设计方案指定的回退字体，不得回退成不可控的系统默认表现。

## 8. 响应式要求

- 16:9 宽屏：保持完整工作布局，核心内容不做营销式放大。
- iPad：次要区域可下移，复杂表格允许容器内横向滚动，页面本身不能溢出。
- iPhone：多栏改为单栏或可控的内部滚动，不丢失关键命令、状态和浮层入口。
- 所有视口下文本不得遮挡，按钮点击区域保持稳定，弹层不得超出屏幕。

## 9. 验收标准

1. 隐去颜色和名称后，仍可根据布局与组件几何区分十套方案。
2. 十套风格不共用页面 DOM、组件视觉结构、交互状态机或动效编排；同一风格内部可以复用自己的组件库。
3. 任一方案的交互状态变化不影响其他方案。
4. 下拉框可再次点击关闭、点击外部关闭、选择后关闭；多选支持继续选择并由“完成”关闭。
5. Checkbox 勾选图标在水平和垂直方向居中。
6. 不存在思维导图、关系网络和连线图组件。
7. 十套风格 × 八类页面 × 深浅两种模式 × 三种视口，共 480 个视觉组合无脚本错误或页面横向溢出。
8. 首页使用每套真实 Dashboard 截图，不使用与实际内容不一致的占位图；最终公开页面不显示 `01–10` 风格编号。
9. 自动检查所有可见交互元素的边界框，确保没有按钮、输入框、菜单或浮层越出所属容器或视口。
10. 每个页面的可见命令均有业务反馈，不存在只用于陈列、点击无效或只能展示静态默认态的控件。
11. 使用鼠标和键盘逐项验证 hover、pressed、focus-visible、open、loading、success/error 和 disabled，不允许只有静态默认态。
12. 每套实现必须能从代码中的 token、组件结构和动效规则回查到本文件的成熟组合，不能出现无来源的临时设计语言。
13. 每个页面均可切换深浅模式，切换后业务状态不丢失；刷新和跨页面后保持该风格的模式选择。
14. 自动检查页面及所有 Portal 浮层的计算样式，确认字体、控件外观和交互状态来自对应风格；不得出现系统默认下拉选项、按钮、输入框、日期控件或 Modal 内容。
15. 每套主题均能追踪到一个主设计系统及其公开文档；主系统已有完整定义的 token、组件状态、阴影、材质或动效不得被临时手写值覆盖。
