const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const followedPosts = require('../api/followed-posts');
const proxyImage = require('../api/proxy-image');

module.exports = function(app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.all('/api/followed-posts', (req, res) => followedPosts(req, res));
  app.all('/api/analisar', (req, res) => followedPosts(req, res));
  app.get('/api/proxy-image', (req, res) => proxyImage(req, res));

  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:5000',
      changeOrigin: true,
    })
  );
};
