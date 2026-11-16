# Users & Posts — Design System

**Theme:** light · **Surface:** Operate (task completion) · **Palette:** Deep Plum

A near-white gallery with one deep plum punctuation. The structure is Apple-derived: an 80px product statement, tight SF Pro tracking, a 1080px frame, 28px surfaces, 980px search and title fields, 9999px pills, and 1px hairlines. The palette is Deep Plum: a pale lavender writing surface, ink typography, slate metadata, and a single bright alert for invalid input. Nothing is raised by a shadow. Monograms carry identity; there is no photography.

## Color

| Name | Value | Token | Role |
|---|---|---|---|
| Canvas | `#FCFCFD` | `--color-canvas` | Page, navigation, index bar, input fills, post feed and the quiet majority of the page. |
| Ink | `#1C1C1E` | `--color-ink` | Headlines, body copy, input text, footer legal text, and selected text on primary. |
| Slate | `#8E8E93` | `--color-slate` | Supporting copy, handles, counts, placeholders, icons, and control outlines. Never post bodies, errors or instructions. |
| Primary | `#5E2E8C` | `--color-primary` | Publish pill, text links, focus rings, the “New” label and the selected person. The only chromatic action color. |
| Primary Hover | `#4A2370` | `--color-primary-hover` | Hover and pressed state for the Publish pill and text links. |
| Accent Light | `#E8DDFF` | `--color-accent-light` | The composer surface, footer band, row hover, avatar fills, skeletons and the review bar hover. |
| Alert | `#FF3B30` | `--color-alert` | Invalid field edges and their short validation messages only. Never a page error, decoration or status. |
| Hairline | `#E5E5EA` | `--color-hairline` | Every 1px divider and edge: navigation, list header, feed separators, review chrome. |

### Balance

- **~80% Canvas** — the gallery; the page is mostly air.
- **~15% Accent Light** — one writing surface and one footer band; never a stack of lavender cards.
- **~5% Primary** — a pill, a link, a New label, a selected row. It stays punctuation.
- Alert appears only when the form is invalid. There is no second accent and no orange.

### Text on surfaces

- On **Canvas**, use Ink for primary copy and Slate only for supporting metadata.
- On **Accent Light**, secondary text steps up to **Ink**. Slate is too quiet against `#E8DDFF`.
- On **Primary**, use white for the name/action and `Accent Light` for the handle.

### Contrast note

Ink on Canvas and Accent Light clears AA comfortably. White on Primary and Primary on Canvas also clear AA. Slate (`#8E8E93`) is roughly **3.2:1** on Canvas and lower on Accent Light, so it is reserved for supporting display copy and non-essential metadata; the form labels, footer note, error instructions and post bodies use Ink. Alert (`#FF3B30`) is a vivid functional red; it is always paired with a 1px border and explanatory text, never used as the only signal. If the project later requires strict AA for 12px error copy, keep the alert border and move the message text to Ink.

## Typography

### Families

- **SF Pro Display** — product name, person name, post titles, section headings, masthead. Fallback: `-apple-system, BlinkMacSystemFont, "Helvetica Neue", Inter, Arial, sans-serif`.
- **SF Pro Text** — navigation, body, links, labels, counts, buttons, footer. Same fallback stack.
- Weights: 400, 500, 600. Never 700. Display tracking is negative and tight; body tracking is consistently negative.

### Type scale

| Role | Family | Weight | Size | Line height | Letter spacing | Token |
|---|---|---|---|---|---|---|
| global-nav | SF Pro Text | 400 | 12px | 1 | -0.12px | `--text-global-nav` |
| compact-control | SF Pro Text | 400 | 12px | 1.33 | -0.12px | `--text-compact-control` |
| body-small | SF Pro Text | 400 | 14px | 1.29 | -0.224px | `--text-body-small` |
| body | SF Pro Text | 400 | 17px | 1.47 | -0.374px | `--text-body` |
| product-nav-title | SF Pro Display | 600 | 19px | 1.21 | 0.228px | `--text-product-nav-title` |
| product-kicker | SF Pro Display | 600 | 21px | 1.24 | -0.2px | `--text-product-kicker` |
| post-title | SF Pro Display | 600 | 24px | 1.21 | -0.3px | `--text-post-title` |
| state-title | SF Pro Display | 600 | 28px | 1.14 | -0.2px | `--text-state-title` |
| person-name | SF Pro Display | 600 | 40px | 1.05 | 0 | `--text-person-name` |
| hero-display | SF Pro Display | 600 | 80px | 1.05 | -1.2px | `--text-hero-display` |

### App hierarchy

1. **Masthead** — 80px/600, 84px line, `-1.2px`, Ink. One line: “Users & Posts.”
2. **Lede** — 21px/400, 1.38, `-0.2px`, Slate. One short sentence. No eyebrow or kicker.
3. **Person name** — 40px/600, 1.05, 0 tracking, Ink. Avatar 56px.
4. **Post title** — 24px/600, 1.21, `-0.3px`, Ink.
5. **Section heading** — 21px/600, 1.24, `-0.2px`, Ink (“People”, “Write a post”, “Posts”).
6. **Body** — 17px/400, 1.47, `-0.374px`, Ink. Max measure 65ch.
7. **Meta** — 14px or 12px, `-0.224px` / `-0.12px`, Slate. Handles, counts, placeholders, hints.
8. **Labels** — 12px/500, `-0.12px`, Ink on the lavender composer; Slate on Canvas metadata.

The hero is the only 80px line. The scale steps down decisively: 80 → 40 → 24 → 21 → 17 → 12.

## Spacing & shape

**Base unit:** 4px. **Density:** comfortable. **Section gap:** 90px. **Card padding:** 40px desktop / 32px tablet / 24px mobile.

**Layout**

- Frame: `min(1080px, 100% - 80px)`; gutters 40 desktop, 24 tablet, 20 phone.
- Grid: 344px sticky rail + 24px gap + fluid feed (712px at 1080).
- Nav 44px, sticky. Index bar 64px desktop / 56px phone, sticky below it.
- Directory row 64px desktop / 52px phone shelf. Feed person header 56px. Rule 28px. Composer margin 32px. Posts 64px below the composer.
- Footer: 64px padding, full-bleed accent-light.

**Radii**

| Element | Value |
|---|---|
| Cards, media, composer | 28px |
| Textarea | 20px |
| Directory rows, links | 10px |
| Search, title input | 980px |
| Buttons / pills | 9999px |
| Avatars | 50% |

**Elevation:** zero shadows. Separation comes from Canvas against Accent Light, 28px corners and 1px Hairline edges. There are no gradient fills and no offset shadows. A 2px Primary focus ring with a 3px offset is the only visible halo, and it is an accessibility affordance, not elevation.

## Components

### Global navigation

44px, sticky, Canvas at 92% with a 20px blur, 1px Hairline bottom edge. Wordmark 14px/600 Ink left; “Demo data” 12px Slate right. No links, no logo, no stack advertising.

### Masthead

Canvas. 72px top, 56px bottom. 80px H1 Ink, one line. 21px Slate lede directly below. No kicker, no image, no card.

### Index bar

64px (56 phone), sticky under the nav, Canvas at 92% with a blur and a 1px Hairline bottom edge. Search pill 344px wide, 44px tall, 980px radius, 1px Slate outline, 16px Slate search glyph, 14px SF Pro Text. Focus: 1px Primary outline plus a 2px Primary ring. Count 12px Slate, number 600 Ink, tabular numerals.

### Directory

Aside, sticky at `132px`, own scroll. Header: “People” 14px/600 Ink and a 12px Slate count, separated by 1px Hairline. Rows: 64px, 10px radius, 12px horizontal padding, 2px gap, 40px accent-light monogram avatar, 17px/500 Ink name, 12px Slate handle. Hover: Accent Light. Selected: **Primary fill**, white name, Accent Light handle, 1px Primary edge; the avatar becomes white 14% with white initials. This is the one saturated block on the page.

### Person header

56px avatar, 40px name Ink, 14px Slate handle. 1px Hairline rule 28px below, then 32px to the composer. No card.

### Composer

The only large soft surface: Accent Light, 28px radius, 40px padding, no border, no shadow. Header “Write a post” 21px/600 Ink, “as Leanne Graham” 12px Ink right. Two fields only:

- Title: 52px, 9999px radius, Canvas fill, 1px Slate edge, 22px horizontal padding, 17px text. Focus: 1px Primary edge, 2px Primary ring.
- Body: 128px minimum, 20px radius, Canvas fill, 1px Slate edge, 20px padding, 17px/1.47 text.
- Labels: 12px/500 Ink, 8px above the control. Placeholders Slate.
- Footer: “0 / 500” 12px Ink tabular left; “Clear” 12px Primary text action; “Publish” 44px Primary pill, white 12px/400 label, hover and pressed `Primary Hover`. 20px gap between actions.
- Invalid: 1px Alert edge on the field, 12px Alert message 8px below, `aria-invalid` and `aria-describedby`. Text states the problem; color is never alone.

### Post feed

Canvas, no cards. “Posts” 21px/600 Ink, 16px above the first hairline. Each post: 28px top / 32px bottom padding, 1px Hairline top edge. Optional “New” 12px/600 Primary label 8px above the title. Title 24px/600 Ink; body 17px/1.47 Ink, max 65ch, preserving line breaks from the API. No invented dates or bylines. No hover on non-interactive posts.

### Empty, loading and error

- Empty: centered 40px Ink “Start with a person.”, 17px Ink supporting line, 44px outlined ghost pill (1px Slate, Ink text, Accent Light hover).
- Loading: 56px/40px accent-light skeleton blocks with a soft opacity pulse; no gradient shimmer. Ten directory rows and three feed posts approximate the loaded height.
- Error: 28px Ink headline, 17px Ink explanation, Primary “Try again” link. Load errors stay monochrome; Alert is reserved for invalid input.
- No results: 14px/600 Ink “No one matches …”, 12px Ink recovery line, Primary “Clear search” link. Counts step to zero.

### Footer

Full-bleed Accent Light, 64px padding. “Users & Posts” 14px/600 Ink; “Demo data from JSONPlaceholder. New posts live only in this session.” 12px/1.33 Ink right. Stacked left on phones. No links.

### Focus, links and selection

- Focus: 2px Primary outline, 3px offset, everywhere. Fields combine a 1px Primary edge with the ring. Primary buttons use the same ring; the offset gap keeps it visible.
- Links: Primary, underline on hover, 2px underline offset, hover color `Primary Hover`.
- Selection: Accent Light background, Ink text. Caret Primary. Scrollbar thumb Slate on a Canvas track.
- No color-only state: selection adds fill and weight; errors add text and a border; the New label is text.

## Motion

Hover and focus transitions 160ms with `cubic-bezier(0.32, 0.72, 0, 1)`. A newly published post may enter with a 220ms opacity/8px translate; reduced-motion removes it. Skeletons pulse opacity, never a gradient sweep. No parallax, no scroll effects.

## Do / Don't

**Do**

- Use Canvas as the page and Accent Light for exactly one writing surface and one footer band.
- Use Primary for the Publish pill, text links, the New label, the selected row and focus.
- Use 1px `#E5E5EA` hairlines for every divider and edge.
- Keep 28px for the composer, 20px for the textarea, 980px for search/title, 9999px for pills.
- Keep body copy and instructions in Ink; on Accent Light, secondary text also steps up to Ink.
- Use monogram initials for identity; no photos, no external avatar service.

**Don't**

- Don't add shadows, gradients, glass as decoration or a second accent.
- Don't use Primary as a large page background or fill multiple large blocks with it.
- Don't use Slate for post bodies, errors, instructions or legal text.
- Don't use Alert for load errors, status or decoration; only invalid input.
- Don't introduce colored status pills for “New”; it is bare Primary text.
- Don't shrink the composer to a boxed admin panel or nest cards inside it.

## Quick Start

```css
:root {
  /* Deep Plum */
  --color-canvas: #FCFCFD;
  --color-ink: #1C1C1E;
  --color-slate: #8E8E93;
  --color-primary: #5E2E8C;
  --color-primary-hover: #4A2370;
  --color-accent-light: #E8DDFF;
  --color-alert: #FF3B30;
  --color-hairline: #E5E5EA;

  /* Type families */
  --font-sf-pro-display: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Inter, Arial, sans-serif;
  --font-sf-pro-text: "SF Pro Text", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Inter, Arial, sans-serif;

  /* Type scale */
  --text-global-nav: 12px;
  --leading-global-nav: 1;
  --tracking-global-nav: -0.12px;
  --text-compact-control: 12px;
  --leading-compact-control: 1.33;
  --tracking-compact-control: -0.12px;
  --text-body-small: 14px;
  --leading-body-small: 1.29;
  --tracking-body-small: -0.224px;
  --text-body: 17px;
  --leading-body: 1.47;
  --tracking-body: -0.374px;
  --text-product-nav-title: 19px;
  --leading-product-nav-title: 1.21;
  --tracking-product-nav-title: 0.228px;
  --text-product-kicker: 21px;
  --leading-product-kicker: 1.24;
  --tracking-product-kicker: -0.2px;
  --text-post-title: 24px;
  --leading-post-title: 1.21;
  --tracking-post-title: -0.3px;
  --text-state-title: 28px;
  --leading-state-title: 1.14;
  --tracking-state-title: -0.2px;
  --text-person-name: 40px;
  --leading-person-name: 1.05;
  --tracking-person-name: 0;
  --text-hero-display: 80px;
  --leading-hero-display: 1.05;
  --tracking-hero-display: -1.2px;

  /* Weights */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;

  /* Layout */
  --frame-max: 1080px;
  --gutter: 40px;
  --rail-width: 344px;
  --nav-height: 44px;
  --index-height: 64px;
  --section-gap: 90px;
  --card-padding: 40px;

  /* Spacing */
  --spacing-4: 4px;
  --spacing-8: 8px;
  --spacing-12: 12px;
  --spacing-16: 16px;
  --spacing-20: 20px;
  --spacing-24: 24px;
  --spacing-28: 28px;
  --spacing-32: 32px;
  --spacing-40: 40px;
  --spacing-48: 48px;
  --spacing-56: 56px;
  --spacing-64: 64px;
  --spacing-72: 72px;
  --spacing-90: 90px;
  --spacing-128: 128px;

  /* Radii */
  --radius-card: 28px;
  --radius-textarea: 20px;
  --radius-row: 10px;
  --radius-search: 980px;
  --radius-pill: 9999px;
  --radius-avatar: 50%;

  /* Elevation: none. Use --color-hairline and --color-accent-light. */
}
```

```css
body {
  background: var(--color-canvas);
  color: var(--color-ink);
  font-family: var(--font-sf-pro-text);
  font-size: var(--text-body);
  line-height: var(--leading-body);
  letter-spacing: var(--tracking-body);
  -webkit-font-smoothing: antialiased;
}

::selection {
  background: var(--color-accent-light);
  color: var(--color-ink);
}

:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
```
