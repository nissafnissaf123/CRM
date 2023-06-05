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
 
        res.json({ task });
    } catch (error: any) {
        next(new Error(error.message));
    }
});
export default router;
/*       const tasks = await prisma.task.findUnique({
            where: {
                id: task.id,
            },
        });
        const taskName = tasks?.name;
        const admin = await prisma.admin.findFirst();
  const adminId = admin?.userId ?? "";

    const notification = await prisma.notification.create({
      data: {
        name: `New task ${taskName} created`,
        employeeId: task.employeeId,
        read: false, 
        adminId:adminId
    },
    });*/