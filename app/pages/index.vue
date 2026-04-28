<script setup>
import { ref } from 'vue'

const school = ref('')
const service = ref('Admissions')
const loading = ref(false)
const lastResult = ref(null)

const MONITORING_URL = 'https://main.d1o8f3eh3hg0bw.amplifyapp.com'

const sendLog = async (statusCode) => {
  if (!school.value.trim()) {
    alert('Please enter a school name first!')
    return
  }

  loading.value = true
  lastResult.value = null

  const payload = {
    school: school.value.trim(),
    service: service.value,
    status: statusCode,
    latency: Math.floor(Math.random() * 300) + 50
  }

  try {
    const res = await fetch(`${MONITORING_URL}/api/collect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (data.error) {
      lastResult.value = { type: 'error', message: data.error }
    } else {
      lastResult.value = {
        type: statusCode === 200 ? 'success' : 'error',
        message:
          statusCode === 200
            ? `✅ Healthy log sent`
            : `🔴 Error log sent`
      }
    }
  } catch (err) {
    lastResult.value = {
      type: 'error',
      message: `Network error: ${err.message}`
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
<div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
  <div class="bg-gray-800 p-8 rounded-xl w-[400px]">

    <input v-model="school" placeholder="School" class="w-full p-2 mb-4 bg-gray-700 rounded" />

    <select v-model="service" class="w-full p-2 mb-4 bg-gray-700 rounded">
      <option>Admissions</option>
      <option>Attendance</option>
      <option>Billing</option>
      <option>Identity</option>
    </select>

    <div class="flex gap-2">
      <button @click="sendLog(200)" class="bg-green-600 p-2 rounded w-full">Healthy</button>
      <button @click="sendLog(500)" class="bg-red-600 p-2 rounded w-full">Error</button>
    </div>

    <p v-if="lastResult" class="mt-4">{{ lastResult.message }}</p>

  </div>
</div>
</template>