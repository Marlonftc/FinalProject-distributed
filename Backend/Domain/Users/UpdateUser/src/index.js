const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const waitPort = require('wait-port');
const userRoutes = require('./routes/updateuser.routes');

dotenv.config();

// 🔧 Esta línea es fundamental
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

const startServer = async () => {
  const params = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    timeout: 60000, // Esperamos 60 segundos
  };

  console.log('⏳ Esperando conexión a MySQL...');
  const open = await waitPort(params);

  if (open) {
    console.log('✅ Conectado a MySQL');

    // Espera adicional para garantizar la disponibilidad completa
    await new Promise(resolve => setTimeout(resolve, 3000));

    // ✅ Ahora `app` está definida correctamente
    app.listen(process.env.PORT, () => {
      console.log(`🚀 UpdateUser service running on port ${process.env.PORT}`);
    });
  } else {
    console.error('❌ Error: MySQL no respondió a tiempo');
    process.exit(1);
  }
};

startServer();
