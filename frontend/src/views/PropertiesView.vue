<template>
  <div class="min-h-screen flex flex-col pt-16 font-sans bg-palette-light">
    <!-- Header with View Toggle -->
    <div class="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <h1 class="text-xl font-bold text-palette-taupe">Propiedades</h1>
      
      <!-- View Toggle -->
      <div class="flex items-center bg-gray-100 rounded-lg p-1">
        <button 
          @click="viewMode = 'list'"
          :class="viewMode === 'list' ? 'bg-white shadow text-palette-taupe' : 'text-gray-500 hover:text-gray-700'"
          class="px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path></svg>
          Lista
        </button>
        <button 
          @click="viewMode = 'map'"
          :class="viewMode === 'map' ? 'bg-white shadow text-palette-taupe' : 'text-gray-500 hover:text-gray-700'"
          class="px-4 py-2 rounded-md text-sm font-medium transition flex items-center gap-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
          Mapa
        </button>
      </div>
    </div>

    <div class="flex flex-1 overflow-hidden relative">
      <!-- Filters Sidebar -->
      <div 
        class="w-full md:w-80 bg-white border-r border-gray-200 z-20 overflow-y-auto absolute md:relative h-full transition-transform transform shadow-xl md:shadow-none"
        :class="showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'"
      >
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-palette-taupe">Filtros</h2>
            <button @click="showFilters = false" class="md:hidden text-gray-500 hover:text-palette-taupe">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <!-- Filter Form -->
          <div class="space-y-6">
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

        <!-- Property Count -->
        <div class="border-t border-gray-200 p-4 bg-gray-50">
          <div class="text-sm font-medium text-gray-500 uppercase tracking-wider">
            {{ properties.length }} propiedades encontradas
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="flex-1 relative overflow-hidden">
        
        <!-- LIST VIEW -->
        <div v-if="viewMode === 'list'" class="h-full overflow-y-auto p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <router-link
              v-for="prop in properties" 
              :key="prop.id"
              :to="`/apartments/${prop.id}`"
              class="bg-white rounded-xl shadow-sm hover:shadow-lg cursor-pointer transition overflow-hidden border border-transparent hover:border-palette-beige group"
            >
              <img :src="getImageUrl(prop.main_image)" class="w-full h-48 object-cover group-hover:scale-105 transition duration-300" :alt="prop.title">
              <div class="p-4">
                <h3 class="font-bold text-palette-taupe text-lg mb-1">{{ prop.title }}</h3>
                <div class="text-sm text-gray-500 mb-2 flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                  {{ prop.location }}
                </div>
                <div class="flex items-center text-sm text-gray-600 gap-3 mb-3">
                  <span><strong>{{ prop.habitaciones }}</strong> hab</span>
                  <span><strong>{{ prop.banos }}</strong> baños</span>
                  <span><strong>{{ prop.capacity }}</strong> pers</span>
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="text-xs text-gray-500">Desde</span>
                  <span class="font-bold text-palette-taupe text-xl">€{{ prop.precio }}</span>
                  <span class="text-xs text-gray-500">/noche</span>
                </div>
              </div>
            </router-link>
          </div>
          
          <div v-if="properties.length === 0" class="text-center py-20 text-gray-500">
            No hay propiedades que coincidan con tu búsqueda.
          </div>
        </div>

        <!-- MAP VIEW -->
        <div v-else class="h-full flex">
          <!-- Property List Sidebar in Map View -->
          <div class="hidden lg:block w-80 bg-white border-r overflow-y-auto">
            <div class="p-4 space-y-3">
              <div 
                v-for="prop in properties" 
                :key="prop.id" 
                class="bg-white rounded-lg shadow-sm hover:shadow-md cursor-pointer transition p-3 flex gap-3 border border-transparent hover:border-palette-beige"
                @mouseenter="highlightMarker(prop.id)"
                @mouseleave="unhighlightMarker(prop.id)"
                @click="flyToProperty(prop)"
              >
                <img :src="getImageUrl(prop.main_image)" class="w-20 h-20 object-cover rounded-md flex-shrink-0 bg-gray-200">
                <div class="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 class="font-bold text-palette-taupe line-clamp-1 text-sm">{{ prop.title }}</h3>
                    <div class="text-xs text-gray-500 mb-1">{{ prop.location }}</div>
                  </div>
                  <div><span class="text-xs text-gray-500">Desde </span><span class="font-bold text-palette-taupe">€{{ prop.precio }}</span> <span class="text-xs font-normal text-gray-500">/noche</span></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Map Container -->
          <div class="flex-1 relative bg-gray-100">
            <div v-if="!mapboxToken" class="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div class="text-center p-8">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path></svg>
                <p class="text-gray-500">Mapa no disponible</p>
                <p class="text-sm text-gray-400">Usa la vista de lista para ver las propiedades</p>
              </div>
            </div>
            <div v-else id="map" class="w-full h-full"></div>
          </div>
        </div>
        
        <!-- Mobile Toggle Button -->
        <button 
          @click="showFilters = !showFilters"
          class="absolute top-4 left-4 md:hidden bg-palette-taupe text-white px-4 py-3 rounded-full shadow-lg z-10 font-medium flex items-center gap-2"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          Filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
      viewMode: 'list', // 'list' or 'map'
      mapInitialized: false,
      mapboxToken: MAPBOX_TOKEN,
      filters: {
        capacity: 1,
        habitaciones: 0,
        banos: 0
      }
    }
  },
  watch: {
    // Lazy load map only when user switches to map view
    viewMode(newMode) {
      if (newMode === 'map' && !this.mapInitialized && MAPBOX_TOKEN) {
        this.$nextTick(() => {
          this.initMap();
        });
      }
    }
  },
  async mounted() {
    await this.fetchProperties();
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
        
        // Update markers if map is already initialized
        if (this.mapInitialized) {
          this.updateMapMarkers();
        }
      } catch (e) {
        console.error("Error fetching properties", e);
      }
    },
    async initMap() {
      if (!MAPBOX_TOKEN || this.mapInitialized) return;
      
      // Dynamically import mapbox-gl for better code splitting
      const mapboxgl = (await import('mapbox-gl')).default;
      await import('mapbox-gl/dist/mapbox-gl.css');
      
      mapboxgl.accessToken = MAPBOX_TOKEN;
      
      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-4.4214, 36.7212], // Malaga
        zoom: 12
      });

      this.map.on('load', () => {
        this.mapInitialized = true;
        this.updateMapMarkers();
        this.map.resize();
      });
      
      // Store mapboxgl reference for creating markers
      this.mapboxgl = mapboxgl;
    },
    updateMapMarkers() {
      if (!this.map || !this.mapboxgl) return;

      // Remove existing markers
      Object.values(this.markers).forEach(marker => marker.remove());
      this.markers = {};

      this.properties.forEach(prop => {
        if (!prop.latitude || !prop.longitude) return;

        const el = document.createElement('div');
        el.className = 'marker bg-white text-palette-taupe font-bold text-sm px-3 py-1 rounded-full shadow-md border border-gray-200 hover:scale-110 transition cursor-pointer hover:bg-palette-taupe hover:text-white';
        el.innerHTML = `Desde €${prop.precio}`;
        
        const popup = new this.mapboxgl.Popup({ offset: 25, closeButton: false })
          .setHTML(`
            <div class="text-sm p-1">
              <div class="font-bold text-gray-900 mb-1">${prop.title}</div>
              <div class="text-gray-500 text-xs mb-2">${prop.location}</div>
              <a href="/apartments/${prop.id}" class="block w-full text-center bg-palette-taupe text-white text-xs py-1 rounded hover:opacity-90 transition">Ver propiedad</a>
            </div>
          `);

        const marker = new this.mapboxgl.Marker({ element: el })
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
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', system-ui, sans-serif;
}
</style>
