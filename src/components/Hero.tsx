import Link from 'next/link';

export default function Hero() {
  return (
    <div className="relative min-h-screen flex items-center bg-black">
      <div className="w-full max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16 pt-28 pb-16 lg:pt-32 lg:pb-16">

        <p className="text-white/50 text-xs md:text-sm 2xl:text-base tracking-[0.5em] uppercase mb-8 font-body">
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

        <p className="text-white/50 text-base md:text-lg 2xl:text-xl 3xl:text-2xl 4xl:text-3xl max-w-xl 2xl:max-w-2xl mt-8 mb-10 font-body leading-relaxed">
          Ik maak content die jouw bedrijf er zo uitziet als het eigenlijk is — professioneel, menselijk, en herkenbaar.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 4xl:gap-6">
          <Link
            href="/contact/"
            className="px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 bg-white text-black font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:bg-white/85 transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
          >
            Bekijk of we matchen →
          </Link>
          <Link
            href="/portfolio/"
            className="px-10 py-4 3xl:px-12 3xl:py-5 4xl:px-14 4xl:py-6 border border-white/20 text-white font-body text-xs 3xl:text-sm 4xl:text-base uppercase tracking-[0.22em] hover:border-white hover:text-white transition-all duration-[250ms] ease-out active:scale-[0.98] inline-block"
          >
            Bekijk Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}
