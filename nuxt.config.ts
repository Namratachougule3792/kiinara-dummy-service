export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  css: ['@/assets/css/main.css'],

  runtimeConfig: {
    public: {
      monitoringUrl: process.env.MONITORING_URL || 'https://main.d1o8f3eh3hg0bw.amplifyapp.com'
    }
  },

  nitro: {
    preset: 'aws_amplify',
    // CORS headers so monitoring app can call back if needed
    routeRules: {
      '/api/**': {
        cors: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type,Authorization'
        }
      }
    }
  },

  compatibilityDate: '2026-04-28'
})