import { sendLog } from '~/utils/cloudwatch'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { school, app, action } = body

  let status = "Healthy"

  if (action === "error") {
    status = "Down"
  }

  const data = {
    school,
    service: app,
    status,
    latency: Math.floor(Math.random() * 500),
    requests: Math.floor(Math.random() * 2000),
    timestamp: new Date()
  }

  await sendLog(data, config)

  return {
    message: `${app} ${action === "error" ? "failed" : "used"} successfully`,
    data
  }
})