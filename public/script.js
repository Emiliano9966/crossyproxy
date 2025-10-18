import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDwnE0FdRq3bIm3fc6z4A4IvuO_xuynqiY",
  authDomain: "crossyproxy.firebaseapp.com",
  projectId: "crossyproxy",
  storageBucket: "crossyproxy.firebasestorage.app",
  messagingSenderId: "374353896415",
  appId: "1:374353896415:web:1dd25f3e27e32c7a6a9a6a",
  measurementId: "G-KM02Z2CYS2"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

const goBtn = document.getElementById('goBtn');
const urlInput = document.getElementById('urlInput');
const frame = document.getElementById('proxyFrame');

// Replace this with your deployed Firebase function URL
const PROXY_API = '/api/proxy';

goBtn.addEventListener('click', async () => {
  const targetUrl = urlInput.value.trim();
  if (!targetUrl.startsWith('http')) {
    alert('Please enter a valid URL starting with http or https');
    return;
  }

  try {
    const response = await fetch(PROXY_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: targetUrl })
    });

    if (!response.ok) throw new Error('Proxy error');

    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);
    frame.src = blobUrl;
  } catch (err) {
    console.error(err);
    alert('Failed to fetch the page via proxy.');
  }
});
