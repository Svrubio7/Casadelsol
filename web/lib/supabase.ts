import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

if (!url || !anonKey) {
  // Surfaces a clear message during dev/build if env is missing, instead of a
  // cryptic runtime error deep inside a query.
  console.warn(
    "[supabase] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set.",
  );
}

/** Public (anon) client — read-only access to property data via RLS. */
export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});
