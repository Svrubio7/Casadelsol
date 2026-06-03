# Admin Dashboard — Adding Properties (Next + Supabase)

The Django admin was removed; this is the plan to recreate property management
directly in the Next app, writing to the same Supabase tables and Storage bucket
the public site already reads.

## What the public site reads (recap)

- Tables: `properties_property` (one row per property) and
  `properties_propertyimage` (gallery images, FK `property_id`, ordered by `order`).
- Images: Supabase Storage bucket **`property-images`** (public), paths
  `properties/main/<file>` (cover) and `properties/extra/<file>` (gallery).
- Read access is open via RLS SELECT policies. **There are no write policies yet** —
  writes must go through a trusted server context (service-role key) or new RLS
  policies scoped to an authenticated admin.

## Recommended architecture

A single protected route `app/admin/` with:

1. **Auth gate** — Supabase Auth (email magic-link), allowing only Belén's email.
2. **Server Actions** that run on the server with the **service-role key** (never
   exposed to the browser) to insert rows and upload images. This avoids opening
   write RLS to the public anon key.

```
web/
  app/admin/
    layout.tsx        # auth gate (redirect if not the allowed email)
    page.tsx          # list properties + "New property" button
    new/page.tsx      # create form (client) -> calls the server action
    actions.ts        # "use server" — createProperty(), deleteProperty()
  lib/supabase-admin.ts  # service-role client (server-only)
```

### 1. Env (server-only — do NOT prefix with NEXT_PUBLIC)

Add to `web/.env.local` (and the host's env):

```
SUPABASE_SERVICE_ROLE_KEY=<service_role secret from Supabase → Settings → API>
ADMIN_EMAIL=belen@example.com
```

### 2. Server-only Supabase client (`lib/supabase-admin.ts`)

```ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!, // bypasses RLS — server only
  { auth: { persistSession: false } },
);
```

### 3. Auth gate (`app/admin/layout.tsx`)

Use Supabase Auth (`@supabase/ssr`) to read the session in a server component and
`redirect("/")` (or to a login page) unless `user.email === process.env.ADMIN_EMAIL`.
Install `@supabase/ssr` and follow its Next App Router cookie pattern. A magic-link
login page at `app/admin/login/page.tsx` calls
`supabase.auth.signInWithOtp({ email })`.

### 4. Create-property Server Action (`app/admin/actions.ts`)

```ts
"use server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { revalidatePath } from "next/cache";

export async function createProperty(form: FormData) {
  // 1. Insert the property row (columns match properties_property).
  const { data: prop, error } = await supabaseAdmin
    .from("properties_property")
    .insert({
      title: form.get("title"),
      location: form.get("location"),
      descripcion: form.get("descripcion"),
      long_description: form.get("long_description") || "",
      precio: Number(form.get("precio")),
      habitaciones: Number(form.get("habitaciones")),
      banos: Number(form.get("banos")),
      capacity: Number(form.get("capacity")),
      latitude: form.get("latitude") ? Number(form.get("latitude")) : null,
      longitude: form.get("longitude") ? Number(form.get("longitude")) : null,
      airbnb_link: form.get("airbnb_link") || "",
      discount: form.get("discount") || "",
      featured: form.get("featured") === "on",
      main_image: "", // set after upload
    })
    .select("id")
    .single();
  if (error) throw error;

  // 2. Upload cover image to properties/main/<id>/<filename>, then save the path.
  const cover = form.get("main_image") as File | null;
  if (cover && cover.size) {
    const path = `properties/main/${prop.id}/${cover.name}`;
    await supabaseAdmin.storage.from("property-images").upload(path, cover, {
      contentType: cover.type,
      upsert: true,
    });
    await supabaseAdmin.from("properties_property").update({ main_image: path }).eq("id", prop.id);
  }

  // 3. Upload gallery files to properties/extra/<id>/... and insert image rows.
  const gallery = form.getAll("gallery") as File[];
  for (let i = 0; i < gallery.length; i++) {
    const file = gallery[i];
    if (!file?.size) continue;
    const path = `properties/extra/${prop.id}/${file.name}`;
    await supabaseAdmin.storage.from("property-images").upload(path, file, {
      contentType: file.type,
      upsert: true,
    });
    await supabaseAdmin.from("properties_propertyimage").insert({
      property_id: prop.id,
      image: path,
      caption: "",
      order: i,
    });
  }

  revalidatePath("/properties");
  revalidatePath("/");
}
```

The public site already resolves these paths via `mediaUrl()`
(`<SUPABASE_URL>/storage/v1/object/public/property-images/<path>`), and
`next/image` serves them optimized — so newly added properties appear with no
further work.

### 5. The form (`app/admin/new/page.tsx`, client component)

A plain `<form action={createProperty}>` with inputs named exactly as above:
`title, location, descripcion, long_description, precio, habitaciones, banos,
capacity, latitude, longitude, airbnb_link, discount, featured`, plus
`<input type="file" name="main_image">` and
`<input type="file" name="gallery" multiple>`. Reuse the site tokens
(navy/cream/coral, `font-display`) so it matches the brand.

## Build order (checklist)

1. `npm i @supabase/ssr` and add `SUPABASE_SERVICE_ROLE_KEY` + `ADMIN_EMAIL` env.
2. `lib/supabase-admin.ts` (service-role client).
3. Magic-link login + `app/admin/layout.tsx` auth gate.
4. `app/admin/actions.ts` (`createProperty`, plus `deleteProperty`, `toggleFeatured`).
5. `app/admin/new/page.tsx` form + `app/admin/page.tsx` list.
6. (Optional) image compression before upload (e.g. `browser-image-compression`)
   so originals aren't multi-MB; `next/image` already optimizes delivery.

## Security notes

- The **service-role key is server-only** — never import `supabase-admin.ts` in a
  client component or prefix the key with `NEXT_PUBLIC`.
- Keep write access off the anon key; all writes go through the authenticated
  admin Server Actions.
- `/admin` should be `Disallow`ed in `app/robots.ts` if it becomes a real route.
