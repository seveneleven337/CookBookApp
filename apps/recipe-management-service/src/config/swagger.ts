import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Recipe Management Service API',
      version: '1.0.0',
      description: 'Recipe management microservice API',
    },
    servers: [
      {
        url: process.env.SWAGGER_RECIPE_MANAGEMENT_SERVER_URL || 'http://localhost:5001/api/recipes',
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
