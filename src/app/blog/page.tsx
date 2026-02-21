import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import Parallax from '@/components/Parallax';
import { getBlogPosts } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { generateBreadcrumbSchema } from '@/lib/structured-data';

export const metadata: Metadata = generateSEO({
  title: 'Blog',
  description: 'Lees de nieuwste artikelen over fotografie, tips voor fotoshoots, de beste fotolocaties in Vlaanderen en meer op de Tigran Media blog.',
  url: '/blog',
});

export default function BlogPage() {
  const posts = getBlogPosts();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
  ]);

  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero */}
      <Parallax
        backgroundImage="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=800&fit=crop"
        speed={0.3}
        overlayOpacity={0.65}
        height="60vh"
      >
        <div className="text-center px-4">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-4 font-body">
            Insights & Tips
          </p>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-4">
            Blog
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Tips, verhalen en inspiratie uit de wereld van professionele fotografie.
          </p>
        </div>
      </Parallax>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 3xl:py-28 4xl:py-36 bg-primary">
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
            <Link href={`/blog/${featuredPost.slug}/`} className="group block">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="aspect-[16/10] relative overflow-hidden">
                  <Image
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-accent text-primary text-xs uppercase tracking-wider">
                      Uitgelicht
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <span className="text-accent text-sm tracking-wider uppercase">
                    {featuredPost.category}
                  </span>
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-white group-hover:text-accent transition-colors">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {new Date(featuredPost.date).toLocaleDateString('nl-BE', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <span className="inline-block text-accent text-sm uppercase tracking-wider group-hover:underline">
                    Lees meer →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Other Posts */}
      {otherPosts.length > 0 && (
        <section className="py-20 3xl:py-28 4xl:py-36 bg-primary-light">
          <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 4xl:gap-12">
              {otherPosts.map((post, index) => (
                <BlogCard
                  key={post.slug}
                  title={post.title}
                  excerpt={post.excerpt}
                  coverImage={post.coverImage}
                  date={post.date}
                  slug={post.slug}
                  category={post.category}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
