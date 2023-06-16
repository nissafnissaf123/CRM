import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// get all clients
router.get("/", async (req, res, next) => {
    try {
        const client = await prisma.client.findMany({
        include:{user:true}
        });

        res.json({ client });
    } catch (error: any) {
        next(error.message);
    }
});
//////
router.get("/count", async (req, res, next) => {
  try {
    const clientCount = await prisma.client.count();

    res.json({ clientCount });
  } catch (error: any) {
    console.error('Error counting clients:', error);
    next(new Error('Something went wrong while counting clients!'));
  }
});

// get a client by id

router.get("/:userId", async (req, res, next) => {
    try {
        const client = await prisma.client.findUnique({
            where: {
                userId: String(req.params.userId),
            },
            include: {  user:true },
        });
        res.json({ client });
    } catch (error: any) {
        next(error.message);
    }
});

export default router;