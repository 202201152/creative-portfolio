import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroAndExpertise from './components/HeroAndExpertise';
import InteractiveText from './components/InteractiveText';
import ScrollProgress from './components/ScrollProgress';
import SelectedWork from './components/SelectedWork';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-paper-50 min-h-screen text-ink-900 overflow-hidden">
      <ScrollProgress />
      
      <main className="relative w-full">
        <HeroAndExpertise />
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
