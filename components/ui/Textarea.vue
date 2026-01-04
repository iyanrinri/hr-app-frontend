<script setup lang="ts">
import { cn } from "@/utils";

interface Props {
  modelValue?: string | number | null;
  label?: string;
  error?: string;
  id?: string;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  disabled: false,
  rows: 3,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
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
    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :rows="rows"
      @input="updateValue"
      :class="cn(
        'block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base disabled:bg-gray-100 disabled:text-gray-500 placeholder:text-gray-400',
        error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
        $attrs.class as string
      )"
    ></textarea>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
