import React from 'react';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-slate-900">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base font-bold tracking-tight text-white">
                AURA<span className="font-normal text-slate-500">.studio</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Diseño de interfaces, componentes flotantes estilo Framer y desarrollo de productos web vanguardistas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400">
            <a href="#proyectos" className="hover:text-white transition-colors">Proyectos</a>
            <a href="#capacidades" className="hover:text-white transition-colors">Capacidades</a>
            <a href="#metodologia" className="hover:text-white transition-colors">Metodología</a>
            <a href="#experiencia" className="hover:text-white transition-colors">Análisis UI/UX</a>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-white hover:text-slate-300 transition-colors p-1"
            >
              <span>Subir al Hero</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono tabular-nums">
          <div>
            <span>© {new Date().getFullYear()} AURA Studio. Todos los derechos reservados.</span>
          </div>
          <div className="flex items-center gap-3">
            <span>Framer Motion 12+</span>
            <span aria-hidden="true">·</span>
            <span>React 19</span>
            <span aria-hidden="true">·</span>
            <span>TypeScript</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
