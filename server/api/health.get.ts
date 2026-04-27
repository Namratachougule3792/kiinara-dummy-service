export default defineEventHandler(() => {
  const statuses = ["Healthy", "Degraded", "Down"];

  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    status: randomStatus,
    latency: Math.floor(Math.random() * 500),
    requests: Math.floor(Math.random() * 2000),
    timestamp: new Date()
  };
});
