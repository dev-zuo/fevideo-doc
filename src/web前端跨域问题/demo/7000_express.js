// http-proxy-middleware
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(express.static(__dirname + '/public'))

app.use('/users', createProxyMiddleware({
  target: 'http://127.0.0.1:9000', changeOrigin: true
})
);
app.use('/info', createProxyMiddleware({
  target: 'http://127.0.0.1:9000', changeOrigin: true
})
);
app.listen(7000);