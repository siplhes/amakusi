<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const isOpen = ref(false)
const scrolled = ref(false)
const activeSection = ref('hero')

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'about', label: 'Nosotros' },
  { id: 'concurso', label: 'Concurso' },
  { id: 'proyectos', label: 'Proyectos' },
  { id: 'voluntariado', label: 'Voluntariado' },
  { id: 'contacto', label: 'Contacto' },
]

let scrollTimer = null
const handleScroll = () => {
  if (scrollTimer) cancelAnimationFrame(scrollTimer)
  scrollTimer = requestAnimationFrame(() => {
    scrolled.value = window.scrollY > 20
    const pos = window.scrollY + 120
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id)
      if (el && el.offsetTop <= pos) { activeSection.value = sections[i].id; break }
    }
  })
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const scrollTo = (id) => {
  isOpen.value = false
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}

const mobileToggleLabel = computed(() => isOpen.value ? 'Cerrar menú' : 'Abrir menú')
</script>

<template>
  <header role="banner">
    <div class="fixed top-0 left-0 right-0 z-50 transition-colors duration-300" :class="scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent'">
      <div class="max-w-5xl mx-auto px-6 sm:px-8">
        <div class="flex items-center justify-between h-16 md:h-20">
          <button @click="scrollTo('hero')" class="flex items-center gap-2.5" aria-label="Ir al inicio">
            <div class="w-8 h-8 bg-primary rounded-full flex items-center justify-center" aria-hidden="true">
              <Icon icon="ph:heart-fill" class="text-white text-sm" />
            </div>
            <span class="font-heading text-lg md:text-xl text-white">Fundación Ama Kusi</span>
          </button>

          <nav role="navigation" aria-label="Navegación principal" class="hidden md:flex items-center gap-6">
            <button v-for="s in sections" :key="s.id" @click="scrollTo(s.id)"
              class="text-sm transition-colors"
              :class="activeSection === s.id ? 'text-primary font-medium' : 'text-white/70 hover:text-white'">
              {{ s.label }}
            </button>
          </nav>

          <button @click="isOpen = !isOpen"
            class="md:hidden p-2 text-white/70 hover:text-white"
            :aria-label="mobileToggleLabel"
            :aria-expanded="isOpen"
            aria-controls="mobile-menu">
            <Icon :icon="isOpen ? 'ph:x-bold' : 'ph:list-bold'" class="text-xl" aria-hidden="true" />
          </button>
        </div>
      </div>

      <Transition enter-active-class="transition-all duration-300" enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
        <div v-if="isOpen" id="mobile-menu" class="bg-black border-t border-white/5 overflow-hidden" role="navigation" aria-label="Navegación móvil">
          <div class="max-w-5xl mx-auto px-6 py-4 space-y-1">
            <button v-for="s in sections" :key="s.id" @click="scrollTo(s.id)"
              class="block w-full text-left px-4 py-3.5 rounded-lg text-sm transition-colors min-h-[44px]"
              :class="activeSection === s.id ? 'text-primary bg-primary/5' : 'text-white/60 hover:bg-white/5'">
              {{ s.label }}
            </button>
          </div>
        </div>
      </Transition>
    </div>
  </header>
</template>
