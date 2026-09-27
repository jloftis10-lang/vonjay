import { getCollection } from 'astro:content';

export async function getReleases() {
  const all = await getCollection('releases', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
