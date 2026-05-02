import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Send } from 'lucide-react';
import ragImage from '../assets/images/Rag.png';
import bgVideo from '../assets/videos/Typing Code - 4K Video - Free Stock Video.mp4';
import LinePath from './LinePath';

gsap.registerPlugin(ScrollTrigger);

const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const EXPERTISE_CARDS = [
  {
    title: "01. UI / UX Design",
    description: "I design modern interfaces that are intuitive and highly engaging. Every layout is crafted for premium aesthetics and flawless usability.",
    tools: ["Figma", "Adobe XD", "Sketch", "Photoshop"]
  },
  {
    title: "02. Frontend Developer",
    description: "I build responsive, high-performance web applications with cinematic motion and cutting-edge 3D interactions.",
    tools: ["React", "JavaScript", "TypeScript", "Vite", "GSAP", "Three.js", "Framer Motion", "WebGL", "Redux", "GraphQL"]
  },
  {
    title: "03. Backend Developer",
    description: "I develop robust, scalable server architectures and seamless APIs that power dynamic web experiences.",
    tools: ["Node", "Express", "REST", "JWT", "MongoDB", "Redis", "PostgreSQL", "Langchain"]
  },
  {
    title: "04. DevOps",
    description: "I streamline development lifecycles with automated testing, continuous integration, and rock-solid deployment pipelines.",
    tools: ["Git", "GitHub", "CI/CD", "Docker", "AWS", "Jira"]
  },
  {
    title: "05. Payment Systems",
    description: "I integrate secure, frictionless payment gateways ensuring smooth financial transactions for users worldwide.",
    tools: ["Razorpay", "Stripe", "Skrill"]
  }
];

export default function HeroAndExpertise() {
  const containerRef = useRef(null);
  const heroCardPlaceholder = useRef(null);
  const expertiseCardPlaceholder = useRef(null);
  const aboutCardPlaceholder = useRef(null);
  const flippingCard = useRef(null);
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);
  const videoPlayingRef = useRef(false);

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

      gsap.from('.about-element', {
        y: 40, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: '#about', start: 'top 80%' }
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
          if (t.vars.id === 'flipTrigger' || t.vars.id === 'stackTrigger' || t.vars.id === 'aboutFlipTrigger') t.kill();
        });

        const flipScrollDistance = window.innerHeight * 0.85;
        const pinScrollDistance = 2500;

        const flipTl = gsap.timeline({
          scrollTrigger: {
            id: 'flipTrigger',
            trigger: expertiseCardPlaceholder.current,
            start: "top bottom",
            end: `+=${flipScrollDistance + pinScrollDistance}`,
            scrub: true,
            onUpdate: (self) => {
              const flipRatio = flipScrollDistance / (flipScrollDistance + pinScrollDistance);
              if (self.progress >= flipRatio - 0.001) {
                // Card has settled
                if (!videoPlayingRef.current) {
                  videoPlayingRef.current = true;
                  if (videoRef.current) {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                      playPromise.catch(e => {
                        if (e.name !== 'AbortError') console.error('Video play error:', e);
                      });
                    }
                  }
                  if (thumbnailRef.current) gsap.to(thumbnailRef.current, { opacity: 0, duration: 0.5 });
                }
              } else {
                // Card is moving
                if (videoPlayingRef.current) {
                  videoPlayingRef.current = false;
                  if (videoRef.current) videoRef.current.pause();
                  if (thumbnailRef.current) gsap.to(thumbnailRef.current, { opacity: 0.6, duration: 0.3 });
                }
              }
            }
          }
        });

        flipTl.to(flippingCard.current, {
          x: xOffset,
          y: yOffset,
          scaleX: scaleX,
          scaleY: scaleY,
          rotationY: -180, // Flip backwards
          ease: "none",
          duration: flipScrollDistance
        });

        flipTl.to(flippingCard.current, {
          y: yOffset + pinScrollDistance,
          ease: "none",
          duration: pinScrollDistance
        });

        // --- NATIVE GSAP STACK ANIMATION ---
        const stackCards = gsap.utils.toArray('.expertise-card');
        if (stackCards.length > 0) {
          gsap.set(stackCards, { clearProps: "all" });
          
          // Cards 2-5 start off-screen
          gsap.set(stackCards.slice(1), { y: "150vh" });

          const stackTl = gsap.timeline({
            scrollTrigger: {
              id: 'stackTrigger',
              trigger: ".cards-container",
              start: "top 15vh",
              end: "+=2500", // Amount of scrolling to complete the stack
              scrub: 1,
              pin: true,
              anticipatePin: 1
            }
          });

          stackCards.forEach((card, i) => {
            if (i === 0) return;
            
            // New card slides up and covers
            stackTl.to(card, {
              y: 0,
              duration: 1,
              ease: "power2.inOut"
            }, `stage${i}`);

            // Previous cards scale down and dim progressively
            for (let j = 0; j < i; j++) {
              const depth = i - j;
              const targetScale = 1 - (depth * 0.05); // Shrink 5% per layer
              const targetY = -(depth * 20); // Move up 20px per layer

              stackTl.to(stackCards[j], {
                scale: targetScale,
                y: targetY,
                duration: 1,
                ease: "power2.inOut"
              }, `stage${i}`);
            }
          });
        }

        if (aboutCardPlaceholder.current) {
          const aboutRect = aboutCardPlaceholder.current.getBoundingClientRect();
          
          const p3X = aboutRect.left - startRect.left;
          const p3Y = aboutRect.top - startRect.top + pinScrollDistance;
          const p3ScaleX = aboutRect.width / startRect.width;
          const p3ScaleY = aboutRect.height / startRect.height;

          const aboutTl = gsap.timeline({
            scrollTrigger: {
              id: 'aboutFlipTrigger',
              trigger: "#about",
              start: "top bottom", 
              end: "top 20%",
              scrub: true,
            }
          });

          aboutTl.fromTo(flippingCard.current, {
            x: xOffset,
            y: yOffset + pinScrollDistance,
            scaleX: scaleX,
            scaleY: scaleY,
            rotationY: -180
          }, {
            x: p3X,
            y: p3Y,
            scaleX: p3ScaleX,
            scaleY: p3ScaleY,
            rotationY: -360, // flip back to front
            ease: "power2.inOut",
            immediateRender: false
          });
        }
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
    <div ref={containerRef} className="relative w-full">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center w-full relative bg-[#F5F5F5] z-50">

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
              className="absolute inset-0 w-full h-full transform-style-3d origin-center shadow-2xl rounded-[2rem] z-[100]"
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

              {/* Back Side: Video & Overlay */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-[2rem] overflow-hidden bg-[#1A1A1A] flex flex-col justify-center items-center p-8 border border-white/10">
                
                <video
                  ref={videoRef}
                  src={bgVideo}
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                
                <img
                  ref={thumbnailRef}
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop"
                  className="absolute inset-0 w-full h-full object-cover opacity-60"
                  alt="Code Thumbnail"
                />
                
                <div className="absolute inset-0 bg-black/40" />
                
                {/* Name & Title Overlay */}
                <div className="relative z-10 drop-shadow-md text-center">
                  <h3 className="text-4xl font-bold text-white tracking-tight leading-none mb-2">RAGAN<br/>PATEL</h3>
                  <p className="text-[15px] font-light text-white/80">Designer & Developer</p>
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
      <section id="expertise" className="relative z-10 bg-[#F5F5F5] pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-[1400px] mx-auto relative px-4 lg:px-12">
          
          {/* Left Content Column - Native GSAP Stack */}
          <div className="w-full">
            <div className="cards-container relative w-full h-[400px] sm:h-[480px] lg:h-[520px]">
              {EXPERTISE_CARDS.map((card, index) => (
                <div 
                  key={index} 
                  className="expertise-card absolute top-0 left-0 w-full h-full bg-white p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-black/5 flex flex-col justify-center rounded-[2.5rem] will-change-transform"
                  style={{ zIndex: index + 1 }}
                >
                   <span className="text-ink-500 text-sm font-medium tracking-wide mb-2 block" style={{ fontFamily: 'system-ui, sans-serif' }}>Top performing</span>
                   <h3 className="text-4xl md:text-5xl font-medium tracking-tight mb-8">{card.title}</h3>
                   <p className="text-ink-500 mb-8 font-light leading-relaxed text-sm">
                      {card.description}
                   </p>
                   <ul className="text-ink-500 font-light text-[13px] grid grid-cols-2 gap-y-2 gap-x-4">
                      {card.tools.map((tool, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                          {tool}
                        </li>
                      ))}
                   </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Right Destination Placeholder (Sticky) */}
          <div className="w-full h-full relative">
            <div className="do-best-element flex justify-center lg:justify-end shrink-0 lg:sticky lg:top-[15vh] h-[400px] sm:h-[480px] lg:h-[520px] z-0 pointer-events-none mt-[10vh] lg:mt-0">
              <div 
                ref={expertiseCardPlaceholder} 
                className="w-[280px] h-[400px] sm:w-[320px] sm:h-[480px] lg:w-[340px] lg:h-[520px] invisible" 
              />
            </div>
          </div>

        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className="relative bg-white">
        <LinePath />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start max-w-[1400px] mx-auto px-4 lg:px-12 py-32">
          
          {/* Left Text Content */}
          <div className="order-2 lg:order-1 relative z-30">
            <h2 className="about-element text-5xl md:text-6xl font-medium tracking-tight mb-4 leading-tight text-ink-900">
              <span className="text-gold-500">Creative</span> at the Core
            </h2>
            
            <p className="about-element text-xl text-ink-500 font-light mb-8">
              Designer. Marketer. Founder. Problem-solver.
            </p>
            
            <div className="about-element space-y-6 text-ink-500 font-light leading-relaxed text-lg mb-10">
              <p>
                With 13 years of experience, I bridge my creativity and my ability to adapt quickly, solve problems across departments, and produce work that strengthens brands, drive revenue growth and when given a chance, support teams through leadership.
              </p>
              <p>
                My impact is incomparable.
              </p>
            </div>

            <div className="about-element flex flex-col sm:flex-row gap-4 mb-10">
              <button 
                className="inline-flex justify-center items-center px-8 py-3 border border-ink-900/20 text-ink-900 rounded-full font-medium hover:bg-ink-900/5 transition-colors duration-300"
              >
                Copy email
              </button>
              <button 
                className="inline-flex justify-center items-center px-8 py-3 border border-ink-900/20 text-ink-900 rounded-full font-medium hover:bg-ink-900/5 transition-colors duration-300"
              >
                Download CV
              </button>
            </div>

            <div className="about-element mb-10">
              <div className="flex gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-gold-500 text-gold-500" />
                ))}
              </div>
              <p className="text-2xl font-medium text-ink-900">
                Trusted by over 130+ clients
              </p>
            </div>

            <div className="about-element flex gap-4">
               {[
                 { icon: XIcon, href: "#", name: "X" },
                 { icon: InstagramIcon, href: "#", name: "Instagram" },
                 { icon: YoutubeIcon, href: "#", name: "YouTube" },
                 { icon: LinkedinIcon, href: "#", name: "LinkedIn" },
                 { icon: Send, href: "#", name: "Telegram" }
               ].map((social, idx) => {
                 const Icon = social.icon;
                 return (
                   <a 
                     key={idx}
                     href={social.href}
                     className="group relative w-12 h-12 rounded-xl border border-ink-900/10 flex items-center justify-center text-ink-900 transition-all duration-300 hover:bg-gold-500 hover:text-white hover:border-gold-500 hover:shadow-[0_0_20px_rgba(197,160,89,0.5)]"
                   >
                     <Icon className="w-5 h-5 relative z-10" />
                     
                     {/* Tooltip */}
                     <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[#333333] text-white text-xs font-medium rounded opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none whitespace-nowrap z-20 shadow-lg tracking-wide">
                       {social.name}
                       <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#333333] rotate-45 rounded-sm"></span>
                     </span>
                   </a>
                 );
               })}
            </div>
          </div>

          {/* Right Destination Placeholder */}
          <div className="about-element order-1 lg:order-2 flex justify-center lg:justify-end h-[400px] sm:h-[480px] lg:h-[520px]">
            <div 
              ref={aboutCardPlaceholder} 
              className="w-[280px] h-[400px] sm:w-[320px] sm:h-[480px] lg:w-[340px] lg:h-[520px] invisible" 
            />
          </div>

        </div>
      </section>

    </div>
  );
}
