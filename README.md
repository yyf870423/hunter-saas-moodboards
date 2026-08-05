# Hunter SaaS Moodboards

Hunter SaaS 的视觉、交互、动效与 3D 方向研究。第一轮包含十套从产品任务出发的原创方向，每套均有四个独立页面：

- 主要风格：验证信息架构和首屏工作方式。
- 组件系统：覆盖输入、选择、导航、表格、实体、反馈和全部状态。
- 动效实验：覆盖十二类业务动效，并支持减少动态效果偏好。
- 3D 空间：十个独立 WebGL 场景，支持旋转、缩放和巡航。

第二轮将基于真实优秀网站案例提炼十套新增方向，只借鉴设计原则，不复制页面、代码或品牌资产。

## 本地运行

```bash
npm install
npm run dev
```

## 构建与测试

```bash
npm run build
npm run test:e2e
```

本地地址：`http://127.0.0.1:4173/hunter-saas-moodboards/`

## 工程边界

- 使用薄 HTML 页面入口、共享 React 组件、共享 token 和独立布局组件。
- 不包含 Hunter 业务源码、用户数据、凭据或内部 API。
- GitHub Actions 自动构建并发布到 GitHub Pages。
- Playwright 覆盖桌面、iPad、iPhone 和 Canvas 像素验收。

方案说明见 [十套 Moodboard 方案](docs/十套Moodboard方案.md)。
