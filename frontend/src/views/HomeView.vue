<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
        class="w-full bg-gradient-to-r from-primary-600 to-primary-800 min-h-[95vh] flex flex-col justify-center bg-cover bg-center pt-12 pb-8 md:pt-0 md:pb-0"
        :style="backgroundStyle"
      >
      <div class="w-full px-4 md:px-8 flex-1 flex flex-col justify-center">
        <div class="text-center">
          <h1 class="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 text-palette-taupe">
            <span class="notranslate">Casa del Sol</span>
          </h1>
          <p class="text-sm md:text-lg lg:text-2xl font-bold mb-4 md:mb-6 max-w-3xl mx-auto text-palette-taupe px-2">
            El mejor lugar para organizar tus vacaciones perfectas en la Costa del Sol. Alquila hoy mismo y disfruta de un descuento del 10% respecto a otros portales.
          </p>
          <div class="flex justify-center mt-6 md:mt-10">
            <button @click="scrollToProperties" class="btn-tertiary text-sm md:text-base px-6 py-3 md:px-8 md:py-4">
              Ver propiedades
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Nuestros Servicios Section -->
    <section class="py-12 md:py-20 bg-palette-light">
      <div class="w-full px-4 md:px-8 lg:px-16">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 lg:mb-20 text-center text-palette-taupe">Nuestros Servicios</h2>
        <div class="flex flex-col space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 lg:gap-8">
          <!-- Card 1 -->
          <div class="bg-palette-taupe rounded-xl shadow flex flex-col items-center p-6 md:p-8 lg:p-12 h-auto md:h-80">
            <div class="mb-4 md:mb-6 lg:mb-10 flex items-center justify-center">
              <img :src="RentIcon" alt="Alquiler Vacacional" class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" />
            </div>
            <div class="text-center">
              <h3 class="text-lg md:text-xl lg:text-2xl font-semibold text-palette-light">Alquiler vacacional</h3>
            </div>
          </div>
          
          <!-- Card 2 -->
          <div class="bg-palette-taupe rounded-xl shadow flex flex-col items-center p-6 md:p-8 lg:p-12 h-auto md:h-80">
            <div class="mb-4 md:mb-6 lg:mb-10 flex items-center justify-center">
              <img :src="ManagementIcon" alt="Gestión de Propiedades" class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" />
            </div>
            <div class="text-center">
              <h3 class="text-lg md:text-xl lg:text-2xl font-semibold text-palette-light">Gestión de propiedades</h3>
            </div>
          </div>
          
          <!-- Card 3 -->
          <div class="bg-palette-taupe rounded-xl shadow flex flex-col items-center p-6 md:p-8 lg:p-12 h-auto md:h-80">
            <div class="mb-4 md:mb-6 lg:mb-10 flex items-center justify-center">
              <img :src="LocationIcon" alt="Viajes a Medida" class="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain" />
            </div>
            <div class="text-center">
              <h3 class="text-lg md:text-xl lg:text-2xl font-semibold text-palette-light">Viajes a medida</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Properties Carousel Section -->
    <section class="py-12 md:py-16 bg-white" id="propiedades">
      <div class="w-full px-4 md:px-8">
        <div class="mb-8 md:mb-12 lg:mb-20 text-center">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 text-palette-taupe mb-4">Propiedades Destacadas</h2>
          <p class="text-gray-600 max-w-2xl mx-auto">Explora nuestra selección exclusiva de alojamientos vacacionales.</p>
        </div>
        
        <!-- Use the new Carousel Component -->
        <PropertyCarousel :properties="featuredProperties" />
        
        <div class="text-center mt-10">
          <router-link to="/properties" class="btn-primary inline-block px-8 py-3 rounded-full shadow hover:shadow-lg transition">
            Ver todas las propiedades
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quién soy Section -->
    <section class="py-12 md:py-16 bg-palette-light">
      <div class="w-full px-4 md:px-8">
        <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 md:mb-12 lg:mb-20 text-center text-palette-taupe">¿Quién soy?</h2>
        <div class="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
          <div class="w-full md:w-1/3 flex justify-center">
            <img :src="ProfileImage" alt="Foto del propietario" class="w-64 h-64 object-cover rounded-full shadow-lg" />
          </div>
          <div class="w-full md:w-2/3">
            <div class="text-gray-600 italic text-sm md:text-base space-y-4">
              <p>¡Bienvenidos a <span class="notranslate">Casa del Sol</span>! Soy la orgullosa propietaria y fundadora de esta empresa de alquileres vacacionales, dedicada a crear estancias inolvidables para cada huésped. Con años de experiencia en la industria de la hospitalidad y una profunda pasión por los viajes, he diseñado cada propiedad para combinar comodidad, estilo y un toque del encanto local. Ya sea que estés buscando una escapada tranquila o unas vacaciones llenas de aventuras, <span class="notranslate">Casa del Sol</span> ofrece espacios cuidadosamente diseñados que se sienten como un verdadero hogar lejos de casa.</p>
              
              <p>Como Superanfitrión en Airbnb, me enorgullece brindar un servicio excepcional y experiencias personalizadas. Mi objetivo es que cada huésped se sienta bienvenido, atendido e inspirado a volver. Desde el momento en que reservas con <span class="notranslate">Casa del Sol</span> hasta el día de tu salida, estoy aquí para asegurarme de que tu estancia sea perfecta y memorable.</p>
              
              <p>Además de ser anfitrión, también ofrezco servicios de gestión de propiedades vacacionales para propietarios que desean generar ingresos sin el estrés de las operaciones diarias. Si tienes una propiedad y estás buscando un socio de confianza que se encargue de todo, desde la comunicación con los huéspedes y la limpieza hasta el marketing y el mantenimiento, me encantaría ayudarte. Convirtamos tu hogar en un destino de cinco estrellas.</p>
            </div>
          </div>
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
import ProfileImage from '../assets/pelu.jpg'
import PropertyCarousel from '../components/PropertyCarousel.vue'

import { config } from '../config.js';
const API_BASE_URL = config.API_BASE_URL;

export default {
  name: 'HomeView',
  components: { PropertyCarousel },
  data() {
    return {
      featuredProperties: [],
      RentIcon: RentIcon,
      ManagementIcon: ManagementIcon,
      LocationIcon: LocationIcon,
      ProfileImage: ProfileImage
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
    await this.loadFeaturedProperties()
  },
  methods: {
    scrollToProperties() {
      const el = document.getElementById('propiedades');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },
    async loadFeaturedProperties() {
      try {
        // Fetch only featured properties for the carousel
        const response = await fetch(`${API_BASE_URL}properties/featured/`)
        this.featuredProperties = await response.json()
      } catch (error) {
        console.error('Error loading properties:', error)
      }
    }
  }
}
</script>
