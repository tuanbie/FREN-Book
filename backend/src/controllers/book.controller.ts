import { FastifyRequest, FastifyReply } from "fastify";
import * as BookService from "../services/book.services";
import { Book } from "../interfaces/book.interface";
import { messageBookConfig } from "../config/config";
import { ErrorException } from "../Exception/errorException";

export async function createBook(request: FastifyRequest, reply: FastifyReply) {
  try {
    const createdBook = request.body as Book;
    const book = await BookService.createBook(createdBook);
    if (book) {
      if (book === messageBookConfig.BookAlready) {
        ErrorException(reply, messageBookConfig.BookAlready, 400, 404);
      }
      reply.code(200).send({ book, code: 201 });
    } else {
      ErrorException(reply, messageBookConfig.errorCreateBook, 500, 500);
    }
    reply.code(200).send({ book, code: 201 });
  } catch (error) {
    ErrorException(reply, messageBookConfig.errorCreateBook, 500, 500);
  }
}

export async function updateBook(request: FastifyRequest, reply: FastifyReply) {
  try {
    const updatedBook = request.body as Book;
    const id: string = (request.params as any).id;

    const book = await BookService.updateBook(id, updatedBook);

    if (book) {
      if (book === messageBookConfig.errorNotFoundOrChange) {
        ErrorException(reply,messageBookConfig.errorNotFoundOrChange,400,404)
      } else if (book === messageBookConfig.errorUpdatebook) {
        ErrorException(reply,messageBookConfig.errorNotFoundOrChange,500,500)
      } else {
        reply.code(200).send({ book, code: 201 });
      }
    } else {
      ErrorException(reply,messageBookConfig.errorNotFoundOrChange,500,500)
    }
  } catch (error) {
    ErrorException(reply,messageBookConfig.errorUpdatebook,500,500)
  }
}

export async function getBookById(request: FastifyRequest,reply: FastifyReply) {
  try {
    const id: string = (request.params as any).id;
    const book = await BookService.getBookById(id);

    if (book) {
      if (book === messageBookConfig.notfound) {
        ErrorException(reply,messageBookConfig.notfound,400,404)
      } else if (book === messageBookConfig.queryerror) {
        ErrorException(reply,messageBookConfig.queryerror,500,500)
      } else {
        reply.code(200).send({ book, code: 201 });
      }
    } else {
      ErrorException(reply,messageBookConfig.queryerror,500,500)
    }
  } catch (error) {
    ErrorException(reply,messageBookConfig.errorRetriveingBook,500,500)
  }
}

export async function getAllBooks(request: FastifyRequest,reply: FastifyReply) {
  try {
    const book = await BookService.getAllBooks();
    if (book === messageBookConfig.errorRetriveingBook) {
      ErrorException(reply,messageBookConfig.errorRetriveingBook,500,500)
    }
    reply.code(200).send({ book, code: 201 });
  } catch (error) {
    ErrorException(reply,messageBookConfig.errorRetriveingBook,500,500)
  }
}
