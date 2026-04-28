<script setup>
import { ref } from 'vue'

const school = ref('')
const selectedApp = ref('Admissions')
const message = ref('')

const apps = ['Admissions', 'Attendance', 'Billing', 'Identity']

const sendAction = async (type) => {
  if (!school.value) {
    message.value = "Enter school name"
    return
  }

  try {
    await $fetch('/api/action', {
      method: 'POST',
      body: {
        school: school.value,
        app: selectedApp.value.toLowerCase(), // 🔥 IMPORTANT
        action: type
      }
    })

    message.value = `${selectedApp.value} ${
      type === 'error' ? 'failed ❌' : 'used successfully ✅'
    }`
  } catch (err) {
    console.error(err)
    message.value = "Something went wrong"
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-center justify-center">
    <div class="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">

      <h1 class="text-2xl font-bold text-center mb-6">
        Dummy School App
      </h1>

      <input
        v-model="school"
        placeholder="Enter School Name"
        class="w-full border rounded-lg p-2 mb-4"
      />

      <select v-model="selectedApp" class="w-full border rounded-lg p-2 mb-4">
        <option v-for="app in apps" :key="app">{{ app }}</option>
      </select>

      <div class="flex gap-3 mb-4">
        <button @click="sendAction('use')" class="flex-1 bg-green-500 text-white py-2 rounded-lg">
          Use App
        </button>

        <button @click="sendAction('error')" class="flex-1 bg-red-500 text-white py-2 rounded-lg">
          Generate Error
        </button>
      </div>

      <p class="text-center text-sm text-gray-600">
        {{ message }}
      </p>

    </div>
  </div>
</template>