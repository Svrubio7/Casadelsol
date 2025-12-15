<template>
  <div class="carousel-container relative w-full overflow-hidden py-10">
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

    <!-- Controls -->
    <button @click="prev" class="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:bg-white z-20">
      ←
    </button>
    <button @click="next" class="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-3 rounded-full shadow hover:bg-white z-20">
      →
    </button>
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
      autoPlayInterval: null
    }
  },
  computed: {
    // We want to show 3 items: Previous, Current (Center), Next
    visibleProperties() {
      if (!this.properties.length) return [];
      const len = this.properties.length;
      
      // Get indices for prev, current, next (wrapping around)
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
      // Index 0 = Left, 1 = Center, 2 = Right
      if (index === 1) {
        return 'scale-100 opacity-100 z-10 w-full md:w-[400px] shadow-2xl';
      } else {
        return 'scale-85 opacity-60 blur-[1px] w-full md:w-[350px] pointer-events-none';
      }
    },
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.properties.length;
      this.resetAutoPlay();
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.properties.length) % this.properties.length;
      this.resetAutoPlay();
    },
    selectProperty(index) {
        // If they click the left one (index 0), go prev
        if (index === 0) this.prev();
        // If they click the right one (index 2), go next
        if (index === 2) this.next();
    },
    startAutoPlay() {
      this.autoPlayInterval = setInterval(this.next, 4000); // Rotate every 4s
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
}
.carousel-track {
  gap: 2rem;
}
.carousel-item {
  transition: all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
