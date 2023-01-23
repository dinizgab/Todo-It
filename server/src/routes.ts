import { prisma } from "./lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";

export async function appRoutes(app: FastifyInstance) {
  app.get("/", async (request) => {});

  app.post("/task", async (request) => {
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
}

// Get all habits to list them
// Patch a specific habit (Toggle if is completed or not)
// Post a habit
// Delete a habit
