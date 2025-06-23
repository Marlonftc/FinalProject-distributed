const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const waitPort = require('wait-port');
const authRoutes = require('./routes/auth.routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

const startServer = async () => {
  const params = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    timeout: 60000,
  };

  console.log('⏳ Esperando conexión a MySQL...');
  const open = await waitPort(params);

  if (open) {
    console.log('✅ Conectado a MySQL');

    // 👇 Añade esta espera extra de 3 segundos
    await new Promise(resolve => setTimeout(resolve, 3000));

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Auth service running on port ${process.env.PORT}`);
    });
  } else {
    console.error('❌ Error: MySQL no respondió a tiempo');
    process.exit(1);
  }
};

startServer();
