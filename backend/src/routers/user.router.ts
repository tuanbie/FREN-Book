
import { FastifyInstance } from 'fastify';
import {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  loginUser
} from '../controllers/user.controller';
import { validatUser } from '../middleware/validate';

export default async function routeUsers(fastify: FastifyInstance) {
  fastify.post('/users',  createUser);
  fastify.put('/users/:id', { preHandler: validatUser }, updateUser);
  fastify.get('/users/:id', getUserById);
  fastify.get('/users', getAllUsers);
  fastify.post('/login',{ preHandler: validatUser }, loginUser);
}
