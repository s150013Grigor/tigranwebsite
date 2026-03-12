import Image from 'next/image';

export default function Hero() {
  return (
    <section className="fixed top-0 left-0 w-full h-screen min-h-[600px] max-h-[1200px] overflow-hidden z-0">
      {/* Background image mobile — LCP, priority preloaded */}
      <Image
        src="/mobilehero.jpg"
        alt=""
        role="presentation"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center lg:hidden"
      />

      {/* Background image desktop */}
      <Image
        src="/Achtergrond_website.jpg"
        alt=""
        role="presentation"
        fill
        priority
        sizes="100vw"
        className="hidden lg:block object-cover object-[center_60%]"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/[0.45]" />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Bottom fade to page background */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-black to-transparent pointer-events-none z-10" />
    </section>
  );
}
