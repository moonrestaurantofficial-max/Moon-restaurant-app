# Supabase Reviews Setup

Create this table in Supabase SQL editor:

```sql
create extension if not exists pgcrypto;

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  -- Named `email` for historical reasons; the review form actually collects
  -- and stores a phone number in this column.
  email text,
  rating integer not null check (rating between 1 and 5),
  branch text not null check (branch in ('Naran', 'Besar')),
  comment text not null,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

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

Add these environment variables to `.env.local` (and to your hosting
provider's env settings):

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

The app also supports the older `NEXT_PUBLIC_SUPABASE_ANON_KEY` name as a
fallback, but Supabase's current dashboard may show a publishable key
instead.

Both variables are prefixed `NEXT_PUBLIC_` because the Supabase client runs
in the browser — reads/writes go straight from the page to Supabase's REST
API over HTTPS, with row-level security policies enforcing what anonymous
users can read and insert. There is no server-side API route for reviews.

Without these variables set, the reviews page falls back to local preview
mode (sample reviews plus any submitted during the session, not persisted).
