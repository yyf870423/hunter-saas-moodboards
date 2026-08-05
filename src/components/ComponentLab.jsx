import { componentLabsA } from "./TechComponentLabsA";
import { componentLabsB } from "./TechComponentLabsB";

const labs = { ...componentLabsA, ...componentLabsB };

export function ComponentLab({ board }) {
  const Lab = labs[board.slug];
  return Lab ? <Lab board={board} /> : null;
}
