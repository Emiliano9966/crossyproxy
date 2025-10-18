addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Handles incoming requests and proxies them
 * @param {Request} request
 */
async function handleRequest(request) {
  const url = new URL(request.url)
  const target = url.searchParams.get('url') // ?url=https://example.com

  if (!target) {
    return new Response('Missing URL parameter. Use ?url=https://example.com', { status: 400 })
  }

  try {
    const response = await fetch(target, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
      redirect: 'manual'
    })

    // Clone the response so we can modify headers
    const newHeaders = new Headers(response.headers)
    // Allow all origins (CORS)
    newHeaders.set('Access-Control-Allow-Origin', '*')
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    newHeaders.set('Access-Control-Allow-Headers', '*')

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    })
  } catch (err) {
    return new Response('Error fetching URL: ' + err.message, { status: 500 })
  }
}
