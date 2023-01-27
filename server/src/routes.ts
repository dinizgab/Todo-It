import { FastifyInstance } from "fastify";
import {
  getAllUsers,
  loginUser,
  registerUser,
  revalidateAccessToken,
} from "./handlers/user.handlers";
import {
  createNewTask,
  deleteTask,
  getAllTasks,
  toggleTaskCompleted,
} from "./handlers/task.handlers";

export async function appRoutes(app: FastifyInstance) {
  app.get("/home", async (request) => getAllTasks());

  app.post("/create", async (request) => createNewTask(request));

  app.patch("/:taskId/toggle", async (request) => toggleTaskCompleted(request));

  app.delete("/delete", async (request) => deleteTask(request));

  // User Routes
  app.get("/users", async (request) => getAllUsers());

  app.post("/login", async (request, reply) => loginUser(app, request, reply));

  app.post("/register", async (request, reply) =>
    registerUser(app, request, reply)
  );

  app.post("/revalidate", async (request, reply) => revalidateAccessToken(app, request, reply))
}

///// TODO - Post a habit
///// TODO - Get all habits to list them
///// TODO - Patch a specific habit (Toggle if is completed or not)
///// TODO - Delete a task
///// TODO - User login
///// TODO - User registration
///// TODO - User Auth when create a new user
///// TODO - User Auth with JWT
