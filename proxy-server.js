const http = require('http');
const https = require('https');
const { URL } = require('url');

const PROXY_URL = process.env.PROXY_URL || 'https://www.orfheo.org';
const PORT = process.env.PROXY_PORT || 8010;
const target = new URL(PROXY_URL);

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', '*');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const path = req.url || '/';
  const opts = {
    hostname: target.hostname,
    port: target.port || (target.protocol === 'https:' ? 443 : 80),
    path,
    method: req.method,
    headers: { ...req.headers, host: target.hostname },
  };

  delete opts.headers['origin'];
  delete opts.headers['referer'];

  const proxy = (target.protocol === 'https:' ? https : http).request(opts, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxy.on('error', (err) => {
    console.error('Proxy error:', err.message);
    if (!res.headersSent) {
      res.writeHead(502);
    }
    res.end('Bad Gateway');
  });

  req.pipe(proxy, { end: true });
});

server.listen(PORT, () => {
  console.log(`CORS proxy running on http://localhost:${PORT} -> ${PROXY_URL}`);
});
