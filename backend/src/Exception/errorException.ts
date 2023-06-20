import { FastifyReply } from "fastify";

export function ErrorException(
  reply: FastifyReply,
  message: string,
  code1: number,
  code: number
) {
  reply.status(code1).send({
    code,
    message: message,
  });
}
