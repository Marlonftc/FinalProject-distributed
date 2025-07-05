// src/swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Delete User API',
      version: '1.0.0',
      description: 'API for deleting user accounts from the system',
    },
    servers: [
      {
        url: 'http://localhost:3004', // Reemplaza si usas Nginx o diferente puerto
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Ubicación de las rutas documentadas
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = { setupSwagger };
