const { createClient } = require('redis');

const redisUrl = `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`;

// Publisher client
const publisher = createClient({
  url: redisUrl
});

// Subscriber client
const subscriber = createClient({
  url: redisUrl
});

publisher.on('error', (err) => console.error('Redis Publisher Error:', err));
subscriber.on('error', (err) => console.error('Redis Subscriber Error:', err));

async function connectClients() {
  if (!publisher.isOpen) await publisher.connect();
  if (!subscriber.isOpen) await subscriber.connect();
}

module.exports = {
  connect: connectClients,
  publish: async (channel, message) => {
    if (!publisher.isOpen) await publisher.connect();
    await publisher.publish(channel, message);
  },
  subscribe: async (channel, handler) => {
    if (!subscriber.isOpen) await subscriber.connect();
    await subscriber.subscribe(channel, handler);
  }
};
