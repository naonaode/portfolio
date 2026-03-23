import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Mail, ArrowUpRight } from 'lucide-react';

const ContactSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in animations
      gsap.from([titleRef.current, btnRef.current], {
        opacity: 0,
        y: 50,
        stagger: 0.3,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
      
      // Infinite hover bounce effect
      if (btnRef.current) {
        btnRef.current.addEventListener('mouseenter', () => {
          gsap.to(btnRef.current, { scale: 1.05, duration: 0.5, ease: "elastic.out(1, 0.3)" });
        });
        btnRef.current.addEventListener('mouseleave', () => {
          gsap.to(btnRef.current, { scale: 1, duration: 0.3 });
        });
      }
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
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">开放新机会 · 寻找创意合作</span>
         </div>


         <h2 ref={titleRef} className="text-4xl md:text-5xl font-sans font-black text-gray-900 mb-6 tracking-tighter">
            开始新的进化
         </h2>

         <p className="text-base md:text-xl text-gray-400 font-sans font-light max-w-2xl mx-auto mb-10 leading-relaxed">
            "从职业原点到AI未来，我的进化永不止步。无论是探讨AIGC深度工作流，还是寻找顶尖的视觉交付伙伴，随时欢迎交流。"
         </p>

         <a 
            ref={btnRef}
            href="mailto:your-email@example.com"
            className="group relative inline-flex items-center gap-4 px-10 py-5 md:px-12 md:py-6 bg-[#1A1A2E] text-white rounded-2xl text-sm font-bold tracking-[0.2em] uppercase transition-all duration-500 hover:shadow-4xl overflow-hidden"
         >
            <span className="absolute inset-0 bg-gradient-to-r from-[#6C63FF] to-[#00BFA5] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <Mail className="relative z-10" />
            <span className="relative z-10 px-4">建立联系 / 联系我</span>
            <ArrowUpRight className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
         </a>


      </div>
    </section>
  );
};

export default ContactSection;
