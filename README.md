# Hunter SaaS Moodboards

Hunter SaaS 的视觉、交互、动效与 3D 方向研究。当前包含 20 套方向：前 10 套从产品任务出发原创探索，后 10 套从真实优秀网站中提炼可迁移原则。每套均有四个独立页面：

- 主要风格：验证信息架构和首屏工作方式。
- 组件系统：覆盖输入、选择、导航、表格、实体、反馈和全部状态。
- 动效实验：覆盖十二类业务动效，并支持减少动态效果偏好。
- 3D 空间：十个独立 WebGL 场景，支持旋转、缩放和巡航。

第二轮参考 Landing Love、Landbook、Awwwards、One Page Love、Lapa Ninja、Aceternity UI、21st.dev 与 SiteInspire，只借鉴设计原则，不复制页面、代码或品牌资产。

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

方案说明见 [首轮十套 Moodboard 方案](docs/十套Moodboard方案.md) 与 [真实案例参考十套追加方案](docs/真实案例参考十套追加方案.md)。
