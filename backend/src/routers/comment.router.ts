
import { FastifyInstance } from 'fastify';
import {
  createComment,
  repComment,
  getAllComment
} from '../controllers/comment.controller';
import { validatCommetn } from '../middleware/validate';

export default async function routeComments(fastify: FastifyInstance) {
  fastify.post('/comment',  createComment);
  fastify.put('/comment/:id', repComment);
//   fastify.get('/books/:id', getBookByIdHandler);
  fastify.get('/comment', getAllComment);
}
