# Recipe Roulette

A small recipe shuffler that gives you a random cooking recipe each shuffle. You can also add your own ones to the mix.

It's a personal recipe app for iPhone that runs as a home-screen web app. Recipes and photos are stored on your phone, everything except **New idea** works offline, and New idea uses your own Claude API key (Claude Haiku 5.5).

## Files

Upload all six files together:

- `index.html`: the app
- `sw.js`: keeps the app working offline
- `manifest.webmanifest`, `icon-180.png`, `icon-192.png`, `icon-512.png`: the home-screen name and icon

`README.md` is this guide and doesn't need uploading.

## 1. Put it online with GitHub Pages (free, about 5 minutes)

1. Create a free account at [github.com](https://github.com).
2. Click **+ → New repository**. Name it `recipe-roulette`, choose **Public**, and click **Create repository**.
3. On the new repository's page, click **uploading an existing file**, drag in the six files above, and click **Commit changes**.
4. Go to **Settings → Pages**. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose branch **main** and folder **/ (root)**, then click **Save**.
5. After a minute or two the app is live at `https://YOUR-USERNAME.github.io/recipe-roulette/`.

The page is public, but there's nothing private in it. Your recipes, photos and API key stay on your phone.

## 2. Install it on your iPhone

1. Open the link in **Safari**.
2. Tap **Share → Add to Home Screen → Add**.
3. From now on, open it from the **Recipes** icon on your Home Screen.

The Home Screen app keeps its own storage, separate from Safari tabs. Add your recipes and API key inside the Home Screen app, not in a Safari tab.

## 3. Turn on New idea (optional)

1. Sign up at [console.anthropic.com](https://console.anthropic.com) and add a small amount of credit under **Billing**. This is separate from a claude.ai subscription.
2. Under **Limits**, set a monthly spending limit, for example $2.
3. Under **API keys**, create a key and copy it. It starts with `sk-ant-`.
4. In the app, tap the **gear** button, paste the key, tap **Save key**, then tap **Check key**.

Each idea costs a fraction of a cent. The Settings screen shows a running total.

## Backups

Your recipes exist only on your phone. Every so often, go to **Settings → Save backup → Save to Files** (iCloud Drive is a good place for it). To move to a new phone, use **Restore backup** and pick that file.

## Updating the app

Upload the changed file to the same GitHub repository (it replaces the old one). Then open the app, close it, and open it again: the first launch downloads the update in the background, and the second launch shows it. Your recipes aren't affected.
