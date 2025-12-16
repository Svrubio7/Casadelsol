<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
    <router-link :to="`/apartments/${caseData.id}`" class="block">
      <img
        v-if="caseData.main_image"
        :src="getImageUrl(caseData.main_image)"
        :alt="caseData.title"
        loading="lazy"
        width="400"
        height="250"
        class="w-full h-40 sm:h-44 md:h-48 object-cover"
      />
      <div v-else class="w-full h-40 sm:h-44 md:h-48 bg-gray-200 flex items-center justify-center text-gray-400">
        Sin imagen
      </div>
      <div class="p-3 sm:p-4 flex-1 flex flex-col">
        <!-- Stats row -->
        <div class="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 mb-2 gap-1 sm:gap-2">
          <span class="flex items-center">
            <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            {{ caseData.habitaciones }} hab.
          </span>
          <span>•</span>
          <span>{{ caseData.banos }} baños</span>
          <span v-if="caseData.capacity">•</span>
          <span v-if="caseData.capacity" class="font-medium text-palette-taupe">{{ caseData.capacity }} pers.</span>
        </div>
        
        <!-- Title and Price -->
        <div class="flex items-start justify-between mb-2 gap-2">
          <h3 class="text-base sm:text-lg md:text-xl font-bold text-gray-900 flex-1 line-clamp-2">{{ caseData.title }}</h3>
        </div>
        
        <!-- Location -->
        <div class="flex items-center text-xs sm:text-sm text-gray-500 mb-2">
          <svg class="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
          <span class="truncate">{{ caseData.location }}</span>
        </div>
        
        <!-- Description (hidden on mobile) -->
        <p class="hidden sm:block text-sm text-gray-600 mb-3 line-clamp-2">{{ caseData.descripcion }}</p>
        
        <!-- Price -->
        <div class="mt-auto pt-2 border-t border-gray-100">
          <div class="flex items-baseline justify-between">
            <div>
              <span class="text-xs text-gray-500">Desde</span>
              <span class="text-lg sm:text-xl font-bold text-palette-taupe ml-1">€{{ formatAmount(caseData.precio) }}</span>
              <span class="text-xs sm:text-sm text-gray-500">/noche</span>
            </div>
            <span v-if="caseData.discount" class="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Oferta</span>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'CaseCard',
  props: {
    caseData: { type: Object, required: true },
    large: { type: Boolean, default: false }
  },
  methods: {
    formatAmount(amount) {
      return new Intl.NumberFormat('es-ES').format(amount)
    },
    getImageUrl(path) {
      if (!path) return '';
      if (path.startsWith('http')) return path;
      return path.startsWith('/media/') ? path : `/media/${path.replace(/^\\|^\//, '')}`;
    },
  }
}
</script>
