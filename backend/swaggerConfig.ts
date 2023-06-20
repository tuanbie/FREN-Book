import { FastifyInstance } from 'fastify';

export const configureSwagger = (app: FastifyInstance) => {
  const swaggerOptions = {
    routePrefix: '/documentation',
    swagger: {
      info: {
        title: 'Book API',
        description: 'API documentation using Swagger',
        version: '1.0.0'
      },
      externalDocs: {
        url: 'https://swagger.io',
        description: 'Find more info here'
      },
      host: 'localhost:3000',
      schemes: ['http'],
      consumes: ['application/json'],
      produces: ['application/json']
    },
    exposeRoute: true
  };

  app.register(require('fastify-swagger'), swaggerOptions);
};
