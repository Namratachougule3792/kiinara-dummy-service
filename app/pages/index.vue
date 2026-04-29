<script setup>
import { ref } from 'vue'

const school = ref('')
const service = ref('Admissions')
const loading = ref(false)
const lastResult = ref(null)

// Your monitoring app URL — no trailing slash
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
    status: statusCode,
    latency: Math.floor(Math.random() * 300) + 50
  }

  try {
    const res = await fetch(`${MONITORING_URL}/api/collect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      const text = await res.text()
      lastResult.value = { type: 'error', message: `Server error ${res.status}: ${text}` }
      return
    }

    const data = await res.json()

    if (data.error) {
      lastResult.value = { type: 'error', message: `Failed: ${data.error}` }
    } else {
      lastResult.value = {
        type: statusCode === 200 ? 'success' : 'warning',
        message: statusCode === 200
          ? `✅ Healthy log sent! School: "${payload.school}" | Service: ${service.value}`
          : `🔴 Error log sent! School: "${payload.school}" | Service: ${service.value}`
      }
    }
  } catch (err) {
    lastResult.value = {
      type: 'error',
      message: `Network error: ${err.message}. Check MONITORING_URL and CORS settings.`
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
<div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
  <div class="bg-gray-800 p-8 rounded-xl shadow-lg w-[440px]">

    <h1 class="text-2xl font-bold mb-1 text-center">Dummy School App</h1>
    <p class="text-gray-400 text-sm text-center mb-6">Generate logs for the monitoring dashboard</p>

    <label class="block text-sm text-gray-400 mb-1">School Name</label>
    <input
      v-model="school"
      placeholder="e.g. Springfield High"
      class="w-full p-3 mb-4 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-400 text-white"
    />

    <label class="block text-sm text-gray-400 mb-1">Service</label>
    <select
      v-model="service"
      class="w-full p-3 mb-6 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none text-white"
    >
      <option value="Admissions">Admissions</option>
      <option value="Attendance">Attendance</option>
      <option value="Billing">Billing</option>
      <option value="Identity">Identity</option>
    </select>

    <div class="flex gap-3">
      <button
        type="button"
        :disabled="loading"
        @click.prevent="sendLog(200)"
        class="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-lg font-semibold transition-colors"
      >
        {{ loading ? 'Sending...' : '✅ Generate Healthy' }}
      </button>

      <button
        type="button"
        :disabled="loading"
        @click.prevent="sendLog(500)"
        class="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded-lg font-semibold transition-colors"
      >
        {{ loading ? 'Sending...' : '🔴 Generate Error' }}
      </button>
    </div>

    <div
      v-if="lastResult"
      :class="{
        'bg-green-900 border-green-600': lastResult.type === 'success',
        'bg-yellow-900 border-yellow-600': lastResult.type === 'warning',
        'bg-red-900 border-red-600': lastResult.type === 'error'
      }"
      class="mt-4 p-3 rounded-lg border text-sm"
    >
      {{ lastResult.message }}
    </div>

  </div>
</div>
</template>