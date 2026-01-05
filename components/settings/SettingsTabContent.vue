<script setup lang="ts">
import { computed } from 'vue'
import { useSettings, useUpdateSetting } from '@/composables/useSettings'
import { SettingCategory } from '@/types/settings'
import { Loader2 } from 'lucide-vue-next'
import SettingItem from './SettingItem.vue'
import AttendanceMap from './AttendanceMap.vue'

const props = defineProps<{
  category: SettingCategory
}>()

const { data: response, loading, error } = useSettings(1, 100, computed(() => props.category))
const { mutate: updateSetting } = useUpdateSetting()

const settings = computed(() => response.value?.data || [])

const locationKeys = ['attendance_checkpoint_lat', 'attendance_checkpoint_lng', 'attendance_checkpoint_radius', 'attendance_checkpoint_address']
const showMap = computed(() => props.category === SettingCategory.ATTENDANCE)

const latSetting = computed(() => settings.value.find(s => s.key === 'attendance_checkpoint_lat'))
const lngSetting = computed(() => settings.value.find(s => s.key === 'attendance_checkpoint_lng'))
const radiusSetting = computed(() => settings.value.find(s => s.key === 'attendance_checkpoint_radius'))
const addressSetting = computed(() => settings.value.find(s => s.key === 'attendance_checkpoint_address'))

const otherSettings = computed(() => showMap.value 
    ? settings.value.filter(s => !locationKeys.includes(s.key))
    : settings.value
)

const onLocationSelect = async (lat: number, lng: number) => {
    try {
        await updateSetting({ key: 'attendance_checkpoint_lat', value: String(lat) })
        await updateSetting({ key: 'attendance_checkpoint_lng', value: String(lng) })
    } catch (e) {
        console.error("Failed to update location settings", e)
        alert("Failed to save location")
    }
}
</script>

<template>
  <div class="space-y-6 max-w-4xl">
    <div v-if="loading" class="flex justify-center items-center h-64">
        <Loader2 class="w-8 h-8 animate-spin text-brand-navy" />
    </div>

    <div v-else-if="error" class="text-center text-red-500 py-8">
        Failed to load settings. Please try again.
    </div>

    <template v-else>
        <div v-if="settings.length === 0">
            <p class="text-gray-500 italic">No settings found for this category.</p>
        </div>
        <div v-else class="grid gap-6">
             <SettingItem v-for="setting in otherSettings" :key="`${setting.id}-${setting.value}`" :setting="setting" />
        </div>

        <div v-if="showMap" class="mt-8 border-t pt-8">
            <h3 class="text-lg font-medium text-brand-navy mb-6">Attendance Check Point</h3>
            
            <div class="mb-6 grid gap-6">
                <!-- Inputs for manual editing -->
                <SettingItem v-if="addressSetting" :key="`${addressSetting.id}-${addressSetting.value}`" :setting="addressSetting" />
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <SettingItem v-if="latSetting" :key="`${latSetting.id}-${latSetting.value}`" :setting="latSetting" />
                     <SettingItem v-if="lngSetting" :key="`${lngSetting.id}-${lngSetting.value}`" :setting="lngSetting" />
                </div>
                 <SettingItem v-if="radiusSetting" :key="`${radiusSetting.id}-${radiusSetting.value}`" :setting="radiusSetting" />
            </div>

            <div class="rounded-lg overflow-hidden border border-gray-200">
                <AttendanceMap 
                   :latitude="parseFloat(String(latSetting?.value || '0'))"
                   :longitude="parseFloat(String(lngSetting?.value || '0'))"
                   :radius="parseFloat(String(radiusSetting?.value || '100'))"
                   @locationSelect="onLocationSelect"
                />
            </div>
        </div>
    </template>
  </div>
</template>
