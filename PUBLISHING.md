# Publishing Recipe Roulette in the App Store and Google Play

The app is ready to build: this repository holds the web app (`index.html`), and Capacitor wraps it into an
iPhone project (`ios/`) and an Android project (`android/`). Both run fully offline and keep all data on the phone.

What's already set up:

- App name **Recipe Roulette**, app ID `io.github.ore0n.reciperoulette` (change it in `capacitor.config.json` **before** the first upload; it can't change afterwards).
- Icons and splash screens for every size (from `assets/`, made by `scripts/make_app_assets.py`).
- Native features: share sheet, backups saved through the share sheet, screen stays on while cooking, timers that ring as notifications when the phone is locked.
- Photo library and camera permission texts (iPhone), notification permissions (Android).
- Privacy policy: <https://ore0n-gif.github.io/recipe-roulette/privacy.html>
- Photo credits: in the app under Settings → Photo credits (required by the photos' CC BY / CC BY-SA licences).

## Every time you change the app

```bash
npm install          # first time only
npm run sync         # copies index.html and the photos into both native projects
```

Then raise the version number before uploading: Android `versionCode`/`versionName` in `android/app/build.gradle`,
iPhone "Version" and "Build" in Xcode (target App → General).

## Android → Google Play

1. Install [Android Studio](https://developer.android.com/studio) (it brings Java and the Android SDK).
2. `npm run android` opens the project. Press ▶ to try it on an emulator or on your phone (USB debugging on).
3. Create a Google Play developer account (one-off US$25): <https://play.google.com/console>.
4. In Android Studio: **Build → Generate Signed App Bundle → Android App Bundle**, create a new upload key
   (keep the `.jks` file and its passwords safe: you need them for every update), build the `release` variant.
5. In Play Console: create the app, fill in the store listing (texts below), the content rating questionnaire,
   **Data safety** (answers below), set the privacy policy URL, then upload the `.aab` to a testing track first
   (new personal accounts must run a closed test with testers for 14 days before going public).
6. Timers use exact alarms (`SCHEDULE_EXACT_ALARM`). If Play asks, declare it as a cooking timer feature.

## iPhone → App Store

Building for iPhone needs a Mac with Xcode, or a cloud Mac service if you don't have one.

1. Join the Apple Developer Program (US$99 per year): <https://developer.apple.com/programs/>.
2. **With a Mac:** clone this repo, `npm install`, `npm run ios`. In Xcode select the *App* target → Signing & Capabilities →
   your team, then try it on your iPhone. Upload with **Product → Archive → Distribute App → App Store Connect**.
   **Without a Mac:** use a cloud build service such as [Codemagic](https://codemagic.io) (has a free tier): connect this
   GitHub repo, choose the Capacitor/iOS workflow, add your Apple Developer account, and it builds and uploads for you.
3. In [App Store Connect](https://appstoreconnect.apple.com): create the app with the same bundle ID, add the listing,
   screenshots (6.9" and 6.5" iPhone), the privacy policy URL, **App Privacy → Data Not Collected**, then submit for review.
4. Test with TestFlight first: it lets you install the uploaded build on your own phone before release.

## Before submitting, check

- **Name:** search both stores for "Recipe Roulette". If it's taken, choose another display name (`appName` in `capacitor.config.json`, plus `CFBundleDisplayName` in `ios/App/App/Info.plist` and `app_name` in `android/app/src/main/res/values/strings.xml`).
- **Claude:** don't use "Claude" or Anthropic's logo in the app name or icon. It's fine to say the app *works with* your own Anthropic API key or Claude.
- **Reviewers:** the app works without any key (built-in recipes, Claude chat route), so reviewers can test everything. Mention in the review notes that New idea and Import are optional and use the user's own Anthropic API key.
- **Screenshots:** take them from the iOS Simulator / Android emulator or your phone: the shuffle card, cooking mode, week planner, favourites.

## Store listing text

**Subtitle / short description (≤ 30 / 80 characters):**
Spin up dinner. Plan your week. · Can't decide what to cook? Shuffle 250+ recipes, plan your week and cook step by step.

**Description:**

> Can't decide what to cook? Tap Shuffle.
>
> Recipe Roulette deals you a recipe from more than 250 classics — German favourites like Käsespätzle and Rouladen,
> curries, pasta, noodles, salads, cakes and snacks — each with a photo. Filter by meal, vegetarian, vegan or quick
> dishes, and tap Back if you shuffled past one you liked.
>
> • Cooking mode: one step at a time in big type, with built-in timers for every step that has a time
> • Week planner: put recipes on any day and see your whole week at a glance
> • Favourites: keep the ones you love in one place
> • Your own recipes: type them in, add a photo, or import them from a link, text or screenshots
> • Servings: scale every ingredient up or down
> • Share any recipe with friends as a link
> • New ideas from Claude: use Claude chat, or add your own Anthropic API key for ideas right in the app
> • Works offline. No account, no ads, no tracking. Your recipes stay on your phone.

**Keywords (iPhone, 100 characters):** recipes,cooking,meal planner,dinner ideas,random recipe,vegetarian,vegan,shuffle,week plan,timer

**Category:** Food & Drink

## Privacy answers

- **Apple App Privacy:** Data Not Collected.
- **Google Data safety:** no data collected, no data shared. Data is encrypted in transit (HTTPS to Anthropic when the user adds a key). Users can delete their data by uninstalling the app.
