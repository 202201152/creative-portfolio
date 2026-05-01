import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-element', {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="min-h-screen flex flex-col justify-center luxury-spacing relative"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-12 lg:gap-8">
        
        {/* Left Name */}
        <div className="hero-element flex justify-center lg:justify-end order-2 lg:order-1">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-ink-900">
            Ragan
          </h1>
        </div>

        {/* Center Profile Card */}
        <div className="hero-element flex justify-center order-1 lg:order-2">
          <div className="w-64 h-80 md:w-80 md:h-[400px] rounded-2xl overflow-hidden bg-black/5 relative group">
            {/* Placeholder Image - replace with actual portrait */}
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
              alt="Ragan Patel" 
              className="w-full h-full object-cover grayscale opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Right Name & Info */}
        <div className="hero-element flex flex-col items-center lg:items-start order-3 lg:order-3">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter text-ink-900 mb-8 lg:mb-16">
            Patel
          </h1>
          
          <div className="text-center lg:text-left space-y-2 text-ink-500 tracking-wide text-sm uppercase font-medium">
            <p>Full Stack Developer</p>
            <p>Surat, India</p>
            <p className="text-gold-500">GMT +5:30</p>
          </div>
        </div>

      </div>
    </section>
  );
}
