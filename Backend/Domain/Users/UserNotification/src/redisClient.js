const { createClient } = require('redis');

const redisClient = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.on('error', (err) => console.error('Redis Client Error:', err));

async function connectIfNotConnected() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}

module.exports = {
  connect: connectIfNotConnected,
  subscribe: (...args) => redisClient.subscribe(...args),
  publish: (...args) => redisClient.publish(...args),
  redisClient
};
