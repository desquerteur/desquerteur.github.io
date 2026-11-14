# style.md – desquerteur.com design system

Every visual decision of the site lives here. The CSS tokens in `src/styles/global.css`
mirror this file one to one – change both together.

## Idea

**Discord meets galaxy.** The layout borrows Discord's language – a server rail with round
icons on the left, a channel header with `#` names, profile popout, embed cards with a
coloured left border – and puts it on a deep-space background with purple and turquoise
nebulae and a slowly drifting starfield.

## Colours

| Token | Value | Use |
|---|---|---|
| `--bg` | `#05030b` | page background (deep space black) |
| `--bg-2` | `#0b0817` | rail and header background |
| `--surface` | `#120d24` | cards, embeds, panels |
| `--surface-2` | `#1a1333` | hover state of surfaces, inputs |
| `--border` | `rgba(167, 139, 250, 0.16)` | 1px hairlines |
| `--text` | `#f3f0ff` | main text |
| `--muted` | `#a7a0c9` | secondary text (contrast ≥ 4.5:1 on `--surface`) |
| `--faint` | `#6f6893` | labels, separators |
| `--purple` | `#8b5cf6` | primary brand colour |
| `--purple-hi` | `#a78bfa` | links, highlights |
| `--blurple` | `#5865f2` | Discord blurple, buttons |
| `--teal` | `#2ee6d6` | accent (turquoise), online dot, focus ring |
| `--pink` | `#d946ef` | rare third accent in gradients |
| `--gradient` | `linear-gradient(120deg, #a78bfa, #5865f2 45%, #2ee6d6)` | headline text, banners |

Each project also has its own accent `color` (in `src/data/projects.ts`) for its rail icon
and embed border.

Status colours: active `#2ee6d6`, released `#22c55e`, in progress `#f59e0b`,
experiment `#d946ef`, archived `#6f6893`.

## Background

- Base `--bg`, two nebulae: purple `rgba(139,92,246,.35)` top left, turquoise
  `rgba(46,230,214,.18)` bottom right, a faint pink `rgba(217,70,239,.12)` in the middle –
  all as large blurred radial gradients, fixed to the viewport.
- Three star layers (small/medium/large) generated at build time with a seeded random
  (`src/components/Starfield.astro`), drifting upward at 180 s / 260 s / 340 s per loop.
- `prefers-reduced-motion: reduce` stops every animation.

## Typography

| Role | Font | Size / weight |
|---|---|---|
| Headlines | Space Grotesk Variable | h1 `clamp(2.6rem, 6vw, 4.6rem)` / 700, letter-spacing `-0.03em` |
| Section titles | Space Grotesk Variable | `1.6rem` / 650 |
| Body | Inter Variable | `1rem` / 400, line-height 1.65 |
| Small / labels | Inter Variable | `0.78rem` / 600, uppercase, letter-spacing `0.08em` |
| Code, channel names, stack chips | JetBrains Mono Variable | `0.85rem` |

All fonts are self-hosted through Fontsource (SIL OFL), no Google requests.

## Spacing and shape

- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 72, 112 px (`--s-1` … `--s-9`).
- Radius: chips 6px, cards 12px, panels 16px, rail icons 50% → 16px on hover/active
  (Discord's circle-to-squircle morph).
- Content width: max 1120px. Rail width: 76px (desktop), horizontal bar on phones (< 760px).
- Shadows: `0 20px 60px -20px rgba(88, 101, 242, .45)` for lifted cards, glow
  `0 0 24px rgba(46,230,214,.35)` for focus and the online dot.

## Components

- **Server rail** – home icon (the `d` monogram), separator, one round icon per project with
  its two-letter mark and accent colour; white pill on the left shows the current page, a
  tooltip shows the name. Phones: sticky horizontal bar.
- **Channel header** – `#` + channel name, a short topic after a divider, links on the right.
- **Profile card** – banner gradient, avatar orb with turquoise online dot, name, handle,
  badges, "About me" and "Member since" like a Discord user popout.
- **Embed card** – `--surface` with a 4px left border in the project colour, title link,
  text, fields (Stack, Status) and an optional thumbnail.
- **Buttons** – primary: `--blurple` background, white text, 8px radius; secondary:
  transparent with `--border`.
- **Chips** – mono font, `--surface-2`, 6px radius.

## Images and video

- Screenshots come from the project repositories (real captures), shown in a 16:10 grid with
  12px radius and lazy loading.
- Videos: MP4 H.264, poster image, `controls`, `preload="none"`, muted autoplay only for the
  short site loops.
- Video design (`video/`): same palette, Space Grotesk titles, starfield background,
  1920×1080 at 30 fps for tours, 1080×1920 for shorts.

## Motion

- Hover: 160 ms ease for colour, 220 ms cubic-bezier(.2,.8,.2,1) for transforms.
- Cards lift by 3px on hover; rail icons morph circle → squircle.
- Section reveal: fade + 12px rise, once, via IntersectionObserver.
