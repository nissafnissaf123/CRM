import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

// Create a notification
const createNotification = async (name: string, adminId: string | undefined, employeeId: string | undefined, clientId: string | undefined, read : boolean) => {
  return prisma.notification.create({
    data: {
      name: name,
      adminId: adminId,
      employeeId: employeeId,
     clientId: clientId
      },
  });
};

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
                endDate:req.body.endDate,
                employeeId: req.body.employeeId
            },
            include:{employee:true}
        });
      let notification;
      const employeeName = task.employee?.fullname;
      const tasks = await prisma.task.findUnique({
            where: {
                id: task.id,
            },
        });

    const taskName = tasks?.name;
    if (req.body.status) {
      // If an employee updates the task status, send notification to the admin
        const admin = await prisma.admin.findFirst();
        const adminId = admin?.userId;
        notification = await createNotification( `The Task '${taskName}' status updates by the employee ${employeeName}`, adminId, undefined, undefined,true);
    } else {
        const employeeId = task.employee?.userId;
        notification = await createNotification(`The Task '${taskName}' updated by the Manager`, undefined, employeeId, undefined,true);
    }
        
        res.json({ task, notification });
    } catch (error: any) {
        next(error.message);
    }
});
export default router;