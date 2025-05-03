import axios from 'axios';
import cheerio from 'cheerio';

export default async function handler(req, res) {
  const url = req.query.url;
  if (!url) return res.status(400).send('Missing URL');

  try {
    const response = await axios.get(url as string);
    const $ = cheerio.load(response.data);

    $('a').each((_, el) => {
      const href = $(el).attr('href');
      if (href && !href.startsWith('javascript')) {
        const abs = new URL(href, url as string).href;
        $(el).attr('href', `/proxy?url=${encodeURIComponent(abs)}`);
      }
    });

    $('img, script, iframe').each((_, el) => {
      const src = $(el).attr('src');
      if (src) {
        const abs = new URL(src, url as string).href;
        $(el).attr('src', `/resource?url=${encodeURIComponent(abs)}`);
      }
    });

    $('link').each((_, el) => {
      const href = $(el).attr('href');
      if (href) {
        const abs = new URL(href, url as string).href;
        $(el).attr('href', `/resource?url=${encodeURIComponent(abs)}`);
      }
    });

    res.setHeader('Content-Type', 'text/html');
    res.send($.html());
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching page');
  }
}
