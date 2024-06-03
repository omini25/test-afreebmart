import { server } from './src/server.js';

export default {
  server: {
    proxy: {
      '/api': server,
    },
  },
};