import fastify from "fastify";
import globalRouter from "./src/routers/global.router";
import { BookIndex, UserIndex, CommentIndex } from "./src/models/model";
import cors from "@fastify/cors";

require("dotenv").config();

const app = fastify({ logger: false });
app.register(globalRouter, { fastify });
app.register(cors, {
  origin: "*",
});
// const PORT = process.env.PORT || 3000;

const runIndex = async () => {
  await BookIndex();
  await UserIndex();
  await CommentIndex();
};

const start = async () => {
  try {
    await app.listen({ port: 3001 });
    await runIndex();
    console.log("Server is running on http://localhost:3000");
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

start();
