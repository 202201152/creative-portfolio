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
        className="bg-[#1A1A1A] text-white rounded-full px-4 py-2 flex items-center gap-6 md:gap-8 pointer-events-auto shadow-2xl border border-white/10"
      >
        <a href="#" className="p-2 hover:text-[#F38A00] transition-colors">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
        </a>
        <a href="#expertise" className="text-[13px] tracking-wide font-medium hover:text-white/70 transition-colors">Skills</a>
        <a href="#about" className="text-[13px] tracking-wide font-medium hover:text-white/70 transition-colors">About</a>
        <a href="#portfolio" className="text-[13px] tracking-wide font-medium flex items-center gap-1 hover:text-white/70 transition-colors">
          Portfolio
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </a>
        <a href="#reviews" className="text-[13px] tracking-wide font-medium hover:text-white/70 transition-colors">Reviews</a>
        <a href="#contact" className="text-[13px] tracking-wide font-semibold bg-[#F38A00] text-white px-7 py-2.5 rounded-full hover:bg-[#e07a00] transition-colors ml-2">Contact me</a>
      </nav>
    </div>
  );
}
