// Unique city content for SEO variation — grouped by province with city-specific details

interface CityContent {
  aboutText: string;
}

// Templates per province for variation, with city-specific placeholders
const provinceTemplates: Record<string, (name: string, desc: string) => string> = {
  'Antwerpen': (name, desc) =>
    `Als fotograaf in ${name} werk ik regelmatig in deze prachtige regio. ${name} is ${desc} en biedt een rijke mix van stedelijke en natuurlijke achtergronden voor fotoshoots. Van moderne architectuur tot groene parken — elk hoekje vertelt een verhaal dat ik graag vastleg met mijn camera.

De provincie Antwerpen staat bekend om haar dynamische karakter en diverse landschappen. Bij Tigran Media begrijpen we hoe belangrijk het is om de juiste sfeer te vangen die past bij ${name}. Of het nu gaat om een zakelijk portret met een strakke achtergrond, een ontspannen familieshoot in het groen, of sfeervolle evenementfotografie — wij kiezen altijd de locatie die het beste bij uw verhaal past.

Wat ons onderscheidt is onze persoonlijke aanpak. Voordat we de camera oppakken, nemen we de tijd om u te leren kennen. Samen bespreken we uw wensen, de sfeer die u zoekt en de locaties in en rond ${name} die daarbij passen. Het resultaat? Authentieke beelden die uw persoonlijkheid of merk perfect weerspiegelen.`,

  'Oost-Vlaanderen': (name, desc) =>
    `Oost-Vlaanderen is een van de mooiste provincies om te fotograferen, en ${name} — ${desc} — vormt daar geen uitzondering op. Als professionele fotograaf actief in deze regio, laat ik me inspireren door de unieke combinatie van historische charme en moderne energie die deze streek kenmerkt.

In ${name} vind ik steeds opnieuw verrassende locaties voor fotoshoots. Van karakteristieke straatjes en plein tot waterpartijen en groene zones — de diversiteit is enorm. Bij elke opdracht zoek ik naar het perfecte licht en de ideale compositie om uw verhaal visueel tot leven te brengen.

Bij Tigran Media draait alles om kwaliteit en verbinding. Ik geloof dat de beste foto's ontstaan wanneer iemand zich op zijn gemak voelt. Daarom investeer ik tijd in een kennismaking, zodat de shoot in ${name} natuurlijk en ontspannen verloopt. Het resultaat zijn beelden waar u trots op kunt zijn — of het nu voor persoonlijk gebruik, uw bedrijf of social media is.`,

  'West-Vlaanderen': (name, desc) =>
    `West-Vlaanderen biedt als geen andere provincie een uniek palet aan fotomogelijkheden, en ${name} — ${desc} — is daar een prachtig voorbeeld van. Van de kust tot het binnenland, van historische stadskemen tot uitgestrekte velden: deze provincie inspireert me bij elke opdracht.

Als fotograaf in ${name} maak ik gebruik van het bijzondere West-Vlaamse licht. De nabijheid van de zee zorgt voor zachte, natuurlijke belichting die ideaal is voor portretten en sfeervolle reportages. Gecombineerd met de authentieke architectuur van ${name}, ontstaan er beelden met een tijdloze kwaliteit.

Mijn werkwijze begint altijd met luisteren. Wat wilt u uitstralen? Welk verhaal moet de foto vertellen? Samen zoeken we de perfecte locatie in ${name} en omgeving. Vervolgens zorg ik voor een ontspannen ervaring waarbij het resultaat centraal staat: professionele foto's die indruk maken.`,

  'Vlaams-Brabant': (name, desc) =>
    `Vlaams-Brabant, met ${name} als ${desc}, is een regio die bruist van creativiteit en diversiteit. Als fotograaf die regelmatig in deze provincie werkt, waardeer ik de afwisseling tussen stedelijk leven en het groene Hageland of Pajottenland dat vlakbij ligt.

In ${name} combineer ik graag moderne en klassieke elementen in mijn fotografie. De regio biedt geweldige mogelijkheden — van stijlvolle zakelijke shoots in een hedendaagse omgeving tot intieme portretfotografie in een park of historisch gebouw. Elke locatie in ${name} heeft zijn eigen karakter dat ik vastleg in uw beelden.

Bij Tigran Media geloof ik dat fotografie meer is dan techniek alleen. Het gaat om het vangen van emotie, sfeer en authenticiteit. Daarom neem ik de tijd voor een persoonlijk gesprek voordat we beginnen. Zo weet ik precies wat u zoekt en kan ik in ${name} de perfecte setting creëren voor foto's die u jarenlang koestert.`,

  'Limburg': (name, desc) =>
    `Limburg is een provincie die uitnodigt om te fotograferen. ${name}, ${desc}, biedt een unieke mix van natuur, cultuur en gastvrijheid die zich prachtig laat vastleggen. Als professionele fotograaf geniet ik telkens weer van het werken in deze warme, groene streek.

Het Limburgse landschap rond ${name} biedt schitterende achtergronden voor diverse soorten fotografie. Denk aan de uitgestrekte bossen, het golvende Haspengouwse landschap of de industriële erfgoedsites die een stoere, unieke sfeer uitstralen. Door mijn kennis van de regio weet ik precies waar we het beste licht en de mooiste setting vinden.

Wat cliënten in ${name} waarderen aan mijn aanpak is de combinatie van professionaliteit en een persoonlijke touch. Ik neem de tijd om uw wensen te begrijpen en de shoot volledig af te stemmen op uw situatie. Of het nu gaat om een bedrijfsreportage, een portret of een evenement — u ontvangt beelden van topkwaliteit die uw verwachtingen overtreffen.`,
};

export function getCityContent(name: string, slug: string, description: string, province: string): CityContent {
  const template = provinceTemplates[province];

  if (template) {
    return { aboutText: template(name, description) };
  }

  // Fallback
  return {
    aboutText: `Als professionele fotograaf actief in ${name} combineer ik technische expertise met een artistiek oog. ${name} is ${description} en biedt prachtige mogelijkheden voor fotoshoots. Van portretten tot evenementen, van zakelijke fotografie tot producten — Tigran Media staat voor kwaliteit en persoonlijke aandacht.

Wat ons werk in ${name} bijzonder maakt, is onze kennis van de lokale omgeving. Wij weten waar het beste licht valt, welke locaties het meest fotogeniek zijn en hoe we de unieke sfeer van ${name} kunnen vastleggen in tijdloze beelden.

Neem vandaag nog contact op voor een vrijblijvend gesprek over uw fotoshoot in ${name}. Samen maken we beelden die een leven lang meegaan.`,
  };
}
