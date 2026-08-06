# Hunter SaaS Moodboards

Hunter SaaS 的专业猎头视觉与交互方向研究，共包含 10 套结构明显不同的 Moodboard。每套方案都有独立 DOM、交互状态和动效实现，并提供两个页面：

- **Dashboard：** 用真实 Hunter 业务展示页面布局、信息层级和核心工作方式。
- **组件与交互：** 展示完整按钮、表单、选择、数据、业务资产、状态、浮层和四组专属业务动效。

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

Playwright 覆盖 10 套方案的 Dashboard 和组件与交互页，并分别验证桌面、iPad 和 iPhone，共 60 个响应式页面组合；其余用例验证首页、独立 DOM、独立交互、完整组件、动效触发、图谱清除和废弃路由。

## 工程边界

- 使用薄 HTML 入口和十个独立 React Moodboard 模块。
- 十套方案不共享组件 DOM、交互状态或动效实现；仅共享静态演示数据和 Lucide 图标库。
- 首页缩略图由真实主页面自动截图生成，避免预览与内容不一致。
- 不包含 Hunter 业务源码、用户数据、凭据或内部 API。
- GitHub Actions 自动构建并发布到 GitHub Pages。

详细方案见 [十套 Hunter SaaS Moodboard 设计方案](docs/十套Hunter-SaaS-Moodboard设计方案.md)。
