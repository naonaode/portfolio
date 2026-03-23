import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TimelinePath: React.FC = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // SVG Draw Animation
      const length = el.getTotalLength();
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(el, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
        }
      });

      // Line background color change relative to scroll background color
      const handleBackgroundChange = () => {
        // Optional logic to make line stand out more if needed
      };
      
      window.addEventListener('scroll', handleBackgroundChange);
      return () => window.removeEventListener('scroll', handleBackgroundChange);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-[-1] flex justify-center"
      aria-hidden="true"
    >
      <svg 
        width="12" 
        height="100%" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-4 overflow-visible"
      >
        {/* Background static line */}
        <line 
          x1="6" y1="0" x2="6" y2="20000" 
          stroke="#000000" 
          strokeOpacity="0.05" 
          strokeWidth="2" 
          strokeDasharray="12 12"
        />
        {/* Animated progressive line - Minimalist Gray */}
        <path 
          ref={pathRef}
          d="M6 0V20000" 
          stroke="#1A1A2E" 
          strokeWidth="1.5" 
          strokeOpacity="0.2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default TimelinePath;
