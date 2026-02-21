# Tigran Media — Professionele Fotografie Website

Een fotografiewebsite gebouwd met **Next.js 14**, **TypeScript** en **Tailwind CSS**.

---

## Snel Starten (Frontend)

### Wat heb je nodig?

- **Node.js** versie 18 of hoger — [download hier](https://nodejs.org/)
- **Git** — [download hier](https://git-scm.com/)

### Stap 1: Repository clonen

```bash
git clone https://github.com/s150013Grigor/tigranwebsite.git
cd tigranwebsite
```

### Stap 2: Dependencies installeren

```bash
npm install
```

### Stap 3: Development server starten

```bash
npm run dev
```

### Stap 4: Open je browser

Ga naar **[http://localhost:3000](http://localhost:3000)** — je ziet nu de website lokaal draaien.

Elke keer dat je een bestand opslaat, wordt de pagina automatisch herladen (hot reload).

---

## Wijzigingen terug pushen naar GitHub

Nadat je aanpassingen hebt gemaakt:

```bash
# 1. Bekijk welke bestanden je hebt gewijzigd
git status

# 2. Voeg alle gewijzigde bestanden toe
git add .

# 3. Maak een commit met een beschrijving van je wijziging
git commit -m "Beschrijf hier kort wat je hebt aangepast"

# 4. Push naar GitHub
git push
```

> **Tip:** Gebruik duidelijke commit berichten, bijvoorbeeld:
> - `git commit -m "Hero sectie kleuren aangepast"`
> - `git commit -m "Nieuwe foto's toegevoegd aan portfolio"`
> - `git commit -m "Footer tekst gewijzigd"`

---

## Waar werk je als frontend developer?

Je werkt voornamelijk in de `src/` map:

```
src/
├── app/                    # Pagina's (elke map = een route/URL)
│   ├── page.tsx            # Homepage (localhost:3000)
│   ├── layout.tsx          # Hoofd-layout (header/footer wrapper)
│   ├── globals.css         # Globale stijlen (Tailwind + custom CSS)
│   ├── portfolio/          # Portfolio pagina's
│   ├── blog/               # Blog pagina's
│   ├── contact/            # Contactpagina
│   ├── faq/                # FAQ pagina
│   ├── over-ons/           # Over ons pagina
│   ├── fotograaf/[city]/   # Stad-specifieke landingspagina's
│   └── varianten/          # Component varianten (preview pagina's)
├── components/             # Herbruikbare componenten (knoppen, secties, etc.)
│   ├── Hero.tsx            # Hero banner bovenaan de homepage
│   ├── Header.tsx          # Navigatiebalk
│   ├── Footer.tsx          # Footer
│   ├── Gallery.tsx         # Foto galerij
│   ├── ContactForm.tsx     # Contactformulier
│   ├── AboutSection.tsx    # Over ons sectie
│   ├── Testimonials.tsx    # Reviews/testimonials
│   ├── BlogCard.tsx        # Blog kaart component
│   ├── FAQSection.tsx      # FAQ sectie
│   └── CTA.tsx             # Call-to-action sectie
├── content/                # Content (teksten, data)
│   ├── albums.json         # Album data
│   ├── photos.json         # Foto data
│   ├── faq.json            # FAQ vragen & antwoorden
│   ├── testimonials.json   # Reviews
│   └── blog/               # Blog posts (Markdown bestanden)
└── data/
    └── cities.ts           # Lijst van steden
```

### Styling

De website gebruikt **Tailwind CSS**. Je past stijlen aan direct in de componenten met class names zoals `className="bg-white text-black p-4"`. Globale stijlen staan in `src/app/globals.css`.

---

## Hoe Frontend en Backend met elkaar verbonden zijn (voor context)

Je hoeft NIET aan de backend te werken, maar dit is hoe het in elkaar zit:

```
┌─────────────────────────────────────────────────────────┐
│  FRONTEND (waar jij aan werkt)                          │
│  Next.js — src/app/ en src/components/                  │
│  Draait lokaal op http://localhost:3000                  │
└──────────────────────┬──────────────────────────────────┘
                       │
                       │ Als iemand het contactformulier invult,
                       │ stuurt de frontend een request naar:
                       │
┌──────────────────────▼──────────────────────────────────┐
│  BACKEND (hoef je niet aan te werken)                   │
│                                                         │
│  API Gateway (AWS)                                      │
│       ↓                                                 │
│  Lambda functie (lambda/contact-form/index.js)          │
│       ↓                                                 │
│  SES (Amazon email service) → stuurt email naar Tigran  │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│  HOSTING (hoef je niet aan te werken)                   │
│                                                         │
│  Na "npm run build" wordt de site geëxporteerd als      │
│  statische HTML/CSS/JS bestanden → geüpload naar:       │
│                                                         │
│  S3 (opslag) → CloudFront (CDN) → bezoekers             │
│                                                         │
│  Configuratie staat in: terraform/                       │
└─────────────────────────────────────────────────────────┘
```

### Backend mappen (voor context, niet aanpassen)

| Map | Wat het doet |
|-----|-------------|
| `lambda/contact-form/` | Code die het contactformulier verwerkt (draait op AWS) |
| `terraform/` | Infrastructuur configuratie (S3, CloudFront, Lambda) |
| `cms/server.js` | Lokale CMS server (alleen voor development) |
| `scripts/` | Helper scripts (sitemap generator) |

---

## Handige commando's

| Commando | Wat het doet |
|----------|-------------|
| `npm install` | Installeert alle benodigde packages |
| `npm run dev` | Start de development server op localhost:3000 |
| `npm run build` | Bouwt de productie-versie van de site |
| `npm run cms` | Start dev server + CMS admin panel (localhost:3000/admin) |

---

## Pagina overzicht

| Pagina | URL | Bestand |
|--------|-----|---------|
| Home | `/` | `src/app/page.tsx` |
| Portfolio | `/portfolio` | `src/app/portfolio/page.tsx` |
| Blog | `/blog` | `src/app/blog/page.tsx` |
| Contact | `/contact` | `src/app/contact/page.tsx` |
| FAQ | `/faq` | `src/app/faq/page.tsx` |
| Over ons | `/over-ons` | `src/app/over-ons/page.tsx` |
| Privacy | `/privacy-policy` | `src/app/privacy-policy/page.tsx` |
| Voorwaarden | `/terms-of-service` | `src/app/terms-of-service/page.tsx` |

---

## Technologie Stack

- **Next.js 14** — React framework
- **TypeScript** — JavaScript met types
- **Tailwind CSS** — Utility-first CSS framework
- **Framer Motion** — Animaties
- **AWS S3 + CloudFront** — Hosting (backend)
- **AWS Lambda + SES** — Contactformulier (backend)
- **Terraform** — Infrastructuur als code (backend)
