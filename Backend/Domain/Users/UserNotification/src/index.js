const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const redisClient = require('./redisClient');
const notificationRoutes = require('./routes/notification.routes');

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*'
  }
});

app.use(cors());
app.use(express.json());

// Swagger configuration
const PORT = process.env.PORT || 3006;
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'UserNotification Service API',
      version: '1.0.0',
      description: 'Service for sending real-time notifications using Redis and WebSocket',
    },
    servers: [{ url: `http://4.192.192.190:${3006}` }],
  },
  apis: ['./src/routes/*.js'],
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api', notificationRoutes);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado al socket');

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado del socket');
  });
});

// Redis Pub/Sub
(async () => {
  await redisClient.connect();
  await redisClient.subscribe('user_notifications', (message) => {
    console.log(`📨 Mensaje recibido desde Redis: ${message}`);
    io.emit('notification', message); // emit to all WebSocket clients
  });
})();

server.listen(PORT, () => {
  console.log(`🚀 UserNotification service listening on port ${PORT}`);
});
