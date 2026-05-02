import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function InteractiveText() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;
    
    // Split text into words while preserving spaces for natural line breaks
    const text = textRef.current.innerText;
    const words = text.split(/(\s+)/);
    textRef.current.innerHTML = '';
    
    words.forEach((word) => {
      if (word.trim() === '') {
        textRef.current.appendChild(document.createTextNode(word));
        return;
      }
      const span = document.createElement('span');
      // No margin classes needed, natural spacing is preserved
      span.className = 'inline-block font-medium'; 
      span.style.color = 'rgba(17, 17, 17, 0.15)'; // Faded ink-900
      span.innerText = word;
      textRef.current.appendChild(span);
    });

    const spans = textRef.current.children;

    gsap.to(spans, {
      color: '#111111', // Solid ink-900
      stagger: 1, // High stagger ratio makes it go strictly word by word
      ease: 'none', // Linear transition per word
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        end: 'center 40%',
        scrub: 0.5, // Slight smoothing
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
