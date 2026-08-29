# Brand integration plan — Polvo identity v01

**Branch:** `brand-integration` · **Base:** `main` @ `ce09d79` · **Written:** 2026-08-29
**Status:** proposal. No live page has been modified. `git diff --name-only HEAD` is empty; everything added is new files.

---

## 0. Two corrections to the brief

**There was no `brand-assets/` folder in this repository.** The brief described one as already present. It did not exist on any branch. The delivered identity was on Google Drive at:

```
BALMES BALMES/03_TOCA_ROUGE/brand/2026-08-29_TOCAROUGE_identity_polvo-v01/
```

I fetched it from there and created `brand-assets/` on this branch. If a different package was meant, stop and say so — everything below is derived from that folder.

**There are six HTML pages, not five.** The brief lists `index`, `signup`, `privacy`, `esade`, `uic`. The repo also contains **`404.html`**, which carries the same token block and its own `?src=` handling. It is covered in section 6.

---

## 1. Inventory

### 1a. Delivered by Polvo — now in `brand-assets/` (36 files, 6.2 MB)

| Group | Files | Contents |
|---|---|---|
| `logo/svg/` | 3 | `logo-black`, `wordmark-black`, `isotype-black` |
| `logo/png/` | 15 | 3 marks × 5 colourways (black, white, red-1, red-2, red-3), transparent alpha |
| `logo/jpg/` | 18 | 3 marks × 6 foreground-on-background pairs, flattened |

Three marks:

- **logo** — stacked "Toca / Rouge" lockup, `viewBox 0 0 268.19 105.08` (2.55:1)
- **wordmark** — single-line "TocaRouge", `viewBox 0 0 387.72 55.92` (6.93:1)
- **isotype** — "TR" monogram, `viewBox 0 0 108.8 79.79` (1.36:1)

Raster masters are large and clean: logo 5113×2004, wordmark 7391×1067, isotype 2075×1522.

### 1b. Delivered but **deliberately not committed** — flyer (5 files, 860 MB)

Left on Drive at the path above. Sizes are why:

| File | Size | Actual pixels |
|---|---|---|
| `tocarouge-flyer-1080x1920.pdf` | **485 MB** | — |
| `tocarouge-flyer-1080x1440.pdf` | **289 MB** | — |
| `tocarouge-flyer-1080x1920.jpg` | 34 MB | 4501×6000 |
| `tocarouge-flyer-background.jpg` | 25 MB | 4501×6000 |
| `tocarouge-flyer-1080x1440.jpg` | 24 MB | 4501×6000 |

This is a GitHub Pages repo; a 485 MB binary in git history is permanent and unshrinkable. The only one the web build needs is the background, and it is present in `assets/bg/` as a compressed derivative.

### 1c. Colours — sampled from the delivered files, not from a document

| Token | Hex | Where it came from |
|---|---|---|
| brand red | **`#EA2413`** | `logo-red-1.png`, exact pixel sample |
| deep oxblood | `#7C1314` | `logo-red-2.png` |
| dark red-brown | `#4B1200` | `logo-red-3.png` |

---

## 2. Asset issues

### Blocking-ish

1. **No brand guidelines document, and none exists anywhere on Drive.** The signed brief (`Hausmann Brief — Send Version`) promised handoff as *"source files + exports + the usage note."* The exports arrived; **the usage note did not.** So there is no supplied rule for clear space, minimum size, which mark to use at which size, or how the marks may sit on photography. Every such value in `assets/brand.css` is a conservative convention I chose, and each is commented as such. **Ask Polvo for the usage note.**

2. **No font files were delivered** — but the face is Helvetica Neue, confirmed by Paul 2026-08-29, and it needs no file. See section 3.

3. **The brand red changes.** The live site runs `--accent: #e4002b` (the rejected v1 interim). The delivered red is `#EA2413`. These are visibly different. Switching is the point of the exercise, but it is a fact-change with copies outside this repo — the poster template, the sticker artwork and `identity.md` all carry a red.

### Non-blocking

4. **The flyer JPEG/PDF filenames lie about their dimensions.** `tocarouge-flyer-1080x1440.jpg` is 4501×6000. Same 3:4 ratio, ~4× the linear resolution. Anyone trusting the filename for an Instagram export will get it wrong. Worth asking Polvo to rename, or renaming on Drive.

5. **The 18 JPGs are redundant for web.** They are the same three marks with backgrounds flattened in. The PNGs carry real alpha and the SVGs supersede both. Kept in `brand-assets/` as delivered; nothing in `assets/` derives from them.

6. **SVGs ship in black only.** Not a defect — they contain no `fill`, so they recolour freely. Handled in section 4.

7. **The "background" is not a texture.** It is heavily blurred *lettering* ("...party in Barcelona and you can't miss it, see you there"). It reads as atmosphere at low contrast and as noise at high, so it must always sit under a scrim, never raw behind copy. The landscape crop cuts through the blurred words; since they are illegible by design this is fine, but it is a deliberate call, not an accident.

### Missing inputs I could not resolve

8. **Artwork ownership and licensing are recorded as unconfirmed.** `Toca Rouge.md` states, of the 2026-08-21 kickoff: *"fee amount and artwork ownership from item 2 above still unconfirmed."* I found nothing later that closes it. Publishing the mark to a public website is a use worth having settled in writing first.

9. **Removing "Balmes Balmes GbR" from the page footers is a legal question, not a design one.** Paul asked for it gone 2026-08-29. It can come off `index`, `esade`, `uic`, `404` and `signup` — but **not** out of `privacy.html`, where naming the data controller is required. See section 8a before this ships.

10. No favicon/app-icon set, no social avatar crop, no motion or animation guidance were delivered. The isotype covers the first two and `assets/` now has derivatives.

---

## 3. Fonts and licensing

**Resolved 2026-08-29 by Paul: the face is Helvetica Neue, Bold on the poster.** This supersedes the "no font delivered" gap — Polvo shipped no font file, but the face was known and is now confirmed.

### How it is served: referenced, not embedded

`assets/brand.css` contains **no `@font-face` and serves no font file.** The stack simply names a font already installed on the visitor's device:

```css
--tr-font-body: "Helvetica Neue", Helvetica, Arial, "Liberation Sans", sans-serif;
```

That needs **no licence at all**, because nothing is distributed. It is the difference that matters here: naming an installed font is free, serving the font file is a licensed act.

### Coverage, measured

| Platform | Renders as | Note |
|---|---|---|
| macOS, iOS, iPadOS | **Real Helvetica Neue** | Ships with the OS. Verified present on this machine and confirmed to resolve to a distinct face, not a fallback |
| Windows | Arial | Measured: Arial is **240.14px** against Helvetica Neue's **239.55px** for "SEP 12TH, 2026" at 32px bold — a 0.25% difference. The layout does not shift |
| Android | System grotesque (Roboto) | Slightly different colour on the page, same metrics class |

So Apple users — a large share of the audience — see the true brand face, and nobody else sees anything broken.

### Do not self-host it

There are 22 `NHaasGroteskDSPro/TXPro` TTFs in `~/Downloads/00_To_Sort/TTF/` (Neue Haas Grotesk, Helvetica Neue's original name) and a `NeueHaasDisplayMedium.ttf` in the BLAU deliverables. **None of these should be put into `assets/` and served.**

A desktop font licence covers rendering on your own machine. **Web embedding is a separately licensed right**, priced separately by Monotype, and serving the file from `tocarougebarcelona.com` is distribution. Getting this wrong on a public site is the expensive kind of mistake, and the font stack above already gets the real face onto every Apple device without it.

If you want true Helvetica Neue on Windows and Android too, that is a webfont licence purchase, not a technical change. Worth pricing only if it matters; the fallback is genuinely close.

## 4. Design system

Implemented in **`assets/brand.css`** (not linked into any live page). Every contrast figure below was computed against the WCAG 2.1 formula, not estimated.

### Colour tokens

| Token | Value | Notes |
|---|---|---|
| `--tr-red` | `#EA2413` | Brand red, never altered |
| `--tr-red-deep` | `#7C1314` | |
| `--tr-red-dark` | `#4B1200` | |
| `--tr-ink` | `#0b0b0c` | Page ground, carried over from the live site |
| `--tr-panel` | `#17100f` | Raised surface, warmed toward oxblood |
| `--tr-field` | `#1c1312` | Input ground |
| `--tr-fg` | `#f5f5f5` | 18.05:1 on ink |
| `--tr-muted` | `#a89e9e` | 7.54:1 on ink |
| `--tr-red-text` | `#F2665A` | 6.39:1 — red type under ~18px only |
| `--tr-border` | `#2e2020` | Decorative edge only |
| `--tr-border-strong` | `#7d6a6a` | 3.88:1 — when the border *is* the control |

**The one accessibility trap, stated plainly.** `#EA2413` on `#0b0b0c` is **4.46:1**, and white on `#EA2413` is **4.41:1**. Both clear the 3:1 large-text floor and both miss the 4.5:1 small-text floor. The old red (`#E4002B`) was 4.85:1 white-on-red and passed. So the new red is *slightly worse*, and two rules follow:

- Red type under ~18px uses `--tr-red-text`, never `--tr-red`.
- **Any control filled with brand red sets its label at ≥18.66px bold.** `.tr-btn` uses 20px/700 and says so inline. Lowering that font-size silently drops the button below AA.

The brand colours are never modified to fix this. The derived tokens do the work.

### Typography

System stack throughout (see section 3). Scale: 12 / 14 / 16 / 18 / 20 px as `--tr-text-xs` … `--tr-text-xl`. Body line-height 1.55, headings 1.15. Inputs are pinned at 16px — anything smaller makes iOS Safari zoom the viewport on focus, which on the signup page looks like a bug.

### Spacing

4px base, `--tr-space-1` (4px) through `--tr-space-8` (64px). Radii: `--tr-radius-pill` 999px, `--tr-radius-box` 10px, `--tr-radius-sm` 6px.

### Backgrounds

**The scrim opacity is solved, not chosen.** Brand red on the brightest patch of the raw texture is about 1.6:1; red type needs 3:1 to clear AA at large sizes. Measured against the actually-composited page, at the position each element occupies:

| Element | Ground behind it | Contrast | Floor | |
|---|---|---|---|---|
| Logo (red mark) | `#541310` | 3.22:1 | 3.0 | PASS |
| Venue caption (white) | `#5C1511` | 12.27:1 | 4.5 | PASS |
| Date block (red, 30px+ bold) | `#591410` | 3.11:1 | 3.0 | PASS |

An earlier, lighter scrim (0.34/0.72) measured **2.90:1** behind the date block — a real fail, found only by sampling the rendered pixels. The gradient is now 0.52 → 0.82. **Lightening it again without re-measuring silently breaks every red element on the page.** The margins here are genuine but slim; red-on-red is inherently near the limit.

`.tr-bg` paints the scrim **and** the image in one rule, so no page can accidentally put copy on the raw artwork. WebP with JPEG fallback via `image-set()`, portrait under 768px and landscape above. `.tr-bloom` adds a pure-CSS radial red glow echoing the flyer — no extra request. `.tr-bg-flat` is the imageless variant for pages where the texture is the wrong register.

### The mark

Two flavours per mark, and picking wrong fails **silently**:

- `tocarouge-{logo,wordmark,isotype}.svg` — `fill="currentColor"`, for **inlining**, CSS `color` drives it
- `tocarouge-{mark}-{red,white,black}.svg` — fill baked in, for **`<img src>`**

An SVG in an `<img>` is an isolated document: `currentColor` resolves against the SVG's own colour, which defaults to black. On this near-black ground that is an invisible logo and no error anywhere. I hit exactly this while building the preview.

**One correction worth recording.** `.tr-logo-lockup` originally set clear space as `padding`. With the global `box-sizing: border-box`, that padding came out of the declared width: a 210px logo rendered as a 170px mark inside a 210px box — 19% smaller than specified, with 40px of invisible height beneath it. Every spacing value around it was then measured against a mark that was not the size it claimed to be, which is what made the composition look unbalanced. Clear space is now `margin`. The delivered artwork fills its viewBox exactly (verified: ink bounds equal canvas on all three marks), so all clear space must come from outside the box.

Vertical rhythm on `index` is **16 / 32 / 32 / 48** — the mark and its venue caption group as one identity unit, then equal gaps separate the event details and the CTA, then the footer sits furthest away. Type hierarchy is logo (240px wide) > date block (30px) > button (20px) > venue caption (14px) > footer (12px).

Sizing is width-only with `height: auto` — the viewBox fixes the ratio and it must never be overridden.

### The poster information block

Set to match the poster, measured off the artwork rather than eyeballed: cap heights 163px, baseline steps 162 and 164px, which against Helvetica Neue's measured 0.71em cap height is **line-height 0.72** — solid leading, caps touching.

**The site uses 0.88, and the difference is the comma.** Measured in-browser, Helvetica Neue's comma descends 0.16em below the baseline, so "SEP 12TH, 2026" spans 0.87em of ink. Anything tighter drops the comma onto the caps of "TILL 6:00" beneath it. The poster escapes this only because its comma happens to fall in the word-space between TILL and 6:00 — an accident of that artwork's exact line widths, and it does not survive at web font sizes. Rendered at 0.72 the two lines visibly collide.

0.88 is the tightest value that clears it. **If you would rather have the poster's literal spacing, drop the comma** — "SEP 12TH 2026" has no descenders at all, and 0.72 then becomes correct and matches the artwork exactly.

The button is uppercase with 0.06em tracking, matching the poster's register; caps need the extra tracking or they read cramped at the same size.

### Buttons, forms, images

`.tr-btn` with `--primary` (red fill) and `--secondary` (outline, `--tr-border-strong` because the border is the only thing identifying it). `.tr-input` / `.tr-label` / `.tr-consent` / `.tr-panel` mirror the signup page's existing structure so the markup maps one-to-one. `.tr-img--duotone` and `.tr-img--scrim` set the house treatment for any photography added later: type sits on a scrim, never on the image. Focus is `:focus-visible` with a white 2px ring, matching what the site already does.

---

## 5. Optimised assets

Originals retained untouched in `brand-assets/`. Derivatives in `assets/`. **Total web payload excluding the preview folder: 416 KB.**

| File | Size | From |
|---|---|---|
| `assets/bg/texture-portrait-1080.webp` | 12 KB | 25 MB original |
| `assets/bg/texture-portrait-1080.jpg` | 56 KB | fallback |
| `assets/bg/texture-landscape-1920.webp` | 16 KB | centre crop |
| `assets/bg/texture-landscape-1920.jpg` | 96 KB | fallback |
| `assets/logo/*.svg` | 1–4 KB each | delivered SVG + `fill` attribute only |
| `assets/logo/tocarouge-logo-{white,red}-1024.png` | 32 / 40 KB | raster fallback |
| `assets/logo/tocarouge-isotype-white-512.png` | 12 KB | icon use |
| `assets/og.jpg` | 52 KB | **new** — 1200×630 link-preview card |

**Verified, not assumed:**

- Background compression measured at **RMSE 0.0076 (0.76%)** against the original, and inspected by eye for banding in the dark red gradients. None.
- Every SVG's `viewBox` and every path `d` attribute is **byte-identical** to the delivered file (md5-compared). Only a `fill` attribute was added.
- Raster resizes preserve aspect ratio to within **0.35px** — pure integer rounding, ≤0.09%. No proportions altered, no brand colour altered.

**`assets/og.jpg` is built and ready but NOT wired in.** `index.html` and `signup.html` both carry a commented-out `og:image` block with the instruction not to point at a file that does not exist. That file now exists at the right size and well under the 300 KB note. Uncommenting is a page edit, so it waits for approval.

---

## 6. Page-by-page plan

Common to all six: replace the duplicated inline `:root` block with one `<link rel="stylesheet" href="/assets/brand.css">`. That block is currently copy-pasted into six files and its own comment says keeping them in sync is the cost of the arrangement. One shared file ends that.

### `index.html`
The hero `<h1>` of `TOCA` / `ROUGE` in Bebas Neue becomes the **delivered lockup as an `<img>`** — the real mark instead of type imitating it. Keep the `<h1>` element for document structure with the mark inside it and the text as `alt`. Textured background with scrim and bloom. `.tr-btn--primary` CTA. **The `?src=` carry-through script is not touched.**

### `signup.html`
**Styling only.** Add the stylesheet link, map existing classes onto `.tr-form` / `.tr-input` / `.tr-consent` / `.tr-panel` / `.tr-btn--primary`, and put the wordmark above the `<h1>`. Flat background, not textured — this is a form, and the blurred lettering behind input fields is noise. **Nothing inside `<form>`, and nothing in the `<script>`, changes.** See section 7.

### `privacy.html`
Stylesheet link, `.tr-bg-flat`, wordmark in the header. Legal copy untouched.

### `esade.html` / `uic.html`
Same treatment as each other, applied twice, never merged. The joke typography ("There is **no** Pilates class") keeps its structure; the `.wordmark` block becomes the real lockup. Textured background suits these best. **The per-placement `?src=` override script is not touched, and neither page may ever name the other school — including in comments.**

### `404.html`
Not in the brief but it exists and shares the token block. Same treatment as `index.html`, minus the hero. Its `?src=` preservation is not touched.

---

## 7. Must remain untouched

Everything in this section is load-bearing funnel logic. **None of it is styling, and none of it needs to change for any of the above.**

### `signup.html` — the form element

- `action="https://docs.google.com/forms/d/e/1FAIpQLScM_.../formResponse"`, `method="POST"`
- Every `entry.*` field name, exactly as written:
  - `entry.1637221435` first name · `entry.205280153` email · `entry.1450901064` phone
  - `entry.1932387565` hidden `src` attribution
  - **`entry.956517138` consent checkbox**, including its `value="Yes, keep me posted"`
- The `company` honeypot — its non-`entry.*` name is deliberate (Google discards it), as are `tabindex="-1"`, `autocomplete="off"` and the off-screen `.hp` positioning. It must stay out of the tab order and out of the accessibility tree.
- `required` attributes and the `autocomplete` / `inputmode` / `enterkeyhint` set

### `signup.html` — the submission script

- The hidden `<iframe name="gform-sink">` and `form.target = 'gform-sink'` **set in JS, not in the HTML** — that is what makes the no-JS fallback work
- The `sink.addEventListener('load', …)` redirect, and its `if (!submitted) return` guard for the initial `about:blank`
- The **12-second timeout** and its copy, which must not claim the submission failed
- `BORIS_LINK` read from the `#ticket-fallback` anchor's `href` — the ticket URL has exactly one home on the page, and the null-guard exists so a throw cannot turn the submission into a top-level POST
- The honeypot's `preventDefault` path, and the absence of `preventDefault` on the normal path
- The `submitted` re-entry guard and the disabled-button state

### Across pages

- **`?src=` handling everywhere**: trim + `.slice(0, 64)` and nothing else. No lowercasing, no filtering, no rejection — unrecognised codes must reach the sheet intact. Applies to `index.html`, `signup.html`, `esade.html`, `uic.html`, `404.html`
- The back-link `?src=` carry-back on `signup.html`
- FourVenues fallback URL: `https://www.fourvenues.com/paul-pfeiffer/events/1209-toca-rouge-12-09-2026-39GG`, and its `rel="noreferrer"`
- WhatsApp Community URL: `https://chat.whatsapp.com/FWIymebAuYi0KIpYEI03Yk`, with `target="_blank"` and `rel="noopener noreferrer"` on `signup.html` and both campus pages
- The default `?src=` codes `qr_esade` and `qr_uic` — both are registered as `CAMPAIGNS` rows in `BALMES_OS.xlsx` and count themselves via `COUNTIF`
- `CNAME` — deleting it breaks the custom domain
- The privacy notice's content, and the `/privacy.html` links from every page

### Method

Restyle by **adding** classes and the stylesheet link, not by rewriting markup. The form's DOM structure, attribute set and script stay as they are. After any edit, `git diff` should show no change inside `<form>` and no change inside any `<script>`.

---

## 8. What I need from you

1. **Approve or redirect the direction** — see `assets/preview/index-preview.html` and the two PNG renders beside it.
2. **Ask Polvo for the usage note** (clear space, minimum sizes, mark selection) and **the display typeface plus written confirmation its licence covers web embedding.**
3. **Close the artwork-ownership question** from the 2026-08-21 kickoff before this goes public.
4. Decide whether `assets/og.jpg` gets wired in at the same time — it is built, correct and unused.

---

## 8a. The "Balmes Balmes GbR" footer — decide before this ships

Paul asked (2026-08-29) for the company name off the site. Design-wise it goes in one line. Legally it splits in two, and the halves are not the same question.

**Safe to remove.** The footer credit on `index.html`, `esade.html`, `uic.html`, `404.html` and `signup.html` is a courtesy credit. Nothing depends on it. The preview already drops it, leaving only the Privacy link.

**Not safe to remove.** `privacy.html` names *"Balmes Balmes - Maximilian Kammermeier & Paul Pfeiffer GbR (Berlin)"* as the data controller. Under GDPR Art. 13 the controller's identity has to be disclosed to the person whose data you are collecting — that page is where the funnel does it, and the signup form links to it as the basis on which people submit their details. Taking the name out of that page would leave the form collecting names, emails and phone numbers with no identified controller.

**The part worth a second's thought.** Balmes Balmes is a German GbR, and German law (DDG, formerly TMG §5) requires a commercial site to carry provider identification — an Impressum — reachable from every page. The site does not have an Impressum page today; the footer credit was the only place the company name appeared outside the privacy notice. So removing it does not create a new gap so much as make an existing one visible.

**Decided 2026-08-29 by Paul: option 2.** The footer credit comes off every page and is replaced by `Privacy · Legal`, with `Legal` pointing at a new Impressum page. `privacy.html` keeps the controller name, untouched.

### Impressum — built 2026-08-29

`impressum.html` now exists, carrying the DDG § 5 fields:

| Field | Value |
|---|---|
| Legal name | Balmes Balmes – Maximilian Kammermeier & Paul Pfeiffer GbR |
| Address | Brunnenstr. 49, 10115 Berlin, Deutschland |
| Representatives | Maximilian Kammermeier, Paul Pfeiffer |
| Contact | info@balmesbalmes.com |

**Still open: the VAT ID (USt-IdNr.).** `Balmes Balmes/CLAUDE.md` mentions cross-border reverse-charge B2B invoicing, which implies the GbR has one. If it does, § 5 requires it on this page and I should add it. If it does not, the page is complete as it stands. I have left it out rather than invent it.

The page is styled from `assets/brand.css`, so it **ships with the redesign, not before it** — it would be the only page on the new system otherwise. It is `noindex`, which is normal for a legal notice.

---

## 9. Repository risk, unrelated to branding

This repo's only working copy is at:

```
~/Desktop/00_DUPLICATES_SAFE_TO_DELETE/02_TOCAROUGE/toca-rouge-site
```

`main` is clean and fully pushed, so nothing is lost if that folder is deleted — **but this `brand-integration` branch is local and unpushed, and would go with it.** The vault records the site repo as still needing a stable home. Worth moving before this branch accumulates more work.
