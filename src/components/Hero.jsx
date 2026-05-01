import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ragImage from '../assets/images/Rag.png';
import PixelBlast from './PixelBlast';

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
      className="min-h-screen flex items-center justify-center w-full relative overflow-hidden bg-[#F5F5F5]"
    >
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <PixelBlast
          variant="circle"
          pixelSize={6}
          color="#D4AF37"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      <div className="relative z-10 w-full px-4 lg:px-12 flex flex-col lg:flex-row items-center justify-center max-w-[1600px] mx-auto">
        
        {/* Left Name & Info */}
        <div className="hero-element flex flex-col items-center lg:items-end flex-1 lg:pr-8 xl:pr-16 lg:mb-0 mb-8 order-2 lg:order-1">
          <p className="text-ink-500 font-light text-sm mb-2 lg:mb-4 text-center lg:text-right w-full">Award Winning Creative Leader</p>
          <h1 className="text-[15vw] lg:text-[9vw] xl:text-[10vw] font-black tracking-[-0.05em] text-[#1A1A1A] leading-none uppercase m-0 p-0 text-center lg:text-right w-full" style={{ fontFamily: 'system-ui, sans-serif' }}>
            RAGAN
          </h1>
        </div>

        {/* Center Profile Card */}
        <div className="hero-element shrink-0 order-1 lg:order-2 z-20 mx-4">
          <div className="w-[280px] h-[400px] sm:w-[320px] sm:h-[480px] lg:w-[340px] lg:h-[520px] rounded-[2rem] overflow-hidden shadow-2xl relative bg-white border border-white/20">
            <img 
              src={ragImage} 
              alt="Ragan Patel" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1598255555447-3bd9b2165f12?q=80&w=800&auto=format&fit=crop';
              }}
            />
          </div>
        </div>

        {/* Right Name & Info */}
        <div className="hero-element flex flex-col items-center lg:items-start flex-1 lg:pl-8 xl:pl-16 lg:mt-0 mt-8 order-3 lg:order-3">
          <p className="text-ink-500 font-light text-sm mb-2 lg:mb-4 text-center lg:text-left w-full">Designer & Founder</p>
          <h1 className="text-[15vw] lg:text-[9vw] xl:text-[10vw] font-black tracking-[-0.05em] text-[#1A1A1A] leading-none uppercase m-0 p-0 text-center lg:text-left w-full" style={{ fontFamily: 'system-ui, sans-serif' }}>
            PATEL
          </h1>
          <p className="text-ink-500 font-light text-[13px] mt-4 lg:mt-6 tracking-wide text-center lg:text-left w-full">Surat, India - 18:33 GMT+5:30</p>
        </div>

      </div>
    </section>
  );
}
