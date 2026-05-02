import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
  { id: 1, title: 'Lumina', category: 'E-Commerce', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Aura', category: 'Brand Identity', image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Vertex', category: 'Web App', image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Nova', category: 'Portfolio', image: 'https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=800&auto=format&fit=crop' },
];

export default function SelectedWork() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="luxury-spacing bg-white relative">
      <div className="relative z-50">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Selected Work</h2>
            <p className="text-ink-500 max-w-md font-light">A curated collection of projects combining form and function.</p>
          </div>
          <a href="#" className="text-sm font-medium uppercase tracking-widest text-gold-500 hover:text-gold-600 transition-colors">
            View All Work
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10">
          {works.map((work) => (
            <a key={work.id} href="#" className="work-card block group">
              <div className="aspect-square w-full rounded-2xl overflow-hidden relative bg-black/5 mb-6">
                <img 
                  src={work.image} 
                  alt={work.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-white font-medium tracking-wider uppercase text-sm border border-white/30 px-6 py-3 rounded-full backdrop-blur-sm">
                    View Project
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-medium mb-1">{work.title}</h3>
                <p className="text-ink-500 font-light text-sm">{work.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
