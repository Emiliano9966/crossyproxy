document.getElementById('proxyForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const url = document.getElementById('urlInput').value;
  if (url) {
    window.location.href = '/proxy?url=' + encodeURIComponent(url);
  }
});
