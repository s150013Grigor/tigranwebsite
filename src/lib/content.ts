import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types
export interface Album {
  id: string;
  title: string;
  slug: string;
  description: string;
  coverImage: string;
  category: string;
  featured: boolean;
  order: number;
  photos: string[];
}

export interface Photo {
  id: string;
  title: string;
  slug: string;
  description: string;
  albumId: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  order: number;
  tags: string[];
}

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  content: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

// Albums
export function getAlbums(): Album[] {
  const filePath = path.join(process.cwd(), 'src/content/albums.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const albums: Album[] = JSON.parse(data);
  return albums.sort((a, b) => (a.order || 999) - (b.order || 999));
}

export function getAlbumBySlug(slug: string): Album | undefined {
  return getAlbums().find((album) => album.slug === slug);
}

export function getFeaturedAlbums(): Album[] {
  return getAlbums().filter((album) => album.featured);
}

// Photos
export function getPhotos(): Photo[] {
  const filePath = path.join(process.cwd(), 'src/content/photos.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function getPhotoById(id: string): Photo | undefined {
  return getPhotos().find((photo) => photo.id === id);
}

export function getPhotoBySlug(albumSlug: string, photoSlug: string): Photo | undefined {
  const album = getAlbumBySlug(albumSlug);
  if (!album) return undefined;
  return getPhotos().find(
    (photo) => photo.slug === photoSlug && photo.albumId === album.id
  );
}

export function getPhotosByAlbum(albumId: string): Photo[] {
  return getPhotos().filter((photo) => photo.albumId === albumId)
    .sort((a, b) => {
      // Newest first: sort by createdAt descending, then by order descending
      const aTime = (a as any).createdAt || 0;
      const bTime = (b as any).createdAt || 0;
      if (aTime !== bTime) return bTime - aTime;
      return (b.order || 0) - (a.order || 0);
    });
}

// Blog
export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(blogDir)) return [];
  
  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith('.md'));
  
  const posts = files.map((file) => {
    const filePath = path.join(blogDir, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    
    return {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      coverImage: data.coverImage,
      date: data.date,
      author: data.author,
      category: data.category,
      tags: data.tags || [],
      content,
    } as BlogPost;
  });
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return getBlogPosts().find((post) => post.slug === slug);
}

// FAQ
export function getFAQ(): FAQItem[] {
  const filePath = path.join(process.cwd(), 'src/content/faq.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}
