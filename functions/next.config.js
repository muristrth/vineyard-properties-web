// next.config.js
const path = require('path');

module.exports = {
  webpack: (config) => {
    config.externals = {
      ...config.externals,
      'firebase-functions': 'commonjs firebase-functions',
      'firebase-admin': 'commonjs firebase-admin',
    };
    return config;
  },
  // This prevents build errors from server-only files
  exclude: [path.resolve(__dirname, 'functions')],
};
