# VonJay Music

Website for VonJay Music, a production company in Smyrna, Georgia.

```bash
npm install
cp .env.example .env   # fill in Supabase + Resend keys
npm run dev            # http://localhost:4321
```

- **Add a song:** drop a markdown file in `src/content/releases/` (copy an existing one). It appears on Home, Music and the artist page.
- **Add a service:** edit `src/content/services/`, set `draft: false`.
- **Site facts, socials, store link:** `src/site.config.ts`.
- **Database:** run `supabase/migrations/001_init.sql` in the Supabase SQL editor.
- **Deploy:** import the repo in Vercel and add the env vars from `.env.example`.

Working with Claude Code: see `CLAUDE.md`. Open content questions: `CONTENT-NOTES.md`.
