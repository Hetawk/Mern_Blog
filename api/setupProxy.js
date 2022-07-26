const express = require("express");
const app = express();
///initializing proxy
const { createProxyMiddleware } = require('http-proxy-middleware');

//proxy
module.exports = function (app) {
  app.use(
      // '/api',
      createProxyMiddleware('/api', {
          target: 'http://127.0.0.1:7000',
          changeOrigin: true,
          // pathFilter: '/api/**',
          headers: {
              "Connection": "keep-alive"
          },
      })
  );
};

// 'use strict';

// const streamify = require('stream-array');
// const HttpProxy = require('http-proxy');
// const proxy = new HttpProxy();

// module.exports = (req, res, next) => {
//   proxy.web(
//     req,
//     res,
//     {
//       target: 'http://127.0.0.1:7000/api',
//       buffer: streamify(req.rawBody),
//       changeOrigin: true,
//       pathFilter: '/api/**',
//       headers: {
//         "Connection": "keep-alive"
//     },
//     },
//     next
//   );
// };