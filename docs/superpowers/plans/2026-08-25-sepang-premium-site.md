# SEPANG TECH GROUP Premium Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the approved premium bilingual static site on `redesign-bg` while preserving the current GitHub Pages domain, payment links, contact workflow, legal pages, and SEO foundation.

**Architecture:** Keep the existing static HTML/CSS/vanilla-JS architecture. Treat `index.html` and `en.html` as the two primary page shells, `style.css` as the shared visual system, `app.js` as the shared interaction layer, and the legal/support pages as lightweight consumers of the same design tokens. Keep `main` unchanged until the redesign branch passes final verification.

**Tech Stack:** HTML5, CSS3, vanilla JavaScript, Google Fonts (Manrope + DM Sans), GitHub Pages, PayPal hosted payment links, FormSubmit.

**Spec:** `docs/superpowers/specs/2026-08-25-sepang-premium-site-design.md`

## Global Constraints

- Branch: `redesign-bg`; do not modify `main` until final review.
- Static HTML/CSS/vanilla JavaScript only; no framework migration.
- Preserve `CNAME` and GitHub Pages configuration.
- Preserve `wagner-bg.shop` as Bulgarian canonical URL.
- Preserve all four PayPal links exactly as supplied.
- Preserve FormSubmit and `_next=https://wagner-bg.shop/thanks.html`.
- No Markdown fences inside source files.
- Preserve legal/support pages and keep their navigation consistent.
- Preserve `favicon.svg`, `robots.txt`, `sitemap.xml`, and existing static pages unless consistency requires a targeted edit.
- BG and EN must have identical information architecture and interaction behavior.

---

### Task 1: Validate the redesign branch and establish the baseline

**Files:**
- Read: `index.html`, `en.html`, `style.css`, `app.js`, `CNAME`, `robots.txt`, `sitemap.xml`, `privacy.html`, `terms.html`, `cookies.html`, `thanks.html` on `redesign-bg`.
- Modify: none.

**Interfaces:**
- Produces: a verified baseline of file names, links, payment URLs, form endpoint, and current branch state for later tasks.

- [ ] **Step 1: Read the current branch files**

Use the GitHub repository file API for each file on `redesign-bg` and capture current blob SHAs before any update.

- [ ] **Step 2: Verify payment links and form routing**

Confirm the four PayPal URLs are exactly:
`https://www.paypal.com/ncp/payment/KBL65LTBNK568`
`https://www.paypal.com/ncp/payment/7AFUQ6PKWXG7W`
`https://www.paypal.com/ncp/payment/MFZDQ9TX4532E`
`https://www.paypal.com/ncp/payment/HX5UVLP8VX7MY`

Confirm the FormSubmit action targets `https://formsubmit.co/sepanggroupltd@gmail.com` and `_next` targets `https://wagner-bg.shop/thanks.html`.

- [ ] **Step 3: Compare `redesign-bg` with `main`**

Run the GitHub compare API for `main...redesign-bg` and record the changed files and commit count.

- [ ] **Step 4: Baseline review gate**

Proceed only when the branch still isolates redesign work and `main` is untouched by the redesign commits.

---

### Task 2: Complete the Bulgarian homepage structure

**Files:**
- Modify: `index.html` on `redesign-bg`.

**Interfaces:**
- Consumes: existing site data and the approved design specification.
- Produces: a complete Bulgarian homepage with sections in the specified order and working internal anchors.

- [ ] **Step 1: Replace the incomplete homepage structure**

Use the approved homepage structure: hero, services, business solutions, why SEPANG, pricing, payment methods, about, process, contact, footer.

- [ ] **Step 2: Preserve the four existing pricing packages**

Keep exact product names, prices, feature lists, and PayPal URLs supplied by the user.

- [ ] **Step 3: Expand the service selector**

Include Website, Online store, Custom software, Mobile application, Business digitalization, Process automation, API & system integrations, CRM / ERP integration, SEO & optimization, IT consulting, Support & development.

- [ ] **Step 4: Validate HTML source boundaries**

Confirm the file starts with `<!doctype html>` and ends with `</html>` and contains no Markdown code fences.

- [ ] **Step 5: Commit**

Commit as `feat: complete Bulgarian premium homepage`.

---

### Task 3: Build the shared premium visual system

**Files:**
- Modify: `style.css` on `redesign-bg`.

**Interfaces:**
- Consumes: class names and IDs from `index.html`/`en.html`.
- Produces: shared premium visual system for homepage and supporting pages.

- [ ] **Step 1: Define design tokens**

Use deep navy, white, restrained green accent, neutral text, line, soft-surface, radius, shadow, and container tokens.

- [ ] **Step 2: Implement desktop layout**

Style sticky navigation, hero/dashboard, service cards, business-solution layout, dark section, pricing cards, payments, about split layout, process cards, contact form, and footer.

- [ ] **Step 3: Implement responsive breakpoints**

Provide tablet and mobile layouts including collapsed navigation, one-column service cards, pricing cards, process cards, and contact form.

- [ ] **Step 4: Add accessibility states**

Provide visible focus styles for controls and preserve semantic contrast. Add reduced-motion behavior with `prefers-reduced-motion`.

- [ ] **Step 5: Commit**

Commit as `feat: add premium responsive visual system`.

---

### Task 4: Implement shared JavaScript interactions

**Files:**
- Modify: `app.js` on `redesign-bg`.

**Interfaces:**
- Consumes: `.menu`, `#main-nav`, `.reveal` elements, and navigation links.
- Produces: accessible mobile navigation, closing navigation behavior, and progressive reveal effects.

- [ ] **Step 1: Implement mobile menu state**

Toggle the navigation with the `.menu` button and update `aria-expanded`.

- [ ] **Step 2: Close mobile navigation after selection**

Every navigation link must close the mobile menu and reset `aria-expanded`.

- [ ] **Step 3: Implement reveal animation**

Use `IntersectionObserver` for `.reveal` elements and unobserve each element after it becomes visible.

- [ ] **Step 4: Respect reduced motion**

Do not force animation when the CSS media query requests reduced motion.

- [ ] **Step 5: Commit**

Commit as `feat: improve site interactions and mobile navigation`.

---

### Task 5: Bring the English homepage to exact structural parity

**Files:**
- Modify: `en.html` on `redesign-bg`.

**Interfaces:**
- Consumes: the completed Bulgarian information architecture and shared CSS/JS.
- Produces: an English page with identical sections, pricing structure, PayPal actions, contact workflow, footer/legal navigation, and responsive behavior.

- [ ] **Step 1: Mirror the Bulgarian section order**

Ensure hero, services, business solutions, why SEPANG, pricing, payments, about, process, contact, and footer all exist in the same order.

- [ ] **Step 2: Translate visible labels and metadata**

Use `lang="en"`, unique English title/description, English navigation, English form labels/options, and English footer/legal labels.

- [ ] **Step 3: Preserve PayPal actions**

Keep the same four PayPal payment URLs attached to the same four packages.

- [ ] **Step 4: Verify reciprocal language links**

BG links to `en.html`; EN links to `index.html`; both pages provide reciprocal `hreflang` metadata.

- [ ] **Step 5: Commit**

Commit as `feat: align English homepage with Bulgarian structure`.

---

### Task 6: Normalize legal/support pages and navigation consistency

**Files:**
- Modify: `privacy.html`, `terms.html`, `cookies.html`, `thanks.html` as needed on `redesign-bg`.

**Interfaces:**
- Consumes: shared `style.css` and site-wide navigation.
- Produces: visually consistent supporting pages with valid navigation back to the main site.

- [ ] **Step 1: Verify relative asset paths**

Ensure supporting pages reference the root `style.css` path correctly.

- [ ] **Step 2: Add consistent header/footer navigation**

Ensure users can return to the homepage and reach relevant legal/support destinations without broken links.

- [ ] **Step 3: Keep content scoped to existing legal/support pages**

Do not invent legal claims beyond the current repository content; only normalize structure and navigation.

- [ ] **Step 4: Commit**

Commit as `chore: normalize supporting page navigation`.

---

### Task 7: SEO and static-site integrity pass

**Files:**
- Modify: `robots.txt`, `sitemap.xml`, and `index.html`/`en.html` only if verification reveals inconsistencies.

**Interfaces:**
- Consumes: final page URLs and domain configuration.
- Produces: consistent crawl directives, sitemap URLs, canonical tags, reciprocal hreflang, and Organization JSON-LD.

- [ ] **Step 1: Validate canonical URLs**

BG canonical must be `https://wagner-bg.shop/`; EN canonical must be `https://wagner-bg.shop/en.html`.

- [ ] **Step 2: Validate reciprocal hreflang**

Each language version must reference both BG and EN equivalents.

- [ ] **Step 3: Validate sitemap coverage**

List existing public pages that should be indexed and avoid adding nonexistent paths.

- [ ] **Step 4: Validate robots directive**

Keep the root site crawlable and point to the sitemap.

- [ ] **Step 5: Commit**

Commit as `chore: finalize SEO and static-site metadata`.

---

### Task 8: Final verification of redesign branch

**Files:**
- Read: all site files in `redesign-bg`.
- Modify: only targeted fixes found by verification.

**Interfaces:**
- Consumes: all prior task outputs.
- Produces: verified, reviewable `redesign-bg` candidate.

- [ ] **Step 1: Search for Markdown fences**

Search all source HTML/CSS/JS/Markdown-backed source files for ` ```html`, ` ```css`, or ` ```js` and confirm none exist inside source files.

- [ ] **Step 2: Search for broken internal links**

Check every `href` and page reference used by the homepage and supporting pages against the repository file list and section IDs.

- [ ] **Step 3: Verify mobile navigation contract**

Confirm `.menu` controls `#main-nav`, `aria-expanded` is updated, and navigation closes after link selection.

- [ ] **Step 4: Verify payment/contact contracts**

Confirm all four PayPal URLs and the FormSubmit action plus `_next` URL are unchanged and present exactly once where intended.

- [ ] **Step 5: Compare against `main`**

Generate the final `main...redesign-bg` comparison and confirm it contains only redesign-scope files/changes.

- [ ] **Step 6: Review the published site**

Check GitHub Pages deployment status and the domain `https://wagner-bg.shop/` without changing DNS or merging yet.

- [ ] **Step 7: Final review gate**

Stop before merging `redesign-bg` into `main` until the user reviews the resulting site and approves publication.
