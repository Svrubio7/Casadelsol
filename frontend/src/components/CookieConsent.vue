<template>
  <div
    v-if="shouldShow"
    class="fixed bottom-0 left-0 right-0 z-50 bg-white shadow-2xl border-t-2 border-palette-taupe"
    role="dialog"
    aria-labelledby="cookie-consent-title"
    aria-modal="true"
  >
    <div class="container mx-auto px-4 py-6 md:py-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <!-- Content -->
        <div class="flex-1">
          <h3 id="cookie-consent-title" class="text-lg md:text-xl font-bold text-palette-taupe mb-2">
            Uso de Cookies
          </h3>
          <p class="text-sm md:text-base text-gray-700 mb-4">
            Utilizamos cookies para mejorar su experiencia, analizar el tráfico del sitio y personalizar el contenido.
            Al hacer clic en "Aceptar todas", acepta nuestro uso de cookies. Puede gestionar sus preferencias o
            <router-link to="/cookie-policy" class="text-palette-taupe underline font-semibold hover:text-palette-yellow">
              leer nuestra política de cookies
            </router-link>.
          </p>
          
          <!-- Cookie Categories (shown when settings are open) -->
          <div v-if="showSettings" class="mt-4 space-y-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <!-- Necessary Cookies (always enabled) -->
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-2">
                  <h4 class="font-semibold text-palette-taupe">Cookies Necesarias</h4>
                  <span class="text-xs bg-palette-yellow text-white px-2 py-0.5 rounded">Siempre activas</span>
                </div>
                <p class="text-xs text-gray-600 mt-1">
                  Estas cookies son esenciales para el funcionamiento del sitio web y no se pueden desactivar.
                </p>
              </div>
            </div>
            
            <!-- Analytics Cookies -->
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="font-semibold text-palette-taupe">Cookies de Análisis</h4>
                <p class="text-xs text-gray-600 mt-1">
                  Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio web recopilando información de forma anónima.
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  v-model="localPreferences.analytics"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-palette-taupe/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-palette-taupe"></div>
              </label>
            </div>
            
            <!-- Marketing Cookies -->
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="font-semibold text-palette-taupe">Cookies de Marketing</h4>
                <p class="text-xs text-gray-600 mt-1">
                  Se utilizan para mostrar anuncios relevantes y medir la efectividad de nuestras campañas publicitarias.
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  v-model="localPreferences.marketing"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-palette-taupe/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-palette-taupe"></div>
              </label>
            </div>
            
            <!-- Functional Cookies -->
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="font-semibold text-palette-taupe">Cookies Funcionales</h4>
                <p class="text-xs text-gray-600 mt-1">
                  Permiten que el sitio web recuerde sus preferencias y proporcione características mejoradas y personalizadas.
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer ml-4">
                <input
                  type="checkbox"
                  v-model="localPreferences.functional"
                  class="sr-only peer"
                />
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-palette-taupe/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-palette-taupe"></div>
              </label>
            </div>
          </div>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-2 md:flex-col md:min-w-[200px]">
          <button
            @click="handleAcceptAll"
            class="px-6 py-3 bg-palette-taupe text-white font-semibold rounded-lg hover:bg-opacity-90 transition shadow-md"
          >
            Aceptar todas
          </button>
          <button
            v-if="!showSettings"
            @click="showSettings = true"
            class="px-6 py-3 bg-white text-palette-taupe font-semibold rounded-lg border-2 border-palette-taupe hover:bg-palette-light transition"
          >
            Personalizar
          </button>
          <div v-else class="flex flex-col gap-2">
            <button
              @click="handleSavePreferences"
              class="px-6 py-3 bg-palette-taupe text-white font-semibold rounded-lg hover:bg-opacity-90 transition shadow-md"
            >
              Guardar preferencias
            </button>
            <button
              @click="handleRejectAll"
              class="px-6 py-3 bg-white text-palette-taupe font-semibold rounded-lg border-2 border-palette-taupe hover:bg-palette-light transition"
            >
              Rechazar todas
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'
import { useCookieConsent, COOKIE_CATEGORIES, resetConsent } from '../composables/useCookieConsent.js'

export default {
  name: 'CookieConsent',
  emits: ['consent-updated'],
  setup(props, { emit, expose }) {
    const { showBanner, preferences, acceptAll, rejectAll, savePreferences } = useCookieConsent()
    
    const forceShow = ref(false)
    const showSettings = ref(false)
    
    const shouldShow = computed(() => {
      return showBanner || forceShow.value
    })
    
    const localPreferences = reactive({
      analytics: preferences.analytics || false,
      marketing: preferences.marketing || false,
      functional: preferences.functional || false,
      necessary: true // Always true
    })
    
    // Update local preferences when preferences change
    watch(() => preferences, (newPrefs) => {
      if (newPrefs) {
        localPreferences.analytics = newPrefs.analytics || false
        localPreferences.marketing = newPrefs.marketing || false
        localPreferences.functional = newPrefs.functional || false
      }
    }, { immediate: true })
    
    const handleAcceptAll = () => {
      const newPrefs = acceptAll()
      showSettings.value = false
      forceShow.value = false
      emit('consent-updated', newPrefs)
      // Reload to apply changes
      window.location.reload()
    }
    
    const handleRejectAll = () => {
      const newPrefs = rejectAll()
      showSettings.value = false
      forceShow.value = false
      emit('consent-updated', newPrefs)
      // Reload to apply changes
      window.location.reload()
    }
    
    const handleSavePreferences = () => {
      const saved = savePreferences(localPreferences)
      if (saved) {
        showSettings.value = false
        forceShow.value = false
        emit('consent-updated', localPreferences)
        // Reload to apply changes
        window.location.reload()
      }
    }
    
    // Method to show cookie settings (exposed to parent)
    const openSettings = () => {
      forceShow.value = true
      showSettings.value = true
      // Update local preferences from stored preferences
      const stored = localStorage.getItem('cookie_consent_preferences')
      if (stored) {
        try {
          const prefs = JSON.parse(stored)
          localPreferences.analytics = prefs.analytics || false
          localPreferences.marketing = prefs.marketing || false
          localPreferences.functional = prefs.functional || false
        } catch (e) {
          console.error('Error loading preferences:', e)
        }
      }
    }
    
    expose({
      openSettings
    })
    
    return {
      shouldShow,
      showSettings,
      localPreferences,
      handleAcceptAll,
      handleRejectAll,
      handleSavePreferences,
      openSettings
    }
  }
}
</script>

<style scoped>
/* Smooth transitions */
.transition {
  transition: all 0.3s ease;
}
</style>
