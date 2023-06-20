import { FastifyInstance } from 'fastify';
import routeBooks from "./book.router";
import routeUsers from "./user.router";
import routeComments from './comment.router';

export default async function globalRouter(fastify: FastifyInstance) {
  fastify.register(routeBooks);
  fastify.register(routeUsers);
  fastify.register(routeComments);
}
