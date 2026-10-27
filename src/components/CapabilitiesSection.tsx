import React from 'react';
import { Layers, Sparkles, Code2, Gauge, Compass, Palette } from 'lucide-react';

export const CapabilitiesSection: React.FC = () => {
  const capabilities = [
    {
      icon: Palette,
      number: '01',
      title: 'Dirección de Arte & Diseño UI/UX',
      description: 'Interfaces con estética editorial, balance tipográfico y jerarquías limpias sin saturación visual innecesaria.',
      features: ['Wireframes interactivos de alta fidelidad', 'Pruebas de contraste WCAG AA', 'Microinteracciones hápticas y fluidas'],
    },
    {
      icon: Code2,
      number: '02',
      title: 'Desarrollo Frontend React & Framer',
      description: 'Implementación modular con TypeScript estricto, animaciones con curvas bezier físicas y rendimiento de 60fps constantes.',
      features: ['Motion & composited transforms', 'Carga asíncrona y code-splitting', 'Animaciones de scroll fluidas'],
    },
    {
      icon: Layers,
      number: '03',
      title: 'Sistemas de Diseño & Componentes',
      description: 'Arquitectura de tokens sincronizados entre diseño y código para garantizar consistencia y escalabilidad a largo plazo.',
      features: ['Tokens de color, tipo y espaciado', 'Componentes accesibles sin dependencias pesadas', 'Documentación viva de patrones'],
    },
    {
      icon: Gauge,
      number: '04',
      title: 'Rendimiento & Core Web Vitals',
      description: 'Tiempos de interacción sub-100ms, cero bloqueo del hilo principal y máxima calificación de experiencia de usuario.',
      features: ['Largest Contentful Paint < 1.2s', 'Cumulative Layout Shift = 0', 'Optimización SVG y activos vectoriales'],
    },
  ];

  return (
    <section id="capacidades" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>02. Capacidades Técnicas & Diseño</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Disciplinas integradas para productos digitales excepcionales.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Eliminamos la fricción entre la visión del diseñador y la ejecución del código mediante prototipos interactivos vivos y arquitecturas limpias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <div
                key={cap.number}
                className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between transition-all hover:border-slate-300 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      {cap.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{cap.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
                  {cap.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-600">
                      <div className="w-1 h-1 rounded-full bg-slate-400" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
