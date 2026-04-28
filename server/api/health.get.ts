export default defineEventHandler(async () => {
  const statuses = ["Healthy", "Degraded", "Down"]

  return {
    service: "Admissions",
    status: statuses[Math.floor(Math.random() * statuses.length)],
    latency: Math.floor(Math.random() * 500),
    requests: Math.floor(Math.random() * 2000),
    timestamp: new Date()
  }
})