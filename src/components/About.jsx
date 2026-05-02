import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.about-element', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="luxury-spacing bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* Left Text Content */}
        <div className="order-2 lg:order-1">
          <h2 className="about-element text-3xl md:text-4xl font-light tracking-tight mb-8">
            A minimalist approach to complex problems.
          </h2>
          
          <div className="about-element space-y-6 text-ink-500 font-light leading-relaxed text-lg mb-12">
            <p>
              I am a full stack developer based in Surat, India. Over the years, I've transitioned from writing raw backend logic to crafting immersive frontend experiences. I believe that true luxury in software is invisible—it's the absence of friction.
            </p>
            <p>
              My work focuses on clean architecture, purposeful typography, and fluid motion. Whether building a complex web application or a sleek portfolio, I ensure every detail serves a purpose.
            </p>
          </div>

          <div className="about-element flex flex-col sm:flex-row gap-4">
            <a 
              href="https://drive.google.com/drive/folders/1uKFaqoCkcBSW9ziODPkVu7L4qoVei-Hr?usp=drive_link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex justify-center items-center px-8 py-4 bg-ink-900 text-white rounded-full font-medium hover:bg-gold-500 transition-colors duration-300"
            >
              Download CV
            </a>
            <a 
              href="#contact" 
              className="inline-flex justify-center items-center px-8 py-4 border border-black/10 rounded-full font-medium hover:border-black/30 transition-colors duration-300"
            >
              Contact Me
            </a>
          </div>
        </div>

        {/* Right Photo Card */}
        <div className="about-element order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden bg-black/5">
            <img 
              src="https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=800&auto=format&fit=crop" 
              alt="Workspace" 
              className="w-full h-full object-cover grayscale opacity-80"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
