import { Client } from "@elastic/elasticsearch";
import { elasticConfig,messageModelConfig} from "../config/config";
const client = new Client({ node: elasticConfig.node });

export async function BookIndex() {
  try {
    const indexExists = await client.indices.exists({ index: elasticConfig.indexBook });

    if (indexExists) {
      console.log(`${elasticConfig.indexBook} đã tồn tại.`);
      return;
    }

    const response = await client.indices.create({
      index: elasticConfig.indexBook,
      body: {
        mappings: {
          properties: {
            title: { type: "text" },
            author: { type: "text" },
            publishedDate: { type: "text" },
            description: { type: "text" },
            price: { type: "text" },
          },
        },
      },
    });

    console.log('Index "books" đã được tạo.');
  } catch (error) {
    console.error(messageModelConfig.errorCreateIndex, error);
  }
}


export async function UserIndex() {
  try {
    const indexExists = await client.indices.exists({ index: elasticConfig.indexUser });

    if (indexExists) {
      console.log(`Index ${elasticConfig.indexUser} đã tồn tại.`);
      return;
    }

    const response = await client.indices.create({
      index: elasticConfig.indexUser,
      body: {
        mappings: {
          properties: {
            nameUser: { type: "text" },
            password: { type: "text" },
          },
        },
      },
    });

    console.log('Index "users" đã được tạo.');
  } catch (error) {
    console.error(messageModelConfig.errorCreateIndex, error);
  }
}
export async function CommentIndex() {
  try {
    const indexExists = await client.indices.exists({ index: elasticConfig.indexComment });

    if (indexExists) {
      console.log(`Index ${elasticConfig.indexComment} đã tồn tại.`);
      return;
    }

    const response = await client.indices.create({
      index: elasticConfig.indexComment,
      body: {
        mappings: {
          properties: {
            content: { type: "text" },
            createdAt: { type: "date" },
            updatedAt: { type: "date" },
            idUser: { type: "text" },
            idBook: { type: "text" },
            replies: {
              type: "nested",
              properties: {
                content: { type: "text" },
                createdAt: { type: "date" },
                updatedAt: { type: "date" },
                idUserRep: { type: "text" },
              },
            },
          },
        },
      },
    });

    console.log('Index "comments" đã được tạo.');
  } catch (error) {
    console.error(messageModelConfig.errorCreateIndex, error);
  }
}
