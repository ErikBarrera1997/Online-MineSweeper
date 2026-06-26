import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  root: '.',
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'index.html',
        login: 'pages/LogIn.html',
        logon: 'pages/logOn.html',
        match: 'pages/match.html',
      },
    },
  },
  plugins: [
    viteStaticCopy({
      targets: [
        { src: 'script/*.js', dest: '.' },
        { src: 'data/*.js', dest: '.' },
        { src: 'news/*.js', dest: '.' },
        { src: 'audio/*.js', dest: '.' },
        { src: 'image/*.js', dest: '.' },
        { src: 'time/*.js', dest: '.' },
        { src: 'messages/*.js', dest: '.' },
        { src: 'pages/*.js', dest: '.' },
        { src: 'assets/*.webp', dest: '.' },
        { src: 'assets/*.ogg', dest: '.' },
        { src: 'assets/*.txt', dest: '.' },
      ],
    }),
  ],
  server: {
    proxy: {
      '/data': {
        target: 'http://localhost',
        bypass: (req) => {
          if (!req.url.includes('.php')) return req.url;
        },
        rewrite: (path) => '/MineSweeper' + path,
      },
      '/connection': {
        target: 'http://localhost',
        bypass: (req) => {
          if (!req.url.includes('.php')) return req.url;
        },
        rewrite: (path) => '/MineSweeper' + path,
      },
      '/news': {
        target: 'http://localhost',
        bypass: (req) => {
          if (!req.url.includes('.php')) return req.url;
        },
        rewrite: (path) => '/MineSweeper' + path,
      },
    },
  },
});
