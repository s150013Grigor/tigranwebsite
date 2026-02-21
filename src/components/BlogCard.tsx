'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { HiCalendar, HiArrowRight } from 'react-icons/hi';

interface BlogCardProps {
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  slug: string;
  category: string;
  index?: number;
}

export default function BlogCard({
  title,
  excerpt,
  coverImage,
  date,
  slug,
  category,
  index = 0,
}: BlogCardProps) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${slug}/`} className="block">
        <div className="aspect-[16/10] relative overflow-hidden mb-4">
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 3xl:px-4 3xl:py-1.5 bg-accent text-primary text-xs 3xl:text-sm 4xl:text-base uppercase tracking-wider">
              {category}
            </span>
          </div>
        </div>
        <div className="space-y-3 4xl:space-y-4">
          <div className="flex items-center text-gray-500 text-xs 3xl:text-sm 4xl:text-base">
            <HiCalendar className="w-3.5 h-3.5 3xl:w-4 3xl:h-4 4xl:w-5 4xl:h-5 mr-1.5" />
            {new Date(date).toLocaleDateString('nl-BE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </div>
          <h3 className="text-xl 3xl:text-2xl 4xl:text-3xl font-heading font-semibold text-white group-hover:text-accent transition-colors">
            {title}
          </h3>
          <p className="text-gray-400 text-sm 3xl:text-base 4xl:text-lg leading-relaxed line-clamp-2">
            {excerpt}
          </p>
          <span className="inline-flex items-center text-accent text-sm 3xl:text-base 4xl:text-lg group-hover:gap-3 gap-2 transition-all">
            Lees meer <HiArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
