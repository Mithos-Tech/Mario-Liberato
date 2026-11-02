import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Menu, X, Sparkles } from 'lucide-react';

interface FloatingHeaderProps {
  onOpenContact: () => void;
  activeSection: string;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  onOpenContact,
  activeSection,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Fade out when scrolling past hero section (approx 320px)
      const scrollPosition = window.scrollY;
      const heroThreshold = 280;

      if (scrollPosition > heroThreshold) {
        setIsVisible(false);
        setMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { id: 'proyectos', label: 'Proyectos' },
    { id: 'soporte-ti', label: 'Soporte TI' },
    { id: 'capacidades', label: 'Capacidades' },
    { id: 'metodologia', label: 'Metodología' },
    { id: 'experiencia', label: 'Experiencia' },
  ];

  return (
    <>
      {/* Floating Header Container: Centered floating island with smooth transition */}
      <header
        className={`fixed top-5 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isVisible
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="inline-flex items-center gap-4 sm:gap-6 px-3.5 py-2 rounded-2xl bg-slate-950/90 text-white backdrop-blur-md border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.25)]">
          {/* 1. Brand / Logo: White SVG Logo + 'Liberato' in Montserrat Semibold */}
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 group text-left cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            title="Ir al inicio"
          >
            {/* White Brand Logo */}
            <img
              src="/logo-white.svg"
              alt="Mario Liberato"
              className="w-6 h-6 object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
            <span className="text-sm font-semibold tracking-tight text-white font-['Montserrat',sans-serif] whitespace-nowrap">
              Liberato
            </span>
          </button>

          {/* Hairline subtle divider between brand and nav buttons */}
          <div className="hidden md:block h-4 w-[1px] bg-white/15" />

          {/* 2. Navigation items: Initial capital, lowercase, close spacing */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'text-white bg-white/15 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* 3. CTA "Contactar": Prominent button with container, positioned comfortably next to the nav */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-white rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-xs hover:shadow hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              <span>Contactar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile burger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Menú de navegación"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-40 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl flex flex-col gap-2 md:hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => scrollTo(link.id)}
                className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 mt-1">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl"
              >
                <span>Iniciar Proyecto / Contactar</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
