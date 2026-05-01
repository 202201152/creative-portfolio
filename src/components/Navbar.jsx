import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1 }
    );
  }, []);

  return (
    <div className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav 
        ref={navRef}
        className="glass-nav rounded-full px-6 py-3 flex items-center gap-6 md:gap-10 pointer-events-auto"
      >
        <a href="#about" className="text-sm font-medium hover:text-gold-500 transition-colors">About</a>
        <a href="#portfolio" className="text-sm font-medium hover:text-gold-500 transition-colors">Portfolio</a>
        <a href="#contact" className="text-sm font-medium bg-ink-900 text-white px-5 py-2 rounded-full hover:bg-gold-500 transition-colors">Contact</a>
      </nav>
    </div>
  );
}
