<script setup>
import { ref } from 'vue'

const school = ref('')
const service = ref('Admissions')
const loadingHealthy = ref(false)
const loadingError = ref(false)
const lastResult = ref(null)

// Hardcode the monitoring URL directly — no server route needed
const MONITORING_URL = 'https://main.d1o8f3eh3hg0bw.amplifyapp.com'

const sendLog = async (statusCode) => {
  if (!school.value.trim()) {
    alert('Please enter a school name first!')
    return
  }

  if (statusCode === 200) loadingHealthy.value = true
  else loadingError.value = true

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

    const text = await res.text()
    let data: any = {}
    try { data = JSON.parse(text) } catch (_) {}

    if (data.success === true) {
      lastResult.value = {
        type: statusCode === 200 ? 'success' : 'error',
        message: statusCode === 200
          ? `✅ Healthy log sent for "${payload.school}" → ${service.value}`
          : `🔴 Error log sent for "${payload.school}" → ${service.value}`
      }
    } else {
      lastResult.value = {
        type: 'error',
        message: `Failed: ${data.error || data.message || text.slice(0, 100) || 'Unknown error'}`
      }
    }
  } catch (err: any) {
    lastResult.value = { type: 'error', message: `Network error: ${err.message}` }
  } finally {
    if (statusCode === 200) loadingHealthy.value = false
    else loadingError.value = false
  }
}
</script>

<template>
<div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">
  <div class="bg-gray-800 p-8 rounded-xl shadow-lg w-[420px]">

    <h1 class="text-2xl font-bold mb-2 text-center">Dummy School App</h1>
    <p class="text-gray-400 text-sm text-center mb-6">Generate logs for the monitoring dashboard</p>

    <label class="block text-sm text-gray-400 mb-1">School Name</label>
    <input
      v-model="school"
      placeholder="e.g. Springfield High"
      class="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-400"
    />

    <label class="block text-sm text-gray-400 mb-1">Service</label>
    <select
      v-model="service"
      class="w-full p-2 mb-6 rounded bg-gray-700 border border-gray-600 focus:outline-none"
    >
      <option value="Admissions">Admissions</option>
      <option value="Attendance">Attendance</option>
      <option value="Billing">Billing</option>
      <option value="Identity">Identity</option>
    </select>

    <div class="flex gap-3">
      <button
        type="button"
        :disabled="loadingHealthy || loadingError"
        @click.prevent="sendLog(200)"
        class="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded font-semibold transition-colors"
      >
        {{ loadingHealthy ? 'Sending...' : '✅ Generate Healthy' }}
      </button>

      <button
        type="button"
        :disabled="loadingHealthy || loadingError"
        @click.prevent="sendLog(500)"
        class="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed p-3 rounded font-semibold transition-colors"
      >
        {{ loadingError ? 'Sending...' : '🔴 Generate Error' }}
      </button>
    </div>

    <div
      v-if="lastResult"
      :class="lastResult.type === 'success' ? 'bg-green-900 border-green-500' : 'bg-red-900 border-red-500'"
      class="mt-4 p-3 rounded border text-sm"
    >
      {{ lastResult.message }}
    </div>

  </div>
</div>
</template>