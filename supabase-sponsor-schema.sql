create table if not exists public.sponsor_listings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  sponsor_name text not null,
  email text not null,
  product_name text not null,
  product_url text not null,
  logo_url text not null,
  description text not null,
  category text not null,
  plan_type text not null check (plan_type in ('featured', 'directory')),
  status text not null default 'draft' check (
    status in ('draft', 'checkout_started', 'live', 'cancelled', 'past_due', 'expired', 'removed', 'failed')
  ),
  dodo_checkout_session_id text,
  dodo_subscription_id text,
  dodo_payment_id text,
  current_period_end timestamptz,
  raw_checkout jsonb,
  raw_webhook jsonb
);

create index if not exists sponsor_listings_status_idx on public.sponsor_listings (status);
create index if not exists sponsor_listings_plan_status_idx on public.sponsor_listings (plan_type, status);
create unique index if not exists sponsor_listings_dodo_checkout_session_id_idx
  on public.sponsor_listings (dodo_checkout_session_id)
  where dodo_checkout_session_id is not null;
create unique index if not exists sponsor_listings_dodo_subscription_id_idx
  on public.sponsor_listings (dodo_subscription_id)
  where dodo_subscription_id is not null;

create or replace function public.set_sponsor_listings_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists sponsor_listings_updated_at on public.sponsor_listings;
create trigger sponsor_listings_updated_at
before update on public.sponsor_listings
for each row
execute function public.set_sponsor_listings_updated_at();
