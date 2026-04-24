import { state } from './state'

export default defineEventHandler(() => {
  const result: any[] = []

  for (const school in state.schools) {
    for (const name in state.schools[school]) {
      const s = state.schools[school][name]

      let status = "Healthy"
      if (s.errors > 20) status = "Down"
      else if (s.errors > 5) status = "Degraded"

      result.push({
        school,
        name,
        requests: s.requests,
        errors: s.errors,
        cost: s.cost.toFixed(2),
        status
      })
    }
  }

  return result
})