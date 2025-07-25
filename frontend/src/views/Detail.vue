
<template>
  <div v-if="propertyData" class="max-w-3xl mx-auto py-10 px-4">
    <img
      v-if="propertyData.main_image"
      :src="propertyData.main_image"
      alt="Imagen principal"
      class="w-full h-64 object-cover rounded mb-6"
    />
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
        &nbsp;| <span class="font-semibold">Descuento Especial:</span> {{ propertyData.discount }}
      </span>
      <!-- Removed duplicate descripcion here -->
    </div>
    <div v-if="propertyData.imagenes" class="mb-6">
      <h2 class="text-xl font-semibold mb-2">Imágenes adicionales</h2>
      <img :src="propertyData.imagenes" alt="Imágenes adicionales" class="w-full rounded" />
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
}
</script>