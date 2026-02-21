const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const crypto = require('crypto');

const app = express();
const PORT = 3001;

// ============ CONFIGURATION ============
const AUTH_USERNAME = 'tmedia';
const AUTH_PASSWORD = 'Tik!werk2007';
const JWT_SECRET = crypto.randomBytes(64).toString('hex');
const TOKEN_EXPIRY = 24 * 60 * 60 * 1000; // 24 hours

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '50mb' }));

const CONTENT_DIR = path.join(__dirname, '..', 'src', 'content');

// ============ AUTH HELPERS ============
const tokens = new Map(); // tokenId -> { username, createdAt }

function generateToken() {
  const tokenId = crypto.randomBytes(32).toString('hex');
  tokens.set(tokenId, { username: AUTH_USERNAME, createdAt: Date.now() });
  return tokenId;
}

function validateToken(token) {
  if (!token) return false;
  const session = tokens.get(token);
  if (!session) return false;
  if (Date.now() - session.createdAt > TOKEN_EXPIRY) {
    tokens.delete(token);
    return false;
  }
  return true;
}

// Auth middleware
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!validateToken(token)) {
    return res.status(401).json({ error: 'Niet geautoriseerd. Log opnieuw in.' });
  }
  next();
}

// ============ AUTH ROUTES ============

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
    const token = generateToken();
    res.json({ success: true, token });
  } else {
    res.status(401).json({ error: 'Ongeldige gebruikersnaam of wachtwoord.' });
  }
});

app.get('/api/auth/verify', requireAuth, (req, res) => {
  res.json({ success: true });
});

app.post('/api/auth/logout', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (token) tokens.delete(token);
  res.json({ success: true });
});

// ============ HELPERS ============

function readJSON(filename) {
  const filePath = path.join(CONTENT_DIR, filename);
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

function writeJSON(filename, data) {
  const filePath = path.join(CONTENT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

// ============ ALBUMS ============

app.get('/api/albums', requireAuth, (req, res) => {
  const albums = readJSON('albums.json');
  res.json(albums);
});

app.post('/api/albums', requireAuth, (req, res) => {
  const albums = readJSON('albums.json');
  const newAlbum = {
    id: req.body.id || req.body.slug,
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description,
    coverImage: req.body.coverImage,
    category: req.body.category || '',
    featured: req.body.featured || false,
    photos: req.body.photos || [],
  };

  const existingIndex = albums.findIndex((a) => a.id === newAlbum.id);
  if (existingIndex >= 0) {
    albums[existingIndex] = { ...albums[existingIndex], ...newAlbum };
  } else {
    albums.push(newAlbum);
  }

  writeJSON('albums.json', albums);
  res.json({ success: true, album: newAlbum });
});

app.put('/api/albums/:id', requireAuth, (req, res) => {
  const albums = readJSON('albums.json');
  const index = albums.findIndex((a) => a.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Album niet gevonden.' });

  albums[index] = { ...albums[index], ...req.body };
  writeJSON('albums.json', albums);
  res.json({ success: true, album: albums[index] });
});

app.delete('/api/albums/:id', requireAuth, (req, res) => {
  let albums = readJSON('albums.json');
  albums = albums.filter((a) => a.id !== req.params.id);
  writeJSON('albums.json', albums);
  res.json({ success: true });
});

// ============ PHOTOS ============

app.get('/api/photos', requireAuth, (req, res) => {
  const photos = readJSON('photos.json');
  res.json(photos);
});

app.post('/api/photos', requireAuth, (req, res) => {
  const photos = readJSON('photos.json');
  const newPhoto = {
    id: req.body.id || req.body.slug,
    title: req.body.title,
    slug: req.body.slug,
    description: req.body.description || '',
    albumId: req.body.albumId,
    src: req.body.src,
    alt: req.body.alt || req.body.title,
    width: req.body.width || 1920,
    height: req.body.height || 1280,
    tags: req.body.tags || [],
  };

  const existingIndex = photos.findIndex((p) => p.id === newPhoto.id);
  if (existingIndex >= 0) {
    photos[existingIndex] = { ...photos[existingIndex], ...newPhoto };
  } else {
    photos.push(newPhoto);
  }

  // Also update the album's photos array
  const albums = readJSON('albums.json');
  const album = albums.find((a) => a.id === newPhoto.albumId);
  if (album && !album.photos.includes(newPhoto.id)) {
    album.photos.push(newPhoto.id);
    writeJSON('albums.json', albums);
  }

  writeJSON('photos.json', photos);
  res.json({ success: true, photo: newPhoto });
});

app.put('/api/photos/:id', requireAuth, (req, res) => {
  const photos = readJSON('photos.json');
  const index = photos.findIndex((p) => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Foto niet gevonden.' });

  photos[index] = { ...photos[index], ...req.body };
  writeJSON('photos.json', photos);
  res.json({ success: true, photo: photos[index] });
});

app.delete('/api/photos/:id', requireAuth, (req, res) => {
  let photos = readJSON('photos.json');
  const photo = photos.find((p) => p.id === req.params.id);

  // Remove photo from album
  if (photo) {
    const albums = readJSON('albums.json');
    const album = albums.find((a) => a.id === photo.albumId);
    if (album) {
      album.photos = album.photos.filter((pid) => pid !== req.params.id);
      writeJSON('albums.json', albums);
    }
  }

  photos = photos.filter((p) => p.id !== req.params.id);
  writeJSON('photos.json', photos);
  res.json({ success: true });
});

// ============ BLOG ============

app.get('/api/blog', requireAuth, (req, res) => {
  const blogDir = path.join(CONTENT_DIR, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    return res.json([]);
  }

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.md'));
  const posts = files.map((file) => {
    const content = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = {};
    if (frontmatterMatch) {
      frontmatterMatch[1].split('\n').forEach((line) => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length) {
          frontmatter[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
        }
      });
    }
    const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)/);
    return { ...frontmatter, content: bodyMatch ? bodyMatch[1].trim() : '', filename: file };
  });

  res.json(posts);
});

app.post('/api/blog', requireAuth, (req, res) => {
  const blogDir = path.join(CONTENT_DIR, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  const { title, slug, excerpt, coverImage, category, tags, content } = req.body;
  const postSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const date = new Date().toISOString().split('T')[0];
  const tagsArray = Array.isArray(tags) ? tags : [];

  const markdown = `---
title: "${title}"
slug: "${postSlug}"
excerpt: "${excerpt}"
coverImage: "${coverImage}"
date: "${date}"
author: "Tigran"
category: "${category}"
tags: [${tagsArray.map((t) => `"${t}"`).join(', ')}]
---

${content}
`;

  const filename = `${postSlug}.md`;
  fs.writeFileSync(path.join(blogDir, filename), markdown, 'utf-8');
  res.json({ success: true, slug: postSlug });
});

app.put('/api/blog/:slug', requireAuth, (req, res) => {
  const blogDir = path.join(CONTENT_DIR, 'blog');
  const oldFilename = `${req.params.slug}.md`;
  const oldFilePath = path.join(blogDir, oldFilename);

  if (!fs.existsSync(oldFilePath)) {
    return res.status(404).json({ error: 'Blogpost niet gevonden.' });
  }

  const { title, slug, excerpt, coverImage, category, tags, content } = req.body;
  const newSlug = slug || req.params.slug;
  const date = req.body.date || new Date().toISOString().split('T')[0];
  const tagsArray = Array.isArray(tags) ? tags : [];

  const markdown = `---
title: "${title}"
slug: "${newSlug}"
excerpt: "${excerpt}"
coverImage: "${coverImage}"
date: "${date}"
author: "Tigran"
category: "${category}"
tags: [${tagsArray.map((t) => `"${t}"`).join(', ')}]
---

${content}
`;

  // If slug changed, delete old file
  if (newSlug !== req.params.slug) {
    fs.unlinkSync(oldFilePath);
  }

  const newFilename = `${newSlug}.md`;
  fs.writeFileSync(path.join(blogDir, newFilename), markdown, 'utf-8');
  res.json({ success: true, slug: newSlug });
});

app.delete('/api/blog/:slug', requireAuth, (req, res) => {
  const blogDir = path.join(CONTENT_DIR, 'blog');
  const filename = `${req.params.slug}.md`;
  const filePath = path.join(blogDir, filename);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Post niet gevonden.' });
  }
});

// ============ TESTIMONIALS ============

app.get('/api/testimonials', requireAuth, (req, res) => {
  const testimonials = readJSON('testimonials.json');
  res.json(testimonials);
});

app.post('/api/testimonials', requireAuth, (req, res) => {
  const testimonials = readJSON('testimonials.json');
  const newTestimonial = {
    id: req.body.id || String(Date.now()),
    name: req.body.name,
    title: req.body.title,
    description: req.body.description,
    rating: req.body.rating || 5,
  };

  const existingIndex = testimonials.findIndex((t) => t.id === newTestimonial.id);
  if (existingIndex >= 0) {
    testimonials[existingIndex] = { ...testimonials[existingIndex], ...newTestimonial };
  } else {
    testimonials.push(newTestimonial);
  }

  writeJSON('testimonials.json', testimonials);
  res.json({ success: true, testimonial: newTestimonial });
});

app.put('/api/testimonials/:id', requireAuth, (req, res) => {
  const testimonials = readJSON('testimonials.json');
  const index = testimonials.findIndex((t) => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Getuigenis niet gevonden.' });

  testimonials[index] = { ...testimonials[index], ...req.body };
  writeJSON('testimonials.json', testimonials);
  res.json({ success: true, testimonial: testimonials[index] });
});

app.delete('/api/testimonials/:id', requireAuth, (req, res) => {
  let testimonials = readJSON('testimonials.json');
  testimonials = testimonials.filter((t) => t.id !== req.params.id);
  writeJSON('testimonials.json', testimonials);
  res.json({ success: true });
});

// ============ FAQ ============

app.get('/api/faq', requireAuth, (req, res) => {
  const faqs = readJSON('faq.json');
  res.json(faqs);
});

app.post('/api/faq', requireAuth, (req, res) => {
  const faqs = readJSON('faq.json');
  const newFAQ = {
    id: req.body.id || String(faqs.length + 1),
    question: req.body.question,
    answer: req.body.answer,
  };
  faqs.push(newFAQ);
  writeJSON('faq.json', faqs);
  res.json({ success: true, faq: newFAQ });
});

app.put('/api/faq/:id', requireAuth, (req, res) => {
  const faqs = readJSON('faq.json');
  const index = faqs.findIndex((f) => f.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'FAQ niet gevonden.' });

  faqs[index] = { ...faqs[index], ...req.body };
  writeJSON('faq.json', faqs);
  res.json({ success: true, faq: faqs[index] });
});

app.delete('/api/faq/:id', requireAuth, (req, res) => {
  let faqs = readJSON('faq.json');
  faqs = faqs.filter((f) => f.id !== req.params.id);
  writeJSON('faq.json', faqs);
  res.json({ success: true });
});

// ============ PHOTO UPLOAD (S3 ready) ============

const multer = require('multer');
const sharp = require('sharp');

// Configure local temp upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Alleen JPG, JPEG, PNG en WebP bestanden zijn toegestaan.'));
    }
  },
});

// Image size presets
const IMAGE_SIZES = [
  { name: 'thumbnail', width: 400, height: 300 },
  { name: 'medium', width: 800, height: 600 },
  { name: 'large', width: 1200, height: 900 },
  { name: 'full', width: 1920, height: 1440 },
];

// Local storage fallback (for when S3 is not configured)
const UPLOAD_DIR = path.join(__dirname, '..', 'public', 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

app.post('/api/upload', requireAuth, upload.single('photo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Geen bestand geüpload.' });
    }

    const timestamp = Date.now();
    const baseName = req.body.name || `photo-${timestamp}`;
    const slug = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const results = {};

    // Process each size
    for (const size of IMAGE_SIZES) {
      const filename = `${slug}-${size.name}.webp`;
      const outputPath = path.join(UPLOAD_DIR, filename);

      await sharp(req.file.buffer)
        .resize(size.width, size.height, { fit: 'inside', withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(outputPath);

      // If S3 is configured, upload here
      // For now, use local paths
      results[size.name] = `/uploads/${filename}`;
    }

    res.json({
      success: true,
      files: results,
      originalName: req.file.originalname,
      sizes: IMAGE_SIZES.map((s) => s.name),
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Fout bij verwerken van de afbeelding.' });
  }
});

// Serve uploaded files
app.use('/uploads', express.static(UPLOAD_DIR));

// ============ START SERVER ============

app.listen(PORT, () => {
  console.log(`\n🎨 CMS API Server running at http://localhost:${PORT}`);
  console.log(`📁 Content directory: ${CONTENT_DIR}`);
  console.log(`🔐 Auth required — Login at http://localhost:3000/admin`);
  console.log(`\n   Username: ${AUTH_USERNAME}`);
  console.log(`   Open http://localhost:3000/admin to manage content\n`);
});
