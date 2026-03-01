import Link from 'next/link';
import { HiMail, HiPhone, HiLocationMarker } from 'react-icons/hi';
import { FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa';
import { cities } from '@/data/cities';

const footerNavigation = {
  pages: [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio/' },
    { name: 'Over Ons', href: '/over-ons/' },
    { name: 'Blog', href: '/blog/' },
    { name: 'FAQ', href: '/faq/' },
    { name: 'Contact', href: '/contact/' },
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
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl 3xl:text-3xl 4xl:text-4xl font-heading font-bold text-white tracking-wider">
                TIGRAN
              </span>
              <span className="text-sm 3xl:text-base 4xl:text-lg font-body text-accent tracking-[0.3em] uppercase ml-2">
                Media
              </span>
            </Link>
            <p className="text-gray-400 text-sm 3xl:text-base 4xl:text-lg leading-relaxed mb-6">
              Content & branding fotograaf in Vlaanderen. Gespecialiseerd in website, social media en rebrandingfotografie voor bedrijven.
            </p>
            <div className="space-y-3">
              <a
                href="mailto:info@tigranmedia.be"
                className="flex items-center text-gray-400 hover:text-accent transition-colors text-sm 3xl:text-base 4xl:text-lg"
              >
                <HiMail className="w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 mr-3 text-accent" />
                info@tigranmedia.be
              </a>
              <a
                href="tel:+32474114899"
                className="flex items-center text-gray-400 hover:text-accent transition-colors text-sm 3xl:text-base 4xl:text-lg"
              >
                <HiPhone className="w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 mr-3 text-accent" />
                +32 474 11 48 99
              </a>
              <div className="flex items-center text-gray-400 text-sm 3xl:text-base 4xl:text-lg">
                <HiLocationMarker className="w-4 h-4 3xl:w-5 3xl:h-5 4xl:w-6 4xl:h-6 mr-3 text-accent" />
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
                  className="w-10 h-10 3xl:w-12 3xl:h-12 4xl:w-14 4xl:h-14 flex items-center justify-center border border-white/10 text-gray-400 hover:text-accent hover:border-accent transition-all duration-300"
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
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
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
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
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
                    className="text-gray-400 hover:text-accent transition-colors text-sm"
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
            <p className="text-gray-500 text-xs">
              &copy; {new Date().getFullYear()} Tigran Media. Alle rechten voorbehouden.
            </p>
            <p className="text-gray-600 text-xs">
              Gemaakt door{' '}
              <a
                href="https://webzley.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-accent transition-colors"
              >
                Webzley
              </a>
            </p>
            <div className="flex space-x-6">
              <Link
                href="/terms-of-service/"
                className="text-gray-500 hover:text-accent transition-colors text-xs"
              >
                Algemene Voorwaarden
              </Link>
              <Link
                href="/privacy-policy/"
                className="text-gray-500 hover:text-accent transition-colors text-xs"
              >
                Privacybeleid
              </Link>
              <Link
                href="/portfolio/"
                className="text-gray-500 hover:text-accent transition-colors text-xs"
              >
                Portfolio
              </Link>
              <Link
                href="/blog/"
                className="text-gray-500 hover:text-accent transition-colors text-xs"
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
