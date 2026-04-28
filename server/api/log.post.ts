import pkg from '@prisma/client'

const prisma = new (pkg as any).PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { service, status, latency } = body

  try {
    await prisma.logs.create({
      data: {
        service,
        status,
        latency
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Log insert error:', error)
    return { success: false }
  }
})