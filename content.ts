// ============================================================
//  TODO EL TEXTO DEL PORTAFOLIO VIVE AQUÍ.
//  Reemplaza lo que está entre [corchetes] con tus datos reales.
// ============================================================

const BASE = import.meta.env.BASE_URL;
// Variante de una sola página (vista previa): recursos incrustados en window.__A
type Inline = { frames?: string[]; mattes?: string[]; video?: string; poster?: string; final?: string };
const A = typeof window !== 'undefined' ? (window as unknown as { __A?: Inline }).__A : undefined;

export const assets = {
  frameCount: 72,
  word: 'LIBERATO', // texto gigante detrás del personaje
  frame: (i: number) => A?.frames?.[i] ?? `${BASE}hero/desktop/f_${String(i).padStart(3, '0')}.webp`,
  // recorte (alfa) del personaje, para que el texto quede DETRÁS de él
  matte: (i: number) => A?.mattes?.[i] ?? `${BASE}hero/desktop-matte/m_${String(i).padStart(3, '0')}.webp`,
  mobileVideo: (): string => {
    if (A?.video) { const b = atob(A.video), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return URL.createObjectURL(new Blob([u], { type: 'video/mp4' })); }
    return `${BASE}hero/mobile/hero-mobile-rise.mp4`;
  },
  mobilePoster: A?.poster ?? `${BASE}hero/mobile/hero-mobile-poster.webp`, // primer cuadro (antes de reproducir)
  mobileFinal: A?.final ?? `${BASE}hero/mobile/hero-mobile-final.webp`, // último cuadro (si se reduce el movimiento)
};

export const site = {
  brand: 'Liberato',
  logo: {
    orangeSvg: '/logo-orange.svg',
    whiteSvg: '/logo-white.svg',
    orangePng: '/logo-orange.png',
    whitePng: '/logo-white.png',
    ico: '/favicon.ico',
    cloudinary: {
      whitePng: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793038287/Logo_white_hdptom.png',
      whiteSvg: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793038287/Logo_white_uu9txr.svg',
      whiteIco: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793038288/Logo_white_x1fvlc.ico',
      orangeSvg: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793038287/Logo_orange_bvslky.svg',
      orangePng: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793038287/Logo_orange_xtn4js.png',
    },
  },
  email: 'Johans.liberatos@gmail.com',
  linkedin: 'https://www.linkedin.com/in/johansliberatos',
  cvUrl: `${BASE}cv/Mario-Liberato-CV.pdf`, // sube tu PDF a public/cv/
  footer: '© 2026 Mario J. Liberato. Lima, Perú.',
};

export const nav = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Sobre mí', href: '#sobre' },
  { label: 'Soporte', href: '#soporte' },
  { label: 'Studio', href: '#web' },
  { label: 'Labs', href: '#ia' },
  { label: 'Trayectoria', href: '#trayectoria' },
  { label: 'Certificaciones', href: '#certificaciones' },
];

export const hero = {
  eyebrow: 'Portafolio profesional',
  titleBase: 'Del servidor a la interfaz,',
  titleSerif: 'y ahora a la IA.',
  greeting: 'Hola, soy',
  name: 'Mario Liberato',
  intro:
    'Ingeniero de soporte de TI que construye y automatiza con IA.',
  rail: [
    { label: 'Soporte TI', sub: 'MithosTech', href: '#soporte', s: 0.3 },
    { label: 'Desarrollo web', sub: 'Inspyrio Studio', href: '#web', s: 0.42 },
    { label: 'Agentes de IA', sub: 'Inspyrio Labs', href: '#ia', s: 0.54 },
  ],
  stats: [
    { value: '3', label: 'marcas propias', s: 0.62 },
    { value: 'Remoto', label: 'desde Lima, Perú', s: 0.72 },
  ],
};

export interface AboutSpec {
  label: string;
  value: string;
}

export const about = {
  label: 'Sobre mí',
  title: {
    prefix: 'HOLA, SOY ',
    name: 'Mario',
  },
  headline: 'La tecnología solo vale cuando resuelve un problema real.',
  paragraphs: [
    'Soy Ingeniero de Soporte de TI (SENATI, titulado en 2025). Desde 2025 he ampliado mi perfil: primero hacia el desarrollo web y, más recientemente, hacia la automatización con IA.',
    'Mi recorrido va del servidor a la interfaz: empecé en infraestructura, redes y soporte, aprendí a construir con código y hoy automatizo la atención al cliente con inteligencia artificial. Aprendo de forma autodidacta y lo demuestro con proyectos propios y certificaciones verificables.',
    'Busco sumarme a un equipo o proyecto real donde seguir creciendo, con foco en la automatización por WhatsApp.',
  ],
  specs: [
    { label: 'UBICACIÓN', value: 'Los Olivos, Lima, Perú' },
    { label: 'DISPONIBILIDAD', value: 'Trabajo remoto' },
    { label: 'IDIOMAS', value: 'Español nativo · Inglés B1' },
    { label: 'FORMACIÓN', value: 'Ing. de Soporte de TI, SENATI' },
  ],
  media: {
    type: 'video' as const,
    videoUrl: 'https://res.cloudinary.com/chlgeobm/video/upload/v1793043217/about_x10yit.mp4',
    poster: '/about/about-poster.webp',
    alt: 'Mario Liberato — Fotocheck IT Support Engineer',
  },
  cv: {
    buttonLabel: 'Descargar CV',
  },
};

export type CardData = {
  title: string;
  items?: string[];
  tags?: string[];
  text?: string;
  pairs?: [string, string][];
  note?: string;
  button?: { label: string; href: string };
};
export type TileData = { title: string; text: string; tags: string[] };
export type BentoQueResuelvoItem = {
  title: string;
  desc: string;
};

export type SupportBentoData = {
  queResuelvo: {
    title: string;
    items: BentoQueResuelvoItem[];
    footnote?: string;
  };
  metric: {
    stat: string;
    desc: string;
  };
  colaboracion: {
    tag: string;
    title: string;
    desc: string;
  };
  cableado: {
    tag: string;
    title: string;
    desc: string;
  };
  reparacion: {
    tag: string;
    title: string;
    bullets: string[];
  };
};

export type StudioProjectItem = {
  title: string;
  category: string;
  image: string;
  href: string;
};

export type BrandSectionData = {
  id: string;
  label: string;
  title: string;
  titlePrefix?: string;
  titleSerif?: string;
  lead: string;
  headButton?: { label: string; href: string };
  cards?: CardData[];
  tiles?: TileData[];
  bento?: SupportBentoData;
  projects?: StudioProjectItem[];
};

export const support: BrandSectionData = {
  id: 'soporte',
  label: 'MithosTech',
  title: 'Soporte TI',
  titlePrefix: 'Soporte ',
  titleSerif: 'TI',
  lead: 'Diagnóstico y resolución de problemas de equipos, sistemas y redes, con atención clara al usuario.',
  bento: {
    queResuelvo: {
      title: 'Qué resuelvo',
      items: [
        {
          title: 'Mantenimiento de equipos',
          desc: 'Hardware y software en laboratorios de cómputo; recuperación de datos.',
        },
        {
          title: 'Instalación y depuración',
          desc: 'Windows 10/11, programas y controladores.',
        },
        {
          title: 'Redes y cableado',
          desc: 'LAN, TCP/IP, DNS, DHCP y cableado estructurado Cat 5e.',
        },
        {
          title: 'Servidores y sistemas',
          desc: 'Windows Server, Active Directory y Linux (Ubuntu, Red Hat, Kali), en laboratorio.',
        },
        {
          title: 'Seguridad básica',
          desc: 'Fundamentos de ciberseguridad (Cisco, IBM) y VPN en laboratorio.',
        },
        {
          title: 'Procesos',
          desc: 'Fundamentos de ITIL (curso) y documentación técnica.',
        },
      ],
      footnote: 'Laboratorio: práctica en entorno académico o virtualizado.',
    },
    metric: {
      stat: '+20%',
      desc: 'de eficiencia de uso de los equipos, gracias a un sistema de revisión semanal que implementé en la IE 2078.',
    },
    colaboracion: {
      tag: 'Colaboración',
      title: 'Cerebros Brillantes',
      desc: 'Apoyé la implementación técnica de este proyecto de la institución para niños de 4.° a 6.° de primaria: equipos y cableado del aula, y edición de audio y video. El proyecto ganó el Concurso Nacional de Innovación Educativa 2023.',
    },
    cableado: {
      tag: 'Proyecto',
      title: 'Cableado estructurado Cat 5e',
      desc: 'Participé en la planificación e implementación del nuevo cableado de la institución, en reemplazo del antiguo, para las áreas administrativas, de CTA y de cómputo. Forma parte de mi tesis de titulación.',
    },
    reparacion: {
      tag: 'Casos prácticos',
      title: 'Reparación y recuperación',
      bullets: [
        'Repotenciación de una All-in-One HP (2018): SSD y controladores de video.',
        'Recuperación de fotos de un USB con virus (TestDisk y PhotoRec), para un tercero.',
      ],
    },
  },
};

export const studio: BrandSectionData = {
  id: 'web',
  label: 'Inspyrio Studio',
  title: 'Diseño Web',
  titlePrefix: 'Diseño ',
  titleSerif: 'Web',
  lead: 'Sitios y aplicaciones responsivas, desde landing pages hasta sistemas con base de datos.',
  projects: [
    {
      title: 'Zyvara',
      category: 'Espacios exclusivos',
      image: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793130124/Zyvara_ql83st.webp',
      href: 'https://zyvara-venues.vercel.app/',
    },
    {
      title: 'Luvox',
      category: 'Clínica veterinaria',
      image: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793130124/Luvox_jkzn0c.webp',
      href: 'https://luvox-vet.vercel.app/',
    },
    {
      title: 'Bloom',
      category: 'Estudio creativo',
      image: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793130124/Bloom_z6t6gh.webp',
      href: 'https://bloom-studio-v1.vercel.app/',
    },
  ],
};

export const labs: BrandSectionData = {
  id: 'ia',
  label: 'Inspyrio Labs',
  title: 'Agentes de IA',
  titlePrefix: 'Agentes de ',
  titleSerif: 'IA',
  lead: 'Chatbots y flujos que atienden consultas y capturan clientes potenciales para pymes.',
  cards: [
    { title: '[Nombre del demo de agente]', pairs: [['Problema:', '[…]'], ['Solución:', '[…]']] },
    { title: 'Estado', text: 'Demo funcional en desarrollo, aún sin clientes en producción.', button: { label: 'Probar demo →', href: '#' } },
    { title: 'Tecnologías', tags: ['[n8n]', '[Vapi]', '[APIs de IA]'] },
  ],
};

export interface TimelineMilestone {
  when: string;
  badge: string;
  title: string;
  role: string;
  text: string;
  tags: string[];
}

export const trajectory = {
  id: 'trayectoria',
  label: 'Trayectoria',
  title: 'Mi Trayectoria',
  titlePrefix: 'Mi ',
  titleSerif: 'trayectoria',
  lead: 'Un recorrido continuo de aprendizaje autodidacta, práctica técnica real y evolución tecnológica.',
  timeline: [
    {
      when: 'Hoy',
      badge: 'Enfoque actual',
      title: 'Automatización con IA',
      role: 'Inspyrio Labs',
      text: 'Chatbots y agentes de voz para soporte y captación de clientes con Gemini, n8n y Vapi.',
      tags: ['Gemini', 'n8n', 'Vapi', 'Make', 'Agentes'],
    },
    {
      when: '2025',
      badge: 'Expansión web',
      title: 'Desarrollo web con IA',
      role: 'Inspyrio Studio',
      text: 'Sitios y aplicaciones web full-stack responsivas con React, TypeScript y Supabase.',
      tags: ['React', 'TypeScript', 'Supabase', 'Tailwind'],
    },
    {
      when: '2023–2024',
      badge: 'Premio nacional',
      title: 'Soporte técnico y redes',
      role: 'Prácticas en IE 2078',
      text: 'Mantenimiento de laboratorios y despliegue Cat 5e. Ganador del Concurso Nacional de Innovación 2023.',
      tags: ['Cableado Cat 5e', 'Hardware', 'Help Desk', 'Innovación'],
    },
    {
      when: '2022–2025',
      badge: 'Formación profesional',
      title: 'Ingeniería de Soporte de TI',
      role: 'SENATI, Lima',
      text: 'Infraestructura de TI, redes informáticas, servidores Windows/Linux y soporte técnico. Titulado en 2025.',
      tags: ['SENATI', 'Infraestructura', 'Sistemas', 'Redes'],
    },
  ],
};

export interface CertificationItem {
  issuer: string;
  logoUrl: string;
  mono?: string;
  area: string;
  title: string;
  meta: string;
  validity: string;
  badge: string;
  href: string;
}

export const certifications = {
  id: 'certificaciones',
  label: 'Credenciales',
  title: 'Certificaciones Técnicas',
  titlePrefix: 'Certificaciones ',
  titleSerif: 'técnicas',
  lead: 'Acreditaciones oficiales verificables emitidas por las principales instituciones tecnológicas.',
  // Ordenadas cronológicamente desde la más reciente (2026) hasta la antigua (2020)
  items: [
    {
      issuer: 'Claude Academy',
      logoUrl: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793066761/claude-icon-logo_xgycdw.svg',
      mono: 'A',
      area: 'Inteligencia Artificial',
      title: 'Building with the Claude API',
      meta: '2026',
      validity: 'Credencial activa',
      badge: 'Reciente',
      href: 'https://academy.claude.com/verify/d73ffb2a014761582b8a0c635bb52405',
    },
    {
      issuer: 'Oracle',
      logoUrl: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793066761/oracle-icon-logo_yxqyew.svg',
      mono: 'O',
      area: 'Cloud Computing',
      title: 'OCI 2025 Certified Foundations Associate',
      meta: '2025',
      validity: 'Vigente hasta jun. 2027',
      badge: 'Oficial',
      href: 'https://catalog-education.oracle.com/ords/certview/sharebadge?id=64DC930692D0D41F1688883E9577B0933BB1CA942CD800F5B3E14AF00323DD28',
    },
    {
      issuer: 'Cisco Networking Academy',
      logoUrl: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793066761/cisco-2_mely9b.svg',
      mono: 'C',
      area: 'Redes y Conectividad',
      title: 'Network Technician Career Path',
      meta: '2025',
      validity: 'Insignia nivel estudiante',
      badge: 'Oficial',
      href: 'https://www.credly.com/badges/4b6087b6-5ead-42b9-bd58-b8ae683a4bfb',
    },
    {
      issuer: 'Fundación Carlos Slim',
      logoUrl: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793066761/capacitate-fundacion-carlos-slim_1_i0jwsq.svg',
      mono: 'FCS',
      area: 'Infraestructura y Redes',
      title: 'Técnico en Redes de Datos y Cableado Estructurado',
      meta: '2023',
      validity: 'Certificado con folio digital',
      badge: 'Oficial',
      href: 'https://capacitateparaelempleo.org/verifica/9aeec285-6030-4d38-9d00-f123a4f8c64f/53093c4d-1975-4da3-aa4c-5ccc13773ca7',
    },
    {
      issuer: 'LinkedIn Learning',
      logoUrl: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793067212/linkedin-learning-seeklogo_z3douf.svg',
      mono: 'in',
      area: 'Soporte TI e ITIL',
      title: 'Conviértete en especialista en soporte IT',
      meta: '2020',
      validity: 'Itinerario formativo · 15h 13m',
      badge: 'Especialista',
      href: 'https://collection.cloudinary.com/chlgeobm/aa8c71f0d07e23ec95594f78bb3ca67e',
    },
    {
      issuer: 'Google · Coursera',
      logoUrl: 'https://res.cloudinary.com/chlgeobm/image/upload/v1793066761/google-logo_w53csh.svg',
      mono: 'G',
      area: 'Soporte Técnico de TI',
      title: 'Google IT Support Professional Certificate',
      meta: '2020',
      validity: 'Certificado profesional Coursera',
      badge: 'Base técnica',
      href: 'https://coursera.org/verify/professional-cert/LSA3N55PATH9',
    },
  ],
  certNote: 'Selección de las credenciales más destacadas; el historial completo está detallado en mi CV y LinkedIn.',
};

// Compatibilidad
export const journey = trajectory;

export const contact = {
  label: 'Contacto',
  title: 'Trabajemos juntos',
  titlePrefix: 'Trabajemos ',
  titleSerif: 'juntos',
  text: 'Busco un puesto remoto en soporte TI, desarrollo web o automatización con IA.',
};
