# Tigran Media – Claude Instructies

## ⚠️ STRIKTE REGELS
- Werk en schrijf ALLEEN in /src en /public
- /lambda, /cms, /terraform en alle root-level config bestanden zijn READ-ONLY
- Raak NOOIT aan: next.config.js, package.json, .env, buildspec.yml, deploy.ps1
- SEO: verander NOOIT H1/H2 teksten, alt-teksten of metadata

## 📁 Project Structuur
- /src → alle frontend code (componenten, pagina's, styles)
- /public → afbeeldingen en statische bestanden
- /lambda → backend (alleen lezen voor context)
- /cms → content management (alleen lezen voor context)
- /src/components → herbruikbare UI componenten
- /src/app → Next.js pagina's en routing

## 🎯 Design Richting
- Stijl: luxe, high-end, donker met warme goudtinten
- Stack: Next.js 14 + TypeScript + Tailwind CSS + Framer Motion
- Geen template-gevoel — custom en onderscheidend
- Animaties: vloeiend maar niet storend voor UX
- Typografie: Playfair Display (titels) + Inter (body)

## 🔒 SEO Bewaken
- H1/H2 teksten nooit aanpassen
- Alt-teksten op afbeeldingen altijd behouden
- Metadata in layout.tsx onaangeroerd laten

## ✅ Werkwijze
- Lees dit bestand altijd eerst
- Doe nooit meer dan 5 aanpassingen per sessie — daarna daalt de kwaliteit.
  Stop na 5 items en vraag een nieuwe sessie te starten.
- Stel een plan voor per aanpassing voordat je begint
- Werk één aanpassing tegelijk af
- Vraag bevestiging voordat je verdergaat
- Meld het als iets buiten /src of /public vereist is
