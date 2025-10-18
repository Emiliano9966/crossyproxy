document.getElementById('goBtn').addEventListener('click', () => {
  const url = document.getElementById('urlInput').value
  if (!url) return alert("Enter a URL!")

  window.open(`https://crossyproxy.workers.dev?url=${encodeURIComponent(url)}`, '_blank')
})
