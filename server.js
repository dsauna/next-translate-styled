const express = require('express');
const next = require('next');

const devProxy = {
  '/rest/user': {
    target: 'http://connect.localhost:9001',
    changeOrigin: true,
  },
  '/rest/geolocation': {
    target: 'http://connect.localhost:9001',
    changeOrigin: true,
  },
  '/rest/advantage': {
    target: 'http://advantage-edge.local.proxy:9001',
    changeOrigin: true,
  },
  '/rest/edge': {
    target: 'http://connect.localhost:9001',
    changeOrigin: true,
  },
  '/rest/tracking': {
    target: 'http://connect.localhost:9001',
    changeOrigin: true,
  },
  '/auth': {
    target: 'http://accounts.local.proxy:9001',
    changeOrigin: true,
  },
};

const port = parseInt(process.env.PORT, 10) || 3000;
const env = process.env.NODE_ENV;
const dev = env === 'development';
const app = next({
  dir: '.', // base directory where everything is, could move to src later
  dev,
});

const handle = app.getRequestHandler();

let server;
app
  .prepare()
  .then(() => {
    server = express();

    // Set up the proxy.
    if (dev && devProxy) {
      const { createProxyMiddleware } = require('http-proxy-middleware');
      Object.keys(devProxy).forEach(function (context) {
        server.use(createProxyMiddleware(context, devProxy[context]));
      });
    }

    // Default catch-all handler to alalow Next.js to handle all other routes
    server.all('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on port ${port} [${env}]`);
    });
  })
  .catch((err) => {
    console.log('An error occurred, unable to start the server');
    console.log(err);
  });
