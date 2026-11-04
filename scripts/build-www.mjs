// Copies the web app into www/, which Capacitor packs into the iPhone and Android apps.
// The service worker is left out: in the store apps, updates come through the stores.
import { cpSync, mkdirSync, rmSync } from 'node:fs';

const FILES = ['index.html', 'manifest.webmanifest', 'privacy.html', 'icon-180.png', 'icon-192.png', 'icon-512.png'];
rmSync('www', { recursive: true, force: true });
mkdirSync('www');
for (const f of FILES) cpSync(f, 'www/' + f);
cpSync('photos', 'www/photos', { recursive: true });
cpSync('i18n', 'www/i18n', { recursive: true });
console.log('Copied the app into www/');
