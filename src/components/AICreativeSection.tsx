import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Sparkles, Wand2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AICreativeSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background transition back to white/very light
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top center",
        onEnter: () => gsap.to('body', { backgroundColor: '#FAFAFA', color: '#1A1A2E', duration: 1.2 }),
        onEnterBack: () => gsap.to('body', { backgroundColor: '#FAFAFA', color: '#1A1A2E', duration: 1.2 }),
      });

      // Scattered Cards Entry Animation
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const xOffset = (index % 2 === 0 ? -200 : 200);
        const rotation = (index % 2 === 0 ? -2 : 2);

        gsap.fromTo(card, 
          { x: xOffset, opacity: 0, rotation: rotation * 1.5, scale: 0.95 },
          { 
            x: 0, 
            opacity: 1, 
            rotation: rotation, 
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const tools = [
    'Midjourney', 'Lovart', 'Nona Banana Pro', 'Grok', '即梦', 'Runway', 'Pika', 'Luma AI', 'Krea.ai'
  ];

  const categories = [
    {
      title: "AI短剧 · 全流程视觉",
      desc: "从分镜设计、场景绘制到三视图，利用AI实现百万级电影工业化视觉流。",
      icon: <Camera size={40} />,
      color: "#6C63FF",
      image: "https://picsum.photos/seed/drama/800/800"
    },
    {
      title: "教辅插图 · 书籍排版",
      desc: "服务春雨期刊、各大出版社。MJ模型训练 + 批量出图，极速提升书籍交付效率。",
      icon: <Sparkles size={40} />,
      color: "#00BFA5",
      image: "https://picsum.photos/seed/book/800/800"
    },
    {
      title: "创意原画 · 动态呈现",
      desc: "通过深度Prompt工程，让每一张画作都具备呼吸感与叙事张力。",
      icon: <Wand2 size={40} />,
      color: "#F59E0B",
      image: "https://picsum.photos/seed/creative/800/800"
    }
  ];

  return (
    <section ref={containerRef} id="ai-creative" className="relative min-h-[50vh] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-sans font-black text-gray-900 mb-8 tracking-tighter">
            近期突破 [2024-2025]
          </h2>
          <p className="text-xl md:text-2xl text-gray-500 font-sans font-light">
             "在 AIGC 的爆发期，以极客之手重新定义视觉设计的边际。"
          </p>
        </div>

        {/* Scattered Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 max-w-7xl mx-auto px-6 lg:px-20 mb-24">
          {categories.map((cat, idx) => (
            <div 
              key={idx}
              ref={el => { cardRefs.current[idx] = el; }}
              className="relative group cursor-pointer"
            >
              <div className="absolute -inset-10 bg-white/50 blur-3xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-xl border border-gray-100 transition-all duration-500 group-hover:-translate-y-6 group-hover:shadow-3xl overflow-hidden aspect-[4/5] flex flex-col">
                 
                 {/* Card Image Wrapper */}
                 <div className="flex-1 rounded-3xl overflow-hidden mb-8 relative">
                    <img src={cat.image} className="w-full h-full object-cover grayscale-0 transition-all duration-700" alt={cat.title} />
                    <div className="absolute inset-0 bg-black/10" />
                    <div className="absolute bottom-6 left-6" style={{ color: cat.color }}>
                       {cat.icon}
                    </div>
                 </div>

                 <h3 className="text-xl lg:text-2xl font-sans font-black text-gray-900 mb-4">{cat.title}</h3>
                 <p className="text-gray-500 text-lg font-sans font-light leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Tool Tags Cloud */}
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4 md:gap-10">
           {tools.map((tool, idx) => (
             <div 
                key={tool} 
                className="px-6 py-3 rounded-2xl bg-white border border-gray-100 shadow-sm text-gray-400 font-bold tracking-widest text-xs uppercase hover:text-[#6C63FF] hover:border-[#6C63FF]/30 transition-all duration-500"
                style={{
                  animation: `floating ${3 + idx*0.2}s ease-in-out infinite alt`,
                  animationDelay: `${idx * 0.1}s`
                }}
             >
                {tool}
             </div>
           ))}
        </div>

      </div>
      
      <style>{`
        @keyframes floating {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>
    </section>
  );
};

export default AICreativeSection;
