<template>
  <div class="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full">
    <router-link :to="`/apartments/${caseData.id}`" class="block">
      <img
        v-if="caseData.main_image"
        :src="getImageUrl(caseData.main_image)"
        :alt="caseData.title"
        class="w-full h-32 md:h-36 object-cover"
      />
      <div v-else class="w-full h-32 bg-gray-200 flex items-center justify-center text-gray-400">
        Sin imagen
      </div>
      <div class="p-3 md:p-4 flex-1 flex flex-col">
        <div v-if="caseData.habitaciones || caseData.banos" class="text-sm md:text-base text-gray-500 mb-1 md:mb-0">{{ caseData.habitaciones }} hab. / {{ caseData.banos }} baños</div>
        <div class="flex items-start justify-between mb-1">
          <h3 class="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 flex-1 mr-2">{{ caseData.title }}</h3>
          <span v-if="caseData.precio" class="text-lg md:text-xl text-primary-600 font-semibold whitespace-nowrap">€{{ formatAmount(caseData.precio) }} <span class="text-sm md:text-base font-bold">p/n</span></span>
        </div>
        <div class="text-sm md:text-lg text-gray-700 mb-2 line-clamp-2">{{ caseData.descripcion }}</div>
        <div class="text-sm md:text-base text-gray-500 mb-1">{{ caseData.location }}</div>
        <p class="text-gray-600 text-sm md:text-base mb-2 line-clamp-3">{{ caseData.discount }}</p>
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
      // Always serve from /media/ for local images
      return path.startsWith('/media/') ? path : `/media/${path.replace(/^\\|^\//, '')}`;
    },
  }
}
</script>

<style scoped>
/* Optional: make the card larger if 'large' prop is true */
:host([large]) .h-48 {
  height: 18rem;
}
</style>