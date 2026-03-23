import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import components
import Nav from './components/Nav';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import TimelinePath from './components/TimelinePath';
import TechInfraSection from './components/TechInfraSection';
import AICreativeSection from './components/AICreativeSection';
import FullTimelineSection from './components/FullTimelineSection';
import ContactSection from './components/ContactSection';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // 1. Initialize Lenis smooth scroll
    const lenis = new Lenis({
      autoRaf: true,
    });

    // Handle scroll update for GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Refresh GSAP ScrollTrigger after initialization
    ScrollTrigger.refresh();

    // 2. Global background management
    // Ensure body background is explicitly set at the start
    gsap.set('body', { backgroundColor: '#FAFAFA' });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <main className="relative bg-white text-gray-900 font-sans selection:bg-[#6C63FF]/30 transition-colors duration-1000">
      {/* Structural Backbone Components */}
      <Nav />
      <TimelinePath />

      {/* Narrative Chapters (Scrollytelling Flow) */}
      <div id="hero">
        <HeroSection />
      </div>

      <div id="about">
        <AboutSection />
      </div>

      <div id="tech-infra">
        <TechInfraSection />
      </div>

      <div id="ai-creative">
        <AICreativeSection />
      </div>

      <div id="full-evolution">
        <FullTimelineSection />
      </div>

      <div id="contact">
        <ContactSection />
      </div>
    </main>
  );
}
