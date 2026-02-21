const { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command, CopyObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { CodeBuildClient, StartBuildCommand, BatchGetBuildsCommand } = require('@aws-sdk/client-codebuild');
const crypto = require('crypto');

// ============ CONFIG ============
const AUTH_USERNAME = process.env.AUTH_USERNAME || 'tmedia';
const AUTH_PASSWORD = process.env.AUTH_PASSWORD || 'Tik!werk2007';
const JWT_SECRET = process.env.JWT_SECRET || 'tigranmedia-cms-secret-key-2024';
const BUCKET_NAME = process.env.CMS_BUCKET;
const CONTENT_PREFIX = 'cms-data/';
const CODEBUILD_PROJECT = process.env.CODEBUILD_PROJECT || 'tigranmedia-deploy';

const s3 = new S3Client({});
const codebuild = new CodeBuildClient({});

// ============ HELPERS ============

function createToken(username) {
  const payload = { username, iat: Date.now(), exp: Date.now() + 24 * 60 * 60 * 1000 };
  const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
  return `${data}.${signature}`;
}

function verifyToken(token) {
  if (!token) return false;
  try {
    const [data, signature] = token.split('.');
    const expectedSig = crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
    if (signature !== expectedSig) return false;
    const payload = JSON.parse(Buffer.from(data, 'base64url').toString());
    if (Date.now() > payload.exp) return false;
    return true;
  } catch {
    return false;
  }
}

function getTokenFromHeaders(headers) {
  const auth = headers?.authorization || headers?.Authorization || '';
  return auth.startsWith('Bearer ') ? auth.slice(7) : null;
}

async function readS3JSON(key) {
  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: `${CONTENT_PREFIX}${key}` }));
    const body = await res.Body.transformToString();
    return JSON.parse(body);
  } catch (e) {
    if (e.name === 'NoSuchKey' || e.$metadata?.httpStatusCode === 404) return [];
    throw e;
  }
}

async function writeS3JSON(key, data) {
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: `${CONTENT_PREFIX}${key}`,
    Body: JSON.stringify(data, null, 2),
    ContentType: 'application/json',
  }));
}

async function deleteS3Object(key) {
  await s3.send(new DeleteObjectCommand({ Bucket: BUCKET_NAME, Key: `${CONTENT_PREFIX}${key}` }));
}

function response(statusCode, body, extraHeaders = {}) {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      ...extraHeaders,
    },
    body: JSON.stringify(body),
  };
}

// ============ ROUTE HANDLERS ============

async function handleAuth(method, path, body) {
  if (path === '/api/cms/auth/login' && method === 'POST') {
    const { username, password } = body || {};
    if (username === AUTH_USERNAME && password === AUTH_PASSWORD) {
      return response(200, { success: true, token: createToken(username) });
    }
    return response(401, { error: 'Ongeldige gebruikersnaam of wachtwoord.' });
  }
  if (path === '/api/cms/auth/verify' && method === 'GET') {
    return response(200, { success: true });
  }
  if (path === '/api/cms/auth/logout' && method === 'POST') {
    return response(200, { success: true });
  }
  return response(404, { error: 'Not found' });
}

async function handleCRUD(resource, method, id, body) {
  const filename = `${resource}.json`;

  if (method === 'GET') {
    const data = await readS3JSON(filename);
    return response(200, data);
  }

  if (method === 'POST') {
    const data = await readS3JSON(filename);
    let newItem;

    if (resource === 'albums') {
      newItem = {
        id: body.id || body.slug,
        title: body.title,
        slug: body.slug,
        description: body.description,
        coverImage: body.coverImage,
        category: body.category || '',
        featured: body.featured || false,
        order: body.order || 0,
        photos: body.photos || [],
      };
    } else if (resource === 'photos') {
      newItem = {
        id: body.id || body.slug,
        title: body.title,
        slug: body.slug,
        description: body.description || '',
        albumId: body.albumId,
        src: body.src,
        alt: body.alt || body.title,
        width: body.width || 1920,
        height: body.height || 1280,
        order: body.order || 0,
        createdAt: body.createdAt || Date.now(),
        tags: body.tags || [],
      };
      // Update album's photos array
      if (newItem.albumId) {
        const albums = await readS3JSON('albums.json');
        const album = albums.find(a => a.id === newItem.albumId);
        if (album && !album.photos.includes(newItem.id)) {
          album.photos.push(newItem.id);
          await writeS3JSON('albums.json', albums);
        }
      }
    } else if (resource === 'testimonials') {
      newItem = {
        id: body.id || String(Date.now()),
        name: body.name,
        title: body.title,
        description: body.description,
        rating: body.rating || 5,
      };
    } else if (resource === 'faq') {
      newItem = {
        id: body.id || String(data.length + 1),
        question: body.question,
        answer: body.answer,
      };
    } else {
      newItem = { id: body.id || String(Date.now()), ...body };
    }

    const existingIndex = data.findIndex(item => item.id === newItem.id);
    if (existingIndex >= 0) {
      data[existingIndex] = { ...data[existingIndex], ...newItem };
    } else {
      data.push(newItem);
    }

    await writeS3JSON(filename, data);
    return response(200, { success: true, [resource.slice(0, -1)]: newItem });
  }

  if (method === 'PUT' && id) {
    const data = await readS3JSON(filename);
    const index = data.findIndex(item => item.id === id);
    if (index === -1) return response(404, { error: 'Item niet gevonden.' });
    data[index] = { ...data[index], ...body };
    await writeS3JSON(filename, data);
    return response(200, { success: true, [resource.slice(0, -1)]: data[index] });
  }

  if (method === 'DELETE' && id) {
    let data = await readS3JSON(filename);

    // If deleting a photo, also remove from album
    if (resource === 'photos') {
      const photo = data.find(p => p.id === id);
      if (photo && photo.albumId) {
        const albums = await readS3JSON('albums.json');
        const album = albums.find(a => a.id === photo.albumId);
        if (album) {
          album.photos = album.photos.filter(pid => pid !== id);
          await writeS3JSON('albums.json', albums);
        }
      }
    }

    data = data.filter(item => item.id !== id);
    await writeS3JSON(filename, data);
    return response(200, { success: true });
  }

  return response(400, { error: 'Invalid method' });
}

async function handleBlog(method, slug, body) {
  const blogPrefix = `${CONTENT_PREFIX}blog/`;

  if (method === 'GET') {
    try {
      const listRes = await s3.send(new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: blogPrefix,
      }));
      const posts = [];
      for (const obj of (listRes.Contents || [])) {
        if (!obj.Key.endsWith('.md')) continue;
        const getRes = await s3.send(new GetObjectCommand({ Bucket: BUCKET_NAME, Key: obj.Key }));
        const content = await getRes.Body.transformToString();
        const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
        const frontmatter = {};
        if (frontmatterMatch) {
          frontmatterMatch[1].split('\n').forEach(line => {
            const [key, ...valueParts] = line.split(':');
            if (key && valueParts.length) {
              const rawValue = valueParts.join(':').trim();
              const k = key.trim();
              // Parse tags as a proper array
              if (k === 'tags') {
                const tagMatch = rawValue.match(/\[([^\]]*)\]/);
                if (tagMatch) {
                  frontmatter[k] = tagMatch[1].split(',').map(t => t.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
                } else {
                  frontmatter[k] = [];
                }
              } else {
                frontmatter[k] = rawValue.replace(/^["']|["']$/g, '');
              }
            }
          });
        }
        const bodyMatch = content.match(/^---\n[\s\S]*?\n---\n?([\s\S]*)/);
        posts.push({ ...frontmatter, content: bodyMatch ? bodyMatch[1].trim() : '', filename: obj.Key.split('/').pop() });
      }
      return response(200, posts);
    } catch {
      return response(200, []);
    }
  }

  if (method === 'POST' || (method === 'PUT' && slug)) {
    const { title, excerpt, category, tags, content } = body;
    const coverImage = (body.coverImage || '').trim();
    const postSlug = body.slug || slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const date = body.date || new Date().toISOString().split('T')[0];
    const tagsArray = Array.isArray(tags) ? tags : [];

    const markdown = `---
title: "${title}"
slug: "${postSlug}"
excerpt: "${excerpt}"
coverImage: "${coverImage}"
date: "${date}"
author: "Tigran"
category: "${category}"
tags: [${tagsArray.map(t => `"${t}"`).join(', ')}]
---

${content}
`;

    // If updating with new slug, delete old file
    if (method === 'PUT' && slug && slug !== postSlug) {
      await deleteS3Object(`blog/${slug}.md`);
    }

    await s3.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `${CONTENT_PREFIX}blog/${postSlug}.md`,
      Body: markdown,
      ContentType: 'text/markdown',
    }));

    return response(200, { success: true, slug: postSlug });
  }

  if (method === 'DELETE' && slug) {
    await deleteS3Object(`blog/${slug}.md`);
    return response(200, { success: true });
  }

  return response(400, { error: 'Invalid method' });
}

async function handleUploadUrl(body) {
  if (!body || !body.fileName || !body.contentType) {
    return response(400, { error: 'fileName en contentType zijn verplicht.' });
  }

  const timestamp = Date.now();
  const baseName = body.name || body.fileName.split('.')[0] || `photo-${timestamp}`;
  const slug = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const ext = body.fileName.split('.').pop()?.toLowerCase() || 'jpg';
  const key = `uploads/${slug}-${timestamp}.${ext}`;

  // Generate presigned PUT URL (valid for 5 minutes)
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    ContentType: body.contentType,
  });
  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 });
  const fileUrl = `https://${BUCKET_NAME}/${key}`;

  return response(200, {
    success: true,
    uploadUrl,
    fileUrl,
    key,
  });
}

// Legacy base64 upload (for small files)
async function handleUpload(body) {
  if (!body || !body.fileData || !body.fileName) {
    return response(400, { error: 'Geen bestand geüpload. Stuur fileData (base64) en fileName.' });
  }

  const timestamp = Date.now();
  const baseName = body.name || body.fileName.split('.')[0] || `photo-${timestamp}`;
  const slug = baseName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  // Decode base64 image
  const imageBuffer = Buffer.from(body.fileData, 'base64');

  // Store original in S3
  const key = `uploads/${slug}-${timestamp}.webp`;
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: imageBuffer,
    ContentType: 'image/webp',
  }));

  const url = `https://${BUCKET_NAME}/${key}`;

  return response(200, {
    success: true,
    files: { full: url },
    originalName: body.fileName,
  });
}

// ============ PUBLISH HANDLER ============

async function handlePublish(method, subPath, body) {
  // POST /api/cms/publish → Trigger CodeBuild (production)
  if (method === 'POST' && !subPath) {
    try {
      const result = await codebuild.send(new StartBuildCommand({
        projectName: CODEBUILD_PROJECT,
        environmentVariablesOverride: [
          { name: 'DEPLOY_TARGET', value: 'production', type: 'PLAINTEXT' },
        ],
      }));

      const buildId = result.build.id;

      return response(200, {
        success: true,
        buildId,
        message: 'Build gestart. De site wordt nu gebouwd en gepubliceerd.',
      });
    } catch (e) {
      console.error('CodeBuild start failed:', e);
      return response(500, {
        error: 'Kan build niet starten. Zorg ervoor dat deploy.ps1 minstens één keer is uitgevoerd.',
        details: e.message,
      });
    }
  }

  // GET /api/cms/publish/status/{buildId} → Check build status
  if (method === 'GET' && subPath) {
    try {
      const buildId = decodeURIComponent(subPath);
      const result = await codebuild.send(new BatchGetBuildsCommand({
        ids: [buildId],
      }));

      if (!result.builds || result.builds.length === 0) {
        return response(404, { error: 'Build niet gevonden.' });
      }

      const build = result.builds[0];
      const phases = (build.phases || []).map(p => ({
        name: p.phaseType,
        status: p.phaseStatus || 'IN_PROGRESS',
        duration: p.durationInSeconds,
      }));

      return response(200, {
        buildId: build.id,
        status: build.buildStatus, // SUCCEEDED, FAILED, IN_PROGRESS, STOPPED
        startTime: build.startTime,
        endTime: build.endTime,
        currentPhase: build.currentPhase,
        phases,
      });
    } catch (e) {
      console.error('CodeBuild status check failed:', e);
      return response(500, { error: 'Kan build status niet ophalen.', details: e.message });
    }
  }

  return response(400, { error: 'Invalid publish request' });
}

// ============ PREVIEW HANDLER ============

async function handlePreview(method, subPath, body) {
  // POST /api/cms/preview → Trigger CodeBuild with DEPLOY_TARGET=preview
  if (method === 'POST' && !subPath) {
    try {
      const result = await codebuild.send(new StartBuildCommand({
        projectName: CODEBUILD_PROJECT,
        environmentVariablesOverride: [
          { name: 'DEPLOY_TARGET', value: 'preview', type: 'PLAINTEXT' },
        ],
      }));

      const buildId = result.build.id;

      return response(200, {
        success: true,
        buildId,
        previewUrl: `https://${BUCKET_NAME}/preview/`,
        message: 'Preview build gestart.',
      });
    } catch (e) {
      console.error('Preview build start failed:', e);
      return response(500, { error: 'Kan preview niet starten.', details: e.message });
    }
  }

  // GET /api/cms/preview/status/{buildId}
  if (method === 'GET' && subPath) {
    try {
      const buildId = decodeURIComponent(subPath);
      const result = await codebuild.send(new BatchGetBuildsCommand({
        ids: [buildId],
      }));

      if (!result.builds || result.builds.length === 0) {
        return response(404, { error: 'Build niet gevonden.' });
      }

      const build = result.builds[0];
      return response(200, {
        buildId: build.id,
        status: build.buildStatus,
        currentPhase: build.currentPhase,
        previewUrl: `https://${BUCKET_NAME}/preview/`,
      });
    } catch (e) {
      console.error('Preview status check failed:', e);
      return response(500, { error: 'Kan preview status niet ophalen.', details: e.message });
    }
  }

  return response(400, { error: 'Invalid preview request' });
}

// ============ ROLLBACK HANDLER ============

async function handleRollback(method) {
  if (method !== 'POST') {
    return response(405, { error: 'Alleen POST is toegestaan.' });
  }

  try {
    // Check if backup exists
    const backupList = await s3.send(new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: 'backup/',
      MaxKeys: 1,
    }));

    if (!backupList.Contents || backupList.Contents.length === 0) {
      return response(400, { error: 'Geen backup gevonden. Er is nog niet eerder gepubliceerd.' });
    }

    // List all backup objects and copy back to root
    let continuationToken;
    let copiedCount = 0;
    do {
      const listRes = await s3.send(new ListObjectsV2Command({
        Bucket: BUCKET_NAME,
        Prefix: 'backup/',
        ContinuationToken: continuationToken,
      }));

      for (const obj of (listRes.Contents || [])) {
        const targetKey = obj.Key.replace(/^backup\//, '');
        if (!targetKey || targetKey.startsWith('cms-data/') || targetKey.startsWith('codebuild/') ||
            targetKey.startsWith('uploads/') || targetKey.startsWith('preview/') || targetKey.startsWith('backup/')) {
          continue;
        }
        await s3.send(new CopyObjectCommand({
          Bucket: BUCKET_NAME,
          Key: targetKey,
          CopySource: `${BUCKET_NAME}/${obj.Key}`,
        }));
        copiedCount++;
      }

      continuationToken = listRes.NextContinuationToken;
    } while (continuationToken);

    return response(200, {
      success: true,
      message: `Rollback succesvol. ${copiedCount} bestanden hersteld.`,
      copiedCount,
    });
  } catch (e) {
    console.error('Rollback failed:', e);
    return response(500, { error: 'Rollback mislukt.', details: e.message });
  }
}

// ============ MAIN HANDLER ============

exports.handler = async (event) => {
  const method = event.requestContext?.http?.method || event.httpMethod || 'GET';
  const path = event.rawPath || event.path || '';

  // Handle CORS preflight
  if (method === 'OPTIONS') {
    return response(200, {});
  }

  // Parse body
  let body = {};
  if (event.body) {
    try {
      body = JSON.parse(event.isBase64Encoded ? Buffer.from(event.body, 'base64').toString() : event.body);
    } catch {
      body = {};
    }
  }

  // Auth routes (no token required for login)
  if (path.startsWith('/api/cms/auth/')) {
    if (path === '/api/cms/auth/login') {
      return handleAuth(method, path, body);
    }
    // All other auth routes require token
    const token = getTokenFromHeaders(event.headers);
    if (!verifyToken(token)) {
      return response(401, { error: 'Niet geautoriseerd. Log opnieuw in.' });
    }
    return handleAuth(method, path, body);
  }

  // All CMS routes require auth
  const token = getTokenFromHeaders(event.headers);
  if (!verifyToken(token)) {
    return response(401, { error: 'Niet geautoriseerd. Log opnieuw in.' });
  }

  // Parse CMS routes: /api/cms/{resource}/{id?}
  const cmsMatch = path.match(/^\/api\/cms\/([\w-]+)(?:\/(.+))?$/);
  if (!cmsMatch) {
    return response(404, { error: 'Route niet gevonden.' });
  }

  const [, resource, id] = cmsMatch;

  // Blog (special handling for markdown)
  if (resource === 'blog') {
    return handleBlog(method, id, body);
  }

  // Upload (presigned URL)
  if (resource === 'upload-url') {
    return handleUploadUrl(body);
  }

  // Upload (legacy base64)
  if (resource === 'upload') {
    return handleUpload(body);
  }

  // Publish (trigger CodeBuild)
  if (resource === 'publish') {
    const subPath = id ? (path.includes('/status/') ? path.split('/status/')[1] : id) : null;
    const isStatusCheck = path.includes('/status/');
    return handlePublish(isStatusCheck ? 'GET' : method, subPath, body);
  }

  // Preview (trigger CodeBuild with preview target)
  if (resource === 'preview') {
    const subPath = id ? (path.includes('/status/') ? path.split('/status/')[1] : id) : null;
    const isStatusCheck = path.includes('/status/');
    return handlePreview(isStatusCheck ? 'GET' : method, subPath, body);
  }

  // Rollback
  if (resource === 'rollback') {
    return handleRollback(method);
  }

  // Standard CRUD
  if (['albums', 'photos', 'testimonials', 'faq'].includes(resource)) {
    return handleCRUD(resource, method, id, body);
  }

  return response(404, { error: 'Onbekende resource.' });
};
