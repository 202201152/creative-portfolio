import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ragImage from '../assets/images/Rag.png';
import PixelBlast from './PixelBlast';

gsap.registerPlugin(ScrollTrigger);

export default function HeroAndExpertise() {
  const containerRef = useRef(null);
  const heroCardPlaceholder = useRef(null);
  const expertiseCardPlaceholder = useRef(null);
  const flippingCard = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations (Now inside context so they get reverted properly on unmount)
      gsap.from('.hero-element', {
        y: 40, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2
      });
      
      gsap.from('.do-best-element', {
        y: 50, opacity: 0, duration: 1, stagger: 0.2, ease: 'power3.out',
        scrollTrigger: { trigger: '#expertise', start: 'top 75%' }
      });

      // Setup the flip/scroll animation
      const updateAnimation = () => {
        if (!flippingCard.current || !expertiseCardPlaceholder.current || !heroCardPlaceholder.current) return;
        
        // Reset transforms to calculate exact document flow distances
        gsap.set(flippingCard.current, { clearProps: "all" });
        
        const startRect = heroCardPlaceholder.current.getBoundingClientRect();
        const endRect = expertiseCardPlaceholder.current.getBoundingClientRect();
        
        const xOffset = endRect.left - startRect.left;
        const yOffset = endRect.top - startRect.top;
        const scaleX = endRect.width / startRect.width;
        const scaleY = endRect.height / startRect.height;

        // Kill existing triggers attached to this animation to avoid duplicates on resize
        ScrollTrigger.getAll().forEach(t => {
          if (t.vars.id === 'flipTrigger') t.kill();
        });

        gsap.to(flippingCard.current, {
          x: xOffset,
          y: yOffset,
          scaleX: scaleX,
          scaleY: scaleY,
          rotationY: -180, // Flip backwards
          ease: "none",
          scrollTrigger: {
            id: 'flipTrigger',
            trigger: expertiseCardPlaceholder.current,
            start: "top bottom", // Animation starts when the destination enters the bottom of the screen
            end: "center center", // Animation finishes when the destination is centered
            scrub: true,
          }
        });
      };

      // Run immediately
      updateAnimation();
      
      // Delay it slightly as well, just in case web fonts shift the layout
      const timer = setTimeout(updateAnimation, 100);
      
      window.addEventListener('resize', updateAnimation);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', updateAnimation);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center w-full relative bg-[#F5F5F5] z-20">
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
          
          {/* Left */}
          <div className="hero-element flex flex-col items-center lg:items-end flex-1 lg:pr-8 xl:pr-16 lg:mb-0 mb-8 order-2 lg:order-1">
            <h1 className="text-[15vw] lg:text-[9vw] xl:text-[10vw] font-black tracking-[-0.05em] text-[#1A1A1A] leading-none uppercase m-0 p-0 text-center lg:text-right w-full" style={{ fontFamily: 'system-ui, sans-serif' }}>RAGAN</h1>
          </div>

          {/* Center Space - Houses the actual animating card */}
          <div className="hero-element shrink-0 order-1 lg:order-2 z-20 mx-4 relative">
            
            {/* The Invisible Placeholder determining the layout size */}
            <div 
              ref={heroCardPlaceholder} 
              className="w-[280px] h-[400px] sm:w-[320px] sm:h-[480px] lg:w-[340px] lg:h-[520px] invisible" 
            />
            
            {/* The Flipping Card */}
            <div 
              ref={flippingCard}
              className="absolute inset-0 w-full h-full transform-style-3d origin-center shadow-2xl rounded-[2rem] z-30"
            >
              {/* Front Side: Portrait */}
              <div className="absolute inset-0 w-full h-full backface-hidden rounded-[2rem] overflow-hidden bg-white border border-white/20">
                <img 
                  src={ragImage} 
                  alt="Ragan Patel" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1598255555447-3bd9b2165f12?q=80&w=800&auto=format&fit=crop';
                  }}
                />
              </div>

              {/* Back Side: Portfolio Preview */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[2rem] overflow-hidden bg-[#1A1A1A] flex flex-col justify-end p-8 border border-white/10">
                {/* Simulated Portfolio Images Grid inside the card */}
                <div className="absolute inset-0 w-full h-full opacity-40 grid grid-cols-2 grid-rows-3 gap-2 p-2">
                  <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" />
                  <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" />
                  <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" />
                  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl" />
                  <img src="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover rounded-xl col-span-2" />
                </div>
                
                {/* Name & Title Overlay */}
                <div className="relative z-10 drop-shadow-md">
                  <h3 className="text-3xl font-bold text-white tracking-tight leading-none mb-1">RAGAN<br/>PATEL</h3>
                  <p className="text-sm font-light text-white/80">Designer & Developer</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right */}
          <div className="hero-element flex flex-col items-center lg:items-start flex-1 lg:pl-8 xl:pl-16 lg:mt-0 mt-8 order-3 lg:order-3">
            <h1 className="text-[15vw] lg:text-[9vw] xl:text-[10vw] font-black tracking-[-0.05em] text-[#1A1A1A] leading-none uppercase m-0 p-0 text-center lg:text-left w-full" style={{ fontFamily: 'system-ui, sans-serif' }}>PATEL</h1>
            
            <div className="mt-4 lg:mt-8 flex flex-col items-center lg:items-start text-center lg:text-left">
              <p className="text-sm lg:text-[15px] tracking-[0.2em] uppercase text-[#1A1A1A] font-medium mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>Designer & Developer</p>
              <p className="text-xs lg:text-[13px] tracking-wider text-[#1A1A1A] font-light opacity-60">Surat, India GMT +5:30</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EXPERTISE SECTION */}
      <section id="expertise" className="luxury-spacing relative z-10 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center max-w-[1200px] mx-auto">
          
          {/* Left Content Card */}
          <div className="do-best-element bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-black/5 h-[400px] sm:h-[480px] lg:h-[520px] flex flex-col justify-center">
             <span className="text-ink-500 text-sm font-medium tracking-wide mb-2 block" style={{ fontFamily: 'system-ui, sans-serif' }}>Top performing</span>
             <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">01. Web Design</h3>
             <p className="text-ink-500 mb-8 font-light leading-relaxed text-sm">
                I design modern websites that are responsive, mobile-friendly, and SEO-ready. Every site is built for usability, speed, and premium design aesthetics.
             </p>
             <ul className="text-ink-500 font-light text-[13px] space-y-2">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-400" />Figma</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-400" />React, GSAP & Tailwind</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-400" />Webflow & Framer</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-400" />Experienced with AI builders</li>
             </ul>
          </div>

          {/* Right Destination Placeholder */}
          <div className="do-best-element flex justify-center lg:justify-end shrink-0">
            <div 
              ref={expertiseCardPlaceholder} 
              className="w-[280px] h-[400px] sm:w-[320px] sm:h-[480px] lg:w-[340px] lg:h-[520px] invisible" 
            />
          </div>

        </div>
      </section>

    </div>
  );
}
