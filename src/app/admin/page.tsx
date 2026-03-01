'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { HiPhotograph, HiDocumentText, HiCollection, HiCog, HiHome, HiStar, HiUpload, HiPencil, HiTrash, HiX, HiInformationCircle, HiCloudUpload, HiExternalLink, HiRefresh, HiCheck, HiExclamation, HiEye, HiRewind, HiChevronUp, HiChevronDown, HiQuestionMarkCircle } from 'react-icons/hi';
import Link from 'next/link';

type Tab = 'dashboard' | 'albums' | 'photos' | 'blog' | 'testimonials' | 'faq' | 'settings';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

export default function AdminPage() {
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, token: null });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [notification, setNotification] = useState<string | null>(null);

  // Publish state
  const [publishing, setPublishing] = useState(false);
  const [publishStatus, setPublishStatus] = useState<'idle' | 'starting' | 'building' | 'success' | 'error'>('idle');
  const [buildId, setBuildId] = useState<string | null>(null);
  const [buildPhase, setBuildPhase] = useState<string>('');
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preview state
  const [previewing, setPreviewing] = useState(false);
  const [previewStatus, setPreviewStatus] = useState<'idle' | 'starting' | 'building' | 'success' | 'error'>('idle');
  const [previewBuildId, setPreviewBuildId] = useState<string | null>(null);
  const [previewPhase, setPreviewPhase] = useState<string>('');
  const previewPollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Rollback state
  const [rollingBack, setRollingBack] = useState(false);

  // API routes
  const isProduction = typeof window !== 'undefined' && window.location.hostname !== 'localhost';
  const apiBase = isProduction ? '/api/cms' : 'http://localhost:3001/api';

  // Data lists
  const [albums, setAlbums] = useState<any[]>([]);
  const [photos, setPhotos] = useState<any[]>([]);
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);

  // Editing states
  const [editingItem, setEditingItem] = useState<any>(null);
  const [editType, setEditType] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // Form states
  const [albumForm, setAlbumForm] = useState({ id: '', title: '', slug: '', description: '', coverImage: '', category: '', featured: false, order: 0 });
  const [albumCoverFile, setAlbumCoverFile] = useState<File | null>(null);
  const [albumCoverUploading, setAlbumCoverUploading] = useState(false);
  const [photoForm, setPhotoForm] = useState({ id: '', title: '', slug: '', description: '', albumId: '', src: '', alt: '', width: 1920, height: 1280, tags: '' });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoSourceMode, setPhotoSourceMode] = useState<'url' | 'upload'>('upload');
  const [blogForm, setBlogForm] = useState({ title: '', slug: '', excerpt: '', coverImage: '', category: '', tags: '', content: '' });
  const [testimonialForm, setTestimonialForm] = useState({ id: '', name: '', title: '', description: '', rating: 5 });
  const [faqForm, setFaqForm] = useState({ id: '', question: '', answer: '' });

  // Album photo upload state
  const [albumUploadTarget, setAlbumUploadTarget] = useState<string | null>(null);
  const [albumUploadFile, setAlbumUploadFile] = useState<File | null>(null);
  const [albumUploadName, setAlbumUploadName] = useState('');
  const [albumUploadAlt, setAlbumUploadAlt] = useState('');
  const [albumUploading, setAlbumUploading] = useState(false);

  // Photo filter
  const [photoFilter, setPhotoFilter] = useState<string>('all');

  // Custom confirm modal (replaces native confirm() which some browsers block)
  const [confirmModal, setConfirmModal] = useState<{ message: string; onConfirm: () => void } | null>(null);
  const showConfirm = (message: string, onConfirm: () => void) => setConfirmModal({ message, onConfirm });

  useEffect(() => {
    const storedToken = localStorage.getItem('cms_token');
    if (storedToken) verifyToken(storedToken);
  }, []);

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
      if (previewPollRef.current) clearInterval(previewPollRef.current);
    };
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch(`${apiBase}/auth/verify`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) {
        setAuth({ isLoggedIn: true, token });
        localStorage.setItem('cms_token', token);
      } else {
        localStorage.removeItem('cms_token');
      }
    } catch { localStorage.removeItem('cms_token'); }
  };

  const handleLogin = async () => {
    setLoginError(null);
    try {
      const res = await fetch(`${apiBase}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAuth({ isLoggedIn: true, token: data.token });
        localStorage.setItem('cms_token', data.token);
      } else {
        setLoginError(data.error || 'Inloggen mislukt.');
      }
    } catch { setLoginError('Kan niet verbinden met CMS server.'); }
  };

  const handleLogout = async () => {
    if (auth.token) {
      try { await fetch(`${apiBase}/auth/logout`, { method: 'POST', headers: { Authorization: `Bearer ${auth.token}` } }); } catch { /* ignore */ }
    }
    setAuth({ isLoggedIn: false, token: null });
    localStorage.removeItem('cms_token');
  };

  const authHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${auth.token}`,
  }), [auth.token]);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // ============ DATA LOADING ============

  const loadData = useCallback(async () => {
    if (!auth.isLoggedIn) return;
    try {
      const [albumsRes, photosRes, blogRes, testimonialsRes, faqRes] = await Promise.all([
        fetch(`${apiBase}/albums`, { headers: { Authorization: `Bearer ${auth.token}` } }),
        fetch(`${apiBase}/photos`, { headers: { Authorization: `Bearer ${auth.token}` } }),
        fetch(`${apiBase}/blog`, { headers: { Authorization: `Bearer ${auth.token}` } }),
        fetch(`${apiBase}/testimonials`, { headers: { Authorization: `Bearer ${auth.token}` } }),
        fetch(`${apiBase}/faq`, { headers: { Authorization: `Bearer ${auth.token}` } }),
      ]);
      if (albumsRes.ok) setAlbums(await albumsRes.json());
      if (photosRes.ok) setPhotos(await photosRes.json());
      if (blogRes.ok) setBlogPosts(await blogRes.json());
      if (testimonialsRes.ok) setTestimonials(await testimonialsRes.json());
      if (faqRes.ok) setFaqs(await faqRes.json());
    } catch { notify('Kan data niet laden.'); }
  }, [auth.isLoggedIn, auth.token, apiBase]);

  useEffect(() => { if (auth.isLoggedIn) loadData(); }, [auth.isLoggedIn, loadData]);

  // ============ IMAGE COMPRESSION ============

  const compressImage = (file: File, maxWidth = 2400, quality = 0.95): Promise<File> => {
    return new Promise((resolve) => {
      // Skip non-image files
      if (!file.type.startsWith('image/')) { resolve(file); return; }
      const img = new window.Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          const ratio = maxWidth / width;
          width = maxWidth;
          height = Math.round(height * ratio);
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              // Always output as .webp
              const webpName = file.name.replace(/\.[^.]+$/, '.webp');
              const compressed = new File([blob], webpName, { type: 'image/webp' });
              console.log(`Compressed: ${(file.size / 1024).toFixed(0)}KB → ${(compressed.size / 1024).toFixed(0)}KB (WebP ${Math.round(quality * 100)}%)`);
              resolve(compressed);
            } else {
              resolve(file);
            }
          },
          'image/webp',
          quality
        );
      };
      img.onerror = () => resolve(file);
      img.src = URL.createObjectURL(file);
    });
  };

  // ============ FILE UPLOAD HELPER (Presigned URL) ============

  const uploadFileToS3 = async (file: File, name?: string): Promise<string | null> => {
    try {
      // Compress image before upload
      const compressedFile = await compressImage(file);

      // Step 1: Get presigned URL from Lambda
      const res = await fetch(`${apiBase}/upload-url`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${auth.token}` },
        body: JSON.stringify({
          fileName: compressedFile.name,
          contentType: compressedFile.type || 'image/webp',
          name: name || file.name.split('.')[0],
        }),
      });
      if (!res.ok) {
        console.error('Failed to get upload URL:', res.status);
        return null;
      }
      const data = await res.json();
      if (!data.uploadUrl || !data.fileUrl) return null;

      // Step 2: Upload file directly to S3 using presigned URL
      const uploadRes = await fetch(data.uploadUrl, {
        method: 'PUT',
        headers: { 'Content-Type': compressedFile.type || 'image/webp' },
        body: compressedFile,
      });
      if (!uploadRes.ok) {
        console.error('Failed to upload to S3:', uploadRes.status);
        return null;
      }

      return data.fileUrl;
    } catch (err) {
      console.error('Upload error:', err);
      return null;
    }
  };

  // ============ PUBLISH ============

  const publishSite = async () => {
    if (publishing) return;
    setPublishing(true);
    setPublishStatus('starting');
    setBuildPhase('');
    try {
      const res = await fetch(`${apiBase}/publish`, { method: 'POST', headers: authHeaders() });
      const data = await res.json();
      if (data.success && data.buildId) {
        setBuildId(data.buildId);
        setPublishStatus('building');
        notify('Build gestart! De site wordt gebouwd...');
        startPolling(data.buildId, 'publish');
      } else {
        setPublishStatus('error');
        setPublishing(false);
        notify(data.error || 'Kan niet publiceren.');
      }
    } catch {
      setPublishStatus('error');
      setPublishing(false);
      notify('Fout bij publiceren. Controleer de verbinding.');
    }
  };

  // ============ PREVIEW ============

  const previewSite = async () => {
    if (previewing) return;
    setPreviewing(true);
    setPreviewStatus('starting');
    setPreviewPhase('');
    try {
      const res = await fetch(`${apiBase}/preview`, { method: 'POST', headers: authHeaders() });
      const data = await res.json();
      if (data.success && data.buildId) {
        setPreviewBuildId(data.buildId);
        setPreviewStatus('building');
        notify('Preview build gestart...');
        startPolling(data.buildId, 'preview');
      } else {
        setPreviewStatus('error');
        setPreviewing(false);
        notify(data.error || 'Kan preview niet starten.');
      }
    } catch {
      setPreviewStatus('error');
      setPreviewing(false);
      notify('Fout bij preview. Controleer de verbinding.');
    }
  };

  // ============ ROLLBACK ============

  const rollbackSite = async () => {
    if (rollingBack) return;
    showConfirm('Weet u zeker dat u de vorige versie wilt herstellen? De huidige live site wordt overschreven met de backup.', async () => {
      setRollingBack(true);
      try {
        const res = await fetch(`${apiBase}/rollback`, { method: 'POST', headers: authHeaders() });
        const data = await res.json();
        if (data.success) {
          notify(`Rollback succesvol! ${data.copiedCount} bestanden hersteld.`);
        } else {
          notify(data.error || 'Rollback mislukt.');
        }
      } catch {
        notify('Fout bij rollback.');
      }
      setRollingBack(false);
    });
  };

  // ============ POLLING ============

  const startPolling = (id: string, type: 'publish' | 'preview') => {
    const ref = type === 'publish' ? pollRef : previewPollRef;
    const statusEndpoint = type === 'publish' ? 'publish' : 'preview';
    if (ref.current) clearInterval(ref.current);

    ref.current = setInterval(async () => {
      try {
        const res = await fetch(`${apiBase}/${statusEndpoint}/status/${encodeURIComponent(id)}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        const data = await res.json();

        if (type === 'publish') {
          setBuildPhase(data.currentPhase || '');
        } else {
          setPreviewPhase(data.currentPhase || '');
        }

        if (data.status === 'SUCCEEDED') {
          if (ref.current) clearInterval(ref.current);
          if (type === 'publish') {
            setPublishStatus('success');
            setPublishing(false);
            notify('Site succesvol gepubliceerd!');
          } else {
            setPreviewStatus('success');
            setPreviewing(false);
            notify('Preview is klaar! Klik op "Bekijk Preview" om te controleren.');
          }
        } else if (data.status === 'FAILED' || data.status === 'STOPPED') {
          if (ref.current) clearInterval(ref.current);
          if (type === 'publish') {
            setPublishStatus('error');
            setPublishing(false);
            notify('Publiceren mislukt. Probeer het opnieuw.');
          } else {
            setPreviewStatus('error');
            setPreviewing(false);
            notify('Preview build mislukt.');
          }
        }
      } catch { /* keep polling */ }
    }, 6000);
  };

  // ============ CRUD OPERATIONS ============

  const saveAlbum = async () => {
    // If cover file selected, upload first
    let coverUrl = albumForm.coverImage;
    if (albumCoverFile) {
      setAlbumCoverUploading(true);
      const url = await uploadFileToS3(albumCoverFile, `cover-${albumForm.title || 'album'}`);
      setAlbumCoverUploading(false);
      if (url) {
        coverUrl = url;
      } else {
        notify('Fout bij uploaden cover afbeelding.');
        return;
      }
    }

    try {
      const method = editType === 'edit' ? 'PUT' : 'POST';
      const url = editType === 'edit' ? `${apiBase}/albums/${editingItem.id}` : `${apiBase}/albums`;
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify({
          ...albumForm,
          coverImage: coverUrl,
          slug: albumForm.slug || albumForm.title.toLowerCase().replace(/\s+/g, '-'),
          id: albumForm.id || albumForm.title.toLowerCase().replace(/\s+/g, '-'),
          order: albumForm.order || albums.length + 1,
          photos: editingItem?.photos || [],
        }),
      });
      if (res.ok) {
        notify(editType === 'edit' ? 'Album bijgewerkt!' : 'Album opgeslagen!');
        resetAlbumForm();
        loadData();
      } else notify('Fout bij opslaan.');
    } catch { notify('Kan niet verbinden met CMS server.'); }
  };

  const savePhoto = async () => {
    if (!photoForm.alt || !photoForm.alt.trim()) {
      notify('Alt tekst is verplicht voor SEO!');
      return;
    }

    let photoSrc = photoForm.src;

    // If upload mode and file selected, upload first
    if (photoSourceMode === 'upload' && photoFile) {
      setPhotoUploading(true);
      const url = await uploadFileToS3(photoFile, photoForm.title || photoFile.name.split('.')[0]);
      setPhotoUploading(false);
      if (url) {
        photoSrc = url;
      } else {
        notify('Fout bij uploaden foto.');
        return;
      }
    }

    if (!photoSrc) {
      notify('Selecteer een foto of vul een URL in.');
      return;
    }

    try {
      const method = editType === 'edit' ? 'PUT' : 'POST';
      const url = editType === 'edit' ? `${apiBase}/photos/${editingItem.id}` : `${apiBase}/photos`;
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify({
          ...photoForm,
          src: photoSrc,
          id: photoForm.id || `${photoForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${Date.now()}`,
          slug: photoForm.slug || `${photoForm.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${Date.now()}`,
          tags: typeof photoForm.tags === 'string' ? photoForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : photoForm.tags,
        }),
      });
      if (res.ok) {
        notify(editType === 'edit' ? 'Foto bijgewerkt!' : 'Foto opgeslagen!');
        resetPhotoForm();
        loadData();
      } else notify('Fout bij opslaan.');
    } catch { notify('Kan niet verbinden met CMS server.'); }
  };

  const saveBlog = async () => {
    try {
      const method = editType === 'edit' ? 'PUT' : 'POST';
      const url = editType === 'edit' ? `${apiBase}/blog/${editingItem.slug}` : `${apiBase}/blog`;
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify({
          ...blogForm,
          slug: blogForm.slug || blogForm.title.toLowerCase().replace(/\s+/g, '-'),
          tags: typeof blogForm.tags === 'string' ? blogForm.tags.split(',').map((t) => t.trim()).filter(Boolean) : blogForm.tags,
        }),
      });
      if (res.ok) {
        notify(editType === 'edit' ? 'Blogpost bijgewerkt!' : 'Blogpost opgeslagen!');
        resetBlogForm();
        loadData();
      } else notify('Fout bij opslaan.');
    } catch { notify('Kan niet verbinden met CMS server.'); }
  };

  const saveTestimonial = async () => {
    try {
      const method = editType === 'edit' ? 'PUT' : 'POST';
      const url = editType === 'edit' ? `${apiBase}/testimonials/${editingItem.id}` : `${apiBase}/testimonials`;
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(testimonialForm),
      });
      if (res.ok) {
        notify(editType === 'edit' ? 'Getuigenis bijgewerkt!' : 'Getuigenis opgeslagen!');
        resetTestimonialForm();
        loadData();
      } else notify('Fout bij opslaan.');
    } catch { notify('Kan niet verbinden met CMS server.'); }
  };

  const saveFaq = async () => {
    if (!faqForm.question.trim() || !faqForm.answer.trim()) {
      notify('Vraag en antwoord zijn verplicht.');
      return;
    }
    try {
      const method = editType === 'edit' ? 'PUT' : 'POST';
      const url = editType === 'edit' ? `${apiBase}/faq/${editingItem.id}` : `${apiBase}/faq`;
      const res = await fetch(url, {
        method,
        headers: authHeaders(),
        body: JSON.stringify(faqForm),
      });
      if (res.ok) {
        notify(editType === 'edit' ? 'FAQ bijgewerkt!' : 'FAQ opgeslagen!');
        resetFaqForm();
        loadData();
      } else notify('Fout bij opslaan.');
    } catch { notify('Kan niet verbinden met CMS server.'); }
  };

  const doDelete = async (type: string, id: string) => {
    setBusy(true);
    try {
      const res = await fetch(`${apiBase}/${type}/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      if (res.ok) {
        if (type === 'albums') setAlbums(prev => prev.filter(a => a.id !== id));
        if (type === 'photos') setPhotos(prev => prev.filter(p => p.id !== id));
        if (type === 'blog') setBlogPosts(prev => prev.filter(b => b.slug !== id && b.id !== id));
        if (type === 'testimonials') setTestimonials(prev => prev.filter(t => t.id !== id));
        if (type === 'faq') setFaqs(prev => prev.filter(f => f.id !== id));
        notify('Item verwijderd!');
      } else {
        notify('Fout bij verwijderen.');
      }
    } catch { notify('Fout bij verwijderen.'); }
    setBusy(false);
  };

  const deleteItem = (type: string, id: string) => {
    if (busy) return;
    showConfirm('Weet u zeker dat u dit item wilt verwijderen?', () => doDelete(type, id));
  };

  // Move album order
  const moveAlbum = async (albumId: string, direction: 'up' | 'down') => {
    if (busy) return;
    const sorted = [...albums].sort((a, b) => (a.order || 999) - (b.order || 999));
    const idx = sorted.findIndex(a => a.id === albumId);
    if (idx < 0) return;
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= sorted.length) return;

    const orderA = sorted[idx].order || idx + 1;
    const orderB = sorted[swapIdx].order || swapIdx + 1;
    // Ensure different order values
    const finalOrderA = orderA === orderB ? orderB + 1 : orderB;
    const finalOrderB = orderA === orderB ? orderA : orderA;

    // Optimistic UI update
    setAlbums(prev => prev.map(a => {
      if (a.id === sorted[idx].id) return { ...a, order: finalOrderA };
      if (a.id === sorted[swapIdx].id) return { ...a, order: finalOrderB };
      return a;
    }));

    setBusy(true);
    try {
      await Promise.all([
        fetch(`${apiBase}/albums/${sorted[idx].id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ order: finalOrderA }) }),
        fetch(`${apiBase}/albums/${sorted[swapIdx].id}`, { method: 'PUT', headers: authHeaders(), body: JSON.stringify({ order: finalOrderB }) }),
      ]);
    } catch { notify('Fout bij volgorde wijzigen.'); loadData(); }
    setBusy(false);
  };

  // Album photo upload
  const uploadAlbumPhoto = async () => {
    if (!albumUploadFile || !albumUploadTarget) return;
    if (!albumUploadAlt || !albumUploadAlt.trim()) {
      notify('Alt tekst is verplicht voor SEO!');
      return;
    }
    setAlbumUploading(true);
    const url = await uploadFileToS3(albumUploadFile, albumUploadName || albumUploadFile.name.split('.')[0]);
    if (url) {
      const photoTitle = albumUploadName || albumUploadFile.name.split('.')[0];
      const photoSlug = `${photoTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}-${Date.now()}`;
      await fetch(`${apiBase}/photos`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          id: photoSlug,
          title: photoTitle,
          slug: photoSlug,
          albumId: albumUploadTarget,
          src: url,
          alt: albumUploadAlt,
          tags: [],
        }),
      });
      notify('Foto toegevoegd aan album!');
      setAlbumUploadTarget(null);
      setAlbumUploadFile(null);
      setAlbumUploadName('');
      setAlbumUploadAlt('');
      loadData();
    } else {
      notify('Fout bij uploaden.');
    }
    setAlbumUploading(false);
  };

  // ============ FORM RESET / EDIT ============

  const resetAlbumForm = () => { setAlbumForm({ id: '', title: '', slug: '', description: '', coverImage: '', category: '', featured: false, order: albums.length + 1 }); setAlbumCoverFile(null); setEditType(null); setEditingItem(null); };
  const resetPhotoForm = () => { setPhotoForm({ id: '', title: '', slug: '', description: '', albumId: '', src: '', alt: '', width: 1920, height: 1280, tags: '' }); setPhotoFile(null); setPhotoSourceMode('upload'); setEditType(null); setEditingItem(null); };
  const resetBlogForm = () => { setBlogForm({ title: '', slug: '', excerpt: '', coverImage: '', category: '', tags: '', content: '' }); setEditType(null); setEditingItem(null); };
  const resetTestimonialForm = () => { setTestimonialForm({ id: '', name: '', title: '', description: '', rating: 5 }); setEditType(null); setEditingItem(null); };
  const resetFaqForm = () => { setFaqForm({ id: '', question: '', answer: '' }); setEditType(null); setEditingItem(null); };

  const editAlbum = (album: any) => { setAlbumForm({ ...album, order: album.order || 0 }); setAlbumCoverFile(null); setEditingItem(album); setEditType('edit'); };
  const editPhoto = (photo: any) => { setPhotoForm({ ...photo, tags: Array.isArray(photo.tags) ? photo.tags.join(', ') : photo.tags }); setPhotoFile(null); setPhotoSourceMode('url'); setEditingItem(photo); setEditType('edit'); };
  const editBlog = (post: any) => { setBlogForm({ ...post, tags: Array.isArray(post.tags) ? post.tags.join(', ') : post.tags || '' }); setEditingItem(post); setEditType('edit'); };
  const editTestimonial = (t: any) => { setTestimonialForm(t); setEditingItem(t); setEditType('edit'); };
  const editFaq = (f: any) => { setFaqForm(f); setEditingItem(f); setEditType('edit'); };

  const inputClass = 'w-full px-4 py-3 bg-surface border border-white/10 text-white text-sm focus:border-accent focus:outline-none transition-colors';
  const labelClass = 'block text-sm text-gray-400 mb-2';

  // Sort albums by order for display
  const sortedAlbums = [...albums].sort((a, b) => (a.order || 999) - (b.order || 999));

  // Filtered photos (newest first)
  const filteredPhotos = (photoFilter === 'all' ? photos : photos.filter(p => p.albumId === photoFilter))
    .sort((a, b) => {
      const aTime = a.createdAt || 0;
      const bTime = b.createdAt || 0;
      if (aTime !== bTime) return bTime - aTime;
      return (b.order || 0) - (a.order || 0);
    });

  // ============ ALT TEXT INFO TOOLTIP ============

  const AltTextLabel = ({ required = true }: { required?: boolean }) => (
    <div className="flex items-center gap-2 mb-2">
      <label className="text-sm text-gray-400">Alt tekst (SEO) {required && <span className="text-red-400">*</span>}</label>
      <div className="relative group">
        <HiInformationCircle className="w-4 h-4 text-gray-500 hover:text-accent cursor-help transition-colors" />
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-[#1a1a2e] border border-accent/20 text-xs text-gray-300 hidden group-hover:block z-50 shadow-xl">
          <p className="font-semibold text-accent mb-2">Waarom is alt tekst belangrijk?</p>
          <p className="mb-2">Alt tekst helpt zoekmachines (Google) begrijpen wat er op uw foto staat. Dit verbetert uw vindbaarheid in <strong className="text-white">Google Afbeeldingen</strong>.</p>
          <p className="text-gray-400"><strong className="text-white">Tip:</strong> Beschrijf kort wat er op de foto te zien is, bijv. &quot;Portretfoto van zakenman in moderne kantooromgeving&quot;</p>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-accent/20"></div>
        </div>
      </div>
    </div>
  );

  // ============ STATUS BADGE ============

  const StatusBadge = ({ status, phase, type }: { status: string; phase: string; type: string }) => {
    if (status === 'idle') return null;
    const labels: Record<string, { text: string; color: string; icon: React.ReactNode }> = {
      starting: { text: `${type} wordt gestart...`, color: 'text-yellow-400', icon: <HiRefresh className="w-4 h-4 animate-spin" /> },
      building: { text: `${type} wordt gebouwd${phase ? ` (${phase})` : ''}...`, color: 'text-blue-400', icon: <HiRefresh className="w-4 h-4 animate-spin" /> },
      success: { text: `${type} succesvol!`, color: 'text-green-400', icon: <HiCheck className="w-5 h-5" /> },
      error: { text: `${type} mislukt.`, color: 'text-red-400', icon: <HiExclamation className="w-5 h-5" /> },
    };
    const l = labels[status];
    if (!l) return null;
    return <span className={`flex items-center gap-2 ${l.color} text-sm`}>{l.icon}{l.text}</span>;
  };

  // ============ LOGIN SCREEN ============

  if (!auth.isLoggedIn) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-full max-w-md px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Login</h1>
            <p className="text-gray-400 text-sm">Log in om de content te beheren</p>
          </div>
          <div className="bg-primary-light p-8 border border-white/10 space-y-6">
            {loginError && <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-sm">{loginError}</div>}
            <div>
              <label className={labelClass}>Gebruikersnaam</label>
              <input type="text" className={inputClass} value={loginForm.username} onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} autoFocus />
            </div>
            <div>
              <label className={labelClass}>Wachtwoord</label>
              <input type="password" className={inputClass} value={loginForm.password} onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
            </div>
            <button onClick={handleLogin} className="w-full px-6 py-3 bg-accent text-primary font-body text-sm uppercase tracking-wider hover:bg-accent-light transition-all duration-300">Inloggen</button>
          </div>
          <div className="text-center mt-6">
            <Link href="/" className="text-gray-500 text-sm hover:text-accent transition-colors">&larr; Terug naar site</Link>
          </div>
        </div>
      </div>
    );
  }

  // ============ ADMIN PANEL ============

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: HiHome },
    { id: 'albums' as Tab, label: 'Albums', icon: HiCollection },
    { id: 'photos' as Tab, label: "Foto's", icon: HiPhotograph },
    { id: 'blog' as Tab, label: 'Blog', icon: HiDocumentText },
    { id: 'testimonials' as Tab, label: 'Getuigenissen', icon: HiStar },
    { id: 'faq' as Tab, label: 'FAQ', icon: HiQuestionMarkCircle },
    { id: 'settings' as Tab, label: 'Instellingen', icon: HiCog },
  ];

  return (
    <div className="pt-24 pb-16 bg-primary min-h-screen">
      {/* Custom Confirm Modal */}
      {confirmModal && (
        <div className="fixed inset-0 bg-black/60 z-[9999] flex items-center justify-center p-4" onClick={() => setConfirmModal(null)}>
          <div className="bg-[#1a1a2e] border border-gray-700 rounded-xl p-6 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <HiExclamation className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-white font-semibold text-lg">Bevestiging</h3>
            </div>
            <p className="text-gray-300 mb-6">{confirmModal.message}</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmModal(null)} className="px-4 py-2 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors">Annuleren</button>
              <button onClick={() => { setConfirmModal(null); confirmModal.onConfirm(); }} className="px-4 py-2 text-sm rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors">Verwijderen</button>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-7xl xl:max-w-[1400px] 2xl:max-w-[1600px] 3xl:max-w-[1800px] 4xl:max-w-[85%] 5xl:max-w-[80%] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 4xl:px-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">Admin CMS</h1>
            <p className="text-gray-400 text-sm mt-1">Beheer uw content &mdash; albums, foto&apos;s, blog en getuigenissen</p>
          </div>
          <div className="flex items-center space-x-4">
            <a href="https://tigranmedia.be" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent text-sm hover:underline">
              <HiExternalLink className="w-4 h-4" />
              Live site
            </a>
            <button onClick={handleLogout} className="text-gray-400 text-sm hover:text-red-400 transition-colors">Uitloggen</button>
          </div>
        </div>

        {/* Notification */}
        {notification && <div className="mb-6 p-4 bg-accent/10 border border-accent/30 text-accent text-sm">{notification}</div>}

        {/* Navigation */}
        <div className="flex space-x-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm transition-colors whitespace-nowrap ${activeTab === tab.id ? 'bg-accent text-primary' : 'bg-surface text-gray-400 hover:text-white'}`}>
              <tab.icon className="w-4 h-4" /><span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* ============ DASHBOARD ============ */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[{ n: albums.length, l: 'Albums' }, { n: photos.length, l: "Foto's" }, { n: blogPosts.length, l: 'Blogposts' }, { n: testimonials.length, l: 'Getuigenissen' }, { n: faqs.length, l: 'FAQ' }].map(s => (
                <div key={s.l} className="p-6 bg-surface border border-white/5 text-center">
                  <p className="text-3xl font-heading font-bold text-accent">{s.n}</p>
                  <p className="text-gray-400 text-sm mt-1">{s.l}</p>
                </div>
              ))}
            </div>

            {/* Preview Section */}
            <div className="p-8 bg-surface border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-heading text-xl mb-1 flex items-center gap-2"><HiEye className="w-5 h-5 text-blue-400" />Preview</h3>
                  <p className="text-gray-400 text-sm">Bouw een preview van de site om uw wijzigingen te controleren voordat u publiceert.</p>
                </div>
                {previewStatus === 'success' && (
                  <a href="https://tigranmedia.be/preview/" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-3 bg-blue-600/20 border border-blue-500/30 text-blue-400 text-sm hover:bg-blue-600/30 transition-colors">
                    <HiExternalLink className="w-4 h-4" />
                    Bekijk Preview
                  </a>
                )}
              </div>
              <div className="flex items-center gap-6">
                <button onClick={previewSite} disabled={previewing}
                  className={`flex items-center gap-3 px-6 py-3 text-sm font-body uppercase tracking-wider transition-all duration-300 ${previewing ? 'bg-gray-700 text-gray-400 cursor-wait' : 'bg-blue-600 text-white hover:bg-blue-500'}`}>
                  {previewing ? <HiRefresh className="w-5 h-5 animate-spin" /> : <HiEye className="w-5 h-5" />}
                  {previewing ? 'Preview bouwen...' : 'Preview bouwen'}
                </button>
                <StatusBadge status={previewStatus} phase={previewPhase} type="Preview" />
              </div>
            </div>

            {/* Publish Section */}
            <div className="p-8 bg-surface border border-white/5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-heading text-xl mb-1 flex items-center gap-2"><HiCloudUpload className="w-5 h-5 text-accent" />Publiceren</h3>
                  <p className="text-gray-400 text-sm">Zet alle wijzigingen live op de website. Er wordt automatisch een backup gemaakt.</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <button onClick={publishSite} disabled={publishing}
                  className={`flex items-center gap-3 px-8 py-4 text-sm font-body uppercase tracking-wider transition-all duration-300 ${publishing ? 'bg-gray-700 text-gray-400 cursor-wait' : 'bg-accent text-primary hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20'}`}>
                  {publishing ? <HiRefresh className="w-5 h-5 animate-spin" /> : <HiCloudUpload className="w-5 h-5" />}
                  {publishing ? 'Bezig met publiceren...' : 'Publiceren'}
                </button>
                <StatusBadge status={publishStatus} phase={buildPhase} type="Publicatie" />
              </div>
            </div>

            {/* Rollback Section */}
            <div className="p-6 bg-surface border border-white/5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-heading text-lg mb-1 flex items-center gap-2"><HiRewind className="w-5 h-5 text-orange-400" />Terugdraaien</h3>
                  <p className="text-gray-400 text-sm">Herstel de vorige versie van de site als de laatste publicatie niet goed was.</p>
                </div>
                <button onClick={rollbackSite} disabled={rollingBack}
                  className={`flex items-center gap-2 px-5 py-3 text-sm transition-colors ${rollingBack ? 'bg-gray-700 text-gray-400 cursor-wait' : 'bg-orange-600/20 border border-orange-500/30 text-orange-400 hover:bg-orange-600/30'}`}>
                  {rollingBack ? <HiRefresh className="w-4 h-4 animate-spin" /> : <HiRewind className="w-4 h-4" />}
                  {rollingBack ? 'Bezig...' : 'Vorige versie herstellen'}
                </button>
              </div>
            </div>

            {/* Quick start guide */}
            <div className="p-6 bg-surface border border-white/5">
              <h3 className="text-white font-heading text-lg mb-4">Snelstart</h3>
              <div className="space-y-3 text-sm text-gray-400">
                <p><strong className="text-white">1.</strong> Pas content aan via de tabs hierboven.</p>
                <p><strong className="text-white">2.</strong> Klik op <strong className="text-blue-400">Preview bouwen</strong> om de wijzigingen te bekijken.</p>
                <p><strong className="text-white">3.</strong> Als alles goed is, klik op <strong className="text-accent">Publiceren</strong> om live te zetten.</p>
                <p><strong className="text-white">4.</strong> Niet tevreden? Klik op <strong className="text-orange-400">Vorige versie herstellen</strong>.</p>
              </div>
            </div>
          </div>
        )}

        {/* ============ ALBUMS TAB ============ */}
        {activeTab === 'albums' && (
          <div className="space-y-8">
            {/* Album Upload Section */}
            {albumUploadTarget && (
              <div className="p-6 bg-surface border border-accent/20">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-heading font-bold text-white">
                    <HiUpload className="inline w-5 h-5 mr-2 text-accent" />
                    Foto uploaden naar: <span className="text-accent">{albums.find(a => a.id === albumUploadTarget)?.title || albumUploadTarget}</span>
                  </h2>
                  <button onClick={() => { setAlbumUploadTarget(null); setAlbumUploadFile(null); setAlbumUploadName(''); setAlbumUploadAlt(''); }} className="text-gray-400 hover:text-white"><HiX className="w-5 h-5" /></button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div><label className={labelClass}>Naam</label><input type="text" className={inputClass} placeholder="Naam van de foto" value={albumUploadName} onChange={(e) => setAlbumUploadName(e.target.value)} /></div>
                  <div><AltTextLabel /><input type="text" className={inputClass} placeholder="Bijv. Portret in het park" value={albumUploadAlt} onChange={(e) => setAlbumUploadAlt(e.target.value)} /></div>
                  <div><label className={labelClass}>Bestand (JPG/PNG)</label><input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className={inputClass} onChange={(e) => setAlbumUploadFile(e.target.files?.[0] || null)} /></div>
                  <div className="flex items-end">
                    <button onClick={uploadAlbumPhoto} disabled={!albumUploadFile || !albumUploadAlt.trim() || albumUploading} className="btn-primary disabled:opacity-50 flex items-center gap-2">
                      {albumUploading ? <HiRefresh className="w-4 h-4 animate-spin" /> : <HiUpload className="w-4 h-4" />}
                      {albumUploading ? 'Uploaden...' : 'Uploaden'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-bold text-white">{editType === 'edit' ? 'Album Bewerken' : 'Nieuw Album'}</h2>
                  {editType === 'edit' && <button onClick={resetAlbumForm} className="text-gray-400 hover:text-white"><HiX className="w-5 h-5" /></button>}
                </div>
                <div className="space-y-4">
                  <div><label className={labelClass}>Titel *</label><input type="text" className={inputClass} placeholder="Bijv. Zakelijk Event ABC" value={albumForm.title} onChange={(e) => setAlbumForm({ ...albumForm, title: e.target.value })} /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Slug (URL)</label><input type="text" className={inputClass} placeholder="zakelijk-event-abc" value={albumForm.slug} onChange={(e) => setAlbumForm({ ...albumForm, slug: e.target.value })} /></div>
                    <div><label className={labelClass}>Categorie</label>
                      <input type="text" className={inputClass} placeholder="Bijv. portret, zakelijk" value={albumForm.category} onChange={(e) => setAlbumForm({ ...albumForm, category: e.target.value })} />
                    </div>
                  </div>
                  <div><label className={labelClass}>Beschrijving *</label><textarea className={inputClass} rows={3} placeholder="Beschrijf het album..." value={albumForm.description} onChange={(e) => setAlbumForm({ ...albumForm, description: e.target.value })} /></div>

                  {/* Cover Image: URL or Upload */}
                  <div>
                    <label className={labelClass}>Cover Afbeelding *</label>
                    <div className="flex gap-2 mb-2">
                      <button type="button" onClick={() => setAlbumCoverFile(null)} className={`px-3 py-1 text-xs transition-colors ${!albumCoverFile && albumForm.coverImage ? 'bg-accent text-primary' : 'bg-white/5 text-gray-400 hover:text-white'}`}>URL</button>
                      <button type="button" onClick={() => {}} className={`px-3 py-1 text-xs transition-colors ${albumCoverFile ? 'bg-accent text-primary' : 'bg-white/5 text-gray-400 hover:text-white'}`}>Uploaden</button>
                    </div>
                    <input type="url" className={`${inputClass} mb-2`} placeholder="https://... of laat leeg om te uploaden" value={albumForm.coverImage} onChange={(e) => setAlbumForm({ ...albumForm, coverImage: e.target.value })} />
                    <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className={inputClass}
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setAlbumCoverFile(f);
                        if (f) setAlbumForm({ ...albumForm, coverImage: '' });
                      }} />
                    {albumCoverFile && <p className="text-xs text-accent mt-1">Geselecteerd: {albumCoverFile.name}</p>}
                    {albumCoverUploading && <p className="text-xs text-blue-400 mt-1 flex items-center gap-1"><HiRefresh className="w-3 h-3 animate-spin" />Cover wordt geüpload...</p>}
                  </div>

                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="featured" checked={albumForm.featured} onChange={(e) => setAlbumForm({ ...albumForm, featured: e.target.checked })} className="accent-accent" />
                    <label htmlFor="featured" className="text-sm text-gray-400">Uitgelicht album</label>
                  </div>
                  <button onClick={saveAlbum} className="btn-primary">{editType === 'edit' ? 'Bijwerken' : 'Opslaan'}</button>
                </div>
              </div>
              <div>
                <h2 className="text-xl font-heading font-bold text-white mb-6">Bestaande Albums ({albums.length})</h2>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {sortedAlbums.map((album) => {
                    const realPhotoCount = photos.filter(p => p.albumId === album.id).length;
                    return (
                    <div key={album.id} className="flex items-center justify-between p-4 bg-surface border border-white/5">
                      <div className="flex items-center gap-3">
                        {album.coverImage && <img src={album.coverImage} alt="" className="w-12 h-12 object-cover border border-white/10" />}
                        <div>
                          <p className="text-white text-sm font-semibold">{album.title}</p>
                          <p className="text-gray-500 text-xs">#{album.order || '–'} &middot; {album.category} &middot; {realPhotoCount} foto&apos;s</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button onClick={() => moveAlbum(album.id, 'up')} className="text-gray-400 hover:text-white" title="Omhoog"><HiChevronUp className="w-4 h-4" /></button>
                        <button onClick={() => moveAlbum(album.id, 'down')} className="text-gray-400 hover:text-white" title="Omlaag"><HiChevronDown className="w-4 h-4" /></button>
                        <span className="text-gray-600 mx-1">|</span>
                        <button onClick={() => setAlbumUploadTarget(album.id)} className="text-green-400 hover:text-green-300" title="Foto uploaden"><HiUpload className="w-4 h-4" /></button>
                        <button onClick={() => editAlbum(album)} className="text-accent hover:text-accent-light" title="Bewerken"><HiPencil className="w-4 h-4" /></button>
                        <button onClick={() => deleteItem('albums', album.id)} className="text-red-400 hover:text-red-300" title="Verwijderen"><HiTrash className="w-4 h-4" /></button>
                      </div>
                    </div>
                    );
                  })}
                  {albums.length === 0 && <p className="text-gray-500 text-sm">Geen albums gevonden.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ PHOTOS TAB ============ */}
        {activeTab === 'photos' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-bold text-white">{editType === 'edit' ? 'Foto Bewerken' : 'Nieuwe Foto'}</h2>
                  {editType === 'edit' && <button onClick={resetPhotoForm} className="text-gray-400 hover:text-white"><HiX className="w-5 h-5" /></button>}
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className={labelClass}>Titel *</label><input type="text" className={inputClass} placeholder="Bijv. Zakelijk Portret" value={photoForm.title} onChange={(e) => setPhotoForm({ ...photoForm, title: e.target.value })} /></div>
                    <div><label className={labelClass}>Album *</label>
                      <select className={inputClass} value={photoForm.albumId} onChange={(e) => setPhotoForm({ ...photoForm, albumId: e.target.value })}>
                        <option value="">Selecteer album</option>
                        {albums.map(a => <option key={a.id} value={a.id}>{a.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div><label className={labelClass}>Beschrijving</label><textarea className={inputClass} rows={2} placeholder="Beschrijf de foto..." value={photoForm.description} onChange={(e) => setPhotoForm({ ...photoForm, description: e.target.value })} /></div>

                  {/* Image source: URL or Upload toggle */}
                  <div>
                    <label className={labelClass}>Afbeelding *</label>
                    <div className="flex gap-2 mb-3">
                      <button type="button" onClick={() => setPhotoSourceMode('upload')}
                        className={`px-4 py-2 text-xs font-medium transition-colors flex items-center gap-1 ${photoSourceMode === 'upload' ? 'bg-accent text-primary' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
                        <HiUpload className="w-3.5 h-3.5" />Uploaden
                      </button>
                      <button type="button" onClick={() => setPhotoSourceMode('url')}
                        className={`px-4 py-2 text-xs font-medium transition-colors flex items-center gap-1 ${photoSourceMode === 'url' ? 'bg-accent text-primary' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
                        <HiExternalLink className="w-3.5 h-3.5" />URL
                      </button>
                    </div>
                    {photoSourceMode === 'upload' ? (
                      <div>
                        <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp" className={inputClass}
                          onChange={(e) => {
                            const f = e.target.files?.[0] || null;
                            setPhotoFile(f);
                            if (f) setPhotoForm({ ...photoForm, src: '' });
                          }} />
                        {photoFile && <p className="text-xs text-accent mt-1">Geselecteerd: {photoFile.name}</p>}
                        {photoUploading && <p className="text-xs text-blue-400 mt-1 flex items-center gap-1"><HiRefresh className="w-3 h-3 animate-spin" />Foto wordt geüpload...</p>}
                      </div>
                    ) : (
                      <input type="url" className={inputClass} placeholder="https://... of /uploads/..." value={photoForm.src} onChange={(e) => setPhotoForm({ ...photoForm, src: e.target.value })} />
                    )}
                  </div>

                  <div>
                    <AltTextLabel />
                    <input type="text" className={inputClass} placeholder="Beschrijf wat er op de foto te zien is" value={photoForm.alt} onChange={(e) => setPhotoForm({ ...photoForm, alt: e.target.value })} />
                  </div>
                  <div><label className={labelClass}>Tags (komma-gescheiden)</label><input type="text" className={inputClass} placeholder="portret, zakelijk, outdoor" value={photoForm.tags} onChange={(e) => setPhotoForm({ ...photoForm, tags: e.target.value })} /></div>
                  <button onClick={savePhoto} disabled={photoUploading} className="btn-primary disabled:opacity-50">
                    {photoUploading ? 'Uploaden...' : editType === 'edit' ? 'Bijwerken' : 'Opslaan'}
                  </button>
                </div>
              </div>
              <div>
                {/* Filter + Count */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-heading font-bold text-white">Bestaande Foto&apos;s ({filteredPhotos.length})</h2>
                </div>
                <div className="mb-4">
                  <select className={inputClass} value={photoFilter} onChange={(e) => setPhotoFilter(e.target.value)}>
                    <option value="all">Alle albums ({photos.length})</option>
                    {albums.map(a => {
                      const count = photos.filter(p => p.albumId === a.id).length;
                      return <option key={a.id} value={a.id}>{a.title} ({count})</option>;
                    })}
                  </select>
                </div>
                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                  {filteredPhotos.map((photo) => (
                    <div key={photo.id} className="flex items-center justify-between p-4 bg-surface border border-white/5">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {photo.src && <img src={photo.src} alt={photo.alt || ''} className="w-12 h-12 object-cover border border-white/10" />}
                        <div className="min-w-0">
                          <p className="text-white text-sm font-semibold">{photo.title}</p>
                          <p className="text-gray-500 text-xs">{albums.find(a => a.id === photo.albumId)?.title || photo.albumId}</p>
                          {photo.alt && <p className="text-gray-600 text-xs mt-0.5 truncate" title={photo.alt}>Alt: {photo.alt}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        <button onClick={() => editPhoto(photo)} className="text-accent hover:text-accent-light"><HiPencil className="w-4 h-4" /></button>
                        <button onClick={() => deleteItem('photos', photo.id)} className="text-red-400 hover:text-red-300"><HiTrash className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                  {filteredPhotos.length === 0 && <p className="text-gray-500 text-sm">Geen foto&apos;s gevonden{photoFilter !== 'all' ? ' in dit album' : ''}.</p>}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============ BLOG TAB ============ */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-white">{editType === 'edit' ? 'Blogpost Bewerken' : 'Nieuwe Blogpost'}</h2>
                {editType === 'edit' && <button onClick={resetBlogForm} className="text-gray-400 hover:text-white"><HiX className="w-5 h-5" /></button>}
              </div>
              <div className="space-y-4">
                <div><label className={labelClass}>Titel *</label><input type="text" className={inputClass} placeholder="Titel van uw blogpost" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className={labelClass}>Slug (URL)</label><input type="text" className={inputClass} placeholder="mijn-blogpost" value={blogForm.slug} onChange={(e) => setBlogForm({ ...blogForm, slug: e.target.value })} /></div>
                  <div><label className={labelClass}>Categorie</label><input type="text" className={inputClass} placeholder="Tips, Locaties, Zakelijk" value={blogForm.category} onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })} /></div>
                </div>
                <div><label className={labelClass}>Excerpt *</label><textarea className={inputClass} rows={2} placeholder="Korte samenvatting..." value={blogForm.excerpt} onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })} /></div>
                <div><label className={labelClass}>Cover Afbeelding URL</label><input type="url" className={inputClass} placeholder="https://..." value={blogForm.coverImage} onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })} /></div>
                <div><label className={labelClass}>Tags (komma-gescheiden)</label><input type="text" className={inputClass} placeholder="fotografie, tips, zakelijk" value={blogForm.tags} onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })} /></div>
                <div>
                  <label className={labelClass}>Content (Markdown) *</label>
                  <textarea className={`${inputClass} font-mono`} rows={12} placeholder="Schrijf uw blogpost in Markdown..." value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} />
                </div>
                <button onClick={saveBlog} className="btn-primary">{editType === 'edit' ? 'Bijwerken' : 'Opslaan'}</button>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white mb-6">Bestaande Blogposts ({blogPosts.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {blogPosts.map((post) => (
                  <div key={post.slug || post.filename} className="flex items-center justify-between p-4 bg-surface border border-white/5">
                    <div>
                      <p className="text-white text-sm font-semibold">{post.title}</p>
                      <p className="text-gray-500 text-xs">{post.category} &middot; {post.date}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => editBlog(post)} className="text-accent hover:text-accent-light"><HiPencil className="w-4 h-4" /></button>
                      <button onClick={() => deleteItem('blog', post.slug)} className="text-red-400 hover:text-red-300"><HiTrash className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {blogPosts.length === 0 && <p className="text-gray-500 text-sm">Geen blogposts gevonden.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ============ TESTIMONIALS TAB ============ */}
        {activeTab === 'testimonials' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-white">{editType === 'edit' ? 'Getuigenis Bewerken' : 'Nieuwe Getuigenis'}</h2>
                {editType === 'edit' && <button onClick={resetTestimonialForm} className="text-gray-400 hover:text-white"><HiX className="w-5 h-5" /></button>}
              </div>
              <div className="space-y-4">
                <div><label className={labelClass}>Naam *</label><input type="text" className={inputClass} placeholder="Naam van de klant" value={testimonialForm.name} onChange={(e) => setTestimonialForm({ ...testimonialForm, name: e.target.value })} /></div>
                <div><label className={labelClass}>Titel / Rol *</label><input type="text" className={inputClass} placeholder="Bijv. Evenement in Antwerpen" value={testimonialForm.title} onChange={(e) => setTestimonialForm({ ...testimonialForm, title: e.target.value })} /></div>
                <div><label className={labelClass}>Beschrijving / Review *</label><textarea className={inputClass} rows={4} placeholder="De review tekst..." value={testimonialForm.description} onChange={(e) => setTestimonialForm({ ...testimonialForm, description: e.target.value })} /></div>
                <div>
                  <label className={labelClass}>Beoordeling (1-5)</label>
                  <select className={inputClass} value={testimonialForm.rating} onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}>
                    <option value={5}>5 sterren</option>
                    <option value={4}>4 sterren</option>
                    <option value={3}>3 sterren</option>
                    <option value={2}>2 sterren</option>
                    <option value={1}>1 ster</option>
                  </select>
                </div>
                <button onClick={saveTestimonial} className="btn-primary">{editType === 'edit' ? 'Bijwerken' : 'Opslaan'}</button>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white mb-6">Bestaande Getuigenissen ({testimonials.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {testimonials.map((t) => (
                  <div key={t.id} className="flex items-center justify-between p-4 bg-surface border border-white/5">
                    <div>
                      <p className="text-white text-sm font-semibold">{t.name}</p>
                      <p className="text-gray-500 text-xs">{t.title} &middot; {t.rating}&#9733;</p>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{t.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => editTestimonial(t)} className="text-accent hover:text-accent-light"><HiPencil className="w-4 h-4" /></button>
                      <button onClick={() => deleteItem('testimonials', t.id)} className="text-red-400 hover:text-red-300"><HiTrash className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {testimonials.length === 0 && <p className="text-gray-500 text-sm">Geen getuigenissen gevonden.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ============ FAQ TAB ============ */}
        {activeTab === 'faq' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-bold text-white">{editType === 'edit' ? 'FAQ Bewerken' : 'Nieuwe FAQ'}</h2>
                {editType === 'edit' && <button onClick={resetFaqForm} className="text-gray-400 hover:text-white"><HiX className="w-5 h-5" /></button>}
              </div>
              <div className="space-y-4">
                <div><label className={labelClass}>Vraag *</label><input type="text" className={inputClass} placeholder="Bijv. Wat zijn de tarieven voor een fotoshoot?" value={faqForm.question} onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })} /></div>
                <div><label className={labelClass}>Antwoord *</label><textarea className={inputClass} rows={6} placeholder="Het antwoord op de vraag..." value={faqForm.answer} onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })} /></div>
                <button onClick={saveFaq} className="btn-primary">{editType === 'edit' ? 'Bijwerken' : 'Opslaan'}</button>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white mb-6">Bestaande FAQ&apos;s ({faqs.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {faqs.map((faq) => (
                  <div key={faq.id} className="flex items-center justify-between p-4 bg-surface border border-white/5">
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="text-white text-sm font-semibold">{faq.question}</p>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{faq.answer}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => editFaq(faq)} className="text-accent hover:text-accent-light"><HiPencil className="w-4 h-4" /></button>
                      <button onClick={() => deleteItem('faq', faq.id)} className="text-red-400 hover:text-red-300"><HiTrash className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
                {faqs.length === 0 && <p className="text-gray-500 text-sm">Geen FAQ items gevonden.</p>}
              </div>
            </div>
          </div>
        )}

        {/* ============ SETTINGS TAB ============ */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl space-y-8">
            <div className="p-6 bg-surface border border-white/5">
              <h3 className="text-white font-heading text-lg mb-4">CMS Server Status</h3>
              <p className="text-gray-400 text-sm mb-4">De CMS API draait online via AWS Lambda. Wijzigingen worden direct opgeslagen.</p>
              <p className="text-gray-400 text-sm">API Endpoint: <code className="text-accent">{apiBase}</code></p>
            </div>
            <div className="p-6 bg-surface border border-white/5">
              <h3 className="text-white font-heading text-lg mb-4">Workflow</h3>
              <ol className="space-y-2 text-sm text-gray-400 list-decimal list-inside">
                <li>Content toevoegen of bewerken via de tabs</li>
                <li>Klik op <strong className="text-blue-400">Preview bouwen</strong> om een testversie te bekijken</li>
                <li>Als alles goed is, klik op <strong className="text-accent">Publiceren</strong></li>
                <li>Niet tevreden? Klik op <strong className="text-orange-400">Vorige versie herstellen</strong></li>
              </ol>
            </div>
            <div className="p-6 bg-surface border border-white/5">
              <h3 className="text-white font-heading text-lg mb-4">Foto Upload &amp; SEO</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>&bull; Upload foto&apos;s direct in het foto-formulier of via de album-tab</li>
                <li>&bull; <strong className="text-white">Alt tekst is verplicht</strong> &mdash; dit helpt Google uw foto&apos;s te vinden</li>
                <li>&bull; Album covers kunnen ook ge&uuml;pload worden</li>
              </ul>
            </div>
            <div className="p-6 bg-surface border border-white/5">
              <h3 className="text-white font-heading text-lg mb-4">Ontwikkelaar</h3>
              <p className="text-gray-400 text-sm mb-2">Voor handmatige deployment of code-wijzigingen:</p>
              <code className="block p-3 bg-primary text-accent text-sm border border-white/5">.\deploy.ps1</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
