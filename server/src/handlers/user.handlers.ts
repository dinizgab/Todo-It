import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export const getAllUsers = async (request: FastifyRequest) => {
  const users = await prisma.user.findMany({});
  return users;
};

export const loginUser = async (app: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const loginUserInfos = z.object({
    username: z.string(),
    password: z.string(),
  });

  const { username, password } = loginUserInfos.parse(request.body);

  const user = await prisma.user.findFirst({
    where: {
      user: username,
    },
  });

  let isValidLogin = false;
  if (user) {
    isValidLogin = await app.bcrypt.compare(password, user.password);
  } else {
    reply.code(404).send({ message: "Usuario nao encontrado" });
  }

  const jwtToken = app.jwt.sign({ logedUser: username });

  if (isValidLogin) {
    reply.send({
      message: "Usuario logado",
      user: username,
      token: jwtToken,
    });
  } else {
    reply.code(401).send({ message: "Usuario ou senha incorretos" });
  }
};

export const registerUser = async (app: FastifyInstance, request: FastifyRequest, reply: FastifyReply) => {
  const userRegisterInfos = z.object({
    user: z.string(),
    email: z.string(),
    password: z.string(),
  });

  const { user, email, password } = userRegisterInfos.parse(request.body);

  const hashedPassword = await app.bcrypt.hash(password);

  await prisma.user.create({
    data: {
      user,
      email,
      password: hashedPassword,
    },
  });
}
