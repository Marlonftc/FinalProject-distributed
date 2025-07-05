const { createClient } = require('redis');

// Cliente para publicar mensajes
const publisher = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

// Cliente para suscribirse a mensajes
const subscriber = createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
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
