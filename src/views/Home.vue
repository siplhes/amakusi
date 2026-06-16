<script setup>
import { onMounted, onUnmounted } from "vue";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { Icon } from "@iconify/vue";
import { useContactStore } from "@/stores/contact";
import AppButton from "@/components/ui/AppButton.vue";
import data from "../../docs/data.json";

const contactStore = useContactStore();

// ─── External URLs from env ───
const concursoFormUrl = import.meta.env.VITE_CONCURSO_FORM_URL || "";

// ─── Scroll Reveal ───
let revealObserver = null;

onMounted(() => {
  revealObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          revealObserver.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
  );
  document
    .querySelectorAll("[data-reveal]")
    .forEach((el) => revealObserver.observe(el));
});

onUnmounted(() => revealObserver?.disconnect());

// ─── Contact Form ───
const contactSchema = yup.object({
  nombre: yup.string().required("Obligatorio").min(3, "Mínimo 3 caracteres"),
  email: yup.string().required("Obligatorio").email("Email inválido"),
  mensaje: yup
    .string()
    .required("Obligatorio")
    .min(10, "Mínimo 10 caracteres")
    .max(1000, "Máximo 1000 caracteres"),
});

const { handleSubmit: handleContactSubmit, resetForm: resetContact } = useForm({
  validationSchema: contactSchema,
});
const {
  value: cNombre,
  errorMessage: cNomErr,
  handleBlur: cNomBlur,
  touched: cNomTouch,
} = useField("nombre");
const {
  value: cEmail,
  errorMessage: cEmailErr,
  handleBlur: cEmailBlur,
  touched: cEmailTouch,
} = useField("email");
const {
  value: cMensaje,
  errorMessage: cMenErr,
  handleBlur: cMenBlur,
  touched: cMenTouch,
} = useField("mensaje");

const onContactSubmit = handleContactSubmit(async (v) => {
  if (await contactStore.submitForm(v)) resetContact();
});

const scrollTo = (id) => {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
};
</script>

<template>
  <div>
    <!-- ===== HERO ===== -->
    <header
      class="relative min-h-[100dvh] hero-gradient flex items-center overflow-hidden"
    >
      <!-- Subtle desert texture (decorative) -->
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-cover bg-center opacity-[0.07]"
        style="
          background-image: url(&quot;https://images.unsplash.com/photo-1758390930924-8e3213765904?auto=format&fit=crop&w=1920&q=80&quot;);
        "
      />
      <div class="section-container relative z-10 w-full">
        <div class="max-w-2xl">
          <p
            class="text-xs font-display font-semibold tracking-[0.15em] text-white mb-4"
          >
            FUNDACIÓN SIN FINES DE LUCRO
          </p>
          <h1
            class="text-4xl md:text-6xl lg:text-7xl text-white leading-[1.05] hero-heading"
          >
            Transformando vidas
            <span class="text-primary-light block mt-1"
              >a través de {{ data.global.tagline.toLowerCase() }}</span
            >
          </h1>
          <p
            class="text-white/75 text-lg md:text-xl mt-6 max-w-lg leading-relaxed"
          >
            En <strong>Fundación Ama Kusi</strong> creemos que transformar vidas
            es un acto colectivo. Desde el corazón del desierto de Atacama,
            conectamos con todas las generaciones, a través de la educación,
            cultura y el arte, porque sabemos que el bienestar de una comunidad
            se construye cuando cada persona se siente valorada. Nuestro nombre,
            que en Aymara significa "la que proyecta con alegría", es también
            nuestra promesa: "construir futuro con esperanza, raíces y acción".
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
    </header>

    <!-- ===== ABOUT ===== -->
    <section id="about" class="section-padding" aria-labelledby="about-heading">
      <div class="section-container">
        <!-- Intro -->
        <div class="max-w-xl mb-20">
          <p
            class="text-xs font-display font-semibold tracking-[0.15em] text-primary-aaa mb-3"
          >
            SOBRE NOSOTROS
          </p>
          <h2 id="about-heading" class="text-3xl md:text-5xl text-dark leading-[1.1]">
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
          <blockquote
            class="text-xl md:text-2xl text-dark/80 font-heading leading-relaxed italic bg-primary/[.15] p-10 rounded-lg"
          >
            <Icon
              icon="ph:quotes-fill"
              class="text-3xl text-primary/30 mx-auto mb-4"
              aria-hidden="true"
            />
            "{{ data.about.quote }}"
          </blockquote>
        </div>

        <!-- Impact narrative -->
        <div class="max-w-3xl mx-auto mb-20">
          <div class="bg-desert-sand/10 rounded-2xl p-6 md:p-8">
            <div class="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              <div
                class="flex-shrink-0 w-16 h-16 rounded-full bg-desert-copper/20 flex items-center justify-center"
              >
                <Icon
                  icon="ph:trend-up-fill"
                  class="text-2xl text-desert-copper"
                />
              </div>
              <div class="space-y-3">
                <p class="text-dark/90 text-sm leading-relaxed">
                  <strong class="text-dark font-semibold"
                    >Más de 80 niños y jóvenes</strong
                  >
                  han participado en nuestros programas en la Región de
                  Antofagasta. Con
                  <strong class="text-dark font-semibold">12 talleres</strong>
                  realizados en
                  <strong class="text-dark font-semibold">3 comunas</strong>,
                  seguimos creciendo desde nuestra fundación en
                  <strong class="text-dark font-semibold">2024</strong>.
                </p>
                <p class="text-dark/75 text-xs leading-relaxed">
                  Cada número representa una historia de transformación, un
                  vínculo comunitario fortalecido y una semilla de cambio para
                  el futuro del desierto de Atacama.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Full-width image break -->
        <div
          class="relative h-64 md:h-80 rounded-xl overflow-hidden mb-20 bg-dark/5"
        >
          <img
            src="https://images.unsplash.com/photo-1757085242652-f8cd4d3de889?auto=format&fit=crop&w=1600&q=80"
            alt="Taller comunitario de arte en el desierto de Atacama"
            loading="lazy"
            class="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"
          />
          <p
            aria-hidden="true"
            class="absolute bottom-4 left-4 text-white/50 text-xs"
          >
            Talleres de arte en comunidad
          </p>
        </div>

        <!-- Mission / Vision -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          <div class="border border-dark/5 rounded-xl p-8">
            <div
              class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5"
            >
              <Icon
                  icon="ph:target-fill"
                  class="text-lg text-primary-deep"
                  aria-hidden="true"
                />
            </div>
            <h3 class="font-heading text-2xl text-dark mb-3">Misión</h3>
            <p class="text-dark/90 text-sm leading-relaxed">
              {{ data.about.mission.text }}
            </p>
          </div>
          <div class="border border-dark/5 rounded-xl p-8">
            <div
              class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5"
            >
              <Icon
                  icon="ph:eye-fill"
                  class="text-lg text-primary-deep"
                  aria-hidden="true"
                />
            </div>
            <h3 class="font-heading text-2xl text-dark mb-3">Visión</h3>
            <p class="text-dark/90 text-sm leading-relaxed">
              {{ data.about.vision.text }}
            </p>
          </div>
        </div>

        <!-- Team -->
        <div class="mb-20">
          <div class="max-w-xl mb-10">
            <p
              class="text-xs font-display font-semibold tracking-[0.15em] text-primary-aaa mb-3"
            >
              NUESTRO EQUIPO
            </p>
            <h2 class="text-3xl md:text-4xl text-dark">
              Mujeres fundadoras comprometidas con el cambio social
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <article
              v-for="(member, i) in data.about.team"
              :key="member.name"
              class="flex flex-col items-center text-center border border-dark/5 rounded-xl p-6 md:p-8 hover:border-primary/20 transition-colors"
            >
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center font-heading text-xl font-bold text-white mb-4"
                :class="
                  i === 0
                    ? 'bg-desert-copper'
                    : i === 1
                      ? 'bg-primary'
                      : 'bg-desert-sand'
                "
              >
                {{ member.name.charAt(0) }}
              </div>
              <div class="flex-1">
                <h3 class="font-heading text-lg text-dark mb-2">
                  {{ member.name }}
                </h3>
                <p class="text-sm text-dark/70 font-medium mb-2">
                  <span
                    class="text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full"
                    :class="
                      i === 0
                        ? 'bg-desert-copper/10 text-desert-copper'
                        : i === 1
                          ? 'bg-primary-deep/10 text-primary-deep'
                          : 'bg-desert-sand/20 text-desert-gold'
                    "
                    >{{ member.label?.toUpperCase() }}</span
                  >
                </p>
                <p class="text-sm text-dark/75 leading-relaxed">
                  {{ member.role }}
                </p>
                <p class="text-sm text-dark/75 leading-relaxed">
                  {{ member.description }}
                </p>
              </div>
            </article>
          </div>
        </div>

        <!-- Image break: Atacama landscape -->
        <div
          class="relative h-48 md:h-64 rounded-xl overflow-hidden mb-20 bg-dark/5"
        >
          <img
            src="https://www.gochile.cl/fotos/full/107646-valle-de-la-luna-1.jpg"
            alt="Valle de la Luna, San Pedro de Atacama"
            loading="lazy"
            class="w-full h-full object-cover"
          />
          <div
            aria-hidden="true"
            class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          />
          <p
            aria-hidden="true"
            class="absolute bottom-4 left-4 text-white/50 text-xs"
          >
            Valle de la Luna, San Pedro de Atacama
          </p>
        </div>

        <!-- Pillars -->
        <div class="max-w-2xl mx-auto mb-12 text-center">
          <p
            class="text-xs font-display font-semibold tracking-[0.15em] text-primary-aaa mb-3"
          >
            {{ data.principles.title }}
          </p>
          <h2 class="text-3xl md:text-5xl text-dark leading-[1.1]">
            Los valores que guían nuestro trabajo
          </h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="(p, i) in data.principles.items"
            :key="p.title"
            class="group rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            :class="[
              i % 2 === 0
                ? 'bg-desert-copper/[0.07] border border-desert-copper/15'
                : 'bg-primary/[0.07] border border-primary/15',
              i === 4 ? 'sm:col-span-2 sm:max-w-md sm:mx-auto' : '',
            ]"
          >
            <div
              class="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
              :class="
                i % 2 === 0
                  ? 'bg-desert-copper/15 text-desert-copper'
                  : 'bg-primary-deep/15 text-primary-deep'
              "
            >
              <Icon :icon="p.icon" class="text-2xl" aria-hidden="true" />
            </div>
            <h3 class="font-heading text-xl text-dark mb-2">{{ p.title }}</h3>
            <p class="text-dark/75 text-sm leading-relaxed">
              {{ p.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== CONTEST ===== -->
    <section
      id="concurso"
      class="section-padding bg-cream"
      aria-labelledby="concurso-heading"
    >
      <div class="section-container" data-reveal="concurso">
        <div class="max-w-xl mb-14">
          <span
            class="inline-flex items-center gap-2 bg-primary/10 text-primary-aaa text-xs font-bold px-4 py-1.5 rounded-full mb-4"
          >
            <Icon icon="ph:palette-fill" class="text-sm" />
            CONCURSO DE DIBUJO
          </span>
          <h2 id="concurso-heading" class="text-3xl md:text-5xl text-dark leading-[1.1]">
            {{ data.contest.title }}
          </h2>
          <p class="text-dark/75 text-sm mt-2 font-medium">
            {{ data.contest.subtitle }}
          </p>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-14">
          <div class="space-y-4">
            <p class="text-dark/90 leading-relaxed">
              {{ data.contest.description }}
            </p>
            <p class="text-dark/80 text-sm leading-relaxed italic">
              {{ data.contest.impact }}
            </p>
            <div class="flex flex-wrap gap-4 text-sm">
              <div class="bg-dark/5 rounded-lg px-4 py-2">
                <span class="text-dark/70 text-xs">Inscripciones</span>
                <p class="font-medium text-dark">
                  {{ data.contest.dates.registration }}
                </p>
              </div>
              <div class="bg-dark/5 rounded-lg px-4 py-2">
                <span class="text-dark/70 text-xs">Premiación</span>
                <p class="font-medium text-dark">
                  {{ data.contest.dates.award }}
                </p>
              </div>
            </div>
            <a
              v-if="concursoFormUrl"
              :href="concursoFormUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 bg-primary text-dark font-semibold rounded-xl px-6 py-3 text-sm transition-all hover:bg-primary-light mt-4"
            >
              <Icon icon="ph:pen-fill" class="text-sm" />
              Inscribirse ahora
            </a>
          </div>
          <div class="border border-dark/5 rounded-xl p-6">
            <p class="text-sm font-display font-semibold text-primary-aaa mb-4">
              Categorías
            </p>
            <div class="grid grid-cols-2 gap-3 mb-6">
              <div
                v-for="cat in data.contest.categories"
                :key="cat.id"
                class="bg-dark/5 rounded-lg p-3 text-center"
              >
                <p class="font-heading text-lg text-primary-deep">
                  Categoría {{ cat.id }}
                </p>
                <p class="text-xs text-dark/75">{{ cat.range }}</p>
              </div>
            </div>
            <p class="text-sm font-display font-semibold text-primary-aaa mb-3">
              Temáticas
            </p>
            <div class="space-y-2">
              <div
                v-for="theme in data.contest.themes"
                :key="theme.name"
                class="flex items-start gap-2"
              >
                <Icon
                  icon="ph:palette-fill"
                  class="text-desert-copper text-sm mt-0.5 flex-shrink-0"
                />
                <div>
                  <p class="text-sm font-medium text-dark">{{ theme.name }}</p>
                  <p class="text-xs text-dark/75">{{ theme.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="border border-primary/20 rounded-xl p-6 md:p-8 bg-primary/10"
        >
          <p class="text-sm font-display font-semibold text-primary-aaa mb-4">
            Áreas de impacto
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              v-for="area in data.contest.impactAreas"
              :key="area.title"
              class="text-center"
            >
              <div
                class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3"
              >
                <Icon
                  icon="ph:flower-fill"
                  class="text-primary-deep text-lg"
                  aria-hidden="true"
                />
              </div>
              <p class="font-heading text-lg text-dark mb-1">
                {{ area.title }}
              </p>
              <p class="text-xs text-dark/75">{{ area.description }}</p>
              </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ===== PROYECTOS ===== -->
    <section id="proyectos" class="section-padding" aria-labelledby="proyectos-heading">
      <div class="section-container" data-reveal="proyectos">
        <div class="max-w-xl mb-14">
          <p
            class="text-xs font-display font-semibold tracking-[0.15em] text-primary-aaa mb-3"
          >
            PROGRAMAS
          </p>
          <h2 id="proyectos-heading" class="text-3xl md:text-5xl text-dark leading-[1.1]">
            Iniciativas que transforman comunidades
          </h2>
          <p class="text-dark/75 text-sm mt-2">
            Conoce nuestros programas activos y próximos lanzamientos.
          </p>
        </div>
          <div class="space-y-10">
            <article
              v-for="project in data.projects"
              :key="project.title"
              class="border border-dark/5 rounded-xl p-6 md:p-8"
            >
            <span
              class="inline-block bg-desert-copper/10 text-desert-copper text-xs font-semibold px-3 py-1 rounded-full mb-3"
              >{{ project.year }}</span
            >
            <h3 class="font-heading text-2xl text-dark mb-3">
              {{ project.title }}
            </h3>
            <p class="text-dark/80 leading-relaxed mb-4">
              {{ project.description }}
            </p>

            <!-- Long description if different -->
            <div
              v-if="
                project.longDescription &&
                project.longDescription !== project.description
              "
              class="bg-primary/[0.04] rounded-xl p-4 md:p-5 mb-5"
            >
              <p class="text-dark/70 bg-primary/50 rounded-lg p-4 text-sm leading-relaxed">
                {{ project.longDescription }}
              </p>
            </div>

            <!-- Quote (Raíces Vivas) -->
            <div
              v-if="project.quote"
              class="bg-primary/50 rounded-xl p-5 mb-5 text-center"
            >
              <Icon
                icon="ph:quotes-fill"
                class="text-primary text-xl mx-auto mb-2"
              />
              <p class="italic text-dark/90 text-sm">"{{ project.quote }}"</p>
            </div>

            <!-- Roadmap (Raíces Vivas) -->
            <div v-if="project.roadmap" class="mb-5">
              <p class="text-sm font-display font-semibold text-dark/70 mb-3">
                Hoja de ruta
              </p>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div
                  v-for="step in project.roadmap"
                  :key="step.period"
                  class="bg-dark/5 rounded-lg p-3 text-center"
                >
                  <p class="text-[10px] text-dark/70 font-medium">
                    {{ step.period }}
                  </p>
                  <p class="text-sm font-medium text-dark mt-1">
                    {{ step.milestone }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Benefits (Raíces Vivas) -->
            <div v-if="project.benefits" class="mb-4">
              <p class="text-sm font-display font-semibold text-dark/70 mb-3">
                Beneficios
              </p>
              <div class="space-y-3">
                <div
                  v-for="b in project.benefits"
                  :key="b.title"
                  class="flex gap-3"
                >
                  <Icon
                    icon="ph:check-circle-fill"
                    class="text-primary-deep text-lg mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <p class="font-medium text-dark text-sm">{{ b.title }}</p>
                    <p class="text-dark/75 text-xs">{{ b.description }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Areas (Convenio) -->
            <div
              v-if="project.areas"
              class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4"
            >
              <div
                v-for="area in project.areas"
                :key="area.title"
                class="bg-primary/50 rounded-xl p-4 text-center"
              >
                <p class="font-heading text-lg text-dark mb-1">
                  {{ area.title }}
                </p>
                <p class="text-dark/100 text-xs">{{ area.description }}</p>
              </div>
            </div>

            <!-- Launch -->
            <p
              v-if="project.launch"
              class="inline-block bg-desert-gold/10 text-desert-gold text-xs font-semibold px-3 py-1.5 rounded-full mt-2"
            >
              Lanzamiento: {{ project.launch }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <!-- ===== SÚMATE AL CAMBIO ===== -->
    <section
      id="voluntariado"
      class="section-padding bg-primary-deep"
      aria-labelledby="voluntariado-heading"
    >
      <div class="section-container" data-reveal="voluntariado">
        <div class="max-w-2xl mx-auto text-center mb-12">
          <p
            class="text-xs font-display font-semibold tracking-[0.15em] text-white/60 mb-3"
          >
            VOLUNTARIADO
          </p>
          <h2 id="voluntariado-heading" class="text-3xl md:text-5xl text-white leading-[1.1] mb-4">
            {{ data.volunteer.title }}
          </h2>
          <p class="text-white/70 text-sm font-medium mb-4">
            {{ data.volunteer.subtitle }}
          </p>
          <p class="text-white/75 leading-relaxed">
            {{ data.volunteer.description }}
          </p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
          <div
            v-for="(area, i) in data.volunteer.areas"
            :key="area.title"
            class="bg-[#B0E1CE] rounded-xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <Icon
              icon="ph:hand-heart-fill"
              class="text-2xl text-primary-deep mx-auto mb-3"
            />
            <h3 class="font-heading text-lg text-dark mb-2">
              {{ area.title }}
            </h3>
            <p class="text-dark/70 text-xs leading-relaxed">
              {{ area.description }}
            </p>
          </div>
        </div>
        <div
          class="max-w-xl mx-auto text-center bg-white/15 backdrop-blur-sm rounded-2xl p-8 md:p-10"
        >
          <Icon
            icon="ph:sparkle-fill"
            class="text-3xl text-desert-sand mx-auto mb-4"
          />
          <p class="text-white/85 leading-relaxed text-sm md:text-base italic">
            "{{ data.volunteer.callToAction }}"
          </p>
          <AppButton
            variant="secondary"
            size="lg"
            class="mt-6"
            @click="scrollTo('contacto')"
          >
            Quiero Sumarme
          </AppButton>
        </div>
      </div>
    </section>

    <!-- ===== CONTACTO ===== -->
    <section
      id="contacto"
      class="relative bg-[#F5F0E8] text-dark section-padding overflow-hidden"
      aria-labelledby="contacto-heading"
    >
      <div
        aria-hidden="true"
        class="absolute inset-0 bg-cover bg-center opacity-[0.04]"
        style="
          background-image: url(&quot;https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1920&q=80&quot;);
        "
      />
      <div class="section-container relative z-10" data-reveal="contacto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <!-- Info -->
          <div class="space-y-8">
            <div>
              <h2 id="contacto-heading" class="text-3xl md:text-5xl text-dark leading-[1.1]">
                Hablemos
              </h2>
              <p class="text-dark/75 mt-4 text-sm max-w-sm leading-relaxed">
                {{ data.contact.message }}
              </p>
            </div>
            <div class="space-y-4">
              <div
                v-for="(info, idx) in [
                  {
                    icon: 'ph:map-pin-fill',
                    label: 'Dirección',
                    value: data.global.location,
                  },
                  {
                    icon: 'ph:envelope-fill',
                    label: 'Email',
                    value: data.global.contact.email,
                  },
                ]"
                :key="info.label"
                class="flex items-center gap-4"
              >
                <Icon
                  :icon="info.icon"
                  class="text-lg flex-shrink-0"
                  aria-hidden="true"
                  :class="idx === 1 ? 'text-desert-gold' : 'text-primary-deep'"
                />
                <div>
                  <p class="text-dark/75 text-xs font-medium">
                    {{ info.label }}
                  </p>
                  <p class="text-dark/80 text-sm">{{ info.value }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form -->
          <div>
            <form @submit="onContactSubmit" novalidate class="space-y-4" aria-label="Formulario de contacto">
              <div>
                <label
                  for="cNombre"
                  class="block text-xs font-display font-semibold tracking-wider text-dark/70 mb-2"
                  >NOMBRE</label
                >
                <input
                  id="cNombre"
                  v-model="cNombre"
                  @blur="cNomBlur"
                  placeholder="Tu nombre"
                  class="w-full bg-white border border-dark/10 rounded-xl px-4 py-4 text-sm text-dark placeholder-dark/30 outline-none transition-colors focus:border-primary focus:bg-white"
                  :class="cNomErr && cNomTouch ? 'border-red-400' : ''"
                  :aria-invalid="cNomErr && cNomTouch ? 'true' : 'false'"
                  :aria-describedby="
                    cNomErr && cNomTouch ? 'cNombre-err' : null
                  "
                />
                <p
                  v-if="cNomErr && cNomTouch"
                  id="cNombre-err"
                  class="text-red-500 text-xs mt-2"
                  role="alert"
                >
                  {{ cNomErr }}
                </p>
              </div>
              <div>
                <label
                  for="cEmail"
                  class="block text-xs font-display font-semibold tracking-wider text-dark/70 mb-2"
                  >EMAIL</label
                >
                <input
                  id="cEmail"
                  v-model="cEmail"
                  @blur="cEmailBlur"
                  type="email"
                  placeholder="tu@correo.cl"
                  class="w-full bg-white border border-dark/10 rounded-xl px-4 py-4 text-sm text-dark placeholder-dark/30 outline-none transition-colors focus:border-primary focus:bg-white"
                  :class="cEmailErr && cEmailTouch ? 'border-red-400' : ''"
                  :aria-invalid="cEmailErr && cEmailTouch ? 'true' : 'false'"
                  :aria-describedby="
                    cEmailErr && cEmailTouch ? 'cEmail-err' : null
                  "
                />
                <p
                  v-if="cEmailErr && cEmailTouch"
                  id="cEmail-err"
                  class="text-red-500 text-xs mt-2"
                  role="alert"
                >
                  {{ cEmailErr }}
                </p>
              </div>
              <div>
                <label
                  for="cMensaje"
                  class="block text-xs font-display font-semibold tracking-wider text-dark/70 mb-2"
                  >MENSAJE</label
                >
                <textarea
                  id="cMensaje"
                  v-model="cMensaje"
                  @blur="cMenBlur"
                  placeholder="Escribe tu mensaje..."
                  rows="5"
                  class="w-full bg-white border border-dark/10 rounded-xl px-4 py-4 text-sm text-dark placeholder-dark/30 outline-none transition-colors focus:border-primary focus:bg-white resize-none"
                  :class="cMenErr && cMenTouch ? 'border-red-400' : ''"
                  :aria-invalid="cMenErr && cMenTouch ? 'true' : 'false'"
                  :aria-describedby="
                    cMenErr && cMenTouch ? 'cMensaje-err' : null
                  "
                ></textarea>
                <p
                  v-if="cMenErr && cMenTouch"
                  id="cMensaje-err"
                  class="text-red-500 text-xs mt-2"
                  role="alert"
                >
                  {{ cMenErr }}
                </p>
              </div>

              <Transition
                enter-active-class="transition-all duration-500"
                enter-from-class="opacity-0 scale-95"
                enter-to-class="opacity-100 scale-100"
              >
                <div
                  v-if="contactStore.success"
                  class="border border-primary/30 rounded-xl p-5 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <Icon
                    icon="ph:check-circle-fill"
                    class="text-primary-deep text-3xl mb-2"
                    aria-hidden="true"
                  />
                  <p class="text-dark font-semibold">¡Mensaje enviado!</p>
                  <p class="text-dark/75 text-sm mt-1">
                    Te responderemos a la brevedad.
                  </p>
                  <button
                    class="text-primary-deep text-sm mt-3 underline underline-offset-2"
                    @click="contactStore.resetStatus()"
                  >
                    Enviar otro
                  </button>
                </div>
              </Transition>
              <div
                v-if="contactStore.error"
                class="border border-red-400/30 rounded-xl p-4 text-center"
                role="alert"
              >
                <p class="text-red-500 text-sm">{{ contactStore.error }}</p>
              </div>

              <button
                type="submit"
                :disabled="contactStore.submitting"
                class="w-full bg-primary text-dark font-semibold rounded-xl px-6 py-4 text-sm transition-all hover:bg-primary-light disabled:opacity-40"
                :aria-busy="contactStore.submitting"
              >
                {{ contactStore.submitting ? "Enviando..." : "Enviar Mensaje" }}
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
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

[data-reveal] {
  opacity: 0;
  transform: translateY(24px);
  transition:
    opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1),
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
