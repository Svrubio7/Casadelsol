import { supabase } from "./supabase";
import type { Property, PropertyFilters } from "./types";

export const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

const STORAGE_BASE = `${process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""}/storage/v1/object/public/property-images`;

/**
 * Resolve a stored image path to a full URL. Images live in the Supabase
 * Storage bucket `property-images` under the same relative path the Django
 * media server used (e.g. `properties/main/x.jpg`).
 */
export function mediaUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const clean = path.replace(/^\/?media\//, "").replace(/^\/+/, "");
  return `${STORAGE_BASE}/${clean}`;
}

// Columns selected for a property, with its gallery images embedded via the FK.
const SELECT =
  "id,title,location,descripcion,long_description,precio,habitaciones,banos,capacity,main_image,latitude,longitude,airbnb_link,discount,featured," +
  "additional_images:properties_propertyimage(id,image,caption,sort_order:order)";

type RawImage = { id: number; image: string; caption: string | null; sort_order: number | null };

// supabase-js cannot fully infer the type of the embedded select string, so we
// coerce the rows to a plain shape before normalizing.
type Row = Record<string, unknown>;
const asRows = (data: unknown): Row[] => (Array.isArray(data) ? (data as Row[]) : []);

function normalize(row: Row): Property {
  const images = (row.additional_images as RawImage[] | null) ?? [];
  const additional_images = images
    .slice()
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
    .map(({ id, image, caption }) => ({ id, image, caption }));
  return { ...(row as unknown as Property), additional_images };
}

export async function getProperties(filters: PropertyFilters = {}): Promise<Property[]> {
  let query = supabase.from("properties_property").select(SELECT);
  if (filters.capacity && filters.capacity > 0) query = query.gte("capacity", filters.capacity);
  if (filters.habitaciones && filters.habitaciones > 0)
    query = query.gte("habitaciones", filters.habitaciones);
  if (filters.banos && filters.banos > 0) query = query.gte("banos", filters.banos);

  const { data, error } = await query.order("id", { ascending: true });
  if (error) {
    console.error("getProperties:", error.message);
    return [];
  }
  return asRows(data).map(normalize);
}

export async function getFeaturedProperties(): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties_property")
    .select(SELECT)
    .eq("featured", true)
    .order("id", { ascending: true });
  if (error) {
    console.error("getFeaturedProperties:", error.message);
    return [];
  }
  return asRows(data).map(normalize);
}

export async function getProperty(id: string | number): Promise<Property | null> {
  const { data, error } = await supabase
    .from("properties_property")
    .select(SELECT)
    .eq("id", id)
    .maybeSingle();
  if (error) {
    console.error("getProperty:", error.message);
    return null;
  }
  return data ? normalize(data as unknown as Row) : null;
}
