export interface PropertyImage {
  id: number;
  image: string;
  caption?: string | null;
}

export interface Property {
  id: number;
  title: string;
  location: string;
  descripcion: string;
  long_description?: string | null;
  precio: number;
  habitaciones: number;
  banos: number;
  capacity: number;
  main_image: string | null;
  additional_images?: PropertyImage[];
  latitude?: number | null;
  longitude?: number | null;
  airbnb_link?: string | null;
  discount?: string | null;
  featured?: boolean;
}

export interface PropertyFilters {
  capacity?: number;
  habitaciones?: number;
  banos?: number;
}
