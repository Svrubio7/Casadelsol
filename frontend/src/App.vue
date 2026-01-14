<script>
import CookieConsent from './components/CookieConsent.vue'

export default {
  name: "App",
  components: {
    CookieConsent
  },
  methods: {
    handleConsentUpdated(preferences) {
      // Dispatch event to trigger Google Analytics loading
      window.dispatchEvent(new CustomEvent('cookie-consent-updated', { detail: preferences }))
      
      // Load Google Analytics if analytics consent was given
      if (preferences && preferences.analytics === true && typeof window.gtag === 'undefined') {
        this.loadGoogleAnalytics()
      }
    },
    showCookieSettings() {
      // Open cookie settings dialog
      if (this.$refs.cookieConsent && this.$refs.cookieConsent.openSettings) {
        this.$refs.cookieConsent.openSettings()
      }
    },
    loadGoogleAnalytics() {
      // Check if already loaded
      if (document.querySelector('script[src*="googletagmanager"]')) {
        return
      }
      
      const script1 = document.createElement('script')
      script1.async = true
      script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-LRJJ0QZ6X8'
      document.head.appendChild(script1)
      
      window.dataLayer = window.dataLayer || []
      function gtag(){window.dataLayer.push(arguments)}
      gtag('js', new Date())
      gtag('config', 'G-LRJJ0QZ6X8')
      window.gtag = gtag
    }
  },
  mounted() {
    // Check if user already consented to analytics and load GA
    const consentPreferences = localStorage.getItem('cookie_consent_preferences')
    if (consentPreferences) {
      try {
        const prefs = JSON.parse(consentPreferences)
        if (prefs.analytics === true) {
          this.loadGoogleAnalytics()
        }
      } catch (e) {
        console.error('Error checking consent:', e)
      }
    }
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-palette-light text-palette-black">
    <!-- Navbar -->
    <nav class="bg-white/50 shadow-sm border-b border-gray-200 fixed w-full z-30 h-12 md:h-16 backdrop-blur">
      <div class="container mx-auto px-4 py-0 flex justify-between items-center h-full">
        <!-- Logo and text - same for mobile and desktop -->
        <div class="flex-1 flex items-center">
          <router-link to="/" class="flex items-center space-x-2 md:space-x-3">
            <img src="/paglogodark.jpg" alt="Casa del Sol Logo" class="h-6 w-auto max-h-8 md:h-8 md:max-h-10" />
            <span class="text-sm md:text-xl font-bold text-palette-taupe"><span class="notranslate">CASA DEL SOL</span></span>
          </router-link>
        </div>
        
        <!-- Contact link - same for mobile and desktop -->
        <div class="flex-1 flex justify-end space-x-4 md:space-x-6 font-bold text-palette-yellow">
          <a href="https://wa.me/message/LN7BEZCQDMBWP1" target="_blank" class="text-sm md:text-base hover:text-palette-taupe font-bold">Contáctanos</a>
        </div>
      </div>
    </nav>
    <!-- Main Content -->
    <main class="flex-1 pt-12 md:pt-16">
      <router-view />
    </main>
    <!-- Footer -->
    <footer class="bg-palette-yellow text-palette-light py-6 mt-12 border-t border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div class="text-sm">
            <p>© {{ new Date().getFullYear() }} <span class="notranslate">Casa del Sol</span>.</p>
            <div class="text-xs mt-2 space-x-3">
              <router-link to="/cookie-policy" class="hover:underline">Política de Cookies</router-link>
              <button @click="showCookieSettings" class="hover:underline">Gestionar Cookies</button>
            </div>
          </div>
          <div class="text-right">
            <h4 class="text-sm font-bold mb-1">Contáctanos</h4>
            <div class="text-xs space-y-0.5">
              <p>Email: <a href="mailto:casadelsolholidays@gmail.com" class="hover:underline">casadelsolholidays@gmail.com</a></p>
              <p>WhatsApp: <a href="https://wa.me/34678318713" target="_blank" class="hover:underline">+34 678 31 87 13</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
    
    <!-- Cookie Consent Banner -->
    <CookieConsent ref="cookieConsent" @consent-updated="handleConsentUpdated" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
