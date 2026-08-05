import { Float, Grid, Line, OrbitControls, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, ChevronLeft, ChevronRight, Maximize2, MousePointer2, Rotate3D } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { referenceScenes, referenceSpatialCopy, referenceSpatialDetail, referenceSpatialTitles } from "./ReferenceScenes";

export function SpatialLab({ board }) {
  const [mode, setMode] = useState("探索");
  const Scene = scenes[board.slug];
  return (
    <section className="spatial-lab">
      <div className="spatial-canvas" data-scene={board.slug}>
        <Canvas camera={{ position: [7, 5.2, 8.4], fov: 43 }} dpr={[1, 1.75]} gl={{ antialias: true, alpha: false, preserveDrawingBuffer: true }}>
          <color attach="background" args={[board.canvas]} />
          <fog attach="fog" args={[board.canvas, 10, 25]} />
          <ambientLight intensity={board.slug === "data-atelier" ? 0.45 : 1.35} />
          <directionalLight position={[5, 8, 5]} intensity={2.4} color={board.slug === "calm-focus" ? "#fff3d2" : "#ffffff"} />
          <directionalLight position={[-6, 3, -5]} intensity={1.2} color={board.accent} />
          <Scene board={board} />
          <OrbitControls makeDefault enableDamping dampingFactor={0.06} minDistance={4.5} maxDistance={15} autoRotate={mode === "巡航"} autoRotateSpeed={0.45} />
        </Canvas>
      </div>
      <header className="spatial-title"><span>SPATIAL STUDY / {board.id}</span><h1>{board.name}<br/>3D 空间语言</h1><p>{spatialCopy[board.slug]}</p></header>
      <div className="spatial-controls"><span><MousePointer2/>拖动旋转</span><span><Rotate3D/>滚轮缩放</span><div>{["探索","巡航"].map(name=><button key={name} className={mode===name?"active":""} onClick={()=>setMode(name)}>{name}</button>)}</div><button title="全屏"><Maximize2/></button></div>
      <aside className="spatial-legend"><div><span>空间用途</span><strong>{spatialTitles[board.slug]}</strong></div><p>{spatialDetail[board.slug]}</p><nav><button><ChevronLeft/></button><b>01 / 03</b><button><ChevronRight/></button></nav></aside>
      <div className="spatial-badge"><Box/><span>实时 WebGL<small>支持旋转、缩放与减少动态效果</small></span></div>
    </section>
  );
}

function RotatingGroup({ children, speed = 0.08, ...props }) {
  const ref = useRef();
  useFrame((_, delta) => { if (ref.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) ref.current.rotation.y += delta * speed; });
  return <group ref={ref} {...props}>{children}</group>;
}

function PrecisionScene({ board }) {
  const cells = useMemo(() => Array.from({ length: 24 }, (_, i) => [(i % 6 - 2.5) * 1.15, (Math.floor(i / 6) - 1.5) * .78, ((i * 7) % 5 - 2) * .7]), []);
  return <RotatingGroup rotation={[.16, -.2, 0]}>{cells.map((p,i)=><group position={p} key={i}><mesh><boxGeometry args={[.72,.42,.42]}/><meshStandardMaterial color={i%7===0?board.signal:i%4===0?board.accent:board.panel} roughness={.45}/></mesh><Line points={[[.36,0,0],[.58,0,0]]} color={board.line}/></group>)}<Grid args={[12,8]} position={[0,-2.1,0]} cellColor={board.line} sectionColor={board.accent} fadeDistance={14}/></RotatingGroup>;
}

function EditorialScene({ board }) {
  return <RotatingGroup speed={.045} position={[0,-.5,0]}>{Array.from({length:19},(_,i)=>{const row=Math.floor(i/5),col=i%5;return <group key={i} position={[(col-2)*1.2,(row-1.5)*1.35,(row%2)*.45]} rotation={[0,(col-2)*-.04,0]}><mesh><boxGeometry args={[.88,1.18,.14]}/><meshStandardMaterial color={i%5===0?board.accent:i%4===0?board.signal:board.panel} roughness={.82}/></mesh><Line points={[[-.3,.25,.08],[.3,.25,.08],[-.3,.05,.08],[.22,.05,.08],[-.3,-.15,.08],[.32,-.15,.08]]} color={board.ink} lineWidth={.6}/></group>})}</RotatingGroup>;
}

function ConstellationScene({ board }) {
  const points = useMemo(()=>Array.from({length:27},(_,i)=>new THREE.Vector3(Math.sin(i*2.4)*(2.2+(i%4)*.28),Math.cos(i*.88)*2.1,Math.sin(i*.63)*2.5)),[]);
  const links = useMemo(()=>points.slice(1).map((point,i)=>[points[i%7],point]),[points]);
  return <RotatingGroup speed={.065}><Sparkles count={90} scale={10} size={1.5} speed={.2} color={board.ink}/>{links.map((pair,i)=><Line key={i} points={pair} color={i%5===0?board.signal:board.line} transparent opacity={.52}/>) }{points.map((p,i)=><Float key={i} speed={1+i%3*.2} floatIntensity={.15}><mesh position={p}><sphereGeometry args={[i%8===0?.22:.09,18,18]}/><meshStandardMaterial color={i%8===0?board.signal:i%3===0?board.accent:board.ink} emissive={i%8===0?board.signal:board.accent} emissiveIntensity={.3}/></mesh></Float>)}</RotatingGroup>;
}

function CalmScene({ board }) {
  return <group position={[0,-1.4,0]}><mesh rotation={[-Math.PI/2,0,0]}><circleGeometry args={[5.7,64]}/><meshStandardMaterial color={board.panel} roughness={.92}/></mesh>{[[-2,0,-.8],[0,.15,.5],[2.2,.05,-.4],[-.8,.2,2]].map((p,i)=><Float key={i} speed={.5} floatIntensity={.08}><mesh position={p} scale={[1.3,.5,1]}><sphereGeometry args={[.72,36,24]}/><meshStandardMaterial color={i===1?board.accent:i===3?board.signal:["#9d9b8e","#667269"][i%2]} roughness={.9}/></mesh></Float>)}<Line points={[[-3,.02,1.2],[-1,.02,.4],[.2,.02,.7],[2.6,.02,-1.5]]} color={board.signal} lineWidth={2}/><pointLight position={[0,5,0]} intensity={35} color="#fff0cc"/></group>;
}

function CommandScene({ board }) {
  return <RotatingGroup speed={.035} position={[0,-.5,0]}>{[[-2,1,0],[0,2,0],[2,.6,0],[0,-1.3,0]].map((p,i)=><group key={i} position={p}><mesh rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[.55,.55,2.2,20,1,true]}/><meshStandardMaterial color={i===3?board.signal:board.panel} metalness={.5} roughness={.35}/></mesh><mesh position={[0,0,1.2]}><sphereGeometry args={[.34,20,20]}/><meshStandardMaterial color={i===1?board.accent:board.signal} emissive={board.signal} emissiveIntensity={.25}/></mesh></group>)}<Line points={[[-3.1,1,0],[0,2,0],[3.1,.6,0],[0,-1.3,0],[-3.1,1,0]]} color={board.accent} lineWidth={2}/><Grid args={[12,10]} position={[0,-3,0]} cellColor={board.line} sectionColor={board.signal}/></RotatingGroup>;
}

function HumanScene({ board }) {
  return <RotatingGroup speed={.025} position={[0,-1,0]}>{[[-3,0,0],[-1.3,.4,1.1],[1.1,.2,.5],[3,0,-.5],[0,1.7,-1]].map((p,i)=><group key={i} position={p}><mesh position={[0,.8,0]}><sphereGeometry args={[.3,24,24]}/><meshStandardMaterial color={i===2?board.signal:board.accent} roughness={.8}/></mesh><mesh><capsuleGeometry args={[.38,.85,8,16]}/><meshStandardMaterial color={i===2?board.signal:board.panel} roughness={.82}/></mesh></group>)}<Line points={[[-3,.8,0],[-1.3,1.2,1.1],[1.1,1,.5],[3,.8,-.5]]} color={board.signal} lineWidth={3}/><Line points={[[-1.3,1.2,1.1],[0,2.5,-1],[3,.8,-.5]]} color={board.accent} lineWidth={1.6}/><mesh position={[0,-.55,0]}><boxGeometry args={[8,.12,4.5]}/><meshStandardMaterial color={board.panel} roughness={.95}/></mesh></RotatingGroup>;
}

function BauhausScene({ board }) {
  return <RotatingGroup speed={.05}>{[[-2.3,1,0,"box",board.accent],[0,1.5,-.5,"sphere",board.signal],[2.2,.7,.4,"cylinder","#2864b0"],[-1.2,-1.2,.7,"cylinder",board.ink],[1.4,-1.3,-.4,"box",board.panel]].map(([x,y,z,type,color],i)=><Float key={i} speed={.8+i*.15} rotationIntensity={.08}>{type==="sphere"?<mesh position={[x,y,z]}><sphereGeometry args={[1,32,32]}/><meshStandardMaterial color={color} roughness={.65}/></mesh>:type==="cylinder"?<mesh position={[x,y,z]} rotation={[Math.PI/2,0,i*.4]}><cylinderGeometry args={[.72,.72,1.5,32]}/><meshStandardMaterial color={color} roughness={.58}/></mesh>:<mesh position={[x,y,z]} rotation={[.2,i*.35,.15]}><boxGeometry args={[1.7,1.7,1.7]}/><meshStandardMaterial color={color} roughness={.7}/></mesh>}</Float>)}</RotatingGroup>;
}

function AtelierScene({ board }) {
  return <RotatingGroup speed={.022} position={[0,-1.5,0]}>{Array.from({length:13},(_,i)=>{const angle=i/13*Math.PI*2,r=2.3+(i%3)*.5,h=.8+(i%5)*.65;return <group key={i} position={[Math.cos(angle)*r,h/2,Math.sin(angle)*r]}><RoundedBox args={[.42,h,.42]} radius={.08}><meshPhysicalMaterial color={i%4===0?board.accent:board.panel} metalness={i%4===0?.85:.35} roughness={.2} transmission={i%4===0?0:.22} thickness={.5}/></RoundedBox></group>})}<mesh position={[0,3,0]}><octahedronGeometry args={[1.15,0]}/><meshPhysicalMaterial color={board.signal} metalness={.8} roughness={.12}/></mesh></RotatingGroup>;
}

function BlueprintScene({ board }) {
  return <RotatingGroup speed={.035} position={[0,-1.5,0]}>{Array.from({length:22},(_,i)=>{const x=i%6-2.5,z=Math.floor(i/6)-1.5,h=.7+(i*7%5)*.55;return <mesh key={i} position={[x*1.05,h/2,z*1.2]}><boxGeometry args={[.78,h,.78]}/><meshBasicMaterial color={i%5===0?board.signal:board.accent} wireframe/></mesh>})}<Grid args={[12,10]} position={[0,.01,0]} cellColor={board.line} sectionColor={board.signal}/><Line points={[[-3,3,-2],[-1,4,0],[1,2.5,1],[3,4,2]]} color={board.signal} lineWidth={2}/></RotatingGroup>;
}

function ModulesScene({ board }) {
  const positions = [[-2.4,1.2,0],[-.7,1.6,-.8],[1.2,1,.3],[2.7,1.5,-.4],[-1.7,-.9,.7],[.3,-.7,0],[2,-1,1]];
  return <RotatingGroup speed={.04}>{positions.map((p,i)=><Float key={i} speed={.7+i*.08} floatIntensity={.22}><RoundedBox args={[1.35,.9,.55]} radius={.12} position={p} rotation={[0,i*.16-.4,0]}><meshStandardMaterial color={[board.accent,board.signal,"#4da27d","#9c72c4",board.panel][i%5]} roughness={.55}/></RoundedBox></Float>)}<Line points={positions} color={board.line} lineWidth={1.2}/></RotatingGroup>;
}

const scenes = {
  "precision-desk": PrecisionScene,
  "editorial-intelligence": EditorialScene,
  "talent-constellation": ConstellationScene,
  "calm-focus": CalmScene,
  "command-center": CommandScene,
  "human-studio": HumanScene,
  "bauhaus-workflow": BauhausScene,
  "data-atelier": AtelierScene,
  "kinetic-blueprint": BlueprintScene,
  "adaptive-modules": ModulesScene,
  ...referenceScenes,
};

const spatialTitles = {
  "precision-desk": "精密组织格架", "editorial-intelligence": "空间档案柜", "talent-constellation": "人才关系宇宙", "calm-focus": "判断路径庭院", "command-center": "自动化管线网络", "human-studio": "人物关系桥梁", "bauhaus-workflow": "几何招聘机器", "data-atelier": "人才价值仪器", "kinetic-blueprint": "线框组织城市", "adaptive-modules": "可组合工作流",
  ...referenceSpatialTitles,
};
const spatialCopy = {
  "precision-desk": "规则轨道表达稳定、高效、可预测的批量处理。", "editorial-intelligence": "档案在空间中保留章节、证据和阅读顺序。", "talent-constellation": "镜头本身就是关系探索和筛选工具。", "calm-focus": "空间只留下当前决定所需的对象与路径。", "command-center": "任务在管线中流动，异常沿路径被快速定位。", "human-studio": "几何不再代表抽象节点，而是可到达的人际路径。", "bauhaus-workflow": "颜色、形状和方向共同编码业务状态。", "data-atelier": "材质、刻度和地形表达稀缺人才的相对价值。", "kinetic-blueprint": "二维策略可以进入三维剖面，检查路径与依赖。", "adaptive-modules": "模块像实体积木一样组合，并在设备间重新编排。",
  ...referenceSpatialCopy,
};
const spatialDetail = {
  "precision-desk": "适合组织结构、人才批次和流水线状态的概览。", "editorial-intelligence": "适合论文、专利、公司档案与证据材料的空间浏览。", "talent-constellation": "适合人物、组织、岗位、论文之间的复杂关系探索。", "calm-focus": "适合关键判断和少量高价值对象的沉浸审查。", "command-center": "适合观察跨平台任务、队列、瓶颈和异常恢复。", "human-studio": "适合展示引荐路径、合作历史和信任证据。", "bauhaus-workflow": "适合把抽象招聘流程变成高辨识度的功能模块。", "data-atelier": "适合人才比较、稀缺度和顾问判断的空间表达。", "kinetic-blueprint": "适合 Mapping、搜索计划和 Agent 任务依赖。", "adaptive-modules": "适合用户自定义任务台和自动化流程装配。",
  ...referenceSpatialDetail,
};
