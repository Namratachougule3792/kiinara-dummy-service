export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)

    console.log("LOG RECEIVED:", body)

    return { success: true }
  } catch (err) {
    console.error(err)
    return { success: false }
  }
})