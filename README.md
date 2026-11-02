# Recipe Roulette

A small recipe shuffler that gives you a random cooking recipe each shuffle. You can also add your own ones to the mix.

It runs as a home-screen web app, and is set up to be built as an iPhone and Android app too (see [PUBLISHING.md](PUBLISHING.md)). Recipes, photos, favourites and the week plan are stored on your phone, and everything except **New idea** and **Import** works offline. Those two use Claude chat (copy and paste, no key) or your own Claude API key (Claude Haiku 5.5).

What it does: shuffle 253 built-in recipes (filter by meal, vegetarian, vegan, under 30 minutes, favourites), go **Back** to a recipe you shuffled past, scale servings, **Start cooking** for one step at a time with timers, plan recipes on any day in **Week**, keep **favourites**, add or import your own recipes, and **Share** any recipe as a link.

Live at https://ore0n-gif.github.io/recipe-roulette/

## Files

- `index.html`: the app
- `sw.js`: keeps the app working offline
- `manifest.webmanifest`, `icon-180.png`, `icon-192.png`, `icon-512.png`: the home-screen name and icon
- `photos/`: photos of the built-in recipes
- `privacy.html`: the privacy policy (needed for the app stores)
- `package.json`, `capacitor.config.json`, `scripts/`, `assets/`, `android/`, `ios/`: the iPhone and Android app projects ([PUBLISHING.md](PUBLISHING.md))

## Photo credits

The photos of the built-in recipes come from [Wikimedia Commons](https://commons.wikimedia.org) under free licenses (Creative Commons and public domain). They were cropped to fit the app. Each recipe card names the photographer and license, and tapping that credit opens the original. Recipes without a photo show a drawn illustration.

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

**No API key?** Tap **New idea → Ask in Claude chat**. Claude opens with the request filled in (it's also copied, in case Claude opens empty). Send it, copy Claude's whole reply, paste it back into the app and tap **Use this recipe**. This works with a free or paid claude.ai account and costs nothing extra.

## Importing recipes

Tap **+ Add** (or **Mine → Import**), open **Import from a link, text or screenshots**, then:

- paste a link to a recipe page or a YouTube video whose description has the recipe,
- paste recipe text (a video caption, a message, anything), or
- add up to 5 screenshots or photos of a recipe.

Claude reads it and fills in the form for you to check before saving. Without an API key, tap **Ask in Claude chat** instead, then paste Claude's reply into the same box and tap **Import recipe**. The link is kept in Notes. Imports use your API key and cost about the same as a New idea, a bit more for long pages. Sites behind a login or paywall, and most TikTok or Instagram links, can't be read; paste the caption text or add screenshots instead.

## Backups

Your recipes, favourites and week plan exist only on your phone. Every so often, go to **Settings → Save backup → Save to Files** (iCloud Drive is a good place for it). To move to a new phone, use **Restore backup** and pick that file.

## Updating the app

Push or upload the changed files to this repository, and change the `CACHE` name in `sw.js` (for example `recipe-roulette-v9` to `-v10`). The app checks for a new version every time it opens or comes back on screen, and reloads itself into it, keeping the recipe you were looking at. It waits while you're adding a recipe, in Settings, or waiting on Claude. Your recipes aren't affected.

The Home Screen icon is the exception: iOS keeps the icon from when the app was added. To get a new icon, make a backup in Settings, remove the app from the Home Screen, add it again from Safari, and restore the backup.
