import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    gsap.to(progressRef.current, {
      scaleY: 1,
      transformOrigin: 'top center',
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.1,
      }
    });
  }, []);

  return (
    <div className="fixed left-4 md:left-8 top-0 bottom-0 w-px bg-black/10 z-40 hidden md:block">
      <div 
        ref={progressRef}
        className="absolute top-0 left-0 right-0 h-full bg-gold-400 scale-y-0 origin-top"
      />
    </div>
  );
}
