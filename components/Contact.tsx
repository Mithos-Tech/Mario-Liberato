import { contact, site } from '../content';

export default function Contact() {
  return (
    <section className="s cta" id="contacto">
      <div className="wrap">
        <header className="section-header rv">
          <span className="kick">{contact.label}</span>
          <h2 className="section-title">
            <span className="subtitle-main">{contact.titlePrefix ?? contact.title}</span>
            {contact.titleSerif && <span className="subtitle-serif font-serif">{contact.titleSerif}</span>}
          </h2>
          <p className="section-phrase">{contact.text}</p>
        </header>
        <div className="btns rv" style={{ justifyContent: 'center', marginTop: 24, alignItems: 'center' }}>
          <a className="btn hot" href={`mailto:${site.email}`}>
            <span>Contáctame</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
          <a className="btn ghost" href={site.linkedin} target="_blank" rel="noopener noreferrer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span>LinkedIn</span>
          </a>
          <a className="btn ghost" href={site.cvUrl} download>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span>Descargar CV</span>
          </a>
        </div>
      </div>
    </section>
  );
}
