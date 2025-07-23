<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <section
        class="bg-gradient-to-r from-primary-600 to-primary-800 text-white min-h-[95vh] flex flex-col justify-center bg-cover bg-center pt-16 pb-12 md:pt-0 md:pb-0"
        :style="backgroundStyle"
      >
      <div class="container mx-auto px-4 flex-1 flex flex-col justify-center">
        <div class="text-center">
          <h1 class="text-3xl md:text-5xl font-bold mb-6 md:mb-8">
            Transparencia en el Uso del Dinero Público
          </h1>
          <p class="text-base md:text-xl mb-6 md:mb-6 max-w-3xl mx-auto">
            Información clara sobre cómo las instituciones públicas españolas gestionan y emplean los fondos públicos. Promovemos la transparencia y la responsabilidad en el gasto público.
          </p>
          <div class="flex justify-center space-x-4 mt-6">
            <router-link to="/app" class="btn-secondary">
              Ver Propiedades
            </router-link>
            
          </div>
        </div>
      </div>

    </section>

    <!-- Nuestros Servicios Section -->
    <section class="py-12 bg-white/80">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-gray-900 mb-10 text-center">Nuestros Servicios</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-palette-beige rounded-xl shadow flex flex-col items-center p-8">
            <div class="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-palette-taupe/20">
              <!-- Icon placeholder -->
              <span class="text-3xl text-palette-taupe">🏠</span>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-semibold mb-2">Gestión Integral de Alquileres</h3>
              <p class="text-gray-700 text-sm">Nos encargamos de todo el proceso de alquiler para que no tengas que preocuparte por nada.</p>
            </div>
          </div>
          <div class="bg-palette-beige rounded-xl shadow flex flex-col items-center p-8">
            <div class="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-palette-taupe/20">
              <!-- Icon placeholder -->
              <span class="text-3xl text-palette-taupe">🧹</span>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-semibold mb-2">Limpieza y Mantenimiento</h3>
              <p class="text-gray-700 text-sm">Ofrecemos servicios de limpieza profesional y mantenimiento para mantener tu propiedad impecable.</p>
            </div>
          </div>
          <div class="bg-palette-beige rounded-xl shadow flex flex-col items-center p-8">
            <div class="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-palette-taupe/20">
              <!-- Icon placeholder -->
              <span class="text-3xl text-palette-taupe">📸</span>
            </div>
            <div class="text-center">
              <h3 class="text-xl font-semibold mb-2">Fotografía Profesional</h3>
              <p class="text-gray-700 text-sm">Realzamos tu propiedad con fotografías de alta calidad para atraer a más inquilinos.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Cases Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Propiedades Destacadas</h2>
          <router-link to="/apartments" class="text-primary-600 hover:text-primary-700 font-medium">
            Ver todas →
          </router-link>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="property in featuredProperties.slice(0, 3)" :key="property.id" class="case-card">
            <div class="aspect-w-16 aspect-h-9 bg-gray-200">
              <img 
                v-if="property.main_image" 
                :src="property.main_image" 
                :alt="property.descripcion"
                class="w-full h-48 object-cover"
              />
              <div v-else class="w-full h-48 bg-gray-300 flex items-center justify-center">
                <span class="text-gray-500">Sin imagen</span>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-gray-500">{{ property.habitaciones }} hab. / {{ property.banos }} baños</span>
                <span class="text-sm font-semibold text-primary-600">€{{ formatAmount(property.precio) }}</span>
              </div>
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ property.descripcion }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ property.discount }}</p>
              <div class="flex items-center justify-between">
                <router-link 
                  :to="{ name: 'property-detail', params: { id: property.id } }"
                  class="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  Ver detalles →
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Donation Section -->
    <section class="py-20">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto bg-white/70 rounded-xl shadow-lg p-10 md:p-12 flex flex-col items-center">
          <h2 class="text-3xl font-bold text-gray-900 mb-8 text-center">¿Quién soy?</h2>
          <div class="text-gray-700 text-base md:text-lg font-serif italic text-center space-y-4 mb-10">
            <p>Hola,</p>
            <p>Me llamo Sergio, tengo 21 años y soy estudiante de programación e inteligencia artificial.</p>
            <p>Antes de nada, quiero dejar claro que esto no va en contra de ningún partido concreto, sino de los políticos en general. Por eso animo a todo el mundo a enviarme cualquier publicación o información sobre cómo se está gastando nuestro dinero de manera cuestionable.</p>
            <p>Me entristece mucho la polarización que vivimos en España y esa tendencia a justificar todo lo que hace “nuestro” partido. Por eso he creado este proyecto: para intentar educar y concienciar a todos sobre cómo se utiliza realmente el dinero público, sin importar colores.</p>
            <p>Me inspiré en el trabajo de Pablo Cambronero (@PabloCamPiq en X) y decidí que yo también quería aportar mi granito de arena.</p>
            <p>Mantener este proyecto me cuesta tiempo y también algo de dinero, que como estudiante supone un esfuerzo importante para mí. Por eso, si quieres apoyarme, te agradecería muchísimo cualquier donación a través del botón de abajo. </p>
            <p>Muchísimas gracias a todos por estar aquí y, por favor, no dudéis en enviarme cualquier información sobre el mal uso del dinero público por parte de TODOS los partidos. Estoy en X (@0xmiskinho).</p>
            <p>Un saludo sincero,</p>
            <p>Sergio</p>
          </div>
          <div class="flex justify-center">
            <form action="https://www.paypal.com/donate" method="post" target="_top">
              <input type="hidden" name="hosted_button_id" value="SDCASEHGVRLGJ" />
              <input type="image" src="https://www.paypalobjects.com/es_ES/ES/i/btn/btn_donate_SM.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Botón Donar con PayPal" class="h-14 w-auto scale-125" />
              <img alt="" border="0" src="https://www.paypal.com/es_ES/i/scr/pixel.gif" width="1" height="1" />
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import landingBg from '../assets/malaga.jpg'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default {
  name: 'HomeView',
  data() {
    return {
      stats: {
        totalProperties: 0,
        totalAmount: 0,
        featuredCount: 0,
      },
      featuredProperties: []
    }
  },
  computed: {
    backgroundStyle() {
      return {
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.50), rgba(0, 0, 0, 0.50)), url(${landingBg})`
      }
    },
  },
  async mounted() {
    await this.loadStatistics()
    await this.loadFeaturedProperties()
  },
  methods: {
    async loadStatistics() {
      try {
        const response = await fetch(`${API_BASE_URL}properties/statistics/`)
        const data = await response.json()
        this.stats = {
          totalProperties: data.total_properties,
          totalAmount: data.total_amount,
          featuredCount: data.featured_count,
        }
      } catch (error) {
        console.error('Error loading statistics:', error)
      }
    },
    async loadFeaturedProperties() {
      try {
        const response = await fetch(`${API_BASE_URL}properties/featured/`)
        this.featuredProperties = await response.json()
      } catch (error) {
        console.error('Error loading featured properties:', error)
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