# SEO Rapport — Tigran Media (tigranmedia.be)

*Datum: 10 februari 2026*

---

## ✅ Wat al goed is

### Meta Tags & Open Graph
- **Alle pagina's** hebben `generateSEO()` met unieke title, description, canonical URL
- Open Graph tags (title, description, image, locale `nl_BE`) op elke pagina
- Twitter Card (`summary_large_image`) op elke pagina
- `metadataBase` correct ingesteld op `https://www.tigranmedia.be`
- Title-template `%s | Tigran Media` via layout.tsx

### Structured Data (JSON-LD)
- **LocalBusiness** schema op alle pagina's (via layout)
- **WebSite** schema met SearchAction op alle pagina's (via layout)
- **ProfessionalService** schema op homepage
- **BreadcrumbList** op: Portfolio, Blog, FAQ, Contact, Over Ons, Album detail, Foto detail, Blog detail, City pages
- **FAQPage** schema op FAQ-pagina
- **Article** schema op blogposts
- **ImageObject** schema op foto detail pagina's
- **CityService** schema op `/fotograaf/[city]/` pagina's

### Technisch
- `lang="nl-BE"` op `<html>` element
- `robots.txt` aanwezig (blokkeert `/admin/`, verwijst naar sitemap)
- Sitemap generator script aanwezig (`scripts/generate-sitemap.js`)
- `trailingSlash: true` voor consistente URL's
- Canonical URL's op alle pagina's
- Geo-meta tags (`geo.region: BE-VLG`, `geo.placename: Vlaanderen`)
- `max-image-preview: large` voor Google afbeeldingen
- Favicon ingesteld voor light/dark mode
- `theme-color` meta tag (#0a0a0a)
- Web manifest (`site.webmanifest`) aanwezig

### Content SEO
- City-specifieke landingspagina's (`/fotograaf/antwerpen/`, `/fotograaf/gent/`, etc.)
- Blog met Markdown content
- FAQ pagina met gestructureerde data

---

## ⚠️ Verbeterpunten (Medium prioriteit)

### 1. OG-afbeeldingen zijn Unsplash placeholders
**Probleem:** Alle pagina's gebruiken dezelfde Unsplash stockfoto als OG-image.
**Impact:** Wanneer links gedeeld worden op social media zien alle pagina's er hetzelfde uit.
**Oplossing:**
- Maak een unieke OG-afbeelding per pagina (1200×630px)
- Upload naar `/uploads/` of `/public/og/`
- Update `generateSEO()` calls met pagina-specifieke afbeeldingen
- Minimaal: unieke afbeelding voor homepage, portfolio, en contact

### 2. Google Search Console verificatie ontbreekt
**Probleem:** In `layout.tsx` staat een TODO voor Google Search Console verificatie.
**Impact:** Zonder verificatie geen toegang tot zoekprestaties, indexeringsstatus, en crawlfouten.
**Oplossing:**
- Ga naar [Google Search Console](https://search.google.com/search-console)
- Voeg `www.tigranmedia.be` toe als property
- Kopieer de verificatiecode
- Vul in bij `verification.google` in `layout.tsx`

### 3. Google Analytics niet actief
**Probleem:** GA4 en Google Ads tracking staan uitgecommentarieerd in `layout.tsx`.
**Impact:** Geen inzicht in bezoekersgedrag, conversies, of campagneprestaties.
**Oplossing:**
- Maak een GA4 property aan op [analytics.google.com](https://analytics.google.com)
- Vul het Measurement ID (`G-XXXXXXXXXX`) in
- Uncomment de scripts in `layout.tsx`

### 4. Sitemap wordt niet automatisch gegenereerd bij build
**Probleem:** `scripts/generate-sitemap.js` moet handmatig gedraaid worden of in `buildspec.yml` staan.
**Impact:** Sitemap kan verouderd raken als het niet bij elke deploy wordt gegenereerd.
**Oplossing:**
- Voeg `node scripts/generate-sitemap.js` toe aan `buildspec.yml` build fase
- Of gebruik Next.js ingebouwde sitemap functie (`app/sitemap.ts`)

### 5. Geen `hreflang` tags
**Probleem:** De site is in het Nederlands (België) maar heeft geen `hreflang` tags.
**Impact:** Google weet niet zeker dat de site bedoeld is voor Nederlandstalig België.
**Oplossing:**
- Voeg toe in `generateSEO()`:
```typescript
alternates: {
  canonical: fullUrl,
  languages: {
    'nl-BE': fullUrl,
  },
},
```

### 6. Social media `sameAs` links zijn leeg
**Probleem:** `generateLocalBusinessSchema()` heeft `sameAs: []`.
**Impact:** Google kan social media profielen niet koppelen aan het bedrijf.
**Oplossing:**
- Vul in met sociale profielen:
```javascript
sameAs: [
  'https://www.instagram.com/tigranmedia',
  'https://www.facebook.com/tigranmedia',
  // LinkedIn, etc.
],
```

---

## 🔴 Ontbrekende items (Hoge prioriteit)

### 7. Geen `alt` tekst controle op bestaande afbeeldingen
**Probleem:** Alle cover images in albums.json zijn Unsplash links — de `alt` attributen zijn automatisch gegenereerd of leeg.
**Impact:** Google afbeeldingenzoekresultaten missen relevante trefwoorden.
**Oplossing:**
- Vervang Unsplash covers door echte portfolio foto's
- Zorg dat elke afbeelding een beschrijvende `alt` tekst heeft (met zoekwoorden)
- CMS dwingt al `alt` tekst af bij foto-upload ✅

### 8. Geen `<h1>` optimalisatie audit
**Probleem:** Elke pagina zou precies één `<h1>` moeten hebben met het hoofdkeyword.
**Aanbeveling per pagina:**
| Pagina | Aanbevolen H1 |
|--------|---------------|
| Homepage | "Professionele Fotograaf in Vlaanderen" |
| Portfolio | "Portfolio — Fotografie Collectie" |
| Over Ons | "Over Tigran Media — Uw Fotograaf" |
| Contact | "Contact Opnemen" |
| Blog | "Fotografie Blog" |
| FAQ | "Veelgestelde Vragen" |
| Album pages | "{Album Titel} — Fotografie" |

### 9. Geen `loading="lazy"` op niet-kritieke afbeeldingen
**Probleem:** Next.js `<Image>` component zonder `priority` prop laadt standaard lazy, maar gewone `<img>` tags niet.
**Impact:** Tragere laadtijden op pagina's met veel afbeeldingen.
**Oplossing:**
- Controleer alle `<img>` tags in componenten
- Voeg `loading="lazy"` toe waar nodig
- Gebruik `next/image` waar mogelijk

### 10. Performance-gerelateerde SEO
**Probleem:** Core Web Vitals beïnvloeden ranking direct.
**Aanbevelingen:**
- Vervang Unsplash URLs door lokale WebP afbeeldingen (sneller, geen externe afhankelijkheid)
- Verklein hero-afbeelding (LCP verbetering)
- Overweeg `<link rel="preload">` voor kritieke afbeeldingen
- Test met [PageSpeed Insights](https://pagespeed.web.google.com/)

---

## 📋 Actielijst (geprioriteerd)

| # | Actie | Prioriteit | Moeite |
|---|-------|-----------|--------|
| 1 | Google Search Console instellen en verifiëren | 🔴 Hoog | Laag |
| 2 | Google Analytics 4 activeren | 🔴 Hoog | Laag |
| 3 | Unsplash covers vervangen door echte foto's | 🔴 Hoog | Medium |
| 4 | Social media links invullen in `sameAs` | ⚠️ Medium | Laag |
| 5 | Unieke OG-afbeeldingen per pagina | ⚠️ Medium | Medium |
| 6 | `hreflang` tags toevoegen | ⚠️ Medium | Laag |
| 7 | Sitemap generatie automatiseren in build | ⚠️ Medium | Laag |
| 8 | Core Web Vitals testen en optimaliseren | ⚠️ Medium | Medium |
| 9 | H1 tags controleren per pagina | ⚠️ Medium | Laag |
| 10 | Google Business Profile aanmaken | ⚠️ Medium | Medium |
| 11 | Link building starten (lokale directories) | 🟡 Laag | Hoog |
| 12 | Blog content uitbreiden (minimaal 1x/maand) | 🟡 Laag | Hoog |

---

## 🎯 Aanbevolen volgende stappen

1. **Vandaag:** Google Search Console verificatie + Analytics activeren
2. **Deze week:** Echte portfolio foto's uploaden via CMS, Unsplash links vervangen
3. **Deze maand:** OG-afbeeldingen maken, social media links aanvullen, Google Business Profile
4. **Doorlopend:** Blog content schrijven, resultaten monitoren in Search Console

---

## 📊 Huidige SEO Score Schatting

| Categorie | Score | Opmerking |
|-----------|-------|-----------|
| On-page SEO | 8/10 | Meta tags, structured data, canonicals — goed |
| Technische SEO | 7/10 | Mist GSC, GA, automatische sitemap |
| Content SEO | 6/10 | Placeholder afbeeldingen, blog kan uitgebreid |
| Off-page SEO | 3/10 | Geen backlinks, geen social media links |
| Lokale SEO | 7/10 | City pages goed, LocalBusiness schema, mist GMB |
| **Totaal** | **6.2/10** | **Focus op technische setup en echte content** |
