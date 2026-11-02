// Keeps Recipe Roulette working offline and up to date. The page itself is fetched from the network
// first (the cached copy is used when offline or the network is slow), so a new version shows up straight away.
// Icons are served from the cache and refreshed in the background. Calls to the Claude API are never cached.
// Change CACHE on every release: that is what tells open copies of the app to reload into the new version.
// Photos never change, so they live in their own cache that survives releases and only new ones are downloaded.
const CACHE = 'recipe-roulette-v9';
const PHOTO_CACHE = 'recipe-roulette-photos';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-180.png', './icon-192.png', './icon-512.png'];
const PHOTOS = ["shakshuka", "banana-pancakes", "french-toast", "breakfast-burritos", "blueberry-muffins", "greek-salad", "tomato-soup", "tuna-melt", "minestrone", "bean-quesadillas", "chicken-caesar", "chicken-noodle-soup", "squash-soup", "aglio-olio", "carbonara", "chickpea-curry", "beef-tacos", "mushroom-risotto", "green-curry", "chilli", "beef-broccoli", "fajitas", "pad-thai", "choc-chip-cookies", "apple-crumble", "brownies", "chocolate-mousse", "guacamole", "hummus", "tzatziki", "omelette", "falafel-wraps", "halloumi-couscous", "lemon-chicken", "glazed-salmon", "lentil-bolognese", "teriyaki", "fish-tacos", "pesto-gnocchi", "banana-bread", "lemon-posset", "roasted-chickpeas", "margherita", "bruschetta", "sausage-bean", "mug-cake", "fried-rice", "baked-cod", "pork-chops", "huevos-rancheros", "granola", "dutch-baby", "avocado-toast", "bauernfruehstueck", "quarkkeulchen", "smoothie-bowl", "breakfast-hash", "waffles", "frittata", "menemen", "kartoffelpuffer", "obatzda", "brezeln", "deviled-eggs", "nachos", "summer-rolls", "baba-ganoush", "cheese-straws", "flapjacks", "kartoffelsalat", "erbsensuppe", "linseneintopf", "flammkuchen", "senfeier", "caprese", "nicoise", "gazpacho", "french-onion-soup", "leek-potato-soup", "club-sandwich", "banh-mi", "tabbouleh", "egg-mayo-sandwich", "quiche-lorraine", "spinach-feta-pie", "poke-bowl", "cobb-salad", "lentil-salad", "croque-monsieur", "pasta-salad", "miso-soup", "kaesespaetzle", "rouladen", "gulasch", "schnitzel", "koenigsberger-klopse", "frikadellen", "bratkartoffeln", "currywurst", "geschnetzeltes", "schupfnudeln", "huehnerfrikassee", "lasagne", "spaghetti-meatballs", "tikka-masala", "dal", "stroganoff", "shepherds-pie", "fish-chips", "paella", "jambalaya", "moussaka", "katsu-curry", "kung-pao", "stuffed-peppers", "enchiladas", "burgers", "shawarma", "pasta-norma", "arrabbiata", "prawn-linguine", "chicken-satay", "mapo-tofu", "bourguignon", "tortilla-espanola", "chicken-pot-pie", "mac-cheese", "pad-kra-pao", "kaesekuchen", "apfelstrudel", "kaiserschmarrn", "rote-gruetze", "pavlova", "panna-cotta", "sticky-toffee", "milchreis", "carrot-cake", "crepes", "bratapfel", "eggs-benedict", "scrambled-eggs", "porridge", "sauerbraten", "ratatouille", "bibimbap", "zwetschgenkuchen", "tiramisu", "creme-brulee", "glasnudelsalat", "bircher-muesli", "chia-pudding", "full-english", "american-pancakes", "strammer-max", "kedgeree", "congee", "tamagoyaki", "chilaquiles", "zimtschnecken", "broetchen", "cilbir", "kartoffelsuppe", "gulaschsuppe", "ramen", "pho", "tom-kha-gai", "waldorf-salad", "panzanella", "fattoush", "maki-sushi", "blt", "reuben", "jacket-potato", "welsh-rarebit", "spargel-hollandaise", "kisir", "soba-salad", "borscht", "broccoli-cheddar-soup", "wurstsalat", "quinoa-salad", "lahmacun", "butter-chicken", "palak-paneer", "biryani", "massaman-curry", "pad-see-ew", "chow-mein", "puttanesca", "cacio-e-pepe", "vongole", "gnocchi-sorrentina", "chicken-piccata", "coq-au-vin", "roast-chicken", "bangers-mash", "carnitas", "gyros", "lamb-kofta", "chicken-tagine", "pierogi", "paprikash", "schweinebraten", "kohlrouladen", "pellkartoffeln-quark", "himmel-und-erde", "kartoffelgratin", "jaegerschnitzel", "hackbraten", "nasi-goreng", "laksa", "okonomiyaki", "zwiebelkuchen", "cacciatore", "imam-bayildi", "chili-sin-carne", "schwarzwaelder", "bienenstich", "apfelkuchen", "streuselkuchen", "dampfnudeln", "vanillekipferl", "churros", "baklava", "eton-mess", "clafoutis", "mango-sticky-rice", "chocolate-fondant", "bread-butter-pudding", "lemon-drizzle", "gyoza", "onigiri", "spring-rolls", "patatas-bravas", "elote", "sausage-rolls", "scones", "stuffed-mushrooms", "onion-bhajis", "maultaschen", "sweet-sour-chicken", "bulgogi", "japchae", "fish-pie", "toad-in-the-hole", "burrito-bowl", "risotto-milanese", "samosas", "arancini"].map(id => './photos/' + id + '.jpg');

self.addEventListener('install', event => {
  // `reload` skips the browser's own HTTP cache, so the new version never gets an old copy of a file.
  // If a photo fails to download it's fetched again when viewed.
  event.waitUntil((async () => {
    await (await caches.open(CACHE)).addAll(CORE.map(u => new Request(u, { cache: 'reload' })));
    const photos = await caches.open(PHOTO_CACHE);
    const have = new Set((await photos.keys()).map(r => new URL(r.url).pathname));
    await Promise.all(PHOTOS.filter(u => !have.has(new URL(u, location).pathname)).map(u => photos.add(u).catch(() => {})));
  })());
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE && k !== PHOTO_CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

const isPage = (req, url) => req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('/index.html');

// Network first, giving up after 4 seconds; falls back to the cached page offline.
function networkFirst(req, cache) {
  const fresh = fetch(req.url, { cache: 'no-cache' }).then(res => {
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  });
  const slow = new Promise(resolve => setTimeout(resolve, 4000));
  return Promise.race([fresh.catch(() => null), slow]).then(res =>
    res || cache.match(req, { ignoreSearch: true }).then(cached => cached || fresh));
}

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);
  if (req.method !== 'GET' || url.hostname === 'api.anthropic.com') return;
  const own = url.origin === location.origin;
  if (own && url.pathname.includes('/photos/')) {
    event.respondWith(caches.open(PHOTO_CACHE).then(async cache => {
      const cached = await cache.match(req, { ignoreSearch: true });
      if (cached) return cached;
      const res = await fetch(req);
      if (res.ok) cache.put(req, res.clone());
      return res;
    }));
    return;
  }
  event.respondWith(caches.open(CACHE).then(async cache => {
    if (own && isPage(req, url)) return networkFirst(req, cache);
    const cached = await cache.match(req, { ignoreSearch: true });
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});
