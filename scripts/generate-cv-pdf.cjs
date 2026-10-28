const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');

async function createCV() {
  const pdfDoc = await PDFDocument.create();

  // Load Standard Fonts
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helveticaOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Colors
  const darkColor = rgb(0.12, 0.12, 0.14);
  const lightMuted = rgb(0.45, 0.45, 0.48);
  const lineRuleColor = rgb(0.78, 0.78, 0.82);

  const pageWidth = 595.28; // A4 standard width (pt)
  const pageHeight = 841.89; // A4 standard height (pt)
  const marginX = 54;
  const contentWidth = pageWidth - marginX * 2;

  // Helper to wrap text
  function wrapText(text, font, size, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    for (const word of words) {
      const testLine = currentLine ? `${currentLine} ${word}` : word;
      const testWidth = font.widthOfTextAtSize(testLine, size);
      if (testWidth <= maxWidth) {
        currentLine = testLine;
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  // Helper to draw section header with divider line
  function drawSectionHeader(page, title, y) {
    page.drawText(title, {
      x: marginX,
      y: y,
      size: 10.5,
      font: helveticaBold,
      color: darkColor,
    });
    const headerWidth = helveticaBold.widthOfTextAtSize(title, 10.5);
    page.drawLine({
      start: { x: marginX, y: y - 4 },
      end: { x: pageWidth - marginX, y: y - 4 },
      thickness: 0.75,
      color: lineRuleColor,
    });
    return y - 18;
  }

  // =================== PAGE 1 ===================
  const page1 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y = pageHeight - 52;

  // Header Title: MARIO J. LIBERATO
  const title = "M A R I O   J .   L I B E R A T O";
  const titleWidth = helveticaBold.widthOfTextAtSize(title, 16);
  page1.drawText(title, {
    x: (pageWidth - titleWidth) / 2,
    y: y,
    size: 16,
    font: helveticaBold,
    color: darkColor,
  });
  y -= 18;

  // Subtitle
  const subtitle = "SOPORTE DE TI  |  AUTOMATIZACIÓN CON IA  |  DESARROLLO WEB";
  const subWidth = helvetica.widthOfTextAtSize(subtitle, 9);
  page1.drawText(subtitle, {
    x: (pageWidth - subWidth) / 2,
    y: y,
    size: 9,
    font: helvetica,
    color: lightMuted,
  });
  y -= 14;

  // Contact line 1
  const contact1 = "Lima, Perú  •  johans.liberatos@gmail.com";
  const c1Width = helvetica.widthOfTextAtSize(contact1, 9);
  page1.drawText(contact1, {
    x: (pageWidth - c1Width) / 2,
    y: y,
    size: 9,
    font: helvetica,
    color: darkColor,
  });
  y -= 13;

  // Contact line 2
  const contact2 = "linkedin.com/in/johansliberatos  •  marioliberato-portfolio.vercel.app";
  const c2Width = helvetica.widthOfTextAtSize(contact2, 9);
  page1.drawText(contact2, {
    x: (pageWidth - c2Width) / 2,
    y: y,
    size: 9,
    font: helvetica,
    color: darkColor,
  });
  y -= 26;

  // Section: RESUMEN PROFESIONAL
  y = drawSectionHeader(page1, "R E S U M E N   P R O F E S I O N A L", y);
  const summaryText = "Profesional titulado en Ingeniería de Soporte de TI (SENATI, 2025) que busca su primera posición en soporte técnico, desarrollo web o automatización con IA, presencial o remota. Cuenta con experiencia práctica en laboratorios de cómputo y cableado estructurado, formación en redes, ciberseguridad y fundamentos de ITIL, y proyectos de portafolio en desarrollo web y automatización. Más de cinco años de trabajo previo en la industria alimentaria y papelera.";
  const summaryLines = wrapText(summaryText, helvetica, 9, contentWidth);
  for (const line of summaryLines) {
    page1.drawText(line, { x: marginX, y: y, size: 9, font: helvetica, color: darkColor });
    y -= 13.5;
  }
  y -= 12;

  // Section: HABILIDADES
  y = drawSectionHeader(page1, "H A B I L I D A D E S", y);
  const skillCategories = [
    {
      label: "Soporte y redes: ",
      text: "Mantenimiento de hardware | Windows 10/11 | Windows Server y Active Directory (laboratorio) | Linux: Ubuntu, Red Hat (laboratorio) | LAN, TCP/IP, DNS, DHCP (laboratorio) | Cableado Cat 5e | Recuperación de datos"
    },
    {
      label: "Desarrollo web: ",
      text: "React, TypeScript, Tailwind CSS | Supabase | GitHub, Vercel, Cloudflare Pages | Figma | Diseño responsivo"
    },
    {
      label: "Automatización con IA: ",
      text: "Gemini API | n8n, Make | Chatbots y agentes de voz (Vapi) | Python básico"
    },
    {
      label: "Seguridad y gestión: ",
      text: "Ciberseguridad básica | Fundamentos de ITIL (curso) | Microsoft 365 (nivel usuario) | Excel y Power BI (curso)"
    },
    {
      label: "Aclaración: ",
      text: "Desarrollo web y automatización con IA: nivel de portafolio. (laboratorio): práctica en entorno académico o virtualizado.",
      isItalic: true
    }
  ];

  for (const skill of skillCategories) {
    const fullText = skill.label + skill.text;
    const lines = wrapText(fullText, helvetica, 9, contentWidth);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (i === 0) {
        // Draw label in bold
        page1.drawText(skill.label, {
          x: marginX,
          y: y,
          size: 9,
          font: skill.isItalic ? helveticaOblique : helveticaBold,
          color: darkColor
        });
        const labelWidth = (skill.isItalic ? helveticaOblique : helveticaBold).widthOfTextAtSize(skill.label, 9);
        const restOfFirstLine = line.slice(skill.label.length);
        page1.drawText(restOfFirstLine, {
          x: marginX + labelWidth,
          y: y,
          size: 9,
          font: skill.isItalic ? helveticaOblique : helvetica,
          color: darkColor
        });
      } else {
        page1.drawText(line, {
          x: marginX,
          y: y,
          size: 9,
          font: skill.isItalic ? helveticaOblique : helvetica,
          color: darkColor
        });
      }
      y -= 13;
    }
    y -= 3;
  }
  y -= 10;

  // Section: EXPERIENCIA LABORAL
  y = drawSectionHeader(page1, "E X P E R I E N C I A   L A B O R A L", y);

  // Job 1: Practicante de Soporte Técnico Educativo
  const job1Title = "Practicante de Soporte Técnico Educativo | IE 2078 “Nuestra Señora de Lourdes”";
  const job1Date = "2023 – 2024";
  page1.drawText(job1Title, { x: marginX, y: y, size: 9.5, font: helveticaBold, color: darkColor });
  const job1DateWidth = helvetica.widthOfTextAtSize(job1Date, 9.5);
  page1.drawText(job1Date, { x: pageWidth - marginX - job1DateWidth, y: y, size: 9.5, font: helvetica, color: lightMuted });
  y -= 15;

  const job1Bullets = [
    "Mantenimiento y supervisión de equipos y programas en laboratorios de cómputo; instalación y depuración de software.",
    "Sistema de revisión semanal de equipos que mejoró la eficiencia de uso en un 20 %.",
    "Planificación e implementación de cableado estructurado Cat 5e para áreas administrativas y educativas.",
    "Participación en “Cerebros Brillantes”, proyecto ganador del Concurso Nacional de Innovación Educativa 2023 (cableado, equipos y apoyo técnico)."
  ];

  for (const bullet of job1Bullets) {
    page1.drawText("•", { x: marginX + 6, y: y, size: 9, font: helvetica, color: darkColor });
    const bLines = wrapText(bullet, helvetica, 9, contentWidth - 18);
    for (let bi = 0; bi < bLines.length; bi++) {
      page1.drawText(bLines[bi], { x: marginX + 18, y: y, size: 9, font: helvetica, color: darkColor });
      y -= 13.5;
    }
    y -= 1.5;
  }
  y -= 8;

  // Job 2: Operario de Máquina
  const job2Title = "Operario de Máquina | Ajinomoto del Perú, Kimberly Clark, Softys";
  const job2Date = "2014 – 2019";
  page1.drawText(job2Title, { x: marginX, y: y, size: 9.5, font: helveticaBold, color: darkColor });
  const job2DateWidth = helvetica.widthOfTextAtSize(job2Date, 9.5);
  page1.drawText(job2Date, { x: pageWidth - marginX - job2DateWidth, y: y, size: 9.5, font: helvetica, color: lightMuted });
  y -= 15;

  const job2Bullet = "Línea de producción en industria alimentaria y papelera, con normas de calidad y seguridad.";
  page1.drawText("•", { x: marginX + 6, y: y, size: 9, font: helvetica, color: darkColor });
  const j2Lines = wrapText(job2Bullet, helvetica, 9, contentWidth - 18);
  for (const l of j2Lines) {
    page1.drawText(l, { x: marginX + 18, y: y, size: 9, font: helvetica, color: darkColor });
    y -= 13.5;
  }
  y -= 14;

  // Section: EDUCACIÓN
  y = drawSectionHeader(page1, "E D U C A C I Ó N", y);
  const eduTitle = "Ingeniería de Soporte de TI | SENATI, Independencia, Lima";
  const eduDate = "2022 – 2024";
  page1.drawText(eduTitle, { x: marginX, y: y, size: 9.5, font: helveticaBold, color: darkColor });
  const eduDateWidth = helvetica.widthOfTextAtSize(eduDate, 9.5);
  page1.drawText(eduDate, { x: pageWidth - marginX - eduDateWidth, y: y, size: 9.5, font: helvetica, color: lightMuted });

  // =================== PAGE 2 ===================
  const page2 = pdfDoc.addPage([pageWidth, pageHeight]);
  let y2 = pageHeight - 52;

  // Section: PROYECTOS
  y2 = drawSectionHeader(page2, "P R O Y E C T O S", y2);

  // Group 1: Soporte técnico
  page2.drawText("Soporte técnico ", { x: marginX, y: y2, size: 9.5, font: helveticaBold, color: darkColor });
  const stWidth = helveticaBold.widthOfTextAtSize("Soporte técnico ", 9.5);
  page2.drawText("(casos prácticos)", { x: marginX + stWidth, y: y2, size: 9, font: helveticaOblique, color: lightMuted });
  y2 -= 14;

  const stBullets = [
    "Repotenciación de una All-in-One HP propia (2018): limpieza, SSD y otros componentes; solución de apagones con actualización de controladores de video.",
    "Recuperación de fotos eliminadas de un USB afectado por un virus, con TestDisk y PhotoRec."
  ];
  for (const b of stBullets) {
    page2.drawText("•", { x: marginX + 6, y: y2, size: 9, font: helvetica, color: darkColor });
    const bLines = wrapText(b, helvetica, 9, contentWidth - 18);
    for (const l of bLines) {
      page2.drawText(l, { x: marginX + 18, y: y2, size: 9, font: helvetica, color: darkColor });
      y2 -= 13;
    }
    y2 -= 2;
  }
  y2 -= 6;

  // Group 2: Desarrollo web
  page2.drawText("Desarrollo web ", { x: marginX, y: y2, size: 9.5, font: helveticaBold, color: darkColor });
  const dwWidth = helveticaBold.widthOfTextAtSize("Desarrollo web ", 9.5);
  page2.drawText("(demos de portafolio)", { x: marginX + dwWidth, y: y2, size: 9, font: helveticaOblique, color: lightMuted });
  y2 -= 14;

  const dwBullets = [
    "Centrix: gestión institucional con 12 tablas relacionales, 26 políticas de seguridad (RLS), autenticación y auditoría.",
    "Fixtera: sistema de tickets con clasificación automática por IA (Gemini) y base de datos en Supabase."
  ];
  for (const b of dwBullets) {
    page2.drawText("•", { x: marginX + 6, y: y2, size: 9, font: helvetica, color: darkColor });
    const bLines = wrapText(b, helvetica, 9, contentWidth - 18);
    for (const l of bLines) {
      page2.drawText(l, { x: marginX + 18, y: y2, size: 9, font: helvetica, color: darkColor });
      y2 -= 13;
    }
    y2 -= 2;
  }
  y2 -= 6;

  // Group 3: Automatización con IA
  page2.drawText("Automatización con IA ", { x: marginX, y: y2, size: 9.5, font: helveticaBold, color: darkColor });
  const iaWidth = helveticaBold.widthOfTextAtSize("Automatización con IA ", 9.5);
  page2.drawText("(demos de portafolio)", { x: marginX + iaWidth, y: y2, size: 9, font: helveticaOblique, color: lightMuted });
  y2 -= 14;

  const iaBullets = [
    "Spax & Kraft: chatbot con IA generativa y agente de voz en español (Vapi) para captación de leads.",
    "Borgo: automatización para calificar y enrutar leads inmobiliarios (Typebot y Make)."
  ];
  for (const b of iaBullets) {
    page2.drawText("•", { x: marginX + 6, y: y2, size: 9, font: helvetica, color: darkColor });
    const bLines = wrapText(b, helvetica, 9, contentWidth - 18);
    for (const l of bLines) {
      page2.drawText(l, { x: marginX + 18, y: y2, size: 9, font: helvetica, color: darkColor });
      y2 -= 13;
    }
    y2 -= 2;
  }
  y2 -= 12;

  // Section: CERTIFICACIONES Y CURSOS
  y2 = drawSectionHeader(page2, "C E R T I F I C A C I O N E S   Y   C U R S O S", y2);

  const certItems = [
    { title: "Building with the Claude API", issuer: "Claude Academy, Anthropic", year: "2026" },
    { title: "OCI Foundations Associate", issuer: "Oracle University", year: "2025" },
    {
      title: "Carrera Profesional de Técnico en Redes",
      issuer: "Cisco Networking Academy",
      year: "2025",
      subtext: "Incluye IT Essentials, Networking Essentials, CCNA v7: Introduction to Networks, Cybersecurity Essentials, Python y C++."
    },
    { title: "Fundamentos de Administración de Sistemas", issuer: "Microsoft y LinkedIn Learning", year: "2025" },
    { title: "Fundamentos de ciberseguridad", issuer: "IBM iX", year: "2023" },
    { title: "Certificado Profesional de Google IT Support", issuer: "Google, Coursera", year: "2020" },
    { title: "Especialista en soporte IT: ITIL, Windows 10, Office 365, Intune", issuer: "LinkedIn Learning", year: "2020" },
    { title: "Excel y Power BI: Análisis y Visualización de Datos", issuer: "Udemy", year: "2020" }
  ];

  for (const c of certItems) {
    const leftText = `${c.title} | ${c.issuer}`;
    const yearWidth = helvetica.widthOfTextAtSize(c.year, 9);

    // Check if left text fits
    const maxLeftWidth = contentWidth - yearWidth - 12;
    if (helveticaBold.widthOfTextAtSize(leftText, 9) <= maxLeftWidth) {
      // Bold title + normal issuer
      page2.drawText(c.title + " | ", { x: marginX, y: y2, size: 9, font: helveticaBold, color: darkColor });
      const tWidth = helveticaBold.widthOfTextAtSize(c.title + " | ", 9);
      page2.drawText(c.issuer, { x: marginX + tWidth, y: y2, size: 9, font: helvetica, color: darkColor });
      page2.drawText(c.year, { x: pageWidth - marginX - yearWidth, y: y2, size: 9, font: helvetica, color: lightMuted });
      y2 -= 13;
    } else {
      // Wrap
      const titleLines = wrapText(leftText, helvetica, 9, maxLeftWidth);
      for (let ti = 0; ti < titleLines.length; ti++) {
        page2.drawText(titleLines[ti], { x: marginX, y: y2, size: 9, font: ti === 0 ? helveticaBold : helvetica, color: darkColor });
        if (ti === 0) {
          page2.drawText(c.year, { x: pageWidth - marginX - yearWidth, y: y2, size: 9, font: helvetica, color: lightMuted });
        }
        y2 -= 13;
      }
    }

    if (c.subtext) {
      const subLines = wrapText(c.subtext, helveticaOblique, 8.5, contentWidth);
      for (const sl of subLines) {
        page2.drawText(sl, { x: marginX, y: y2, size: 8.5, font: helveticaOblique, color: lightMuted });
        y2 -= 12;
      }
    }
    y2 -= 3;
  }
  y2 -= 10;

  // Section: IDIOMAS
  y2 = drawSectionHeader(page2, "I D I O M A S", y2);
  const idiomasText = "Español (nativo) | Inglés técnico (B1, nivel exigido para la titulación en SENATI)";
  page2.drawText(idiomasText, { x: marginX, y: y2, size: 9, font: helvetica, color: darkColor });

  // Save PDF
  const pdfBytes = await pdfDoc.save();
  const outPath = path.resolve(__dirname, '../public/cv/Mario-Liberato-CV.pdf');
  fs.writeFileSync(outPath, pdfBytes);
  console.log(`Saved CV to ${outPath} (${pdfBytes.length} bytes)`);
}

createCV().catch(err => {
  console.error("Error creating CV:", err);
  process.exit(1);
});
