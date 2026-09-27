import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const url = z.string().url();
const optionalUrl = z.union([url, z.literal('')]).optional();

const releases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/releases' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    artist: reference('artists'),
    soundcloudUrl: url,
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.string().optional(), // path under /public, e.g. /covers/song-unsung.jpg
    streaming: z
      .object({ spotify: optionalUrl, appleMusic: optionalUrl, youtube: optionalUrl })
      .default({}),
    credits: z.array(z.object({ role: z.string(), name: z.string() })).default([]),
  }),
});

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: z.object({
    name: z.string(),
    realName: z.string().optional(),
    hometown: z.string().optional(),
    photo: z.string().optional(),
    short: z.string(),
  }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(true),
  }),
});

export const collections = { releases, artists, services };
