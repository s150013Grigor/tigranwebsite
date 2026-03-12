import { Metadata } from 'next';
import Image from 'next/image';
import CTA from '@/components/CTA';
import { getPhotos } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Portfolio',
  description: 'Bekijk het portfolio van Tigran Media. Professionele fotografie in portretten, evenementen, producten en meer.',
  url: '/portfolio',
});

export default function PortfolioPage() {
  const photos = getPhotos();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Portfolio', url: '/portfolio' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="pt-32 pb-10 bg-black">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
          <div className="text-center">
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase mb-4 font-body">
              Ons Werk
            </p>
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white">
              Portfolio
            </h1>
          </div>
        </div>
      </section>

      <section className="mt-12 pb-20 bg-primary">
        <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-[5px]">
            {photos.map((photo) => (
              <div key={photo.id} className="break-inside-avoid mb-[5px]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  className="w-full h-auto block"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTA
        title="Wilt u ook zulke foto's?"
        description="Neem contact op voor een vrijblijvende offerte en ontdek wat Tigran Media voor u kan betekenen."
      />
    </>
  );
}
