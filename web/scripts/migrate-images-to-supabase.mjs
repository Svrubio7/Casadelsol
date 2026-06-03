/**
 * One-off migration: copy property images from the Django/Render media server
 * into the Supabase Storage bucket `property-images`, preserving the same
 * relative paths (e.g. `properties/main/x.jpg`).
 *
 * Idempotent (upsert). Re-running only re-uploads/overwrites.
 *
 * Run from web/:
 *   $env:SUPABASE_URL="https://<ref>.supabase.co"
 *   $env:SUPABASE_KEY="<anon-or-service-role-key>"
 *   $env:MEDIA_BASE="https://casadelsolholidays.es/media"   # optional, this is the default
 *   node scripts/migrate-images-to-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;
const MEDIA_BASE = (process.env.MEDIA_BASE || "https://casadelsolholidays.es/media").replace(/\/+$/, "");
const BUCKET = "property-images";

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_KEY env vars.");
  process.exit(1);
}

const sb = createClient(SUPABASE_URL, SUPABASE_KEY, { auth: { persistSession: false } });

function contentTypeFor(path) {
  const ext = path.split(".").pop().toLowerCase();
  return { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", gif: "image/gif" }[ext] || "application/octet-stream";
}

async function collectPaths() {
  const set = new Set();
  const { data: props, error: e1 } = await sb.from("properties_property").select("main_image");
  if (e1) throw new Error(`read properties_property: ${e1.message}`);
  for (const p of props) if (p.main_image) set.add(p.main_image.replace(/^\/?media\//, "").replace(/^\/+/, ""));
  const { data: imgs, error: e2 } = await sb.from("properties_propertyimage").select("image");
  if (e2) throw new Error(`read properties_propertyimage: ${e2.message}`);
  for (const i of imgs) if (i.image) set.add(i.image.replace(/^\/?media\//, "").replace(/^\/+/, ""));
  return [...set].sort();
}

const paths = await collectPaths();
console.log(`Found ${paths.length} unique image paths. Migrating to bucket "${BUCKET}"...`);

let ok = 0, fail = 0;
const failures = [];
for (const path of paths) {
  try {
    const res = await fetch(`${MEDIA_BASE}/${path}`);
    if (!res.ok) {
      fail++; failures.push(`${res.status} ${path}`); continue;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const { error } = await sb.storage
      .from(BUCKET)
      .upload(path, buf, { contentType: contentTypeFor(path), upsert: true });
    if (error) { fail++; failures.push(`upload ${path}: ${error.message}`); continue; }
    ok++;
    if (ok % 20 === 0) console.log(`  ...${ok}/${paths.length}`);
  } catch (e) {
    fail++; failures.push(`${path}: ${e.message}`);
  }
}

console.log(`\nDone. uploaded=${ok}  failed=${fail}`);
if (failures.length) {
  console.log("Failures:");
  for (const f of failures) console.log("  - " + f);
  process.exit(1);
}
