<script setup>
import { Icon } from '@iconify/vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'outline', 'ghost', 'desert'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: { type: Boolean, default: false },
  loading: { type: Boolean, default: false },
  icon: { type: String, default: null },
  iconPosition: { type: String, default: 'left', validator: (v) => ['left', 'right'].includes(v) },
  type: { type: String, default: 'button' },
})

const emit = defineEmits(['click'])

const sizeClasses = {
  sm: 'px-5 py-2 text-xs',
  md: 'px-7 py-3 text-sm',
  lg: 'px-9 py-3.5 text-base',
}

const variantClasses = {
  primary:
    'bg-primary text-dark hover:bg-primary-light active:bg-primary shadow-lg shadow-primary/25 hover:shadow-primary/40',
  secondary:
    'bg-dark text-white hover:bg-dark-light active:bg-dark shadow-lg',
  desert:
    'bg-desert-sand text-dark hover:bg-desert-gold active:bg-desert-copper shadow-lg shadow-desert-sand/25',
  outline:
    'border-2 border-primary text-primary hover:bg-primary hover:text-dark active:bg-primary-light',
  ghost:
    'text-white/80 hover:bg-white/10 hover:text-white active:bg-white/20',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2.5 rounded-full font-body font-semibold transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
    :class="[sizeClasses[size], variantClasses[variant]]"
    @click="emit('click')"
  >
    <Icon v-if="loading" icon="ph:spinner-fill" class="animate-spin text-lg" aria-hidden="true" />
    <Icon v-else-if="icon && iconPosition === 'left'" :icon="icon" class="text-lg flex-shrink-0" aria-hidden="true" />
    <span><slot /></span>
    <Icon v-if="icon && iconPosition === 'right'" :icon="icon" class="text-lg flex-shrink-0" aria-hidden="true" />
  </button>
</template>
