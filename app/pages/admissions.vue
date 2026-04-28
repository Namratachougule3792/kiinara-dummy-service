<template>
  <div style="padding:20px">
    <h1>Admissions Service</h1>
  </div>
</template>

<script setup>
onMounted(async () => {
  await fetch('/api/log', {
    method: 'POST',
    body: JSON.stringify({
      service: 'Admissions',
      status: Math.random() > 0.8 ? 500 : 200,
      latency: Math.floor(Math.random() * 100)
    })
  })
})
</script>