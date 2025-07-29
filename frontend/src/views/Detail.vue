
<template>
  <div v-if="propertyData" class="max-w-3xl mx-auto py-10 px-4">
    <!-- Main Image - Clickable -->
    <img
      v-if="propertyData.main_image"
      :src="propertyData.main_image"
      alt="Imagen principal"
      class="w-full h-64 object-cover rounded mb-6 cursor-pointer hover:opacity-90 transition-opacity"
      @click="openGallery(0)"
    />
    <!-- Reserva ya! Button -->
    <div class="flex justify-center mt-8 mb-4">
      <a href="https://wa.me/message/LN7BEZCQDMBWP1" target="_blank" class="btn-tertiary text-sm md:text-base px-6 py-3 md:px-8 md:py-4 inline-block text-center">
        Reserva ya!
      </a>
    </div>
    <h1 class="text-3xl font-bold mb-2 text-palette-black">{{ propertyData.title }}</h1>
    <div class="text-lg text-gray-600 mb-2">{{ propertyData.location }}</div>
    <div v-if="propertyData.long_description" class="mb-6 text-lg text-palette-black">
      <h2 class="text-xl font-semibold mb-2">Descripción completa</h2>
      <p>{{ propertyData.long_description }}</p>
    </div>
    <div class="text-gray-500 mb-2">
      <span class="font-semibold">Habitaciones:</span> {{ propertyData.habitaciones }} |
      <span class="font-semibold">Baños:</span> {{ propertyData.banos }} |
      <span class="font-semibold">Precio:</span> €{{ propertyData.precio }}
    </div>
    <div class="mb-4">
      <span v-if="propertyData.airbnb_link">
        <span class="font-semibold">AirBnB:</span>
        <a :href="propertyData.airbnb_link" target="_blank" class="text-blue-600 hover:underline">Ver en AirBnB</a>
      </span>
      <span v-if="propertyData.discount">
        <span v-if="propertyData.airbnb_link">&nbsp;| </span><span class="font-semibold">Descuento Especial:</span> {{ propertyData.discount }}
      </span>
    </div>
    
    <!-- Additional Images Section -->
    <div v-if="propertyData.additional_images && propertyData.additional_images.length > 0" class="mb-6">
      <h2 class="text-xl font-semibold mb-4">Imágenes adicionales</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
        <div 
          v-for="(image, index) in propertyData.additional_images" 
          :key="image.id" 
          class="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow touch-manipulation"
          @click="openGallery(index + 1)"
        >
          <img 
            :src="image.image" 
            :alt="image.caption || 'Imagen adicional'" 
            class="w-full h-40 sm:h-48 object-cover hover:opacity-90 transition-opacity"
          />
          <div v-if="image.caption" class="p-2 md:p-3">
            <p class="text-xs md:text-sm text-gray-700 font-medium">{{ image.caption }}</p>
          </div>
        </div>
      </div>
    </div>
    

    <!-- Image Gallery Modal -->
    <div v-if="showGallery" class="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center" @click="closeGallery">
      <!-- Close Button -->
      <button 
        @click="closeGallery" 
        class="absolute top-2 left-2 md:top-4 md:left-4 bg-black bg-opacity-50 text-white px-2 py-1 md:px-4 md:py-2 rounded-lg hover:bg-opacity-70 transition-all flex items-center space-x-1 md:space-x-2 z-10 text-sm md:text-base"
      >
        <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
        <span class="hidden sm:inline">Cerrar</span>
      </button>

      <!-- Image Counter -->
      <div class="absolute top-2 left-1/2 transform -translate-x-1/2 text-white text-sm md:text-lg font-medium z-10">
        {{ currentImageIndex + 1 }}/{{ allImages.length }}
      </div>

      <!-- Action Buttons -->
      <div class="absolute top-2 right-2 md:top-4 md:right-4 flex space-x-2 md:space-x-3 z-10">
        <button class="bg-black bg-opacity-50 text-white p-1.5 md:p-2 rounded-lg hover:bg-opacity-70 transition-all">
          <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
          </svg>
        </button>
        <button class="bg-black bg-opacity-50 text-white p-1.5 md:p-2 rounded-lg hover:bg-opacity-70 transition-all">
          <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
          </svg>
        </button>
      </div>

      <!-- Previous Button -->
      <button 
        v-if="allImages.length > 1"
        @click.stop="previousImage" 
        class="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 md:p-3 rounded-full hover:bg-opacity-70 transition-all z-10 touch-manipulation"
      >
        <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <!-- Next Button -->
      <button 
        v-if="allImages.length > 1"
        @click.stop="nextImage" 
        class="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 md:p-3 rounded-full hover:bg-opacity-70 transition-all z-10 touch-manipulation"
      >
        <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>

      <!-- Current Image -->
      <div class="relative w-full h-full flex items-center justify-center p-2 md:p-4" @click.stop>
        <img 
          :src="currentImage.src" 
          :alt="currentImage.alt" 
          class="max-w-full max-h-full object-contain"
          @touchstart="handleTouchStart"
          @touchend="handleTouchEnd"
        />
        <div v-if="currentImage.caption" class="absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4 bg-black bg-opacity-50 text-white p-2 md:p-3 rounded-lg">
          <p class="text-xs md:text-sm font-medium">{{ currentImage.caption }}</p>
        </div>
      </div>

      <!-- Mobile Swipe Indicator (only on mobile) -->
      <div v-if="allImages.length > 1" class="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-xs opacity-70 md:hidden">
        Desliza para navegar
      </div>
    </div>
  </div>
  <div v-else class="text-center py-20 text-xl text-gray-500">Cargando...</div>
</template>

<script>
import axios from 'axios'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default {
  name: "Detail",
  data() {
    return {
      propertyData: null,
      showGallery: false,
      currentImageIndex: 0,
      touchStartX: 0,
      touchStartY: 0,
      touchEndX: 0,
      touchEndY: 0,
    }
  },
  computed: {
    allImages() {
      if (!this.propertyData) return [];
      
      const images = [];
      
      // Add main image if it exists
      if (this.propertyData.main_image) {
        images.push({
          src: this.propertyData.main_image,
          alt: 'Imagen principal',
          caption: null
        });
      }
      
      // Add additional images
      if (this.propertyData.additional_images) {
        this.propertyData.additional_images.forEach(image => {
          images.push({
            src: image.image,
            alt: image.caption || 'Imagen adicional',
            caption: image.caption
          });
        });
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
      if (this.currentImageIndex < this.allImages.length - 1) {
        this.currentImageIndex++;
      } else {
        this.currentImageIndex = 0;
      }
    },
    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--;
      } else {
        this.currentImageIndex = this.allImages.length - 1;
      }
    },
    handleKeydown(event) {
      if (!this.showGallery) return;
      
      switch(event.key) {
        case 'Escape':
          this.closeGallery();
          break;
        case 'ArrowLeft':
          this.previousImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
      }
    },
    handleTouchStart(event) {
      this.touchStartX = event.changedTouches[0].screenX;
      this.touchStartY = event.changedTouches[0].screenY;
    },
    handleTouchEnd(event) {
      this.touchEndX = event.changedTouches[0].screenX;
      this.touchEndY = event.changedTouches[0].screenY;
      this.handleSwipe();
    },
    handleSwipe() {
      const swipeThreshold = 50; // Minimum distance for a swipe
      const xDiff = this.touchEndX - this.touchStartX;
      const yDiff = this.touchEndY - this.touchStartY;

      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > swipeThreshold) {
          this.nextImage();
        } else if (xDiff < -swipeThreshold) {
          this.previousImage();
        }
      }
    }
  },
  async created() {
    const id = this.$route.params.id
    try {
      const res = await axios.get(`${API_BASE_URL}properties/${id}/`)
      this.propertyData = res.data
    } catch (e) {
      this.propertyData = null
    }
  },
  mounted() {
    document.addEventListener('keydown', this.handleKeydown);
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.body.style.overflow = 'auto';
  }
}
</script>