import fastify from "fastify";

import cors from "@fastify/cors";
import bcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";
import fastifyCookie from "@fastify/cookie";

import { appRoutes } from "./routes";

const app = fastify();

app.register(cors, {
  origin: "*",
  credentials: true,
});

app.register(bcrypt);
app.register(fastifyJwt, {
  secret: process.env.JWT_SECRET!,
  cookie: {
    cookieName: "refreshToken",
    signed: false,
  }
});
app.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET!,
});

app.register(appRoutes);

const enteringRoutes = ["/register", "/login"];
app.addHook("onRequest", async (request, reply) => {
  if (!enteringRoutes.includes(request.routerPath)) {
    try {
      await request.jwtVerify();
      
    } catch (err) {
      const renewedRefreshToken = app.jwt.sign({ });
      const renewedAccessToken = app.jwt.sign({ });
  
      reply.setCookie("refreshToken", renewedRefreshToken, {
        secure: true,
        httpOnly: true,
        path: "/"
      })
      
      reply.send(renewedAccessToken);
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
