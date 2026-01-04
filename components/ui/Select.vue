<script setup lang="ts">
import { cn } from "@/utils";

interface Props {
  modelValue?: string | number | null;
  label?: string;
  error?: string;
  id?: string;
  options: { label: string; value: string | number }[];
  placeholder?: string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  disabled: false,
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event: Event) => {
  emit("update:modelValue", (event.target as HTMLSelectElement).value);
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
      <select
        :id="id"
        :value="modelValue"
        :disabled="disabled"
        @change="updateValue"
        :class="cn(
          'block w-full px-3 py-2 bg-white text-black border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-brand-cyan focus:border-brand-cyan text-base disabled:bg-gray-100 disabled:text-gray-500',
          !modelValue && 'text-gray-400',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
          $attrs.class as string
        )"
      >
        <option v-if="placeholder" value="" disabled selected>
          {{ placeholder }}
        </option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
          class="text-black"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>
