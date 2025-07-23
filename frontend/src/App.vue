<script>
export default {
  name: "App"
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-palette-light text-palette-black">
    <!-- Navbar -->
    <nav class="bg-white shadow-sm border-b border-gray-200 relative h-20 md:h-24">
      <div class="container mx-auto px-4 py-0 flex justify-between items-center h-full md:py-6">
        <!-- Desktop: Left text, right menu; Mobile: Centered logo only -->
        <div class="flex-1 flex items-center">
          <!-- Desktop: Show text -->
          <router-link to="/" class="text-2xl font-bold text-palette-black hidden md:block">
            Auditando<span class="text-palette-taupe">Impuestos</span>
          </router-link>
        </div>
        <!-- Mobile: Centered logo absolutely -->
        <div class="md:hidden absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-full">
          <img
            src="/paglogo.png"
            alt="Auditando Impuestos Logo"
            class="h-10 w-auto max-h-12"
          />
        </div>
        <!-- Desktop: Right menu -->
        <div class="flex-1 flex justify-end space-x-6 hidden md:flex">
          <router-link to="/" class="hover:text-palette-taupe font-medium">Inicio</router-link>
          <router-link to="/app" class="hover:text-palette-taupe font-medium">Casos</router-link>
        </div>
      </div>
    </nav>
    <!-- Main Content -->
    <main class="flex-1">
      <router-view />
    </main>
    <!-- Footer -->
    <footer class="bg-palette-beige text-palette-black py-6 mt-12 border-t border-gray-200">
      <div class="container mx-auto px-4 text-center text-sm">
        © {{ new Date().getFullYear() }} Auditando Impuestos. Hecho con transparencia.
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
