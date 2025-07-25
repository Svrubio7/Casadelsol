<script>
export default {
  name: "App"
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
            <span class="text-sm md:text-xl font-bold text-palette-taupe">CASA <span class="text-palette-taupe">DEL SOL</span></span>
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
