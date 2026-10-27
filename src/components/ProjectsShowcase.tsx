import React, { useState } from 'react';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  accent: string;
  deliverables: string[];
  metrics: string;
}

export const ProjectsShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const projects: ProjectItem[] = [
    {
      id: 'proj-lumina',
      title: 'Lumina Spatial Engine',
      client: 'Lumina Labs',
      category: 'SaaS & 3D Web',
      year: '2026',
      description: 'Plataforma web para renderizado paramétrico en tiempo real con sistema de diseño modular y componentes flotantes reactivos.',
      accent: 'from-blue-600/20 to-indigo-600/10',
      deliverables: ['UI/UX Design', 'Three.js Shaders', 'Design System'],
      metrics: '+180% Retención en onboarding',
    },
    {
      id: 'proj-atelier',
      title: 'Atelier Minimal E-Commerce',
      client: 'Studio Maison',
      category: 'E-Commerce de Lujo',
      year: '2026',
      description: 'Tienda editorial interactiva con navegación zero-distraction, checkout en un paso y tipografía condensada contemporánea.',
      accent: 'from-amber-600/20 to-orange-600/10',
      deliverables: ['Framer Prototyping', 'React Frontend', 'Stripe Flow'],
      metrics: '+34% Conversión directa',
    },
    {
      id: 'proj-kortex',
      title: 'Kortex Developer Console',
      client: 'Kortex Cloud',
      category: 'Herramientas Dev',
      year: '2025',
      description: 'Consola de orquestación de microservicios con métricas tabulares de latencia, topología de nodos y modo oscuro con compensación óptica.',
      accent: 'from-emerald-600/20 to-teal-600/10',
      deliverables: ['Information Architecture', 'Data Tables', 'Interactive Graph'],
      metrics: 'Sub-50ms tiempo de respuesta UI',
    },
    {
      id: 'proj-vanguard',
      title: 'Vanguard Mobility Brand',
      client: 'Vanguard Dynamics',
      category: 'Movilidad & Futuro',
      year: '2025',
      description: 'Sitio de lanzamiento interactivo para vehículos autónomos con transiciones suaves por scroll y animaciones cinematográficas.',
      accent: 'from-purple-600/20 to-pink-600/10',
      deliverables: ['Art Direction', 'Scroll Choreography', 'Web Audio'],
      metrics: 'Premio Sitio del Día 2025',
    },
  ];

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'SaaS & 3D Web', label: 'SaaS & 3D' },
    { id: 'E-Commerce de Lujo', label: 'E-Commerce' },
    { id: 'Herramientas Dev', label: 'Developer Tools' },
    { id: 'Movilidad & Futuro', label: 'Movilidad' },
  ];

  const filtered = selectedCategory === 'todos'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="proyectos" className="py-24 bg-white border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-slate-200">
          <div>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>01. Casos de Estudio Seleccionados</span>
              <span aria-hidden="true" className="mx-2">·</span>
              <span>2025—2026</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Proyectos con ADN Framer y código de alta fidelidad.
            </h2>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl overflow-x-auto shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative bg-slate-50/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-slate-400 hover:shadow-md"
            >
              <div>
                {/* Clean unboxed metadata with separators (zero-pill discipline) */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-700">{item.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{item.category}</span>
                  </div>
                  <span className="font-mono tabular-nums">{item.year}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                {/* Deliverables unboxed inline text */}
                <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                  <span className="font-medium text-slate-700">Entregables:</span>
                  {item.deliverables.map((d, idx) => (
                    <React.Fragment key={d}>
                      <span>{d}</span>
                      {idx < item.deliverables.length - 1 && <span aria-hidden="true">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Bottom metric & link */}
              <div className="mt-8 pt-4 border-t border-slate-200/70 flex items-center justify-between text-xs">
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  {item.metrics}
                </span>

                <span className="inline-flex items-center gap-1 font-semibold text-slate-900 group-hover:translate-x-0.5 transition-transform">
                  <span>Explorar caso</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
