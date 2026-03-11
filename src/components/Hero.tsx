import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[1200px] overflow-hidden">
      {/* Background image — LCP, not lazy-loaded */}
      <picture>
        <source srcSet="/DSCF6090-2.webp" type="image/webp" />
        <img
          src="/DSCF6090-2.jpg"
          alt=""
          role="presentation"
          width={1400}
          height={2100}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
        />
      </picture>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/[0.65]" />

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

      {/* Content — bottom-left aligned */}
      <div className="relative z-20 h-full flex items-end">
        <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-6 sm:px-10 lg:px-20 2xl:px-24 4xl:px-28 pb-20 md:pb-24 lg:pb-20">

          <p className="text-white/60 text-xs md:text-sm 2xl:text-base tracking-[0.5em] uppercase mb-8 font-body">
            Content &amp; Branding Fotografie
          </p>

          <h1 className="font-heading font-bold leading-[1.05] tracking-[-0.02em] mb-2">
            <span className="block text-white text-[2.5rem] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-[7rem] 5xl:text-[8.5rem]">
              Stockfoto&apos;s kosten je klanten.
            </span>
            <span className="block text-white/80 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl 2xl:text-7xl 3xl:text-8xl 4xl:text-[7rem] 5xl:text-[8.5rem] mt-1">
              Echte foto&apos;s brengen ze.
            </span>
          </h1>

          <p className="text-white/60 text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl max-w-xl 2xl:max-w-2xl mt-8 mb-10 font-body leading-relaxed">
            Ik maak content die jouw bedrijf er zo uitziet als het eigenlijk is — professioneel, menselijk, en herkenbaar.
          </p>

          <Link
            href="/contact/"
            className="px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 bg-white text-black font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:bg-white/85 transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
          >
            Bekijk of we matchen →
          </Link>
        </div>
      </div>
    </section>
  );
}
