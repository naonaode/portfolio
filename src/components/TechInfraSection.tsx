import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Server, Layout as LayoutIcon, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TechInfraSection: React.FC = () => {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  
  const commands = [
    "$ ssh root@vps_server_2026",
    "$ apt update && apt install infra-setup",
    "$ docker-compose up -d openclaw sub2api",
    "$ python3 scripts/monitor_ai.py",
    "✓ All local AI infrastructure active",
    "✓ WSL2 + Ubuntu environment ready",
    "✓ VMware local lab synchronized",
    "✓ 25 Years Designers DNA Loaded..."
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Terminal Typing Effect
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        onEnter: () => {
          commands.forEach((cmd, idx) => {
            setTimeout(() => {
              setTerminalLines(prev => [...prev.slice(-15), cmd]);
            }, idx * 600);
          });
        }
      });

      // 2. Section background transition (Dark transition)
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        onEnter: () => gsap.to('body', { backgroundColor: '#111111', color: '#FAFAFA', duration: 1.2 }),
        onLeave: () => gsap.to('body', { backgroundColor: '#FAFAFA', color: '#1A1A2E', duration: 1.2 }),
        onEnterBack: () => gsap.to('body', { backgroundColor: '#111111', color: '#FAFAFA', duration: 1.2 }),
        onLeaveBack: () => gsap.to('body', { backgroundColor: '#FAFAFA', color: '#1A1A2E', duration: 1.2 }),
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="tech-infra" className="relative min-h-[150vh] flex flex-col md:flex-row items-start transition-colors duration-1000">
      
      {/* Left: Sticky Terminal */}
      <div className="relative md:sticky top-0 min-h-[50vh] md:h-screen w-full md:w-1/2 flex items-center justify-center p-6 py-12 md:p-12 lg:p-24 overflow-hidden z-10">
        <div 
          ref={terminalRef}
          className="w-full h-[400px] md:h-auto bg-[#0F0F0F] rounded-2xl shadow-2xl border border-gray-800 p-6 md:p-10 font-mono text-sm leading-relaxed overflow-hidden flex flex-col"
        >
          {/* Terminal Title Bar */}
          <div className="flex gap-2 mb-6 border-b border-gray-800 pb-4">
            <div className="w-3 h-3 rounded-full bg-red-500/30" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
            <div className="w-3 h-3 rounded-full bg-green-500/30" />
            <span className="ml-4 text-[10px] text-gray-600 tracking-widest uppercase">infra_terminal@evolution</span>
          </div>
          
          {/* Terminal Lines */}
          <div className="flex-1 overflow-y-auto space-y-2 text-[#00FF41]">
             {terminalLines.map((line, idx) => (
                <div key={idx} className="flex gap-4">
                   <span className="text-gray-700 opacity-40">{idx + 1}</span>
                   <p className={line.startsWith('✓') ? 'text-cyan-400' : 'text-emerald-400'}>{line}</p>
                </div>
             ))}
             <div className="flex gap-4 animate-pulse">
                <span className="text-gray-700 opacity-40">{terminalLines.length + 1}</span>
                <span className="w-2 h-5 bg-[#00FF41]" />
             </div>
          </div>
        </div>
      </div>

      {/* Right: Scrolling Cards */}
      <div className="w-full md:w-1/2 py-12 md:py-24 px-6 md:px-12 lg:px-24 space-y-12 md:space-y-20 pb-[2vh]">
        <div className="container overflow-visible">
          
          <div className="relative p-10 bg-white/5 rounded-3xl border border-gray-800 hover:border-gray-500 transition-all duration-500">
             <div className="flex items-center gap-6 mb-8 text-gray-200">
               <Server size={40} />
               <h2 className="text-2xl lg:text-[2.6rem] font-sans font-black tracking-tight uppercase">01 / 本地 AI 实验室</h2>
             </div>
             <p className="text-xl text-gray-500 mb-8 leading-relaxed font-sans font-light">
               "不仅是代码，更是生态的自建。"
             </p>
             <ul className="space-y-6 text-lg text-gray-300">
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>WSL2 + Ubuntu 环境深度集成，打通桌面级开发与服务器级核心。</span>
                </li>
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>通过 VMware 搭建独立本地工作流，实现 GPU 算力的高度隔离与动态调度。</span>
                </li>
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>基于 Docker 独立部署 OpenClaw 平台，赋能多模型并行的生产力流向。</span>
                </li>
             </ul>
          </div>

          <div className="relative p-10 bg-white/5 rounded-3xl border border-gray-800 hover:border-gray-500 transition-all duration-500">
             <div className="flex items-center gap-6 mb-8 text-gray-200">
               <LayoutIcon size={40} />
               <h2 className="text-2xl lg:text-[2.6rem] font-sans font-black tracking-tight uppercase">02 / 数据可视化引擎</h2>
             </div>
             <p className="text-xl text-gray-500 mb-8 leading-relaxed font-sans font-light">
               "让地理信息在三维空间中呼吸。"
             </p>
             <ul className="space-y-6 text-lg text-gray-300">
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>QGIS 深度地图数据处理，建立高精度的空间地理资产闭环。</span>
                </li>
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>从 Three.js 跨越至 Cesium.js 生态，实现千万级点云数据的实时互动渲染。</span>
                </li>
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>上海地图社、北京地理测绘等大型项目的前端渲染及性能平衡极简架构。</span>
                </li>
             </ul>
          </div>

          <div className="relative p-10 bg-white/5 rounded-3xl border border-gray-800 hover:border-gray-500 transition-all duration-500">
             <div className="flex items-center gap-6 mb-8 text-gray-200">
               <Code size={40} />
               <h2 className="text-2xl lg:text-[2.6rem] font-sans font-black tracking-tight uppercase">03 / 最强 AI 协同交付</h2>
             </div>
             <p className="text-xl text-gray-500 mb-8 leading-relaxed font-sans font-light">
               "从提示词到生产力，只需一瞬间。"
             </p>
             <ul className="space-y-6 text-lg text-gray-300">
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>Vibe Code + Gemini 的终极协同，打破手写代码的交付限制。</span>
                </li>
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>从原型到全响应式网页应用，极简架构下实现极致速度交付。</span>
                </li>
                <li className="flex items-start gap-3">
                   <Check className="text-emerald-500 mt-1 flex-shrink-0" />
                   <span>致力于将视觉美学（Designer DNA）与 AI 基础设施（Engineer Infra）深度缝合。</span>
                </li>
             </ul>
          </div>

        </div>
      </div>

    </section>
  );
};

export default TechInfraSection;
