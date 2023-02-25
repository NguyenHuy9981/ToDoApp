const { createClient } = require('redis');

const redis = createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

redis.connect();

redis.on('error', (err) => console.log('Redis Client Error', err));
redis.on('connect', () => console.log('Redis Client Connected'));

module.exports = redis;
