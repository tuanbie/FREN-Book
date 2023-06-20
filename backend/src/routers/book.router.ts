
import { FastifyInstance } from 'fastify';
import {
  createBook,
  updateBook,
  getBookById,
  getAllBooks,
} from '../controllers/book.controller';
import { validateBook } from '../middleware/validate';

export default async function routeBooks(fastify: FastifyInstance) {
  fastify.post('/addBook', { preHandler: validateBook }, createBook);
  fastify.put('/books/:id', { preHandler: validateBook }, updateBook);
  fastify.get('/books/:id', getBookById);
  fastify.get('/books', getAllBooks);
}
