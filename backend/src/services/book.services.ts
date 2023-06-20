import { Client } from "@elastic/elasticsearch";
import { elasticConfig } from "../config/config";
import { Book } from "../interfaces/book.interface";
import { messageBookConfig } from "../config/config";

const client = new Client({ node: elasticConfig.node });

export async function createBook(book: Book): Promise<Book | string> {
  try {
    const searchUser = await client.search({
      index: elasticConfig.indexBook,
      body: {
        query: {
          match: {
            title: book.title,
          },
        },
      },
    });

    const hits = searchUser.hits.hits;
    if (hits.length !== 0) {
      return messageBookConfig.BookAlready;
    }

    const response = await client.index({
      index: elasticConfig.indexBook,
      body: book,
    });

    return { ...book, id: response._id };
  } catch (error) {
    return messageBookConfig.errorCreateBook;
  }
}

export async function updateBook(
  id: string,
  book: Book
): Promise<Book | string> {
  try {
    const response = await client.update({
      index: elasticConfig.indexBook,
      id: id,
      body: { doc: book },
    });

    if (response.result === "updated") {
      return { ...book, id };
    } else {
      return messageBookConfig.errorNotFoundOrChange;
    }
  } catch (error) {
    return messageBookConfig.errorUpdatebook;
  }
}

export async function getBookById(id: string): Promise<Book | string> {
  try {
    const response = await client.get({
      index: elasticConfig.indexBook,
      id,
    });

    if (response.found) {
      return { ...(response._source as Book), id: response._id };
    }

    return messageBookConfig.notfound;
  } catch (error) {
    return messageBookConfig.queryerror;
  }
}

export async function getAllBooks(): Promise<Book[] | string> {
  try {
    const response = await client.search({
      index: elasticConfig.indexBook,
      body: {
        query: { match_all: {} },
      },
    });

    return response.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: hit._id,
    }));
  } catch (error) {
    return messageBookConfig.errorRetriveingBook;
  }
}
