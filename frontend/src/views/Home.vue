<template>
  <div class="min-h-screen bg-gray-50">
    

    <!-- Hero Card -->
    <!-- Hero Card -->
    <section class="flex justify-center pt-8">
      <div class="relative w-full max-w-5xl rounded-2xl shadow-lg overflow-hidden">
        <img :src="heroImg" alt="Hero" class="w-full h-[350px] md:h-[450px] object-cover" />
        <div class="absolute inset-0 bg-black/40"></div>
        <div class="absolute inset-0 flex flex-col justify-end p-8 z-10">
          <router-link to="/category" class="mb-4 inline-block bg-primary-600 text-white px-4 py-2 rounded font-semibold shadow hover:bg-primary-700 transition"></router-link>
          <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4 drop-shadow">Nuestras Propiedades</h1>
          <p class="text-lg md:text-2xl text-white/90 max-w-2xl mb-6 drop-shadow">
            Reserva ahora contactando con nosotros y llévate un descuento del 10%.
          </p>
        <div>
            <router-link to="/app" class="bg-white text-primary-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-primary-50 transition">Ver Todas</router-link>
          </div>
                        </div>
                        </div>
    </section>

    <!-- Popular -->
    <section class="container mx-auto px-4 pt-16">
      <h2 class="text-2xl md:text-3xl font-bold pb-4">Populares</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CaseCard v-for="property in popularProperties" :key="property.id" :caseData="property" large />
      </div>
    </section>

    <!-- Todos los Apartamentos + Search -->
    <section class="container mx-auto px-4 pt-16 pb-24">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <h2 class="text-2xl md:text-3xl font-bold">Todos los Apartamentos</h2>
        <input v-model="searchQuery" type="text" placeholder="Buscar apartamentos..." class="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <CaseCard v-for="property in filteredProperties" :key="property.id" :caseData="property" />
      </div>
      <div v-if="hasMore" class="flex justify-center mt-8">
        <button @click="loadMore" class="px-6 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">Cargar más</button>
      </div>
    </section>
  </div>
</template>

<script>
import CaseCard from '@/components/CaseCard.vue'
import heroImg from '@/assets/casabien.jpg'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default {
  name: 'Home',
  components: { CaseCard },
  data() {
    return {
      heroImg,
      allProperties: [],
      recentProperties: [],
      popularProperties: [],
      searchQuery: '',
      page: 1,
      pageSize: 9,
      hasMore: true,
    }
  },
  computed: {
    heroStyle() {
      return {
        background: 'black',
      }
    },
    filteredProperties() {
      if (!this.searchQuery) return this.allProperties
      const q = this.searchQuery.toLowerCase()
      return this.allProperties.filter(p =>
        p.descripcion.toLowerCase().includes(q) ||
        (p.discount && p.discount.toLowerCase().includes(q))
      )
    },
  },
  async mounted() {
    await this.fetchProperties()
  },
  methods: {
    async fetchProperties() {
      // Fetch all properties (paginated)
      const res = await fetch(`${API_BASE_URL}properties/?ordering=-id&page=${this.page}&page_size=${this.pageSize}`)
      const data = await res.json()
      if (data.results) {
        this.allProperties = [...this.allProperties, ...data.results]
        this.hasMore = !!data.next
      } else {
        this.allProperties = [...this.allProperties, ...data]
        this.hasMore = false
      }
      // Recent: 6 most recent
      this.recentProperties = this.allProperties.slice(0, 6)
      // Popular: 3 with highest price
      this.popularProperties = [...this.allProperties]
        .sort((a, b) => (b.precio || 0) - (a.precio || 0))
        .slice(0, 3)
    },
    loadMore() {
      this.page += 1
      this.fetchProperties()
    },
  },
}
</script>