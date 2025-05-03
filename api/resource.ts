import axios from 'axios';

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await axios.get(url as string, { responseType: 'arraybuffer' });
    res.setHeader('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading resource');
  }
}
