# VonJay

Artist website for VonJay (Jon Viberg), Smyrna, Georgia. Current public URL: vonjay.vercel.app. Update the Astro `site` URL and `site.config.ts` when a custom domain is connected.

```bash
npm install
cp .env.example .env   # fill in Supabase + Resend keys
npm run dev            # http://localhost:4321
```

- **Add a song:** drop a markdown file in `src/content/releases/` (copy an existing one). It appears on Home, Music and About.
- **Bio, photos:** `src/content/artists/vonjay.md` and `public/images/`. The supplied portraits are around 500 px wide; replace with high-resolution originals when available.
- **Site facts, socials, store link:** `src/site.config.ts`.
- **Database:** run `supabase/migrations/001_init.sql` in the Supabase SQL editor.
- **Deploy:** import the repo in Vercel and add the env vars from `.env.example`.

Working with Claude Code: see `CLAUDE.md`. Open content questions: `CONTENT-NOTES.md`.
