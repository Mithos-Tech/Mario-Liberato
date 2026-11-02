import React from 'react';

export const MithosTechSection: React.FC = () => {
  return (
    <section id="soporte-ti" className="py-24 bg-[#090a0f] text-white border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            {/* Pill Kicker with Orange Indicator */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium text-white/90 mb-4 backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-[#f95738] shadow-[0_0_8px_#f95738]" />
              <span className="tracking-wide">MithosTech</span>
            </div>

            {/* Display Headline: SOPORTE TI */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white flex items-baseline gap-2.5">
              <span className="font-['Montserrat',sans-serif]">SOPORTE</span>
              <span className="font-['DM_Serif_Display',serif] italic font-normal tracking-wide text-white/95">TI</span>
            </h2>
          </div>

          <p className="text-sm sm:text-base text-slate-400 max-w-md font-normal leading-relaxed md:text-right">
            Equipos, redes y cableado, con documentación clara de cada caso.
          </p>
        </div>

        {/* Bento Grid: 3 columns on Desktop, 2 on Tablet, 1 on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* ========================================================
              COLUMNA 1: Izquierda (2 Tarjetas 1:1)
             ======================================================== */}
          <div className="flex flex-col gap-6">
            
            {/* TARJETA 1: Repotenciación de All-in-One HP (Video 1:1, sin etiqueta superior) */}
            <div className="group relative aspect-square w-full rounded-[24px] overflow-hidden border border-white/10 bg-[#0d0e14] hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col justify-end p-6 sm:p-8">
              <video
                src="/assets/mithostech/repoten_one.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out pointer-events-none"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Texto superpuesto en espacio negativo */}
              <div className="relative z-10">
                <span className="text-[11px] font-['Montserrat',sans-serif] font-semibold tracking-wider uppercase text-white/70 block mb-1">
                  REPOTENCIACIÓN DE
                </span>
                <h3 className="text-2xl sm:text-3xl font-['DM_Serif_Display',serif] italic font-normal text-white tracking-normal leading-tight">
                  All-in-One HP
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  Limpieza, mantenimiento y actualización de hardware para un mejor rendimiento.
                </p>
              </div>
            </div>

            {/* TARJETA 2: Cableado estructurado (Imagen 1:1, sin etiqueta superior) */}
            <div className="group relative aspect-square w-full rounded-[24px] overflow-hidden border border-white/10 bg-[#0d0e14] hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col justify-end p-6 sm:p-8">
              <img
                src="/assets/mithostech/cableado.webp"
                alt="Rack mural y cableado estructurado Cat 5e"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out pointer-events-none"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Texto superpuesto en espacio negativo */}
              <div className="relative z-10">
                <span className="text-[11px] font-['Montserrat',sans-serif] font-semibold tracking-wider uppercase text-white/70 block mb-1">
                  CABLEADO ESTRUCTURADO
                </span>
                <h3 className="text-2xl sm:text-3xl font-['DM_Serif_Display',serif] italic font-normal text-white tracking-normal leading-tight">
                  Conectividad educativa
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
                  Reemplazo y organización de cableado en aulas críticas. Conexión estable y segura.
                </p>
              </div>
            </div>

          </div>


          {/* ========================================================
              COLUMNA 2: Centro (Soporte y mantenimiento de aula tecnológica)
             ======================================================== */}
          <div className="flex flex-col h-full">
            <div className="group relative h-full min-h-[580px] sm:min-h-[640px] rounded-[24px] overflow-hidden border border-white/10 bg-[#0d0e14] hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col justify-start p-6 sm:p-8 pt-8 sm:pt-10">
              <img
                src="/assets/mithostech/aula.webp"
                alt="Infraestructura de aula tecnológica"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out pointer-events-none"
              />

              <div className="absolute inset-0 bg-gradient-to-b from-black/88 via-black/30 to-black/40 pointer-events-none" />

              {/* Header Superior sin etiqueta */}
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug">
                  <span className="font-['Montserrat',sans-serif] block">Soporte y mantenimiento</span>
                  <span className="block mt-1 font-['Montserrat',sans-serif]">
                    de aula{' '}
                    <span className="font-['DM_Serif_Display',serif] italic font-normal text-white">
                      tecnológica
                    </span>
                  </span>
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm text-slate-300 font-normal leading-relaxed max-w-sm">
                  Equipos, software y conectividad para un entorno de aprendizaje sin interrupciones.
                </p>
              </div>
            </div>
          </div>


          {/* ========================================================
              COLUMNA 3: Derecha (Tarjeta 4 4:3 + Tarjeta 5)
             ======================================================== */}
          <div className="flex flex-col gap-6 justify-between h-full">
            
            {/* TARJETA 4: RESULTADO · IE 2078 (4:3, sin línea ascendente, sin borde naranja) */}
            <div className="group relative aspect-[4/3] w-full rounded-[24px] overflow-hidden border border-black/30 bg-[#0d0604] hover:border-black/50 transition-all duration-500 shadow-2xl flex flex-col justify-between p-6 sm:p-8 shrink-0">
              <img
                src="/assets/mithostech/degradado.webp"
                alt="Degradado naranja de alta energía"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out pointer-events-none"
              />

              {/* Kicker superior sin contenedor */}
              <div className="relative z-10">
                <span className="text-[11px] font-['Montserrat',sans-serif] font-semibold tracking-wider uppercase text-white/90 block">
                  RESULTADO · IE 2078
                </span>
              </div>

              {/* Métrica estilizada en DM Serif Display limpia (sin línea curva) */}
              <div className="relative z-10 my-auto py-1">
                <div className="text-6xl sm:text-7xl font-['DM_Serif_Display',serif] font-normal tracking-tight text-white leading-none">
                  20%
                </div>
              </div>

              {/* Descripción limpia y nota inferior */}
              <div className="relative z-10">
                <p className="text-sm font-['Montserrat',sans-serif] font-normal text-white/95 leading-relaxed max-w-[280px]">
                  más de eficiencia de uso de los equipos, con una revisión semanal.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/90 font-['Montserrat',sans-serif] font-normal">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                  <span>Mantenimiento de equipos</span>
                </div>
              </div>
            </div>

            {/* TARJETA 5: Cerebros Brillantes (Imagen 1:1, sin etiqueta superior) */}
            <div className="group relative flex-1 min-h-[300px] w-full rounded-[24px] overflow-hidden border border-white/10 bg-[#0d0e14] hover:border-white/20 transition-all duration-500 shadow-2xl flex flex-col justify-end p-6 sm:p-8">
              <img
                src="/assets/mithostech/podcast.webp"
                alt="Set de audio y trofeo de Innovación Educativa"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out pointer-events-none"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Texto superpuesto en espacio negativo */}
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-['DM_Serif_Display',serif] font-normal text-white tracking-normal leading-tight">
                  Cerebros Brillantes
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-slate-300 font-medium">
                  Equipos, cableado y audio
                </p>
                <p className="mt-1.5 text-xs text-white/60 leading-relaxed font-normal">
                  Proyecto ganador del Concurso Nacional de Innovación Educativa.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
