-- Email list and inquiries. Only the server (service role) writes; RLS blocks the anon key entirely.
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  type text,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
alter table public.inquiries enable row level security;
-- No policies on purpose: anon/authenticated roles get no access.
