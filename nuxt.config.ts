export default defineNuxtConfig({
  nitro: {
    routeRules: {
      "/api/**": { cors: true }
    }
  },

  runtimeConfig: {
    awsAccessKeyId: process.env.MY_AWS_ACCESS_KEY_ID,
    awsSecretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
    awsRegion: process.env.MY_AWS_REGION,
  }
})