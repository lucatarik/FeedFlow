# FeedFlow – RSS & Social Reader PWA

Lettore RSS/Atom con auto-catalogazione, supporto social via RSS bridge, sincronizzazione Redis e funzionamento offline.

## Funzionalità

| Feature | Dettaglio |
|---|---|
| **Feed RSS/Atom** | Supporto nativo RSS 2.0 e Atom via proxy CORS |
| **Social** | Instagram/Facebook via rss.app; Twitter via Nitter; YouTube e Reddit nativi |
| **Auto-catalogazione** | Algoritmo keyword per 8 categorie (Tech, Politica, Sport, Scienza, Economia, Mondo, Entertainment, Altro) |
| **Preferiti** | Tab dedicata, persistente in localStorage e Redis |
| **Background sync** | Periodic Background Sync API (Chrome) + auto-refresh configurabile |
| **Offline** | Service Worker con cache-first per asset statici |
| **Import/Export** | Backup completo feeds + articoli + preferiti in JSON |
| **Redis (cloud)** | Sync opzionale via Upstash Redis REST API |
| **PWA installabile** | Manifest, icone, splash screen |
| **Filtri** | Per categoria, per feed, per data/titolo/fonte |
| **Ricerca** | Full-text su titolo, descrizione, fonte |

## Aggiungere feed Social

### YouTube
```
https://www.youtube.com/feeds/videos.xml?channel_id=UC_xxxxxxxxxxxxxx
```

### Reddit
```
https://www.reddit.com/r/italy.rss
https://www.reddit.com/r/technology.rss
```

### Twitter/X (via Nitter)
```
https://nitter.privacydev.net/username/rss
```

### Instagram / Facebook
Usa [rss.app](https://rss.app) (piano gratuito disponibile) o [fetchrss.com](https://fetchrss.com).

## Redis (Cloud Sync opzionale)

1. Crea account gratuito su [upstash.com](https://upstash.com)
2. Crea un database Redis
3. Copia **REST URL** e **REST Token**
4. Incollali in **Impostazioni → Redis** nella app

## Struttura file

```
feedflow/
├── index.html      ← App principale + struttura HTML
├── style.css       ← Stili dark theme + responsive
├── app.js          ← Logica, fetching RSS, storage, UI
├── sw.js           ← Service Worker (cache + background sync)
└── manifest.json   ← PWA manifest
```

## Personalizzazione

Nel file `app.js` puoi modificare:
- `DEFAULT_FEEDS` – feed pre-caricati all'avvio
- `CATEGORIES` – aggiungi parole chiave per migliorare la categorizzazione
- `CORS_PROXIES` – proxy alternativi se uno è down

## Installazione come App

1. Apri la URL su Chrome/Edge/Safari
2. Chrome: click sull'icona "Installa" nella barra degli indirizzi
3. iOS Safari: tap "Condividi" → "Aggiungi a schermata Home"
