<script setup>
import { ref } from 'vue'

const school = ref('')
const service = ref('Admissions')

const sendLog = async (status) => {
  await fetch('https://main.d1o8f3eh3hg0bw.amplifyapp.com/api/collect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      school: school.value,
      service: service.value,
      status,
      latency: Math.floor(Math.random() * 300)
    })
  })

  alert("Log sent 🚀")
}
</script>

<template>
<div class="min-h-screen bg-gray-900 text-white flex items-center justify-center">

  <div class="bg-gray-800 p-8 rounded-xl shadow-lg w-[400px]">

    <h1 class="text-2xl font-bold mb-6 text-center">
      Dummy School App
    </h1>

    <!-- SCHOOL INPUT -->
    <input 
      v-model="school" 
      placeholder="Enter School Name"
      class="w-full p-2 mb-4 rounded bg-gray-700 border border-gray-600 focus:outline-none"
    />

    <!-- SERVICE SELECT -->
    <select 
      v-model="service"
      class="w-full p-2 mb-6 rounded bg-gray-700 border border-gray-600"
    >
      <option>Admissions</option>
      <option>Attendance</option>
      <option>Billing</option>
      <option>Identity</option>
    </select>

    <!-- BUTTONS -->
    <div class="flex gap-3">

      <button 
        @click="sendLog(200)"
        class="flex-1 bg-green-500 hover:bg-green-600 p-2 rounded font-semibold"
      >
        Healthy
      </button>

      <button 
        @click="sendLog(500)"
        class="flex-1 bg-red-500 hover:bg-red-600 p-2 rounded font-semibold"
      >
        Error
      </button>

    </div>

  </div>

</div>
</template>