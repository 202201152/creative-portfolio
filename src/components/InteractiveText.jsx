import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveText() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Split text into words for animation (simple implementation)
    const words = textRef.current.innerText.split(' ');
    textRef.current.innerHTML = '';
    
    words.forEach((word) => {
      const span = document.createElement('span');
      span.className = 'inline-block opacity-20 transition-opacity duration-300 mr-[0.2em] mb-[0.1em]';
      span.innerText = word;
      textRef.current.appendChild(span);
    });

    const spans = textRef.current.children;

    gsap.to(spans, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        end: 'bottom 60%',
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="py-32 md:py-48 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto flex items-center justify-center min-h-[70vh]"
    >
      <h2 
        ref={textRef}
        className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight text-center text-ink-900"
      >
        I don't just build websites. I craft experiences that move, respond, and feel alive.
      </h2>
    </section>
  );
}
