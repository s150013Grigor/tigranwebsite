'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Ons werk', href: '/portfolio/' },
  { label: 'Wie ik ben', href: '/over-ons/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'FAQ', href: '/faq/' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen, closeMenu]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-primary/95 backdrop-blur-md shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="flex items-center justify-between h-20 xl:h-22 2xl:h-24 3xl:h-28 4xl:h-32 5xl:h-36">
          <Link href="/" className="text-white font-heading font-bold text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl 4xl:text-5xl 5xl:text-6xl tracking-tight hover:opacity-80 transition-opacity">
            Tigran Media
          </Link>

          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12 3xl:space-x-14 4xl:space-x-16 5xl:space-x-20">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm lg:text-[0.9rem] xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl font-body text-white/60 hover:text-white transition-colors duration-[150ms] ease-out tracking-wider uppercase"
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-4">
              <Link
                href="/contact/"
                className="ml-4 px-6 py-2 xl:px-8 xl:py-3 3xl:px-10 3xl:py-4 4xl:px-12 4xl:py-5 border border-white/30 text-white text-sm lg:text-[0.9rem] xl:text-base 2xl:text-lg 3xl:text-xl 4xl:text-2xl 5xl:text-3xl uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-[250ms] ease-out active:scale-[0.98]"
              >
                Samenwerken
              </Link>
            </div>
          </div>

          <button
            ref={buttonRef}
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — CSS grid transition for height:auto animation */}
      <div
        ref={menuRef}
        className={`md:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        } bg-primary-light/98 backdrop-blur-lg border-t border-white/10`}
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => (
              <div
                key={item.href}
                className="transition-all duration-300 ease-out"
                style={{
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transitionDelay: isOpen ? `${index * 80}ms` : '0ms',
                }}
              >
                <Link
                  href={item.href}
                  className="block text-lg font-body text-white/60 hover:text-white transition-colors py-2 tracking-wider"
                  onClick={closeMenu}
                >
                  {item.label}
                </Link>
              </div>
            ))}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                opacity: isOpen ? 1 : 0,
                transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                transitionDelay: isOpen ? `${navItems.length * 80}ms` : '0ms',
              }}
            >
              <Link
                href="/contact/"
                className="inline-block mt-4 px-6 py-3 border border-white/30 text-white text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300"
                onClick={closeMenu}
              >
                Samenwerken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
