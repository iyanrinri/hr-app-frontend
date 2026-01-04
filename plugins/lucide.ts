import { defineNuxtPlugin } from '#app'
import * as LucideIcons from 'lucide-vue-next'

export default defineNuxtPlugin((nuxtApp) => {
  // Register all icons globally or select specific ones
  // For simplicity during migration, we register all. 
  // In prod we might want to be more selective or rely on tree-shaking but explicit registration fixes the hydration issue.
  for (const [name, component] of Object.entries(LucideIcons)) {
    nuxtApp.vueApp.component(name, component)
  }
})
