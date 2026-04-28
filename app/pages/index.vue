<script setup>
import { ref } from 'vue'

const school = ref('')
const service = ref('Admissions')
const loading = ref(false)
const lastResult = ref(null)

// ⚠️ IMPORTANT: use CURRENT monitoring app URL
const MONITORING_URL = 'https://main.d1o8f3eh3hg0bw.amplifyapp.com'
const sendLog = async (statusCode) => {
  if (!school.value.trim()) {
    alert('Enter school name')
    return
  }

  loading.value = true
  lastResult.value = null

  const payload = {
    school: school.value.trim(),
    service: service.value,
    status: statusCode, // 200 / 500
    latency: Math.floor(Math.random() * 300) + 50
  }

  try {
    const res = await fetch(`${MONITORING_URL}/api/collect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (data.error) throw new Error(data.error)

    lastResult.value = {
      type: statusCode === 200 ? 'success' : 'error',
      message: statusCode === 200 ? 'Healthy sent' : 'Error sent'
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
<div class="flex items-center justify-center min-h-screen bg-gray-900 text-white">
  <div class="bg-gray-800 p-6 rounded w-[350px]">

    <input v-model="school" placeholder="School"
      class="w-full mb-3 p-2 bg-gray-700 rounded" />

    <select v-model="service" class="w-full mb-3 p-2 bg-gray-700 rounded">
      <option>Admissions</option>
      <option>Attendance</option>
      <option>Billing</option>
      <option>Identity</option>
    </select>

    <div class="flex gap-2">
      <button @click="sendLog(200)" class="bg-green-600 p-2 w-full rounded">Healthy</button>
      <button @click="sendLog(500)" class="bg-red-600 p-2 w-full rounded">Error</button>
    </div>

    <p v-if="lastResult" class="mt-3 text-sm">{{ lastResult.message }}</p>

  </div>
</div>
</template>