export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const config = useRuntimeConfig()

  const monitoringUrl = config.monitoringUrl

  if (!monitoringUrl) {
    return { error: 'MONITORING_URL env var not set in dummy app' }
  }

  try {
    const res = await fetch(`${monitoringUrl}/api/collect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    const text = await res.text()

    let data: any = {}
    try {
      data = JSON.parse(text)
    } catch (_) {
      console.error('Non-JSON response from monitoring app:', text)
      return { error: `Monitoring app returned non-JSON: ${text.slice(0, 200)}` }
    }

    console.log('Monitoring app response:', JSON.stringify(data))
    return data

  } catch (err: any) {
    console.error('Forward to monitoring failed:', err.message)
    return { error: err.message || 'Failed to forward log' }
  }
})