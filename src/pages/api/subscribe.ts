import type { APIRoute } from 'astro';
import { supabaseAdmin, json, isEmail } from '../../lib/server';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  if (body.company) return json({ ok: true }); // honeypot
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (!isEmail(email)) return json({ error: 'invalid_email' }, 400);

  try {
    const { error } = await supabaseAdmin()
      .from('subscribers')
      .upsert({ email, source: 'site' }, { onConflict: 'email', ignoreDuplicates: true });
    if (error) throw error;
  } catch (err) {
    console.error('subscribe failed', err);
    return json({ error: 'server_error' }, 500);
  }
  return json({ ok: true });
};
