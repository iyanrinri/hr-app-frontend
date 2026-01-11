// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/google-fonts'
  ],
  googleFonts: {
    families: {
      Inter: [400, 500, 600, 700, 800],
    },
    display: 'swap',
  },

  css: ['~/assets/css/main.css'],

  runtimeConfig: {
    public: {
      socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || '',
      apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://hr-backend.bromn.biz.id',
    }
  },
  routeRules: {
    '/api/**': {
      proxy: process.env.NEXT_PUBLIC_API_URL 
        ? `${process.env.NEXT_PUBLIC_API_URL}/**` 
        : 'https://hr-backend.bromn.biz.id/**',
    },
    '/socket.io/**': {
      proxy: process.env.NEXT_PUBLIC_SOCKET_URL 
        ? `${process.env.NEXT_PUBLIC_SOCKET_URL}/socket.io/**`
        : 'https://hr-backend.bromn.biz.id/socket.io/**'
    }
  },
  build: {
    transpile: ['lucide-vue-next']
  },
  compatibilityDate: '2025-01-03'
})
