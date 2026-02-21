import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { getBlogPosts, getBlogPostBySlug } from '@/lib/content';
import { generateSEO } from '@/lib/seo';
import { generateArticleSchema, generateBreadcrumbSchema } from '@/lib/structured-data';

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return {};

  return generateSEO({
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    url: `/blog/${post.slug}`,
    type: 'article',
    article: {
      publishedTime: post.date,
      author: post.author,
      tags: post.tags,
    },
  });
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug);
  if (!post) return <div className="pt-32 text-center text-white">Bericht niet gevonden</div>;

  const allPosts = getBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = generateArticleSchema({
    title: post.title,
    description: post.excerpt,
    image: post.coverImage,
    datePublished: post.date,
    author: post.author,
    url: `/blog/${post.slug}`,
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pt-24 bg-primary">
        {/* Hero Image */}
        <div className="relative h-[50vh] w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          {/* Meta */}
          <div className="mb-8">
            <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog/" className="hover:text-accent transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-white truncate">{post.title}</span>
            </nav>

            <span className="text-accent text-sm tracking-wider uppercase">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white mt-2 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-500 text-sm">
              <span>Door {post.author}</span>
              <span>•</span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('nl-BE', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-surface text-accent text-xs uppercase tracking-wider border border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="prose-custom pb-16">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Author Bio */}
          <div className="border-t border-white/10 py-8 mb-16">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center">
                <span className="text-accent text-xl font-bold">T</span>
              </div>
              <div>
                <p className="text-white font-heading text-lg">Tigran</p>
                <p className="text-gray-400 text-sm">
                  Professionele fotograaf in Vlaanderen. Gepassioneerd door het vastleggen van momenten.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-16 bg-primary-light">
            <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
              <h2 className="text-2xl 3xl:text-3xl 4xl:text-4xl font-heading font-bold text-white mb-8 text-center">
                Gerelateerde Artikelen
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relPost) => (
                  <Link
                    key={relPost.slug}
                    href={`/blog/${relPost.slug}/`}
                    className="group block"
                  >
                    <div className="aspect-[16/10] relative overflow-hidden mb-4">
                      <Image
                        src={relPost.coverImage}
                        alt={relPost.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <h3 className="text-white font-heading text-lg group-hover:text-accent transition-colors">
                      {relPost.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(relPost.date).toLocaleDateString('nl-BE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </>
  );
}
