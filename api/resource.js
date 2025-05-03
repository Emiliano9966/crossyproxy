
const axios = require('axios');

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading resource');
  }
};
