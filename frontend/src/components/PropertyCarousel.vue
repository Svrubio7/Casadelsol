<template>
  <div 
    class="carousel-container relative w-full overflow-hidden py-6 sm:py-10"
    @touchstart="handleTouchStart"
    @touchend="handleTouchEnd"
  >
    <div 
      class="carousel-track flex items-center justify-center transition-transform duration-700 ease-out"
      :style="{ transform: `translateX(0)` }"
    >
      <div 
        v-for="(prop, index) in visibleProperties" 
        :key="prop.id"
        class="carousel-item transition-all duration-700 transform"
        :class="getItemClass(index)"
        @click="selectProperty(index)"
      >
        <CaseCard :caseData="prop" />
      </div>
    </div>

    <!-- Navigation Controls - Larger with translucent background -->
    <button 
      @click="prev" 
      class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg z-20 transition-all active:scale-95"
      aria-label="Anterior"
    >
      <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
      </svg>
    </button>
    <button 
      @click="next" 
      class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-3 sm:p-4 rounded-full shadow-lg z-20 transition-all active:scale-95"
      aria-label="Siguiente"
    >
      <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>

    <!-- Dots indicator for mobile -->
    <div class="flex justify-center gap-2 mt-4 sm:hidden">
      <button 
        v-for="(_, index) in properties" 
        :key="index"
        @click="goToSlide(index)"
        class="w-2 h-2 rounded-full transition-all"
        :class="index === currentIndex ? 'bg-palette-taupe w-4' : 'bg-gray-300'"
        :aria-label="`Ir a propiedad ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script>
import CaseCard from './CaseCard.vue';

export default {
  name: 'PropertyCarousel',
  components: { CaseCard },
  props: {
    properties: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      currentIndex: 0,
      autoPlayInterval: null,
      touchStartX: 0,
      touchStartY: 0,
      isSwiping: false
    }
  },
  computed: {
    visibleProperties() {
      if (!this.properties.length) return [];
      const len = this.properties.length;
      const prevIndex = (this.currentIndex - 1 + len) % len;
      const nextIndex = (this.currentIndex + 1) % len;
      
      return [
        this.properties[prevIndex],
        this.properties[this.currentIndex],
        this.properties[nextIndex]
      ];
    }
  },
  mounted() {
    this.startAutoPlay();
  },
  beforeUnmount() {
    this.stopAutoPlay();
  },
  methods: {
    getItemClass(index) {
      if (index === 1) {
        return 'scale-100 opacity-100 z-10 w-[85%] sm:w-[80%] md:w-[400px] shadow-2xl';
      } else {
        return 'scale-75 sm:scale-85 opacity-40 sm:opacity-60 blur-[1px] w-[60%] sm:w-[70%] md:w-[350px] pointer-events-none hidden sm:block';
      }
    },
    handleTouchStart(e) {
      this.touchStartX = e.changedTouches[0].screenX;
      this.touchStartY = e.changedTouches[0].screenY;
      this.isSwiping = true;
      this.stopAutoPlay();
    },
    handleTouchEnd(e) {
      if (!this.isSwiping) return;
      
      const touchEndX = e.changedTouches[0].screenX;
      const touchEndY = e.changedTouches[0].screenY;
      const diffX = this.touchStartX - touchEndX;
      const diffY = this.touchStartY - touchEndY;
      
      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
      
      this.isSwiping = false;
      this.startAutoPlay();
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.properties.length;
      this.resetAutoPlay();
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.properties.length) % this.properties.length;
      this.resetAutoPlay();
    },
    goToSlide(index) {
      this.currentIndex = index;
      this.resetAutoPlay();
    },
    selectProperty(index) {
      if (index === 0) this.prev();
      if (index === 2) this.next();
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(this.next, 5000);
    },
    stopAutoPlay() {
      clearInterval(this.autoPlayInterval);
    },
    resetAutoPlay() {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }
}
</script>

<style scoped>
.carousel-container {
  perspective: 1000px;
  touch-action: pan-y pinch-zoom;
}
.carousel-track {
  gap: 0.5rem;
}
@media (min-width: 640px) {
  .carousel-track {
    gap: 2rem;
  }
}
.carousel-item {
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
