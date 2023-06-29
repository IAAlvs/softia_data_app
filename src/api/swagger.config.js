/* const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger_output.json')

const options = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Description for your API',
      contact: {
        name: "Ia", // your name
        email: "ia@softiadata.com", // your email
        url: "softiadata.com", // your website
      }
    },
    servers: [
      {
        url: `http://localhost:${expressPort}`,
        description: 'Development server',
      },
    ],
  },
  apis: ["./routes/*.js"] // Ruta a tus archivos de rutas o controladores que deseas documentar
};

const specs = swaggerJsdoc(options);


 */
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../../swagger_output.json')
module.exports = (app) => {
  app.use(`/api/v1/users-api`, swaggerUi.serve, swaggerUi.setup(swaggerFile));
};
//const router = require('./routers/personRouter')
