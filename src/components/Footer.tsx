import Link from 'next/link';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { cities } from '@/data/cities';

const footerNavigation = {
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Wat ik doe', href: '/portfolio/' },
    { name: 'Wie ik ben', href: '/over-ons/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'FAQ', href: '/faq/' },
    { name: 'Samenwerken', href: '/contact/' },
  ],
  legal: [
    { name: 'Algemene Voorwaarden', href: '/terms-of-service/' },
    { name: 'Privacybeleid', href: '/privacy-policy/' },
  ],
  social: [
    { name: 'Instagram', href: 'https://www.instagram.com/tigran.media/', icon: FaInstagram },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/in/tigran-khachatryan-01b67a361/', icon: FaLinkedinIn },
    { name: 'WhatsApp', href: 'https://wa.me/message/3X4O23SGBQNCC1', icon: FaWhatsapp },
  ],
};

// Select a few key cities for footer links
const footerCities = cities.filter((c) =>
  ['antwerpen', 'gent', 'brugge', 'leuven', 'hasselt', 'kortrijk', 'mechelen', 'oostende', 'aalst', 'sint-niklaas', 'genk', 'roeselare'].includes(c.slug)
);

export default function Footer() {
  return (
    <footer className="relative z-10 bg-primary-dark border-t border-white/5">
      {/* Main Footer */}
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16 py-16 3xl:py-20 4xl:py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 4xl:gap-20">
          {/* Brand & Contact */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 text-2xl 3xl:text-3xl 4xl:text-4xl font-heading font-bold text-white tracking-tight">
              Tigran Media
            </Link>
            <p className="text-white/60 text-sm 3xl:text-base 4xl:text-lg leading-relaxed mb-6">
              Content & branding fotograaf in de Kempen. Ik maak foto&rsquo;s die jouw bedrijf er online uitziet zoals het verdient — professioneel, menselijk, en herkenbaar.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@tigranmedia.be"
                className="flex items-center text-white/60 hover:text-white transition-colors duration-[150ms] ease-out text-sm 3xl:text-base 4xl:text-lg"
              >
                <HiMail className="w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 mr-3 text-white/60" />
                info@tigranmedia.be
              </a>
              <a
                href="tel:+32474114899"
                className="flex items-center text-white/60 hover:text-white transition-colors duration-[150ms] ease-out text-sm 3xl:text-base 4xl:text-lg"
              >
                <HiPhone className="w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 mr-3 text-white/60" />
                +32 474 11 48 99
              </a>
              <div className="flex items-center text-white/60 text-sm 3xl:text-base 4xl:text-lg">
                <HiLocationMarker className="w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 mr-3 text-white/60" />
                Vlaanderen, België
              </div>
            </div>
            {/* Social */}
            <div className="flex space-x-4 mt-6">
              {footerNavigation.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 3xl:w-12 3xl:h-12 4xl:w-14 4xl:h-14 flex items-center justify-center border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-all duration-300"
                  aria-label={item.name}
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-heading text-lg 3xl:text-xl 4xl:text-2xl mb-6">Navigatie</h3>
            <ul className="space-y-3">
              {footerNavigation.pages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-white font-heading text-lg 3xl:text-xl 4xl:text-2xl mb-4 mt-8">Juridisch</h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* City Pages */}
          <div>
            <h3 className="text-white font-heading text-lg 3xl:text-xl 4xl:text-2xl mb-6">Fotograaf in</h3>
            <ul className="space-y-2">
              {footerCities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/fotograaf/${city.slug}/`}
                    className="text-white/60 hover:text-white transition-colors text-sm"
                  >
                    Fotograaf {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/50 text-xs">
              &copy; {new Date().getFullYear()} Tigran Media. Alle rechten voorbehouden.
            </p>
            <p className="text-white/40 text-xs">
              Gemaakt door{' '}
              <a
                href="https://webzley.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 hover:text-white transition-colors"
              >
                Webzley
              </a>
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms-of-service/"
                className="text-white/50 hover:text-white transition-colors text-xs"
              >
                Algemene Voorwaarden
              </Link>
              <Link
                href="/privacy-policy/"
                className="text-white/50 hover:text-white transition-colors text-xs"
              >
                Privacybeleid
              </Link>
              <Link
                href="/portfolio/"
                className="text-white/50 hover:text-white transition-colors text-xs"
              >
                Portfolio
              </Link>
              <Link
                href="/blog/"
                className="text-white/50 hover:text-white transition-colors text-xs"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
