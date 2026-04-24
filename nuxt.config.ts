export default defineNuxtConfig({
  nitro: {
    routeRules: {
      "/api/**": { cors: true }
    }
  }
})