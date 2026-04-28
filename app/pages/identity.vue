<template>
  <div style="padding:20px">
    <h1>Identity Service</h1>
  </div>
</template>

<script setup>
onMounted(async () => {
  await fetch('/api/log', {
    method: 'POST',
    body: JSON.stringify({
      service: 'Identity',
      status: 200,
      latency: Math.floor(Math.random() * 50)
    })
  })
})
</script>