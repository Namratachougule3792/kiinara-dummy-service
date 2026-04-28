export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],

  css: ['@/assets/css/main.css'],

  runtimeConfig: {
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.AWS_REGION || 'ap-south-1',
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_KEY,
    public: {
      monitoringUrl: process.env.MONITORING_URL || 'https://main.d1o8f3eh3hg0bw.amplifyapp.com'
    }
  },

  nitro: {
    preset: 'aws_amplify'
  },

  compatibilityDate: '2026-04-28'
})