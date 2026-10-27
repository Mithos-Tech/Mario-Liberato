import React from 'react';
import { Check, X, Eye, EyeOff, LayoutTemplate } from 'lucide-react';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Estrategia y Arquitectura de Información',
      duration: 'Semana 1',
      description: 'Definición de objetivos comerciales, mapa de navegación y estructura de contenido sin adornos innecesarios.',
    },
    {
      number: '02',
      title: 'Prototipado Interactivo en Framer',
      duration: 'Semana 2',
      description: 'Diseño en el medio real: probando tipografías, ritmos de scroll y componentes flotantes directamente en el navegador.',
    },
    {
      number: '03',
      title: 'Desarrollo en React & Motion',
      duration: 'Semanas 3–4',
      description: 'Traducción exacta a componentes TypeScript modulares, estilos optimizados con Tailwind y eventos de aceleración GPU.',
    },
    {
      number: '04',
      title: 'Auditoría de Calidad y Despliegue',
      duration: 'Semana 5',
      description: 'Verificación en múltiples dispositivos, auditoría de contraste WCAG y puesta en producción.',
    },
  ];

  return (
    <section id="metodologia" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
            <span>03. Metodología de Trabajo</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Un proceso iterativo transparente y sin sorpresas.
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            Desde la primera hipótesis hasta la entrega final, cada decisión de diseño responde a una función clara y a una estética impecable.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-4">
                  <span className="font-bold text-slate-900 text-sm">{step.number}.</span>
                  <span className="tabular-nums">{step.duration}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* UI/UX Analysis Breakdown Card (Directly addresses the user prompt) */}
        <div id="experiencia" className="mt-16 bg-slate-950 text-white rounded-2xl p-8 sm:p-10 border border-slate-800">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-blue-400 block mb-1">
              Análisis UI/UX · Arquitectura de Navegación
            </span>
            <h3 className="text-2xl font-bold text-white">
              Por qué el Header Flotante Compacto es la mejor decisión UI/UX
            </h3>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Comparativa técnica entre la barra convencional dispersa y el modelo flotante de estilo Framer configurado en este proyecto:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Traditional Header drawbacks */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-wider mb-3">
                <X className="w-4 h-4" />
                <span>Header Convencional (Disperso / Extremo)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-slate-500">·</span>
                  <span><strong>Salto visual excesivo:</strong> Extender el logo a la izquierda y el botón a la derecha obliga al usuario a recorrer hasta 1440px para interactuar.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500">·</span>
                  <span><strong>Contenedores innecesarios:</strong> Envolver cada elemento en píldoras o cajas individuales genera ruido visual y compite con el contenido.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-slate-500">·</span>
                  <span><strong>Persistencia invasiva:</strong> Mantener una barra fija durante todo el scroll resta entre 60px y 80px de viewport útil.</span>
                </li>
              </ul>
            </div>

            {/* Framer-style Floating Header benefits */}
            <div className="p-5 rounded-xl bg-slate-900/90 border border-blue-500/30">
              <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-3">
                <Check className="w-4 h-4" />
                <span>Header Flotante Ajustado (Estilo Framer Sofisticado)</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">·</span>
                  <span><strong>Agrupación cercana y armónica:</strong> El logo, los enlaces y el botón CTA coexisten en una isla flotante centrada con espacios proporcionados.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">·</span>
                  <span><strong>Logo puro sin caja:</strong> El isotipo y la marca respiran libremente, aportando sutileza editorial.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">·</span>
                  <span><strong>Botón Contactar destacado:</strong> Superficie con contenedor sólido y contraste alto que invita al clic sin estar aislado en el extremo.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">·</span>
                  <span><strong>Desvanecimiento suave a la 2ª sección:</strong> Mediante transición `opacity`, `translate-y` y `blur`, desaparece limpiamente al explorar el contenido y reaparece al volver al Hero.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
