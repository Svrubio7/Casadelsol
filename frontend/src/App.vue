<script>
export default {
  name: "App"
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-palette-light text-palette-black">
    <!-- Navbar -->
    <nav class="bg-white/50 shadow-sm border-b border-gray-200 fixed w-full z-30 h-14 md:h-16 backdrop-blur">
      <div class="container mx-auto px-4 py-0 flex justify-between items-center h-full">
        <!-- Desktop: Left text, right menu; Mobile: Centered logo only -->
        <div class="flex-1 flex items-center">
          <!-- Desktop: Logo and text -->
          <router-link to="/" class="hidden md:flex items-center space-x-3">
            <img src="/paglogodark.jpg" alt="Casa del Sol Logo" class="h-8 w-auto max-h-10" />
            <span class="text-xl font-bold text-palette-taupe">CASA <span class="text-palette-taupe">DEL SOL</span></span>
          </router-link>
        </div>
        <!-- Mobile: Centered logo absolutely -->
        <div class="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-full">
          <img
            src="/paglogo.jpg"
            alt="Casa del Sol Logo"
            class="h-8 w-auto max-h-10"
          />
        </div>
        <!-- Desktop: Right menu -->
        <div class="flex-1 flex justify-end space-x-6 hidden md:flex font-bold text-palette-yellow">
          <router-link to="/contact" class="hover:text-palette-taupe font-bold">Contáctanos</router-link>
        </div>
      </div>
    </nav>
    <!-- Main Content -->
    <main class="flex-1 pt-14 md:pt-16">
      <router-view />
    </main>
    <!-- Footer -->
    <footer class="bg-palette-yellow text-palette-light py-6 mt-12 border-t border-gray-200">
      <div class="container mx-auto px-4 text-center text-sm">
        © {{ new Date().getFullYear() }} Casa del Sol.
      </div>
    </footer>
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
