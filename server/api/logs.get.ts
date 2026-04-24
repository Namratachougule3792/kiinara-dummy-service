import { state } from './state'

export default defineEventHandler((event) => {
  const query = getQuery(event)

  const school = query.school as string
  const service = query.service as string

  return state.schools[school]?.[service]?.logs || []
})