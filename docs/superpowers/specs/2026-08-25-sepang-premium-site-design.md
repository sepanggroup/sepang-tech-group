# SEPANG TECH GROUP Premium Site — Design Specification

**Branch:** `redesign-bg`  
**Base:** `main`  
**Domain:** `https://wagner-bg.shop/`

## Goal

Upgrade the SEPANG TECH GROUP static website into a coherent premium bilingual digital-business site that positions the company as a technology partner rather than only a web-site provider, while preserving the existing domain, GitHub Pages deployment, PayPal payment links, contact workflow, legal pages, and SEO foundation.

## User-facing structure

### Bulgarian homepage

The homepage will contain these major sections in this order:

1. Premium hero with clear value proposition, primary CTA, secondary CTA, project dashboard and trust indicators.
2. Services: websites, e-commerce, custom software, mobile applications, process automation, API/system integrations, SEO, IT consulting, support/development.
3. Business Solutions: business digitalization, process optimization, business systems, CRM/ERP integrations, e-business platforms, technology strategy.
4. Why SEPANG: tailored approach, technology foundation, results focus, long-term development.
5. Pricing: the four existing starting-price packages with the existing PayPal links.
6. Payment methods: Visa/Mastercard, PayPal, bank transfer, invoice.
7. About: company positioning, quality/security/business-value narrative.
8. Process: analysis, strategy, design, development, integration, deployment.
9. Contact: FormSubmit form, service selector expanded for the new services, company contact details.
10. Footer: navigation, legal links, English version, copyright.

## Visual direction

The visual language remains premium, dark and technical: deep navy surfaces, white typography, restrained green accent, strong spacing, Manrope headings, DM Sans body text, subtle borders, grid textures, restrained motion, and high-contrast CTAs.

The redesign must be responsive for desktop, tablet and mobile. The navigation becomes a keyboard- and screen-reader-friendly mobile menu. Sections use unobtrusive reveal motion that is disabled/reduced for users with `prefers-reduced-motion`.

## Technical boundaries

- Static HTML/CSS/vanilla JavaScript only.
- No framework migration.
- Keep `CNAME` and GitHub Pages configuration unchanged.
- Keep `wagner-bg.shop` as the canonical Bulgarian URL unless deployment configuration later changes deliberately.
- Keep PayPal links exactly as currently supplied by the user.
- Keep FormSubmit as the current contact transport; the `_next` target remains `https://wagner-bg.shop/thanks.html`.
- Keep existing legal pages and make their navigation consistent with the new design.
- Keep `favicon.svg`, `robots.txt`, `sitemap.xml` and existing static pages unless a targeted consistency fix is required.
- The `main` branch must not be modified until the redesign branch is reviewed and verified.

## SEO and accessibility

- Valid HTML document structure with no Markdown fences in source files.
- `lang="bg"` for Bulgarian and `lang="en"` for English.
- Unique title and description per language.
- Canonical and reciprocal `hreflang` links.
- Organization JSON-LD retained and kept consistent with company data already in the repository.
- Semantic headings and links.
- Accessible mobile-navigation control with `aria-expanded`.
- Clear focus styles for form fields and navigation.
- Reduced-motion handling.

## English parity

`en.html` must provide the same information architecture, visual hierarchy, pricing structure, PayPal actions, contact workflow, footer/legal navigation, and responsive behavior as the Bulgarian homepage. Only the copy and language-specific metadata/labels differ.

## Success criteria

1. `redesign-bg` contains the complete bilingual premium experience without changing `main`.
2. Existing PayPal links remain functional and tied to the four pricing cards.
3. Contact form submits to FormSubmit and returns to `thanks.html`.
4. Internal navigation links resolve to existing sections/pages.
5. Mobile navigation works and closes after selecting a navigation link.
6. No source file contains Markdown fences such as `````html`.
7. The visual system is consistent across the homepage and legal/support pages.
8. GitHub Pages can build the branch without file/path errors.
9. The final diff is reviewable and limited to the redesign scope.
