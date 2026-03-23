import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Nav: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: '首页', href: '#hero' },
    { name: '关于', href: '#about' },
    { name: '技术栈', href: '#tech-infra' },
    { name: 'AIGC', href: '#ai-creative' },
    { name: '进化史', href: '#full-evolution' },
    { name: '联系', href: '#contact' },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-12 bg-transparent">
      <div className="container mx-auto flex justify-between items-center max-w-7xl">
        {/* Logo */}
        <div className="flex flex-col group cursor-pointer">
           <span className="text-xl md:text-2xl font-sans font-black text-gray-900 tracking-tighter leading-none transition-colors">
              设计师进化史
           </span>
           <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-gray-400 font-bold font-sans">
              Portfolio Evolution 2000-2026
           </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[12px] font-bold tracking-[0.15em] uppercase text-gray-400 hover:text-gray-900 transition-colors duration-300 relative group font-sans"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-gray-900 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
          
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-900">
             {mobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-white z-[60] flex flex-col items-center justify-center gap-12 text-center transition-transform duration-700 ease-in-out ${
        mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
      }`}>
         <button 
           onClick={() => setMobileMenuOpen(false)} 
           className="absolute top-8 right-8 text-gray-900"
           aria-label="Close menu"
         >
            <X size={48} />
         </button>
         
          {navLinks.map(link => (
             <a 
               key={link.name} 
               href={link.href}
               onClick={() => setMobileMenuOpen(false)}
               className="text-3xl font-sans font-black text-gray-900 hover:text-gray-500 uppercase tracking-tighter"
             >
               {link.name}
             </a>
           ))}
      </div>
    </nav>
  );
};

export default Nav;
