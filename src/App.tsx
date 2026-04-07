import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { 
  Terminal, Cpu, Globe, Rocket, Github, Mail, MapPin, 
  ExternalLink, Phone, User, Calendar, Briefcase, 
  GraduationCap, Award, PlaySquare, HardDrive, ChevronRight, Upload, MonitorPlay,
  Gamepad2, Ghost, Swords, Trophy, Coins, Heart
} from 'lucide-react';

// --- Custom Components for Interaction ---

const FloatingParticles = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-[#00ffff] shadow-[0_0_10px_#00ffff]"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: -100,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10
          }}
        />
      ))}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`magenta-${i}`}
          className="absolute w-2 h-2 bg-[#ff00ff] shadow-[0_0_10px_#ff00ff]"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 100,
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{
            y: -100,
            rotate: Math.random() * 360
          }}
          transition={{
            duration: Math.random() * 12 + 12,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 12
          }}
        />
      ))}
    </div>
  );
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div 
      className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-[#00ffff] via-[#ff00ff] to-[#ffff00] z-[10000] shadow-[0_0_10px_#ff00ff]"
      style={{ scaleX: scrollYProgress, transformOrigin: "0%", width: "100%" }}
    />
  );
};

const TiltCard = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`relative ${className}`}
    >
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

const resumeData = {
  name: "曹 仁",
  avatarUrl: "", // 如果你想展示真实照片，把照片发给我，我会把链接填在这里。留空则显示默认幽灵图标。
  title: "发行素材项目负责人 / 广告视频制作 / 素材创意策划",
  info: [
    { icon: Phone, text: "18510980584" },
    { icon: Mail, text: "932120004@qq.com" },
    { icon: User, text: "男 | 30 岁" },
    { icon: MapPin, text: "期望城市：北京" },
    { icon: Calendar, text: "工作经验：8 年" }
  ],
  profile: [
    {
      title: "专业背景与全栈制作把控",
      desc: "游戏设计专业出身，深耕游戏买量素材 8 年。具备一定的艺术审美与制作能力（AE/PR/UE/3D Max等全流程把控），能将抽象的游戏卖点精准转化为高转化率的视觉语言。",
      icon: Gamepad2
    },
    {
      title: "数据驱动与方法论沉淀",
      desc: "拥有成熟的“市场洞察—脚本构建—AB测试—调优迭代”闭环链路。敏锐捕捉前端投放数据反馈（CTR/CVR等），以此反推并指导创意方向，有效破局素材衰退期。",
      icon: Terminal
    },
    {
      title: "多元品类驾驭与研发赋能",
      desc: "负责过重度（SLG/MMO/MOBA）、中轻度（三消/卡牌/模拟经营/IAA小游戏）全品类的国内信息流素材、海外素材及 Playable（可玩广告）等多样化形态。",
      icon: Globe
    },
    {
      title: "中台基建与AI赋能",
      desc: "具备从 0 到 1 搭建发行素材中台的管理经验。熟练运用前沿 AI 生产力工具及 OpenClaw 等数据分析/竞品拆解工具，结合内部标准化 SOP 与外部供应商管理体系，大幅提升团队整体产能与人效比。",
      icon: Cpu
    },
    {
      title: "跨职能协同能力",
      desc: "深度介入研发上游，多次提供产品美术风格验证、核心玩法打样的前置吸量测试支持。",
      icon: Rocket
    }
  ],
  experience: [
    {
      company: "元保集团",
      role: "素材创意制作",
      date: "2023.10 - 至今",
      achievement: <>核心成就：业务线从0到1搭建成果显著，入职半年内即获得公司<span className="text-[#ffff00] font-black text-lg drop-shadow-[0_0_8px_rgba(255,255,0,0.8)] px-1">激励股份</span>。</>,
      bullets: [
        "素材管线基建：负责国内 IAA/IAP 小游戏的核心素材创意与制作闭环。从 0 到 1 搭建并完善内部发行素材产出标准、归档流程与质量验收体系。",
        "研发前置赋能：深入研发源头，为研发侧的新品立项提供极具市场导向的数据支持，包括美术风格、游戏玩法测试测试、世界观包装素材测试，以及核心玩法早期 Demo 的概念吸量测试。",
        "效能与外包管理：积极研究并引入各类前沿美术 AI 工具融入量产工作流，以及Openclaw等工具进行竞品监测分析与素材拆等。同时搭建包含“爆款框架”与“多维标签”的内部创意库，全方位提升团队优化效率。",
        "外包生态管理：负责核心美术及视频外包团队的审核、项目开拓与日常交付质量管控。"
      ]
    },
    {
      company: "点点互动（Century Games）",
      role: "创意策划",
      date: "2024.08 - 2024.09",
      bullets: [
        "模拟经营发力：负责公司核心业务——国内模拟经营类产品的信息流广告创意深挖，以及Playable广告的创意策划及高转化互动逻辑设计。",
        "新项目验证：参与内部多个前沿测试项目的素材玩法测试，快速出样并配合买量投放，验证市场可行性。"
      ]
    },
    {
      company: "竞技世界（北京）网络技术有限公司",
      role: "发行素材项目负责人",
      date: "2019.06 - 2024.03",
      achievement: <>核心成就：手游发行部初创成员，伴随部门从0到1建立，入职首年荣获“<span className="text-[#e066ff] font-black text-lg drop-shadow-[0_0_8px_rgba(224,102,255,0.8)] px-1">公司最佳新锐奖</span>”。</>,
      projects: "负责项目：SLG、MMO、MOBA、三消、卡牌等全品类矩阵（代表作：《JJ系列》《曙光英雄》《萌宠满屋》《流浪城堡》(Moving Castle)《King of septsea》(Age of Ocean)等）。",
      sections: [
        {
          title: "【创意与数据迭代】策略深挖与效果驱动",
          items: [
            "策略与脚本构建：基于竞品监控、受众痛点分析及市场流行趋势，精准提炼核心“跑量点”。持续输出高起量率的买量脚本，并建立包含“爆款框架”与“多维素材标签”的内部创意库。",
            "数据归因与优化：高效协同UA投放团队，深度解析前端大盘数据反馈。针对核心转化痛点（CTR/CVR），对素材进行精细化A/B测试与分层迭代，有效延长优质素材的跑量生命周期。"
          ]
        },
        {
          title: "【内部团队管理与机制建设】高效统筹与赋能",
          items: [
            "生产SOP与产能规划：梳理并规范内部素材的流转标准及SOP。根据买量端不同阶段（如吸量测试、首发大推、维稳期），科学评估需求优先级并统筹调配人效，保障高额产能需求下的零延期交付。",
            "流程打通与降本增效：作为质量最终把关人，建立清晰的美术验收及审核流。成功打通“投放端（需求/数据）— 策划端（创意/脚本）— 制作端（美术表现）”的信息壁垒，消除信息差，大幅降低无效返工率，提升团队整体产出坪效。",
            "创意赋能与团队成长：建立常态化的“数据回传-创意复盘”机制。定期组织头脑风暴，深度拆解市场上Top级爆款素材的“前3秒Hook、视觉色彩、CTA逻辑”，持续拔高团队的商业审美与创意网感。"
          ]
        },
        {
          title: "【统筹与制作全栈】高标品控与全流程把关",
          items: [
            "美术品质与效果落地：精通AE、PR等后期工具并可独立高质出片；熟悉UE（虚幻引擎）、3D MAX等三维软件全流程。严格把控从“前期概念 — 分镜Layout — 动效渲染 — 最终成片”的各环节落地还原度及视觉张力。"
          ]
        },
        {
          title: "【项目统筹与协同管理】资源中枢与资产沉淀",
          items: [
            "跨部门全局调度：作为项目发行的核心素材枢纽，在游戏不同关键节点，高效拉通市场、投放、素材及研发资源，拉齐多方目标与排期，保障优质素材的满载供给。",
            "外包生态与供应商管理：从0搭建完善的外包管理体系（涵盖准入评估、SOP规范、验收标准及反馈机制），持续扩充保质保量的优质供应商资源池。",
            "中台资产沉淀：系统性梳理优质素材库及工程模板阵列，构建可规模化复用的沉淀资产池，从底层工具逻辑上提升全团队的设计复用率和人效。"
          ]
        }
      ],
      caseStudy: {
        title: "🌟 【核心业绩案例（以SLG《King of septsea》出海项目为例）】",
        items: [
          "挑战：项目初期需确定吸量受众，降低全链路转化成本。",
          "行动：通过多次不同美术风格（欧美卡通vs写实等）和游戏玩法变种的A/B测试素材，精准锁定了最匹配目标用户的画风与买量噱头。",
          "结果：配合投放策略，将 T1国家CTR由0.9%拉升至2.2%，CVR由35%提升至52%，CPI从10美金骤降至1.6美金；T3国家CTR由0.7%升至1.5%，CVR由17%升至36%，CPI从1.6美金降至0.3美金（Install模式），极大优化了用户获取效率与买量成本。"
        ]
      }
    },
    {
      company: "掌游天下（北京）信息技术股份有限公司",
      role: "Playable广告创意",
      date: "2018.07 - 2019.06",
      bullets: [
        "互动流设计：负责多品类休闲及中重度游戏的 Playable (可玩广告) 创意制作。",
        "转化调优：深入拆解游戏核心玩法，通过设计诱导点击的沉浸式“互动体验”与“游玩正反馈机制”，显著提升用户在试玩环节的停留时长、点击率及最终下载转化率。"
      ]
    }
  ],
  education: {
    school: "内蒙古师范大学",
    major: "游戏设计专业",
    degree: "本科",
    date: "2014.09 - 2018.06"
  },
  featuredWorks: [
    {
      title: "图鉴 01 / CODEX 01",
      src: "//player.bilibili.com/player.html?isOutside=true&aid=1653731887&bvid=BV1QE421L79G&cid=25670917036&p=1&high_quality=1&danmaku=0",
    },
    {
      title: "图鉴 02 / CODEX 02",
      src: "//player.bilibili.com/player.html?isOutside=true&aid=113168227503899&bvid=BV1wVbFeKEaQ&cid=25671045612&p=2&high_quality=1&danmaku=0",
    },
    {
      title: "图鉴 03 / CODEX 03",
      src: "//player.bilibili.com/player.html?isOutside=true&aid=113168126839999&bvid=BV1KPbFeGEvZ&cid=25670983335&p=17&high_quality=1&danmaku=0",
    },
    {
      title: "图鉴 04 / CODEX 04",
      src: "//player.bilibili.com/player.html?isOutside=true&aid=113168126839999&bvid=BV1KPbFeGEvZ&cid=25670982811&p=4&high_quality=1&danmaku=0",
    },
    {
      title: "图鉴 05 / CODEX 05",
      src: "//player.bilibili.com/player.html?isOutside=true&aid=1353598645&bvid=BV1Bz42167rE&cid=1519672810&p=1&high_quality=1&danmaku=0",
    },
    {
      title: "图鉴 06 / CODEX 06",
      src: "//player.bilibili.com/player.html?isOutside=true&aid=116341839238990&bvid=BV1eS9uBEEMD&cid=37217698501&p=1&high_quality=1&danmaku=0",
    }
  ],
  portfolio: [
    {
      title: "B站在线作品合集",
      url: "https://space.bilibili.com/233305892",
      icon: PlaySquare
    },
    {
      title: "网盘完整作品集",
      url: "https://pan.baidu.com/s/1541FC4d7eX_ZvrY1wf73hw?pwd=6666",
      desc: "提取码: 6666",
      icon: HardDrive
    }
  ]
};

const BackgroundEffects = () => (
  <div className="fixed inset-0 pointer-events-none z-[-2] overflow-hidden bg-[#0b0218]">
    {/* Grid */}
    <svg className="absolute inset-0 w-full h-full">
      <defs>
        <pattern id="bgGrid" width="60" height="60" patternUnits="userSpaceOnUse">
          <rect width="60" height="1" fill="rgba(255,0,255,0.03)" />
          <rect width="1" height="60" fill="rgba(255,0,255,0.03)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bgGrid)" />
    </svg>
    
    {/* Glowing Orbs */}
    <div className="absolute top-[20%] left-[10%] w-[40vw] h-[40vw] bg-[#4a148c] rounded-full mix-blend-screen filter blur-[100px] opacity-30"></div>
    <div className="absolute bottom-[10%] right-[10%] w-[30vw] h-[30vw] bg-[#00ffff] rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
    
    {/* Floating Plus Signs */}
    <div className="absolute top-[30%] right-[20%] text-[#ff00ff] opacity-20 text-6xl font-bold">+</div>
    <div className="absolute bottom-[40%] left-[15%] text-[#00ffff] opacity-20 text-8xl font-bold">+</div>
  </div>
);

const SectionTitle = ({ title, subtitle, color = "cyan" }: { title: string, subtitle: string, color?: "cyan" | "magenta" | "yellow" }) => {
  const mainColor = color === "cyan" ? "#00ffff" : color === "magenta" ? "#ff00ff" : "#ffff00";
  const subColor = color === "cyan" ? "#ff00ff" : color === "magenta" ? "#00ffff" : "#ff00ff";
  
  return (
    <div className="text-center mb-16">
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-[#ff00ff] rotate-45 shadow-[0_0_8px_#ff00ff]"></div>
          <div className="w-12 h-0.5 bg-[#00ffff] shadow-[0_0_8px_#00ffff]"></div>
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-widest" style={{ textShadow: `0 0 10px ${mainColor}` }}>
          {title}
        </h2>
        <div className="flex items-center gap-1">
          <div className="w-12 h-0.5 bg-[#00ffff] shadow-[0_0_8px_#00ffff]"></div>
          <div className="w-2 h-2 bg-[#ff00ff] rotate-45 shadow-[0_0_8px_#ff00ff]"></div>
        </div>
      </div>
      <p className="font-pixel text-xl tracking-widest" style={{ color: subColor }}>--- {subtitle} ---</p>
    </div>
  );
};

const PixelPanel = ({ children, color = "cyan", className = "", glow = true, padding = "p-8", hover = true }: any) => {
  const borderColor = color === "cyan" ? "bg-[#00ffff]" : color === "magenta" ? "bg-[#ff00ff]" : "bg-[#ffff00]";
  const shadowColor = color === "cyan" ? "drop-shadow-[0_0_15px_rgba(0,255,255,0.3)]" : color === "magenta" ? "drop-shadow-[0_0_15px_rgba(255,0,255,0.3)]" : "drop-shadow-[0_0_15px_rgba(255,255,0,0.3)]";
  const dashedColor = color === "cyan" ? "border-[#00ffff]/40" : color === "magenta" ? "border-[#ff00ff]/40" : "border-[#ffff00]/40";
  
  return (
    <div className={`relative ${glow ? shadowColor : ''} ${className} ${hover ? 'transition-transform duration-300 hover:-translate-y-2' : ''} h-full`}>
      <div className={`p-[4px] ${borderColor} pixel-clip-lg h-full`}>
        <div className={`bg-[#0b0218]/95 pixel-clip-lg h-full ${padding} relative flex flex-col`}>
          {/* Inner dashed border */}
          <div className={`absolute inset-2.5 border border-dashed ${dashedColor} pointer-events-none pixel-clip-lg`}></div>
          
          {/* Corner Nodes */}
          <div className={`absolute top-2.5 left-2.5 w-2 h-2 ${borderColor} z-10`}></div>
          <div className={`absolute top-2.5 right-2.5 w-2 h-2 ${borderColor} z-10`}></div>
          <div className={`absolute bottom-2.5 left-2.5 w-2 h-2 ${borderColor} z-10`}></div>
          <div className={`absolute bottom-2.5 right-2.5 w-2 h-2 ${borderColor} z-10`}></div>
          
          <div className="relative z-20 flex-1 flex flex-col">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const PixelIconBox = ({ icon: Icon, color = "cyan", text }: any) => {
  const borderColor = color === "cyan" ? "bg-[#00ffff]" : color === "magenta" ? "bg-[#ff00ff]" : "bg-[#ffff00]";
  const textColor = color === "cyan" ? "text-[#00ffff]" : color === "magenta" ? "text-[#ff00ff]" : "text-[#ffff00]";
  const shadowColor = color === "cyan" ? "drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]" : color === "magenta" ? "drop-shadow-[0_0_10px_rgba(255,0,255,0.8)]" : "drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]";

  return (
    <div className={`relative mb-6 ${shadowColor}`}>
      {text && (
        <span className={`absolute -top-3 left-1/2 -translate-x-1/2 ${borderColor} text-[#0b0218] font-display font-bold text-sm px-2 py-0.5 z-20 shadow-[0_0_10px_currentColor]`}>
          {text}
        </span>
      )}
      <div className={`p-[2px] ${borderColor} pixel-clip`}>
        <div className="w-16 h-16 bg-[#0b0218] pixel-clip flex items-center justify-center relative">
          <div className={`absolute inset-1 border border-dashed ${borderColor.replace('bg-', 'border-')}/40 pixel-clip`}></div>
          <Icon className={`w-8 h-8 ${textColor} relative z-10`} />
        </div>
      </div>
    </div>
  );
};

const ComplexLadderTrack = () => {
  // 5 columns, each with 4 color block heights (in percentages).
  // The heights are mathematically calculated based on the actual DOM height of each
  // experience block so that the Level Badges align perfectly with the center of each color block.
  // c1 (Level 1): Center at ~4% from bottom -> Height ~8%
  // c2 (Level 2): Center at ~34% from bottom -> Height ~52%
  // c3 (Level 3): Center at ~63% from bottom -> Height ~6%
  // c4 (Level 4): Center at ~80% from bottom -> Height ~28%
  const columns = [
    { c1: 10, c2: 49, c3: 13, c4: 20 },
    { c1: 8,  c2: 50, c3: 12, c4: 21 },
    { c1: 11, c2: 48, c3: 14, c4: 20 },
    { c1: 9,  c2: 51, c3: 12, c4: 19 },
    { c1: 10, c2: 49, c3: 13, c4: 20 },
  ];

  // Classic Arcade Tetris Colors
  const colors = {
    c4: '#ffff00', // Yellow (元保集团)
    c3: '#ff00ff', // Magenta (点点互动)
    c2: '#9d00ff', // Neon Purple (竞技世界)
    c1: '#0066ff', // Bright Blue (掌游天下)
  };

  return (
    <div className="hidden md:flex absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[200px] z-0 flex-col py-8 items-center">
      
      {/* Top Cap (Nested Pixel Arch) - Stepped Pyramid (Hollow Inside) */}
      <div className="relative w-[200px] h-[84px]">
        <svg width="200" height="84" viewBox="0 0 200 84" className="absolute inset-0 z-10">
          <defs>
            <pattern id="topGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <rect width="30" height="30" fill="#0b0218" />
              <rect width="30" height="2" fill="rgba(0,255,255,0.2)" />
              <rect width="2" height="30" fill="rgba(0,255,255,0.2)" />
            </pattern>
          </defs>
          
          {/* Hollow Inside with Grid */}
          <path 
            d="M24,84 L24,80 L52,80 L52,52 L80,52 L80,24 L120,24 L120,52 L148,52 L148,80 L176,80 L176,84 Z" 
            fill="url(#topGrid)" 
          />

          {/* Outer Border (#005555) */}
          <path 
            d="M0,84 L0,56 L28,56 L28,28 L56,28 L56,0 L144,0 L144,28 L172,28 L172,56 L200,56 L200,84 Z M12,84 L188,84 L188,68 L160,68 L160,40 L132,40 L132,12 L68,12 L68,40 L40,40 L40,68 L12,68 Z" 
            fill="#005555" 
            fillRule="evenodd" 
          />
          
          {/* Inner Border (#00ffff) */}
          <path 
            d="M12,84 L12,68 L40,68 L40,40 L68,40 L68,12 L132,12 L132,40 L160,40 L160,68 L188,68 L188,84 Z M24,84 L176,84 L176,80 L148,80 L148,52 L120,52 L120,24 L80,24 L80,52 L52,52 L52,80 L24,80 Z" 
            fill="#00ffff" 
            fillRule="evenodd" 
          />
        </svg>
      </div>

      {/* Track Body (Tetris Wall) - Ultra Thick borders and massive shadow */}
      <div className="relative w-full flex-1 bg-[#005555] px-[12px] flex flex-col shadow-[0_0_50px_rgba(0,255,255,0.6),inset_0_0_20px_rgba(0,0,0,0.7)]">
        {/* Inner Wall */}
        <div className="relative w-full h-full bg-[#0b0218] border-x-[12px] border-[#00ffff] flex flex-col overflow-hidden shadow-[inset_0_0_50px_rgba(0,0,0,1)]">
          
          {/* Background Grid (Level 5 Empty Space) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            <defs>
              <pattern id="cyanGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="2" fill="rgba(0,255,255,0.5)" />
                <rect width="2" height="30" fill="rgba(0,255,255,0.5)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#cyanGrid)" />
          </svg>

          {/* The 5 Columns of Tetris Blocks */}
          <div className="absolute inset-0 flex">
            {columns.map((col, i) => (
              <div key={i} className="flex-1 h-full flex flex-col justify-end">
                <div className="w-full relative" style={{ height: `${col.c4}%`, backgroundColor: colors.c4 }}>
                  <div className="absolute inset-0 shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3)]"></div>
                </div>
                <div className="w-full relative" style={{ height: `${col.c3}%`, backgroundColor: colors.c3 }}>
                  <div className="absolute inset-0 shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3)]"></div>
                </div>
                <div className="w-full relative" style={{ height: `${col.c2}%`, backgroundColor: colors.c2 }}>
                  <div className="absolute inset-0 shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3)]"></div>
                </div>
                <div className="w-full relative" style={{ height: `${col.c1}%`, backgroundColor: colors.c1 }}>
                  <div className="absolute inset-0 shadow-[inset_4px_4px_0_rgba(255,255,255,0.4),inset_-4px_-4px_0_rgba(0,0,0,0.3)]"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Global Dark Grid Overlay to separate the blocks */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-60">
            <defs>
              <pattern id="darkGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                <rect width="30" height="2" fill="rgba(0,0,0,0.8)" />
                <rect width="2" height="30" fill="rgba(0,0,0,0.8)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#darkGrid)" />
          </svg>

        </div>
      </div>

      {/* Bottom Cap (Nested Pixel Arch) - Ultra Thick */}
      <div className="flex flex-col items-center w-full">
        <div className="w-[200px] h-[12px] bg-[#005555] flex flex-col items-center justify-start">
          <div className="w-[176px] h-[12px] bg-[#00ffff]"></div>
        </div>
        <div className="w-[160px] h-[12px] bg-[#005555]"></div>
        <div className="w-[120px] h-[12px] bg-[#003333]"></div>
      </div>

    </div>
  );
};

function ArcadeResume() {
  const navItems = ['STATS', 'QUESTS', 'REPLAYS', 'INVENTORY'];

  return (
    <div className="min-h-screen font-sans pb-24 selection:bg-[#ff00ff]/30 relative">
      <ScrollProgress />
      <FloatingParticles />
      <BackgroundEffects />
      
      {/* Navigation */}
      <nav className="max-w-5xl mx-auto mt-8 bg-[#150524]/60 backdrop-blur-xl border border-[#ff00ff]/50 shadow-[0_0_20px_rgba(255,0,255,0.3)] rounded-full px-6 py-4 flex justify-between items-center overflow-x-auto hide-scrollbar sticky top-4 z-50">
        <div className="flex gap-8 items-center min-w-max px-4 w-full justify-center md:justify-between">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm md:text-base font-display font-bold tracking-widest transition-all text-purple-200 hover:text-white hover:text-neon-cyan uppercase"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 pt-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Modern Arcade Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
          className="relative w-56 h-56 md:w-64 md:h-64 shrink-0 avatar-frame-lol"
        >
          <div className="avatar-inner-lol relative">
            {resumeData.avatarUrl ? (
              <img src={resumeData.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <Ghost className="w-24 h-24 text-[#00ffff] drop-shadow-[0_0_15px_rgba(0,255,255,0.8)]" />
            )}
          </div>
        </motion.div>

        {/* Introduction Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex-1 text-center lg:text-left w-full relative z-10"
        >
          <div className="inline-block bg-gradient-to-r from-[#ff00ff] to-[#8a2be2] text-white font-display font-bold px-4 py-1.5 mb-6 text-sm rounded-full shadow-[0_0_15px_rgba(255,0,255,0.5)] uppercase tracking-widest blink">
            PLAYER 1 READY
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-black text-neon-magenta mb-4 uppercase tracking-tight hover:text-white transition-colors duration-300 cursor-default">
            {resumeData.name}
          </h1>
          <h2 className="text-xl md:text-2xl text-[#00ffff] mb-8 font-display tracking-widest uppercase drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] flex justify-center lg:justify-start">
            {Array.from(resumeData.title).map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                {char}
              </motion.span>
            ))}
          </h2>

          {/* Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 max-w-2xl mx-auto lg:mx-0 font-sans text-sm md:text-base">
            {resumeData.info.map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-purple-100 justify-center lg:justify-start bg-[#150524]/80 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-[#00ffff]/30 shadow-[0_0_10px_rgba(0,255,255,0.1)]">
                <item.icon className="w-5 h-5 text-[#ff00ff]" />
                <span className="tracking-wide font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Center Decoration */}
      <div className="flex justify-center my-24 relative">
        <motion.div
          animate={{ y: [-10, 10, -10], scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Gamepad2 className="w-20 h-20 text-[#00ffff] drop-shadow-[0_0_20px_rgba(0,255,255,0.8)]" />
        </motion.div>
      </div>

      {/* Profile / Player Stats (3 Steps Layout) */}
      <section id="stats" className="max-w-5xl mx-auto px-6 relative z-20 mb-32">
        <SectionTitle title="核心优势展示" subtitle="五步解锁核心竞争力" color="cyan" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resumeData.profile.slice(0, 3).map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="text-center h-full"
            >
              <PixelPanel color="cyan" padding="p-8" className="items-center text-center">
                <div className="flex flex-col items-center">
                  <PixelIconBox icon={item.icon || Heart} color="cyan" text={`0${i + 1}`} />
                  <h3 className="text-lg font-display font-bold text-white mb-4 tracking-wide uppercase">{item.title}</h3>
                  <p className="text-sm text-purple-200/80 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </PixelPanel>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-3xl mx-auto">
          {resumeData.profile.slice(3, 5).map((item, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i + 3) * 0.1 }}
              key={i + 3}
              className="text-center h-full"
            >
              <PixelPanel color="cyan" padding="p-8" className="items-center text-center">
                <div className="flex flex-col items-center">
                  <PixelIconBox icon={item.icon || Swords} color="cyan" text={`0${i + 4}`} />
                  <h3 className="text-lg font-display font-bold text-white mb-4 tracking-wide uppercase">{item.title}</h3>
                  <p className="text-sm text-purple-200/80 leading-relaxed font-sans">{item.desc}</p>
                </div>
              </PixelPanel>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experience / Quest Log (Vertical Ladder) */}
      <section id="quests" className="max-w-6xl mx-auto px-6 relative z-20 mb-32">
        <SectionTitle title="职业晋升挑战赛" subtitle="解锁成就 获取经验" color="cyan" />
        
        <div className="relative py-10 max-w-5xl mx-auto">
          {/* Central Ladder Track */}
          <ComplexLadderTrack />

          <div className="space-y-24">
            {/* Level 5 (Future) */}
            <div className="relative flex flex-col md:flex-row items-center md:justify-start">
              
              {/* Level Badge (Center) - Pixel Block Style */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 translate-y-10 z-20 items-center justify-center">
                <div className="w-14 h-14 bg-[#0b0218] border-[4px] border-[#00ffff] flex items-center justify-center relative z-20 shadow-[0_0_15px_rgba(0,255,255,0.5),inset_4px_4px_0_rgba(255,255,255,0.2),inset_-4px_-4px_0_rgba(0,0,0,0.5)]">
                  <span className="font-pixel text-3xl text-white drop-shadow-[2px_2px_0_#ff00ff]">5</span>
                </div>
              </div>

              {/* Content Box */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="w-full md:w-[calc(50%-120px)]"
              >
                <PixelPanel color="cyan" hover={false} className="relative opacity-90">
                  {/* Mobile Level Badge - Pixel Block Style */}
                  <div className="md:hidden absolute -top-4 -right-4 z-30 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
                    <div className="w-12 h-12 bg-[#0b0218] border-[3px] border-[#00ffff] flex items-center justify-center relative z-20 shadow-[0_0_10px_rgba(0,255,255,0.5),inset_3px_3px_0_rgba(255,255,255,0.2),inset_-3px_-3px_0_rgba(0,0,0,0.5)]">
                      <span className="font-pixel text-2xl text-white drop-shadow-[2px_2px_0_#ff00ff]">5</span>
                    </div>
                  </div>

                  <div className="mb-4 border-b border-[#00ffff]/30 pb-4 relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="bg-[#00ffff] text-[#0b0218] text-xs font-bold px-2 py-0.5 rounded-sm shrink-0 animate-pulse">NEXT</span>
                      <h3 className="text-2xl font-display font-bold text-white tracking-wide uppercase text-neon-cyan break-words">
                        未知的下一站
                      </h3>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <p className="text-[#00ffff] font-display font-bold text-lg uppercase">新篇章 / NEW ADVENTURE</p>
                      <div className="flex items-center gap-2 text-[#00ffff] font-pixel text-lg">
                        <div className="w-4 h-4 rounded-full bg-[#00ffff] shadow-[0_0_5px_#00ffff] animate-ping"></div>
                        <span>EXP: ???</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-cyan-100/80 text-sm leading-relaxed font-sans relative z-10 italic">
                    <p>“玩家已准备就绪，等待解锁新的地图与挑战...”</p>
                  </div>
                </PixelPanel>
              </motion.div>
            </div>

            {resumeData.experience.map((exp, i) => {
              const level = resumeData.experience.length - i; // Reverse level numbering (4, 3, 2, 1)
              const isEven = i % 2 === 0; // Level 4 (i=0) is right, Level 3 (i=1) is left, etc.
              
              return (
                <div key={i} className={`relative flex flex-col md:flex-row items-center ${isEven ? 'md:justify-end' : 'md:justify-start'}`}>
                  
                  {/* Level Badge (Center) - Pixel Block Style */}
                  <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 items-center justify-center`}>
                    <div className="w-14 h-14 bg-[#0b0218] border-[4px] border-[#00ffff] flex items-center justify-center relative z-20 shadow-[0_0_15px_rgba(0,255,255,0.5),inset_4px_4px_0_rgba(255,255,255,0.2),inset_-4px_-4px_0_rgba(0,0,0,0.5)]">
                      <span className="font-pixel text-3xl text-white drop-shadow-[2px_2px_0_#ff00ff]">{level}</span>
                    </div>
                  </div>

                  {/* Content Box */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="w-full md:w-[calc(50%-120px)]"
                  >
                    <PixelPanel color="cyan" hover={false} className="relative">
                      {/* Mobile Level Badge - Pixel Block Style */}
                      <div className="md:hidden absolute -top-4 -right-4 z-30 drop-shadow-[0_0_10px_rgba(0,255,255,0.8)]">
                        <div className="w-12 h-12 bg-[#0b0218] border-[3px] border-[#00ffff] flex items-center justify-center relative z-20 shadow-[0_0_10px_rgba(0,255,255,0.5),inset_3px_3px_0_rgba(255,255,255,0.2),inset_-3px_-3px_0_rgba(0,0,0,0.5)]">
                          <span className="font-pixel text-2xl text-white drop-shadow-[2px_2px_0_#ff00ff]">{level}</span>
                        </div>
                      </div>

                      <div className="mb-6 border-b border-[#ff00ff]/30 pb-4 relative z-10">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-[#00ff00]/20 border border-[#00ff00] text-[#00ff00] text-xs font-bold px-2 py-0.5 rounded-sm shrink-0 shadow-[0_0_8px_rgba(0,255,0,0.3)] tracking-widest">已达成</span>
                          <h3 className="text-2xl font-display font-bold text-white tracking-wide uppercase text-neon-cyan break-words">
                            {exp.company}
                          </h3>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                          <p className="text-[#ff00ff] font-display font-bold text-lg uppercase">{exp.role}</p>
                          <div className="flex items-center gap-2 text-[#ffff00] font-pixel text-lg">
                            <div className="w-4 h-4 rounded-full bg-[#ffff00] shadow-[0_0_5px_#ffff00]"></div>
                            <span>EXP: {exp.date}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 text-purple-100/90 text-sm leading-relaxed font-sans relative z-10">
                        {exp.achievement && (
                          <div className="bg-gradient-to-r from-[#ff00ff]/30 to-[#00ffff]/10 border border-[#ff00ff] p-4 flex gap-4 items-center shadow-[0_0_15px_rgba(255,0,255,0.3)] mb-4">
                            <div className="w-10 h-10 bg-[#0b0218] border border-[#ff00ff] flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(255,0,255,0.8)]">
                              <Trophy className="w-5 h-5 text-[#ff00ff]" />
                            </div>
                            <p className="font-bold text-white text-base tracking-wide">{exp.achievement}</p>
                          </div>
                        )}

                        {exp.bullets && (
                          <ul className="space-y-2">
                            {exp.bullets.map((bullet, idx) => (
                              <li key={idx} className="flex gap-2 items-start">
                                <span className="text-[#00ffff] font-bold mt-0.5">+</span>
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {exp.sections && (
                          <div className="space-y-4 mt-4">
                            {exp.sections.map((section, idx) => (
                              <div key={idx} className="bg-black/40 p-4 border border-[#00ffff]/20">
                                <h4 className="text-[#00ffff] font-display font-bold text-sm mb-2 uppercase">{section.title}</h4>
                                <ul className="space-y-2">
                                  {section.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex gap-2 items-start">
                                      <div className="w-1.5 h-1.5 bg-[#ff00ff] shrink-0 mt-1.5"></div>
                                      <span className="text-purple-200/80 text-xs">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        )}

                        {exp.caseStudy && (
                          <div className="mt-6 bg-gradient-to-r from-[#ffff00]/20 to-transparent border-l-4 border-[#ffff00] p-4 shadow-[0_0_15px_rgba(255,255,0,0.15)]">
                            <h4 className="text-[#ffff00] font-display font-bold text-sm mb-3 uppercase drop-shadow-[0_0_5px_rgba(255,255,0,0.8)]">{exp.caseStudy.title}</h4>
                            <ul className="space-y-2">
                              {exp.caseStudy.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="flex gap-2 items-start">
                                  <div className="w-1.5 h-1.5 bg-[#ffff00] shrink-0 mt-1.5 shadow-[0_0_5px_#ffff00]"></div>
                                  <span className="text-yellow-100/90 text-xs leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </PixelPanel>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Works / Replays (Skin Showcase Grid) */}
      <section id="replays" className="max-w-6xl mx-auto px-6 relative z-20 mb-32">
        <SectionTitle title="高光作品图鉴" subtitle="FEATURED VISUAL ASSETS" color="cyan" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumeData.featuredWorks.map((work, i) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              key={i}
              className="h-full"
            >
              <VideoCard work={work} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Inventory / Education & Links */}
      <section id="inventory" className="max-w-5xl mx-auto px-6 relative z-20 mb-20">
        <SectionTitle title="基础属性与装备库" subtitle="INVENTORY & PORTFOLIO" color="cyan" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Education */}
          <PixelPanel color="magenta" padding="p-8" className="text-center h-full">
            <div className="flex flex-col items-center justify-center h-full">
              <h3 className="text-[#ff00ff] font-display font-bold text-xl mb-6 tracking-widest relative z-10 uppercase">学历认证 / EDUCATION</h3>
              <PixelIconBox icon={GraduationCap} color="magenta" />
              <p className="text-white font-bold text-2xl mb-2 relative z-10 mt-4">{resumeData.education.school}</p>
              <p className="text-purple-200 text-lg mb-2 relative z-10">{resumeData.education.major} | {resumeData.education.degree}</p>
              <p className="text-gray-400 text-sm relative z-10 font-mono">{resumeData.education.date}</p>
            </div>
          </PixelPanel>

          {/* Links */}
          <PixelPanel color="cyan" padding="p-8" className="text-center h-full">
            <div className="flex flex-col items-center justify-center h-full w-full">
              <h3 className="text-[#00ffff] font-display font-bold text-xl mb-8 tracking-widest relative z-10 uppercase">作品集传送门 / PORTFOLIO</h3>
              
              <div className="space-y-6 w-full relative z-10">
                {resumeData.portfolio.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <a 
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative flex items-center justify-between w-full bg-[#0b0218] border-2 border-[#00ffff]/50 p-4 overflow-hidden transition-all duration-300 hover:border-[#00ffff] hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]"
                    >
                      {/* Hover Scanline Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00ffff]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                      
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 bg-[#00ffff]/10 border border-[#00ffff]/30 flex items-center justify-center text-[#00ffff] group-hover:bg-[#00ffff] group-hover:text-[#0b0218] transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className="text-white font-bold text-lg group-hover:text-[#00ffff] transition-colors">{item.title}</p>
                          {item.desc && <p className="text-xs text-[#00ffff]/70 mt-1 font-mono">{item.desc}</p>}
                        </div>
                      </div>
                      
                      <ChevronRight className="w-6 h-6 text-[#00ffff]/50 group-hover:text-[#00ffff] group-hover:translate-x-1 transition-all relative z-10" />
                    </a>
                  );
                })}
              </div>
            </div>
          </PixelPanel>
        </div>
      </section>

      {/* Footer Rules */}
      <footer className="max-w-4xl mx-auto px-6 relative z-20 text-center border-t border-[#4a148c] pt-12 pb-8">
        <h3 className="text-2xl font-display font-bold text-white mb-8 tracking-widest">- 活动规则 -</h3>
        <ul className="text-left text-sm text-purple-300 space-y-4 font-sans max-w-2xl mx-auto">
          <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-[#00ffff] text-[#090214] flex items-center justify-center font-bold shrink-0">1</span> 本简历长期有效，随时可发起沟通。</li>
          <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-[#00ffff] text-[#090214] flex items-center justify-center font-bold shrink-0">2</span> 玩家可通过上方联系方式（电话/微信/邮箱）解锁隐藏关卡及更多详细作品集。</li>
          <li className="flex gap-3"><span className="w-5 h-5 rounded-full bg-[#00ffff] text-[#090214] flex items-center justify-center font-bold shrink-0">3</span> 获得该玩家后，可大幅提升团队素材产出效率及买量转化率。</li>
        </ul>
      </footer>
    </div>
  );
}

const VideoCard = ({ work }: { work: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PixelPanel color="cyan" padding="p-2">
      <div 
        className="relative aspect-video w-full overflow-hidden border border-[#4a148c] bg-black z-10 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered ? (
          <iframe
            src={`${work.src}&autoplay=1&muted=1`}
            scrolling="no"
            border="0"
            frameBorder="no"
            framespacing="0"
            allowFullScreen={true}
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        ) : (
          <div className="absolute inset-0 w-full h-full bg-[#050510]">
            {/* Holographic Retro Grid Background */}
            <div 
              className="w-full h-full opacity-60 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                backgroundColor: '#050510',
                backgroundImage: `
                  radial-gradient(circle at center, rgba(74, 20, 140, 0.5) 0%, transparent 70%), 
                  repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0, 255, 255, 0.15) 20px, rgba(0, 255, 255, 0.15) 21px), 
                  repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0, 255, 255, 0.15) 20px, rgba(0, 255, 255, 0.15) 21px)
                `,
                backgroundPosition: 'center center'
              }}
            />
            
            {/* Scanlines & Pixel Overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJub25lIi8+CjxyZWN0IHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9InJnYmEoMCwyNTUsMjU1LDAuMSkiLz4KPC9zdmc+')] opacity-50"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(0,255,255,0.05)] to-transparent bg-[length:100%_4px]"></div>
            
            {/* Playable UI Elements */}
            <div className="absolute top-2 left-2 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 animate-pulse"></div>
              <span className="text-red-500 font-mono text-[10px] tracking-widest">REC</span>
            </div>
            
            <div className="absolute top-2 right-2 text-[#00ffff] font-mono text-[10px] opacity-70">
              {work.title.split(' / ')[0]}
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="w-16 h-12 border-2 border-[#00ffff] flex items-center justify-center text-[#00ffff] bg-black/40 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,255,255,0.3)] relative overflow-hidden">
                {/* Retro Play Triangle */}
                <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-[#00ffff] border-b-[8px] border-b-transparent ml-1"></div>
                {/* Glitch effect on hover */}
                <div className="absolute inset-0 bg-[#00ffff] opacity-0 group-hover:opacity-20 animate-pulse"></div>
              </div>
              <div className="mt-3 text-[#00ffff] font-display text-xs tracking-[0.2em] animate-pulse">
                PRESS START
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="p-4 text-center bg-[#0b0218] mt-2 border border-[#4a148c] z-10">
        <h3 className="text-white font-display font-bold text-sm uppercase tracking-wide group-hover:text-[#00ffff] transition-colors">{work.title}</h3>
      </div>
    </PixelPanel>
  );
};

export default function App() {
  return <ArcadeResume />;
}
