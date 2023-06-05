import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// get all projects
router.get("/", async (req, res, next) => {
    try {
        const projects = await prisma.project.findMany({
            include: {
                client: true,
                tasks:true
            }
        });

        res.json({ projects });
    } catch (error: any) {
        next(error.message);
    }
});

// get a project by id
router.get("/:id", async (req, res) => {
    try {
      const project = await prisma.project.findUnique({
        where: {
          id: String(req.params.id),
        },
        include: {
          client: true,
          tasks: true,
        },
      });
         if (!project) {
              return res.status(404).json({ message: "Le projet n'a pas été trouvé" });
          }
  
      const todoTaskCount = await prisma.task.count({
        where: {
          projectId: String(req.params.id),
          status: 'Todo',
        },
      });
      const doingTaskCount = await prisma.task.count({
        where: {
          projectId: String(req.params.id),
          status: 'Doing',
        },
      });
      const doneTaskCount = await prisma.task.count({
        where: {
          projectId: String(req.params.id),
          status: 'Done',
        },
      });
  
      const totalTaskCount = todoTaskCount + doingTaskCount + doneTaskCount;
  
      let progress;
      if (totalTaskCount === 0) {
        progress = 0;
      } else {
        progress = Math.round((doneTaskCount / totalTaskCount) * 100);
      }
  
      project.progress = progress;
      console.log(progress)
      const projects = await prisma.project.findUnique({
        where: {
          id: String(req.params.id),
        }
      });
        const projectName = projects?.name;
        const admin = await prisma.admin.findFirst();
        const adminId = admin?.userId;
        if (!adminId) {
            throw new Error("No admin found in the database");
        }
        let notification;

      if (progress === 100) {
       notification =  await prisma.notification.create({
        data: {
          name:  `Project '${projectName}' completed`,
           adminId: adminId,
          read: false
        },
      });
        console.log(notification)
      }
        
      res.json({ project ,notification});
    } catch (error) {
    console.error('Error occurred while counting tasks:', error);
    }
  });


//Get Tasks of projects
router.get("/:id/tasks", async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const tasks = await prisma.task.findMany({
      where: {
        projectId: String(projectId),
      },
      include: {
        employee: true,
      },
    });

    res.json({ tasks });
  } catch (error) {
    next(error);
  }
});


export default router;
