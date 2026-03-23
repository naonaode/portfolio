import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="contact" 
      className="relative min-h-[60vh] py-20 flex flex-col items-center justify-center text-center overflow-hidden"
      style={{
        background: 'radial-gradient(circle at center bottom, rgba(108, 99, 255, 0.05) 0%, #FAFAFA 100%)'
      }}
    >
      <div className="z-10 px-6 container max-w-5xl">
         
         <div className="mb-6 inline-flex items-center gap-3 px-6 py-2 rounded-full border border-gray-100 bg-white/50 backdrop-blur-sm shadow-sm">
            <span className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00BFA5] opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-[#00BFA5]"></span>
            </span>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Tel:185 158 33390</span>
         </div>


         <h2 ref={titleRef} className="text-4xl md:text-5xl font-sans font-black text-gray-900 mb-6 tracking-tighter">
            开始新的进化
         </h2>

         <p className="text-base md:text-xl text-gray-400 font-sans font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            "从职业原点到AI未来，我的进化永不止步。无论是探讨AIGC深度工作流，还是寻找顶尖的视觉交付伙伴，随时欢迎交流。"
         </p>


      </div>
    </section>
  );
};

export default ContactSection;
