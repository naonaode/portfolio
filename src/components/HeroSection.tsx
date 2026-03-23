import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background gradient animation using mouse
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = (clientX / window.innerWidth - 0.5) * 15;
        const yPos = (clientY / window.innerHeight - 0.5) * 15;
        gsap.to(containerRef.current, {
          x: xPos,
          y: yPos,
          duration: 2,
          ease: "power2.out"
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      // Hero Entry Animation - Staggered Letters-like
      gsap.from(".hero-line-1", {
        y: 100,
        opacity: 0,
        duration: 2,
        ease: "expo.out",
        delay: 0.5
      });
      gsap.from(".hero-sub", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 1.2
      });

      return () => window.removeEventListener('mousemove', handleMouseMove);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[60vh] w-full flex flex-col items-center justify-start pt-32 md:pt-48 p-6 text-center overflow-hidden"
    >
      {/* Background Mesh - Subdued & Minimal */}
      <div className="absolute inset-0 z-[-1] opacity-10 filter blur-[80px]">
         <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gray-200" />
         <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-gray-100" />
      </div>

      <div ref={containerRef} className="z-10 max-w-7xl">
         <div className="mb-8 inline-flex items-center gap-4 px-6 py-2 rounded-full border border-gray-100 bg-white/50 backdrop-blur-md shadow-sm">
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-gray-500">2000-2026 Portfolio Evolution</span>
         </div>

        <div className="flex flex-col items-center gap-1 mb-6">
          <h1 className="hero-line-1 text-[8vw] md:text-[4rem] lg:text-[5.5rem] font-sans font-black text-gray-900 leading-none tracking-tighter">
            视觉设计师的灵魂
          </h1>
          <span className="text-[6vw] md:text-[2rem] font-sans font-light text-gray-300">×</span>
          <h1 className="hero-line-2 text-[8vw] md:text-[4rem] lg:text-[5.5rem] font-sans font-black text-gray-900 leading-none tracking-tighter">
            极客工程师的底座
          </h1>
        </div>
        
        <p className="hero-sub text-base md:text-xl text-gray-400 font-sans font-medium tracking-tight max-w-xl mx-auto leading-relaxed">
          "25年审美积淀 × AIGC实战先锋 | 探索数字进化的无限边际"
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
