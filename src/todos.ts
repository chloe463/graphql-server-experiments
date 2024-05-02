import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import express from "express";
import { ValidationError } from "./errors";
const router = express.Router();

const prismaClient = new PrismaClient({
  log: [
    {
      level: "query",
      emit: "event",
    },
  ],
});

router.get("/", async (req, res) => {
  const todos = await prismaClient.todo.findMany({
    where: {
      deletedAt: {
        equals: null,
      },
    },
  });
  res.status(200);
  res.json(todos);
});

router.post("/", async (req, res, next) => {
  try {
    const { task } = req.body;
    if (!task) throw new ValidationError("body.task must be non-empty string!");

    const newTodo = await prismaClient.todo.create({
      data: {
        task,
        finishedAt: null,
      },
      select: {
        id: true,
        task: true,
        finishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    res.status(201);
    res.json(newTodo);
  } catch (e) {
    if (e instanceof ValidationError) {
      res.status(400);
      res.json({ message: e.message });
      next();
      return;
    }
    res.status(500);
    res.json(e);
    next();
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { task, finishedAt } = req.body;

    if (!task) throw new ValidationError("body.task must be non-empty string!");

    const updatedTodo = await prismaClient.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        task,
        finishedAt: finishedAt || null,
        deletedAt: null,
      },
      select: {
        id: true,
        task: true,
        finishedAt: true,
        deletedAt: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    console.log({ updatedTodo });
    res.status(200);
    res.json(updatedTodo);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      res.status(404);
      const { id } = req.params;
      res.json({ message: `todo:${id} is not found` });
      next();
      return;
    } else if (e instanceof ValidationError) {
      res.status(400);
      res.json({ message: e.message });
      next();
      return;
    }
    res.status(500);
    res.json({ message: "Internal server error" });
    next();
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await prismaClient.todo.update({
      where: { id: Number(id) },
      data: {
        deletedAt: new Date(),
      },
      select: {
        id: true,
      },
    });
    res.status(200);
    res.json(deleted);
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      res.status(404);
      const { id } = req.params;
      res.json({ message: `todo:${id} is not found` });
      next();
      return;
    }
    res.status(500);
    res.json({ message: "Internal server error" });
    next();
  }
});

export default router;
