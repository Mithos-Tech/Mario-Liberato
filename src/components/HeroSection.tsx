import React from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Layers, Cpu, ShieldCheck } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onExploreWork,
}) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Subtle background ambient gradients (anti-slop, clean slate/zinc) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-40 overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-slate-200/50 rounded-full blur-3xl" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Quiet unboxed kicker (no pill boxes) */}
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-widest mb-6">
          <span>Estudio de Diseño & Arquitectura Digital</span>
          <span aria-hidden="true">·</span>
          <span>Framer & React Engine</span>
        </div>

        {/* Display Headline with balanced wrap */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 text-balance leading-[1.08]">
          Diseño web que transforma ideas en experiencias memorables.
        </h1>

        {/* Natural subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Diseñamos y desarrollamos interfaces con micro-interacciones fluidas, estética minimalista y componentes flotantes de alta precisión pensados para marcas exigentes.
        </p>

        {/* Action Controls */}
        <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenContact}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all duration-200 hover:scale-[1.02] shadow-sm cursor-pointer whitespace-nowrap"
          >
            <span>Iniciar Proyecto</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={onExploreWork}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white border border-slate-200/90 rounded-xl hover:bg-slate-50 transition-all duration-200 cursor-pointer whitespace-nowrap"
          >
            <span>Ver Proyectos</span>
          </button>
        </div>

        {/* Interactive Header Scroll Hint Card */}
        <div className="mt-12 inline-flex items-center gap-3 p-3 bg-white/90 border border-slate-200/90 rounded-xl text-left shadow-xs max-w-md mx-auto">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </div>
          <div className="text-xs">
            <span className="font-semibold text-slate-900 block">Comportamiento del Header Flotante</span>
            <span className="text-slate-500">
              Desplázate hacia abajo: el menú flotante se desvanece con suavidad a partir de la siguiente sección y reaparece al volver aquí.
            </span>
          </div>
        </div>

        {/* Interactive Showcase Preview Frame */}
        <div className="mt-14 relative rounded-2xl border border-slate-200/80 bg-white p-3 shadow-lg shadow-slate-900/5">
          <div className="rounded-xl bg-slate-950 text-white p-6 sm:p-10 text-left overflow-hidden relative">
            {/* Top window controls */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <span className="ml-2 text-xs font-mono text-slate-400">aura.studio/design-system</span>
              </div>
              <div className="text-xs text-slate-400 font-mono">1440 × 900 px</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <Layers className="w-5 h-5 text-blue-400 mb-2" />
                <h3 className="text-sm font-semibold text-white">Botones Flotantes Cohesivos</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Agrupación armónica centrada sin contenedores pesados ni distancias desconectadas.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <Cpu className="w-5 h-5 text-emerald-400 mb-2" />
                <h3 className="text-sm font-semibold text-white">Transición por Scroll Fluida</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Desvanecimiento progresivo con aceleración por hardware que libera el viewport de lectura.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <ShieldCheck className="w-5 h-5 text-amber-400 mb-2" />
                <h3 className="text-sm font-semibold text-white">CTA Destacado Integrado</h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  Contenedor de alta intención accesible a un paso del grupo principal de navegación.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
