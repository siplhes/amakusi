<script setup>
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-cream">
    <!-- Skip to main content -->
    <a href="#main-content" class="skip-link">
      Saltar al contenido principal
    </a>

    <Navbar />

    <main id="main-content" class="flex-grow" role="main" tabindex="-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>
