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
}
</script>

<template>
<div style="padding:40px">

<h2>Dummy School App</h2>

<input v-model="school" placeholder="Enter School Name" />

<select v-model="service">
  <option>Admissions</option>
  <option>Attendance</option>
  <option>Billing</option>
  <option>Identity</option>
</select>

<br/><br/>

<button @click="sendLog(200)">Send Healthy</button>
<button @click="sendLog(500)">Send Error</button>

</div>
</template>