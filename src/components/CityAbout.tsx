import Image from 'next/image';

interface CityAboutProps {
  cityName: string;
  text: string;
}

export default function CityAbout({ cityName, text }: CityAboutProps) {
  return (
    <section className="py-20 3xl:py-28 4xl:py-36 bg-primary">
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photographer Image */}
          <div
            className="relative aspect-[3/4] max-h-[500px] overflow-hidden bg-primary"
            style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}
          >
            <Image
              src="/Zelfportret8feb2026.jpg"
              alt={`Fotograaf in ${cityName} — Tigran Media`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Text Content */}
          <div>
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase mb-4 font-body">
              Lokale Expertise
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
              Mijn Werk in {cityName}
            </h2>
            <div className="text-white leading-relaxed space-y-4">
              {text.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
