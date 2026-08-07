# Hunter SaaS Moodboards

Hunter SaaS 的专业猎头视觉与交互方向研究，共包含 10 套结构明显不同的 Moodboard。每套方案都有独立 DOM、交互状态和动效实现，并提供八类真实业务页面：

- **工作台 Dashboard：** 展示待办、提醒、业务指标和核心工作入口。
- **Agent：** 展示对话、任务控制、运行反馈和结果入口。
- **候选人列表：** 展示搜索、单选、多选、多级筛选、日期筛选、表格、Tooltip 和新增/删除 Modal。
- **招聘流程：** 展示储备、推进中、成功、失败四类业务泳道及拖拽反馈。
- **匹配结果：** 展示人岗匹配卡片、分数、证据和业务操作。
- **论文卡片列表：** 展示学术搜索结果、分级和导入操作。
- **上传与分析：** 展示文件选择、上传、解析、校验和失败状态。
- **任务进度：** 展示队列、执行中、暂停、失败和完成状态。

本轮已移除 3D 页面。科技感由专业信息结构、二维数据表达、组件造型、材质和业务动效建立，不依赖装饰性三维场景。

## 本地运行

```bash
npm install
npm run dev
```

本地地址：`http://127.0.0.1:4173/hunter-saas-moodboards/`

## 构建与测试

```bash
npm run build
npm run test:e2e
npm run capture:previews
npm run capture:review
```

Playwright 覆盖 10 套方案的八类业务页面、亮色与暗色主题，并分别验证桌面、iPad 和 iPhone，共 480 个响应式页面组合；其余用例验证首页、官方设计系统元数据、独立 DOM、独立交互、完整组件、动效触发、弹层、主题切换和废弃路由。

## 工程边界

- 使用薄 HTML 入口和十个独立 React Moodboard 模块。
- 十套方案不共享组件 DOM、交互状态或动效实现；仅共享静态演示数据和 Lucide 图标库。
- 每套方案以一个官方设计系统的语义 token、组件状态和材质规则为基础，不自行发明基础配色与状态规范。
- 首页缩略图由真实主页面自动截图生成，避免预览与内容不一致。
- 不包含 Hunter 业务源码、用户数据、凭据或内部 API。
- GitHub Actions 自动构建并发布到 GitHub Pages。

详细方案见 [十套 Hunter SaaS Moodboard 设计方案](docs/十套Hunter-SaaS-Moodboard设计方案.md)。
