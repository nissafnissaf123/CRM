import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

// update a task
router.patch("/:id", async (req, res, next) => {
    try {
        const task = await prisma.task.update({
            where: {
                id: String(req.params.id),
            },
            data: {
                description: req.body.description,
                name: req.body.name,
                priority: req.body.priority,
                projectId: req.body.projectId,
                startDate: req.body.startDate,
                status: req.body.status,
                employeeId: req.body.employeeId
            },
        });
        console.log(task)
        // Get the admin ID
            const admin = await prisma.admin.findFirst();
            const adminId = admin?.userId;
        if (!adminId) {
            throw new Error("No admin found in the database");
        }
        console.log(adminId)
    const notification = await prisma.notification.create({
        data: {
            name: "Task updated",
            adminId: adminId,
        },
    });
        console.log(notification)
        res.json({ task, notification });
    } catch (error: any) {
        next(error.message);
    }
});
export default router;