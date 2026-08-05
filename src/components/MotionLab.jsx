import { motionLabsA } from "./TechMotionLabsA";
import { motionLabsB } from "./TechMotionLabsB";

const labs = { ...motionLabsA, ...motionLabsB };

export function MotionLab({ board }) {
  const Lab = labs[board.slug];
  return Lab ? <Lab board={board} /> : null;
}
