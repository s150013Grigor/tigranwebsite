import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Algemene Voorwaarden',
  description: 'Algemene voorwaarden van Tigran Media. Lees hier onze voorwaarden voor fotografie diensten.',
  url: '/terms-of-service',
  noIndex: false,
});

export default function TermsOfServicePage() {
  return (
    <div className="pt-32 pb-20 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Algemene Voorwaarden</span>
        </nav>

        <h1 className="text-4xl font-heading font-bold text-white mb-8">
          Algemene Voorwaarden
        </h1>
        <p className="text-gray-500 text-sm mb-12">Laatst bijgewerkt: januari 2026</p>

        <div className="prose-custom space-y-8">
          <section>
            <h2>1. Definities</h2>
            <p>
              In deze algemene voorwaarden wordt verstaan onder:
            </p>
            <ul>
              <li><strong>Fotograaf:</strong> Tigran Media, de eenmanszaak vertegenwoordigd door Tigran Khachatryan, gevestigd in Vlaanderen, België.</li>
              <li><strong>Klant:</strong> De natuurlijke persoon of rechtspersoon die een overeenkomst aangaat met de Fotograaf voor het leveren van fotografiediensten.</li>
              <li><strong>Werk:</strong> Alle foto&apos;s, beelden en ander materiaal geproduceerd door de Fotograaf in het kader van de overeenkomst.</li>
              <li><strong>Offerte:</strong> Het schriftelijke aanbod van de Fotograaf met een beschrijving van de diensten en bijbehorende prijzen.</li>
            </ul>
          </section>

          <section>
            <h2>2. Toepasselijkheid</h2>
            <p>
              Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes en overeenkomsten
              tussen de Fotograaf en de Klant. Afwijkingen van deze voorwaarden zijn enkel geldig indien
              schriftelijk overeengekomen door beide partijen. Door een boeking te plaatsen of een offerte
              te aanvaarden, verklaart de Klant deze voorwaarden te hebben gelezen en ermee akkoord te gaan.
            </p>
          </section>

          <section>
            <h2>3. Offertes en Boekingen</h2>
            <p>
              Alle offertes zijn vrijblijvend en geldig gedurende 30 dagen na de datum van uitgifte,
              tenzij anders vermeld. Een boeking wordt als definitief beschouwd na:
            </p>
            <ul>
              <li>Schriftelijke bevestiging (per e-mail of ondertekend contract) door beide partijen;</li>
              <li>Ontvangst van de aanbetaling door de Fotograaf.</li>
            </ul>
            <p>
              De Fotograaf behoudt zich het recht voor om een boeking te weigeren zonder opgave van reden.
            </p>
          </section>

          <section>
            <h2>4. Tarieven en Betaling</h2>
            <p>
              De tarieven worden vooraf overeengekomen en vastgelegd in de offerte of het contract.
              Tenzij anders vermeld, zijn alle prijzen exclusief BTW.
            </p>
            <ul>
              <li>Een aanbetaling van 30% van het totaalbedrag is vereist om de datum te reserveren.</li>
              <li>Het resterende bedrag wordt gefactureerd na levering van het Werk, met een betalingstermijn van 14 dagen.</li>
              <li>Bij niet-tijdige betaling is de Klant van rechtswege in verzuim en kan een wettelijke rente in rekening worden gebracht.</li>
              <li>Alle kosten voortvloeiend uit het innen van openstaande facturen (incl. incassokosten) komen voor rekening van de Klant.</li>
            </ul>
          </section>

          <section>
            <h2>5. Annulering en Wijziging</h2>
            <p>
              Bij annulering door de Klant gelden de volgende voorwaarden:
            </p>
            <ul>
              <li>Meer dan 30 dagen voor de geplande shoot: volledige terugbetaling van de aanbetaling.</li>
              <li>14 tot 30 dagen voor de geplande shoot: 50% van de aanbetaling wordt terugbetaald.</li>
              <li>Minder dan 14 dagen voor de geplande shoot: geen terugbetaling van de aanbetaling.</li>
            </ul>
            <p>
              Wijzigingen in datum of locatie zijn mogelijk tot 7 dagen voor de fotoshoot, afhankelijk
              van beschikbaarheid, en zonder extra kosten (tenzij er bijkomende reiskosten zijn).
            </p>
            <p>
              Bij annulering door de Fotograaf wegens overmacht (ziekte, extreme weersomstandigheden,
              of andere onvoorziene omstandigheden) wordt een nieuwe datum afgesproken zonder extra kosten.
              Indien geen alternatieve datum mogelijk is, wordt de aanbetaling volledig terugbetaald.
            </p>
          </section>

          <section>
            <h2>6. Uitvoering van de Opdracht</h2>
            <p>
              De Fotograaf zal de opdracht naar beste inzicht en vermogen uitvoeren. De Fotograaf
              bepaalt de creatieve en technische aanpak, tenzij schriftelijk anders overeengekomen.
              De Klant zorgt ervoor dat de Fotograaf ongehinderd toegang heeft tot de locatie en
              onderwerpen (personen, objecten) die gefotografeerd moeten worden.
            </p>
          </section>

          <section>
            <h2>7. Levering</h2>
            <p>
              De bewerkte foto&apos;s worden geleverd via een beveiligde online galerij of via een
              ander overeengekomen medium. De standaard levertijden zijn:
            </p>
            <ul>
              <li>Portretten en zakelijke shoots: 1-2 weken na de fotoshoot.</li>
              <li>Evenementen: 2-3 weken na het evenement.</li>
              <li>Grote projecten: tot 4 weken na het evenement.</li>
            </ul>
            <p>
              De Fotograaf streeft ernaar deze termijnen na te leven, maar deze zijn indicatief
              en geen vaste deadlines, tenzij schriftelijk anders overeengekomen.
            </p>
          </section>

          <section>
            <h2>8. Auteursrecht en Gebruikslicentie</h2>
            <p>
              Het auteursrecht op alle foto&apos;s en ander geleverd Werk berust volledig bij de
              Fotograaf, in overeenstemming met de Belgische Auteurswet. De Klant ontvangt bij
              levering een niet-exclusieve, niet-overdraagbare licentie voor persoonlijk en
              niet-commercieel gebruik van de geleverde foto&apos;s.
            </p>
            <ul>
              <li>Commercieel gebruik (advertenties, drukwerk, websites van derden, etc.) vereist
                voorafgaande schriftelijke toestemming van de Fotograaf en kan onderhevig zijn aan een
                commerciële licentietoeslag.</li>
              <li>De Fotograaf behoudt het recht om het Werk te gebruiken voor portfolio, website,
                sociale media, wedstrijden en andere promotionele doeleinden, tenzij schriftelijk anders
                overeengekomen.</li>
              <li>Bij publicatie (online of in druk) dient de Klant de Fotograaf te crediteren als
                &ldquo;Tigran Media&rdquo; of &ldquo;@tigran.media&rdquo;.</li>
            </ul>
          </section>

          <section>
            <h2>9. Bewerking en Nabewerking</h2>
            <p>
              De Fotograaf bepaalt de stijl, kleurbewerking en uiteindelijke presentatie van de
              foto&apos;s. Ruwe (onbewerkte) bestanden (RAW-bestanden) worden niet geleverd, tenzij
              schriftelijk anders overeengekomen.
            </p>
            <p>
              Aanvullende bewerkingen (retouchering, achtergrondverwijdering, etc.) buiten het
              standaardpakket kunnen op verzoek worden uitgevoerd tegen een meerprijs die vooraf
              wordt gecommuniceerd.
            </p>
          </section>

          <section>
            <h2>10. Aansprakelijkheid</h2>
            <p>
              De aansprakelijkheid van de Fotograaf is te allen tijde beperkt tot het factuurbedrag
              van de betreffende opdracht. De Fotograaf is niet aansprakelijk voor:
            </p>
            <ul>
              <li>Gevolgschade, gederfde winst of indirecte schade van welke aard dan ook.</li>
              <li>Verlies of beschadiging van beeldmateriaal door technische storingen, diefstal of andere
                omstandigheden buiten de controle van de Fotograaf. In dergelijke gevallen is de aansprakelijkheid
                beperkt tot terugbetaling van het factuurbedrag.</li>
              <li>Schade of letsel ontstaan tijdens de fotoshoot, tenzij veroorzaakt door aantoonbare nalatigheid
                van de Fotograaf.</li>
            </ul>
          </section>

          <section>
            <h2>11. Privacy en Gegevensbescherming</h2>
            <p>
              De Fotograaf verwerkt persoonsgegevens in overeenstemming met de Algemene Verordening
              Gegevensbescherming (AVG/GDPR). Persoonsgegevens worden uitsluitend gebruikt voor
              het uitvoeren van de overeenkomst en worden niet aan derden verstrekt zonder
              toestemming van de Klant. Zie ons{' '}
              <a href="/privacy-policy/">Privacybeleid</a> voor meer informatie.
            </p>
          </section>

          <section>
            <h2>12. Klachten</h2>
            <p>
              Wij streven ernaar om elk project met de hoogste kwaliteit en zorg af te ronden.
              Mocht u ontevreden zijn over onze dienstverlening of het geleverde Werk, dan vragen
              wij u het volgende klachtenproces te volgen:
            </p>
            <ul>
              <li>Klachten dienen schriftelijk (per e-mail) te worden ingediend binnen 14 dagen na
                levering van het Werk. Na deze termijn wordt de levering als definitief geaccepteerd beschouwd.</li>
              <li>Vermeld in uw klacht duidelijk: uw naam, het projectnummer of de datum van de shoot,
                een gedetailleerde beschrijving van uw klacht, en eventueel beeldmateriaal ter ondersteuning.</li>
              <li>De Fotograaf zal binnen 7 werkdagen de klacht beoordelen en schriftelijk reageren met
                een voorstel tot oplossing.</li>
              <li>Indien de klacht gegrond wordt bevonden, zal de Fotograaf naar redelijkheid een passende
                oplossing bieden, zoals aanvullende bewerking, een gedeeltelijke creditnota, of een nieuwe shoot.</li>
              <li>Klachten die betrekking hebben op de persoonlijke stijl of creatieve keuzes van de Fotograaf
                worden niet als geldig beschouwd, mits het geleverde Werk overeenkomt met wat is overeengekomen.</li>
            </ul>
            <p>
              Klachten kunt u indienen per e-mail via{' '}
              <a href="mailto:info@tigranmedia.be">info@tigranmedia.be</a>.
            </p>
          </section>

          <section>
            <h2>13. Overmacht</h2>
            <p>
              In geval van overmacht (waaronder maar niet beperkt tot ziekte, natuurrampen, extreme
              weersomstandigheden, pandemieën, overheidsmaatregelen, technische storingen) is de
              Fotograaf niet gehouden tot nakoming van de overeenkomst. Partijen zullen in overleg
              een alternatieve datum of oplossing zoeken.
            </p>
          </section>

          <section>
            <h2>14. Toepasselijk Recht en Geschillen</h2>
            <p>
              Op deze overeenkomst is het Belgisch recht van toepassing. Geschillen die voortvloeien
              uit of verband houden met deze overeenkomst zullen in eerste instantie worden opgelost
              via minnelijk overleg. Indien dit niet tot een oplossing leidt, worden geschillen
              voorgelegd aan de bevoegde rechtbank in het gerechtelijk arrondissement waar de Fotograaf
              gevestigd is.
            </p>
          </section>

          <section>
            <h2>15. Wijziging van Voorwaarden</h2>
            <p>
              De Fotograaf behoudt zich het recht voor om deze Algemene Voorwaarden te wijzigen.
              Wijzigingen worden gepubliceerd op de website en zijn van toepassing op alle nieuwe
              overeenkomsten die na publicatie worden gesloten. Bestaande overeenkomsten blijven
              onderworpen aan de voorwaarden die op het moment van ondertekening van kracht waren.
            </p>
          </section>

          <section>
            <h2>Contact</h2>
            <p>
              Voor vragen over deze algemene voorwaarden of om een klacht in te dienen, kunt u
              contact opnemen met:
            </p>
            <p>
              Tigran Media<br />
              E-mail: <a href="mailto:info@tigranmedia.be">info@tigranmedia.be</a><br />
              Telefoon: <a href="tel:+32474114899">+32 474 11 48 99</a><br />
              WhatsApp: <a href="https://wa.me/message/3X4O23SGBQNCC1" target="_blank" rel="noopener noreferrer">Stuur een bericht</a>
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex space-x-6">
          <Link href="/privacy-policy/" className="text-accent text-sm hover:underline">
            Privacybeleid →
          </Link>
          <Link href="/contact/" className="text-accent text-sm hover:underline">
            Contact →
          </Link>
        </div>
      </div>
    </div>
  );
}
