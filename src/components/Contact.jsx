import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImg from '../assets/images/profile.jpg.png';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [projectType, setProjectType] = useState('freelance'); // 'freelance' or 'recruiter'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-element', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
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
    <section ref={sectionRef} id="contact" className="luxury-spacing">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        
        {/* Left Form Content */}
        <div className="order-2 lg:order-1 contact-element">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Let's connect</h2>
          <p className="text-ink-500 mb-12 font-light">Open for new opportunities and interesting projects.</p>

          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            
            {/* Toggle */}
            <div className="flex p-1 bg-black/5 rounded-full w-fit">
              <button
                type="button"
                onClick={() => setProjectType('freelance')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  projectType === 'freelance' 
                    ? 'bg-white shadow-sm text-ink-900' 
                    : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                Freelance Project
              </button>
              <button
                type="button"
                onClick={() => setProjectType('recruiter')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  projectType === 'recruiter' 
                    ? 'bg-white shadow-sm text-ink-900' 
                    : 'text-ink-500 hover:text-ink-900'
                }`}
              >
                Recruiter
              </button>
            </div>

            <div className="space-y-8">
              <div className="relative">
                <input 
                  type="text" 
                  id="name"
                  placeholder="Your Name" 
                  className="w-full bg-transparent border-b border-black/10 py-3 text-ink-900 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-ink-500/50 font-light"
                />
              </div>
              
              <div className="relative">
                <input 
                  type="email" 
                  id="email"
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-black/10 py-3 text-ink-900 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-ink-500/50 font-light"
                />
              </div>

              <div className="relative">
                <textarea 
                  id="message"
                  placeholder={projectType === 'freelance' ? "Tell me about your project..." : "Tell me about the role..."}
                  rows="4"
                  className="w-full bg-transparent border-b border-black/10 py-3 text-ink-900 focus:outline-none focus:border-gold-500 transition-colors placeholder:text-ink-500/50 font-light resize-none"
                ></textarea>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full sm:w-auto px-10 py-4 bg-ink-900 text-white rounded-full font-medium hover:bg-gold-500 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Right Photo Balance */}
        <div className="order-1 lg:order-2 contact-element lg:h-[600px] rounded-3xl overflow-hidden bg-black/5 hidden lg:block">
           <img 
            src={profileImg} 
            alt="Ragan Patel" 
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
}
