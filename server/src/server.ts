import fastify from "fastify";

import cors from "@fastify/cors";
import bcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";

import { appRoutes } from "./routes";

const app = fastify();

app.register(cors);
app.register(bcrypt);
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
});

app.register(appRoutes);

app.listen({ port: 3333 }, (error, address) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  console.log("Server is running at port " + address);
});
