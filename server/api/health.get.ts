export default defineEventHandler(async () => {
  const statuses = ['operational', 'degraded', 'outage']

  const currentStatus =
    statuses[Math.floor(Math.random() * statuses.length)]

  return {
    service: 'dummy-school-app',
    status: currentStatus,
    latency: Math.floor(Math.random() * 500),
    requests: Math.floor(Math.random() * 2000),
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  }
})
