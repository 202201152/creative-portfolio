import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
  { id: 1, title: 'Pagani Utopia', category: 'Automotive / 3D', image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=800&auto=format&fit=crop', link: 'https://pagani-3kaj.vercel.app/' },
  { id: 2, title: 'iPhone 16 Pro', category: 'Product Showcase', image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=800&auto=format&fit=crop', link: 'https://iphone-peach-two.vercel.app/' },
  { id: 3, title: 'DG Jewelry', category: 'E-Commerce', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop', link: 'https://durga-art-zone-zyhq.vercel.app/' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {works.map((work) => (
            <a key={work.id} href={work.link} target="_blank" rel="noopener noreferrer" className="work-card block group">
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
