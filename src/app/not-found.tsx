import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center px-6">
        <p className="text-[10rem] md:text-[14rem] font-heading font-bold text-white leading-none">
          404
        </p>
        <p className="text-white/50 text-lg md:text-xl font-body mt-4 mb-10">
          Deze pagina bestaat niet.
        </p>
        <Link
          href="/"
          className="inline-block px-10 py-4 border border-white/30 text-white font-body text-xs uppercase tracking-[0.22em] hover:bg-white hover:text-black transition-all duration-[250ms] ease-out"
        >
          ← Terug naar home
        </Link>
      </div>
    </div>
  );
}
