---
name: "Ama Kusi"
description: "Landing page for Fundación Ama Kusi, a Chilean foundation focused on education, culture and social transformation in the Atacama desert."
colors:
  primary: "#6DCBB3"
  primary-light: "#8FD9C4"
  primary-deep: "#336F65"
  primary-muted: "#589792"
  desert-sand: "#D4AD7E"
  desert-copper: "#C9804D"
  desert-gold: "#B37E3B"
  desert-rust: "#A04B2C"
  cream: "#F9F9EA"
  sage: "#E6ECDF"
  dark: "#352921"
  dark-light: "#4F3D33"
  secondary: "#9CB1A2"
  secondary-light: "#B7C9BB"
typography:
  display:
    fontFamily: "Sora, sans-serif"
    fontSize: "clamp(0.75rem, 2vw, 0.875rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.15em"
  heading:
    fontFamily: "Chewy, cursive"
    fontSize: "clamp(1.875rem, 5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Work Sans, sans-serif"
    fontSize: "clamp(0.875rem, 1.5vw, 1rem)"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Sora, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
    textTransform: "uppercase"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  section: "5rem"
  section-md: "7rem"
  container: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.dark}"
    rounded: "{rounded.full}"
    padding: "12px 28px"
    typography: "{typography.body}"
    fontWeight: 600
  button-primary-hover:
    backgroundColor: "{colors.primary-light}"
  button-secondary:
    backgroundColor: "{colors.dark}"
    textColor: "#ffffff"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "#ffffffcc"
    rounded: "{rounded.full}"
    padding: "12px 28px"
  card-default:
    backgroundColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "24px 24px"
    border: "1px solid rgba(53, 41, 33, 0.05)"
  card-hover:
    boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
    transform: "translateY(-2px)"
  input-default:
    backgroundColor: "rgba(255,255,255,0.05)"
    borderRadius: "{rounded.md}"
    border: "1px solid rgba(255,255,255,0.1)"
    padding: "14px 16px"
    textColor: "#ffffff"
  input-focus:
    borderColor: "{colors.primary}"
    backgroundColor: "rgba(255,255,255,0.1)"
---

# Design System: Ama Kusi

## 1. Overview

**Creative North Star: "Desert Oasis"**

Warm, grounded, and quietly vibrant. Ama Kusi's visual identity draws from the Atacama desert landscape: sunbaked earth tones meet a spring-fed teal accent that evokes unexpected life in an arid expanse. The system pairs an approachable rounded-script heading (Chewy) with a clean, reliable sans body (Work Sans), creating a voice that is friendly, trustworthy, and culturally rooted.

The design explicitly rejects cold corporate minimalism, generic "nonprofit beige", and SaaS-template aesthetics. Every section should feel handcrafted, warm, and connected to place. The desert palette (sand, copper, gold, rust) exists to be used deliberately, not as an afterthought — it anchors the brand in its territory.

**Key Characteristics:**

- Warm, earth-anchored neutrals with a teal accent that surprises
- Rounded, friendly geometry (border-radius is generous, not sharp)
- Typography that mixes playful display with grounded body
- Generous whitespace that breathes like the open desert
- Motion that reveals calmly (fade + lift), never distracts

## 2. Colors: The Atacama Palette

The palette is a Committed strategy: the teal accent (primary) carries 30-40% of interactive surfaces, while desert warm tones ground section backgrounds and accent moments. The cream background provides a sun-baked canvas.

### Primary

- **Spring Teal** (#6DCBB3): Primary accent for interactive elements, icons, highlights. Evokes the unexpected vitality of a desert oasis.
- **Teal Light** (#8FD9C4): Hover states for primary buttons and links.
- **Teal Deep** (#336F65): Section kickers, secondary text accents. Muted for body-level use.
- **Teal Muted** (#589792): Subtle decorative uses.

### Neutral

- **Cream** (#F9F9EA): Page background. Warm, not beige — a sunlit desert tone.
- **Dark Earth** (#352921): Text and dark section backgrounds. Warm brown-black, never pure gray or black.
- **Dark Earth Light** (#4F3D33): Secondary dark surfaces, hover states on dark.
- **Sage** (#E6ECDF): Alternate section background. Desert vegetation tones.

### Desert Accent

- **Desert Sand** (#D4AD7E): Warm mid-tone for decorative backgrounds, accent cards.
- **Desert Copper** (#C9804D): Strong accent for CTAs, icons, emphasis.
- **Desert Gold** (#B37E3B): Warm highlight, decorative elements.
- **Desert Rust** (#A04B2C): Bold accent for callout boxes, volunteer CTA.

### Named Rules

**The One Accent Rule.** The teal primary is concentrated on interactive elements — buttons, links, icons, highlights. It should never dominate a page section as a background color. The rarity of the teal is what makes it felt.

**The Desert Rule.** At least one desert tone (sand, copper, gold, rust) must be visibly present in every section below the fold. The brand lives in the desert; the palette must reflect that.

## 3. Typography

**Display Font:** Sora (sans-serif), for labels and section kickers
**Heading Font:** Chewy (cursive/rounded), for headlines
**Body Font:** Work Sans (sans-serif), for paragraphs and running text

**Character:** Playful but grounded. The Chewy headings bring warmth and approachability; Work Sans body keeps the content readable and trustworthy. Sora adds a structured, editorial feel to metadata and labels.

### Hierarchy

- **Display** (Sora 600, 0.75rem/0.875rem, 1.2, +0.15em tracking): Section kickers and small labels. Always uppercase.
- **Headline / H1** (Chewy 400, clamp(3rem, 7vw, 5rem), 1.05): Hero titles only. Generous scale, single line ideal.
- **Heading / H2** (Chewy 400, clamp(1.875rem, 5vw, 3rem), 1.1): Section titles. Generous and inviting.
- **Heading / H3** (Chewy 400, clamp(1.25rem, 3vw, 1.5rem), 1.2): Card titles, subsection headings.
- **Body** (Work Sans 400, clamp(0.875rem, 1.5vw, 1rem), 1.625): Paragraphs. Max line length 65-75ch.
- **Label** (Sora 600, 0.75rem, 1.2, +0.05em tracking): Metadata, small UI labels.

## 4. Elevation

Flat-by-default. Depth is conveyed through tonal layering (cream bg → white card → dark border/10) rather than shadows. The system has no shadow vocabulary at rest; the flatness keeps the interface grounded and honest, like the desert landscape.

Cards use a subtle `1px` border at `rgba(53,41,33,0.05)` for separation. On hover, cards lift with a gentle shadow (`0 4px 24px rgba(0,0,0,0.08)`) and a `-2px` vertical translate — the only elevated state in the system.

### Named Rules

**The Flat-By-Default Rule.** Surfaces are flat at rest. Elevation (shadow + lift) appears only on interactive hover states. Never use shadows decoratively.

## 5. Components

### Buttons

- **Shape:** Fully rounded (pill-style, 9999px radius)
- **Primary:** Teal (`#6DCBB3`) background, dark text. Hover: lighter teal (`#8FD9C4`)
- **Secondary:** Dark earth (`#352921`) background, white text. Used for CTAs on light backgrounds
- **Ghost:** Transparent, white text at 80% opacity. Used on dark hero backgrounds
- **Desert:** Sand (`#D4AD7E`) background, dark text. Seasonal/alternate CTA
- **States:** Hover lifts +2px with shadow; active presses down; disabled at 40% opacity
- **Sizes:** sm (px-5 py-2), md (px-7 py-3), lg (px-9 py-3.5)

### Cards

- **Shape:** Rounded corners (12px), 1px subtle border, flat at rest
- **Background:** White surface
- **Internal Padding:** 24px on all sides (p-6 md:p-8 for featured cards)
- **Border:** `1px solid rgba(53,41,33,0.05)`
- **Hover:** Optional lift (shadow + -translateY)
- **Rule:** Cards are containers for distinct, actionable content blocks. Never nest cards. Never use identical card grids (icon + title + text) across multiple sections.

### Inputs / Fields

- **Style:** Border on dark background (`1px solid rgba(255,255,255,0.1)`, 12px radius), subtle background tint
- **Focus:** Teal border, slightly brighter background
- **Placeholder:** White at 20% opacity
- **Error:** Red border (`border-red-400`), error message below in red
- **Labels:** Sora uppercase, white at 50% opacity

### Navigation

- **Desktop:** Inline links in header, transparent at rest, full-color on active section
- **Mobile:** Slide-down drawer with full-width buttons
- **Scroll behavior:** Background gains opacity/blur on scroll past hero
- **Smooth scroll:** All anchor links scroll smoothly; respects reduced motion

## 6. Do's and Don'ts

### Do:

- **Do** use desert warm tones (sand, copper, rust) as section backgrounds and accents — the brand lives in the Atacama desert
- **Do** use the teal primary sparingly: buttons, links, icons. Its rarity is its power
- **Do** keep spacing generous — sections need room to breathe like the desert landscape
- **Do** use Chewy for headlines and Work Sans for body consistently — switching breaks trust
- **Do** alternate section backgrounds (cream → sage → cream → dark) for visual rhythm
- **Do** respect `prefers-reduced-motion` — all animations must degrade gracefully
- **Do** reveal content on scroll (fade + gentle lift) for a calm, unhurried experience

### Don't:

- **Don't** use pure black (`#000`) or pure white (`#fff`) — tint all neutrals toward the desert warm hue
- **Don't** use side-stripe borders (`border-left > 1px` as accent) on cards or callouts — use full background tints instead
- **Don't** use the hero-metric template (big number + small label + gradient accent) — express impact narratively
- **Don't** use identical card grids with icon + heading + text repeated across sections — vary the affordance per content type
- **Don't** use the same uppercase tracked section kicker on every section — vary or omit them deliberately
- **Don't** use gradient text (`background-clip: text`) — use a single solid color
- **Don't** center everything — left-aligned asymmetries feel more designed
- **Don't** use bounce or elastic easing — use ease-out-expo for natural deceleration
