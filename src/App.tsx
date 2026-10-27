import React, { useState, useEffect } from 'react';
import { FloatingHeader } from './components/FloatingHeader';
import { HeroSection } from './components/HeroSection';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactModal } from './components/ContactModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Track active section for navigation highlight
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'proyectos', 'capacidades', 'metodologia', 'experiencia'];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 120;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreWork = () => {
    const element = document.getElementById('proyectos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Framer-style Floating Header with Clustered Buttons and Scroll Fade */}
      <FloatingHeader
        onOpenContact={() => setIsContactOpen(true)}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section (Header is visible here) */}
        <HeroSection
          onOpenContact={() => setIsContactOpen(true)}
          onExploreWork={handleExploreWork}
        />

        {/* Section 2: Proyectos (Header fades out smoothly here) */}
        <ProjectsShowcase />

        {/* Section 3: Capacidades */}
        <CapabilitiesSection />

        {/* Section 4: Metodología & Análisis UI/UX */}
        <ProcessSection />
      </main>

      {/* Minimalist Studio Footer */}
      <Footer />

      {/* Contact Drawer / Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
