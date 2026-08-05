import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const boards = [
  ["precision-desk", "精密作业台"],
  ["editorial-intelligence", "编辑部研究桌"],
  ["talent-constellation", "人才星图"],
  ["calm-focus", "静谧焦点"],
  ["command-center", "招聘指挥中心"],
  ["human-studio", "人本关系所"],
  ["bauhaus-workflow", "包豪斯流程系统"],
  ["data-atelier", "数据裁缝"],
  ["kinetic-blueprint", "动态蓝图"],
  ["adaptive-modules", "自适应模块台"],
];

const views = [
  ["index.html", "main", "主要风格"],
  ["components.html", "components", "组件"],
  ["motion.html", "motion", "动效"],
  ["spatial.html", "spatial", "3D 空间"],
];

const shell = ({ board = "", view = "catalog", title = "Hunter SaaS Moodboards" }) => `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Hunter SaaS 产品视觉与交互 Moodboard" />
    <title>${title}</title>
  </head>
  <body data-board="${board}" data-view="${view}">
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
`;

writeFileSync("index.html", shell({}));

for (const [slug, name] of boards) {
  for (const [file, view, label] of views) {
    const target = `boards/${slug}/${file}`;
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, shell({ board: slug, view, title: `${name} · ${label} · Hunter` }));
  }
}
