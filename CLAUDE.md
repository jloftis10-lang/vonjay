# VonJay Music — Claude Code master prompt

## What this is
The website for VonJay Music, a music production company in Smyrna, Georgia, founded by
Jon Viberg (artist name VonJay). Jon is the first artist on the roster; the site is built
so more artists, releases and services can be added as content, not code.
This is separate from Jon's existing store site, Von Jay Productions (vonjay.base44.app),
which the site links to for merch and must not duplicate.

Primary job of the site: turn a first-time visitor into a listener, and a listener into an
email subscriber. Secondary: bring in production and booking inquiries.

## Stack
Astro 7 (static pages + two server routes), Tailwind v4, Vercel adapter,
Supabase (subscribers, inquiries), Resend (inquiry notifications).
Content lives in `src/content/{releases,artists,services}` with schemas in `src/content.config.ts`.
Site-wide facts live in `src/site.config.ts`.

## Rule 1: audit before you change anything
At the start of every session, before writing code:
1. Read this file, `CONTENT-NOTES.md`, `src/content.config.ts` and `src/site.config.ts`.
2. List every `TODO(` in the repo (`grep -rn "TODO(" src`).
3. Run `npm run build` and report whether it passes.
4. Summarize what exists and what you plan to change, then wait for approval.

## Rule 2: no fabrication
- Never write bios, song stories, credits, services, quotes, stats, follower counts or
  streaming links. These come from Jon. Leave `TODO(jon)` markers in place until real content arrives.
- Never add testimonials, press logos or "as featured in" sections without a real source.
- Only link to profiles listed in `site.config.ts`. Empty values stay hidden, not guessed.
- Release titles and SoundCloud URLs must match Jon's actual SoundCloud.

## Design system (keep it)
- Palette: midnight #161b2e, denim #34466b, denim-soft #8b9bbd, oxblood #6b1e28,
  brass #c49a4c, mist #e4e7ee. Tokens are in `src/styles/global.css`.
- Type: Big Shoulders Display (headings, drawn for the City of Chicago) and Source Serif 4 (body).
- Signature element: the Chicago → Nashville → Atlanta route line (`RouteLine.astro`).
  Spend boldness there and in large release titles; keep everything else quiet.
- No all-caps labels, no gradient washes, no card-grid-with-shadows, no scattered entrance animations.

## Phases
1. **Content in:** real top 3 featured tracks, bios, photos, cover art, streaming links, services. Clean up remaining SoundCloud tracks.
2. **Backend live:** create Supabase project, run `supabase/migrations/001_init.sql`, set env vars in Vercel, verify signup and inquiry end to end, verify Resend domain.
3. **Launch:** point the domain at Vercel, replace `public/og-default.png` with a designed share image, add per-release cover images as share images, add Vercel Analytics, submit sitemap.
4. **Later (only when asked):** welcome email for subscribers, second artist roster page, Spotify/Apple embeds once distributed.

## Out of scope unless Jimmy asks
- E-commerce, cart or merch listings (that's the Von Jay Productions store)
- User accounts or logins
- A CMS or admin dashboard
- Blog/news section
- Changing the stack, the palette or the typefaces
- Any change to the existing base44 site
