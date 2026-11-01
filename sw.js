// Keeps Recipe Roulette working offline. Serves the cached copy first and refreshes it in the
// background, so a new version shows up the second time you open the app after updating.
// Calls to the Claude API are never cached.
const CACHE = 'recipe-roulette-v3';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
const PHOTOS = ["shakshuka", "banana-pancakes", "french-toast", "breakfast-burritos", "blueberry-muffins", "greek-salad", "tomato-soup", "tuna-melt", "minestrone", "bean-quesadillas", "chicken-caesar", "chicken-noodle-soup", "squash-soup", "aglio-olio", "carbonara", "chickpea-curry", "beef-tacos", "mushroom-risotto", "green-curry", "chilli", "beef-broccoli", "fajitas", "pad-thai", "choc-chip-cookies", "apple-crumble", "brownies", "chocolate-mousse", "guacamole", "hummus", "tzatziki", "omelette", "falafel-wraps", "halloumi-couscous", "lemon-chicken", "glazed-salmon", "lentil-bolognese", "teriyaki", "fish-tacos", "pesto-gnocchi", "banana-bread", "lemon-posset", "roasted-chickpeas", "margherita", "bruschetta", "sausage-bean", "mug-cake", "fried-rice", "baked-cod", "pork-chops"].map(id => './photos/' + id + '.jpg');

self.addEventListener('install', event => {
  // The recipe photos are cached too, so they show offline; if one fails it's fetched again when viewed.
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE).then(() => cache.addAll(PHOTOS).catch(() => {}))));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).hostname === 'api.anthropic.com') return;
  event.respondWith(caches.open(CACHE).then(async cache => {
    const cached = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
