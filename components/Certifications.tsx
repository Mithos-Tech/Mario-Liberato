import { certifications } from '../content';

export default function Certifications() {
  return (
    <section className="s certs-sec" id={certifications.id}>
      <div className="wrap">
        <header className="section-header section-header-split rv">
          <div className="section-header-left">
            <span className="kick">{certifications.label}</span>
            <h2 className="section-title">
              <span className="subtitle-main">{certifications.titlePrefix ?? certifications.title}</span>
              {certifications.titleSerif && <span className="subtitle-serif font-serif">{certifications.titleSerif}</span>}
            </h2>
          </div>
          <div className="section-header-right">
            <p className="section-phrase">{certifications.lead}</p>
          </div>
        </header>

        {/* Retícula de tarjetas de certificaciones estilo Framer (Opción 1: Bento 3x2 con pedestal de logo) */}
        <div className="certs-grid">
          {certifications.items.map((cert) => (
            <div key={cert.title} className="cert-card rv">
              <div className="cert-card-shine" aria-hidden="true" />

              <div className="cert-top-row">
                <div className="cert-issuer-group">
                  <div className="cert-logo-pedestal" title={cert.issuer}>
                    <img
                      src={cert.logoUrl}
                      alt={`Logo de ${cert.issuer}`}
                      className="cert-logo-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="cert-issuer-info">
                    <span className="cert-issuer-name">{cert.issuer}</span>
                    <span className="cert-date-val">{cert.meta}</span>
                  </div>
                </div>
                <span className="cert-status-badge">{cert.badge}</span>
              </div>

              <span className="cert-area-pill">{cert.area}</span>

              <h3 className="cert-title">{cert.title}</h3>

              <div className="cert-bottom-row">
                <span className="cert-validity">{cert.validity}</span>
                <a
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-btn"
                  title={`Verificar credencial oficial de ${cert.title}`}
                >
                  <span>Verificar</span>
                  <span className="cert-arrow" aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {certifications.certNote && (
          <p className="certs-footnote rv">{certifications.certNote}</p>
        )}
      </div>
    </section>
  );
}
