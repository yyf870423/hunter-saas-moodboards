# Hunter SaaS Moodboards

Hunter SaaS 的科技猎头视觉与交互方向研究，共包含 20 套结构明显不同的 Moodboard。每套方案都有一个独立的工作模型，并提供三个页面：

- **主要风格：** 用真实 Hunter 业务展示页面布局、信息层级和核心工作方式。
- **组件系统：** 展示该概念专属的按钮、输入、选择、状态、业务条目和浮层结构。
- **动效语言：** 展示四种与该概念和业务动作对应的独立动效。

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

Playwright 覆盖 20 套方案的主要风格页、组件页和动效页，并分别验证桌面、iPad 和 iPhone，共 180 个响应式页面组合；其余用例验证首页、方案独立结构、动效触发和废弃路由。

## 工程边界

- 使用薄 HTML 入口、共享设计 token、按方案分发的独立 React 布局与组件。
- 20 套组件页和动效页不共享同一个可见 DOM 模板。
- 首页缩略图由真实主页面自动截图生成，避免预览与内容不一致。
- 不包含 Hunter 业务源码、用户数据、凭据或内部 API。
- GitHub Actions 自动构建并发布到 GitHub Pages。

详细方案见 [二十套科技猎头 Moodboard 重设计方案](docs/二十套科技猎头Moodboard重设计方案.md)。
