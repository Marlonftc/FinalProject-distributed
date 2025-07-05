const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Update User API',
      version: '1.0.0',
      description: 'API for updating user information by ID',
    },
    servers: [
      {
        url: 'http://localhost:3003', // Replace with actual URL if needed
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
