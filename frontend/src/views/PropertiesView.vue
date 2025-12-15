<template>
  <div class="h-screen flex flex-col pt-16 font-sans">
    <div class="flex flex-1 overflow-hidden relative">
      <!-- Filters Sidebar (Mobile: Modal / Desktop: Sidebar) -->
      <div 
        class="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 z-20 overflow-y-auto absolute md:relative h-full transition-transform transform shadow-xl md:shadow-none"
        :class="showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-palette-taupe">Filtros</h2>
            <button @click="showFilters = false" class="md:hidden text-gray-500 hover:text-palette-taupe">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Filter Form -->
          <div class="space-y-8">
            <!-- Capacity -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Huéspedes</label>
              <div class="flex items-center space-x-4">
                <button @click="updateFilter('capacity', -1)" class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-palette-light hover:border-palette-beige transition text-palette-taupe text-xl">-</button>
                <span class="text-xl w-6 text-center font-bold text-palette-taupe">{{ filters.capacity }}</span>
                <button @click="updateFilter('capacity', 1)" class="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-palette-light hover:border-palette-beige transition text-palette-taupe text-xl">+</button>
              </div>
            </div>

            <!-- Rooms -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Habitaciones (mín)</label>
              <input 
                type="range" 
                min="0" 
                max="5" 
                v-model.number="filters.habitaciones" 
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-palette-taupe"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-2">
                <span>Cualquiera</span>
                <span class="font-bold text-palette-taupe">{{ filters.habitaciones }}+ hab.</span>
              </div>
            </div>

             <!-- Bathrooms -->
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-3">Baños (mín)</label>
               <input 
                type="range" 
                min="0" 
                max="3" 
                v-model.number="filters.banos" 
                class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-palette-taupe"
              >
              <div class="flex justify-between text-xs text-gray-500 mt-2">
                <span>Cualquiera</span>
                <span class="font-bold text-palette-taupe">{{ filters.banos }}+ baños</span>
              </div>
            </div>

            <div class="pt-4 space-y-3">
                <button 
                  @click="applyFilters"
                  class="w-full bg-palette-taupe text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition shadow-md"
                >
                  Aplicar Filtros
                </button>
                 <button 
                  @click="resetFilters"
                  class="w-full text-gray-500 py-2 text-sm hover:text-palette-taupe transition underline"
                >
                  Restablecer búsqueda
                </button>
            </div>
          </div>
        </div>

        <!-- Property List (Sidebar) -->
        <div class="border-t border-gray-200 bg-palette-light">
          <div class="p-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
            {{ properties.length }} propiedades encontradas
          </div>
          <div class="px-4 pb-20 space-y-4 overflow-y-auto max-h-[calc(100vh-500px)]">
            <div 
                v-for="prop in properties" 
                :key="prop.id" 
                class="bg-white rounded-xl shadow-sm hover:shadow-md cursor-pointer transition p-3 flex gap-4 border border-transparent hover:border-palette-beige"
                @mouseenter="highlightMarker(prop.id)"
                @mouseleave="unhighlightMarker(prop.id)"
                @click="flyToProperty(prop)"
            >
                <img :src="getImageUrl(prop.main_image)" class="w-28 h-28 object-cover rounded-lg flex-shrink-0 bg-gray-200">
                <div class="flex-1 flex flex-col justify-between py-1">
                    <div>
                        <h3 class="font-bold text-palette-taupe line-clamp-1 text-lg">{{ prop.title }}</h3>
                        <div class="text-xs text-gray-500 mb-2 flex items-center">
                             <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            {{ prop.location }}
                        </div>
                        <div class="flex items-center text-xs text-gray-600 gap-3">
                            <span class="flex items-center"><span class="font-bold mr-1">{{ prop.habitaciones }}</span> hab</span>
                            <span class="flex items-center"><span class="font-bold mr-1">{{ prop.banos }}</span> baños</span>
                            <span class="flex items-center"><span class="font-bold mr-1">{{ prop.capacity }}</span> pers</span>
                        </div>
                    </div>
                    <div class="font-bold text-palette-taupe text-lg text-right">€{{ prop.precio }} <span class="text-xs font-normal text-gray-500">/noche</span></div>
                </div>
            </div>
             <div v-if="properties.length === 0" class="text-center py-10 text-gray-500">
                No hay propiedades que coincidan con tu búsqueda.
             </div>
          </div>
        </div>
      </div>

      <!-- Map Container -->
      <div class="flex-1 relative bg-gray-100">
        <div id="map" class="w-full h-full"></div>
        
        <!-- Mobile Toggle Button -->
        <button 
          @click="showFilters = !showFilters"
          class="absolute top-4 left-4 md:hidden bg-palette-taupe text-white px-4 py-3 rounded-full shadow-lg z-10 font-medium flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          {{ showFilters ? 'Ver Mapa' : 'Filtros' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default {
  name: 'PropertiesView',
  data() {
    return {
      map: null,
      markers: {},
      properties: [],
      showFilters: false,
      filters: {
        capacity: 2,
        habitaciones: 0,
        banos: 0
      }
    }
  },
  async mounted() {
    await this.fetchProperties();
    this.initMap();
  },
  methods: {
    async fetchProperties() {
      try {
        const params = new URLSearchParams();
        if (this.filters.capacity > 0) params.append('capacity', this.filters.capacity);
        if (this.filters.habitaciones > 0) params.append('habitaciones', this.filters.habitaciones);
        if (this.filters.banos > 0) params.append('banos', this.filters.banos);

        const res = await fetch(`${API_BASE_URL}properties/?${params.toString()}`);
        this.properties = await res.json();
        this.updateMapMarkers();
      } catch (e) {
        console.error("Error fetching properties", e);
      }
    },
    initMap() {
      if (!MAPBOX_TOKEN) {
        console.warn("Mapbox Token missing!");
        return;
      }
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11', // Cleaner, more elegant map style
        center: [-4.4214, 36.7212], // Default Malaga center
        zoom: 12
      });

      this.map.on('load', () => {
        this.updateMapMarkers();
        this.map.resize(); // Ensure proper sizing
      });
    },
    updateMapMarkers() {
      if (!this.map) return;

      // Remove existing markers
      Object.values(this.markers).forEach(marker => marker.remove());
      this.markers = {};

      this.properties.forEach(prop => {
        if (!prop.latitude || !prop.longitude) return;

        // Create marker DOM element - Elegant price pill
        const el = document.createElement('div');
        el.className = 'marker bg-white text-palette-taupe font-bold text-sm px-3 py-1 rounded-full shadow-md border border-gray-200 hover:scale-110 transition cursor-pointer hover:bg-palette-taupe hover:text-white hover:border-transparent';
        el.innerHTML = `€${prop.precio}`;
        
        // Custom Popup
        const popup = new mapboxgl.Popup({ offset: 25, closeButton: false })
            .setHTML(`
                <div class="text-sm p-1">
                    <div class="font-bold text-gray-900 mb-1">${prop.title}</div>
                    <div class="text-gray-500 text-xs mb-2">${prop.location}</div>
                    <a href="/apartments/${prop.id}" class="block w-full text-center bg-palette-taupe text-white text-xs py-1 rounded hover:opacity-90 transition">Ver propiedad</a>
                </div>
            `);

        const marker = new mapboxgl.Marker({ element: el })
            .setLngLat([prop.longitude, prop.latitude])
            .setPopup(popup)
            .addTo(this.map);
            
        this.markers[prop.id] = marker;
      });
    },
    updateFilter(key, delta) {
        if (key === 'capacity') {
            this.filters.capacity = Math.max(1, this.filters.capacity + delta);
        }
    },
    applyFilters() {
        this.fetchProperties();
        // On mobile, close sidebar after applying
        if (window.innerWidth < 768) this.showFilters = false;
    },
    resetFilters() {
        this.filters = { capacity: 1, habitaciones: 0, banos: 0 };
        this.fetchProperties();
    },
    highlightMarker(id) {
        if (this.markers[id]) {
            const el = this.markers[id].getElement();
            el.classList.add('bg-palette-taupe', 'text-white', 'scale-110');
            el.classList.remove('bg-white', 'text-palette-taupe');
            el.style.zIndex = 10;
        }
    },
    unhighlightMarker(id) {
         if (this.markers[id]) {
            const el = this.markers[id].getElement();
            el.classList.remove('bg-palette-taupe', 'text-white', 'scale-110');
            el.classList.add('bg-white', 'text-palette-taupe');
            el.style.zIndex = 1;
        }
    },
    flyToProperty(prop) {
         if (prop.latitude && prop.longitude && this.map) {
             this.map.flyTo({
                 center: [prop.longitude, prop.latitude],
                 zoom: 15,
                 essential: true
             });
             // Open popup
             if (this.markers[prop.id]) this.markers[prop.id].togglePopup();
         }
    },
    getImageUrl(path) {
      if (!path) return '';
      if (path.startsWith('http')) return path;
      return path.startsWith('/media/') ? path : `/media/${path.replace(/^\\|^\//, '')}`;
    },
  }
}
</script>

<style>
.mapboxgl-popup-content {
    border-radius: 12px;
    padding: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    font-family: 'Inter', system-ui, sans-serif;
}
.mapboxgl-popup-tip {
    border-top-color: white;
}
</style>
