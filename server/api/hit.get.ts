import { state } from './state'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const service = (query.service as string) || "Admissions"
  const school = (query.school as string) || "School A"

  const s = state.schools[school]?.[service]

  if (!s) return { error: "Invalid" }

  s.requests++
  s.cost += 0.05

  const fail = Math.random() < 0.3

  if (fail) {
    s.errors++
    s.logs.unshift({
      time: new Date().toISOString(),
      message: `${service} failure`
    })

    throw createError({ statusCode: 500 })
  }

  return { success: true }
})