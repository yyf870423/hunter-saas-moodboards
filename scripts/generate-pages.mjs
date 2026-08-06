import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { boards } from "../src/data/boards.js";

const views = [
  ["index.html", "main", "Dashboard"],
  ["components.html", "components", "组件与动效"],
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

for (const { slug, name } of boards) {
  rmSync(`boards/${slug}`, { recursive: true, force: true });
  for (const [file, view, label] of views) {
    const target = `boards/${slug}/${file}`;
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, shell({ board: slug, view, title: `${name} · ${label} · Hunter` }));
  }
}
