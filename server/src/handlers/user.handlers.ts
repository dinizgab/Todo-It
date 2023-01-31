import { FastifyReply, FastifyRequest } from "fastify";
import { date, z } from "zod";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({});
  return users;
};

export const loginUser = async (
  app: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) => {
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

  if (user && (await app.bcrypt.compare(password, user.password))) {
    const accessToken = app.jwt.sign({ logedUser: username, sub: user!.id });
    const refreshToken = app.jwt.sign({ sub: user!.id });

    // TODO - Add cookie expiration time
    reply.setCookie("refreshToken", refreshToken, {
      secure: true,
      httpOnly: true,
      path: "/"
    });

    reply.send({
      message: "Usuario logado",
      user: username,
      accessToken,
    });
  } else {
    reply.code(401).send({ message: "Usuario ou senha incorretos" });
  }
};

export const registerUser = async (
  app: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply
) => {
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

  const accessToken = app.jwt.sign({ logedUser: user });
  reply.send({
    message: "Usuario logado",
    user: user,
    accessToken,
  });
};