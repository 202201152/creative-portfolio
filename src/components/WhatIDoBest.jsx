import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhatIDoBest() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.do-best-element', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="luxury-spacing" id="expertise">
      <div className="mb-16 md:mb-24 do-best-element">
        <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">What I do best?</h2>
        <p className="text-ink-500 max-w-xl text-lg font-light">
          Combining deep technical expertise with a refined eye for design to build digital experiences that stand out.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
        
        {/* Left Content Card */}
        <div className="do-best-element bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-black/5">
          <span className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-4 block">
            01. Web Design
          </span>
          <h3 className="text-2xl md:text-3xl font-medium mb-6">Interface & Experience</h3>
          <p className="text-ink-500 mb-8 font-light leading-relaxed">
            I craft minimalist, high-end interfaces that prioritize usability and aesthetic elegance. Every interaction is designed to feel intentional, creating seamless journeys for the user.
          </p>
          
          <div className="flex flex-wrap gap-2">
            {['Figma', 'React', 'Tailwind CSS', 'GSAP'].map((tool) => (
              <span key={tool} className="px-4 py-2 rounded-full border border-black/10 text-xs font-medium text-ink-800">
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Right Image Card */}
        <div className="do-best-element h-[400px] md:h-[500px] rounded-3xl overflow-hidden group relative">
          <img 
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop" 
            alt="Web Design Setup" 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-3xl pointer-events-none" />
          <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-3xl pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
