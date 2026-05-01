import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroAndExpertise from './components/HeroAndExpertise';
import About from './components/About';
import InteractiveText from './components/InteractiveText';
import ScrollProgress from './components/ScrollProgress';
import SelectedWork from './components/SelectedWork';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Basic Lenis-like smooth scrolling setup or just let browser handle it if not using a library.
    // For pure minimalist setup without extra dependencies, we rely on CSS scroll-behavior 
    // and smooth GSAP ScrollTrigger transitions.
    
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-paper-50 min-h-screen text-ink-900 overflow-hidden">
      <ScrollProgress />
      
      <main>
        <HeroAndExpertise />
        <About />
        <InteractiveText />
        <SelectedWork />
        <Contact />
      </main>
      
      <Footer />
      <Navbar />
    </div>
  );
}

export default App;
