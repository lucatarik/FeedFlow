/* ─── FeedFlow App v2.0 ──────────────────────────────────────────────────── */
'use strict';

// ─── CORS Proxies ─────────────────────────────────────────────────────────────
const CORS_PROXIES = [
  url => `https://corsproxy.io/?${encodeURIComponent(url)}`,
  url => `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`,
  url => `https://thingproxy.freeboard.io/fetch/${url}`,
];

// ─── Categories & Keywords ────────────────────────────────────────────────────
const CATEGORIES = {
  'AI e LLM': [
    'llm', 'gpt', 'chatgpt', 'claude ', 'gemini ', 'openai', 'anthropic', 'mistral',
    'llama ', 'stable diffusion', 'midjourney', 'diffusion', 'transformer', 'neural network',
    'machine learning', 'deep learning', 'artificial intelligence', 'intelligenza artificiale',
    'language model', 'generative ai', 'gen ai', 'rag ', 'fine-tun', 'inference',
    'hugging face', 'pytorch', 'tensorflow', 'copilot', 'ai model', 'training data',
    'prompt engineering', 'embeddings', 'vector db', 'rlhf', 'alignment', 'sora ',
    'dall-e', 'imagen', 'text-to-image', 'multimodal', 'foundation model', 'ai agent',
  ],
  'Programmazione': [
    'javascript', 'typescript', 'python', 'rust ', 'golang', 'kotlin', 'swift ',
    'react ', 'vue ', 'angular ', 'svelte', 'node.js', 'nodejs', 'next.js', 'nextjs',
    'css ', 'html ', 'api ', 'rest api', 'graphql', 'websocket', 'docker', 'kubernetes',
    'devops', 'ci/cd', 'git ', 'github', 'gitlab', 'open source', 'framework',
    'library ', 'npm ', 'package', 'deploy', 'microservice', 'backend', 'frontend',
    'full stack', 'sql ', 'database', 'postgresql', 'redis ', 'mongodb', 'bash ',
    'algorithm', 'data structure', 'refactor', 'code review', 'web assembly',
    'wasm', 'lambda', 'serverless', 'webdev', 'programming', 'coding',
  ],
  'Geek': [
    'hacker', 'maker', 'raspberry', 'arduino', 'diy ', 'retro', 'vintage tech',
    'emulator', 'modding', 'overclocking', 'benchmark', 'hardware', 'cpu', 'gpu ',
    'motherboard', 'memory ram', 'ssd ', 'nvme', 'monitor', 'keyboard', 'mechanical keyboard',
    'custom pc', 'build pc', 'unboxing', 'teardown', 'repair ', 'ifixit', 'soldering',
    'circuit', 'pcb ', 'electronics', 'comic', 'manga', 'anime', 'cosplay',
    'convention', 'expo ', 'hackathon', 'drone ', 'fpga', 'microcontroller', 'maker space',
  ],
  'Cinema': [
    'film ', 'movie', 'cinema', 'director', 'actor', 'actress', 'regista', 'attore',
    'oscar', 'golden globe', 'cannes', 'venice film', 'sundance', 'tribeca',
    'trailer', 'teaser', 'sequel', 'prequel', 'reboot', 'remake', 'franchise',
    'box office', 'review film', 'recensione film', 'serie tv', 'tv show', 'episode',
    'season ', 'netflix', 'disney+', 'hbo', 'amazon prime', 'apple tv', 'streaming',
    'blockbuster', 'indie film', 'animation', 'pixar', 'marvel', 'dc comics',
    'star wars', 'documentary', 'docuserie', 'premiere', 'cinematography',
  ],
  'Stampa 3D': [
    'stampa 3d', '3d print', 'fdm ', 'resin ', 'msla', 'sla ', 'fff ', 'filament',
    'pla ', 'abs ', 'petg', 'tpu ', 'nylon filament', 'ender', 'bambu', 'prusa',
    'creality', 'anycubic', 'elegoo', 'flashforge', 'voron', 'bed leveling',
    'slicer', 'cura', 'prusaslicer', 'chitubox', 'support ', 'infill', 'layer height',
    'stl ', 'obj file', '3mf', 'thingiverse', 'printables', 'makerworld',
    'myminifactory', 'cults3d', 'cgtrader stl', 'free model', 'free stl',
    'blender', '3d model', 'cad ', 'zbrush', 'maya ', 'cinema 4d', '3ds max',
    'houdini', 'unreal engine', 'unity3d', 'mesh', 'polygon', 'sculpt',
    'artstation', 'sketchfab', 'vfx', 'visual effect', 'photogrammetry',
  ],
  'Videogiochi': [
    'videogioco', 'videogiochi', 'game ', 'gaming', 'playstation', 'ps5', 'ps4',
    'xbox', 'nintendo', 'switch ', 'steam', 'epic games', 'gog ', 'pc gaming',
    'esport', 'esports', 'twitch', 'streamer', 'speedrun', 'indie game',
    'action rpg', 'fps game', 'mmorpg', 'battle royale', 'open world',
    'early access', 'dlc ', 'patch ', 'update game', 'review game', 'gioco',
    'souls', 'elden ring', 'call of duty', 'minecraft', 'fortnite', 'league of legends',
    'dota', 'valorant', 'apex ', 'overwatch', 'diablo', 'cyberpunk', 'gta ',
    'game dev', 'game jam', 'unity game', 'unreal game', 'retro game', 'emulat',
  ],
  'News dal Mondo': [
    'world news', 'breaking news', 'international', 'global', 'foreign',
    'diplomacy', 'united nations', 'nato', 'eu ', 'european union',
    'usa news', 'us politics', 'white house', 'congress', 'senate',
    'uk news', 'france', 'germany', 'china news', 'russia news',
    'ukraine', 'middle east', 'asia news', 'africa news', 'latin america',
    'war ', 'conflict', 'sanctions', 'treaty', 'summit', 'g7', 'g20',
    'climate summit', 'human rights', 'refugee', 'migration', 'pandemic',
    'economy global', 'trade war', 'tariff', 'embargo',
  ],
  'News Italiane': [
    'italia', 'italiano', 'italiane', 'governo italiano', 'parlamento italiano',
    'quirinale', 'palazzo chigi', 'senato italiano', 'camera dei deputati',
    'meloni', 'salvini', 'schlein', 'conte ', 'tajani', 'pd ', 'lega ',
    'fratelli d\'italia', 'forza italia', 'movimento 5 stelle', 'm5s',
    'ansa ', 'corriere della sera', 'la repubblica', 'il sole 24 ore',
    'gazzetta dello sport', 'mediaset', 'rai ', 'la7', 'tg1', 'tg5',
    'serie a', 'calcio italiano', 'milan', 'juventus', 'napoli', 'inter',
    'economia italiana', 'pil italiano', 'disoccupazione italy', 'pensioni',
    'manovra', 'finanziaria', 'decreto legge', 'regione', 'comune',
  ],
  'Tecnologia': [
    'tech', 'software', 'app ', 'digital', 'cyber', 'robot', 'iphone', 'android',
    'google', 'apple ', 'microsoft', 'computer', 'internet', 'startup', 'silicon valley',
    'cloud', 'blockchain', 'nft', 'gadget', 'smartphone', 'tablet', 'wearable',
    'iot ', 'smart home', 'autonomous', 'self-driving', 'quantum computing', 'cybersecurity',
    'hacking', 'data breach', 'privacy', 'surveillance', 'satellite', '5g', '6g',
  ],
  'Politica': [
    'governo', 'politica', 'elezioni', 'parlamento', 'ministro', 'president',
    'politics', 'senate', 'premier', 'biden', 'trump', 'meloni', 'macron',
    'election', 'vote', 'partito', 'sinistra', 'destra', 'democrazia', 'legge',
    'decreto', 'riforma', 'opposizione', 'coalizione', 'referendum',
  ],
  'Sport': [
    'calcio', 'sport', 'football', 'basketball', 'tennis', 'champions', 'serie a',
    'nba', 'fifa', 'juventus', 'milan ', 'inter ', 'roma ', 'napoli ', 'formula 1',
    'moto gp', 'wimbledon', 'olimpiadi', 'coppa del mondo', 'goal', 'gol ', 'match ',
    'partita', 'campionato', 'torneo', 'playoff', 'transfer', 'calciomercato',
  ],
  'Scienza': [
    'scienza', 'ricerca', 'climate', 'spazio', 'nasa', 'medicina', 'salute',
    'virus', 'vaccino', 'cancer', 'biology', 'physics', 'chemistry', 'discovery',
    'scoperta', 'universo', 'pianeta', 'asteroid', 'dna ', 'genome', 'quantum',
    'neuroscience', 'evoluzione', 'fossile', 'climate change', 'astronomia',
  ],
  'Economia': [
    'economia', 'mercato', 'borsa', 'finanza', 'bitcoin', 'crypto', 'euro ',
    'inflazione', 'pil ', 'bce ', 'fed ', 'stock', 'invest', 'startup', 'banca',
    'lavoro', 'recessione', 'interest rate', 'dow jones', 'wall street', 'ipo ',
    'acquisition', 'merger', 'revenue', 'profitto', 'perdita', 'bilancio',
  ],
  'Mondo': [
    'guerra', 'conflitto', 'diplomazia', 'internazionale', 'onu ', 'nato ',
    'ucraina', 'russia ', 'cina ', 'medio oriente', 'palestina', 'israele',
    'siria', 'africa ', 'asia ', 'brexit', 'refugee', 'profughi', 'immigraz',
    'geopolitica', 'sanzioni', 'accordo', 'trattato', 'embargo',
  ],
  'Entertainment': [
    'musica', 'album ', 'concert', 'grammys', 'festival', 'sanremo', 'celebrity',
    'videogame', 'gaming', 'playstation', 'xbox', 'nintendo', 'steam', 'esport',
    'pop culture', 'meme', 'viral', 'youtuber', 'podcast', 'libro', 'romanzo',
  ],
};

const CAT_COLORS = {
  'AI e LLM':      '#00d4ff',
  'Programmazione':'#7ee787',
  'Geek':          '#ff7b54',
  'Cinema':        '#da70d6',
  'Stampa 3D':     '#ffa500',
  'Videogiochi':   '#ff4d8d',
  'News dal Mondo':'#4d9de0',
  'News Italiane': '#009246',
  'Tecnologia':    '#60b4ff',
  'Politica':      '#e05252',
  'Sport':         '#4caf88',
  'Scienza':       '#9b72cf',
  'Economia':      '#f0c040',
  'Mondo':         '#e0759b',
  'Entertainment': '#ffcb4d',
  'Altro':         '#5c6178',
};

// ─── Feed Discovery Catalog ───────────────────────────────────────────────────
const FEED_CATALOG = {
  'AI e LLM': [
    { name: 'The Batch – DeepLearning.AI', url: 'https://www.deeplearning.ai/the-batch/feed/', desc: 'Newsletter settimanale su AI e ML' },
    { name: 'Hugging Face Blog',           url: 'https://huggingface.co/blog/feed.xml',         desc: 'Novità modelli e ricerca HF' },
    { name: 'OpenAI Blog',                 url: 'https://openai.com/blog/rss.xml',               desc: 'Annunci e ricerche OpenAI' },
    { name: 'Google AI Blog',              url: 'https://blog.research.google/feeds/posts/default', desc: 'Ricerca Google DeepMind & AI' },
    { name: 'MIT Tech Review – AI',        url: 'https://www.technologyreview.com/feed/',         desc: 'Analisi e news AI da MIT' },
    { name: 'VentureBeat AI',              url: 'https://venturebeat.com/category/ai/feed/',       desc: 'Notizie AI e business' },
    { name: 'The Gradient',                url: 'https://thegradient.pub/rss/',                   desc: 'Ricerca approfondita su ML' },
    { name: 'Towards Data Science',        url: 'https://towardsdatascience.com/feed',            desc: 'Articoli pratici su AI/ML' },
    { name: 'AI Alignment Forum',          url: 'https://www.alignmentforum.org/feed.xml',        desc: 'Sicurezza e allineamento AI' },
    { name: 'r/MachineLearning',           url: 'https://www.reddit.com/r/MachineLearning.rss',   desc: 'Community ML su Reddit' },
    { name: 'r/LocalLLaMA',               url: 'https://www.reddit.com/r/LocalLLaMA.rss',        desc: 'LLM locali e open source' },
    { name: 'Lil\'Log – Lilian Weng',     url: 'https://lilianweng.github.io/lil-log/feed.xml',  desc: 'Deep dives su ML research' },
    { name: 'Andrej Karpathy Blog',        url: 'https://karpathy.github.io/feed.xml',             desc: 'Blog tecnico AI (ex OpenAI)' },
    { name: 'Simon Willison\'s Weblog',    url: 'https://simonwillison.net/atom/everything/',       desc: 'LLM tools e sperimentazione' },
    { name: 'The Rundown AI',              url: 'https://www.therundown.ai/rss',                   desc: 'Daily AI news digest' },
  ],
  'Programmazione': [
    { name: 'Dev.to',                  url: 'https://dev.to/feed',                               desc: 'Community articoli sviluppatori' },
    { name: 'CSS-Tricks',              url: 'https://css-tricks.com/feed/',                       desc: 'Tecniche web e CSS avanzato' },
    { name: 'Smashing Magazine',       url: 'https://www.smashingmagazine.com/feed/',             desc: 'Web design e sviluppo' },
    { name: 'GitHub Blog',             url: 'https://github.blog/feed/',                           desc: 'Novità GitHub e open source' },
    { name: 'Stack Overflow Blog',     url: 'https://stackoverflow.blog/feed/',                    desc: 'Insights dalla community SO' },
    { name: 'Mozilla Hacks',           url: 'https://hacks.mozilla.org/feed/',                    desc: 'Web APIs e Firefox dev' },
    { name: 'A List Apart',            url: 'https://alistapart.com/main/feed/',                   desc: 'Articoli UX/frontend di qualità' },
    { name: 'Joel on Software',        url: 'https://www.joelonsoftware.com/feed/',                desc: 'Software engineering classico' },
    { name: 'Martin Fowler',           url: 'https://martinfowler.com/feed.atom',                  desc: 'Architecture e patterns' },
    { name: 'The Pragmatic Engineer',  url: 'https://newsletter.pragmaticengineer.com/feed',       desc: 'Ingegneria software e carriera' },
    { name: 'ByteByteGo',              url: 'https://blog.bytebytego.com/feed',                    desc: 'System design visuale' },
    { name: 'r/programming',           url: 'https://www.reddit.com/r/programming.rss',            desc: 'Link e discussioni programmazione' },
    { name: 'r/webdev',                url: 'https://www.reddit.com/r/webdev.rss',                 desc: 'Sviluppo web su Reddit' },
    { name: 'r/rust',                  url: 'https://www.reddit.com/r/rust.rss',                   desc: 'Community Rust su Reddit' },
    { name: 'Hacker News Frontpage',   url: 'https://hnrss.org/frontpage',                         desc: 'Top link della community HN' },
  ],
  'Geek': [
    { name: 'Hackaday',        url: 'https://hackaday.com/feed/',                     desc: 'Hack, maker e DIY electronics' },
    { name: 'Engadget',        url: 'https://www.engadget.com/rss.xml',               desc: 'Gadget e tech consumer' },
    { name: 'Gizmodo',         url: 'https://gizmodo.com/rss',                        desc: 'Tech, scienza e geek culture' },
    { name: 'Tom\'s Hardware', url: 'https://www.tomshardware.com/feeds/all',          desc: 'Review hardware approfonditi' },
    { name: 'CNET',            url: 'https://www.cnet.com/rss/news/',                 desc: 'Notizie tech consumer' },
    { name: 'Ars Technica',    url: 'https://feeds.arstechnica.com/arstechnica/index', desc: 'Tech, scienza e cultura' },
    { name: 'Slashdot',        url: 'http://rss.slashdot.org/Slashdot/slashdotMain',  desc: 'News per nerd dal 1997' },
    { name: 'Make Magazine',   url: 'https://makezine.com/feed/',                     desc: 'Maker culture e DIY' },
    { name: 'iFixit News',     url: 'https://www.ifixit.com/News/atom.xml',            desc: 'Repair culture e teardown' },
    { name: 'Lifehacker',      url: 'https://lifehacker.com/rss',                     desc: 'Tips tech e produttività' },
    { name: 'r/geek',          url: 'https://www.reddit.com/r/geek.rss',              desc: 'Geek culture su Reddit' },
    { name: 'r/hardware',      url: 'https://www.reddit.com/r/hardware.rss',          desc: 'Hardware su Reddit' },
    { name: 'r/gaming',        url: 'https://www.reddit.com/r/gaming.rss',            desc: 'Gaming su Reddit' },
    { name: 'AnandTech',       url: 'https://www.anandtech.com/rss/',                 desc: 'Analisi hardware tecnica' },
    { name: 'r/DIY',           url: 'https://www.reddit.com/r/DIY.rss',               desc: 'Progetti fai-da-te su Reddit' },
  ],
  'Cinema': [
    { name: 'Variety',              url: 'https://variety.com/feed/',                    desc: 'Entertainment industry news' },
    { name: 'Hollywood Reporter',   url: 'https://www.hollywoodreporter.com/feed/',       desc: 'Cinema e TV industry' },
    { name: 'Screen Rant',          url: 'https://screenrant.com/feed/',                  desc: 'News e review film/serie' },
    { name: 'Film School Rejects',  url: 'https://filmschoolrejects.com/feed/',           desc: 'Critica indipendente cinema' },
    { name: 'Indiewire',            url: 'https://www.indiewire.com/feed/',               desc: 'Cinema indie e festival' },
    { name: 'Roger Ebert.com',      url: 'https://www.rogerebert.com/feed',               desc: 'Recensioni classiche e nuove' },
    { name: 'The AV Club',          url: 'https://www.avclub.com/rss',                    desc: 'Pop culture e cinema' },
    { name: 'Collider',             url: 'https://collider.com/feed/',                    desc: 'Trailer, review, news Marvel/DC' },
    { name: 'Den of Geek',          url: 'https://www.denofgeek.com/feed/',               desc: 'Sci-fi, fantasy, cinema geek' },
    { name: 'Cinematographe.it',    url: 'https://www.cinematographe.it/feed/',           desc: 'Recensioni e news cinema IT' },
    { name: 'MyMovies.it',          url: 'https://www.mymovies.it/rss/film/',             desc: 'Cinema italiano, uscite' },
    { name: 'r/movies',             url: 'https://www.reddit.com/r/movies.rss',           desc: 'Discussioni cinema su Reddit' },
    { name: 'r/television',         url: 'https://www.reddit.com/r/television.rss',       desc: 'Serie TV su Reddit' },
    { name: 'Letterboxd Journal',   url: 'https://letterboxd.com/journal/feed/',           desc: 'Film journal e community picks' },
    { name: 'Total Film',           url: 'https://www.gamesradar.com/film/rss/',          desc: 'Review e feature cinematografiche' },
  ],
  'Stampa 3D': [
    { name: 'All3DP',              url: 'https://all3dp.com/feed/',                              desc: 'Guide stampa 3D, recensioni printer e filamenti' },
    { name: 'Hackaday – 3D Print', url: 'https://hackaday.com/tag/3d-printing/feed/',            desc: 'Progetti maker e hack stampa 3D' },
    { name: 'Fabbaloo',            url: 'https://fabbaloo.com/feed',                              desc: 'News industria stampa 3D e additive manufacturing' },
    { name: 'Thingiverse Blog',    url: 'https://blog.thingiverse.com/feed',                      desc: 'La più grande libreria STL gratuiti' },
    { name: 'Printables Blog',     url: 'https://blog.printables.com/feed/',                      desc: 'News e modelli da Prusa / Printables' },
    { name: '3DPrint.com',         url: 'https://3dprint.com/feed/',                              desc: 'Notizie quotidiane stampa 3D' },
    { name: '3D Printing Industry',url: 'https://3dprintingindustry.com/feed/',                   desc: 'Business e tech additive manufacturing' },
    { name: 'Pinshape Blog',       url: 'https://pinshape.com/blog/feed/',                        desc: 'Modelli e community stampa 3D' },
    { name: 'MyMiniFactory Blog',  url: 'https://www.myminifactory.com/blog/feed/',               desc: 'Modelli STL garantiti stampabili' },
    { name: 'Cults3D Blog',        url: 'https://cults3d.com/blog/feed',                          desc: 'Marketplace STL e tutorial' },
    { name: 'r/3Dprinting',        url: 'https://www.reddit.com/r/3Dprinting.rss',               desc: 'Community stampa 3D su Reddit' },
    { name: 'r/resinprinting',     url: 'https://www.reddit.com/r/resinprinting.rss',            desc: 'Stampa resina MSLA/SLA su Reddit' },
    { name: 'r/blender',           url: 'https://www.reddit.com/r/blender.rss',                  desc: 'Blender – modellazione e rendering' },
    { name: 'r/3Dmodeling',        url: 'https://www.reddit.com/r/3Dmodeling.rss',               desc: 'Modellazione 3D su Reddit' },
    { name: 'BlenderNation',       url: 'https://www.blendernation.com/feed/',                    desc: 'Tutorial, news e risorse Blender' },
    { name: 'CGSociety',           url: 'https://cgsociety.org/feed',                             desc: 'VFX, animazione e concept art' },
    { name: 'ArtStation Blog',     url: 'https://www.artstation.com/blog/rss',                    desc: 'Showcase artisti 3D e digital art' },
    { name: 'Sketchfab Blog',      url: 'https://blog.sketchfab.com/feed/',                       desc: 'Modelli 3D visualizzabili online' },
  ],
  'Videogiochi': [
    { name: 'IGN',                 url: 'https://feeds.ign.com/ign/all',                          desc: 'News, review e trailer videogiochi' },
    { name: 'Eurogamer',           url: 'https://www.eurogamer.net/feed',                         desc: 'Review approfondite e news gaming' },
    { name: 'PC Gamer',            url: 'https://www.pcgamer.com/rss/',                           desc: 'PC gaming, review e build guide' },
    { name: 'Kotaku',              url: 'https://kotaku.com/rss',                                  desc: 'Gaming news e cultura pop' },
    { name: 'Game Informer',       url: 'https://www.gameinformer.com/feed',                      desc: 'Review e preview videogiochi' },
    { name: 'Polygon',             url: 'https://www.polygon.com/rss/index.xml',                  desc: 'Gaming, pop culture e review' },
    { name: 'GamesRadar+',         url: 'https://www.gamesradar.com/rss/',                        desc: 'Notizie gaming e guide' },
    { name: 'Rock Paper Shotgun',  url: 'https://www.rockpapershotgun.com/feed',                  desc: 'PC gaming indie e AAA' },
    { name: 'Eurogamer.it',        url: 'https://www.eurogamer.it/feed',                          desc: 'Gaming news in italiano' },
    { name: 'Spaziogames',         url: 'https://www.spaziogames.it/feed',                        desc: 'News e review gaming IT' },
    { name: 'Tom\'s Hardware Games',url: 'https://www.tomshardware.com/feeds/gaming',             desc: 'Gaming hardware e performance' },
    { name: 'r/gaming',            url: 'https://www.reddit.com/r/gaming.rss',                   desc: 'La grande community gaming Reddit' },
    { name: 'r/pcgaming',          url: 'https://www.reddit.com/r/pcgaming.rss',                 desc: 'PC gaming su Reddit' },
    { name: 'r/nintendo',          url: 'https://www.reddit.com/r/nintendo.rss',                 desc: 'Nintendo community su Reddit' },
    { name: 'r/indiegaming',       url: 'https://www.reddit.com/r/indiegaming.rss',              desc: 'Indie games su Reddit' },
  ],
  'News dal Mondo': [
    { name: 'BBC World News',      url: 'https://feeds.bbci.co.uk/news/world/rss.xml',           desc: 'Notizie internazionali BBC' },
    { name: 'Reuters World',       url: 'https://feeds.reuters.com/reuters/topNews',              desc: 'Agenzia stampa internazionale' },
    { name: 'Al Jazeera English',  url: 'https://www.aljazeera.com/xml/rss/all.xml',             desc: 'Prospettiva internazionale dal Qatar' },
    { name: 'The Guardian World',  url: 'https://www.theguardian.com/world/rss',                 desc: 'Mondo dal Guardian UK' },
    { name: 'Associated Press',    url: 'https://apnews.com/apf-topnews',                         desc: 'AP News – agenzia stampa US' },
    { name: 'NPR World',           url: 'https://feeds.npr.org/1004/rss.xml',                    desc: 'Notizie mondo da NPR' },
    { name: 'Deutsche Welle',      url: 'https://rss.dw.com/xml/rss-en-world',                   desc: 'News internazionali da DW' },
    { name: 'France24 English',    url: 'https://www.france24.com/en/rss',                       desc: 'Notizie mondo da France 24' },
    { name: 'Der Spiegel Int.',    url: 'https://www.spiegel.de/international/index.rss',         desc: 'Analisi e news da Spiegel' },
    { name: 'Internazionale',      url: 'https://www.internazionale.it/sitemaps/rss.xml',         desc: 'Il meglio della stampa mondiale in IT' },
    { name: 'Le Monde Diplomatique',url:'https://www.monde-diplomatique.fr/recents.rss',         desc: 'Geopolitica e analisi in profondità' },
    { name: 'Foreign Policy',      url: 'https://foreignpolicy.com/feed/',                        desc: 'Politica estera e geopolitica' },
    { name: 'The Economist',       url: 'https://www.economist.com/news/rss.xml',                desc: 'Analisi economica e geopolitica' },
    { name: 'r/worldnews',         url: 'https://www.reddit.com/r/worldnews.rss',                desc: 'World news su Reddit' },
    { name: 'EURACTIV',            url: 'https://www.euractiv.com/feed/',                         desc: 'Europa e politiche UE' },
  ],
  'News Italiane': [
    { name: 'ANSA Generale',       url: 'https://www.ansa.it/sito/ansait_rss.xml',               desc: 'Agenzia stampa italiana n.1' },
    { name: 'La Repubblica',       url: 'https://www.repubblica.it/rss/homepage/rss2.0.xml',     desc: 'Quotidiano nazionale' },
    { name: 'Corriere della Sera', url: 'https://xml2.corrieredellasera.it/rss/homepage.xml',    desc: 'Il più letto in Italia' },
    { name: 'Il Sole 24 Ore',      url: 'https://www.ilsole24ore.com/rss/mondo.xml',             desc: 'Economia e finanza italiana' },
    { name: 'La Stampa',           url: 'https://www.lastampa.it/rss.xml',                        desc: 'Quotidiano torinese storico' },
    { name: 'Il Fatto Quotidiano', url: 'https://www.ilfattoquotidiano.it/feed/',                 desc: 'News e approfondimenti IT' },
    { name: 'TGCom24',             url: 'https://www.tgcom24.mediaset.it/rss/ultim-ora.xml',     desc: 'Ultime notizie Mediaset' },
    { name: 'Sky TG24',            url: 'https://tg24.sky.it/rss.xml',                            desc: 'Breaking news Sky' },
    { name: 'Wired Italia',        url: 'https://www.wired.it/feed/rss',                          desc: 'Tech e digitale in italiano' },
    { name: 'Tom\'s Hardware IT',  url: 'https://www.tomshw.it/feed',                             desc: 'Hardware tech in italiano' },
    { name: 'Punto Informatico',   url: 'https://www.punto-informatico.it/feed/',                 desc: 'Tech news dal 1996' },
    { name: 'HTML.it',             url: 'https://www.html.it/feed/',                              desc: 'Web e programmazione in IT' },
    { name: 'Multiplayer.it',      url: 'https://multiplayer.it/rss.xml',                         desc: 'Gaming in italiano' },
    { name: 'r/italy',             url: 'https://www.reddit.com/r/italy.rss',                    desc: 'Community italiana su Reddit' },
    { name: 'Open Online',         url: 'https://www.open.online/feed/',                          desc: 'News fact-checked italiane' },
  ],
  'Tecnologia': [
    { name: 'The Verge',     url: 'https://www.theverge.com/rss/index.xml',                   desc: 'Tech, scienza e cultura digitale' },
    { name: 'Wired',         url: 'https://www.wired.com/feed/rss',                            desc: 'Cultura digitale e innovazione' },
    { name: 'TechCrunch',    url: 'https://techcrunch.com/feed/',                              desc: 'Startup, VC e tech news' },
    { name: 'ANSA Tech',     url: 'https://www.ansa.it/sito/notizie/tecnologia/tecnologia_rss.xml', desc: 'Tech news in italiano' },
    { name: 'Wired Italia',  url: 'https://www.wired.it/feed/rss',                             desc: 'Wired Italia' },
    { name: 'Tom\'s HW IT', url: 'https://www.tomshw.it/feed',                                 desc: 'Hardware e tech in italiano' },
  ],
  'Scienza': [
    { name: 'NASA Breaking News', url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss', desc: 'Notizie spazio e NASA' },
    { name: 'Science Daily',      url: 'https://www.sciencedaily.com/rss/all.xml',        desc: 'Ricerche scientifiche quotidiane' },
    { name: 'Scientific American',url: 'https://rss.sciam.com/ScientificAmerican-Global', desc: 'Divulgazione scientifica' },
    { name: 'New Scientist',       url: 'https://www.newscientist.com/feed/home/',         desc: 'Scienza settimanale' },
    { name: 'Nature',              url: 'https://www.nature.com/nature.rss',               desc: 'Ricerca scientifica di punta' },
    { name: 'ESA News',            url: 'https://www.esa.int/rssfeed/Our_Activities/Space_Science', desc: 'Agenzia Spaziale Europea' },
  ],
};

const DEFAULT_FEEDS = [
  { id: 'f_hn', name: 'Hacker News',        url: 'https://hnrss.org/frontpage',                          category: 'Programmazione',  icon: '🟠' },
  { id: 'f_hf', name: 'Hugging Face Blog',  url: 'https://huggingface.co/blog/feed.xml',                  category: 'AI e LLM',        icon: '🤗' },
  { id: 'f_vb', name: 'VentureBeat AI',     url: 'https://venturebeat.com/category/ai/feed/',             category: 'AI e LLM',        icon: '🤖' },
  { id: 'f_vg', name: 'The Verge',          url: 'https://www.theverge.com/rss/index.xml',                category: 'Tecnologia',      icon: '◆'  },
  { id: 'f_cs', name: 'CSS-Tricks',         url: 'https://css-tricks.com/feed/',                          category: 'Programmazione',  icon: '💄' },
  { id: 'f_hc', name: 'Hackaday',           url: 'https://hackaday.com/feed/',                            category: 'Geek',            icon: '🔧' },
  { id: 'f_a3', name: 'All3DP',             url: 'https://all3dp.com/feed/',                              category: 'Stampa 3D',       icon: '🖨️' },
  { id: 'f_bn', name: 'BlenderNation',      url: 'https://www.blendernation.com/feed/',                   category: 'Stampa 3D',       icon: '🎨' },
  { id: 'f_sr', name: 'Screen Rant',        url: 'https://screenrant.com/feed/',                          category: 'Cinema',          icon: '🎬' },
  { id: 'f_ns', name: 'NASA News',          url: 'https://www.nasa.gov/rss/dyn/breaking_news.rss',        category: 'Scienza',         icon: '🚀' },
  { id: 'f_ig', name: 'IGN',               url: 'https://feeds.ign.com/ign/all',                          category: 'Videogiochi',     icon: '🎮' },
  { id: 'f_eu', name: 'Eurogamer',          url: 'https://www.eurogamer.net/feed',                        category: 'Videogiochi',     icon: '🎮' },
  { id: 'f_bbc',name: 'BBC World',          url: 'https://feeds.bbci.co.uk/news/world/rss.xml',           category: 'News dal Mondo',  icon: '🌍' },
  { id: 'f_an', name: 'ANSA',              url: 'https://www.ansa.it/sito/ansait_rss.xml',                category: 'News Italiane',   icon: '🇮🇹' },
  { id: 'f_rb', name: 'r/3Dprinting',       url: 'https://www.reddit.com/r/3Dprinting.rss',              category: 'Stampa 3D',       icon: '👾' },
  { id: 'f_rm', name: 'r/MachineLearning',  url: 'https://www.reddit.com/r/MachineLearning.rss',          category: 'AI e LLM',        icon: '👾' },
];

// ─── Image Cache ──────────────────────────────────────────────────────────────
const imageCache = (() => {
  try { return JSON.parse(localStorage.getItem('ff_img_cache') || '{}'); } catch { return {}; }
})();
let imageCacheDirty = false;

function saveImageCache() {
  if (!imageCacheDirty) return;
  try {
    const entries = Object.entries(imageCache);
    if (entries.length > 600) {
      const trimmed = Object.fromEntries(entries.slice(-500));
      Object.keys(imageCache).forEach(k => delete imageCache[k]);
      Object.assign(imageCache, trimmed);
    }
    localStorage.setItem('ff_img_cache', JSON.stringify(imageCache));
    imageCacheDirty = false;
  } catch { /* quota */ }
}
setInterval(saveImageCache, 8000);

// OG image fetching
const ogQueue = new Set();
let ogWorkerActive = false;

async function fetchOgImage(url) {
  if (!url) return '';
  if (imageCache[url] !== undefined) return imageCache[url];
  try {
    const html = await fetchWithProxy(url, 0);
    const ogImg = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']{10,})["']/i)
               || html.match(/<meta[^>]+content=["']([^"']{10,})["'][^>]+property=["']og:image["']/i);
    const twImg = html.match(/<meta[^>]+name=["']twitter:image["'][^>]+content=["']([^"']{10,})["']/i)
               || html.match(/<meta[^>]+content=["']([^"']{10,})["'][^>]+name=["']twitter:image["']/i);
    const raw = ogImg?.[1] || twImg?.[1] || '';
    const img = raw.replace(/&amp;/g, '&').trim();
    imageCache[url] = img;
    imageCacheDirty = true;
    return img;
  } catch {
    imageCache[url] = '';
    imageCacheDirty = true;
    return '';
  }
}

async function processOgQueue() {
  if (ogWorkerActive || ogQueue.size === 0) return;
  ogWorkerActive = true;
  for (const articleId of [...ogQueue].slice(0, 10)) {
    ogQueue.delete(articleId);
    const article = state.articles.find(a => a.id === articleId);
    if (!article || article.image || !article.link) continue;
    const img = await fetchOgImage(article.link);
    if (img) {
      article.image = img;
      const card = document.querySelector(`[data-article-id="${articleId}"]`);
      if (card) {
        const ph = card.querySelector('.card-image-placeholder');
        if (ph) {
          const im = document.createElement('img');
          im.src = img; im.alt = ''; im.loading = 'lazy';
          im.onerror = () => { im.remove(); };
          ph.replaceWith(im);
        }
      }
    }
    await new Promise(r => setTimeout(r, 700));
  }
  ogWorkerActive = false;
  if (ogQueue.size > 0) setTimeout(processOgQueue, 1500);
}

const ogObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.dataset.articleId;
      if (id) { ogQueue.add(id); ogObserver.unobserve(entry.target); if (!ogWorkerActive) setTimeout(processOgQueue, 400); }
    }
  });
}, { rootMargin: '300px' });

// ─── State ────────────────────────────────────────────────────────────────────
const state = {
  feeds: [], articles: [], favorites: new Set(), readArticles: new Set(),
  activeTab: 'feeds', activeFeed: 'all', activeCategory: 'all',
  searchQuery: '', sortBy: 'date', showUnreadOnly: false,
  refreshInterval: 15, refreshTimer: null, isRefreshing: false,
  redisUrl: '', redisToken: '', useRedis: false,
  lastSync: null, isOnline: navigator.onLine,
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
        refreshInterval: state.refreshInterval, showUnreadOnly: state.showUnreadOnly,
        sortBy: state.sortBy, redisUrl: state.redisUrl,
        redisToken: state.redisToken, useRedis: state.useRedis,
      }));
      localStorage.setItem('ff_lastSync', new Date().toISOString());
    } catch (e) { console.warn('Storage save failed:', e); }
  },
  load() {
    try {
      const feeds    = JSON.parse(localStorage.getItem('ff_feeds'));
      const articles = JSON.parse(localStorage.getItem('ff_articles'));
      const favorites= JSON.parse(localStorage.getItem('ff_favorites'));
      const read     = JSON.parse(localStorage.getItem('ff_read'));
      const settings = JSON.parse(localStorage.getItem('ff_settings'));
      const lastSync = localStorage.getItem('ff_lastSync');
      if (feeds?.length)     state.feeds    = feeds;    else state.feeds = DEFAULT_FEEDS;
      if (articles?.length)  state.articles = articles;
      if (favorites?.length) state.favorites = new Set(favorites);
      if (read?.length)      state.readArticles = new Set(read);
      if (settings) { Object.assign(state, settings); state.redisUrl = settings.redisUrl||''; state.redisToken = settings.redisToken||''; state.useRedis = settings.useRedis||false; }
      if (lastSync) state.lastSync = new Date(lastSync);
    } catch { state.feeds = DEFAULT_FEEDS; }
  },
  export() {
    const data = { version:'2.0', exported: new Date().toISOString(), feeds: state.feeds, articles: state.articles, favorites:[...state.favorites], read:[...state.readArticles] };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
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
          if (data.feeds)     state.feeds    = data.feeds;
          if (data.articles)  state.articles = data.articles;
          if (data.favorites) state.favorites = new Set(data.favorites);
          if (data.read)      state.readArticles = new Set(data.read);
          Storage.save(); resolve(data);
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
    try { const r = await fetch(`${state.redisUrl}/get/${key}`, { headers:{ Authorization:`Bearer ${state.redisToken}` } }); const d = await r.json(); return d.result ? JSON.parse(d.result) : null; } catch { return null; }
  },
  async set(key, value) {
    if (!state.useRedis || !state.redisUrl) return;
    try { await fetch(`${state.redisUrl}/set/${key}`, { method:'POST', headers:{ Authorization:`Bearer ${state.redisToken}`, 'Content-Type':'application/json' }, body: JSON.stringify(JSON.stringify(value)) }); } catch { }
  },
  async syncToRedis() {
    if (!state.useRedis || !state.redisUrl) return;
    await Promise.all([ Redis.set('ff:feeds', state.feeds), Redis.set('ff:favorites', [...state.favorites]), Redis.set('ff:articles_meta', state.articles.slice(0,200).map(a=>({id:a.id,title:a.title,source:a.source,date:a.date}))) ]);
    toast('Sincronizzato con Redis!', 'success');
  },
  async loadFromRedis() {
    if (!state.useRedis || !state.redisUrl) return;
    const [feeds, favorites] = await Promise.all([Redis.get('ff:feeds'), Redis.get('ff:favorites')]);
    if (feeds?.length)     state.feeds    = feeds;
    if (favorites?.length) state.favorites = new Set(favorites);
    toast('Dati caricati da Redis!', 'success');
  }
};

// ─── RSS Parsing ──────────────────────────────────────────────────────────────
async function fetchWithProxy(url, proxyIndex = 0) {
  if (proxyIndex >= CORS_PROXIES.length) throw new Error('All proxies failed');
  try {
    const res = await fetch(CORS_PROXIES[proxyIndex](url), { signal: AbortSignal.timeout(14000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } catch { return fetchWithProxy(url, proxyIndex + 1); }
}

function extractImage(item, desc) {
  // 1. media:content / media:thumbnail
  const mc = item.querySelector('media\\:content[url], media\\:thumbnail[url]');
  if (mc) { const u = mc.getAttribute('url'); if (u?.startsWith('http')) return u; }

  // 2. Any media element with url attr
  for (const el of item.querySelectorAll('[url]')) {
    const u = el.getAttribute('url');
    if (u?.match(/\.(jpe?g|png|webp|gif)/i)) return u;
  }

  // 3. itunes:image
  const it = item.querySelector('itunes\\:image');
  if (it) { const u = it.getAttribute('href') || it.textContent?.trim(); if (u?.startsWith('http')) return u; }

  // 4. enclosure
  const enc = item.querySelector('enclosure[type^="image"]');
  if (enc) { const u = enc.getAttribute('url'); if (u) return u; }

  // 5. First <img> with decent src in description
  const imgMatch = desc.match(/<img[^>]+src=["']([^"']{12,})["'][^>]*>/i);
  if (imgMatch) { const u = imgMatch[1]; if (!u.includes('pixel') && !u.includes('track') && !u.includes('1x1')) return u; }

  // 6. og:image in content
  const ogMatch = desc.match(/og:image.*?content=["']([^"']+)["']/i);
  if (ogMatch) return ogMatch[1];

  // 7. Direct image URL in description
  const urlMatch = desc.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)(?:\?[^\s"'<>]*)?/i);
  if (urlMatch) return urlMatch[0];

  return '';
}

function parseRSS(xmlText, feed) {
  const parser = new DOMParser();
  let doc = parser.parseFromString(xmlText, 'application/xml');
  if (doc.querySelector('parsererror')) doc = parser.parseFromString(xmlText, 'text/html');

  const isAtom = !!doc.querySelector('feed > entry');
  const items  = doc.querySelectorAll(isAtom ? 'entry' : 'item');
  const articles = [];

  items.forEach((item, i) => {
    const getText = (...tags) => {
      for (const tag of tags) { const el = item.querySelector(tag); if (el) { const t = el.textContent.trim(); if (t) return t; } }
      return '';
    };

    const title   = getText('title').replace(/<[^>]+>/g, '').trim();
    const rawLink = item.querySelector('link[href]')?.getAttribute('href') || item.querySelector('link')?.getAttribute('href') || getText('link', 'guid');
    const link    = rawLink?.startsWith('http') ? rawLink : (rawLink?.startsWith('/') ? new URL(rawLink, feed.url).href : '');
    const pubDate = getText('pubDate', 'published', 'updated', 'dc\\:date', 'date');
    const desc    = getText('content\\:encoded', 'content', 'description', 'summary');
    if (!title && !link) return;

    const image     = extractImage(item, desc);
    const cleanDesc = desc.replace(/<[^>]+>/g,'').replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ').trim().slice(0, 400);
    const id        = btoa(encodeURIComponent((link||title||String(i)).slice(0,120))).replace(/[^a-zA-Z0-9]/g,'').slice(0,22) + '_' + feed.id;

    articles.push({ id, title, link, description: cleanDesc, image,
      date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      source: feed.name, feedId: feed.id,
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
  try { return parseRSS(await fetchWithProxy(feed.url), feed); }
  catch (e) { console.warn(`Feed ${feed.name} failed:`, e.message); return []; }
}

async function refreshAll(silent = false) {
  if (state.isRefreshing) return;
  if (!state.isOnline) { toast('Offline – impossibile aggiornare', 'error'); return; }
  state.isRefreshing = true;
  $('refresh-btn')?.querySelector('svg')?.classList.add('refresh-spin');
  setStatusSyncing(true);
  if (!silent) toast(`Aggiornamento ${state.feeds.length} feed…`, 'info');

  const results = await Promise.allSettled(state.feeds.map(f => fetchFeed(f)));
  const existingIds = new Set(state.articles.map(a => a.id));
  let newCount = 0;
  results.forEach(r => {
    if (r.status !== 'fulfilled') return;
    r.value.forEach(article => { if (!existingIds.has(article.id)) { state.articles.unshift(article); newCount++; } });
  });

  state.articles = state.articles.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 2000);
  state.lastSync = new Date();
  state.isRefreshing = false;
  $('refresh-btn')?.querySelector('svg')?.classList.remove('refresh-spin');
  setStatusSyncing(false);

  Storage.save(); renderArticles(); renderFeeds(); renderCategoryChips(); updateStatusBar();
  if (!silent) toast(`+${newCount} nuovi articoli`, newCount > 0 ? 'success' : 'info');
  if (state.useRedis) Redis.syncToRedis().catch(() => {});
}

function startAutoRefresh() {
  if (state.refreshTimer) clearInterval(state.refreshTimer);
  if (state.refreshInterval > 0) state.refreshTimer = setInterval(() => refreshAll(true), state.refreshInterval * 60 * 1000);
}

async function registerPeriodicSync() {
  if (!('serviceWorker' in navigator) || !('periodicSync' in ServiceWorkerRegistration.prototype)) return;
  try {
    const reg = await navigator.serviceWorker.ready;
    const status = await navigator.permissions.query({ name: 'periodic-background-sync' });
    if (status.state === 'granted') await reg.periodicSync.register('feedflow-refresh', { minInterval: 15 * 60 * 1000 });
  } catch { }
}

// ─── Filtering ────────────────────────────────────────────────────────────────
function getFilteredArticles() {
  let articles = state.activeTab === 'favorites' ? state.articles.filter(a => state.favorites.has(a.id)) : state.articles;
  if (state.activeFeed !== 'all')     articles = articles.filter(a => a.feedId   === state.activeFeed);
  if (state.activeCategory !== 'all') articles = articles.filter(a => a.category === state.activeCategory);
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    articles = articles.filter(a => a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q) || a.source.toLowerCase().includes(q));
  }
  if (state.showUnreadOnly) articles = articles.filter(a => !state.readArticles.has(a.id));
  if      (state.sortBy === 'date')   return [...articles].sort((a,b) => new Date(b.date) - new Date(a.date));
  else if (state.sortBy === 'title')  return [...articles].sort((a,b) => a.title.localeCompare(b.title));
  else if (state.sortBy === 'source') return [...articles].sort((a,b) => a.source.localeCompare(b.source));
  return articles;
}

// ─── DOM Helpers ──────────────────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function formatDate(iso) {
  try {
    const d = new Date(iso), now = new Date(), diff = (now - d) / 1000;
    if (diff < 60)     return 'ora';
    if (diff < 3600)   return `${Math.floor(diff / 60)}m fa`;
    if (diff < 86400)  return `${Math.floor(diff / 3600)}h fa`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}g fa`;
    return d.toLocaleDateString('it-IT', { day:'2-digit', month:'short' });
  } catch { return '–'; }
}

function getFeedIcon(feed) {
  if (feed.icon) return feed.icon;
  const m = { reddit:'👾', youtube:'▶️', twitter:'🐦', nitter:'🐦', instagram:'📸', facebook:'👤', blender:'🎨', github:'🐙', nasa:'🚀' };
  for (const [k, v] of Object.entries(m)) if (feed.url.toLowerCase().includes(k)) return v;
  return '📡';
}

function escapeHtml(str) { if (!str) return ''; return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escapeAttr(str) { if (!str) return ''; return String(str).replace(/'/g,"\\'").replace(/"/g,'&quot;'); }

// ─── Render Articles ──────────────────────────────────────────────────────────
function renderArticles() {
  const grid     = $('articles-grid');
  const articles = getFilteredArticles();

  $('header-title').innerHTML = `${getViewTitle()} <small>${articles.length} articoli</small>`;
  $('article-count').textContent = `${articles.length} risultati`;

  if (articles.length === 0) {
    grid.innerHTML = `<div class="empty-state">
      <svg width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z"/><path d="M14 2v6h6M12 11h.01M8 15h8"/></svg>
      <h3>${state.activeTab === 'favorites' ? 'Nessun preferito' : 'Nessun articolo'}</h3>
      <p>${state.activeTab === 'favorites' ? 'Aggiungi articoli ai preferiti con ★' : 'Aggiungi feed RSS dalla sidebar.'}</p>
      ${state.feeds.length === 0 ? `<button class="empty-cta" onclick="openDiscoverModal()">🔍 Scopri feed →</button>` : ''}
    </div>`;
    return;
  }

  grid.innerHTML = '';
  const frag = document.createDocumentFragment();
  articles.forEach((a, i) => frag.appendChild(createCard(a, i)));
  grid.appendChild(frag);
}

function createCard(a, idx) {
  const card = document.createElement('article');
  card.className = `article-card ${state.readArticles.has(a.id) ? 'is-read' : ''}`;
  card.setAttribute('data-cat', a.category);
  card.setAttribute('data-article-id', a.id);
  card.style.animationDelay = `${Math.min(idx * 25, 300)}ms`;

  const isFav  = state.favorites.has(a.id);
  const ph     = a.title.slice(0, 2).toUpperCase();
  const color  = CAT_COLORS[a.category] || CAT_COLORS['Altro'];

  card.innerHTML = `
    <div class="card-image">
      ${a.image
        ? `<img src="${escapeHtml(a.image)}" alt="" loading="lazy" onerror="handleImgError(this,'${escapeAttr(a.id)}','${ph}')">`
        : `<div class="card-image-placeholder" style="--cat-color:${color}">${ph}</div>`}
    </div>
    <div class="card-body">
      <div class="card-meta">
        <span class="card-source">${escapeHtml(a.source)}</span>
        <span class="card-cat" style="background:${color}18;color:${color};border-color:${color}30">${a.category}</span>
        <span class="card-date">${formatDate(a.date)}</span>
      </div>
      <h2 class="card-title">${escapeHtml(a.title)}</h2>
      ${a.description ? `<p class="card-desc">${escapeHtml(a.description)}</p>` : ''}
      <div class="card-footer">
        <button class="card-btn ${isFav ? 'fav' : ''}" title="Preferiti" onclick="toggleFavorite(event,'${a.id}')">
          <svg width="16" height="16" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </button>
        <button class="card-btn" title="Segna letto" onclick="toggleRead(event,'${a.id}')">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
        <button class="card-btn" title="Apri originale" onclick="openExternal(event,'${escapeAttr(a.link)}')">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </button>
      </div>
    </div>`;

  card.addEventListener('click', e => { if (!e.target.closest('.card-btn')) openArticle(a); });
  if (!a.image && a.link) ogObserver.observe(card);
  return card;
}

function handleImgError(img, articleId, ph) {
  img.style.display = 'none';
  const color = img.closest('[data-cat]') ? (CAT_COLORS[img.closest('[data-cat]').dataset.cat] || '#5c6178') : '#5c6178';
  const parent = img.parentElement;
  if (parent) parent.innerHTML = `<div class="card-image-placeholder" style="--cat-color:${color}">${ph}</div>`;
  if (articleId) { ogQueue.add(articleId); if (!ogWorkerActive) setTimeout(processOgQueue, 100); }
}

// ─── Render Feeds (grouped by category) ──────────────────────────────────────
function renderFeeds() {
  const list = $('feeds-list');
  list.innerHTML = '';

  const allEl = document.createElement('div');
  allEl.className = `feed-item ${state.activeFeed === 'all' ? 'active' : ''}`;
  allEl.innerHTML = `<div class="feed-favicon">🌐</div><span class="feed-name">Tutti i feed</span><span class="feed-count">${state.articles.length}</span>`;
  allEl.addEventListener('click', () => { state.activeFeed = 'all'; renderFeeds(); renderArticles(); });
  list.appendChild(allEl);

  // Group feeds by category
  const groups = {};
  state.feeds.forEach(f => { const c = f.category || 'Altro'; (groups[c] = groups[c]||[]).push(f); });

  Object.entries(groups).forEach(([cat, feeds]) => {
    const gh = document.createElement('div');
    gh.className = 'feed-group-header';
    gh.innerHTML = `<span class="cat-dot" style="background:${CAT_COLORS[cat]||'#5c6178'}"></span>${cat}`;
    list.appendChild(gh);

    feeds.forEach(feed => {
      const count  = state.articles.filter(a => a.feedId === feed.id).length;
      const unread = state.articles.filter(a => a.feedId === feed.id && !state.readArticles.has(a.id)).length;
      const el     = document.createElement('div');
      el.className = `feed-item ${state.activeFeed === feed.id ? 'active' : ''} ${unread > 0 ? 'feed-unread' : ''}`;
      el.innerHTML = `
        <div class="feed-favicon">${getFeedIcon(feed)}</div>
        <span class="feed-name">${escapeHtml(feed.name)}</span>
        <span class="feed-count">${unread > 0 ? unread : count}</span>
        <div class="feed-actions">
          <button class="feed-action-btn" onclick="openEditFeedModal(event,'${feed.id}')"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></button>
          <button class="feed-action-btn danger" onclick="removeFeed(event,'${feed.id}')"><svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3,6 5,6 21,6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6M9 6V4h6v2"/></svg></button>
        </div>`;
      el.addEventListener('click', e => { if (e.target.closest('.feed-actions')) return; state.activeFeed = feed.id; renderFeeds(); renderArticles(); });
      list.appendChild(el);
    });
  });
}

function renderCategoryChips() {
  const container = $('category-chips');
  const cats = ['all', ...Object.keys(CATEGORIES), 'Altro'];
  container.innerHTML = cats.map(cat => {
    const count = cat === 'all' ? state.articles.length : state.articles.filter(a => a.category === cat).length;
    if (cat !== 'all' && count === 0) return '';
    const color = cat === 'all' ? '#9ea3b5' : (CAT_COLORS[cat] || CAT_COLORS['Altro']);
    return `<button class="cat-chip ${state.activeCategory === cat ? 'active' : ''}" onclick="filterByCategory('${cat}')">
      <span class="cat-dot" style="background:${color}"></span>${cat === 'all' ? 'Tutti' : cat}
      <span style="opacity:.6;font-size:10px">${count}</span>
    </button>`;
  }).join('');
}

function renderSidebar() {
  $('sidebar-feeds-section').style.display = state.activeTab !== 'settings' ? '' : 'none';
  $('sidebar-settings-section').style.display = state.activeTab === 'settings' ? '' : 'none';
}

function renderSettingsPanel() {
  $('settings-refresh-interval').value = state.refreshInterval;
  $('settings-redis-url').value        = state.redisUrl;
  $('settings-redis-token').value      = state.redisToken;
  $('settings-redis-toggle').className = `toggle ${state.useRedis ? 'on' : ''}`;
  $('settings-unread-toggle').className = `toggle ${state.showUnreadOnly ? 'on' : ''}`;
}

function getViewTitle() {
  if (state.activeTab === 'favorites')  return '★ Preferiti';
  if (state.activeFeed !== 'all')       return state.feeds.find(f => f.id === state.activeFeed)?.name || 'Feed';
  if (state.activeCategory !== 'all')  return state.activeCategory;
  return 'FeedFlow';
}

function updateStatusBar() {
  const dot = $('status-dot'), label = $('status-label'), ls = $('last-sync');
  if (!state.isOnline)         { dot.className = 'status-dot offline'; label.textContent = 'Offline'; }
  else if (state.isRefreshing) { dot.className = 'status-dot syncing'; label.textContent = 'Aggiornamento…'; }
  else                          { dot.className = 'status-dot';         label.textContent = 'Online'; }
  if (state.lastSync) ls.textContent = `Sync: ${formatDate(state.lastSync.toISOString())}`;
}
function setStatusSyncing(s) { state.isRefreshing = s; updateStatusBar(); }

// ─── Article Detail Modal ─────────────────────────────────────────────────────
function openArticle(article) {
  markRead(article.id);
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const color = CAT_COLORS[article.category] || CAT_COLORS['Altro'];
  overlay.innerHTML = `
    <div class="modal" style="max-width:700px">
      <div class="modal-header">
        <div>
          <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:4px">
            <span style="font-size:12px;font-weight:600;color:var(--text3);text-transform:uppercase;letter-spacing:.5px">${escapeHtml(article.source)}</span>
            <span style="font-size:10px;font-weight:600;padding:2px 8px;border-radius:20px;background:${color}18;color:${color};border:1px solid ${color}30">${article.category}</span>
            <span style="font-size:11px;color:var(--text3);font-family:DM Mono,monospace">${formatDate(article.date)}</span>
          </div>
        </div>
        <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
      </div>
      <div class="modal-body">
        ${article.image ? `<img style="width:100%;height:220px;object-fit:cover;border-radius:10px;margin-bottom:16px" src="${escapeHtml(article.image)}" alt="" onerror="this.remove()">` : ''}
        <h1 style="font-family:Playfair Display,serif;font-size:24px;font-weight:900;line-height:1.2;color:var(--text);margin-bottom:12px">${escapeHtml(article.title)}</h1>
        <div style="font-size:15px;color:var(--text2);line-height:1.7">
          ${article.description ? `<p>${escapeHtml(article.description)}</p>` : '<p style="color:var(--text3)">Nessun sommario disponibile.</p>'}
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" id="fav-detail-btn" onclick="toggleFavoriteById('${article.id}');this.textContent=state.favorites.has('${article.id}')?'★ Rimuovi':'☆ Preferiti'">
          ${state.favorites.has(article.id) ? '★ Rimuovi' : '☆ Preferiti'}
        </button>
        ${article.link ? `<a class="btn btn-primary" href="${escapeHtml(article.link)}" target="_blank" rel="noopener">Leggi completo ↗</a>` : ''}
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

// ─── Actions ──────────────────────────────────────────────────────────────────
function toggleFavorite(e, id) { e.stopPropagation(); state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id); Storage.save(); renderArticles(); }
function toggleFavoriteById(id) { state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id); Storage.save(); renderArticles(); }
function toggleRead(e, id) { e.stopPropagation(); state.readArticles.has(id) ? state.readArticles.delete(id) : state.readArticles.add(id); Storage.save(); renderArticles(); }
function markRead(id) { state.readArticles.add(id); }
function openExternal(e, url) { e.stopPropagation(); if (url) window.open(url, '_blank', 'noopener,noreferrer'); }
function filterByCategory(cat) { state.activeCategory = cat; renderCategoryChips(); renderArticles(); }

function removeFeed(e, id) {
  e.stopPropagation();
  if (!confirm('Rimuovere questo feed?')) return;
  state.feeds = state.feeds.filter(f => f.id !== id);
  state.articles = state.articles.filter(a => a.feedId !== id);
  if (state.activeFeed === id) state.activeFeed = 'all';
  Storage.save(); renderFeeds(); renderCategoryChips(); renderArticles();
  toast('Feed rimosso', 'info');
}

function markAllRead() {
  getFilteredArticles().forEach(a => state.readArticles.add(a.id));
  Storage.save(); renderArticles(); renderFeeds();
  toast('Tutto segnato come letto', 'info');
}

// ─── Add / Edit Feed ──────────────────────────────────────────────────────────
let editingFeedId = null;

function openAddFeedModal() { editingFeedId = null; showFeedModal({ name:'', url:'', category:'AI e LLM' }); }
function openEditFeedModal(e, id) { e.stopPropagation(); editingFeedId = id; const f = state.feeds.find(f => f.id === id); if (f) showFeedModal(f); }

function showFeedModal(feed) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay'; overlay.id = 'feed-modal-overlay';
  const catOpts = [...Object.keys(CATEGORIES), 'Altro'].map(c => `<option value="${c}" ${feed.category === c ? 'selected':''}>${c}</option>`).join('');
  const presetHtml = Object.entries({ 'AI e LLM': FEED_CATALOG['AI e LLM'].slice(0,4), 'Programmazione': FEED_CATALOG['Programmazione'].slice(0,4), 'Geek': FEED_CATALOG['Geek'].slice(0,3), 'Cinema': FEED_CATALOG['Cinema'].slice(0,3), 'Modelli 3D': FEED_CATALOG['Modelli 3D'].slice(0,3) }).map(([group, feeds]) => `
    <div class="form-group">
      <div class="form-label" style="color:${CAT_COLORS[group]||'var(--text3)'}">■ ${group}</div>
      <div class="preset-chips">${feeds.map(f => `<span class="preset-chip" onclick="fillFeedPreset('${escapeAttr(f.name)}','${escapeAttr(f.url)}')">${f.name}</span>`).join('')}</div>
    </div>`).join('');
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header"><span class="modal-title">${editingFeedId ? 'Modifica' : '+ Aggiungi'} Feed</span>
        <button class="modal-close" onclick="document.getElementById('feed-modal-overlay').remove()">✕</button></div>
      <div class="modal-body">
        <div class="form-group"><label class="form-label">URL RSS *</label>
          <input class="form-input" id="feed-url" type="url" placeholder="https://esempio.com/feed.xml" value="${escapeHtml(feed.url||'')}">
          <div class="form-hint">RSS 2.0, Atom. Social: reddit.com/r/sub.rss · youtube.com/feeds/videos.xml?channel_id=ID · Nitter per Twitter</div></div>
        <div class="form-group"><label class="form-label">Nome <span>(opzionale)</span></label>
          <input class="form-input" id="feed-name" type="text" placeholder="Il mio feed" value="${escapeHtml(feed.name||'')}"></div>
        <div class="form-group"><label class="form-label">Categoria</label>
          <select class="form-select" id="feed-category">${catOpts}</select></div>
        <hr style="border:none;border-top:1px solid var(--border);margin:16px 0">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
          <span class="form-label" style="margin:0">⚡ Feed veloci</span>
          <button class="btn btn-secondary" style="padding:5px 12px;font-size:12px" onclick="document.getElementById('feed-modal-overlay').remove();openDiscoverModal()">🔍 Scopri tutti →</button>
        </div>
        ${presetHtml}
      </div>
      <div class="modal-footer">
        ${editingFeedId ? `<button class="btn btn-danger" onclick="removeFeedFromModal()">Elimina</button>` : ''}
        <button class="btn btn-secondary" onclick="document.getElementById('feed-modal-overlay').remove()">Annulla</button>
        <button class="btn btn-primary" onclick="saveFeed()">${editingFeedId ? 'Salva' : 'Aggiungi'}</button>
      </div>
    </div>`;
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

function fillFeedPreset(name, url) {
  const u = $('feed-url'), n = $('feed-name');
  if (u) u.value = url;
  if (n && !n.value) n.value = name;
}

async function saveFeed() {
  const url = $('feed-url').value.trim(), name = $('feed-name').value.trim(), category = $('feed-category').value;
  if (!url) { toast('Inserisci un URL valido', 'error'); return; }
  if (editingFeedId) {
    const f = state.feeds.find(f => f.id === editingFeedId);
    if (f) { f.url = url; f.name = name || f.name; f.category = category; }
  } else {
    if (state.feeds.some(f => f.url === url)) { toast('Feed già presente!', 'error'); return; }
    let hostname = url; try { hostname = new URL(url).hostname.replace('www.',''); } catch {}
    state.feeds.push({ id: 'f' + Date.now(), name: name || hostname, url, category, icon: '' });
  }
  document.getElementById('feed-modal-overlay')?.remove();
  Storage.save(); renderFeeds();
  toast(editingFeedId ? 'Feed aggiornato' : 'Feed aggiunto! Caricamento…', 'success');
  if (!editingFeedId) {
    const nf = state.feeds[state.feeds.length - 1];
    const articles = await fetchFeed(nf);
    const existingIds = new Set(state.articles.map(a => a.id));
    let nc = 0;
    articles.forEach(a => { if (!existingIds.has(a.id)) { state.articles.unshift(a); nc++; } });
    state.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    Storage.save(); renderArticles(); renderFeeds(); renderCategoryChips();
    toast(`+${nc} articoli caricati`, 'success');
  }
}

function removeFeedFromModal() {
  if (!editingFeedId || !confirm('Eliminare il feed?')) return;
  state.feeds = state.feeds.filter(f => f.id !== editingFeedId);
  state.articles = state.articles.filter(a => a.feedId !== editingFeedId);
  document.getElementById('feed-modal-overlay')?.remove();
  Storage.save(); renderFeeds(); renderArticles();
  toast('Feed eliminato', 'info');
}

// ─── Feed Discovery Modal ─────────────────────────────────────────────────────
let discoverFilter = 'all';

function openDiscoverModal() {
  discoverFilter = 'all';
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay'; overlay.id = 'discover-overlay';
  const totalFeeds = Object.values(FEED_CATALOG).reduce((s, a) => s + a.length, 0);
  const allCats = ['all', ...Object.keys(FEED_CATALOG)];

  const catTabs = allCats.map(c => {
    const color = c === 'all' ? '#9ea3b5' : (CAT_COLORS[c] || '#5c6178');
    const count = c === 'all' ? totalFeeds : (FEED_CATALOG[c]?.length || 0);
    return `<button class="discover-cat-btn ${c === 'all' ? 'active' : ''}" data-cat="${c}" onclick="filterDiscover('${c}')">
      <span class="cat-dot" style="background:${color}"></span>${c === 'all' ? 'Tutti' : c}
      <span class="discover-cat-count">${count}</span>
    </button>`;
  }).join('');

  overlay.innerHTML = `
    <div class="modal discover-modal-inner">
      <div class="modal-header">
        <div>
          <span class="modal-title">🔍 Scopri Feed</span>
          <div style="font-size:12px;color:var(--text3);margin-top:2px">${totalFeeds} feed in ${Object.keys(FEED_CATALOG).length} categorie</div>
        </div>
        <button class="modal-close" onclick="document.getElementById('discover-overlay').remove()">✕</button>
      </div>
      <div class="discover-search-bar">
        <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input id="discover-search" type="search" placeholder="Cerca feed per nome, descrizione o categoria…" oninput="renderDiscoverGrid()">
      </div>
      <div class="discover-cat-tabs" id="discover-cat-tabs">${catTabs}</div>
      <div class="discover-grid" id="discover-grid"></div>
      <div class="modal-footer" style="justify-content:space-between">
        <span style="font-size:12px;color:var(--text3)" id="discover-count"></span>
        <button class="btn btn-secondary" onclick="document.getElementById('discover-overlay').remove()">Chiudi</button>
      </div>
    </div>`;

  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
  renderDiscoverGrid();
  setTimeout(() => $('discover-search')?.focus(), 80);
}

function filterDiscover(cat) {
  discoverFilter = cat;
  document.querySelectorAll('.discover-cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
  renderDiscoverGrid();
}

function renderDiscoverGrid() {
  const grid = $('discover-grid');
  const query = $('discover-search')?.value.toLowerCase() || '';
  const addedUrls = new Set(state.feeds.map(f => f.url));
  const entries = [];

  Object.entries(FEED_CATALOG).forEach(([cat, feeds]) => {
    if (discoverFilter !== 'all' && discoverFilter !== cat) return;
    feeds.forEach(feed => {
      if (query && !feed.name.toLowerCase().includes(query) && !feed.desc.toLowerCase().includes(query) && !cat.toLowerCase().includes(query)) return;
      entries.push({ ...feed, cat });
    });
  });

  $('discover-count').textContent = `${entries.length} feed trovati`;

  if (!entries.length) {
    grid.innerHTML = `<div style="padding:48px 20px;text-align:center;color:var(--text3);grid-column:1/-1">
      <div style="font-size:32px;margin-bottom:10px">🔍</div>
      <div>Nessun feed trovato per "<strong>${escapeHtml(query)}</strong>"</div>
    </div>`;
    return;
  }

  grid.innerHTML = entries.map(f => {
    const added = addedUrls.has(f.url);
    const color = CAT_COLORS[f.cat] || CAT_COLORS['Altro'];
    return `<div class="discover-card ${added ? 'is-added' : ''}">
      <div class="discover-card-top">
        <span class="discover-cat-badge" style="background:${color}18;color:${color};border-color:${color}30">
          <span class="cat-dot" style="background:${color}"></span>${f.cat}
        </span>
        <button class="discover-add-btn ${added ? 'added' : ''}"
          onclick="${added ? '' : `quickAddFeed('${escapeAttr(f.name)}','${escapeAttr(f.url)}','${escapeAttr(f.cat)}',this)`}"
          ${added ? 'disabled' : ''}>
          ${added ? '✓ Aggiunto' : '+ Aggiungi'}
        </button>
      </div>
      <div class="discover-card-name">${escapeHtml(f.name)}</div>
      <div class="discover-card-desc">${escapeHtml(f.desc)}</div>
      <div class="discover-card-url">${escapeHtml(f.url.replace(/^https?:\/\/(www\.)?/, '').split('/')[0])}</div>
    </div>`;
  }).join('');
}

async function quickAddFeed(name, url, category, btn) {
  if (state.feeds.some(f => f.url === url)) { toast('Già nel tuo feed!', 'error'); return; }
  btn.textContent = '…'; btn.disabled = true;
  state.feeds.push({ id: 'f' + Date.now(), name, url, category, icon: '' });
  Storage.save(); renderFeeds();

  const articles = await fetchFeed(state.feeds[state.feeds.length - 1]);
  const existingIds = new Set(state.articles.map(a => a.id));
  let nc = 0;
  articles.forEach(a => { if (!existingIds.has(a.id)) { state.articles.unshift(a); nc++; } });
  state.articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  Storage.save(); renderArticles(); renderFeeds(); renderCategoryChips();

  btn.textContent = '✓ Aggiunto'; btn.classList.add('added'); btn.disabled = true;
  btn.closest('.discover-card')?.classList.add('is-added');
  toast(`${name}: +${nc} articoli`, 'success');
}

// ─── Import/Export ────────────────────────────────────────────────────────────
function importDB() {
  const input = document.createElement('input');
  input.type = 'file'; input.accept = '.json';
  input.onchange = async e => {
    const file = e.target.files[0]; if (!file) return;
    try { await Storage.import(file); renderFeeds(); renderArticles(); renderCategoryChips(); renderSettingsPanel(); toast('Database importato!', 'success'); }
    catch { toast('Errore importazione: file non valido', 'error'); }
  };
  input.click();
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function toast(message, type = 'info') {
  const icons = { success:'✓', error:'✕', info:'ℹ' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${escapeHtml(message)}</span>`;
  $('toast-container').appendChild(el);
  setTimeout(() => { el.classList.add('toast-fade'); setTimeout(() => el.remove(), 300); }, 3500);
}

function showSkeletons() {
  $('articles-grid').innerHTML = Array.from({length:8}).map(() =>
    `<div class="skeleton"><div class="skeleton-img"></div><div class="skeleton-body">
    <div class="skeleton-line short"></div><div class="skeleton-line tall"></div>
    <div class="skeleton-line"></div><div class="skeleton-line short"></div></div></div>`).join('');
}

function saveSettings() {
  state.refreshInterval = parseInt($('settings-refresh-interval').value) || 15;
  state.redisUrl   = $('settings-redis-url').value.trim().replace(/\/$/, '');
  state.redisToken = $('settings-redis-token').value.trim();
  Storage.save(); startAutoRefresh();
  toast('Impostazioni salvate!', 'success');
}

// ─── Service Worker ───────────────────────────────────────────────────────────
async function initServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  try {
    await navigator.serviceWorker.register('./sw.js');
    navigator.serviceWorker.addEventListener('message', e => {
      if (e.data?.type === 'BG_REFRESH') { toast('Aggiornamento background', 'info'); refreshAll(true); }
    });
    if (navigator.serviceWorker.controller) navigator.serviceWorker.controller.postMessage({ type: 'CHECK_PENDING' });
    await registerPeriodicSync();
  } catch { }
}

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

  window.addEventListener('online',  () => { state.isOnline = true;  updateStatusBar(); refreshAll(true); });
  window.addEventListener('offline', () => { state.isOnline = false; updateStatusBar(); toast('Sei offline', 'error'); });

  let st;
  $('search-input').addEventListener('input', e => { clearTimeout(st); st = setTimeout(() => { state.searchQuery = e.target.value; renderArticles(); }, 300); });
  document.querySelectorAll('.sort-btn').forEach(btn => {
    btn.addEventListener('click', () => { document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active')); btn.classList.add('active'); state.sortBy = btn.dataset.sort; renderArticles(); });
  });
  document.querySelectorAll('.nav-tab').forEach(tab => { tab.addEventListener('click', () => switchTab(tab.dataset.tab)); });
  document.addEventListener('click', e => {
    const t = e.target;
    if (t.id === 'settings-redis-toggle')  { state.useRedis = !state.useRedis; t.className = `toggle ${state.useRedis ? 'on' : ''}`; }
    if (t.id === 'settings-unread-toggle') { state.showUnreadOnly = !state.showUnreadOnly; t.className = `toggle ${state.showUnreadOnly ? 'on' : ''}`; renderArticles(); }
    if (t.id === 'redis-sync-btn') Redis.syncToRedis();
    if (t.id === 'redis-load-btn') Redis.loadFromRedis().then(() => { renderFeeds(); renderArticles(); });
  });

  const so = $('sidebar-overlay');
  $('menu-btn').addEventListener('click', () => { $('sidebar').classList.add('open'); so.classList.add('visible'); });
  so?.addEventListener('click', () => { $('sidebar').classList.remove('open'); so.classList.remove('visible'); });

  renderFeeds(); renderCategoryChips(); renderSidebar(); updateStatusBar();

  if (state.articles.length === 0) { showSkeletons(); await refreshAll(true); }
  else { renderArticles(); setTimeout(() => refreshAll(true), 1500); }

  startAutoRefresh();
  if (location.hash === '#favorites') switchTab('favorites');
}

Object.assign(window, {
  openAddFeedModal, openEditFeedModal, saveFeed, removeFeedFromModal, removeFeed,
  toggleFavorite, toggleFavoriteById, toggleRead, openExternal, filterByCategory,
  fillFeedPreset, importDB, markAllRead, saveSettings, refreshAll,
  openDiscoverModal, filterDiscover, renderDiscoverGrid, quickAddFeed,
  handleImgError, Storage, state,
});

document.addEventListener('DOMContentLoaded', init);
