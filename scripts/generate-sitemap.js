/**
 * Sitemap Generator for Tigran Media
 * 
 * Run: node scripts/generate-sitemap.js
 * Outputs: public/sitemap.xml
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.tigranmedia.be';

// Load content data
const albumsPath = path.join(__dirname, '..', 'src', 'content', 'albums.json');
const photosPath = path.join(__dirname, '..', 'src', 'content', 'photos.json');
const citiesPath = path.join(__dirname, '..', 'src', 'data', 'cities.ts');
const blogDir = path.join(__dirname, '..', 'src', 'content', 'blog');

function getAlbums() {
  return JSON.parse(fs.readFileSync(albumsPath, 'utf-8'));
}

function getPhotos() {
  return JSON.parse(fs.readFileSync(photosPath, 'utf-8'));
}

function getBlogSlugs() {
  return fs.readdirSync(blogDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));
}

function getCitySlugs() {
  const content = fs.readFileSync(citiesPath, 'utf-8');
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  const slugs = [];
  let match;
  while ((match = slugRegex.exec(content)) !== null) {
    slugs.push(match[1]);
  }
  return slugs;
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/portfolio/', priority: '0.9', changefreq: 'weekly' },
    { url: '/over-ons/', priority: '0.8', changefreq: 'monthly' },
    { url: '/blog/', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact/', priority: '0.8', changefreq: 'monthly' },
    { url: '/faq/', priority: '0.7', changefreq: 'monthly' },
    { url: '/terms-of-service/', priority: '0.3', changefreq: 'yearly' },
    { url: '/privacy-policy/', priority: '0.3', changefreq: 'yearly' },
  ];

  // Album pages
  const albums = getAlbums();
  const albumPages = albums.map(a => ({
    url: `/portfolio/${a.slug}/`,
    priority: '0.8',
    changefreq: 'monthly',
  }));

  // Photo pages
  const photos = getPhotos();
  const photoPages = photos.map(p => {
    const album = albums.find(a => a.id === p.albumId);
    const albumSlug = album ? album.slug : p.albumId;
    return {
      url: `/portfolio/${albumSlug}/${p.slug}/`,
      priority: '0.6',
      changefreq: 'monthly',
    };
  });

  // Blog post pages
  const blogSlugs = getBlogSlugs();
  const blogPages = blogSlugs.map(slug => ({
    url: `/blog/${slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
  }));

  // City pages (fotograaf)
  const citySlugs = getCitySlugs();
  const cityPages = citySlugs.map(slug => ({
    url: `/fotograaf/${slug}/`,
    priority: '0.6',
    changefreq: 'monthly',
  }));

  // Variant pages
  const variantComponents = ['hero', 'gallery', 'testimonials', 'cta', 'about', 'contact', 'faq', 'blog-cards', 'footer', 'header'];
  const variantPages = variantComponents.map(comp => ({
    url: `/varianten/${comp}/`,
    priority: '0.4',
    changefreq: 'monthly',
  }));

  // Combine all pages
  const allPages = [
    ...staticPages,
    ...albumPages,
    ...photoPages,
    ...blogPages,
    ...cityPages,
    ...variantPages,
  ];

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  
  console.log(`✅ Sitemap gegenereerd met ${allPages.length} URLs`);
  console.log(`   Opgeslagen in: ${outputPath}`);
  console.log(`   - ${staticPages.length} statische pagina's`);
  console.log(`   - ${albumPages.length} album pagina's`);
  console.log(`   - ${photoPages.length} foto pagina's`);
  console.log(`   - ${blogPages.length} blog pagina's`);
  console.log(`   - ${cityPages.length} stad pagina's`);
  console.log(`   - ${variantPages.length} variant pagina's`);
}

generateSitemap();
