import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import BrandSection from './components/BrandSection';
import Trajectory from './components/Trajectory';
import Certifications from './components/Certifications';
import WorkTogetherMarquee from './components/WorkTogetherMarquee';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { support, studio, labs } from './content';

export default function App() {
  // Aparición suave al hacer scroll (clase .in sobre los elementos .rv)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    if (!window.location.hash || window.location.hash === '#inicio') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      const t = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      }, 50);
    }
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((x) => {
        if (x.isIntersecting) {
          x.target.classList.add('in');
          io.unobserve(x.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <BrandSection data={support} />
      <BrandSection data={studio} />
      <BrandSection data={labs} />
      <Trajectory />
      <Certifications />
      <WorkTogetherMarquee />
      <Contact />
      <Footer />
    </>
  );
}
