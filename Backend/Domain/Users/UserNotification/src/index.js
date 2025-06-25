// src/index.js
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const redisClient = require('./redisClient');

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

io.on('connection', (socket) => {
  console.log(' Cliente conectado al socket');

  socket.on('disconnect', () => {
    console.log(' Cliente desconectado del socket');
  });
});

// SUSCRIPCIÓN a Redis
(async () => {
  await redisClient.connect(); // se asegura de estar conectado
  await redisClient.subscribe('user_notifications', (message) => {
    console.log(` Mensaje recibido desde Redis: ${message}`);
    io.emit('notification', message); // emite a todos los clientes conectados
  });
})();

const PORT = process.env.PORT || 3006;
server.listen(PORT, () => {
  console.log(` UserNotification service listening on port ${PORT}`);
});
