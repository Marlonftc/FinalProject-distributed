const redis = require('redis');

const client = redis.createClient({
  host: process.env.REDIS_HOST || 'redis',
  port: process.env.REDIS_PORT || 6379
});

client.on('connect', () => {
  console.log('✅ Conectado a Redis');
});

client.on('error', err => {
  console.error('❌ Error al conectar con Redis:', err);
});

module.exports = client;
