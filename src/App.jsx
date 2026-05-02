import { useEffect, Suspense, lazy } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Footer from './components/Footer';
import Loader from './components/Loader';

const HeroAndExpertise = lazy(() => import('./components/HeroAndExpertise'));
const InteractiveText = lazy(() => import('./components/InteractiveText'));
const SelectedWork = lazy(() => import('./components/SelectedWork'));
const Contact = lazy(() => import('./components/Contact'));

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
        <Suspense fallback={<Loader />}>
          <HeroAndExpertise />
          <InteractiveText />
          <SelectedWork />
          <Contact />
        </Suspense>
      </main>
      
      <Footer />
      <Navbar />
    </div>
  );
}

export default App;
