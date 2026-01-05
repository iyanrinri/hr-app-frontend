<script setup lang="ts">
import { ref } from 'vue'
import { 
  Building2, 
  Calendar, 
  Shield, 
  Bell, 
  Settings as SettingsIcon,
  Loader2
} from 'lucide-vue-next'
import { SettingCategory } from '@/types/settings'
import { useInitializeSettings } from '@/composables/useSettings'
import SettingsTabContent from '@/components/settings/SettingsTabContent.vue'

const tabs = [
  { id: SettingCategory.GENERAL, label: 'General', icon: SettingsIcon },
  { id: SettingCategory.COMPANY, label: 'Company', icon: Building2 },
  { id: SettingCategory.ATTENDANCE, label: 'Attendance', icon: Calendar },
  { id: SettingCategory.NOTIFICATION, label: 'Notifications', icon: Bell },
  { id: SettingCategory.SECURITY, label: 'Security', icon: Shield },
]

const activeTab = ref<SettingCategory>(SettingCategory.GENERAL)
const { mutate: initializeSettings, loading: isInitializing } = useInitializeSettings()

const handleInitialize = async () => {
    try {
        await initializeSettings()
    } catch (e) {
        // error handled in composable/toast
    }
}

definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 bg-white rounded-t-lg">
      <div class="flex items-center justify-between px-6 py-4">
        <!-- Tab Navigation -->
        <nav class="flex space-x-4 overflow-x-auto no-scrollbar" aria-label="Tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[
              'flex items-center px-3 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors',
              activeTab === tab.id
                ? 'bg-brand-light text-brand-navy'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            ]"
          >
            <component :is="tab.icon" class="w-4 h-4 mr-2" />
            {{ tab.label }}
          </button>
        </nav>

        <!-- Init Defaults Button -->
        <button
           @click="handleInitialize"
           :disabled="isInitializing"
           class="ml-4 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-navy disabled:opacity-50 inline-flex items-center"
        >
           <Loader2 v-if="isInitializing" class="w-4 h-4 animate-spin mr-2" />
           Initialize Defaults
        </button>
      </div>
    </div>

    <div class="p-6 bg-white rounded-b-lg shadow-sm border border-t-0 border-gray-200">
      <SettingsTabContent :category="activeTab" />
    </div>
  </div>
</template>
