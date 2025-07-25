<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
        class="bg-gradient-to-r from-primary-600 to-primary-800 min-h-[95vh] flex flex-col justify-center bg-cover bg-center pt-16 pb-12 md:pt-0 md:pb-0"
        :style="backgroundStyle"
      >
      <div class="container mx-auto px-4 flex-1 flex flex-col justify-center">
        <div class="text-center">
          <h1 class="text-3xl md:text-6xl font-bold mb-6 md:mb-8 text-palette-taupe">
            Casa del Sol
          </h1>
          <p class="text-base md:text-2xl font-bold mb-6 md:mb-6 max-w-3xl mx-auto text-palette-taupe">
            El mejor lugar para organizar tus vacaciones perfectas en la Costa del Sol. Alquila hoy mismo y disfruta de un descuento del 10% respecto a AirBnB.
          </p>
          <div class="flex justify-center space-x-4 mt-10">
            <button @click="scrollToProperties" class="btn-tertiary">
              Ver propiedades
            </button>
          </div>
        </div>
      </div>

    </section>

    <!-- Nuestros Servicios Section -->
    <section class="py-20 bg-palette-light">
      <div class="container mx-auto px-60">
        <h2 class="text-4xl font-bold text-gray-900 mb-20 text-center text-palette-taupe">Nuestros Servicios</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-24">
          <div class="bg-palette-taupe rounded-xl shadow flex flex-col items-center p-24 h-80">
            <div class="mb-10 flex items-center justify-center w-16 h-16 rounded-full ">
              <img :src="RentIcon" alt="Alquiler Vacacional" class="w-60 h-60 object-contain" />
            </div>
            <div class="text-center">
              <h3 class="text-2xl font-semibold text-palette-light">Alquiler vacacional</h3>
            </div>
          </div>
          <div class="bg-palette-taupe rounded-xl shadow flex flex-col items-center p-24 h-80">
            <div class="mb-10 flex items-center justify-center w-16 h-16 rounded-full ">
              <img :src="ManagementIcon" alt="Gestión de Propiedades" class="w-60 h-60 object-contain" />
            </div>
            <div class="text-center">
              <h3 class="text-2xl font-semibold text-palette-light">Gestión de propiedades</h3>
            </div>
          </div>
          <div class="bg-palette-taupe rounded-xl shadow flex flex-col items-center p-24 h-80">
            <div class="mb-10 flex items-center justify-center w-16 h-16 rounded-full ">
              <img :src="LocationIcon" alt="Viajes a Medida" class="w-60 h-60 object-contain" />
            </div>
            <div class="text-center">
              <h3 class="text-2xl font-semibold text-palette-light">Viajes a medida</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- All Properties Section -->
    <section class="py-16" id="propiedades">
      <div class="container mx-auto px-8">
        <div class="mb-20">
          <h2 class="text-4xl font-bold text-gray-900 text-center text-palette-taupe">Propiedades</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-4 md:px-12 lg:px-24">
          <CaseCard v-for="property in allProperties" :key="property.id" :caseData="property" />
        </div>
      </div>
    </section>

    
  </div>
</template>

<script>
import landingBg from '../assets/malaga.jpg'
import RentIcon from '../assets/renticon.png'
import ManagementIcon from '../assets/managementicon.png'
import LocationIcon from '../assets/locationicon.png'
import CaseCard from '../components/CaseCard.vue'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default {
  name: 'HomeView',
  components: { CaseCard },
  // No need to register PNGs as components
  data() {
    return {
      allProperties: [],
      RentIcon: RentIcon,
      ManagementIcon: ManagementIcon,
      LocationIcon: LocationIcon
    }
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.6), rgba(255,255,255,0.6)), url(${landingBg})`
      }
    },
  },
  async mounted() {
    await this.loadAllProperties()
  },
  methods: {
    scrollToProperties() {
      const el = document.getElementById('propiedades');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    async loadAllProperties() {
      try {
        const response = await fetch(`${API_BASE_URL}properties/`)
        this.allProperties = await response.json()
      } catch (error) {
        console.error('Error loading properties:', error)
      }
    },
    formatAmount(amount) {
      return new Intl.NumberFormat('es-ES').format(amount)
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  }
}
</script>