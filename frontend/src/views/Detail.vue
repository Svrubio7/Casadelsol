<template>
  <div v-if="propertyData" class="min-h-screen bg-gray-50">
    <!-- Mobile-first Hero Image -->
    <div class="relative">
      <img
        v-if="propertyData.main_image"
        :src="propertyData.main_image"
        :alt="propertyData.title"
        class="w-full h-56 sm:h-72 md:h-96 object-cover cursor-pointer"
        @click="openGallery(0)"
      />
      <!-- Image count badge -->
      <button 
        v-if="allImages.length > 1"
        @click="openGallery(0)"
        class="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-black/80 transition"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        Ver {{ allImages.length }} fotos
      </button>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-6 sm:py-8">
      <!-- Mobile Booking Card (Sticky at bottom on mobile) -->
      <div class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-40 md:hidden">
        <div class="flex items-center justify-between">
          <div>
            <span class="text-xs text-gray-500">Desde</span>
            <span class="text-xl font-bold text-palette-taupe ml-1">€{{ propertyData.precio }}</span>
            <span class="text-sm text-gray-500">/noche</span>
          </div>
          <a 
            href="https://wa.me/message/LN7BEZCQDMBWP1" 
            target="_blank" 
            class="bg-green-500 text-white font-bold px-6 py-3 rounded-lg flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            Reservar
          </a>
        </div>
      </div>

      <div class="flex flex-col lg:flex-row gap-6 lg:gap-8 pb-24 md:pb-0">
        <!-- Left Column: Details -->
        <div class="flex-1">
          <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 text-gray-900">{{ propertyData.title }}</h1>
          <div class="text-base sm:text-lg text-gray-600 mb-4 flex items-center">
            <svg class="w-5 h-5 mr-1 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            {{ propertyData.location }}
          </div>
          
          <!-- Stats Grid - Responsive -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div class="text-center p-2">
              <div class="text-xl sm:text-2xl font-bold text-gray-900">{{ propertyData.capacity }}</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide">Personas</div>
            </div>
            <div class="text-center p-2">
              <div class="text-xl sm:text-2xl font-bold text-gray-900">{{ propertyData.habitaciones }}</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide">Habitaciones</div>
            </div>
            <div class="text-center p-2">
              <div class="text-xl sm:text-2xl font-bold text-gray-900">{{ propertyData.banos }}</div>
              <div class="text-xs text-gray-500 uppercase tracking-wide">Baños</div>
            </div>
            <div class="text-center p-2">
              <div class="text-xs text-gray-500">Desde</div>
              <div class="text-xl sm:text-2xl font-bold text-palette-taupe">€{{ propertyData.precio }}</div>
              <div class="text-xs text-gray-500">Por noche</div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-xl p-4 sm:p-6 mb-6 shadow-sm border border-gray-100">
            <h2 class="text-lg sm:text-xl font-bold mb-3 text-gray-900">Descripción</h2>
            <div class="prose max-w-none text-gray-700 text-sm sm:text-base whitespace-pre-line">
              {{ propertyData.long_description || propertyData.descripcion }}
            </div>
          </div>

          <!-- Additional Images Gallery -->
          <div v-if="propertyData.additional_images && propertyData.additional_images.length > 0" class="mb-6">
            <h2 class="text-lg sm:text-xl font-bold mb-4 text-gray-900">Galería de fotos</h2>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              <div 
                v-for="(image, index) in propertyData.additional_images" 
                :key="image.id" 
                class="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition bg-gray-200"
                @click="openGallery(index + 1)"
              >
                <img :src="image.image" class="object-cover w-full h-full" :alt="image.caption" loading="lazy">
              </div>
            </div>
          </div>

          <!-- Map Section - Interactive and Larger -->
          <div v-if="propertyData.latitude" class="mb-6">
            <h2 class="text-lg sm:text-xl font-bold mb-4 text-gray-900">Ubicación</h2>
            <div class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
              <div id="detail-map" class="w-full h-64 sm:h-80 lg:h-96"></div>
              <div class="p-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-600 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Puedes hacer zoom y explorar el mapa
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Booking Card (Desktop) -->
        <div class="hidden md:block w-full lg:w-96">
          <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
            <div class="mb-1">
              <span class="text-sm text-gray-500">Desde</span>
            </div>
            <div class="text-3xl font-bold text-palette-taupe mb-1">€{{ propertyData.precio }} <span class="text-base font-normal text-gray-500">/ noche</span></div>
            <div class="text-green-600 text-sm font-medium mb-6 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
              Disfruta de un 10% de descuento contactándonos directamente
            </div>

            <a 
              href="https://wa.me/message/LN7BEZCQDMBWP1" 
              target="_blank" 
              class="block w-full bg-green-500 text-white text-center font-bold py-4 rounded-lg hover:bg-green-600 transition mb-3 flex items-center justify-center gap-2"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              WhatsApp Directo
            </a>

            <a v-if="propertyData.airbnb_link" :href="propertyData.airbnb_link" target="_blank" class="block w-full text-center text-gray-600 font-medium py-3 rounded-lg border hover:bg-gray-50 transition">
              Ver en Airbnb
            </a>
            
            <div class="mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500 text-center">
              Respuesta garantizada en menos de 24 horas
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Gallery Modal - Desktop & Mobile optimized -->
    <div v-if="showGallery" class="fixed inset-0 bg-black/95 z-50 flex flex-col" @click="closeGallery">
      <!-- Header -->
      <div class="flex items-center justify-between p-4 text-white z-10">
        <span class="font-medium text-lg">{{ currentImageIndex + 1 }} / {{ allImages.length }}</span>
        <button @click.stop="closeGallery" class="p-2 hover:bg-white/20 rounded-full transition">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      
      <!-- Main content with side arrows -->
      <div class="flex-1 flex items-center justify-center relative" @click.stop>
        <!-- Left Arrow (Desktop) -->
        <button 
          v-if="allImages.length > 1"
          @click.stop="previousImage" 
          class="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition z-20"
        >
          <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path></svg>
        </button>
        
        <!-- Image Container -->
        <div 
          class="max-w-[90vw] md:max-w-[70vw] lg:max-w-[60vw] max-h-[70vh] md:max-h-[75vh] flex items-center justify-center"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        >
          <img 
            :src="currentImage.src" 
            class="max-h-[70vh] md:max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl"
            :alt="`Imagen ${currentImageIndex + 1}`"
          >
        </div>
        
        <!-- Right Arrow (Desktop) -->
        <button 
          v-if="allImages.length > 1"
          @click.stop="nextImage" 
          class="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 md:p-4 rounded-full transition z-20"
        >
          <svg class="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path></svg>
        </button>
      </div>
      
      <!-- Thumbnail strip (Desktop) -->
      <div v-if="allImages.length > 1" class="hidden md:flex justify-center gap-2 p-4 overflow-x-auto">
        <button 
          v-for="(img, index) in allImages.slice(0, 10)" 
          :key="index"
          @click.stop="currentImageIndex = index"
          class="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition"
          :class="index === currentImageIndex ? 'border-white' : 'border-transparent opacity-50 hover:opacity-100'"
        >
          <img :src="img.src" class="w-full h-full object-cover" :alt="`Miniatura ${index + 1}`">
        </button>
        <span v-if="allImages.length > 10" class="flex items-center text-white/70 text-sm px-2">
          +{{ allImages.length - 10 }} más
        </span>
      </div>
      
      <!-- Dots (Mobile only) -->
      <div class="flex md:hidden justify-center gap-1.5 p-4">
        <span 
          v-for="(_, index) in Math.min(allImages.length, 10)" 
          :key="index"
          class="w-2 h-2 rounded-full transition"
          :class="index === currentImageIndex ? 'bg-white' : 'bg-white/40'"
        ></span>
        <span v-if="allImages.length > 10" class="text-white/50 text-xs ml-1">...</span>
      </div>
    </div>
  </div>
  
  <!-- Loading State -->
  <div v-else class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-palette-taupe mx-auto mb-4"></div>
      <p class="text-gray-500">Cargando...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useHead } from '@vueuse/head'
import { config } from '../config.js';

const API_BASE_URL = config.API_BASE_URL;
const MAPBOX_TOKEN = config.MAPBOX_TOKEN;

export default {
  name: "Detail",
  data() {
    return {
      propertyData: null,
      showGallery: false,
      currentImageIndex: 0,
      touchStartX: 0,
      map: null
    }
  },
  computed: {
    allImages() {
      if (!this.propertyData) return [];
      const images = [];
      if (this.propertyData.main_image) images.push({ src: this.propertyData.main_image });
      if (this.propertyData.additional_images) {
        this.propertyData.additional_images.forEach(img => images.push({ src: img.image, caption: img.caption }));
      }
      return images;
    },
    currentImage() {
      return this.allImages[this.currentImageIndex] || {};
    }
  },
  methods: {
    openGallery(index) {
      this.currentImageIndex = index;
      this.showGallery = true;
      document.body.style.overflow = 'hidden';
      // Add keyboard listener
      document.addEventListener('keydown', this.handleKeyDown);
    },
    closeGallery() {
      this.showGallery = false;
      document.body.style.overflow = 'auto';
      // Remove keyboard listener
      document.removeEventListener('keydown', this.handleKeyDown);
    },
    handleKeyDown(e) {
      if (e.key === 'ArrowRight') this.nextImage();
      else if (e.key === 'ArrowLeft') this.previousImage();
      else if (e.key === 'Escape') this.closeGallery();
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.allImages.length;
    },
    previousImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.allImages.length) % this.allImages.length;
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
    },
    handleTouchEnd(e) {
      const touchEndX = e.changedTouches[0].screenX;
      const diff = this.touchStartX - touchEndX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextImage();
        else this.previousImage();
      }
    },
    async initMap() {
      if (!this.propertyData?.latitude || !this.propertyData?.longitude) {
        console.log('No coordinates available for map');
        return;
      }
      
      if (!MAPBOX_TOKEN) {
        console.warn('Mapbox token not configured. Set VITE_MAPBOX_TOKEN environment variable.');
        return;
      }
      
      // Wait for container to be ready
      const container = document.getElementById('detail-map');
      if (!container) {
        console.warn('Map container not found, retrying...');
        setTimeout(() => this.initMap(), 200);
        return;
      }
      
      try {
        // Dynamic import for better code splitting
        const mapboxModule = await import('mapbox-gl');
        const mapboxgl = mapboxModule.default;
        
        mapboxgl.accessToken = MAPBOX_TOKEN;
        
        this.map = new mapboxgl.Map({
          container: 'detail-map',
          style: 'mapbox://styles/mapbox/streets-v12',
          center: [this.propertyData.longitude, this.propertyData.latitude],
          zoom: 14,
          interactive: true
        });
        
        // Add navigation controls
        this.map.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        // Add marker with custom color
        new mapboxgl.Marker({ color: '#0C2340' })
          .setLngLat([this.propertyData.longitude, this.propertyData.latitude])
          .addTo(this.map);
          
        // Resize map when loaded
        this.map.on('load', () => {
          this.map.resize();
        });
        
      } catch (error) {
        console.error('Failed to initialize map:', error);
      }
    }
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const res = await axios.get(`${API_BASE_URL}properties/${id}/`);
      this.propertyData = res.data;
      
      // SEO Meta Tags - Holiday focused
      useHead({
        title: `${this.propertyData.title} | Vacaciones en Málaga - Casa del Sol`,
        meta: [
          { name: 'description', content: `${this.propertyData.descripcion.substring(0, 150)}... Vacaciones en Málaga, Costa del Sol. Reserva directamente y ahorra un 10%.` },
          { property: 'og:title', content: `${this.propertyData.title} - Vacaciones en Málaga` },
          { property: 'og:description', content: this.propertyData.descripcion.substring(0, 160) },
          { property: 'og:image', content: this.propertyData.main_image },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'keywords', content: `vacaciones malaga, ${this.propertyData.location}, alquiler vacacional, costa del sol, holiday rental, beach house spain` }
        ],
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": this.propertyData.title,
              "description": this.propertyData.long_description || this.propertyData.descripcion,
              "image": this.propertyData.main_image,
              "priceRange": `Desde €${this.propertyData.precio}/noche`,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": this.propertyData.location,
                "addressRegion": "Málaga",
                "addressCountry": "ES"
              },
              "geo": this.propertyData.latitude ? {
                "@type": "GeoCoordinates",
                "latitude": this.propertyData.latitude,
                "longitude": this.propertyData.longitude
              } : undefined,
              "amenityFeature": [
                { "@type": "LocationFeatureSpecification", "name": "Habitaciones", "value": this.propertyData.habitaciones },
                { "@type": "LocationFeatureSpecification", "name": "Baños", "value": this.propertyData.banos },
                { "@type": "LocationFeatureSpecification", "name": "Capacidad", "value": this.propertyData.capacity }
              ]
            })
          }
        ]
      });

      // Init Map after render
      this.$nextTick(() => {
        this.initMap();
      });

    } catch (e) {
      console.error(e);
    }
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', this.handleKeyDown);
  }
}
</script>
