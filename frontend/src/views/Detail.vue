<template>
  <div v-if="propertyData" class="max-w-4xl mx-auto py-10 px-4">
    <!-- Main Image -->
    <img
      v-if="propertyData.main_image"
      :src="propertyData.main_image"
      :alt="propertyData.title"
      class="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg mb-8 cursor-pointer hover:opacity-95 transition-opacity"
      @click="openGallery(0)"
    />

    <div class="flex flex-col md:flex-row gap-8">
      <!-- Left Column: Details -->
      <div class="flex-1">
        <h1 class="text-3xl md:text-4xl font-bold mb-2 text-gray-900">{{ propertyData.title }}</h1>
        <div class="text-lg text-gray-600 mb-4 flex items-center">
             <svg class="w-5 h-5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
             {{ propertyData.location }}
        </div>
        
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
             <div class="text-center">
                 <div class="text-2xl font-bold text-gray-900">{{ propertyData.capacity }}</div>
                 <div class="text-xs text-gray-500 uppercase tracking-wide">Personas</div>
             </div>
             <div class="text-center">
                 <div class="text-2xl font-bold text-gray-900">{{ propertyData.habitaciones }}</div>
                 <div class="text-xs text-gray-500 uppercase tracking-wide">Habitaciones</div>
             </div>
             <div class="text-center">
                 <div class="text-2xl font-bold text-gray-900">{{ propertyData.banos }}</div>
                 <div class="text-xs text-gray-500 uppercase tracking-wide">Baños</div>
             </div>
              <div class="text-center">
                 <div class="text-2xl font-bold text-primary-600">€{{ propertyData.precio }}</div>
                 <div class="text-xs text-gray-500 uppercase tracking-wide">Por noche</div>
             </div>
        </div>

        <div class="prose max-w-none text-gray-700 mb-8 whitespace-pre-line">
           {{ propertyData.long_description || propertyData.descripcion }}
        </div>

        <!-- Additional Images -->
        <div v-if="propertyData.additional_images && propertyData.additional_images.length > 0" class="mb-8">
            <h3 class="text-xl font-bold mb-4">Galería de fotos</h3>
            <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div 
                  v-for="(image, index) in propertyData.additional_images" 
                  :key="image.id" 
                  class="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition"
                  @click="openGallery(index + 1)"
                >
                  <img :src="image.image" class="object-cover w-full h-full" :alt="image.caption">
                </div>
            </div>
        </div>
      </div>

      <!-- Right Column: Map & Booking -->
      <div class="w-full md:w-1/3 space-y-6">
        <!-- Booking Card -->
        <div class="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-24">
             <div class="text-2xl font-bold text-primary-600 mb-1">€{{ propertyData.precio }} <span class="text-sm font-normal text-gray-500">/ noche</span></div>
             <div class="text-green-600 text-sm font-medium mb-6">Mejor precio garantizado</div>

             <a 
                href="https://wa.me/message/LN7BEZCQDMBWP1" 
                target="_blank" 
                class="block w-full bg-green-500 text-white text-center font-bold py-3 rounded-lg hover:bg-green-600 transition mb-3 flex items-center justify-center gap-2"
             >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                WhatsApp Directo
             </a>

             <a v-if="propertyData.airbnb_link" :href="propertyData.airbnb_link" target="_blank" class="block w-full text-center text-gray-600 font-medium py-3 rounded-lg border hover:bg-gray-50 transition">
                Reservar en Airbnb
             </a>
        </div>

        <!-- Static Map -->
        <div v-if="propertyData.latitude" class="bg-gray-100 rounded-xl overflow-hidden h-64 shadow-inner relative">
            <div id="detail-map" class="w-full h-full"></div>
        </div>
      </div>
    </div>

    <!-- Gallery Modal (Same as before) -->
    <div v-if="showGallery" class="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center" @click="closeGallery">
        <button @click="closeGallery" class="absolute top-4 right-4 text-white p-2">✕</button>
        <button v-if="allImages.length > 1" @click.stop="previousImage" class="absolute left-4 top-1/2 text-white p-4 text-3xl">‹</button>
        <img :src="currentImage.src" class="max-h-[90vh] max-w-[90vw] object-contain">
        <button v-if="allImages.length > 1" @click.stop="nextImage" class="absolute right-4 top-1/2 text-white p-4 text-3xl">›</button>
        <div class="absolute bottom-4 text-white">{{ currentImageIndex + 1 }} / {{ allImages.length }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
import { useHead } from '@vueuse/head'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

export default {
  name: "Detail",
  data() {
    return {
      propertyData: null,
      showGallery: false,
      currentImageIndex: 0,
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
    },
    closeGallery() {
      this.showGallery = false;
      document.body.style.overflow = 'auto';
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.allImages.length;
    },
    previousImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.allImages.length) % this.allImages.length;
    },
    initMap() {
        if (!this.propertyData?.latitude || !MAPBOX_TOKEN) return;
        
        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
            container: 'detail-map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [this.propertyData.longitude, this.propertyData.latitude],
            zoom: 14,
            interactive: false 
        });
        
        new mapboxgl.Marker()
            .setLngLat([this.propertyData.longitude, this.propertyData.latitude])
            .addTo(map);
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const res = await axios.get(`${API_BASE_URL}properties/${id}/`)
      this.propertyData = res.data;
      
      // SEO Meta Tags
      useHead({
        title: `${this.propertyData.title} | Casa del Sol - Malaga Rentals`,
        meta: [
          { name: 'description', content: this.propertyData.descripcion.substring(0, 160) },
          { property: 'og:title', content: this.propertyData.title },
          { property: 'og:description', content: this.propertyData.descripcion.substring(0, 160) },
          { property: 'og:image', content: this.propertyData.main_image },
          { name: 'twitter:card', content: 'summary_large_image' }
        ],
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VacationRental",
              "name": this.propertyData.title,
              "description": this.propertyData.long_description,
              "image": this.propertyData.main_image,
              "priceRange": `€${this.propertyData.precio}`,
              "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Malaga",
                  "addressCountry": "ES"
              }
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
  }
}
</script>
