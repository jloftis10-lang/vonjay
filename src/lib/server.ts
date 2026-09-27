import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export function supabaseAdmin() {
  const url = import.meta.env.SUPABASE_URL;
  const key = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Supabase env vars missing');
  return createClient(url, key, { auth: { persistSession: false } });
}

export function resend() {
  const key = import.meta.env.RESEND_API_KEY;
  return key ? new Resend(key) : null;
}

export const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export const isEmail = (v: unknown): v is string =>
  typeof v === 'string' && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
