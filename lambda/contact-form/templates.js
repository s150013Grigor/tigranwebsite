/**
 * E-mail templates voor Tigran Media contactformulier
 * Huisstijl: donker thema, goud accent (#c8a96e), responsive
 */

// ─── Project type definities ───

const projectTypes = {
  website: {
    label: 'Website Fotografie',
    workflow: [
      'Intake — We bespreken je merk, doelgroep en de pagina\u2019s waarvoor beelden nodig zijn.',
      'Moodboard — Ik stel een visueel concept samen op basis van je huisstijl.',
      'Fotoshoot — Professionele shoot op locatie of in de studio.',
      'Nabewerking — Elke foto wordt individueel bewerkt naar je brandkleuren en stijl.',
      'Levering — Hoge resolutie bestanden, geoptimaliseerd voor web \xe9n print.',
    ],
    portfolioUrl: 'https://www.tigranmedia.be/portfolio/',
    portfolioLabel: 'Bekijk website fotografie voorbeelden',
  },
  'social-media': {
    label: 'Social Media Content',
    workflow: [
      'Contentstrategie — We bepalen samen welke beelden je nodig hebt per platform.',
      'Batchshoot — Effici\xebnte fotosessie voor meerdere weken aan content.',
      'Nabewerking — Consistente stijl, passend bij je Instagram- en LinkedIn-branding.',
      'Levering — Bestanden in de juiste formaten en afmetingen per platform.',
      'Optioneel — Maandelijks terugkerende content shoots voor continu verse content.',
    ],
    portfolioUrl: 'https://www.tigranmedia.be/portfolio/',
    portfolioLabel: 'Bekijk social media content voorbeelden',
  },
  branding: {
    label: 'Branding & Rebranding',
    workflow: [
      'Merkintake — Diepgaand gesprek over je merk, waarden en gewenste positionering.',
      'Moodboard & Art Direction — Visuele richting die past bij je (nieuwe) merkidentiteit.',
      'Uitgebreide shoot — Portretten, sfeerbeelden, producten en werkomgeving.',
      'Nabewerking — Volledige beeldbank afgestemd op je brandguide.',
      'Levering — Alle bestanden + een beeldbibliotheek geordend per toepassing.',
    ],
    portfolioUrl: 'https://www.tigranmedia.be/portfolio/',
    portfolioLabel: 'Bekijk branding fotografie voorbeelden',
  },
  anders: {
    label: 'Op maat',
    workflow: [
      'Intake — We bespreken je wensen en idee\xebn in een vrijblijvend gesprek.',
      'Voorstel — Ik werk een plan uit op basis van je specifieke behoeften.',
      'Fotoshoot — Professionele shoot volgens het afgesproken concept.',
      'Nabewerking — Elke foto wordt zorgvuldig bewerkt.',
      'Levering — Bestanden in hoge resolutie via een beveiligde online galerij.',
    ],
    portfolioUrl: 'https://www.tigranmedia.be/portfolio/',
    portfolioLabel: 'Bekijk onze portfolio',
  },
};

function getProjectTypeInfo(service) {
  return projectTypes[service] || projectTypes.anders;
}

// ─── Email base wrapper ───

function emailBase(content) {
  return `<!DOCTYPE html>
<html lang="nl" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Tigran Media</title>
</head>
<body style="margin:0;padding:0;background-color:#050505;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#050505;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0a0a0a;border:1px solid rgba(255,255,255,0.06);">
          <tr>
            <td style="padding:32px 40px 24px;border-bottom:1px solid rgba(200,169,110,0.25);text-align:center;">
              <h1 style="margin:0;font-size:26px;font-weight:700;letter-spacing:4px;color:#ffffff;">TIGRAN <span style="color:#c8a96e;font-size:14px;font-weight:400;letter-spacing:6px;vertical-align:middle;">MEDIA</span></h1>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">
              ${content}
            </td>
          </tr>
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
              <p style="margin:0 0 6px;font-size:13px;color:#888888;">Tigran Media — Content & Branding Fotografie</p>
              <p style="margin:0 0 12px;font-size:12px;color:#555555;">info@tigranmedia.be &nbsp;|&nbsp; +32 474 11 48 99</p>
              <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;">
                <tr>
                  <td style="padding:0 8px;"><a href="https://www.instagram.com/tigran.media/" style="color:#c8a96e;font-size:12px;text-decoration:none;">Instagram</a></td>
                  <td style="padding:0 8px;"><a href="https://www.linkedin.com/in/tigran-khachatryan-01b67a361/" style="color:#c8a96e;font-size:12px;text-decoration:none;">LinkedIn</a></td>
                  <td style="padding:0 8px;"><a href="https://www.tigranmedia.be" style="color:#c8a96e;font-size:12px;text-decoration:none;">Website</a></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ─── Client auto-reply (gepersonaliseerd per projecttype) ───

function buildClientAutoReply(data) {
  const info = getProjectTypeInfo(data.service);

  const workflowHtml = info.workflow
    .map(
      (step, i) => `
      <tr>
        <td style="padding:8px 12px 8px 0;vertical-align:top;color:#c8a96e;font-size:14px;font-weight:700;width:28px;">${String(i + 1).padStart(2, '0')}</td>
        <td style="padding:8px 0;color:#cccccc;font-size:14px;line-height:1.6;">${step}</td>
      </tr>`
    )
    .join('');

  const content = `
    <h2 style="margin:0 0 8px;font-size:20px;color:#ffffff;font-weight:600;">Beste ${data.name},</h2>
    <p style="margin:0 0 24px;font-size:15px;color:#aaaaaa;line-height:1.6;">
      Bedankt voor je aanvraag voor <strong style="color:#c8a96e;">${info.label}</strong>. Ik heb je bericht goed ontvangen en neem binnen 24 uur contact met je op voor een vrijblijvend kennismakingsgesprek.
    </p>

    <div style="margin:0 0 28px;padding:24px;background-color:#111111;border-left:3px solid #c8a96e;">
      <p style="margin:0 0 16px;font-size:13px;color:#c8a96e;text-transform:uppercase;letter-spacing:3px;font-weight:600;">Zo werken we samen</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        ${workflowHtml}
      </table>
    </div>

    ${data.projectDescription ? `
    <div style="margin:0 0 24px;padding:16px 20px;background-color:#111111;border-radius:4px;">
      <p style="margin:0 0 8px;font-size:12px;color:#c8a96e;text-transform:uppercase;letter-spacing:2px;">Jouw projectbeschrijving</p>
      <p style="margin:0;font-size:14px;color:#999999;font-style:italic;line-height:1.6;">"${data.projectDescription}"</p>
    </div>
    ` : ''}

    ${data.preferredDate ? `
    <p style="margin:0 0 24px;font-size:14px;color:#cccccc;line-height:1.6;">
      &#128197; Gewenste datum/periode: <strong style="color:#ffffff;">${data.preferredDate}</strong>
    </p>
    ` : ''}

    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px;">
      <tr>
        <td style="background-color:#c8a96e;padding:14px 28px;">
          <a href="${info.portfolioUrl}" style="color:#0a0a0a;font-size:13px;font-weight:600;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">${info.portfolioLabel}</a>
        </td>
      </tr>
    </table>

    <div style="margin:0 0 8px;padding:20px;background-color:#0f0f0f;border:1px solid rgba(200,169,110,0.15);border-radius:4px;">
      <p style="margin:0 0 6px;font-size:14px;color:#ffffff;font-weight:600;">Volgende stap</p>
      <p style="margin:0;font-size:14px;color:#aaaaaa;line-height:1.6;">Ik neem binnen 24 uur contact op om een vrijblijvend kennismakingsgesprek in te plannen. Je kunt me ook altijd direct bereiken via <a href="tel:+32474114899" style="color:#c8a96e;text-decoration:none;">+32 474 11 48 99</a> of <a href="https://wa.me/message/3X4O23SGBQNCC1" style="color:#c8a96e;text-decoration:none;">WhatsApp</a>.</p>
    </div>
  `;

  return emailBase(content);
}

// ─── Photographer notification ───

function buildPhotographerNotification(data) {
  const info = getProjectTypeInfo(data.service);

  const rows = [
    { label: 'Naam', value: data.name },
    { label: 'E-mail', value: `<a href="mailto:${data.email}" style="color:#c8a96e;text-decoration:none;">${data.email}</a>` },
    ...(data.phone ? [{ label: 'Telefoon', value: `<a href="tel:${data.phone}" style="color:#c8a96e;text-decoration:none;">${data.phone}</a>` }] : []),
    { label: 'Type project', value: `<strong style="color:#c8a96e;">${info.label}</strong>` },
    ...(data.preferredDate ? [{ label: 'Gewenste datum', value: data.preferredDate }] : []),
  ];

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:10px 16px 10px 0;color:#c8a96e;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1px;vertical-align:top;white-space:nowrap;width:140px;">${r.label}</td>
        <td style="padding:10px 0;color:#ffffff;font-size:14px;line-height:1.5;">${r.value}</td>
      </tr>`
    )
    .join('');

  const content = `
    <div style="margin:0 0 8px;padding:4px 12px;background-color:#c8a96e;display:inline-block;">
      <p style="margin:0;font-size:11px;font-weight:700;color:#0a0a0a;text-transform:uppercase;letter-spacing:3px;">Nieuwe aanvraag</p>
    </div>
    <h2 style="margin:12px 0 24px;font-size:22px;color:#ffffff;font-weight:600;">${data.name} — ${info.label}</h2>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
      ${rowsHtml}
    </table>

    ${data.projectDescription ? `
    <div style="margin:0 0 20px;padding:20px;background-color:#111111;border-left:3px solid #c8a96e;">
      <p style="margin:0 0 8px;font-size:12px;color:#c8a96e;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Projectbeschrijving</p>
      <p style="margin:0;font-size:14px;color:#cccccc;line-height:1.6;white-space:pre-wrap;">${data.projectDescription}</p>
    </div>
    ` : ''}

    ${data.message ? `
    <div style="margin:0 0 20px;padding:20px;background-color:#111111;border-left:3px solid rgba(255,255,255,0.15);">
      <p style="margin:0 0 8px;font-size:12px;color:#888888;text-transform:uppercase;letter-spacing:2px;font-weight:600;">Aanvullend bericht</p>
      <p style="margin:0;font-size:14px;color:#cccccc;line-height:1.6;white-space:pre-wrap;">${data.message}</p>
    </div>
    ` : ''}

    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="padding-right:12px;">
          <a href="mailto:${data.email}" style="display:inline-block;padding:12px 24px;background-color:#c8a96e;color:#0a0a0a;font-size:12px;font-weight:600;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">Beantwoorden</a>
        </td>
        ${data.phone ? `
        <td>
          <a href="tel:${data.phone}" style="display:inline-block;padding:12px 24px;border:1px solid rgba(200,169,110,0.4);color:#c8a96e;font-size:12px;font-weight:600;text-decoration:none;text-transform:uppercase;letter-spacing:2px;">Bellen</a>
        </td>
        ` : ''}
      </tr>
    </table>
  `;

  return emailBase(content);
}

module.exports = {
  getProjectTypeInfo,
  buildClientAutoReply,
  buildPhotographerNotification,
};
