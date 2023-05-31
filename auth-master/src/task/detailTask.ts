import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// get all tasks
router.get("/", async (req, res, next) => {
    try {
        const tasks = await prisma.task.findMany({
             include: {
                employee: true,
                project:true
            }
           
        });

        res.json({ tasks });
    } catch (error: any) {
        next(error.message);
    }
});
// get a task by id
router.get("/:id", async (req, res, next) => {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: String(req.params.id),
            },
            include: { employee:  true  ,project:true   }
        });

        res.json({ task });
    } catch (error: any) {
        next(error.message);
    }
});







export default router;