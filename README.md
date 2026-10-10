# www.mythreyi.com

The website of **Mythreyi Information Technology Private Limited**: one page, plain HTML, CSS and a little
JavaScript. No frameworks and nothing to install or build. The design, content and rules are in
[docs/design-guide.md](docs/design-guide.md).

```
index.html            the home page (all seven sections)
privacy.html          privacy notice for the contact form
404.html              "page not found"
assets/css/styles.css every style (colours and sizes at the top)
assets/js/main.js     menu, scroll effects, contact form
assets/img/           logo (SVG and PNG), favicon, phone icon, share image, Vijayam screenshot
robots.txt, sitemap.xml
docs/                 design guide and screenshots
```

## See it on your Mac

```bash
python3 -m http.server 8790 --directory ~/mythreyi-website
```

Then open http://localhost:8790. Press Control+C in the Terminal to stop it.

## Before publishing: the "To confirm" list

While `<body class="review">` is set, every item below shows a yellow **To confirm** label on the page.

1. ~~**Services**~~: done. The owner kept all six (10 Oct 2026).
2. ~~**Mission, vision and core values**~~: done. Approved as written (10 Oct 2026).
3. ~~**Why Mythreyi**~~: done. Approved as written (10 Oct 2026).
4. ~~**Mythreyi Academy**~~: done. Hidden for now (10 Oct 2026). To show it, delete `hidden` from its `<article class="project project-minor" … hidden>`.
5. **Business email:** replace "Business email: to confirm" in `#contact` with the real address, as a link:
   `<a href="mailto:name@mythreyi.com">name@mythreyi.com</a>`. Also put it in privacy.html.
6. **Social links:** put the real LinkedIn and Facebook addresses in the two links, or delete the
   `<div class="social review-only">` block.
7. **Contact form:** connect it (next section).
8. **Privacy notice:** have it reviewed, fill in the form service's name and how long messages are kept, and the date.
9. **Logo:** the site uses a vector copy redrawn from the logo image. If you have the original logo file (SVG, AI,
   EPS or a large PNG), use that instead in `assets/img/`.
10. When everything is confirmed, change `<body class="review" id="top">` to `<body id="top">` in index.html, and
   `<body class="review">` to `<body>` in privacy.html. The yellow labels disappear.

## Connecting the contact form

A plain website cannot send email by itself, so the form uses one of two ways. Set it on the `<form>` tag in index.html.

- **A form service (recommended):** for example Formspree, whose free plan handles a small number of messages a month.
  Create the account yourself, create a form, and copy its address (like `https://formspree.io/f/abcdwxyz`) into
  `data-endpoint=""` and into `action="#contact"`. Messages arrive in your inbox. If you choose a different service,
  replace `https://formspree.io` in the Content-Security-Policy line at the top of index.html with that service's address.
- **The visitor's own email app:** put your business email in `data-email=""`. Pressing **Send** opens the visitor's
  email app with the message ready. This needs no account, but some visitors have no email app set up.

## Publishing

The site is just files, so any web host works. Choose one:

### Option A: GitHub Pages (free; recommended)

1. In GitHub Desktop: **File → Add local repository** → choose `~/mythreyi-website` → **Publish repository**. Name it
   `mythreyi-website`. Free GitHub Pages needs a **public** repository, so untick "Keep this code private" (the site
   has no secrets; everything in it is shown to visitors anyway).
2. On github.com, in the repository: **Settings → Pages → Build and deployment → Deploy from a branch → main, / (root)**.
3. Still in Pages: **Custom domain** = `www.mythreyi.com` → Save. (GitHub adds a `CNAME` file to the project for you.)
4. In GoDaddy, **My Products → Domains → mythreyi.com → DNS**:
   - First disconnect the old Websites + Marketing site from mythreyi.com (or delete its two "A" records for `@`).
   - Add a **CNAME** record: name `www`, value `vijayam1.github.io` (your GitHub user name + `.github.io`).
   - Add four **A** records for `@`: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`.
   - Don't touch any other records.
5. Back in GitHub Pages, wait until the domain check is green (from a few minutes up to a day), then tick
   **Enforce HTTPS**.
6. Protect the name: on github.com, **your profile picture → Settings → Pages → Add a domain** → `mythreyi.com`, and
   add the TXT record it shows in GoDaddy. This stops anyone else's GitHub site from using your domain.

### Option B: GoDaddy web hosting (paid)

Buy the smallest Linux hosting plan, open **cPanel → File Manager → public_html**, and upload every file and folder
in this project (except `docs/` and `.claude/`). The domain connects automatically when the hosting is for mythreyi.com.

### Option C: GoDaddy Websites + Marketing (what mythreyi.com uses today)

That editor does not accept your own code. You would retype the text from index.html into its sections, and the
design would be GoDaddy's theme, not this one.

## Keeping it up to date

- **Change text:** edit index.html, check it on your Mac (above), then publish (commit and push in GitHub Desktop;
  GitHub Pages updates within a minute or two).
- **Add a product:** copy the Vijayam `<article class="project project-feature">` block in `#projects` and change it.
  Put any picture in `assets/img/` (JPEG, about 600 px wide, under 150 KB) with a written description in `alt`.
- **The year** in the footer updates by itself.
- **Every six months:** click every link, send yourself a test message through the form, check the privacy notice is
  still true, and paste the address into https://pagespeed.web.dev to check speed and accessibility.
- **Colours and sizes** live at the top of `assets/css/styles.css`; change a token there and it changes everywhere.
