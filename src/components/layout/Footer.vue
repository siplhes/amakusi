<script setup>
import { Icon } from "@iconify/vue";
import data from "../../../docs/data.json";

const scrollTo = (id) => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
};

const links = [
  { name: "Inicio", id: "hero" },
  { name: "Nosotros", id: "about" },
  { name: "Concurso", id: "concurso" },
  { name: "Proyectos", id: "proyectos" },
  { name: "Voluntariado", id: "voluntariado" },
  { name: "Contacto", id: "contacto" },
];

const socialLinks = [
  { icon: "ph:instagram-logo-fill", label: "Instagram", url: import.meta.env.VITE_INSTAGRAM_URL },
  { icon: "ph:tiktok-logo-fill", label: "TikTok", url: import.meta.env.VITE_TIKTOK_URL },
  { icon: "ph:facebook-logo-fill", label: "Facebook", url: import.meta.env.VITE_FACEBOOK_URL },
  { icon: "ph:linkedin-logo-fill", label: "LinkedIn", url: import.meta.env.VITE_LINKEDIN_URL },
];
</script>

<template>
  <footer
    class="bg-primary-deep text-black/55 text-sm"
    role="contentinfo"
    aria-label="Pie de página"
  >
    <div class="max-w-5xl mx-auto px-6 sm:px-8 py-12 md:py-16">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="space-y-3">
          <button
            @click="scrollTo('hero')"
            class="flex items-center gap-2"
            aria-label="Ir al inicio"
          >
            <div
              class="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
              <Icon icon="ph:heart-fill" class="text-white text-sm" />
            </div>
            <span class="font-heading text-lg text-white">Ama Kusi</span>
          </button>
          <p class="text-white/60 text-xs leading-relaxed max-w-xs">
            {{ data.about.description }}
          </p>
        </div>
        <div>
          <h4 class="font-heading text-sm text-white mb-4">Enlaces</h4>
          <ul class="space-y-2">
            <li v-for="link in links" :key="link.id">
              <button
                @click="scrollTo(link.id)"
                class="text-white/60 hover:text-primary text-xs transition-colors cursor-pointer"
              >
                {{ link.name }}
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-heading text-sm text-white mb-4">Contacto</h4>
          <ul class="space-y-2 text-xs text-white/60">
            <li>{{ data.global.location }}</li>
            <li>
              <a
                :href="'mailto:' + data.global.contact.email"
                class="hover:text-primary transition-colors"
                >{{ data.global.contact.email }}</a
              >
            </li>
          </ul>
          <div class="flex items-center gap-3 mt-4">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-primary/20 hover:text-primary transition-colors"
            >
              <Icon :icon="social.icon" class="text-sm" />
            </a>
          </div>
        </div>
      </div>
      <div
        class="border-t border-white/5 mt-10 pt-6 text-center text-white/30 text-xs"
      >
        &copy; {{ new Date().getFullYear() }} Fundación Ama Kusi
        <p>
          Build by
          <a
            href="https://siplhes.vercel.app/"
            target="_blank"
            class="hover:text-primary transition-colors"
            >Siplhes</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>
