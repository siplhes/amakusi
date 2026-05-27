<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { Icon } from '@iconify/vue'
import { useContactStore } from '@/stores/contact'
import AppButton from '@/components/ui/AppButton.vue'
import data from '../../docs/data.json'

const contactStore = useContactStore()

// ─── Scroll Reveal ───
let revealObserver = null

onMounted(() => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          revealObserver.unobserve(entry.target)
        }
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
  )
  document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el))
})

onUnmounted(() => revealObserver?.disconnect())

// ─── Contact Form ───
const contactSchema = yup.object({
  nombre: yup.string().required('Obligatorio').min(3, 'Mínimo 3 caracteres'),
  email: yup.string().required('Obligatorio').email('Email inválido'),
  mensaje: yup.string().required('Obligatorio').min(10, 'Mínimo 10 caracteres').max(1000, 'Máximo 1000 caracteres'),
})

const { handleSubmit: handleContactSubmit, resetForm: resetContact } = useForm({ validationSchema: contactSchema })
const { value: cNombre, errorMessage: cNomErr, handleBlur: cNomBlur, touched: cNomTouch } = useField('nombre')
const { value: cEmail, errorMessage: cEmailErr, handleBlur: cEmailBlur, touched: cEmailTouch } = useField('email')
const { value: cMensaje, errorMessage: cMenErr, handleBlur: cMenBlur, touched: cMenTouch } = useField('mensaje')

const onContactSubmit = handleContactSubmit(async (v) => {
  if (await contactStore.submitForm(v)) resetContact()
})

const scrollTo = (id) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
}
</script>

<template>
  <div>
    <!-- ===== HERO ===== -->
    <section class="relative min-h-screen hero-gradient flex items-center overflow-hidden">
      <!-- Subtle desert texture (decorative) -->
      <div aria-hidden="true" class="absolute inset-0 bg-cover bg-center opacity-[0.07]" style="background-image: url('https://images.unsplash.com/photo-1758390930924-8e3213765904?auto=format&fit=crop&w=1920&q=80');" />
      <div class="section-container relative z-10 w-full">
        <div class="max-w-2xl">
          <p class="text-xs font-display font-semibold tracking-[0.15em] text-primary mb-5">
            FUNDACIÓN SIN FINES DE LUCRO
          </p>
          <h1 class="text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] hero-heading">
            Transformando vidas
            <span class="text-primary block mt-1">a través de {{ data.global.tagline.toLowerCase() }}</span>
          </h1>
          <p class="text-white/60 text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
            {{ data.about.description }}
          </p>
          <div class="flex flex-wrap gap-4 mt-10">
            <AppButton variant="secondary" size="lg" @click="scrollTo('about')">
              Conócenos
            </AppButton>
            <AppButton variant="ghost" size="lg" @click="scrollTo('contacto')">
              Contáctanos
            </AppButton>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== ABOUT ===== -->
    <section id="about" class="section-padding" aria-label="Sobre nosotros">
      <div class="section-container" data-reveal="about">
        <!-- Intro -->
        <div class="max-w-xl mb-20">
          <p class="text-xs font-display font-semibold tracking-[0.15em] text-primary-deep mb-3">SOBRE NOSOTROS</p>
          <h2 class="text-3xl md:text-5xl text-dark leading-[1.1]">
            {{ data.about.headline }}
          </h2>
        </div>

        <!-- Text -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
          <p class="text-dark/90 leading-relaxed">
            {{ data.about.origin }}
          </p>
          <p class="text-dark/90 leading-relaxed">
            {{ data.about.description }}
          </p>
        </div>

        <!-- Quote -->
        <div class="relative max-w-2xl mx-auto mb-20 text-center">
          <Icon icon="ph:quotes-fill" class="text-3xl text-primary/30 mx-auto mb-4" aria-hidden="true" />
          <blockquote class="text-xl md:text-2xl text-dark/80 font-heading leading-relaxed italic">
            "{{ data.about.quote }}"
          </blockquote>
        </div>

        <!-- Impact narrative -->
        <div class="max-w-3xl mx-auto mb-20">
          <div class="bg-desert-sand/10 rounded-2xl p-6 md:p-8">
            <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div class="flex-shrink-0 w-16 h-16 rounded-full bg-desert-copper/20 flex items-center justify-center">
                <Icon icon="ph:trend-up-fill" class="text-2xl text-desert-copper" />
              </div>
              <div class="space-y-3">
                <p class="text-dark/90 text-sm leading-relaxed">
                  <strong class="text-dark font-semibold">Más de 500 niños y jóvenes</strong> han participado en nuestros programas en la Región de Antofagasta. Con <strong class="text-dark font-semibold">12 talleres</strong> realizados en <strong class="text-dark font-semibold">3 comunas</strong>, seguimos creciendo desde nuestra fundación en <strong class="text-dark font-semibold">2024</strong>.
                </p>
                <p class="text-dark/60 text-xs leading-relaxed">
                  Cada número representa una historia de transformación, un vínculo comunitario fortalecido y una semilla de cambio para el futuro del desierto de Atacama.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Full-width image break -->
        <div class="relative h-64 md:h-80 rounded-xl overflow-hidden mb-20 bg-dark/5">
          <img src="https://images.unsplash.com/photo-1757085242652-f8cd4d3de889?auto=format&fit=crop&w=1600&q=80" alt="Taller comunitario de arte en el desierto de Atacama" loading="lazy" class="w-full h-full object-cover" />
          <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          <p aria-hidden="true" class="absolute bottom-4 left-4 text-white/50 text-xs">Talleres de arte en comunidad</p>
        </div>

        <!-- Mission / Vision -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div class="border border-dark/5 rounded-xl p-8">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
              <Icon icon="ph:target-fill" class="text-lg text-primary" aria-hidden="true" />
            </div>
            <h3 class="font-heading text-2xl text-dark mb-3">Misión</h3>
            <p class="text-dark/90 text-sm leading-relaxed">{{ data.about.mission.text }}</p>
          </div>
          <div class="border border-dark/5 rounded-xl p-8">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
              <Icon icon="ph:eye-fill" class="text-lg text-primary" aria-hidden="true" />
            </div>
            <h3 class="font-heading text-2xl text-dark mb-3">Visión</h3>
            <p class="text-dark/90 text-sm leading-relaxed">{{ data.about.vision.text }}</p>
          </div>
        </div>

        <!-- Team -->
        <div class="mb-20">
          <div class="max-w-xl mb-10">
            <p class="text-xs font-display font-semibold tracking-[0.15em] text-primary-deep mb-3">NUESTRO EQUIPO</p>
            <h2 class="text-3xl md:text-4xl text-dark">Mujeres fundadoras comprometidas con el cambio social</h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="(member, i) in data.about.team" :key="member.name" class="border border-dark/5 rounded-xl p-6 hover:border-primary/20 transition-colors">
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-full flex items-center justify-center font-heading text-sm font-bold text-white" :class="i === 0 ? 'bg-desert-copper' : i === 1 ? 'bg-primary' : 'bg-desert-sand'">
                  {{ member.name.charAt(0) }}
                </div>
                <span class="text-xs font-display font-semibold tracking-wider text-primary">{{ member.label?.toUpperCase() }}</span>
              </div>
              <h3 class="font-heading text-lg text-dark mb-1">{{ member.name }}</h3>
              <p class="text-sm text-dark/70 font-medium mb-2">{{ member.role }}</p>
              <p class="text-sm text-dark/60 leading-relaxed">{{ member.description }}</p>
              <a :href="'mailto:' + member.email" class="inline-block text-xs text-primary mt-3 hover:underline">{{ member.email }}</a>
            </div>
          </div>
        </div>

        <!-- Image break: Atacama landscape -->
        <div class="relative h-48 md:h-64 rounded-xl overflow-hidden mb-20 bg-dark/5">
          <img src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80" alt="Vista panorámica del Desierto de Atacama al atardecer" loading="lazy" class="w-full h-full object-cover" />
          <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <p aria-hidden="true" class="absolute bottom-4 left-4 text-white/50 text-xs">Desierto de Atacama, Chile</p>
        </div>

        <!-- Pillars -->
        <div class="max-w-xl mb-10">
          <p class="text-xs font-display font-semibold tracking-[0.15em] text-primary-deep mb-3">ÁREAS DE TRABAJO</p>
          <h2 class="text-3xl md:text-4xl text-dark">Nuestros Pilares</h2>
        </div>
        <div class="space-y-1">
          <div v-for="(p, i) in data.about.vision.pillars" :key="p.title" class="group flex items-start gap-5 py-6 border-b border-dark/5 last:border-0">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon :icon="p.icon" class="text-lg text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 class="font-heading text-lg text-dark">{{ p.title }}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CONTEST ===== -->
    <section id="concurso" class="section-padding bg-cream" aria-label="Concurso de dibujo">
      <div class="section-container" data-reveal="concurso">
        <div class="max-w-xl mb-14">
            <h2 class="text-3xl md:text-5xl text-dark leading-[1.1]">{{ data.contest.title }}</h2>
            <p class="text-dark/60 text-sm mt-2 font-medium">{{ data.contest.subtitle }}</p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <div class="space-y-4">
            <p class="text-dark/90 leading-relaxed">{{ data.contest.description }}</p>
            <p class="text-dark/80 text-sm leading-relaxed italic">{{ data.contest.impact }}</p>
            <div class="flex flex-wrap gap-4 text-sm">
              <div class="bg-dark/5 rounded-lg px-4 py-2">
                <span class="text-dark/50 text-xs">Inscripciones</span>
                <p class="font-medium text-dark">{{ data.contest.dates.registration }}</p>
              </div>
              <div class="bg-dark/5 rounded-lg px-4 py-2">
                <span class="text-dark/50 text-xs">Premiación</span>
                <p class="font-medium text-dark">{{ data.contest.dates.award }}</p>
              </div>
            </div>
          </div>
          <div class="border border-dark/5 rounded-xl p-6">
            <p class="text-xs font-display font-semibold tracking-wider text-primary mb-4">CATEGORÍAS</p>
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div v-for="cat in data.contest.categories" :key="cat.id" class="bg-dark/5 rounded-lg p-3 text-center">
                <p class="font-heading text-lg text-primary">Categoría {{ cat.id }}</p>
                <p class="text-xs text-dark/60">{{ cat.range }}</p>
              </div>
            </div>
            <p class="text-xs font-display font-semibold tracking-wider text-primary mb-3">TEMÁTICAS</p>
            <div class="space-y-2">
              <div v-for="theme in data.contest.themes" :key="theme.name" class="flex items-start gap-2">
                <Icon icon="ph:palette-fill" class="text-primary text-sm mt-0.5 flex-shrink-0" />
                <div>
                  <p class="text-sm font-medium text-dark">{{ theme.name }}</p>
                  <p class="text-xs text-dark/60">{{ theme.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="border border-dark/5 rounded-xl p-6 md:p-8">
          <p class="text-xs font-display font-semibold tracking-wider text-primary mb-4">ÁREAS DE IMPACTO</p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div v-for="area in data.contest.impactAreas" :key="area.title" class="text-center">
              <p class="font-heading text-lg text-dark mb-1">{{ area.title }}</p>
              <p class="text-xs text-dark/60">{{ area.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROYECTOS ===== -->
    <section id="proyectos" class="section-padding" aria-label="Proyectos">
      <div class="section-container" data-reveal="proyectos">
        <div class="max-w-xl mb-14">
          <h2 class="text-3xl md:text-5xl text-dark leading-[1.1]">Iniciativas que transforman comunidades</h2>
          <p class="text-dark/60 text-sm mt-2">Conoce nuestros programas activos y próximos lanzamientos.</p>
        </div>
        <div class="space-y-10">
          <div v-for="project in data.projects" :key="project.title" class="border border-dark/5 rounded-xl p-6 md:p-8">
            <p class="text-xs font-display font-semibold tracking-wider text-primary mb-1">{{ project.year }}</p>
            <h3 class="font-heading text-2xl text-dark mb-3">{{ project.title }}</h3>
            <p class="text-dark/80 leading-relaxed mb-4">{{ project.description }}</p>

            <!-- Long description if different -->
            <div v-if="project.longDescription && project.longDescription !== project.description" class="bg-primary/[0.04] rounded-xl p-4 md:p-5 mb-5">
              <p class="text-dark/70 text-sm leading-relaxed">{{ project.longDescription }}</p>
            </div>

            <!-- Quote (Raíces Vivas) -->
            <div v-if="project.quote" class="bg-primary/5 rounded-xl p-5 mb-5 text-center">
              <Icon icon="ph:quotes-fill" class="text-primary/30 text-xl mx-auto mb-2" />
              <p class="italic text-dark/80 text-sm">"{{ project.quote }}"</p>
            </div>

            <!-- Roadmap (Raíces Vivas) -->
            <div v-if="project.roadmap" class="mb-5">
              <p class="text-xs font-display font-semibold tracking-wider text-dark/50 mb-3">HOJA DE RUTA</p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div v-for="step in project.roadmap" :key="step.period" class="bg-dark/5 rounded-lg p-3 text-center">
                  <p class="text-[10px] text-dark/50 font-medium">{{ step.period }}</p>
                  <p class="text-sm font-medium text-dark mt-1">{{ step.milestone }}</p>
                </div>
              </div>
            </div>

            <!-- Benefits (Raíces Vivas) -->
            <div v-if="project.benefits" class="mb-4">
              <p class="text-xs font-display font-semibold tracking-wider text-dark/50 mb-3">BENEFICIOS</p>
              <div class="space-y-3">
                <div v-for="b in project.benefits" :key="b.title" class="flex gap-3">
                  <Icon icon="ph:check-circle-fill" class="text-primary text-lg mt-0.5 flex-shrink-0" />
                  <div>
                    <p class="font-medium text-dark text-sm">{{ b.title }}</p>
                    <p class="text-dark/60 text-xs">{{ b.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Areas (Convenio) -->
            <div v-if="project.areas" class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div v-for="area in project.areas" :key="area.title" class="bg-dark/5 rounded-xl p-4 text-center">
                <p class="font-heading text-lg text-dark mb-1">{{ area.title }}</p>
                <p class="text-dark/60 text-xs">{{ area.description }}</p>
              </div>
            </div>

            <!-- Launch -->
            <p v-if="project.launch" class="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mt-2">
              Lanzamiento: {{ project.launch }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== SÚMATE AL CAMBIO ===== -->
    <section id="voluntariado" class="section-padding bg-cream" aria-label="Voluntariado">
      <div class="section-container" data-reveal="voluntariado">
        <div class="max-w-2xl mx-auto text-center mb-12">
          <h2 class="text-3xl md:text-5xl text-dark leading-[1.1] mb-4">{{ data.volunteer.title }}</h2>
          <p class="text-dark/60 text-sm font-medium mb-4">{{ data.volunteer.subtitle }}</p>
          <p class="text-dark/80 leading-relaxed">{{ data.volunteer.description }}</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div v-for="area in data.volunteer.areas" :key="area.title" class="border border-dark/5 rounded-xl p-6 text-center hover:border-primary/20 hover:shadow-sm transition-all">
            <Icon icon="ph:hand-heart-fill" class="text-2xl text-primary mx-auto mb-3" />
            <h3 class="font-heading text-lg text-dark mb-2">{{ area.title }}</h3>
            <p class="text-dark/60 text-xs leading-relaxed">{{ area.description }}</p>
          </div>
        </div>
        <div class="max-w-xl mx-auto text-center bg-desert-rust text-white rounded-2xl p-8 md:p-10">
          <Icon icon="ph:sparkle-fill" class="text-3xl text-primary mx-auto mb-4" />
          <p class="text-white/90 leading-relaxed text-sm md:text-base italic">"{{ data.volunteer.callToAction }}"</p>
          <AppButton variant="secondary" size="lg" class="mt-6" @click="scrollTo('contacto')">
            Quiero Sumarme
          </AppButton>
        </div>
      </div>
    </section>

    <!-- ===== CONTACTO ===== -->
    <section id="contacto" class="relative bg-dark text-white section-padding overflow-hidden" aria-label="Contacto">
      <div aria-hidden="true" class="absolute inset-0 bg-cover bg-center opacity-[0.04]" style="background-image: url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80');" />
      <div class="section-container relative z-10" data-reveal="contacto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <!-- Info -->
          <div class="space-y-8">
            <div>
              <p class="text-xs font-display font-semibold tracking-[0.15em] text-primary mb-3">CONTACTO</p>
              <h2 class="text-3xl md:text-5xl text-white leading-[1.1]">Hablemos</h2>
              <p class="text-white/50 mt-4 text-sm max-w-sm leading-relaxed">
                {{ data.contact.message }}
              </p>
            </div>
            <div class="space-y-4">
              <div v-for="info in [
                { icon: 'ph:map-pin-fill', label: 'Dirección', value: data.global.location },
                { icon: 'ph:envelope-fill', label: 'Email', value: data.global.contact.email },
                { icon: 'ph:phone-fill', label: 'Teléfono', value: data.global.contact.phone },
              ]" :key="info.label" class="flex items-center gap-4">
                <Icon :icon="info.icon" class="text-primary text-lg flex-shrink-0" aria-hidden="true" />
                <div>
                  <p class="text-white/60 text-xs font-medium">{{ info.label }}</p>
                  <p class="text-white/60 text-sm">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div>
            <form @submit="onContactSubmit" novalidate class="space-y-5">
              <div>
                <label for="cNombre" class="block text-xs font-display font-semibold tracking-wider text-white/50 mb-2">NOMBRE</label>
                <input
                  id="cNombre"
                  v-model="cNombre"
                  @blur="cNomBlur"
                  placeholder="Tu nombre"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-primary focus:bg-white/10"
                  :class="cNomErr && cNomTouch ? 'border-red-400' : ''"
                  :aria-invalid="cNomErr && cNomTouch ? 'true' : 'false'"
                  :aria-describedby="cNomErr && cNomTouch ? 'cNombre-err' : null"
                />
                <p v-if="cNomErr && cNomTouch" id="cNombre-err" class="text-red-400 text-xs mt-1.5" role="alert">{{ cNomErr }}</p>
              </div>
              <div>
                <label for="cEmail" class="block text-xs font-display font-semibold tracking-wider text-white/50 mb-2">EMAIL</label>
                <input
                  id="cEmail"
                  v-model="cEmail"
                  @blur="cEmailBlur"
                  type="email"
                  placeholder="tu@correo.cl"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-primary focus:bg-white/10"
                  :class="cEmailErr && cEmailTouch ? 'border-red-400' : ''"
                  :aria-invalid="cEmailErr && cEmailTouch ? 'true' : 'false'"
                  :aria-describedby="cEmailErr && cEmailTouch ? 'cEmail-err' : null"
                />
                <p v-if="cEmailErr && cEmailTouch" id="cEmail-err" class="text-red-400 text-xs mt-1.5" role="alert">{{ cEmailErr }}</p>
              </div>
              <div>
                <label for="cMensaje" class="block text-xs font-display font-semibold tracking-wider text-white/50 mb-2">MENSAJE</label>
                <textarea
                  id="cMensaje"
                  v-model="cMensaje"
                  @blur="cMenBlur"
                  placeholder="Escribe tu mensaje..."
                  rows="5"
                  class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-white/20 outline-none transition-colors focus:border-primary focus:bg-white/10 resize-none"
                  :class="cMenErr && cMenTouch ? 'border-red-400' : ''"
                  :aria-invalid="cMenErr && cMenTouch ? 'true' : 'false'"
                  :aria-describedby="cMenErr && cMenTouch ? 'cMensaje-err' : null"
                ></textarea>
                <p v-if="cMenErr && cMenTouch" id="cMensaje-err" class="text-red-400 text-xs mt-1.5" role="alert">{{ cMenErr }}</p>
              </div>

              <Transition enter-active-class="transition-all duration-500" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100">
                <div v-if="contactStore.success" class="border border-primary/30 rounded-xl p-5 text-center" role="status" aria-live="polite">
                  <Icon icon="ph:check-circle-fill" class="text-primary text-3xl mb-2" aria-hidden="true" />
                  <p class="text-white font-semibold">¡Mensaje enviado!</p>
                  <p class="text-white/50 text-sm mt-1">Te responderemos a la brevedad.</p>
                  <button class="text-primary text-sm mt-3 underline underline-offset-2" @click="contactStore.resetStatus()">Enviar otro</button>
                </div>
              </Transition>
              <div v-if="contactStore.error" class="border border-red-400/30 rounded-xl p-4 text-center" role="alert">
                <p class="text-red-400 text-sm">{{ contactStore.error }}</p>
              </div>

              <button type="submit" :disabled="contactStore.submitting" class="w-full bg-primary text-dark font-semibold rounded-xl px-6 py-3.5 text-sm transition-all hover:bg-primary-light disabled:opacity-40" :aria-busy="contactStore.submitting">
                {{ contactStore.submitting ? 'Enviando...' : 'Enviar Mensaje' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-heading {
  animation: heroFadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
}

@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
}

[data-reveal].in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
