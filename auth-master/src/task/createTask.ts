import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
    try {
        const task = await prisma.task.create({
            data: { 
                description: req.body.description,
                name: req.body.name,
                priority: req.body.priority,
                projectId: req.body.projectId,
                startDate: req.body.startDate,
                status: req.body.status,
                employeeId:req.body.employeeId
             },
            include: {
                employee: true,
                project:true
            }
           
        });
  const notification = await prisma.notification.create({
      data: {
        name: "Task created",
        employeeId: task.employeeId,
    },
    });
        res.json({ task, notification });
    } catch (error: any) {
        next(new Error(error.message));
    }
});
export default router;