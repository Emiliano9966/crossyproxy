addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const target = url.searchParams.get('url')

  if (!target) {
    return new Response('Missing ?url= parameter', { status: 400 })
  }

  try {
    const response = await fetch(target)
    const newHeaders = new Headers(response.headers)
    newHeaders.set('Access-Control-Allow-Origin', '*')
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    return new Response(response.body, { status: response.status, headers: newHeaders })
  } catch (err) {
    return new Response('Error: ' + err.message, { status: 500 })
  }
}
