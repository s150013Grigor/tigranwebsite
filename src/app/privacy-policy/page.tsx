import { Metadata } from 'next';
import Link from 'next/link';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Privacybeleid',
  description: 'Privacybeleid van Tigran Media. Lees hoe wij omgaan met uw persoonsgegevens conform de GDPR/AVG.',
  url: '/privacy-policy',
  noIndex: false,
});

export default function PrivacyPolicyPage() {
  return (
    <div className="pt-32 pb-20 bg-primary">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
          <Link href="/" className="hover:text-accent transition-colors">Home</Link>
          <span>/</span>
          <span className="text-white">Privacybeleid</span>
        </nav>

        <h1 className="text-4xl font-heading font-bold text-white mb-8">
          Privacybeleid
        </h1>
        <p className="text-gray-500 text-sm mb-12">Laatst bijgewerkt: januari 2026</p>

        <div className="prose-custom space-y-8">
          <section>
            <h2>1. Inleiding</h2>
            <p>
              Tigran Media hecht groot belang aan de bescherming van uw persoonsgegevens.
              Dit privacybeleid legt uit welke gegevens wij verzamelen, hoe wij deze
              gebruiken en welke rechten u heeft conform de Algemene Verordening
              Gegevensbescherming (AVG/GDPR).
            </p>
          </section>

          <section>
            <h2>2. Verantwoordelijke</h2>
            <p>
              De verantwoordelijke voor de verwerking van uw persoonsgegevens is:
            </p>
            <p>
              Tigran Media<br />
              E-mail: <a href="mailto:info@tigranmedia.be">info@tigranmedia.be</a><br />
              Telefoon: <a href="tel:+32474114899">+32 474 11 48 99</a>
            </p>
          </section>

          <section>
            <h2>3. Welke Gegevens Verzamelen Wij?</h2>
            <p>Wij kunnen de volgende persoonsgegevens verzamelen:</p>
            <ul>
              <li><strong>Contactgegevens:</strong> naam, e-mailadres, telefoonnummer</li>
              <li><strong>Communicatie:</strong> berichten die u via ons contactformulier stuurt</li>
              <li><strong>Technische gegevens:</strong> IP-adres, browsertype, bezochte pagina&apos;s (via cookies)</li>
              <li><strong>Foto&apos;s:</strong> beelden gemaakt tijdens fotoshoots</li>
            </ul>
          </section>

          <section>
            <h2>4. Doel van de Verwerking</h2>
            <p>Wij verwerken uw gegevens voor de volgende doeleinden:</p>
            <ul>
              <li>Het verwerken van uw boeking en het uitvoeren van fotografiediensten</li>
              <li>Communicatie over uw opdracht</li>
              <li>Het versturen van facturen en administratieve afhandeling</li>
              <li>Het verbeteren van onze website en diensten</li>
              <li>Marketing en nieuwsbrieven (alleen met uw toestemming)</li>
            </ul>
          </section>

          <section>
            <h2>5. Rechtsgrond</h2>
            <p>
              Wij verwerken uw persoonsgegevens op basis van:
            </p>
            <ul>
              <li>Uitvoering van een overeenkomst (boekingen en diensten)</li>
              <li>Uw toestemming (marketing, nieuwsbrieven, portfolio gebruik)</li>
              <li>Ons gerechtvaardigd belang (website analytics, beveiliging)</li>
              <li>Wettelijke verplichtingen (facturatie, boekhouding)</li>
            </ul>
          </section>

          <section>
            <h2>6. Bewaartermijn</h2>
            <p>
              Wij bewaren uw persoonsgegevens niet langer dan noodzakelijk voor het doel
              waarvoor ze zijn verzameld. Contactgegevens worden bewaard zolang de
              klantrelatie duurt en maximaal 2 jaar daarna. Boekhoudkundige gegevens
              worden 7 jaar bewaard conform de wettelijke verplichting.
            </p>
          </section>

          <section>
            <h2>7. Delen met Derden</h2>
            <p>
              Wij delen uw persoonsgegevens niet met derden, behalve wanneer dit
              noodzakelijk is voor:
            </p>
            <ul>
              <li>De uitvoering van onze diensten (bijv. online galerij-hosting)</li>
              <li>Wettelijke verplichtingen</li>
              <li>Met uw uitdrukkelijke toestemming</li>
            </ul>
          </section>

          <section>
            <h2>8. Cookies</h2>
            <p>
              Onze website maakt gebruik van cookies om uw surfervaring te verbeteren en
              om inzicht te krijgen in het gebruik van onze website. Wij gebruiken:
            </p>
            <ul>
              <li><strong>Noodzakelijke cookies:</strong> voor het functioneren van de website</li>
              <li><strong>Analytische cookies:</strong> Google Analytics (geanonimiseerd)</li>
              <li><strong>Marketing cookies:</strong> alleen met uw toestemming</li>
            </ul>
          </section>

          <section>
            <h2>9. Uw Rechten</h2>
            <p>U heeft de volgende rechten met betrekking tot uw persoonsgegevens:</p>
            <ul>
              <li><strong>Recht op inzage:</strong> u kunt opvragen welke gegevens wij van u bewaren</li>
              <li><strong>Recht op rectificatie:</strong> u kunt onjuiste gegevens laten corrigeren</li>
              <li><strong>Recht op verwijdering:</strong> u kunt verzoeken uw gegevens te wissen</li>
              <li><strong>Recht op beperking:</strong> u kunt de verwerking laten beperken</li>
              <li><strong>Recht op overdraagbaarheid:</strong> u kunt uw gegevens in een gangbaar formaat ontvangen</li>
              <li><strong>Recht op bezwaar:</strong> u kunt bezwaar maken tegen de verwerking</li>
            </ul>
            <p>
              Om uw rechten uit te oefenen, kunt u contact opnemen via{' '}
              <a href="mailto:info@tigranmedia.be">info@tigranmedia.be</a>. Wij
              reageren binnen 30 dagen op uw verzoek.
            </p>
          </section>

          <section>
            <h2>10. Beveiliging</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om uw
              persoonsgegevens te beschermen tegen ongeoorloofde toegang, verlies of
              misbruik.
            </p>
          </section>

          <section>
            <h2>11. Klachten</h2>
            <p>
              Indien u een klacht heeft over de verwerking van uw persoonsgegevens, kunt
              u contact opnemen met de Gegevensbeschermingsautoriteit (GBA):
            </p>
            <p>
              Gegevensbeschermingsautoriteit<br />
              Drukpersstraat 35, 1000 Brussel<br />
              <a href="https://www.gegevensbeschermingsautoriteit.be" target="_blank" rel="noopener noreferrer">
                www.gegevensbeschermingsautoriteit.be
              </a>
            </p>
          </section>

          <section>
            <h2>12. Wijzigingen</h2>
            <p>
              Wij behouden ons het recht voor dit privacybeleid te wijzigen. De meest
              recente versie is altijd beschikbaar op onze website. Bij belangrijke
              wijzigingen informeren wij u per e-mail.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex space-x-6">
          <Link href="/terms-of-service/" className="text-accent text-sm hover:underline">
            Algemene Voorwaarden →
          </Link>
          <Link href="/contact/" className="text-accent text-sm hover:underline">
            Contact →
          </Link>
        </div>
      </div>
    </div>
  );
}
