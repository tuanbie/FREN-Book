import { FastifyRequest, FastifyReply, HookHandlerDoneFunction } from "fastify";
import * as schema from "./Schema";

const validateData = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction,
  dataSchema: any
) => {
  try {
    await dataSchema.validateAsync(request.body);
    done();
  } catch (error) {
    reply.status(400).send({ error: (error as Error).message });
  }
};

export const validateBook = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  await validateData(request, reply, done, schema.book);
};

export const validatUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  await validateData(request, reply, done, schema.user);
};

export const validatCommetn = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  await validateData(request, reply, done, schema.comment);
};
