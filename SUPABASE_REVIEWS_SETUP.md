# Supabase Reviews Setup

Create this table in Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text,
  rating integer not null check (rating between 1 and 5),
  branch text not null check (branch in ('Naran', 'Besar')),
  comment text not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.reviews drop column if exists avatar;

alter table public.reviews enable row level security;

create policy "Public can read published reviews"
on public.reviews
for select
to anon
using (is_published = true);

create policy "Public can publish reviews"
on public.reviews
for insert
to anon
with check (
  is_published = true
  and rating between 1 and 5
  and branch in ('Naran', 'Besar')
);

notify pgrst, 'reload schema';
```

Add these environment variables:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The app also supports the older `NEXT_PUBLIC_SUPABASE_ANON_KEY` name as a fallback, but Supabase's current dashboard may show a publishable key instead.
