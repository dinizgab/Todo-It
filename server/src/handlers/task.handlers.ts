import { prisma } from "../lib/prisma";
import { z } from "zod";
import { FastifyRequest } from "fastify";

export const getAllTasks = async (request: FastifyRequest) => {
  const userRequestInfos = z.object({
    userId: z.string().uuid(),
  });

  const { userId } = userRequestInfos.parse(request.query);

  const savedTasks = await prisma.task.findMany({
    where: {
      createdBy: userId,
    },
  });

  return savedTasks;
};

export const createNewTask = async (request: FastifyRequest) => {
  const createTaskBody = z.object({
    createdBy: z.string(),
    title: z.string(),
    description: z.string(),
  });

  const { createdBy, title, description } = createTaskBody.parse(request.body);

  await prisma.task.create({
    data: {
      createdBy: createdBy,
      title: title,
      description: description,
    },
  });
};

export const toggleTaskCompleted = async (request: FastifyRequest) => {
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
};

export const deleteTask = async (request: FastifyRequest) => {
  const getTaskParams = z.object({
    taskId: z.string().uuid(),
  });

  const { taskId } = getTaskParams.parse(request.query);

  await prisma.task.delete({
    where: {
      id: taskId,
    },
  });
};
