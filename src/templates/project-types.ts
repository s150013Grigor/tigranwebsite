/**
 * Projecttype-specifieke e-mail content voor auto-reply
 *
 * Elk type bevat:
 *  - label: mooie weergavenaam
 *  - workflow: stappen die de klant kan verwachten
 *  - portfolioUrl: deeplink naar relevant portfolio/pagina
 *  - portfolioLabel: CTA-tekst
 */

export interface ProjectTypeInfo {
  label: string;
  workflow: string[];
  portfolioUrl: string;
  portfolioLabel: string;
}

export const projectTypes: Record<string, ProjectTypeInfo> = {
  website: {
    label: 'Website Fotografie',
    workflow: [
      'Intake — We bespreken je merk, doelgroep en de pagina\'s waarvoor beelden nodig zijn.',
      'Moodboard — Ik stel een visueel concept samen op basis van je huisstijl.',
      'Fotoshoot — Professionele shoot op locatie of in de studio.',
      'Nabewerking — Elke foto wordt individueel bewerkt naar je brandkleuren en stijl.',
      'Levering — Hoge resolutie bestanden, geoptimaliseerd voor web én print.',
    ],
    portfolioUrl: 'https://www.tigranmedia.be/portfolio/',
    portfolioLabel: 'Bekijk website fotografie voorbeelden',
  },
  'social-media': {
    label: 'Social Media Content',
    workflow: [
      'Contentstrategie — We bepalen samen welke beelden je nodig hebt per platform.',
      'Batchshoot — Efficiënte fotosessie voor meerdere weken aan content.',
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
      'Intake — We bespreken je wensen en ideeën in een vrijblijvend gesprek.',
      'Voorstel — Ik werk een plan uit op basis van je specifieke behoeften.',
      'Fotoshoot — Professionele shoot volgens het afgesproken concept.',
      'Nabewerking — Elke foto wordt zorgvuldig bewerkt.',
      'Levering — Bestanden in hoge resolutie via een beveiligde online galerij.',
    ],
    portfolioUrl: 'https://www.tigranmedia.be/portfolio/',
    portfolioLabel: 'Bekijk onze portfolio',
  },
};

/**
 * Fallback voor onbekende projecttypes — gebruikt 'anders'
 */
export function getProjectTypeInfo(service: string): ProjectTypeInfo {
  return projectTypes[service] || projectTypes.anders;
}
