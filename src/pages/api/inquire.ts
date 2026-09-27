import type { APIRoute } from 'astro';
import { RESEND_FROM, INQUIRY_TO } from 'astro:env/server';
import { supabaseAdmin, resend, json, isEmail, clean } from '../../lib/server';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  if (body.company) return json({ ok: true }); // honeypot

  const inquiry = {
    type: clean(body.type, 60),
    name: clean(body.name, 120),
    email: clean(body.email, 254).toLowerCase(),
    message: clean(body.message, 5000),
  };
  if (!inquiry.name || !inquiry.message || !isEmail(inquiry.email)) return json({ error: 'invalid' }, 400);

  try {
    const { error } = await supabaseAdmin().from('inquiries').insert(inquiry);
    if (error) throw error;
  } catch (err) {
    console.error('inquiry save failed', err);
    return json({ error: 'server_error' }, 500);
  }

  // Notification is best-effort: the inquiry is already saved.
  const to = INQUIRY_TO;
  const client = resend();
  if (client && to && RESEND_FROM) {
    await client.emails
      .send({
        from: RESEND_FROM,
        to,
        replyTo: inquiry.email,
        subject: `[VonJay Music] ${inquiry.type}: ${inquiry.name}`,
        text: `${inquiry.name} <${inquiry.email}>\n${inquiry.type}\n\n${inquiry.message}`,
      })
      .catch((err) => console.error('inquiry email failed', err));
  }
  return json({ ok: true });
};
