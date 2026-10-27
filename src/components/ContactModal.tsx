import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Landing Page Framer',
    budget: '$3,000 - $6,000',
    message: '',
  });

  const projectTypes = [
    'Landing Page Framer',
    'Aplicación Web React',
    'Sistema de Diseño UI/UX',
    'Optimización & Rediseño',
  ];

  const budgets = [
    '$1,500 - $3,000',
    '$3,000 - $6,000',
    '$6,000 - $12,000',
    '+$12,000',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Landing Page Framer',
      budget: '$3,000 - $6,000',
      message: '',
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      {/* Modal Dialog */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 sm:p-8 z-10 overflow-hidden"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">¡Mensaje Enviado con Éxito!</h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Hemos recibido tu propuesta para <strong>{formData.projectType}</strong>. Nos pondremos en contacto contigo en menos de 24 horas hábiles.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={handleReset}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Volver al sitio
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                Contacto Directo
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                Hablemos de tu próximo proyecto
              </h2>
              <p className="mt-1 text-xs text-slate-600">
                Completa el formulario y te enviaremos una estimación técnica y propuesta de diseño.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tu nombre"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tu@empresa.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tipo de proyecto
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, projectType: type })}
                      className={`px-2.5 py-1.5 text-xs text-left rounded-lg border transition-colors cursor-pointer ${
                        formData.projectType === type
                          ? 'border-slate-900 bg-slate-900 text-white font-medium'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Rango presupuestario
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {budgets.map((b) => (
                    <button
                      key={b}
                      type="button"
                      onClick={() => setFormData({ ...formData, budget: b })}
                      className={`px-2 py-1.5 text-[11px] font-mono tabular-nums text-center rounded-lg border transition-colors cursor-pointer ${
                        formData.budget === b
                          ? 'border-slate-900 bg-slate-900 text-white font-semibold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Detalles o visión del proyecto
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe tus metas, plazos o referencias de diseño..."
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-white bg-slate-900 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <span>Enviar Consulta de Proyecto</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};
