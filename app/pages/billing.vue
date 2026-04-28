<template>
  <div style="padding:20px">
    <h1>Billing Service</h1>
  </div>
</template>

<script setup>
onMounted(async () => {
  await fetch('/api/log', {
    method: 'POST',
    body: JSON.stringify({
      service: 'Billing',
      status: Math.random() > 0.7 ? 500 : 200,
      latency: Math.floor(Math.random() * 100)
    })
  })
})
</script>