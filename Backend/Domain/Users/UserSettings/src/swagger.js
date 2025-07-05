const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'User Settings API',
      version: '1.0.0',
      description: 'API for managing user preferences (language, theme, etc)',
    },
    servers: [
      {
        url: 'http://localhost:3009',
      },
    ],
  },
  apis: [path.join(__dirname, '/routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
