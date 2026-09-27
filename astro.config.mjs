// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // TODO(confirm): final production domain
  site: 'https://vonjaymusic.com',
  adapter: vercel(),
  vite: { plugins: [tailwindcss()] },
});
