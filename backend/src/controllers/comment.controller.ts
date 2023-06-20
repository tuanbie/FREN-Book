import { FastifyRequest, FastifyReply } from "fastify";
import * as CommentService from "../services/comment.services";
import { Rep, Comment } from "../interfaces/comment.interface";
import { messageCommentConfig, messageUserConfig } from "../config/config";
import { ErrorException } from "../Exception/errorException";

export async function createComment(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const createdComment = request.body as Comment;
    const comment = await CommentService.createComment(createdComment);
    if (comment) {
      if (comment === messageUserConfig.notfound) {
        ErrorException(reply, messageUserConfig.notfound, 400, 404);
      }
      reply.code(200).send({ comment, code: 201 });
    }
  } catch (error) {
    ErrorException(reply, messageCommentConfig.errorCreateComment, 500, 500);
  }
}

export async function repComment(request: FastifyRequest, reply: FastifyReply) {
  try {
    const repComment = request.body as Rep;
    const id: string = (request.params as any).id;
    const comment = await CommentService.repComment(id, repComment);

    if (comment) {
      if (comment === messageCommentConfig.notfound) {
        ErrorException(reply, messageCommentConfig.notfound, 400, 404);
      } else if (comment === messageCommentConfig.donotmatch) {
        ErrorException(reply, messageCommentConfig.donotmatch, 400, 409);
      } else {
        reply.code(200).send({ comment, code: 201 });
      }
    } else {
      ErrorException(reply, messageCommentConfig.notfound, 400, 404);
    }
  } catch (error) {
    ErrorException(reply, messageCommentConfig.errorUpdateComment, 500, 500);
  }
}

export async function getAllComment(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const comment = await CommentService.getAllComments();
    if (comment === messageCommentConfig.queryerror) {
      ErrorException(reply, messageCommentConfig.queryerror, 500, 500);
    }
    reply.code(200).send({ comment, code: 201 });
  } catch (error) {
    ErrorException(reply, messageCommentConfig.queryerror, 500, 500);
  }
}
