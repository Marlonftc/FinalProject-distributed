const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Get User API',
      version: '1.0.0',
      description: 'API para obtener datos de usuario por ID',
    },
    servers: [
      {
        url: 'http://localhost:3002', // Cambiar si usas Nginx o dominio
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Donde Swagger buscará los comentarios
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
