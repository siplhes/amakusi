<script setup>
import { computed } from 'vue'

const props = defineProps({
  padding: { type: String, default: 'p-6 md:p-8' },
  shadow: { type: String, default: 'shadow-sm' },
  hover: { type: Boolean, default: false },
  variant: { type: String, default: 'white', validator: (v) => ['white', 'cream', 'sage', 'desert'].includes(v) },
  ariaLabel: { type: String, default: null },
})

const isLandmark = computed(() => !!props.ariaLabel)
</script>

<template>
  <div
    class="rounded-2xl border border-dark/5 transition-all duration-300"
    :class="[variantClasses[variant], padding, shadow, hover ? 'hover:shadow-md hover:-translate-y-0.5 hover:border-dark/10' : '']"
    :role="isLandmark ? 'region' : null"
    :aria-label="ariaLabel"
  >
    <slot />
  </div>
</template>
