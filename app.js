/* ─── FeedFlow App v1.4 ──────────────────────────────────────────────────── */
'use strict';

// ─── Constants ───────────────────────────────────────────────────────────────
const CORS_PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://thingproxy.freeboard.io/fetch/${url}`
];

const CATEGORIES = {
  'Tecnologia': ['tech', 'software', 'ai ', 'intelligenza artificiale', 'app ', 'digital', 'cyber', 'robot', 'coding', 'programmazione', 'iphone', 'android', 'google', 'apple ', 'microsoft', 'openai', 'chatgpt', 'computer', 'internet', 'startup', 'silicon', 'gpu', 'cloud', 'blockchain', 'nft', 'gadget', 'smartphone'],
  'Politica': ['governo', 'politica', 'elezioni', 'parlamento', 'ministro', 'president', 'politics', 'senate', 'premier', 'pd ', 'forza italia', 'lega ', 'fratelli', 'movimento 5', 'biden', 'trump', 'meloni', 'draghi', 'macron', 'election', 'vote', 'partito', 'sinistra', 'destra'],
  'Sport': ['calcio', 'sport', 'football', 'basketball', 'tennis', 'champions', 'serie a', 'nba', 'fifa', 'juventus', 'milan ', 'inter ', 'roma ', 'napoli ', 'formula 1', 'moto gp', 'tour de france', 'wimbledon', 'olimpiadi', 'coppa del mondo', 'athlete', 'goal', 'gol ', 'match ', 'partita'],
  'Scienza': ['scienza', 'ricerca', 'studio ', 'climate', 'spazio', 'nasa', 'medicina', 'salute', 'virus', 'vaccino', 'cancer', 'biology', 'physics', 'chemistry', 'discovery', 'scoperta', 'universo', 'pianeta', 'asteroid', 'dna ', 'genome', 'quantum', 'neuroscience'],
  'Economia': ['economia', 'mercato', 'borsa', 'finanza', 'bitcoin', 'crypto', 'euro ', 'inflazione', 'pil ', 'bce ', 'fed ', 'stock', 'market ', 'invest', 'startup', 'banca', 'lavoro', 'disoccup', 'recessione', 'inflat', 'interest rate', 'dow jones'],
  'Mondo': ['guerra', 'conflitto', 'diplomazia', 'internazionale', 'onu ', 'nato ', 'ucraina', 'russia ', 'cina ', 'usa ', 'medio oriente', 'palestina', 'israele', 'siria', 'africa ', 'asia ', 'brexit', 'refugee', 'profughi', 'immigraz'],
  'Entertainment': ['cinema', 'musica', 'film ', 'serie tv', 'netflix', 'streaming', 'celebrity', 'oscar', 'grammys', 'festival', 'concert', 'album ', 'spot', 'sanremo', 'cannes', 'amazon prime', 'disney+', 'hbo', 'book', 'libr', 'videogame', 'gaming'],
};

const CAT_COLORS = {
  'Tecnologia': '#4d9de0', 'Politica': '#e05252', 'Sport': '#4caf88',
  'Scienza': '#9b72cf', 'Economia': '#f0a500', 'Mondo': '#e0759b',
  'Entertainment': '#ffcb4d', 'Altro': '#5c6178'
};

const DEFAULT_FEEDS = [
  { id: 'f1', name: 'ANSA', url: 'https://www.ansa.it/sito/notizie/tecnologia/tecnologia_rss.xml', category: 'Tecnologia', icon: '🇮🇹' },
  { id: 'f2', name: 'La Repubblica', url: 'https://www.repubblica.it/rss/homepage/rss2.0.xml', category: 'Mondo', icon: '📰' },
  { id: 'f3', name: 'Corriere', url: 'https://xml2.corrieredellasera.it/rss/homepage.xml', category: 'Politica', icon: '📰' },
  { id: 'f4', name: 'Hacker News', url: 'https://hnrss.org/frontpage', category: 'Tecnologia', icon: '🟠' },
  { id: 'f5', name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml', category: 'Tecnologia', icon: '◆' },
  { id: 'f6', name: 'NASA', url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss', category: 'Scienza', icon: '🚀' },
];

const PRESET_FEEDS = {
  'Notizie IT': [
    { name: 'ANSA Tech', url: 'https://www.ansa.it/sito/notizie/tecnologia/tecnologia_rss.xml' },
    { name: 'La Repubblica', url: 'https://www.repubblica.it/rss/homepage/rss2.0.xml' },
    { name: 'Il Sole 24 Ore', url: 'https://www.ilsole24ore.com/rss/mondo.xml' },
    { name: 'TGCom24', url: 'https://www.tgcom24.mediaset.it/rss/ultim-ora.xml' },
  ],
  'Tech': [
    { name: 'Hacker News', url: 'https://hnrss.org/frontpage' },
    { name: 'The Verge', url: 'https://www.theverge.com/rss/index.xml' },
    { name: 'Wired', url: 'https://www.wired.com/feed/rss' },
    { name: 'TechCrunch', url: 'https://techcrunch.com/feed/' },
    { name: 'Ars Technica', url: 'https://feeds.arstechnica.com/arstechnica/index' },
  ],
  'Scienza': [
    { name: 'NASA Breaking News', url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss' },
    { name: 'Science Daily', url: 'https://www.sciencedaily.com/rss/all.xml' },
    { name: 'Nature', url: 'https://www.nature.com/nature.rss' },
  ],
  'Social via RSS Bridge': [
    { name: 'Reddit r/Italy', url: 'https://www.reddit.com/r/italy.rss' },
    { name: 'Reddit r/technology', url: 'https://www.reddit.com/r/technology.rss' },
    { name: 'YouTube Channel', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID' },
    { name: 'Twitter/X (Nitter)', url: 'https://nitter.privacydev.net/USERNAME/rss' },
    { name: 'Instagram (RSS.app)', url: 'https://rss.app/feeds/FEED_ID.xml' },
  ],
};

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  feeds: [],
  articles: [],
  favorites: new Set(),
  readArticles: new Set(),
  activeTab: 'feeds',       // feeds | favorites | settings
  activeFeed: 'all',
  activeCategory: 'all',
  searchQuery: '',
  sortBy: 'date',           // date | title | source
  showUnreadOnly: false,
  refreshInterval: 15,      // minutes
  refreshTimer: null,
  isRefreshing: false,
  redisUrl: '',
  redisToken: '',
  useRedis: false,
  lastSync: null,
  isOnline: navigator.onLine,
};

// ─── Storage ──────────────────────────────────────────────────────────────────
const Storage = {
  save() {
    try {
      localStorage.setItem('ff_feeds', JSON.stringify(state.feeds));
      localStorage.setItem('ff_articles', JSON.stringify(state.articles.slice(0, 1000)));
      localStorage.setItem('ff_favorites', JSON.stringify([...state.favorites]));
      localStorage.setItem('ff_read', JSON.stringify([...state.readArticles].slice(-2000)));
      localStorage.setItem('ff_settings', JSON.stringify({
        refreshInterval: state.refreshInterval,
        showUnreadOnly: state.showUnreadOnly,
        sortBy: state.sortBy,
        redisUrl: state.redisUrl,
        redisToken: state.redisToken,
        useRedis: state.useRedis,
      }));
      localStorage.setItem('ff_lastSync', new Date().toISOString());
    } catch (e) { console.warn('Storage save failed:', e); }
  },

  load() {
    try {
      const feeds = JSON.parse(localStorage.getItem('ff_feeds'));
      const articles = JSON.parse(localStorage.getItem('ff_articles'));
      const favorites = JSON.parse(localStorage.getItem('ff_favorites'));
      const read = JSON.parse(localStorage.getItem('ff_read'));
      const settings = JSON.parse(localStorage.getItem('ff_settings'));
      const lastSync = localStorage.getItem('ff_lastSync');

      if (feeds?.length) state.feeds = feeds;
      else state.feeds = DEFAULT_FEEDS;
      if (articles?.length) state.articles = articles;
      if (favorites?.length) state.favorites = new Set(favorites);
      if (read?.length) state.readArticles = new Set(read);
      if (settings) {
        Object.assign(state, settings);
        // Restore Redis fields
        state.redisUrl = settings.redisUrl || '';
        state.redisToken = settings.redisToken || '';
        state.useRedis = settings.useRedis || false;
      }
      if (lastSync) state.lastSync = new Date(lastSync);
    } catch (e) { state.feeds = DEFAULT_FEEDS; }
  },

  export() {
    const data = {
      version: '1.4',
      exported: new Date().toISOString(),
      feeds: state.feeds,
      articles: state.articles,
      favorites: [...state.favorites],
      read: [...state.readArticles],
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `feedflow-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast('Backup esportato!', 'success');
  },

  import(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const data = JSON.parse(e.target.result);
          if (data.feeds) state.feeds = data.feeds;
          if (data.articles) state.articles = data.articles;
          if (data.favorites) state.favorites = new Set(data.favorites);
          if (data.read) state.readArticles = new Set(data.read);
          Storage.save();
          resolve(data);
        } catch (err) { reject(err); }
      };
      reader.readAsText(file);
    });
  }
};

// ─── Redis ────────────────────────────────────────────────────────────────────
const Redis = {
  async get(key) {
    if (!state.useRedis || !state.redisUrl) return null;
    try {
      const r = await fetch(`${state.redisUrl}/get/${key}`, {
        headers: { Authorization: `Bearer ${state.redisToken}` }
      });
      const d = await r.json();
      return d.result ? JSON.parse(d.result) : null;
    } catch { return null; }
  },

  async set(key, value) {
    if (!state.useRedis || !state.redisUrl) return;
    try {
      await fetch(`${state.redisUrl}/set/${key}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${state.redisToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(JSON.stringify(value))
      });
    } catch { /* silent */ }
  },

  async syncToRedis() {
    if (!state.useRedis || !state.redisUrl) return;
    await Promise.all([
      Redis.set('ff:feeds', state.feeds),
      Redis.set('ff:favorites', [...state.favorites]),
      Redis.set('ff:articles_meta', state.articles.slice(0, 200).map(a => ({ id: a.id, title: a.title, source: a.source, date: a.date })))
    ]);
    toast('Sincronizzato con Redis!', 'success');
  },

  async loadFromRedis() {
    if (!state.useRedis || !state.redisUrl) return;
    const [feeds, favorites] = await Promise.all([
      Redis.get('ff:feeds'),
      Redis.get('ff:favorites'),
    ]);
    if (feeds?.length) { state.feeds = feeds; }
    if (favorites?.length) { state.favorites = new Set(favorites); }
    toast('Dati caricati da Redis!', 'success');
  }
};

// ─── RSS Fetching ─────────────────────────────────────────────────────────────
async function fetchWithProxy(url, proxyIndex = 0) {
  if (proxyIndex >= CORS_PROXIES.length) throw new Error('All proxies failed');
  const proxyUrl = CORS_PROXIES[proxyIndex](url);
  try {
    const res = await fetch(proxyUrl, { signal: AbortSignal.timeout(12000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch (e) {
    return fetchWithProxy(url, proxyIndex + 1);
  }
}

function parseRSS(xmlText, feed) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'application/xml');
  if (doc.querySelector('parsererror')) {
    // Try HTML parser as fallback
    const doc2 = parser.parseFromString(xmlText, 'text/html');
    return parseRSSDoc(doc2, feed);
  }
  return parseRSSDoc(doc, feed);
}

function parseRSSDoc(doc, feed) {
  const articles = [];
  const isAtom = doc.querySelector('feed');
  const items = doc.querySelectorAll(isAtom ? 'entry' : 'item');

  items.forEach((item, i) => {
    const get = (...tags) => {
      for (const tag of tags) {
        const el = item.querySelector(tag);
        if (el) return el.textContent.trim() || el.getAttribute('href') || '';
      }
      return '';
    };

    const getAttr = (tag, attr) => item.querySelector(tag)?.getAttribute(attr) || '';

    const title = get('title');
    const link = get('link[href]') || getAttr('link', 'href') || get('link') || get('guid');
    const pubDate = get('pubDate', 'published', 'updated', 'dc\\:date');
    const desc = get('description', 'summary', 'content\\:encoded', 'content');

    // Extract image
    let image = '';
    const mediaContent = item.querySelector('media\\:content, media\\:thumbnail');
    const enclosure = item.querySelector('enclosure[type^="image"]');
    const imgInDesc = desc.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (mediaContent) image = mediaContent.getAttribute('url') || '';
    else if (enclosure) image = enclosure.getAttribute('url') || '';
    else if (imgInDesc) image = imgInDesc[1];

    if (!title && !link) return;

    const id = btoa(encodeURIComponent((link || title || i).slice(0, 100))).replace(/[^a-zA-Z0-9]/g, '').slice(0, 20) + '_' + feed.id;
    const cleanDesc = desc.replace(/<[^>]+>/g, '').replace(/&[^;]+;/g, ' ').trim().slice(0, 400);

    articles.push({
      id,
      title: title.replace(/<[^>]+>/g, '').trim(),
      link,
      description: cleanDesc,
      image,
      date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      source: feed.name,
      feedId: feed.id,
      feedCategory: feed.category,
      category: categorize(title + ' ' + cleanDesc),
    });
  });

  return articles;
}

function categorize(text) {
  const lower = text.toLowerCase();
  let bestCat = 'Altro', bestScore = 0;
  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    const score = keywords.reduce((s, kw) => s + (lower.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) { bestScore = score; bestCat = cat; }
  }
  return bestCat;
}

async function fetchFeed(feed) {
  try {
    const text = await fetchWithProxy(feed.url);
    const articles = parseRSS(text, feed);
    return articles;
  } catch (e) {
    console.warn(`Feed ${feed.name} failed:`, e.message);
    return [];
  }
}

async function refreshAll(silent = false) {
  if (state.isRefreshing) return;
  if (!state.isOnline) { toast('Offline – impossibile aggiornare', 'error'); return; }
  state.isRefreshing = true;

  const refreshBtn = $('refresh-btn');
  if (refreshBtn) {
    refreshBtn.querySelector('svg').classList.add('refresh-spin');
    setStatusSyncing(true);
  }

  if (!silent) toast(`Aggiornamento ${state.feeds.length} feed…`, 'info');

  const results = await Promise.allSettled(state.feeds.map(f => fetchFeed(f)));

  let newCount = 0;
  const existingIds = new Set(state.articles.map(a => a.id));

  results.forEach((r, i) => {
    if (r.status === 'fulfilled') {
      r.value.forEach(article => {
        if (!existingIds.has(article.id)) {
          state.articles.unshift(article);
          newCount++;
        }
      });
    }
  });

  // Keep max 2000 articles, newest first
  state.articles = state.articles
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 2000);

  state.lastSync = new Date();
  state.isRefreshing = false;

  if (refreshBtn) {
    refreshBtn.querySelector('svg').classList.remove('refresh-spin');
    setStatusSyncing(false);
  }

  Storage.save();
  renderArticles();
  renderFeeds();
  updateStatusBar();

  if (!silent) toast(`+${newCount} nuovi articoli`, newCount > 0 ? 'success' : 'info');

  // Sync to Redis if enabled
  if (state.useRedis) Redis.syncToRedis().catch(() => {});
}

// ─── Auto refresh ─────────────────────────────────────────────────────────────
function startAutoRefresh() {
  if (state.refreshTimer) clearInterval(state.refreshTimer);
  if (state.refreshInterval > 0) {
    state.refreshTimer = setInterval(() => refreshAll(true), state.refreshInterval * 60 * 1000);
  }
}

// ─── Periodic Sync registration ───────────────────────────────────────────────
async function registerPeriodicSync() {
  if (!('serviceWorker' in navigator) || !('periodicSync' in ServiceWorkerRegistration.prototype)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (status.state === 'granted') {
      await reg.periodicSync.register('feedflow-refresh', { minInterval: 15 * 60 * 1000 });
    }
  } catch (e) { /* not supported */ }
}

// ─── Filtering ────────────────────────────────────────────────────────────────
function getFilteredArticles() {
  let articles = state.articles;

  // Tab
  if (state.activeTab === 'favorites') {
    articles = articles.filter(a => state.favorites.has(a.id));
  }

  // Feed filter
  if (state.activeFeed !== 'all') {
    articles = articles.filter(a => a.feedId === state.activeFeed);
  }

  // Category
  if (state.activeCategory !== 'all') {
    articles = articles.filter(a => a.category === state.activeCategory);
  }

  // Search
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    articles = articles.filter(a =>
      a.title.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q) ||
      a.source.toLowerCase().includes(q)
    );
  }

  // Unread only
  if (state.showUnreadOnly) {
    articles = articles.filter(a => !state.readArticles.has(a.id));
  }

  // Sort
  if (state.sortBy === 'date') articles = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  else if (state.sortBy === 'title') articles = [...articles].sort((a, b) => a.title.localeCompare(b.title));
  else if (state.sortBy === 'source') articles = [...articles].sort((a, b) => a.source.localeCompare(b.source));

  return articles;
}

// ─── DOM Helpers ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);
const tmpl = id => document.getElementById(id)?.content.cloneNode(true);

function formatDate(iso) {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diff = (now - d) / 1000;
    if (diff < 60) return 'ora';
    if (diff < 3600) return `${Math.floor(diff / 60)}m fa`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h fa`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}g fa`;
    return d.toLocaleDateString('it-IT', { day: '2-digit', month: 'short' });
  } catch { return '–'; }
}

function getFeedIcon(feed) {
  if (feed.icon) return feed.icon;
  const icons = { 'reddit': '👾', 'youtube': '▶️', 'twitter': '🐦', 'nitter': '🐦', 'instagram': '📸', 'facebook': '👤' };
  for (const [k, v] of Object.entries(icons)) {
    if (feed.url.includes(k)) return v;
  }
  return '📡';
}

// ─── Rendering ────────────────────────────────────────────────────────────────
function renderArticles() {
  const grid = $('articles-grid');
  const articles = getFilteredArticles();
  const title = getViewTitle();

  $('header-title').innerHTML = `${title} <small>${articles.length} articoli</small>`;
  $('article-count').textContent = `${articles.length} risultati`;

  if (articles.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
          <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"/>
          <path d="M14 2v6h6M12 11h.01M8 15h8"/>
        </svg>
        <h3>${state.activeTab === 'favorites' ? 'Nessun preferito' : 'Nessun articolo'}</h3>
        <p>${state.activeTab === 'favorites' ? 'Aggiungi articoli ai preferiti con ★' : 'Aggiungi feed RSS dalla sidebar o aggiorna i feed esistenti.'}</p>
        ${state.feeds.length === 0 ? `<button class="empty-cta" onclick="openAddFeedModal()">+ Aggiungi feed</button>` : ''}
      </div>`;
    return;
  }

  grid.innerHTML = '';
  const fragment = document.createDocumentFragment();

  articles.forEach((a, i) => {
    const card = createCard(a, i);
    fragment.appendChild(card);
  });

  grid.appendChild(fragment);
}

function createCard(a, idx) {
  const card = document.createElement('article');
  card.className = `article-card ${state.readArticles.has(a.id) ? 'is-read' : ''}`;
  card.setAttribute('data-cat', a.category);
  card.style.animationDelay = `${Math.min(idx * 30, 300)}ms`;

  const isFav = state.favorites.has(a.id);
  const catColor = CAT_COLORS[a.category] || CAT_COLORS['Altro'];
  const placeholder = a.title.slice(0, 2).toUpperCase();

  card.innerHTML = `
    ${a.image ? `
      <div class="card-image">
        <img src="${a.image}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='<div class=\\'card-image-placeholder\\'>${placeholder}</div>'">
      </div>` : `<div class="card-image"><div class="card-image-placeholder">${placeholder}</div></div>`}
    <div class="card-body">
      <div class="card-meta">
        <span class="card-source">${escapeHtml(a.source)}</span>
        <span class="card-cat">${a.category}</span>
        <span class="card-date">${formatDate(a.date)}</span>
      </div>
      <h2 class="card-title">${escapeHtml(a.title)}</h2>
      ${a.description ? `<p class="card-desc">${escapeHtml(a.description)}</p>` : ''}
      <div class="card-footer">
        <button class="card-btn ${isFav ? 'fav' : ''}" title="Preferiti" onclick="toggleFavorite(event, '${a.id}')">
          <svg width="16" height="16" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </button>
        <button class="card-btn" title="Segna come letto" onclick="toggleRead(event, '${a.id}')">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <button class="card-btn" title="Apri sorgente" onclick="openExternal(event, '${escapeAttr(a.link)}')">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </button>
      </div>
    </div>`;

  card.addEventListener('click', e => {
    if (e.target.closest('.card-btn')) return;
    openArticle(a);
  });

  return card;
}

function renderFeeds() {
  const list = $('feeds-list');
  list.innerHTML = '';

  const all = document.createElement('div');
  all.className = `feed-item ${state.activeFeed === 'all' ? 'active' : ''}`;
  all.innerHTML = `
    <div class="feed-favicon">🌐</div>
    <span class="feed-name">Tutti i feed</span>
    <span class="feed-count">${state.articles.length}</span>`;
  all.addEventListener('click', () => {
    state.activeFeed = 'all';
    renderFeeds();
    renderArticles();
  });
  list.appendChild(all);

  state.feeds.forEach(feed => {
    const count = state.articles.filter(a => a.feedId === feed.id).length;
    const unread = state.articles.filter(a => a.feedId === feed.id && !state.readArticles.has(a.id)).length;
    const item = document.createElement('div');
    item.className = `feed-item ${state.activeFeed === feed.id ? 'active' : ''} ${unread > 0 ? 'feed-unread' : ''}`;
    item.innerHTML = `
      <div class="feed-favicon">${getFeedIcon(feed)}</div>
      <span class="feed-name">${escapeHtml(feed.name)}</span>
      <span class="feed-count" title="${unread} non letti">${unread > 0 ? unread : count}</span>
      <div class="feed-actions">
        <button class="feed-action-btn" title="Modifica" onclick="openEditFeedModal(event, '${feed.id}')">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="feed-action-btn danger" title="Rimuovi" onclick="removeFeed(event, '${feed.id}')">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>`;
    item.addEventListener('click', e => {
      if (e.target.closest('.feed-actions')) return;
      state.activeFeed = feed.id;
      renderFeeds();
      renderArticles();
    });
    list.appendChild(item);
  });
}

function renderCategoryChips() {
  const container = $('category-chips');
  const cats = ['all', ...Object.keys(CATEGORIES), 'Altro'];

  container.innerHTML = cats.map(cat => {
    const color = cat === 'all' ? '#9ea3b5' : (CAT_COLORS[cat] || CAT_COLORS['Altro']);
    const count = cat === 'all' ? state.articles.length : state.articles.filter(a => a.category === cat).length;
    if (cat !== 'all' && count === 0) return '';
    return `
      <button class="cat-chip ${state.activeCategory === cat ? 'active' : ''}" onclick="filterByCategory('${cat}')">
        <span class="cat-dot" style="background:${color}"></span>
        ${cat === 'all' ? 'Tutti' : cat}
        <span style="opacity:0.6;font-size:10px">${count}</span>
      </button>`;
  }).join('');
}

function renderSidebar() {
  const feedsSection = $('sidebar-feeds-section');
  const settingsSection = $('sidebar-settings-section');
  feedsSection.style.display = state.activeTab === 'feeds' || state.activeTab === 'favorites' ? '' : 'none';
  settingsSection.style.display = state.activeTab === 'settings' ? '' : 'none';
}

function renderSettingsPanel() {
  $('settings-refresh-interval').value = state.refreshInterval;
  $('settings-redis-url').value = state.redisUrl;
  $('settings-redis-token').value = state.redisToken;
  const toggle = $('settings-redis-toggle');
  toggle.className = `toggle ${state.useRedis ? 'on' : ''}`;
  $('settings-unread-toggle').className = `toggle ${state.showUnreadOnly ? 'on' : ''}`;
}

function getViewTitle() {
  if (state.activeTab === 'favorites') return 'Preferiti';
  if (state.activeFeed !== 'all') {
    const feed = state.feeds.find(f => f.id === state.activeFeed);
    return feed?.name || 'Feed';
  }
  if (state.activeCategory !== 'all') return state.activeCategory;
  return 'FeedFlow';
}

function updateStatusBar() {
  const dot = $('status-dot');
  const label = $('status-label');
  const lastSync = $('last-sync');

  if (!state.isOnline) { dot.className = 'status-dot offline'; label.textContent = 'Offline'; }
  else if (state.isRefreshing) { dot.className = 'status-dot syncing'; label.textContent = 'Aggiornamento…'; }
  else { dot.className = 'status-dot'; label.textContent = 'Online'; }

  if (state.lastSync) lastSync.textContent = `Ultimo sync: ${formatDate(state.lastSync.toISOString())}`;
}

function setStatusSyncing(s) { state.isRefreshing = s; updateStatusBar(); }

// ─── Article Detail ───────────────────────────────────────────────────────────
function openArticle(article) {
  markRead(article.id);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay article-detail-modal';
  overlay.innerHTML = `
    <div class="modal" style="max-width:700px">
      <div class="modal-header">
        <div>
          <div class="article-detail-meta">
            <span class="article-detail-source">${escapeHtml(article.source)}</span>
            <span class="card-cat" style="font-size:11px;padding:2px 8px;border-radius:20px">${article.category}</span>
            <span style="font-size:11px;color:var(--text3);font-family:DM Mono,monospace">${formatDate(article.date)}</span>
          </div>
        </div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div class="modal-body">
        ${article.image ? `<img class="article-detail-image" src="${article.image}" alt="" onerror="this.remove()">` : ''}
        <h1 class="article-detail-title">${escapeHtml(article.title)}</h1>
        <div class="article-detail-body">
          ${article.description ? `<p>${escapeHtml(article.description)}</p>` : '<p style="color:var(--text3)">Nessun sommario disponibile.</p>'}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" onclick="toggleFavoriteById('${article.id}')">
          ${state.favorites.has(article.id) ? '★ Rimuovi dai preferiti' : '☆ Aggiungi ai preferiti'}
        </button>
        <a class="btn btn-primary" href="${escapeHtml(article.link)}" target="_blank" rel="noopener">Leggi completo ↗</a>
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ─── Actions ──────────────────────────────────────────────────────────────────
function toggleFavorite(e, id) {
  e.stopPropagation();
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
  Storage.save();
  renderArticles();
}

function toggleFavoriteById(id) {
  if (state.favorites.has(id)) state.favorites.delete(id);
  else state.favorites.add(id);
  Storage.save();
  renderArticles();
}

function toggleRead(e, id) {
  e.stopPropagation();
  if (state.readArticles.has(id)) state.readArticles.delete(id);
  else markRead(id);
  Storage.save();
  renderArticles();
}

function markRead(id) {
  state.readArticles.add(id);
}

function openExternal(e, url) {
  e.stopPropagation();
  if (url) window.open(url, '_blank', 'noopener,noreferrer');
}

function filterByCategory(cat) {
  state.activeCategory = cat;
  renderCategoryChips();
  renderArticles();
}

function removeFeed(e, id) {
  e.stopPropagation();
  if (!confirm('Rimuovere questo feed?')) return;
  state.feeds = state.feeds.filter(f => f.id !== id);
  state.articles = state.articles.filter(a => a.feedId !== id);
  if (state.activeFeed === id) state.activeFeed = 'all';
  Storage.save();
  renderFeeds();
  renderCategoryChips();
  renderArticles();
  toast('Feed rimosso', 'info');
}

function markAllRead() {
  const filtered = getFilteredArticles();
  filtered.forEach(a => state.readArticles.add(a.id));
  Storage.save();
  renderArticles();
  renderFeeds();
  toast('Tutto segnato come letto', 'info');
}

// ─── Add/Edit Feed Modal ──────────────────────────────────────────────────────
let editingFeedId = null;

function openAddFeedModal() {
  editingFeedId = null;
  showFeedModal({ name: '', url: '', category: 'Tecnologia' });
}

function openEditFeedModal(e, id) {
  e.stopPropagation();
  editingFeedId = id;
  const feed = state.feeds.find(f => f.id === id);
  if (feed) showFeedModal(feed);
}

function showFeedModal(feed) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'feed-modal-overlay';

  const presetHtml = Object.entries(PRESET_FEEDS).map(([group, feeds]) => `
    <div class="form-group">
      <div class="form-label">${group}</div>
      <div class="preset-chips">
        ${feeds.map(f => `
          <span class="preset-chip" onclick="fillFeedPreset('${escapeAttr(f.name)}','${escapeAttr(f.url)}')">${f.name}</span>
        `).join('')}
      </div>
    </div>`).join('');

  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <span class="modal-title">${editingFeedId ? 'Modifica Feed' : 'Aggiungi Feed'}</span>
        <button class="modal-close" onclick="document.getElementById('feed-modal-overlay').remove()">✕</button>
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label class="form-label">URL Feed RSS *</label>
          <input class="form-input" id="feed-url" type="url" placeholder="https://esempio.com/feed.xml" value="${escapeHtml(feed.url || '')}">
          <div class="form-hint">Supporta RSS 2.0, Atom. Per social usa RSS bridge (es. Reddit, YouTube, Nitter per Twitter).</div>
        </div>
        <div class="form-group">
          <label class="form-label">Nome <span>(opzionale, viene rilevato automaticamente)</span></label>
          <input class="form-input" id="feed-name" type="text" placeholder="Il mio feed" value="${escapeHtml(feed.name || '')}">
        </div>
        <div class="form-group">
          <label class="form-label">Categoria predefinita</label>
          <select class="form-select" id="feed-category">
            ${[...Object.keys(CATEGORIES), 'Altro'].map(c => `<option value="${c}" ${feed.category === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
        <hr style="border:none;border-top:1px solid var(--border);margin:16px 0">
        <div class="form-label" style="margin-bottom:10px">⚡ Feed popolari</div>
        ${presetHtml}
      </div>
      <div class="modal-footer">
        ${editingFeedId ? `<button class="btn btn-danger" onclick="removeFeedFromModal()">Elimina</button>` : ''}
        <button class="btn btn-secondary" onclick="document.getElementById('feed-modal-overlay').remove()">Annulla</button>
        <button class="btn btn-primary" onclick="saveFeed()">
          ${editingFeedId ? 'Salva' : 'Aggiungi Feed'}
        </button>
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function fillFeedPreset(name, url) {
  $('feed-url').value = url;
  if (!$('feed-name').value || $('feed-name').value === $('feed-name').placeholder) {
    $('feed-name').value = name;
  }
}

async function saveFeed() {
  const url = $('feed-url').value.trim();
  const name = $('feed-name').value.trim();
  const category = $('feed-category').value;

  if (!url) { toast('Inserisci un URL valido', 'error'); return; }

  if (editingFeedId) {
    const feed = state.feeds.find(f => f.id === editingFeedId);
    if (feed) { feed.url = url; feed.name = name || feed.name; feed.category = category; }
  } else {
    if (state.feeds.some(f => f.url === url)) { toast('Feed già presente!', 'error'); return; }
    const id = 'f' + Date.now();
    state.feeds.push({ id, name: name || new URL(url).hostname, url, category, icon: '' });
  }

  document.getElementById('feed-modal-overlay')?.remove();
  Storage.save();
  renderFeeds();
  toast(editingFeedId ? 'Feed aggiornato' : 'Feed aggiunto! Aggiornamento…', 'success');

  if (!editingFeedId) {
    const newFeed = state.feeds[state.feeds.length - 1];
    const articles = await fetchFeed(newFeed);
    let newCount = 0;
    const existingIds = new Set(state.articles.map(a => a.id));
    articles.forEach(a => { if (!existingIds.has(a.id)) { state.articles.unshift(a); newCount++; } });
    state.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    Storage.save();
    renderArticles();
    renderFeeds();
    renderCategoryChips();
    toast(`+${newCount} articoli caricati`, 'success');
  }
}

function removeFeedFromModal() {
  if (!editingFeedId) return;
  if (!confirm('Eliminare il feed?')) return;
  state.feeds = state.feeds.filter(f => f.id !== editingFeedId);
  state.articles = state.articles.filter(a => a.feedId !== editingFeedId);
  document.getElementById('feed-modal-overlay')?.remove();
  Storage.save();
  renderFeeds();
  renderArticles();
  toast('Feed eliminato', 'info');
}

// ─── Import/Export ────────────────────────────────────────────────────────────
function importDB() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = async e => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      await Storage.import(file);
      renderFeeds();
      renderArticles();
      renderCategoryChips();
      renderSettingsPanel();
      toast('Database importato con successo!', 'success');
    } catch (err) {
      toast('Errore importazione: file non valido', 'error');
    }
  };
  input.click();
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function toast(message, type = 'info') {
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const container = $('toast-container');
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(el);
  setTimeout(() => {
    el.classList.add('toast-fade');
    setTimeout(() => el.remove(), 300);
  }, 3500);
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function escapeHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function escapeAttr(str) {
  if (!str) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function showSkeletons() {
  const grid = $('articles-grid');
  grid.innerHTML = Array.from({ length: 6 }).map(() => `
    <div class="skeleton">
      <div class="skeleton-img"></div>
      <div class="skeleton-body">
        <div class="skeleton-line short"></div>
        <div class="skeleton-line tall"></div>
        <div class="skeleton-line"></div>
        <div class="skeleton-line short"></div>
      </div>
    </div>`).join('');
}

// ─── Settings ─────────────────────────────────────────────────────────────────
function saveSettings() {
  state.refreshInterval = parseInt($('settings-refresh-interval').value) || 15;
  state.redisUrl = $('settings-redis-url').value.trim().replace(/\/$/, '');
  state.redisToken = $('settings-redis-token').value.trim();
  Storage.save();
  startAutoRefresh();
  toast('Impostazioni salvate!', 'success');
}

// ─── Service Worker ───────────────────────────────────────────────────────────
async function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.register('./sw.js');
    console.log('SW registered:', reg.scope);

    navigator.serviceWorker.addEventListener('message', e => {
      if (e.data?.type === 'BG_REFRESH') {
        toast('Aggiornamento in background completato', 'info');
        refreshAll(true);
      }
    });

    // Check for pending background refresh
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'CHECK_PENDING' });
    }

    await registerPeriodicSync();
  } catch (e) { console.warn('SW failed:', e); }
}

// ─── Sidebar Tab Switching ────────────────────────────────────────────────────
function switchTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  renderSidebar();
  if (tab === 'settings') renderSettingsPanel();
  else renderArticles();
}

// ─── Init ─────────────────────────────────────────────────────────────────────
async function init() {
  Storage.load();
  initServiceWorker();

  // Online/offline
  window.addEventListener('online', () => {
    state.isOnline = true;
    updateStatusBar();
    refreshAll(true);
  });
  window.addEventListener('offline', () => {
    state.isOnline = false;
    updateStatusBar();
    toast('Sei offline', 'error');
  });

  // Search
  let searchTimer;
  $('search-input').addEventListener('input', e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.searchQuery = e.target.value;
      renderArticles();
    }, 300);
  });

  // Sort buttons
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.sortBy = btn.dataset.sort;
      renderArticles();
    });
  });

  // Nav tabs
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  // Settings panel events (delegated)
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.id === 'settings-redis-toggle') {
      state.useRedis = !state.useRedis;
      t.className = `toggle ${state.useRedis ? 'on' : ''}`;
    }
    if (t.id === 'settings-unread-toggle') {
      state.showUnreadOnly = !state.showUnreadOnly;
      t.className = `toggle ${state.showUnreadOnly ? 'on' : ''}`;
      renderArticles();
    }
    if (t.id === 'redis-sync-btn') Redis.syncToRedis();
    if (t.id === 'redis-load-btn') Redis.loadFromRedis().then(() => { renderFeeds(); renderArticles(); });
  });

  // Mobile sidebar
  const sidebarOverlay = $('sidebar-overlay');
  $('menu-btn').addEventListener('click', () => {
    $('sidebar').classList.add('open');
    sidebarOverlay.classList.add('visible');
  });
  sidebarOverlay?.addEventListener('click', () => {
    $('sidebar').classList.remove('open');
    sidebarOverlay.classList.remove('visible');
  });

  // Render initial state
  renderFeeds();
  renderCategoryChips();
  renderSidebar();
  updateStatusBar();

  // Show skeletons then fetch
  if (state.articles.length === 0) {
    showSkeletons();
    await refreshAll(true);
  } else {
    renderArticles();
    // Refresh in background after showing cached
    setTimeout(() => refreshAll(true), 1000);
  }

  startAutoRefresh();

  // Handle hash
  if (location.hash === '#favorites') switchTab('favorites');
}

// Expose to global for inline handlers
Object.assign(window, {
  openAddFeedModal, openEditFeedModal, saveFeed, removeFeedFromModal,
  removeFeed, toggleFavorite, toggleFavoriteById, toggleRead, openExternal,
  filterByCategory, fillFeedPreset, importDB, markAllRead, saveSettings,
  refreshAll
});

document.addEventListener('DOMContentLoaded', init);
