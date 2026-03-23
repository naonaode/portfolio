import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type TimelineItem } from '../data/timeline_data';
import { Sparkles, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface TimelineCardProps {
  item: TimelineItem;
  isLeft: boolean;
}

const TimelineCard: React.FC<TimelineCardProps> = ({ item, isLeft }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    gsap.fromTo(contentRef.current, 
      { 
        y: 100, 
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "expo.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`relative w-full md:w-[48%] mb-12 md:mb-20 flex flex-col ${isLeft ? 'md:ml-auto md:pr-12' : 'md:mr-auto md:pl-12'}`}
      data-era={item.era}
    >
      {/* Year Background - Restrained Editorial */}
      <span className={`absolute -top-12 md:-top-16 select-none -z-10 font-sans font-black text-[8rem] md:text-[10rem] tracking-tighter transition-colors duration-1000 ${isLeft ? 'left-[-1rem] md:left-[-3rem]' : 'right-[-1rem] md:right-[-3rem]'}`} style={{ color: `${item.accentColor}08` }}>
        {item.year}
      </span>

      <div 
        ref={contentRef}
        className="relative group p-8 md:p-12 bg-white/40 backdrop-blur-xl border border-white/40 rounded-[2.5rem] md:rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_48px_80px_-16px_rgba(0,0,0,0.1)] hover:-translate-y-4"
      >
        <div className="flex items-center gap-4 mb-8 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
           <span className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500">{item.period}</span>
           <div className="h-px flex-1 bg-gray-100" />
        </div>

        <h3 className="text-[1.2rem] md:text-[1.45rem] lg:text-[1.7rem] font-sans font-black text-gray-900 leading-tight mb-4 tracking-tighter flex items-center gap-3">
           {item.company}
           {item.era === 'ai' && <Sparkles className="text-[#6C63FF] opacity-50" size={20} />}
        </h3>
        
        <div className="flex items-center gap-3 mb-8">
           <div className="w-6 h-[1.5px] bg-gray-900" style={{ backgroundColor: item.accentColor }} />
           <p className="text-lg md:text-xl text-gray-400 font-sans font-light tracking-tight">{item.role}</p>
        </div>

        <div className="space-y-4 mb-10">
          {item.highlights.map((h, i) => (
            <p key={i} className="text-base md:text-lg text-gray-500 leading-relaxed font-sans font-light max-w-md">
               {h}
            </p>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {item.tags.map(tag => (
            <span key={tag} className="px-3 py-1.5 rounded-lg bg-white/50 border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 group-hover:text-gray-900 group-hover:border-gray-900/10 transition-colors">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Button - 增加可玩性 */}
        <div className="flex justify-end">
           <div className="w-12 h-12 rounded-full border border-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-500">
              <ArrowUpRight size={20} />
           </div>
        </div>
      </div>

      {/* 连接点 - Timeline Spine Hook */}
      <div className={`absolute top-1/2 -translate-y-1/2 hidden md:block w-4 h-4 rounded-full border-4 bg-white z-20 ${isLeft ? 'left-[-42px]' : 'right-[-42px]'}`} style={{ borderColor: item.accentColor }} />
    </div>
  );
};

export default TimelineCard;
