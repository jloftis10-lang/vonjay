import { getCollection } from 'astro:content';

export async function getReleases() {
  const all = await getCollection('releases', ({ data }) => import.meta.env.DEV || !data.draft);
  return all.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export async function getServices() {
  const all = await getCollection('services', ({ data }) => !data.draft);
  return all.sort((a, b) => a.data.order - b.data.order);
}
