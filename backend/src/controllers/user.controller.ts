import { FastifyRequest, FastifyReply } from "fastify";
import * as UserService from "../services/user.services";
import { User } from "../interfaces/user.interface";
import { messageUserConfig } from "../config/config";
import { ErrorException } from "../Exception/errorException";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userInfo = request.body as User;
    const user = await UserService.createUser(userInfo);
    if (user) {
      if (user === messageUserConfig.userAlready) {
        ErrorException(reply, messageUserConfig.userAlready, 400, 409);
      } else if (user === messageUserConfig.errorCreateUser) {
        ErrorException(reply, messageUserConfig.errorCreateUser, 500, 500);
      } else {
        reply.code(201).send({ user, code: 201 });
      }
    }
  } catch (error) {
    ErrorException(reply, messageUserConfig.errorCreateUser, 500, 500);
  }
}

export async function updateUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userInfo = request.body as User;
    const id: string = (request.params as any).id;

    const user = await UserService.updateUser(id, userInfo);

    if (user) {
      if (user === messageUserConfig.errorUpdateUser) {
        ErrorException(reply, messageUserConfig.errorUpdateUser, 500, 500);
      } else {
        reply.send({ user, code: 201 });
      }
    } else {
      reply.code(400).send({ message: messageUserConfig.notfound, code: 404 });
    }
  } catch (error) {
    ErrorException(reply, messageUserConfig.errorUpdateUser, 500, 500);
  }
}

export async function getUserById(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const id: string = (request.params as any).id;
    const user = await UserService.getUserById(id);

    if (user) {
      if (user === messageUserConfig.notfound) {
        ErrorException(reply, messageUserConfig.notfound, 400, 404);
      } else if (user === messageUserConfig.queryerror) {
        ErrorException(reply, messageUserConfig.queryerror, 500, 500);
      } else {
        reply.send({ user, code: 201 });
      }
    } else {
      ErrorException(reply, messageUserConfig.notfound, 400, 404);
    }
  } catch (error) {
    ErrorException(reply, messageUserConfig.errorRetriveingUser, 500, 500);
  }
}

export async function getAllUsers(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const user = await UserService.getAlUsers();
    if (user) {
      if (user === messageUserConfig.queryerror) {
        ErrorException(reply, messageUserConfig.queryerror, 500, 500);
      }
    }
    reply.send({ user, code: 201 });
  } catch (error) {
    ErrorException(reply, messageUserConfig.errorRetriveingUser, 500, 500);
  }
}

export async function loginUser(request: FastifyRequest, reply: FastifyReply) {
  try {
    const userInfo = request.body as User;
    const user = await UserService.loginUser(userInfo);

    if (user) {
      if (user === messageUserConfig.notfound) {
        ErrorException(reply, messageUserConfig.notfound, 400, 404);
      } else if (user === messageUserConfig.faildPass) {
        ErrorException(reply, messageUserConfig.faildPass, 400, 401);
      } else {
        reply.code(200).send({ user, code: 201 });
      }
    } else {
      ErrorException(reply, messageUserConfig.notfound, 400, 404);
    }
  } catch (error) {
    ErrorException(reply, messageUserConfig.errorRetriveingUser, 500, 500);
  }
}
