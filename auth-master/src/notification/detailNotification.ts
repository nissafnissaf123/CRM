import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();


router.get("/", async (req, res, next) => {
    try {
      const notifications = await prisma.notification.findMany();
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  });

 
export default router;