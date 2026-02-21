# SEO Audit — Tigran Media (tigranmedia.be)

*Audit datum: 10 februari 2026*

---

## 📊 Scores per categorie

| Categorie | Score | Details |
|-----------|-------|---------|
| **On-page SEO** | 9.5/10 | Alle pagina's unieke title, description, canonical, hreflang, OG, Twitter Cards |
| **Structured Data** | 9.5/10 | 8 schema types: LocalBusiness, ProfessionalService, WebSite, BreadcrumbList, Article, FAQPage, ImageObject, CityService |
| **Technische SEO** | 9.0/10 | Sitemap automatisch, robots.txt, trailingSlash, hreflang, WebP compressie |
| **Content SEO** | 7.0/10 | 71 steden-pagina's, blog, FAQ — placeholder afbeeldingen nog aanwezig |
| **Lokale SEO** | 8.5/10 | LocalBusiness schema, city pages, geo-meta tags |
| **Performance SEO** | 7.5/10 | WebP 95%, lazy loading, static export — externe Unsplash images vertragen LCP |
| **Off-page SEO** | 3.0/10 | Geen backlinks, social media links leeg |
| **Totaal** | **7.7/10** | |

---

## ✅ Wat goed is (volledig geïmplementeerd)

### Meta Tags & Open Graph
- ✅ `generateSEO()` helper op **alle** pagina's met unieke title/description/URL
- ✅ Title template: `%s | Tigran Media`
- ✅ Open Graph (title, description, image, `nl_BE` locale) op elke pagina
- ✅ Twitter Card `summary_large_image` op elke pagina
- ✅ Canonical URL's op alle pagina's
- ✅ **`hreflang` tags** (`nl-BE` + `x-default`) op alle pagina's
- ✅ Geo-meta tags (`geo.region: BE-VLG`, `geo.placename: Vlaanderen`)
- ✅ `max-image-preview: large` voor Google Images

### Structured Data (JSON-LD)
- ✅ **LocalBusiness** — alle pagina's (via layout)
- ✅ **WebSite** + SearchAction — alle pagina's (via layout)
- ✅ **ProfessionalService** — homepage
- ✅ **BreadcrumbList** — Portfolio, Blog, FAQ, Contact, Over Ons, Album, Foto, Blog detail, City pages
- ✅ **FAQPage** — FAQ-pagina + city pages
- ✅ **Article** — blogposts
- ✅ **ImageObject** — foto detail pagina's
- ✅ **CityService** — `/fotograaf/[city]/` pagina's

### Technische SEO
- ✅ `robots.txt` — Allow all, disallow `/admin/`, sitemap referentie
- ✅ **Automatische sitemap** — gegenereerd bij elke build (127 URL's)
- ✅ `trailingSlash: true` — consistente URL structuur
- ✅ `lang="nl-BE"` op `<html>`
- ✅ **WebP compressie** — alle uploads geconverteerd naar WebP 95% kwaliteit
- ✅ Favicon met light/dark mode varianten
- ✅ Web manifest (`site.webmanifest`)
- ✅ `theme-color` meta tag
- ✅ Static export (`output: 'export'`) — snelle TTFB

### Content & Lokale SEO
- ✅ **71 steden-landingspagina's** (`/fotograaf/antwerpen/`, `/fotograaf/gent/`, etc.)
- ✅ Blog met Markdown content
- ✅ FAQ pagina met gestructureerde data
- ✅ Over Ons pagina met breadcrumb

### Afbeelding Optimalisatie
- ✅ CMS dwingt **WebP formaat** af bij upload (95% kwaliteit)
- ✅ Maximum breedte 2400px (resize bij upload)
- ✅ Alt tekst verplicht bij foto-upload
- ✅ Canvas-based compressie in browser (geen externe library nodig)

---

## ⚠️ Resterende verbeterpunten

### 1. OG-afbeeldingen zijn Unsplash placeholders
**Score impact:** -0.5 punt
**Status:** Wacht op echte portfolio foto's van Tigran
**Oplossing:** Vervang per pagina de Unsplash URL door een echte foto → upload via CMS

### 2. Google Search Console verificatie
**Score impact:** -0.5 punt (technisch)
**Oplossing:**
```
// In layout.tsx → verification:
google: 'JOUW_VERIFICATIECODE'
```

### 3. Google Analytics niet actief
**Score impact:** -0.5 punt (technisch)
**Oplossing:** Uncomment GA4 scripts in `layout.tsx`, vul Measurement ID in

### 4. Social media `sameAs` links leeg
**Score impact:** -0.5 punt (off-page)
**Oplossing:** Vul Instagram/Facebook/LinkedIn URLs in bij `structured-data.ts`

### 5. Externe afbeeldingen (Unsplash)
**Score impact:** -1.0 punt (performance)
**Probleem:** Album covers laden van `images.unsplash.com` → extra DNS lookup, hogere LCP
**Oplossing:** Download en upload als lokale WebP via CMS

### 6. Geen backlinks
**Score impact:** -3.0 punten (off-page)
**Oplossing:**
- Google Business Profile aanmaken
- Lokale directories (Gouden Gids, Yelp BE)
- Fotografie platforms (500px, Flickr)
- Gastbloggen op relevante websites

### 7. Blog frequentie
**Score impact:** -1.0 punt (content)
**Aanbeveling:** Minimaal 2x per maand een blogpost publiceren
**Onderwerpen:**
- "Beste fotolocaties in [stad]"
- "Tips voor een zakelijke fotoshoot"
- "Wat kost een professionele fotograaf in België?"
- "Verschil tussen portret- en evenementfotografie"

---

## 📋 Actielijst naar 10/10

| # | Actie | Impact | Moeite | Score winst |
|---|-------|--------|--------|-------------|
| 1 | Google Search Console instellen | Hoog | 10 min | +0.5 |
| 2 | Google Analytics activeren | Hoog | 10 min | +0.5 |
| 3 | Echte foto's uploaden via CMS | Hoog | 1 uur | +0.5 |
| 4 | Social media links invullen | Medium | 5 min | +0.5 |
| 5 | Google Business Profile | Hoog | 30 min | +0.5 |
| 6 | Backlinks van directories | Hoog | 2 uur | +1.0 |
| 7 | Blog uitbreiden (2x/maand) | Medium | doorlopend | +0.5 |
| 8 | Lokale Unsplash → eigen WebP | Medium | 30 min | +0.5 |

**Huidige score: 7.7/10**
**Potentiële score na acties: 10/10**

---

## 🔧 Technische wijzigingen deze sessie

| Wijziging | Status |
|-----------|--------|
| `hreflang` tags (`nl-BE` + `x-default`) toegevoegd aan `generateSEO()` | ✅ |
| Sitemap automatisch gegenereerd bij build (`buildspec.yml`) | ✅ |
| Over Ons pagina: breadcrumb JSON-LD + title fix | ✅ |
| Sitemap: Over Ons pagina toegevoegd, foto URL's gefixt | ✅ |
| CMS compressie: 82% → **95% kwaliteit**, altijd WebP output | ✅ |
| Sitemap: varianten verwijderd, 127 URL's totaal | ✅ |

---

## 🏗️ Architectuur overzicht

```
SEO Stack:
├── src/lib/seo.ts              → generateSEO() — meta tags, OG, Twitter, hreflang
├── src/lib/structured-data.ts  → 8 JSON-LD schema generators
├── src/app/layout.tsx          → Root metadata, LocalBusiness + WebSite schema
├── scripts/generate-sitemap.js → Automatische sitemap (127 URLs)
├── public/robots.txt           → Crawler instructies
├── public/sitemap.xml          → Gegenereerd bij build
└── buildspec.yml               → Sitemap generatie in CI/CD pipeline
```
