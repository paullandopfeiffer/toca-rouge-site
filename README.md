# toca-rouge-site

Source for **tocarougebarcelona.com** — the Toca Rouge audience capture funnel.
Deployed via GitHub Pages from this repo.

| File | Purpose |
|---|---|
| `index.html` | Landing page |
| `signup.html` | Signup form — POSTs directly to the linked Google Sheet via the Form's own `entry.*` fields. Reads `?src=` for attribution. |
| `privacy.html` | Privacy notice (real page, not a Doc link) |
| `CNAME` | Maps the custom domain. **Do not delete** — removing it breaks `tocarougebarcelona.com`. |

## Identity — Polvo v01, live (2026-08-29)

The site carries the **Polvo v01 Toca Rouge identity**, applied and merged
2026-08-29:

- Accent red `#EA2413` (sampled from the delivered logo files, not picked).
- Brand marks are outlined vector SVGs in `assets/logo/` — no `<text>`, no
  font dependency.
- No webfonts and no third-party asset hosts. The display type is currently the
  Helvetica Neue system stack; Polvo delivered no font file, so no `@font-face`
  is written.
- All styling lives in `assets/brand.css`, linked from every page. No inline
  styles.
- Source artwork (`brand-assets/`, `assets/preview/`) lives on Google Drive and
  is gitignored — GitHub Pages serves the whole repo and ownership is still
  being confirmed in writing.

This replaced the interim v1 look (a generic Google Font wordmark, accent
`#E4002B`), which was built 2026-08-11 and rejected the same day as a final
identity.

## Before driving real traffic here
- [x] Swap the temporary Boris ticket link for the real one — **done 2026-08-19**, verified live 2026-08-27 against `ticket_url` on the event note
