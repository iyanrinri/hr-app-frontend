export default defineEventHandler(async (event) => {
  // Get the target URL from runtime config or hardcoded for now
  const config = useRuntimeConfig()
  const targetUrl = config.public.apiUrl || 'https://hr-backend.bromn.biz.id'
  
  // Get the path after /api
  const path = event.path.replace(/^\/api/, '')
  
  // Construct the full URL
  const url = `${targetUrl}${path}`
  
  console.log(`[Proxy] Request: ${event.path} -> ${url}`)

  return proxyRequest(event, url)
})
