import fastify from "fastify";

import cors from "@fastify/cors";
import bcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { appRoutes } from "./routes";

const app = fastify();

app.register(cors, {
  origin: "http://localhost:5173",
  credentials: true,
});

app.register(bcrypt);
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  verify: {
    extractToken: (req) => {
      //@ts-ignore
      const token: string = req.headers.token;
      return token;
    },
  },
});
app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET!,
});

app.register(appRoutes);

const enteringRoutes = ["/register", "/login"];
app.addHook("onRequest", async (request, reply) => {
  // TODO - Put the refresh token verification here
  console.log(request.headers.cookie)
  if (!enteringRoutes.includes(request.routerPath)) {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  }
});

app.listen({ port: 3333 }, (error, address) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  console.log("Server is running at port " + address);
});
