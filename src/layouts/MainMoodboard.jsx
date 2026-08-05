import { techLayoutsA } from "./TechMoodboardsA";
import { techLayoutsB } from "./TechMoodboardsB";

const layouts = { ...techLayoutsA, ...techLayoutsB };

export function MainMoodboard({ board }) {
  const Layout = layouts[board.slug];
  return Layout ? <Layout /> : null;
}
