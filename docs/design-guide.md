# Mythreyi Information Technology: design guide

The company website is one elegant page at www.mythreyi.com. It leads people to the company's products, starting with
Vijayam Classifieds at www.vijayam.com. This guide records the structure, the content, the look and the rules behind it,
so that anyone can extend the site without losing its character.

## 1. Sitemap and structure

| Address | What it is |
| --- | --- |
| `/` (index.html) | The home page: seven sections on one page |
| `/#about` | About us: introduction, mission, vision, core values |
| `/#services` | Our services: six service cards |
| `/#why` | Why Mythreyi: four strengths |
| `/#approach` | Our approach: Discover → Design → Develop → Deliver |
| `/#projects` | Projects and innovation: Vijayam Classifieds (Mythreyi Academy is ready but hidden for now) |
| `/#contact` | Contact: form, email, registered office, social links |
| `/privacy.html` | Privacy notice for the contact form |
| `/404.html` | "Page not found" |
| `/robots.txt`, `/sitemap.xml` | For search engines |

Links out: www.vijayam.com (the product). Later: www.mythreyi.in (Mythreyi Academy), when it opens.

**Room to grow.** Each new product is one more `<article class="project">` in Projects. If the site later needs full
pages (for example a page per service, or careers), add them like `privacy.html`, with the same header and footer,
and list them in `sitemap.xml`.

## 2. Homepage content

| Section | Headline | Status |
| --- | --- | --- |
| Hero | "Engineering Technology. Empowering Possibilities." + "Transforming ideas into meaningful digital solutions." | Owner's wording |
| Facts strip | Registered in Andhra Pradesh, India · Incorporated in 2022 · Products in English and Telugu | Facts (CIN, Vijayam) |
| About us | "Meaningful technology, carefully built." | Facts; mission, vision and values approved by the owner (10 Oct 2026) |
| Our services | "What we can do for you": six services | Approved by the owner (10 Oct 2026) |
| Why Mythreyi | "Built with care, explained in plain words.": four strengths | Approved by the owner (10 Oct 2026); drawn from how Vijayam is built |
| Our approach | "Four steps from idea to impact" | Proposed process |
| Projects | Vijayam Classifieds (live, beta) | Fact. Mythreyi Academy hidden for now (owner, 10 Oct 2026) |
| Contact | "Let's build something meaningful." | Email, social links **to confirm** |

Rules the content follows: no invented history, people, clients, awards, testimonials, numbers or results. The
only facts used are the company's registration (CIN U72900AP2022PTC120666: Andhra Pradesh, 2022), its registered
office, and what Vijayam Classifieds really does.

## 3. Layouts

Screenshots of the real page are in `docs/screenshots/`:

- `desktop-first-screen.png` and `desktop-full.jpg`: 1440 px wide
- `mobile-first-screen.png` and `mobile-full.jpg`: 390 px wide (an iPhone-size screen)

| Width | Layout |
| --- | --- |
| Under 640 px (phones) | One column; menu folds behind the ☰ button; process steps joined by a vertical line |
| 640–959 px (tablets) | Services and values in two columns; menu still folded |
| 960 px and wider (laptops, desktops) | Full menu in the bar; hero text beside the illustration; three service columns; four process steps in a row with arrows |

The content is never wider than 1,200 px, with at least 16 px of space at each side on phones.

## 4. Logo

The Mythreyi logo is a golden-yellow "M" shaped like two mountain peaks, with a red drop above it. It is used as
`assets/img/logo.svg`, a vector drawing measured from the logo image the owner supplied, so it stays sharp at every size.
The same logo is used by Vijayam and Mythreyi Academy. All the logo files below (and the logo inside the hexagon in
`index.html` and in the share picture) are made from one shape by the Vijayam project's
`tools/make_brand_icons.py --mythreyi ~/mythreyi-website`; to change the logo, change it there and run it again.

| File | Use |
| --- | --- |
| `logo.svg` | Header, footer, hero (transparent background) |
| `logo-512.png` | Google and other services that need a picture file |
| `favicon.svg` | Browser tab (logo on a navy square, so it shows on light and dark tab bars) |
| `apple-touch-icon.png` | iPhone home screen (180 px, navy background) |

- **Colours:** gold #FFC700, red #FF1717 (the same in all three brands). They are the logo's own colours; the page's accent stays teal, so
  the logo stands out on the midnight navy.
- **Background:** midnight navy or white. Don't place it on yellow, red or busy photos.
- **Size:** at least 24 px tall on screens; leave space around it of at least a quarter of its height.
- **Don't** stretch, recolour, outline or rotate it.

## 5. Colour system

| Token | Colour | Used for | Contrast |
| --- | --- | --- | --- |
| `--navy-900` midnight navy | #0B1A30 | Hero, dark sections, header | — |
| `--navy-950` | #07121F | Footer, open menu | — |
| `--white-soft` soft white | #F8F9FB | Light section backgrounds, form fields | — |
| `--silver-200` | #E2E7EE | Lines and borders on light | — |
| `--silver-400` subtle silver | #A7B2C0 | Secondary text on navy | 8.1 : 1 on navy |
| `--slate-600` | #4B5868 | Secondary text on light | 6.9 : 1 on soft white |
| `--ink` | #0E1A2B | Main text on light | 17 : 1 |
| `--teal-400` | #2DD4BF | Accent and buttons on navy | 9.4 : 1 on navy |
| `--teal-700` | #0F766E | Accent text and buttons on light | 5.5 : 1 on white |
| `--blue-500` electric blue | #3B82F6 | Only inside the hero illustration | decorative |

All text meets WCAG 2.2 AA (4.5 : 1 for body text). Only one accent family (teal) is used for actions, so buttons are
always easy to spot. Gradients are limited to two soft glows and a faint grid in the hero.

## 6. Typography

No web fonts are downloaded: the page loads fast and no visitor information goes to a font service.

- **Headings:** Avenir Next (Mac, iPhone), Segoe UI (Windows), Roboto (Android), weight 600, slightly tight letter spacing.
- **Body:** the device's own system font, 17 px, line height 1.65.

| Style | Size (phone → desktop) |
| --- | --- |
| Hero headline (h1) | 37 → 60 px |
| Section headline (h2) | 30 → 44 px |
| Card headline (h3) | 20 → 24 px |
| Lead paragraph | 20 px |
| Body | 17 px |
| Labels ("eyebrows") | 14 px, capitals, wide spacing |

## 7. Components (reusable)

All styles are in `assets/css/styles.css`, grouped as tokens, base, layout, components, sections, motion and
review notes.

- **Buttons:** `.btn` + `.btn-primary` (teal) or `.btn-ghost` (outline, on navy); `.btn-sm`, `.btn-block`.
- **Section heading:** `.section-head` with `.eyebrow`, `h2`, `.lead`; add `.section-head-center` to centre it.
- **Cards:** `.cards.cards-3` grid of `.card`; service icon in `.icon`.
- **Project:** `.project.project-feature` (text + picture) or `.project.project-minor` (text only); status label
  `.project-status.status-live` or `.status-planning`.
- **Process:** `ol.process` of `li.step`.
- **Review notes:** `.review-note` (yellow "To confirm" label), `.tbc` (a value still to fill in) and
  `.review-only` (a block shown only while reviewing). All of them disappear when `class="review"` is removed
  from `<body>`.

## 8. Motion

- Sections fade up gently as they scroll into view. Only sections that start below the screen do this, so nothing
  flickers on load.
- The hero illustration has slow "data pulses" travelling to the centre, and a slowly turning dotted ring.
- Buttons and cards lift slightly on hover.
- When a visitor's device asks for reduced motion, all of this switches off.

## 9. Accessibility (WCAG 2.2 AA target)

- "Skip to main content" link; header, navigation, main and footer landmarks; one h1, then h2 and h3 in order.
- Every control works with the keyboard; a clear teal focus ring; Escape closes the phone menu and returns focus
  to the menu button.
- The sticky header never hides the focused element (scroll padding).
- Touch targets meet WCAG 2.2 AA (at least 24 × 24 px); buttons and the phone menu's items are 42–48 px tall.
- Form: visible labels, errors written in words next to each field and announced, focus moves to the first problem.
- The decorative illustration is hidden from screen readers; the Vijayam screenshot has a written description.

## 10. Search engines and sharing

- Title, description and canonical address on every page; `robots.txt`, `sitemap.xml`.
- Organisation details for Google (legal name, CIN, address, founding year, the Vijayam brand) in JSON-LD.
- A share image (`assets/img/og-image.png`, 1200 × 630) for WhatsApp, Facebook and LinkedIn previews.

## 11. Security

- A Content Security Policy allows only the site's own files (plus the form service, if used): no outside scripts.
- No inline scripts or styles; external links use `rel="noopener"`.
- Contact form: hidden "honeypot" field and a 3-second minimum to stop robots, length limits on every field, nothing
  placed in the web address, and consent required before sending.
- No secrets in the code. A form service's address is public by design; its spam settings are managed in its own account.
