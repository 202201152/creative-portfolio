import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-text', {
        y: '100%',
        opacity: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="pt-24 pb-32 md:pb-40 px-6 md:px-12 lg:px-24 bg-paper-50 overflow-hidden">
      <div className="flex flex-col items-center justify-center text-center space-y-12">
        
        <div className="overflow-hidden w-full">
          <h2 className="footer-text text-[12vw] sm:text-[10vw] md:text-[8vw] font-black tracking-tighter leading-none text-ink-900 w-full">
            RAGAN PATEL
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-sm md:text-base font-medium tracking-widest uppercase text-ink-500">
          <a href="mailto:hello@raganpatel.com" className="hover:text-gold-500 transition-colors">Email</a>
          <span className="text-black/20">•</span>
          <a href="tel:+910000000000" className="hover:text-gold-500 transition-colors">Phone</a>
          <span className="text-black/20">•</span>
          <a href="#" className="hover:text-gold-500 transition-colors">LinkedIn</a>
          <span className="text-black/20">•</span>
          <a href="#" className="hover:text-gold-500 transition-colors">GitHub</a>
        </div>
        
      </div>
    </footer>
  );
}
