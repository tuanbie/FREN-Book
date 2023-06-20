import { Client } from "@elastic/elasticsearch";
import { elasticConfig, messageUserConfig } from "../config/config";
import { User } from "../interfaces/user.interface";
import * as bcrypt from "bcryptjs";

const client = new Client({ node: elasticConfig.node });

export async function createUser(user: User): Promise<User | string> {
  try {
    const searchUser = await client.search({
      index: elasticConfig.indexUser,
      body: {
        query: {
          match: {
            nameUser: user.nameUser,
          },
        },
      },
    });
    const hits = searchUser.hits.hits;
    if (hits.length !== 0) {
      return messageUserConfig.userAlready;
    }
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: User = {
      ...user,
      password: hashedPassword,
    };
    const response = await client.index({
      index: elasticConfig.indexUser,
      body: newUser,
    });

    return { ...newUser, id: response._id };
  } catch (error) {
    return messageUserConfig.errorCreateUser;
  }
}

export async function updateUser(
  id: string,
  user: User
): Promise<User | string> {
  try {
    const response = await client.update({
      index: elasticConfig.indexUser,
      id,
      body: { doc: user },
    });

    if (response.result === "updated") {
      return { ...user, id };
    }

    return messageUserConfig.errorUpdateUser;
  } catch (error) {
    return messageUserConfig.errorUpdateUser;
  }
}

export async function getUserById(id: string): Promise<User | string> {
  try {
    const response = await client.get({
      index: elasticConfig.indexUser,
      id,
    });

    if (response.found) {
      return { ...(response._source as User), id: response._id };
    }

    return messageUserConfig.notfound;
  } catch (error) {
    return messageUserConfig.queryerror;
  }
}

export async function getAlUsers(): Promise<User[] | string> {
  try {
    const response = await client.search({
      index: elasticConfig.indexUser,
      body: {
        query: { match_all: {} },
      },
    });

    return response.hits.hits.map((hit: any) => ({
      ...hit._source,
      id: hit._id,
    }));
  } catch (error) {
    return messageUserConfig.queryerror;
  }
}

export async function loginUser(user: User): Promise<User | string> {
  const searchUser = await client.search({
    index: elasticConfig.indexUser,
    body: {
      query: {
        match: {
          nameUser: user.nameUser,
        },
      },
    },
  });

  const hits = searchUser.hits.hits;
  if (hits.length === 0) {
    return messageUserConfig.notfound;
  }

  const existingUser = hits[0]._source as User;
  const passwordMatch = await bcrypt.compare(
    user.password,
    existingUser.password
  );

  if (!passwordMatch) {
    return messageUserConfig.faildPass;
  }

  return { ...(existingUser as User), id: hits[0]._id };
}
