import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {
  app.get("/home", async (request) => {
    const savedTasks = await prisma.task.findMany();
    return savedTasks;
  });

  app.post("/create", async (request) => {
    const createTaskBody = z.object({
      title: z.string(),
      description: z.string(),
    });

    const { title, description } = createTaskBody.parse(request.body);

    await prisma.task.create({
      data: {
        title: title,
        description: description,
      },
    });
  });

  app.patch("/:taskId/toggle", async (request) => {
    const toggleTaskId = z.object({
      taskId: z.string().uuid(),
    });

    const { taskId } = toggleTaskId.parse(request.params);

    const task = await prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });

    if (task) {
      task.completed = !task.completed;

      await prisma.task.update({
        where: {
          id: taskId,
        },

        data: {
          ...task,
        },
      });
    }
  });

  app.delete("/delete", async (request) => {
    const getTaskParams = z.object({
      taskId: z.string().uuid(),
    });

    const { taskId } = getTaskParams.parse(request.query);

    await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  });

  app.post("/register", async (request) => {
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
  });
}

//// Post a habit
//// Get all habits to list them
//// Patch a specific habit (Toggle if is completed or not)
//// Delete a task
// TODO - Login de usuário
// TODO - Cadastro de usuário
