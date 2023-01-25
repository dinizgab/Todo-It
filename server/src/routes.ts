import { z } from "zod";
import { FastifyInstance } from "fastify";
import { getAllUsers, loginUser, registerUser } from "./handlers/user.handlers";

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

  // ROTAS DE USUÁRIOS
  app.get("/users", async (request) => getAllUsers(request));

  app.post("/login", async (request, reply) => loginUser(app, request, reply));

  app.post("/register", async (request, reply) => registerUser(app, request, reply));
}

///// TODO - Post a habit
///// TODO - Get all habits to list them
///// TODO - Patch a specific habit (Toggle if is completed or not)
///// TODO - Delete a task
// TODO - Login de usuário
///// TODO - Cadastro de usuário
// TODO - Autorização do usuário com JWT quando se registrar o usuário
// TODO - Autorização do usuário com JWT
