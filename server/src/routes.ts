import { z } from "zod";
import { FastifyInstance } from "fastify";
import { getAllUsers, loginUser, registerUser } from "./handlers/user.handlers";
import { createNewTask, deleteTask, toggleTaskCompleted } from "./handlers/task.handlers";

export async function appRoutes(app: FastifyInstance) {
  app.get("/home", async () => getAllTasks());

  app.post("/create", async (request) => createNewTask(request));

  app.patch("/:taskId/toggle", async (request) => toggleTaskCompleted(request));

  app.delete("/delete", async (request) => deleteTask(request));

  // ROTAS DE USUÁRIOS
  app.get("/users", async (request) => getAllUsers(request));

  app.post("/login", async (request, reply) => loginUser(app, request, reply));

  app.post("/register", async (request, reply) =>
    registerUser(app, request, reply)
  );
}

///// TODO - Post a habit
///// TODO - Get all habits to list them
///// TODO - Patch a specific habit (Toggle if is completed or not)
///// TODO - Delete a task
// TODO - Login de usuário
///// TODO - Cadastro de usuário
// TODO - Autorização do usuário com JWT quando se registrar o usuário
// TODO - Autorização do usuário com JWT
