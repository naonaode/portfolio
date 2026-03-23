import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards slide up animation
      gsap.from(".about-card", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Simple tag animations
      gsap.from(".tool-tag", {
        opacity: 0,
        y: 10,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".tools-container",
          start: "top 90%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const capabilities = [
    { icon: "🎬", title: "AIGC 内容制作", desc: "AI短剧分镜·场景图·Grok视频生成" },
    { icon: "🎨", title: "AI 设计提效", desc: "MJ+Lovart批量生图·效率提升50%+" },
    { icon: "🗺️", title: "3D 地图交互", desc: "Cesium.js·QGIS·上海地图社项目" },
    { icon: "📚", title: "出版装帧设计", desc: "书籍·杂志·绘本·教辅全品类" }
  ];

  const tools = [
    "Midjourney", "Lovart", "Nona Banana Pro", "Grok", "即梦", "Gemini", 
    "Google AI Studio", "Vibe Code", "Photoshop", "Illustrator", 
    "InDesign", "AutoCAD", "Cesium.js", "QGIS", "WSL2", "Ubuntu"
  ];

  return (
    <section ref={sectionRef} className="py-4 md:py-6 px-6 md:px-12 bg-[#FAFAFA] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        {/* Intro */}
        <div className="mb-12 space-y-4 max-w-4xl px-2 mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-sans font-black text-gray-900 leading-tight">
            25年设计经验 × AIGC实战先锋
          </h2>
          <p className="text-base md:text-xl text-gray-400 font-sans font-light leading-relaxed">
            熟练运用 Midjourney、Lovart、Grok、Gemini 等主流AI工具，具备从工具选型到商业落地的完整实战能力。主导AI短剧全流程制作，服务春雨期刊、各大出版社，设计效率提升50%以上。
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 px-2">
          {capabilities.map((cap, i) => (
            <div key={i} className="about-card p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-3xl mb-4">{cap.icon}</div>
              <h3 className="text-lg font-sans font-bold text-gray-900 mb-2">{cap.title}</h3>
              <p className="text-sm text-gray-500 font-sans font-light">{cap.desc}</p>
            </div>
          ))}
        </div>

        {/* Tools Cloud */}
        <div className="tools-container px-2 flex flex-col items-center">
           <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-8">Tool Stack</h4>
           <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
             {tools.map((tool, i) => (
               <span key={i} className="tool-tag px-4 py-2 rounded-full bg-white border border-gray-100 text-xs font-sans font-medium text-gray-600">
                 {tool}
               </span>
             ))}
           </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
