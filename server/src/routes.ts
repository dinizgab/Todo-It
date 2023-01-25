import { FastifyInstance } from "fastify";
import { getAllUsers, loginUser, registerUser, verifyToken } from "./handlers/user.handlers";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  toggleTaskCompleted,
} from "./handlers/task.handlers";

export async function appRoutes(app: FastifyInstance) {
  app.get("/home", async () => getAllTasks());

  app.post("/create", async (request) => createNewTask(request));

  app.patch("/:taskId/toggle", async (request) => toggleTaskCompleted(request));

  app.delete("/delete", async (request) => deleteTask(request));

  // User Routes
  app.get("/users", async (request) => getAllUsers(request));

  app.post("/login", async (request, reply) => loginUser(app, request, reply));

  app.post("/register", async (request, reply) => registerUser(app, request));

  app.post("/user/authenticate", async (request, reply) => verifyToken(request, reply))
}

///// TODO - Post a habit
///// TODO - Get all habits to list them
///// TODO - Patch a specific habit (Toggle if is completed or not)
///// TODO - Delete a task
// TODO - Login de usuário
///// TODO - Cadastro de usuário
// TODO - Autorização do usuário com JWT quando se registrar o usuário
// TODO - Autorização do usuário com JWT
