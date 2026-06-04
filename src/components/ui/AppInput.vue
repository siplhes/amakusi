<script setup>
import { computed } from "vue";
import { Icon } from "@iconify/vue";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, default: null },
  type: { type: String, default: "text" },
  placeholder: { type: String, default: "" },
  icon: { type: String, default: null },
  textarea: { type: Boolean, default: false },
  rows: { type: Number, default: 4 },
  modelValue: { type: [String, Number], default: "" },
  errors: { type: String, default: "" },
  touched: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue", "blur"]);

const handleInput = (e) => emit("update:modelValue", e.target.value);
const handleBlur = (e) => emit("blur", e);

const hasError = props.errors && props.touched;
const errorId = computed(() => props.name + "-err");
</script>

<template>
  <div class="space-y-1.5">
    <label v-if="label" :for="name" class="block text-sm font-medium text-dark">
      {{ label }}
      <span v-if="required" class="text-red-600">*</span>
    </label>

    <div class="relative">
      <div
        v-if="icon"
        class="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
        :class="hasError ? 'text-red-600' : 'text-dark/30'"
      >
        <Icon :icon="icon" class="text-lg" aria-hidden="true" />
      </div>

      <textarea
        v-if="textarea"
        :id="name"
        :name="name"
        :value="modelValue"
        :placeholder="placeholder"
        :rows="rows"
        :required="required || undefined"
        :aria-invalid="hasError ? 'true' : 'false'"
        :aria-describedby="hasError ? errorId : null"
        class="w-full rounded-xl border bg-white px-4 py-3 text-sm font-body text-dark placeholder-dark/20 transition-all duration-200 outline-none resize-none"
        :class="[
          icon ? 'pl-11' : '',
          hasError
            ? 'border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100'
            : 'border-dark/10 focus:border-primary focus:ring-2 focus:ring-primary/15',
        ]"
        @input="handleInput"
        @blur="handleBlur"
      />
      <input
        v-else
        :id="name"
        :name="name"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required || undefined"
        :aria-invalid="hasError ? 'true' : 'false'"
        :aria-describedby="hasError ? errorId : null"
        class="w-full rounded-xl border bg-white px-4 py-3 text-sm font-body text-dark placeholder-dark/20 transition-all duration-200 outline-none"
        :class="[
          icon ? 'pl-11' : '',
          hasError
            ? 'border-red-400 focus:border-red-600 focus:ring-2 focus:ring-red-100'
            : 'border-dark/10 focus:border-primary focus:ring-2 focus:ring-primary/15',
        ]"
        @input="handleInput"
        @blur="handleBlur"
      />
    </div>

    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
    >
      <p
        v-if="hasError"
        :id="errorId"
        class="text-red-600 text-xs font-medium flex items-center gap-1"
        role="alert"
      >
        <Icon
          icon="ph:warning-circle-fill"
          class="text-sm"
          aria-hidden="true"
        />
        {{ errors }}
      </p>
    </Transition>
  </div>
</template>
