const dotenv = require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV || 'development',
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 3000
};

module.exports = { config };
