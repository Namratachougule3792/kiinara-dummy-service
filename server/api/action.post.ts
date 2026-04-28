import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { school, app, action } = body

  const status = action === "error" ? "error" : "success"

  const logData = {
    school,
    service: app,              // admissions, billing etc
    status,
    latency: Math.floor(Math.random() * 500),
    createdAt: new Date()
  }

  const { error } = await supabase.from('Log').insert([logData])

  if (error) {
    console.error("DB Error:", error)
    return { success: false }
  }

  return {
    success: true,
    data: logData
  }
})