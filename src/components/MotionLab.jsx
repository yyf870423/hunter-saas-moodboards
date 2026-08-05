import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import {
  Bell, Bot, Check, ChevronRight, Command, GripVertical, LoaderCircle, Network, Pause, Play,
  Plus, RotateCcw, Search, Sparkles, UserRound, X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const motionProfiles = {
  fast: { duration: 0.16, ease: [0.2, 0.8, 0.2, 1] },
  read: { duration: 0.42, ease: [0.4, 0, 0.2, 1] },
  orbit: { type: "spring", stiffness: 180, damping: 24 },
  calm: { duration: 0.52, ease: [0.22, 1, 0.36, 1] },
  live: { duration: 0.22, ease: [0.16, 1, 0.3, 1] },
  human: { type: "spring", stiffness: 160, damping: 22 },
  shape: { duration: 0.34, ease: [0.7, 0, 0.3, 1] },
  atelier: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  draw: { duration: 0.48, ease: "easeInOut" },
  layout: { type: "spring", stiffness: 260, damping: 28 },
  ledger: { duration: 0.14, ease: [0.16, 1, 0.3, 1] },
  telemetry: { duration: 0.2, ease: "linear" },
  audit: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] },
  atlas: { duration: 0.46, ease: [0.22, 1, 0.36, 1] },
  route: { duration: 0.58, ease: "easeInOut" },
  compile: { duration: 0.24, ease: [0.7, 0, 0.3, 1] },
  guide: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  fabric: { type: "spring", stiffness: 190, damping: 25 },
  browser: { duration: 0.2, ease: [0.2, 0.8, 0.2, 1] },
  gallery: { duration: 0.64, ease: [0.22, 1, 0.36, 1] },
};

const Demo = ({ id, title, description, children }) => <article className="motion-demo" data-demo={id}><header><span>{id}</span><div><h2>{title}</h2><p>{description}</p></div></header><div className="motion-stage">{children}</div></article>;

export function MotionLab({ board }) {
  const reduced = useReducedMotion();
  const transition = reduced ? { duration: 0 } : motionProfiles[board.motion];
  const [run, setRun] = useState(0);
  const [items, setItems] = useState(["林昊", "周雨澄", "陈松"]);
  const [toast, setToast] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [progress, setProgress] = useState(36);
  const [focus, setFocus] = useState(0);
  const [commandOpen, setCommandOpen] = useState(false);
  const [modules, setModules] = useState(["岗位队列", "Agent 运行", "候选人"]);

  useEffect(() => {
    const timer = setInterval(() => setProgress((value) => value >= 94 ? 24 : value + 7), 1200);
    return () => clearInterval(timer);
  }, []);

  const stream = useMemo(() => [
    ["11:42", "完成候选人证据核验"], ["11:38", "发现 3 条新关系路径"], ["11:34", "读取公开论文作者信息"],
  ], [run]);

  const replay = () => setRun((value) => value + 1);
  const addItem = () => setItems((list) => [`候选人 ${list.length + 1}`, ...list]);

  return (
    <div className="motion-lab">
      <header className="lab-intro motion-intro"><div><span>MOTION LANGUAGE / {board.id}</span><h1>{board.name}动效实验</h1></div><div><p>动效用于解释状态、层级、关系和任务进展。所有实验均支持减少动态效果偏好。</p><button className="button primary" onClick={replay}><RotateCcw size={15}/>全部重播</button></div></header>
      <div className="motion-grid" key={run}>
        <Demo id="01" title="分层进入" description="内容按信息优先级出现，而不是整页同时淡入。"><div className="stagger-demo">{["岗位目标", "关键技能", "风险判断", "寻访策略"].map((name,index)=><motion.div key={name} initial={{opacity:0,y:reduced?0:16}} animate={{opacity:1,y:0}} transition={{...transition,delay:reduced?0:index*0.09}}><span>0{index+1}</span><strong>{name}</strong><ChevronRight/></motion.div>)}</div></Demo>
        <Demo id="02" title="实时事件插入" description="新事件从来源方向进入，旧内容平稳让位。"><div className="insert-demo"><button onClick={addItem}><Plus/>插入一条</button><AnimatePresence initial={false}>{items.slice(0,4).map((name,index)=><motion.div layout key={name} initial={{opacity:0,x:reduced?0:-24,height:0}} animate={{opacity:1,x:0,height:46}} exit={{opacity:0,height:0}} transition={transition}><i/><span>{name}<small>{index===0?"刚刚":"2 分钟前"}</small></span><Check/></motion.div>)}</AnimatePresence></div></Demo>
        <Demo id="03" title="进度与数字" description="持续任务只动画变化值，不让整个布局抖动。"><div className="progress-demo"><div><span>Agent 运行进度</span><motion.strong key={progress} initial={{opacity:.4,y:-6}} animate={{opacity:1,y:0}}>{progress}%</motion.strong></div><i><motion.em animate={{width:`${progress}%`}} transition={transition}/></i><div className="progress-nodes">{[20,40,60,80].map((value)=><span className={progress>=value?"done":""} key={value}><i>{progress>=value?<Check/>:""}</i>{value===20?"计划":value===40?"召回":value===60?"核验":"整理"}</span>)}</div></div></Demo>
        <Demo id="04" title="Toast 与暂态反馈" description="反馈从固定边缘进入，不阻断当前任务。"><div className="toast-demo"><button className="button secondary" onClick={()=>setToast(true)}><Bell/>触发通知</button><AnimatePresence>{toast&&<motion.div className="motion-toast" initial={{opacity:0,y:reduced?0:22,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:12}} transition={transition}><Check/><span><strong>候选人已加入岗位</strong><small>匹配结果和来源证据已保留。</small></span><button onClick={()=>setToast(false)}><X/></button></motion.div>}</AnimatePresence></div></Demo>
        <Demo id="05" title="上下文 Drawer" description="详情沿空间方向打开，关闭后返回原操作位置。"><div className="drawer-demo"><button className="button secondary" onClick={()=>setDrawer(true)}>查看候选人</button><AnimatePresence>{drawer&&<><motion.button aria-label="关闭" className="motion-scrim" onClick={()=>setDrawer(false)} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}/><motion.aside initial={{x:reduced?0:"100%"}} animate={{x:0}} exit={{x:reduced?0:"100%"}} transition={transition}><header><span>候选人详情</span><button onClick={()=>setDrawer(false)}><X/></button></header><UserRound/><h3>林昊</h3><p>具身智能算法负责人</p><i/><i/><i/><button>打开完整资料</button></motion.aside></>}</AnimatePresence></div></Demo>
        <Demo id="06" title="关系聚焦" description="聚焦关系时保留上下文，其余节点降低存在感。"><div className="node-demo">{[[18,48],[47,22],[52,64],[80,38],[79,75]].map(([x,y],index)=><motion.button key={index} className={focus===index?"active":""} style={{left:`${x}%`,top:`${y}%`}} animate={{opacity:focus===index?1:.38,scale:focus===index?1.2:.92}} transition={transition} onClick={()=>setFocus(index)}><i/>{["岗位","林昊","周雨澄","论文","公司"][index]}</motion.button>)}<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M18 48 L47 22 L80 38 M47 22 L52 64 L79 75"/></svg></div></Demo>
        <Demo id="07" title="路径绘制" description="执行路径按真实顺序被描绘，帮助理解任务走向。"><div className="path-demo"><svg viewBox="0 0 600 130"><motion.path d="M30 65 H145 C180 65 180 25 215 25 H350 C385 25 385 100 420 100 H570" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:reduced?0:2,ease:"easeInOut"}}/></svg>{["输入", "计划", "多源召回", "门禁", "结果"].map((name,index)=><motion.span key={name} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:reduced?0:.25+index*.28}}>{name}</motion.span>)}</div></Demo>
        <Demo id="08" title="共享元素切换" description="同一对象在列表和详情之间保持视觉连续性。"><SharedElementDemo transition={transition}/></Demo>
        <Demo id="09" title="骨架到内容" description="加载状态维持稳定尺寸，内容到达后不发生跳动。"><SkeletonDemo transition={transition}/></Demo>
        <Demo id="10" title="模块重排" description="桌面模块重排与移动端任务栈使用同一空间规则。"><LayoutGroup><div className="module-motion-demo"><button onClick={()=>setModules(([a,b,c])=>[c,a,b])}><GripVertical/>重排模块</button><div>{modules.map((name,index)=><motion.article layout key={name} transition={transition}><span>0{index+1}</span><strong>{name}</strong><GripVertical/></motion.article>)}</div></div></LayoutGroup></Demo>
        <Demo id="11" title="命令面板" description="键盘优先的全局动作入口，打开时清晰保留页面层级。"><div className="command-demo"><button className="button secondary" onClick={()=>setCommandOpen(true)}><Command/>打开命令面板</button><AnimatePresence>{commandOpen&&<motion.div className="command-pop" initial={{opacity:0,scale:.96,y:-8}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.98}} transition={transition}><label><Search/><input autoFocus placeholder="搜索页面或执行命令"/><kbd>ESC</kbd></label>{["新建岗位","启动人才寻访","打开 Agent 运行","搜索候选人"].map((item,i)=><button key={item} onClick={()=>setCommandOpen(false)}><span><i>{i+1}</i>{item}</span><ChevronRight/></button>)}</motion.div>}</AnimatePresence></div></Demo>
        <Demo id="12" title="状态脉冲" description="只对需要关注的运行状态使用节制的循环动效。"><div className="pulse-demo"><motion.i animate={reduced?{}:{scale:[1,1.8,1],opacity:[.9,0,.9]}} transition={{duration:1.8,repeat:Infinity}}/><Bot/><span><strong>证据核验 Agent</strong><small>正在读取第 31 / 48 位候选人</small></span><button><Pause/></button></div></Demo>
      </div>
    </div>
  );
}

function SharedElementDemo({ transition }) {
  const [open, setOpen] = useState(false);
  return <div className="shared-demo"><AnimatePresence mode="wait">{!open?<motion.button layoutId="candidate-card" className="shared-row" onClick={()=>setOpen(true)}><motion.i layoutId="candidate-avatar">林</motion.i><span><strong>林昊</strong><small>具身智能算法负责人</small></span><ChevronRight/></motion.button>:<motion.article layoutId="candidate-card" className="shared-card"><button onClick={()=>setOpen(false)}><X/></button><motion.i layoutId="candidate-avatar">林</motion.i><h3>林昊</h3><p>匹配度 94 · 可通过 2 跳关系触达</p><span>查看完整资料</span></motion.article>}</AnimatePresence></div>;
}

function SkeletonDemo({ transition }) {
  const [loaded, setLoaded] = useState(false);
  return <div className="skeleton-motion-demo"><button onClick={()=>setLoaded(!loaded)}>{loaded?"重新加载":"显示内容"}</button><AnimatePresence mode="wait">{loaded?<motion.article key="content" initial={{opacity:0}} animate={{opacity:1}} transition={transition}><i>周</i><span><strong>周雨澄</strong><small>VLA 研究员 · 奇点智研</small></span><b>88</b></motion.article>:<motion.article key="skeleton" className="is-skeleton" exit={{opacity:0}}><i/><span><em/><em/></span><b/></motion.article>}</AnimatePresence></div>;
}
