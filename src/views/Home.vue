<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { Icon } from '@iconify/vue'
import { useContactStore } from '@/stores/contact'
import AppButton from '@/components/ui/AppButton.vue'

const contactStore = useContactStore()

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
          <h1 class="text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05]">
            Transformando vidas
            <span class="text-primary block mt-1">a través del arte</span>
          </h1>
          <p class="text-white/60 text-lg md:text-xl mt-6 max-w-lg leading-relaxed">
            Somos una fundación dedicada a la transformación social, la inclusión y la educación de poblaciones vulnerables en la Región de Antofagasta, Chile.
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
      <div class="section-container">
        <!-- Intro -->
        <div class="max-w-xl mb-20">
          <p class="text-xs font-display font-semibold tracking-[0.15em] text-primary-deep mb-3">SOBRE NOSOTROS</p>
          <h2 class="text-3xl md:text-5xl text-dark leading-[1.1]">
            Creemos en el poder del arte para transformar comunidades
          </h2>
        </div>

        <!-- Text -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
          <p class="text-dark/90 leading-relaxed">
            Fundación Ama Kusi nace el año 2024 en Calama desde la convicción de que el arte y la educación son herramientas fundamentales para la transformación social. Nuestro nombre proviene de la lengua Kunza del pueblo Atacameño y significa "Ama el Sueño" o "Ama la Imaginación".
          </p>
          <p class="text-dark/90 leading-relaxed">
            Trabajamos directamente con comunidades vulnerables de Calama y la Región de Antofagasta, desarrollando programas de arte terapéutico, nivelación educacional y vinculación comunitaria que han impactado a cientos de niños y jóvenes.
          </p>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 mb-20">
          <div v-for="s in [
            { n: '500+', l: 'Niños beneficiados' },
            { n: '12', l: 'Talleres realizados' },
            { n: '3', l: 'Comunas alcanzadas' },
            { n: '2024', l: 'Año de fundación' }
          ]" :key="s.l" class="md:border-r border-dark/5 last:border-0 text-center md:px-6">
            <p class="font-display font-bold text-4xl md:text-5xl text-primary">{{ s.n }}</p>
            <p class="text-dark/90 text-xs md:text-sm mt-1.5 font-medium">{{ s.l }}</p>
          </div>
        </div>

        <!-- Full-width image break -->
        <div class="relative h-64 md:h-80 rounded-xl overflow-hidden mb-20 bg-dark/5">
          <img src="https://images.unsplash.com/photo-1757085242652-f8cd4d3de889?auto=format&fit=crop&w=1600&q=80" alt="Taller de arte comunitario" class="w-full h-full object-cover" />
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
            <p class="text-dark/90 text-sm leading-relaxed">Promover la transformación social de poblaciones vulnerables a través del arte, la cultura y la educación inclusiva, generando oportunidades de desarrollo integral para niños, jóvenes y sus comunidades.</p>
          </div>
          <div class="border border-dark/5 rounded-xl p-8">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
              <Icon icon="ph:eye-fill" class="text-lg text-primary" aria-hidden="true" />
            </div>
            <h3 class="font-heading text-2xl text-dark mb-3">Visión</h3>
            <p class="text-dark/90 text-sm leading-relaxed">Ser una organización referente en inclusión social y desarrollo comunitario, donde el arte y la educación sean motores de cambio para una sociedad más justa, equitativa y creativa.</p>
          </div>
        </div>

        <!-- Image break: Atacama landscape -->
        <div class="relative h-48 md:h-64 rounded-xl overflow-hidden mb-20 bg-dark/5">
          <img src="https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1600&q=80" alt="Desierto de Atacama" class="w-full h-full object-cover" />
          <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <p aria-hidden="true" class="absolute bottom-4 left-4 text-white/50 text-xs">Desierto de Atacama, Chile</p>
        </div>

        <!-- Pillars -->
        <div class="max-w-xl mb-10">
          <p class="text-xs font-display font-semibold tracking-[0.15em] text-primary-deep mb-3">ÁREAS DE TRABAJO</p>
          <h2 class="text-3xl md:text-4xl text-dark">Nuestros Pilares</h2>
        </div>
        <div class="space-y-1">
          <div v-for="(p, i) in [
            { icon: 'ph:palette-fill', title: 'Arte Terapéutico', desc: 'Expresiones artísticas como herramienta de sanación emocional y desarrollo socioemocional en contextos de vulnerabilidad.' },
            { icon: 'ph:graduation-cap-fill', title: 'Nivelación Educacional', desc: 'Apoyo pedagógico para estudiantes en riesgo de exclusión escolar, adaptado a las necesidades de cada comunidad.' },
            { icon: 'ph:users-three-fill', title: 'Vinculación Comunitaria', desc: 'Trabajo junto a familias, escuelas y organizaciones locales para fortalecer el tejido social.' },
            { icon: 'ph:globe-fill', title: 'Identidad Cultural', desc: 'Rescate y valoración de la cultura local y el patrimonio de la Región de Antofagasta.' },
          ]" :key="p.title" class="group flex items-start gap-5 py-6 border-b border-dark/5 last:border-0">
            <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon :icon="p.icon" class="text-lg text-primary" aria-hidden="true" />
            </div>
            <div>
              <h3 class="font-heading text-lg text-dark">{{ p.title }}</h3>
              <p class="text-dark/90 text-sm mt-1 leading-relaxed">{{ p.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CONTACTO ===== -->
    <section id="contacto" class="relative bg-dark text-white section-padding overflow-hidden" aria-label="Contacto">
      <div aria-hidden="true" class="absolute inset-0 bg-cover bg-center opacity-[0.04]" style="background-image: url('https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80');" />
      <div class="section-container relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <!-- Info -->
          <div class="space-y-8">
            <div>
              <p class="text-xs font-display font-semibold tracking-[0.15em] text-primary mb-3">CONTACTO</p>
              <h2 class="text-3xl md:text-5xl text-white leading-[1.1]">Hablemos</h2>
              <p class="text-white/50 mt-4 text-sm max-w-sm leading-relaxed">
                ¿Tienes preguntas, sugerencias o quieres colaborar con nosotros? Estaremos encantados de escucharte.
              </p>
            </div>
            <div class="space-y-4">
              <div v-for="info in [
                { icon: 'ph:map-pin-fill', label: 'Dirección', value: 'Calama, Región de Antofagasta, Chile' },
                { icon: 'ph:envelope-fill', label: 'Email', value: 'contacto@fundacionamakusi.cl' },
                { icon: 'ph:phone-fill', label: 'Teléfono', value: '+56 9 1234 5678' },
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
