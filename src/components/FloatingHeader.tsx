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
        <div className="inline-flex items-center gap-4 sm:gap-6 px-3.5 py-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          {/* 1. Brand / Logo: PURE, without heavy container box, close to navigation */}
          <button
            type="button"
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2 group text-left cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
            title="Ir al inicio"
          >
            {/* Minimalist abstract vector mark */}
            <div className="w-7 h-7 flex items-center justify-center text-slate-900 dark:text-white transition-colors">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transform group-hover:rotate-6 transition-transform duration-300"
              >
                <path
                  d="M4 4H20V10H4V4Z"
                  fill="currentColor"
                  fillOpacity="0.9"
                />
                <path
                  d="M4 10H14V16H4V10Z"
                  fill="currentColor"
                  fillOpacity="0.75"
                />
                <path
                  d="M4 16H8V20H4V16Z"
                  fill="currentColor"
                  fillOpacity="0.6"
                />
              </svg>
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap">
              AURA<span className="font-normal text-slate-400">.studio</span>
            </span>
          </button>

          {/* Hairline subtle divider between brand and nav buttons */}
          <div className="hidden md:block h-4 w-[1px] bg-slate-200 dark:bg-slate-800" />

          {/* 2. Navigation items: Floating buttons, close spacing, no individual chunky box enclosures */}
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
                      ? 'text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 font-semibold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
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
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-200 shadow-xs hover:shadow hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              <span>Contactar</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile burger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Menú de navegación"
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
