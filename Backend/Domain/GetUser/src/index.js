const waitPort = require('wait-port');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const createConnection = require('./config/db');
const userRoutes = require('./routes/getuser.routes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

const startServer = async () => {
  const params = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    timeout: 30000
  };

  console.log('⏳ Esperando conexión a MySQL...');
  const open = await waitPort(params);

  if (!open) {
    console.error('❌ MySQL no respondió a tiempo.');
    process.exit(1);
  }

  const db = createConnection();
  db.connect((err) => {
    if (err) {
      console.error('❌ Error de conexión a MySQL:', err.message);
      process.exit(1);
    }

    console.log('✅ Conectado a MySQL');
    app.locals.db = db;

    app.listen(process.env.PORT, () => {
      console.log(`🚀 GetUser service corriendo en puerto ${process.env.PORT}`);
    });
  });
};

startServer();
