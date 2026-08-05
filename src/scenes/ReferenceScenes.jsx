import { Float, Grid, Line, RoundedBox, Sparkles } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Rotor({ children, speed = .07, ...props }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current.rotation.y += delta * speed;
  });
  return <group ref={ref} {...props}>{children}</group>;
}

function LedgerScene({ board }) {
  return <Rotor position={[0, -.5, 0]} speed={.11}>{Array.from({ length: 7 }, (_, i) => <group key={i} position={[(i - 3) * .95, Math.sin(i) * .55, 0]} rotation={[Math.PI / 2, 0, 0]}><mesh><cylinderGeometry args={[.7, .7, .34, 22]} /><meshStandardMaterial color={i % 3 === 0 ? board.signal : i % 2 ? board.accent : board.panel} roughness={.5} /></mesh>{Array.from({ length: 6 }, (_, j) => <mesh key={j} position={[Math.cos(j * Math.PI / 3) * .43, .2, Math.sin(j * Math.PI / 3) * .43]}><boxGeometry args={[.11, .08, .11]} /><meshStandardMaterial color={board.ink} /></mesh>)}</group>)}<Line points={[[-3.5, -1.35, 0], [3.5, -1.35, 0]]} color={board.ink} lineWidth={2} /><Grid args={[11, 8]} position={[0, -2.2, 0]} cellColor={board.line} sectionColor={board.accent} /></Rotor>;
}

function TelemetryScene({ board }) {
  const points = useMemo(() => Array.from({ length: 420 }, (_, i) => {
    const angle = i * .31;
    const radius = 1.1 + (i % 19) * .075;
    return new THREE.Vector3(Math.cos(angle) * radius, ((i * 17) % 80) / 18 - 2.1, Math.sin(angle) * radius);
  }), []);
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  return <Rotor speed={.055}><points geometry={geometry}><pointsMaterial color={board.signal} size={.045} sizeAttenuation /></points>{[1.1, 1.8, 2.5].map((r, i) => <mesh key={r} rotation={[Math.PI / 2, i * .3, 0]}><torusGeometry args={[r, .018, 8, 72]} /><meshBasicMaterial color={i === 1 ? board.accent : board.line} /></mesh>)}<Line points={[[-3, -1.8, -2], [-1.5, -.4, -1], [0, 1.1, 0], [1.7, .25, 1], [3, 1.7, 2]]} color={board.accent} lineWidth={2} /><Sparkles count={35} scale={8} color={board.ink} size={1} /></Rotor>;
}

function TrustScene({ board }) {
  return <Rotor speed={.03} position={[0, -1.1, 0]}>{Array.from({ length: 6 }, (_, i) => <RoundedBox key={i} args={[4.8 - i * .42, .24, 3.2 - i * .32]} radius={.05} position={[0, i * .42, 0]}><meshStandardMaterial color={i === 5 ? board.accent : i % 2 ? board.panel : "#d8d1c3"} roughness={.72} /></RoundedBox>)}{[1.1, 1.55, 2].map((r, i) => <mesh key={r} position={[0, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[r, .08, 10, 60]} /><meshStandardMaterial color={i === 1 ? board.signal : board.accent} metalness={.35} roughness={.36} /></mesh>)}<mesh position={[0, 2.1, 0]}><cylinderGeometry args={[.48, .48, .55, 32]} /><meshStandardMaterial color={board.ink} /></mesh></Rotor>;
}

function AtlasScene({ board }) {
  return <Rotor speed={.04} position={[0, -.8, 0]}>{Array.from({ length: 14 }, (_, i) => { const a = i / 14 * Math.PI * 2; const h = .6 + (i * 11 % 8) * .3; return <group key={i} position={[Math.cos(a) * 2.6, h / 2, Math.sin(a) * 2.6]} rotation={[0, -a, 0]}><mesh><boxGeometry args={[.6, h, .22]} /><meshStandardMaterial color={i % 4 === 0 ? board.signal : i % 3 === 0 ? board.accent : board.panel} roughness={.68} /></mesh></group>; })}<mesh position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[1.25, .3, 18, 64, Math.PI * 1.55]} /><meshStandardMaterial color={board.accent} roughness={.48} /></mesh><Line points={Array.from({ length: 24 }, (_, i) => [Math.cos(i / 23 * Math.PI * 2) * 3.4, .05, Math.sin(i / 23 * Math.PI * 2) * 3.4])} color={board.ink} /></Rotor>;
}

function ExpeditionScene({ board }) {
  const route = [[-3, .6, 2], [-1.7, 1.3, .8], [-.5, .7, -.4], [.8, 1.9, -1.4], [2.4, 1.1, -2.1], [3.2, 2.2, -.4]];
  return <Rotor speed={.018} position={[0, -1.8, 0]}>{Array.from({ length: 64 }, (_, i) => { const x = i % 8 - 3.5, z = Math.floor(i / 8) - 3.5, h = .12 + (Math.sin(x * .8) + Math.cos(z * .65) + 2) * .25; return <mesh key={i} position={[x * .82, h / 2, z * .82]}><boxGeometry args={[.78, h, .78]} /><meshStandardMaterial color={i % 11 === 0 ? board.signal : i % 7 === 0 ? board.accent : board.panel} roughness={.92} /></mesh>; })}<Line points={route} color={board.accent} lineWidth={3} />{route.map((p, i) => <group position={p} key={i}><mesh><sphereGeometry args={[.15, 18, 18]} /><meshStandardMaterial color={i === 3 ? board.signal : board.accent} emissive={board.accent} emissiveIntensity={.25} /></mesh><mesh position={[0, .45, 0]}><cylinderGeometry args={[.02, .02, .7, 8]} /><meshStandardMaterial color={board.ink} /></mesh></group>)}</Rotor>;
}

function CompileScene({ board }) {
  return <Rotor speed={.055} position={[0, -.6, 0]}><group rotation={[0, -.3, 0]}>{Array.from({ length: 20 }, (_, i) => <Float key={i} speed={.8 + i * .03} floatIntensity={.08}><RoundedBox args={[.72, .32, .72]} radius={.08} position={[(i % 5 - 2) * 1.05, (Math.floor(i / 5) - 1.5) * .75, 0]}><meshStandardMaterial color={i % 7 === 0 ? board.signal : i % 4 === 0 ? board.accent : board.panel} roughness={.62} /></RoundedBox></Float>)}<mesh position={[0, -2.25, 0]}><boxGeometry args={[6.5, .32, 2.2]} /><meshStandardMaterial color={board.ink} metalness={.35} roughness={.5} /></mesh>{Array.from({ length: 6 }, (_, i) => <mesh key={i} position={[(i - 2.5) * 1.1, -2, 0]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[.32, .32, 2.35, 18]} /><meshStandardMaterial color={board.accent} /></mesh>)}</group></Rotor>;
}

function GuidedScene({ board }) {
  return <Rotor speed={.025} position={[0, -1.25, 0]}>{[-2.6, -.9, .8, 2.5].map((x, i) => <group key={x} position={[x, i % 2 * .35, 0]}><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.75, .16, 16, 48, Math.PI]} /><meshStandardMaterial color={i % 2 ? board.signal : board.accent} roughness={.76} /></mesh><mesh position={[-.75, -.35, 0]}><boxGeometry args={[.3, 1.1, .3]} /><meshStandardMaterial color={i % 2 ? board.signal : board.accent} /></mesh><mesh position={[.75, -.35, 0]}><boxGeometry args={[.3, 1.1, .3]} /><meshStandardMaterial color={i % 2 ? board.signal : board.accent} /></mesh></group>)}<Line points={[[-3.5, -.7, 0], [-2, -.1, .4], [-.4, -.6, 0], [1.1, .25, -.4], [3.4, -.3, 0]]} color={board.ink} lineWidth={2} />{Array.from({ length: 7 }, (_, i) => <Float key={i} speed={.6} floatIntensity={.14}><mesh position={[(i - 3) * .9, 1.2 + i % 2 * .5, (i % 3 - 1) * .5]}><octahedronGeometry args={[.25]} /><meshStandardMaterial color={i % 2 ? board.accent : board.signal} /></mesh></Float>)}</Rotor>;
}

function FabricScene({ board }) {
  const lanes = [-1.8, -.6, .6, 1.8];
  return <Rotor speed={.028}>{lanes.map((y, i) => <group key={y}><Line points={Array.from({ length: 18 }, (_, j) => { const x = -3.5 + j * .42; return [x, y + Math.sin(j * .55 + i) * .27, Math.cos(j * .45 + i) * .8]; })} color={i % 2 ? board.accent : board.signal} lineWidth={7} transparent opacity={.76} />{[2, 7, 12, 16].map((j) => <mesh key={j} position={[-3.5 + j * .42, y + Math.sin(j * .55 + i) * .27, Math.cos(j * .45 + i) * .8]}><sphereGeometry args={[.16, 16, 16]} /><meshStandardMaterial color={board.panel} /></mesh>)}</group>)}<Line points={[[-2.7, -1.8, 0], [-1.3, -.6, 0], [.5, .6, 0], [2.4, 1.8, 0]]} color={board.ink} lineWidth={1.5} /></Rotor>;
}

function LibraryScene({ board }) {
  return <Rotor speed={.02} position={[0, -.5, 0]}>{[-2.4, 0, 2.4].map((x, lane) => <group key={x} position={[x, 0, lane === 1 ? -.8 : 0]} rotation={[0, lane === 0 ? .18 : lane === 2 ? -.18 : 0, 0]}>{Array.from({ length: 7 }, (_, i) => <RoundedBox key={i} args={[1.25, .82, .12]} radius={.03} position={[0, (i - 3) * 1.02, 0]}><meshStandardMaterial color={i % 4 === 0 ? board.signal : i % 3 === 0 ? board.accent : board.panel} roughness={.7} /></RoundedBox>)}</group>)}<Grid args={[11, 9]} position={[0, -3.65, 0]} cellColor={board.line} sectionColor={board.accent} /><Sparkles count={35} scale={8} color={board.ink} size={.8} /></Rotor>;
}

function GalleryScene({ board }) {
  return <Rotor speed={.016} position={[0, -1.7, 0]}><mesh><boxGeometry args={[8, .15, 5]} /><meshStandardMaterial color={board.panel} roughness={.95} /></mesh>{[[-2.5, .7, -.8], [0, 1.05, .6], [2.5, .65, -.4]].map((p, i) => <group key={i} position={p}><mesh><boxGeometry args={[1.4, p[1] * 1.5, 1.4]} /><meshStandardMaterial color={i === 1 ? board.accent : "#d9d4ca"} roughness={.8} /></mesh><Float speed={.5 + i * .1} floatIntensity={.1}><mesh position={[0, p[1] + .7, 0]} rotation={[.2, i * .5, .1]}>{i === 0 ? <icosahedronGeometry args={[.65, 0]} /> : i === 1 ? <torusKnotGeometry args={[.52, .16, 72, 12]} /> : <octahedronGeometry args={[.75, 0]} />}<meshStandardMaterial color={i === 1 ? board.signal : board.ink} metalness={.25} roughness={.4} /></mesh></Float></group>)}{[-3.6, 3.6].map((x) => <mesh key={x} position={[x, 2.2, -2]}><boxGeometry args={[.12, 4.2, .12]} /><meshStandardMaterial color={board.ink} /></mesh>)}</Rotor>;
}

export const referenceScenes = {
  "kinetic-ledger": LedgerScene,
  "physical-telemetry": TelemetryScene,
  "institutional-trust": TrustScene,
  "ai-state-atlas": AtlasScene,
  "expedition-search": ExpeditionScene,
  "compile-workshop": CompileScene,
  "guided-service": GuidedScene,
  "teamwork-fabric": FabricScene,
  "pattern-library": LibraryScene,
  "digital-curatorial": GalleryScene,
};

export const referenceSpatialTitles = {
  "kinetic-ledger": "机械信号账本", "physical-telemetry": "点云遥测场", "institutional-trust": "可验证档案层", "ai-state-atlas": "研究状态图册", "expedition-search": "搜索探索地形", "compile-workshop": "候选人编译机", "guided-service": "连续服务路径", "teamwork-fabric": "协作关系织带", "pattern-library": "空间资料走廊", "digital-curatorial": "业务成果展厅",
};

export const referenceSpatialCopy = {
  "kinetic-ledger": "计数轮、批次和票据共同表达快速但可追踪的判断。", "physical-telemetry": "点云、轨迹和时间环把运行过程变成可回放的工程记录。", "institutional-trust": "层叠档案与验证环强调业务写入的审计顺序。", "ai-state-atlas": "数据柱与主题环组成可以缩放查看的研究图册。", "expedition-search": "地形、航路和站点保留长任务的上下文与 checkpoint。", "compile-workshop": "机械键和传送带把搜索、匹配与门禁组织成工序。", "guided-service": "连续拱门和任务令牌帮助用户理解当前步骤与下一步。", "teamwork-fabric": "多层织带表示人员、任务、证据和结果之间的协作流。", "pattern-library": "档案墙支持大规模资料的巡航、聚焦与比较。", "digital-curatorial": "展厅、展台和展签突出高价值业务成果。",
};

export const referenceSpatialDetail = {
  "kinetic-ledger": "适合批量候选人判断、证据票据和状态确认。", "physical-telemetry": "适合 Agent、人才渠道和附件解析的实时观测。", "institutional-trust": "适合字段审批、责任归属和写入影响解释。", "ai-state-atlas": "适合岗位研究、行业分析和数据结论浏览。", "expedition-search": "适合运行数小时或数天的找人、Mapping 和调研任务。", "compile-workshop": "适合把多阶段自动化过程转译为清楚的质量工序。", "guided-service": "适合新用户完成复杂但目标明确的业务操作。", "teamwork-fabric": "适合多人协作、责任交接和上下游产物追踪。", "pattern-library": "适合候选人、公司、论文和证据的高密度检索。", "digital-curatorial": "适合重点候选人、研究成果和公司档案的展示。",
};
