import { Client } from "@elastic/elasticsearch";
import {
  elasticConfig,
  messageCommentConfig,
  messageUserConfig,
} from "../config/config";
import { Rep, Comment } from "../interfaces/comment.interface";

const client = new Client({ node: elasticConfig.node });

export async function createComment(
  comment: Comment
): Promise<Comment | string> {
  try {
    const searchUser = await client.search({
      index: elasticConfig.indexUser,
      body: {
        query: {
          term: {
            _id: comment.idUser,
          },
        },
      },
    });

    const hits = searchUser.hits.hits;
    if (hits.length === 0) {
      return messageUserConfig.notfound;
    }
    const response = await client.index({
      index: elasticConfig.indexComment,
      body: comment,
    });

    return { ...comment, id: response._id };
  } catch (error) {
    // console.error(messageCommentConfig.errorCreateComment, error);
    throw error;
  }
}

export async function repComment(
  id: string,
  reply: Rep
): Promise<Comment | string> {
  try {
    const searchComment = await client.get({
      index: elasticConfig.indexComment,
      id: id,
    });

    if (!searchComment.found) {
      return messageCommentConfig.notfound;
    }

    const existingComment = searchComment._source as Comment;
    // existingComment.updatedAt = new Date();
    if (existingComment.idUser === reply.idUserRep) {
      return messageCommentConfig.donotmatch;
    }

    if (!existingComment.replies) {
      existingComment.replies = [];
    }

    existingComment.replies.push(reply);

    const response = await client.update({
      index: elasticConfig.indexComment,
      id: id,
      body: { doc: existingComment },
    });

    if (response.result === "updated") {
      return existingComment;
    }

    return messageCommentConfig.errorRepComment;
  } catch (error) {
    // console.error("Error rep comment:", error);
    return messageCommentConfig.errorRepComment;
  }
}
export async function getAllComments(): Promise<Comment[] | string> {
  try {
    const response = await client.search({
      index: elasticConfig.indexComment,
      body: {
        query: { match_all: {} },
      },
    });

    return response.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: hit._id,
    }));
  } catch (error) {
    return messageCommentConfig.queryerror;
  }
}
