export interface City {
  name: string;
  slug: string;
  province: string;
  description: string;
  population?: string;
}

export const cities: City[] = [
  // Provincie Antwerpen
  { name: "Antwerpen", slug: "antwerpen", province: "Antwerpen", description: "de bruisende havenstad en modehoofdstad van België", population: "530.000" },
  { name: "Mechelen", slug: "mechelen", province: "Antwerpen", description: "de gezellige stad aan de Dijle met rijke geschiedenis", population: "87.000" },
  { name: "Turnhout", slug: "turnhout", province: "Antwerpen", description: "de hoofdstad van de Kempen", population: "45.000" },
  { name: "Lier", slug: "lier", province: "Antwerpen", description: "het schilderachtige stadje aan de Nete", population: "36.000" },
  { name: "Herentals", slug: "herentals", province: "Antwerpen", description: "de poort van de Kempen", population: "28.000" },
  { name: "Geel", slug: "geel", province: "Antwerpen", description: "de gastvrije stad in het hart van de Kempen", population: "41.000" },
  { name: "Mol", slug: "mol", province: "Antwerpen", description: "de groene parel van de Kempen", population: "37.000" },
  { name: "Schoten", slug: "schoten", province: "Antwerpen", description: "de groene gemeente aan de rand van Antwerpen", population: "35.000" },
  { name: "Brasschaat", slug: "brasschaat", province: "Antwerpen", description: "de residentiële gemeente met uitgestrekte bossen", population: "38.000" },
  { name: "Mortsel", slug: "mortsel", province: "Antwerpen", description: "de kleinste stad van België met groot karakter", population: "26.000" },
  { name: "Kontich", slug: "kontich", province: "Antwerpen", description: "de dynamische gemeente tussen Antwerpen en Mechelen", population: "22.000" },
  { name: "Boom", slug: "boom", province: "Antwerpen", description: "de stad aan de Rupel, bekend van Tomorrowland", population: "19.000" },
  { name: "Heist-op-den-Berg", slug: "heist-op-den-berg", province: "Antwerpen", description: "de uitgestrekte gemeente in het Antwerpse hinterland", population: "43.000" },
  { name: "Willebroek", slug: "willebroek", province: "Antwerpen", description: "de gemeente aan het kanaal met industrieel erfgoed", population: "27.000" },

  // Provincie Oost-Vlaanderen
  { name: "Gent", slug: "gent", province: "Oost-Vlaanderen", description: "de culturele hoofdstad van Vlaanderen met middeleeuwse charme", population: "265.000" },
  { name: "Aalst", slug: "aalst", province: "Oost-Vlaanderen", description: "de carnavalsstad aan de Dender", population: "87.000" },
  { name: "Sint-Niklaas", slug: "sint-niklaas", province: "Oost-Vlaanderen", description: "de stad met de grootste markt van België", population: "79.000" },
  { name: "Dendermonde", slug: "dendermonde", province: "Oost-Vlaanderen", description: "de historische stad aan de samenvloeiing van Dender en Schelde", population: "46.000" },
  { name: "Lokeren", slug: "lokeren", province: "Oost-Vlaanderen", description: "de gezellige stad in het Waasland", population: "42.000" },
  { name: "Wetteren", slug: "wetteren", province: "Oost-Vlaanderen", description: "de charmante gemeente aan de Schelde", population: "25.000" },
  { name: "Beveren", slug: "beveren", province: "Oost-Vlaanderen", description: "de groene gemeente in het Waasland", population: "49.000" },
  { name: "Ninove", slug: "ninove", province: "Oost-Vlaanderen", description: "de stad aan de Dender met een rijke brouwerijtraditie", population: "40.000" },
  { name: "Geraardsbergen", slug: "geraardsbergen", province: "Oost-Vlaanderen", description: "de stad van de Muur en de Vlaamse Ardennen", population: "34.000" },
  { name: "Zottegem", slug: "zottegem", province: "Oost-Vlaanderen", description: "het hart van de Vlaamse Ardennen", population: "27.000" },
  { name: "Oudenaarde", slug: "oudenaarde", province: "Oost-Vlaanderen", description: "de tapijtenstad aan de Schelde", population: "32.000" },
  { name: "Ronse", slug: "ronse", province: "Oost-Vlaanderen", description: "de tweetalige stad in de Vlaamse Ardennen", population: "26.000" },
  { name: "Deinze", slug: "deinze", province: "Oost-Vlaanderen", description: "de kunstenaarsstad aan de Leie", population: "45.000" },
  { name: "Eeklo", slug: "eeklo", province: "Oost-Vlaanderen", description: "de hoofdstad van het Meetjesland", population: "21.000" },
  { name: "Temse", slug: "temse", province: "Oost-Vlaanderen", description: "de scheepsbouwgemeente aan de Schelde", population: "30.000" },

  // Provincie West-Vlaanderen
  { name: "Brugge", slug: "brugge", province: "West-Vlaanderen", description: "het Venetië van het Noorden, UNESCO-werelderfgoed", population: "119.000" },
  { name: "Oostende", slug: "oostende", province: "West-Vlaanderen", description: "de koningin der badsteden aan de Belgische kust", population: "72.000" },
  { name: "Kortrijk", slug: "kortrijk", province: "West-Vlaanderen", description: "de bruisende stad aan de Leie met designflair", population: "77.000" },
  { name: "Roeselare", slug: "roeselare", province: "West-Vlaanderen", description: "de stad van de Ronde van Vlaanderen", population: "65.000" },
  { name: "Ieper", slug: "ieper", province: "West-Vlaanderen", description: "de vredesstad met indrukwekkend WO I-erfgoed", population: "36.000" },
  { name: "Waregem", slug: "waregem", province: "West-Vlaanderen", description: "de stad van het paardenrennen en de jaarmarkt", population: "38.000" },
  { name: "Knokke-Heist", slug: "knokke-heist", province: "West-Vlaanderen", description: "de mondaine kustgemeente met kunstgalerijen", population: "34.000" },
  { name: "Blankenberge", slug: "blankenberge", province: "West-Vlaanderen", description: "de gezellige familiebadplaats met de Pier", population: "20.000" },
  { name: "De Panne", slug: "de-panne", province: "West-Vlaanderen", description: "de badplaats met de mooiste duinen van België", population: "11.000" },
  { name: "Koksijde", slug: "koksijde", province: "West-Vlaanderen", description: "de kustgemeente met de hoogste duinen van België", population: "22.000" },
  { name: "Torhout", slug: "torhout", province: "West-Vlaanderen", description: "de groene stad in het hart van West-Vlaanderen", population: "21.000" },
  { name: "Diksmuide", slug: "diksmuide", province: "West-Vlaanderen", description: "de IJzerstad met de iconische toren", population: "17.000" },
  { name: "Menen", slug: "menen", province: "West-Vlaanderen", description: "de grensstad aan de Leie", population: "33.000" },
  { name: "Izegem", slug: "izegem", province: "West-Vlaanderen", description: "de borstelstad met ambachtelijke traditie", population: "28.000" },
  { name: "Tielt", slug: "tielt", province: "West-Vlaanderen", description: "het centrum van de Tieltse regio", population: "21.000" },

  // Provincie Vlaams-Brabant
  { name: "Leuven", slug: "leuven", province: "Vlaams-Brabant", description: "de bruisende universiteitsstad met gotisch stadhuis", population: "102.000" },
  { name: "Vilvoorde", slug: "vilvoorde", province: "Vlaams-Brabant", description: "de stad aan het kanaal nabij Brussel", population: "45.000" },
  { name: "Halle", slug: "halle", province: "Vlaams-Brabant", description: "de bedevaartstad aan de Zenne, poort van het Pajottenland", population: "40.000" },
  { name: "Tienen", slug: "tienen", province: "Vlaams-Brabant", description: "de suikerstad in Hageland", population: "35.000" },
  { name: "Aarschot", slug: "aarschot", province: "Vlaams-Brabant", description: "de stad aan de Demer in het Hageland", population: "31.000" },
  { name: "Diest", slug: "diest", province: "Vlaams-Brabant", description: "de Oranjestadmet middeleeuwse begijnhof", population: "24.000" },
  { name: "Overijse", slug: "overijse", province: "Vlaams-Brabant", description: "de druivengemeente in de groene rand van Brussel", population: "26.000" },
  { name: "Tervuren", slug: "tervuren", province: "Vlaams-Brabant", description: "de groene gemeente met het Afrikamuseum", population: "22.000" },
  { name: "Zaventem", slug: "zaventem", province: "Vlaams-Brabant", description: "de luchthavengemeente nabij Brussel", population: "34.000" },
  { name: "Grimbergen", slug: "grimbergen", province: "Vlaams-Brabant", description: "de abdijgemeente aan de rand van Brussel", population: "40.000" },
  { name: "Asse", slug: "asse", province: "Vlaams-Brabant", description: "de hopgemeente in het Pajottenland", population: "33.000" },
  { name: "Dilbeek", slug: "dilbeek", province: "Vlaams-Brabant", description: "de groene gemeente ten westen van Brussel", population: "43.000" },

  // Provincie Limburg
  { name: "Hasselt", slug: "hasselt", province: "Limburg", description: "de gezellige hoofdstad van Limburg met modestraten", population: "79.000" },
  { name: "Genk", slug: "genk", province: "Limburg", description: "de multiculturele stad met innovatieve energie", population: "67.000" },
  { name: "Sint-Truiden", slug: "sint-truiden", province: "Limburg", description: "de stad van de bloesems in Haspengouw", population: "41.000" },
  { name: "Tongeren", slug: "tongeren", province: "Limburg", description: "de oudste stad van België met Romeins verleden", population: "32.000" },
  { name: "Beringen", slug: "beringen", province: "Limburg", description: "de voormalige mijnstad met uniek industrieel erfgoed", population: "46.000" },
  { name: "Lommel", slug: "lommel", province: "Limburg", description: "de zandstad in de Limburgse Kempen", population: "35.000" },
  { name: "Maasmechelen", slug: "maasmechelen", province: "Limburg", description: "de winkelstad aan de Maas met Maasmechelen Village", population: "39.000" },
  { name: "Maaseik", slug: "maaseik", province: "Limburg", description: "de geboortestad van Van Eyck aan de Maas", population: "26.000" },
  { name: "Bilzen", slug: "bilzen", province: "Limburg", description: "de fruitstad in het Haspengouwse landschap", population: "33.000" },
  { name: "Bree", slug: "bree", province: "Limburg", description: "de gezellige stad in Noord-Limburg", population: "16.000" },
  { name: "Peer", slug: "peer", province: "Limburg", description: "de groene stad in de Limburgse Kempen", population: "17.000" },
  { name: "Houthalen-Helchteren", slug: "houthalen-helchteren", province: "Limburg", description: "de groene gemeente in midden-Limburg", population: "32.000" },
  { name: "Heusden-Zolder", slug: "heusden-zolder", province: "Limburg", description: "de gemeente met het racecircuit van Zolder", population: "33.000" },
  { name: "Lanaken", slug: "lanaken", province: "Limburg", description: "de gemeente aan het Albertkanaal nabij Maastricht", population: "27.000" },
  { name: "Diepenbeek", slug: "diepenbeek", province: "Limburg", description: "de universitaire gemeente bij Hasselt", population: "19.000" },
];

export const provinces = [
  "Antwerpen",
  "Oost-Vlaanderen",
  "West-Vlaanderen",
  "Vlaams-Brabant",
  "Limburg",
];

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((city) => city.slug === slug);
}

export function getCitiesByProvince(province: string): City[] {
  return cities.filter((city) => city.province === province);
}
