<script setup lang="ts">
import { cn } from "@/utils";

interface Props {
  modelValue?: string | number;
  label?: string;
  error?: string;
  helperText?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  autocomplete?: string;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  type: "text",
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-bold text-gray-900 mb-1"
    >
      {{ label }}
    </label>
    <div class="relative">
      <div
        v-if="$slots.icon"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="icon" />
      </div>
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :autocomplete="autocomplete"
        @input="updateValue"
        :class="cn(
          'block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400',
          $slots.icon && 'pl-10',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          $attrs.class as string
        )"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="helperText" class="mt-1 text-xs text-gray-500">
      {{ helperText }}
    </p>
  </div>
</template>
