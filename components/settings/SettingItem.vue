<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { type Setting, SettingDataType } from '@/types/settings'
import { useUpdateSetting } from '@/composables/useSettings'
import { Loader2, Save } from 'lucide-vue-next'

const props = defineProps<{
  setting: Setting
}>()

const { mutate: updateSetting, loading: isUpdating } = useUpdateSetting()

const value = ref<string | number | boolean>(props.setting.value)
const isDirty = ref(false)

// Sync from props if updated externally
watch(() => props.setting.value, (newVal) => {
    value.value = newVal
    isDirty.value = false
})

const formatSettingName = (key: string): string => {
  return key
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

const isBoolean = props.setting.dataType === SettingDataType.BOOLEAN
const isTrue = computed(() => String(value.value) === 'true' || value.value === true)

const handleSave = async () => {
    let valToSave = value.value
    if (props.setting.dataType === SettingDataType.NUMBER) {
        valToSave = Number(value.value)
    }

    try {
        await updateSetting({ key: props.setting.key, value: valToSave })
        isDirty.value = false
    } catch (e) {
        // Handle error (maybe toast)
        console.error("Failed to save setting", e)
        alert('Failed to save setting')
    }
}

const toggleBoolean = async () => {
    if (isUpdating.value) return
    
    const newVal = !isTrue.value
    value.value = newVal
    
    try {
        await updateSetting({ key: props.setting.key, value: String(newVal) })
        isDirty.value = false 
    } catch (e) {
        // Revert on failure
        value.value = !newVal
        console.error("Failed to toggle setting", e)
        alert('Failed to update setting')
    }
}
</script>

<template>
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      <div class="flex items-start justify-between mb-2">
        <div>
          <label class="block text-sm font-semibold text-gray-900">
            {{ formatSettingName(setting.key) }}
          </label>
          <p class="text-xs text-gray-500 mt-1">{{ setting.description }}</p>
        </div>
      </div>

      <div class="mt-3 flex items-center gap-3">
        <div v-if="isBoolean" class="flex items-center">
             <button
               type="button"
               @click="toggleBoolean"
               :class="[
                 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-navy focus:ring-offset-2',
                 isTrue ? 'bg-brand-navy' : 'bg-gray-200'
               ]"
             >
               <span
                 :class="[
                   'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                   isTrue ? 'translate-x-5' : 'translate-x-0'
                 ]"
               />
             </button>
             <span class="ml-3 text-sm text-gray-900">
                {{ isTrue ? 'Enabled' : 'Disabled' }}
                <Loader2 v-if="isUpdating" class="w-3 h-3 animate-spin inline ml-2" />
             </span>
        </div>

        <div v-else class="flex-1 flex gap-2">
             <input
               :type="setting.dataType === SettingDataType.NUMBER ? 'number' : 'text'"
               v-model="value"
               @input="isDirty = true"
               class="block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-navy focus:ring-brand-navy sm:text-sm p-2 border"
               :placeholder="setting.description"
             />
             <button
               v-if="isDirty"
               @click="handleSave"
               :disabled="isUpdating"
               class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-brand-navy hover:bg-brand-navy/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:opacity-50"
             >
                <Loader2 v-if="isUpdating" class="w-4 h-4 animate-spin" />
                <Save v-else class="w-4 h-4" />
             </button>
        </div>
      </div>
    </div>
</template>
