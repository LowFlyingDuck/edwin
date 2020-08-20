const fs = require('fs');
const { createGzip } = require('zlib');
const staticServe = fs.readdirSync('./public');
console.log(staticServe);

function provide(url, response, compress) {
  if (staticServe.includes(url.slice(1, url.length))) {
    try {
      let s = fs.createReadStream('./public' + url);
      if (compress) {
        let encoder = createGzip();
        response.setHeader('Content-Encoding', 'gzip');
        s.pipe(encoder);
        encoder.pipe(response);
        encoder.on('close', () => response.end());
      } else { s.pipe(response); s.on('close', () => response.end()); };
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

const server = require('http').createServer((request, response) => {
  response.setHeader('Server', 'Finn Lyonn WebServer | NodeJS');
  switch (request.url) {
    case '/':
      provide('/index.html', response, request.headers['accept-encoding'].replace(/ /g, '').split(','));
      break;
    default:
      if (staticServe.includes(request.url.slice(1, request.url.length - 1))) {
        provide(request.url, response, request.headers['accept-encoding'].replace(/ /g, '').split(','));
      }
      provide(request.url, response, request.headers['accept-encoding'].replace(/ /g, '').split(',').includes('gzip'));
      break;
  }
})
server.listen(80);