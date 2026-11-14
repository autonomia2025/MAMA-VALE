-- Tabla de solicitudes de cotización de Maquinarias JVK.
-- Pégalo completo en Supabase → SQL Editor → Run.

create table if not exists public.solicitudes (
  id            uuid primary key default gen_random_uuid(),
  numero        bigint generated always as identity,
  created_at    timestamptz not null default now(),

  nombre        text not null,
  empresa       text,
  rut           text,
  email         text not null,
  telefono      text,
  tipo          text,
  mensaje       text,
  productos     jsonb not null default '[]'::jsonb,

  consentimiento boolean not null,
  estado        text not null default 'nueva'
                check (estado in ('nueva', 'contactada', 'cotizada', 'cerrada', 'descartada')),
  notas         text,

  origen        text,
  user_agent    text
);

create index if not exists solicitudes_created_at_idx on public.solicitudes (created_at desc);
create index if not exists solicitudes_estado_idx on public.solicitudes (estado);

-- Seguridad: se activa RLS y NO se crean políticas públicas.
-- Nadie puede leer ni escribir desde el navegador con la clave pública.
-- Solo la función del servidor (clave service_role) puede insertar, y tú las ves
-- desde el panel de Supabase (Table Editor).
alter table public.solicitudes enable row level security;

-- Permisos explícitos para la función del servidor. Necesario si al crear el
-- proyecto dejaste desmarcado "Automatically expose new tables" (recomendado).
-- Solo service_role (la clave secreta) puede insertar y leer; anon no recibe nada.
grant usage on schema public to service_role;
grant select, insert on table public.solicitudes to service_role;
grant usage, select on all sequences in schema public to service_role;
