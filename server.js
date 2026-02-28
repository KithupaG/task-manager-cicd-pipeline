const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3080;

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(html);
});

server.listen(PORT, () => {
  console.log(`🚀 App running at http://localhost:${PORT}`);
});
