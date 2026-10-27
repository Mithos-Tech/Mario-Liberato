import { useEffect } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import BrandSection from './components/BrandSection';
import Trajectory from './components/Trajectory';
import Certifications from './components/Certifications';
import WorkTogetherMarquee from './components/WorkTogetherMarquee';
import Contact from './components/Contact';
import { support, studio, labs, site } from './content';

export default function App() {
  // Aparición suave al hacer scroll (clase .in sobre los elementos .rv)
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.rv'));
    if (!window.location.hash || window.location.hash === '#inicio') {
      window.scrollTo(0, 0);
    }
    if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: 0.12 });
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
      <footer className="site-footer">
        <div className="site-footer-inner">
          <div className="site-footer-brand">
            <img
              src={site.logo?.whiteSvg || '/logo-white.svg'}
              alt="Logo Liberato"
              className="footer-logo-icon"
              width="20"
              height="17"
              loading="lazy"
            />
            <span className="footer-brand-name">{site.brand}</span>
          </div>
          <p className="footer-copy">{site.footer}</p>
        </div>
      </footer>
    </>
  );
}
