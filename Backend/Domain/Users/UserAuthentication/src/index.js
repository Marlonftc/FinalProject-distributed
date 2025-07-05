const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const waitPort = require('wait-port');
const authRoutes = require('./routes/auth.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);

// Swagger config
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'Endpoints para registro y login de usuarios',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
    await new Promise(resolve => setTimeout(resolve, 3000));

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Auth service running on port ${process.env.PORT}`);
      console.log(`📘 Swagger disponible en http://localhost:${process.env.PORT}/api-docs`);
    });
  } else {
    console.error('❌ Error: MySQL no respondió a tiempo');
    process.exit(1);
  }
};

startServer();
