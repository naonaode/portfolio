import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timelineData, eraConfig, type Era } from '../data/timeline_data';
import TimelineCard from './TimelineCard';

gsap.registerPlugin(ScrollTrigger);

const FullTimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background global color management 
      Object.entries(eraConfig).forEach(([era, config]) => {
        ScrollTrigger.create({
          trigger: `[data-era-section="${era}"]`,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
             if (self.isActive) gsap.to('body', { backgroundColor: config.bg, duration: 1 });
          }
        });
      });

      // Era titles fade in/out
      const eras = Object.keys(eraConfig) as Era[];
      eras.forEach(era => {
        gsap.fromTo(
          `[data-era-label="${era}"]`,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 0.1,
            scale: 1,
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: {
              trigger: `[data-era-section="${era}"]`,
              start: "top bottom",
              end: "center center",
              scrub: 1,
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="full-evolution" className="relative min-h-[50vh] py-16 md:py-24 container mx-auto px-6 max-w-7xl overflow-hidden">
      
      {/* 噪点颗粒层 - 全局质感 */}
      <div className="fixed inset-0 pointer-events-none noise" />

      {/* 进化史引导线 - 中央垂直脊梁 */}
      <div 
        ref={spineRef}
        className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-gray-200 to-transparent hidden md:block"
        aria-hidden="true"
      />

      {Object.keys(eraConfig).map((era) => (
        <div key={era} data-era-section={era} className="relative mb-32 md:mb-48">
          
          {/* Era Hero Header - Compact */}
          <div className="flex flex-col items-center mb-16 md:mb-32 pointer-events-none">
             <span className="text-xs font-bold tracking-[0.8em] text-gray-400 uppercase mb-8 ml-8">
               {eraConfig[era as Era].period}
             </span>
             <h2 
               data-era-label={era}
               className="text-[8vw] md:text-[8rem] lg:text-[10rem] font-sans font-black tracking-tighter uppercase opacity-5 text-gray-900 leading-none select-none transition-all duration-1000"
             >
               {eraConfig[era as Era].label}
             </h2>
             <p className="max-w-xl text-center text-lg md:text-xl font-sans font-light text-gray-400 mt-6 leading-relaxed opacity-60">
                 {eraConfig[era as Era].description}
             </p>
          </div>

          {/* Alternating Experience Cards Grid */}
          <div className="relative flex flex-col md:block">
            {timelineData
              .filter(item => item.era === era)
              .map((item, index) => (
                <TimelineCard 
                  key={item.id} 
                  item={item} 
                  isLeft={index % 2 !== 0} // Flip alternating logic to alternate correctly with year背景
                />
              ))}
          </div>

        </div>
      ))}
    </section>
  );
};

export default FullTimelineSection;
