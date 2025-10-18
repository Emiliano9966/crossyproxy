const functions = require("firebase-functions");
const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(require("cors")({ origin: true }));
app.use(express.json());

app.post("/proxy", async (req, res) => {
  const { url } = req.body;
  if (!url || !/^https?:\/\//.test(url)) {
    return res.status(400).send("Invalid URL");
  }

  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();

    res.status(response.status);
    response.headers.forEach((value, key) => {
      if (!["transfer-encoding", "content-encoding", "connection"].includes(key.toLowerCase())) {
        res.setHeader(key, value);
      }
    });

    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).send("Proxy failed");
  }
});

exports.api = functions.https.onRequest(app);
