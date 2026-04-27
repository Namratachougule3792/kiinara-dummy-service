import { sendLog } from '~/utils/cloudwatch'

export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  const statuses = ["Healthy", "Degraded", "Down"];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  const data = {
    service: "Admissions",
    status: randomStatus,
    latency: Math.floor(Math.random() * 500),
    requests: Math.floor(Math.random() * 2000),
    timestamp: new Date()
  };

  //  pass config here
  await sendLog(data, config)

  return data;
});