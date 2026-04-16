import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth Service API',
      version: '1.0.0',
      description: 'Authentication microservice API',
    },
    servers: [
      {
        url: process.env.SWAGGER_AUTH_SERVER_URL || 'http://localhost:4000/api/auth',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },

  apis: process.env.NODE_ENV === 'production' ? ['dist/routes/*.js'] : ['src/routes/*.ts'],
};

export const swaggerSpec = swaggerJSDoc(options);
