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

io.on('connection', socket => {
  console.log('🔌 Cliente conectado al socket');

  // Escuchamos mensajes desde Redis y emitimos por Socket.IO
  redisClient.subscribe('user_notifications');
  redisClient.on('message', (channel, message) => {
    console.log(`📢 Notificación recibida en canal ${channel}: ${message}`);
    socket.emit('notification', message);
  });

  socket.on('disconnect', () => {
    console.log('❌ Cliente desconectado del socket');
  });
});

const PORT = process.env.PORT || 3006;
server.listen(PORT, () => {
  console.log(`🚀 UserNotification service listening on port ${PORT}`);
});
