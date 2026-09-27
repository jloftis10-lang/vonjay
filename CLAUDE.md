# VonJay: Claude Code guide

## What this is
The artist website for **VonJay** (Jon Viberg), Smyrna, Georgia, at vonjaymusic.com.
Jon owns the songs and the site and makes the decisions. Jimmy builds and runs the site.
It is not a company or label site: no roster, no services, no production offering.

His sound, in his own words: "Chicago, a touch of Nashville melting into Atlanta."

The site's job is conversion, not discovery: turn visitors arriving from socials, clips
and links into listeners, and listeners into email subscribers. Secondary: booking and
press inquiries.

Jon's separate store, Von Jay Productions (vonjay.base44.app), sells apparel, vinyl,
books and fragrances. This site links to it from the footer and must not duplicate it.

## Stack
Astro 7 (static pages + two server routes, `/api/subscribe` and `/api/inquire`),
Tailwind v4, `@astrojs/vercel`. Supabase stores subscribers and inquiries
(`supabase/migrations/001_init.sql`, RLS on, no policies, server-only writes). Resend
sends inquiry notifications. Server secrets are declared in `astro.config.mjs` (`env.schema`)
and read at runtime from `astro:env/server`; never use `import.meta.env` for them.

Content: `src/content/releases` (one markdown file per song) and
`src/content/artists/vonjay.md` (bio, photo), schemas in `src/content.config.ts`.
Site-wide facts and socials: `src/site.config.ts`.

Pages: Home, Music, Music/[slug], About (renders the artist entry), Press, Contact, 404.

## Rule 1: audit before you change anything
At the start of every session, before writing code:
1. Read this file, `CONTENT-NOTES.md`, `README.md`, `src/content.config.ts`, `src/site.config.ts`.
2. List every open item: `grep -rn "TODO(" src`.
3. Run `npm install` and `npm run build`; report pass or fail with the actual error.
4. Summarize what exists, flag anything broken or inconsistent with this file, propose
   the plan for the current phase, and wait for Jimmy's approval.

## Rule 2: no fabrication
- Never write bios, song stories, lyrics, credits, quotes, testimonials, stats, follower
  counts, press mentions or streaming links. These come from Jon. Leave `TODO(jon)`
  markers until real content arrives.
- Never invent URLs. Only link to profiles present in `site.config.ts`; empty values stay hidden.
- Release titles, dates and SoundCloud URLs must match his actual SoundCloud.
- If a task needs content you don't have, stop and list what's missing.
- Structural/UI copy (button labels, form errors, empty states) is fine. Plain, active
  voice, sentence case.

## Design system (keep it)
- Palette (tokens in `src/styles/global.css`): midnight #161b2e, denim #34466b,
  denim-soft #8b9bbd, oxblood #6b1e28, brass #c49a4c, mist #e4e7ee. From Jon's VJ denim
  jacket (burgundy lining, silver buttons).
- Type: Big Shoulders Display for headings (drawn for the City of Chicago), Source Serif 4 for body.
- Signature element: the Chicago → Nashville → Atlanta route line (`RouteLine.astro`).
  Boldness lives there and in large release titles; everything else stays quiet.
- Avoid: all-caps labels, gradient washes, identical shadowed card grids, entrance
  animations on every section, arrows appended to links.
- Quality floor: responsive to 360px, visible keyboard focus (brass fails 3:1 on mist, so
  light sections use a midnight outline), reduced motion respected, WCAG AA contrast.

## Phases
One phase at a time. At the end of each: `npm run build`, summarize changes file by
file, stop for approval.

1. **Quality and SEO:** accessibility audit; `@astrojs/sitemap` + `robots.txt`; JSON-LD
   (`MusicGroup` on About, `MusicRecording` per release, from content files only);
   self-hosted fonts or fallback metrics; build-time OG image per release and a real
   `og-default.png`. Acceptance: Lighthouse accessibility and SEO ≥ 95 on Home and a release page.
2. **Backend live:** Supabase project + migration (no paid resources without asking);
   verify both API routes end to end; per-IP rate limiting and body-size limits;
   document Vercel env vars and Resend domain verification in `README.md`.
3. **Content intake** (only with Jon's material): featured picks, bio, photos, cover art,
   streaming links, remaining SoundCloud releases; `<Image>` for images; remove each
   `TODO(jon)` only when resolved.
4. **Launch:** domain on Vercel, canonical URLs match `site`, Vercel Analytics with
   signup/inquiry events, final link/meta/share-preview pass.

## Out of scope unless Jimmy asks
- E-commerce, cart, checkout or merch listings (that's the Von Jay Productions store)
- Company/label framing, artist rosters, production services
- User accounts, a CMS or admin dashboard, a blog or news section
- Changing the stack, palette, typefaces or signature element
- Any change to the base44 site
- Paid services or third-party scripts beyond Supabase, Resend and Vercel Analytics

## Working style
Small commits, one concern each. If this file conflicts with the repo, say so and ask.
When unsure whether something is fabrication, treat it as fabrication and ask.
