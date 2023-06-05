import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

// update a project
router.patch("/:id", async (req, res, next) => {
    try {

      const projectId = String(req.params.id);
      
      const project = await prisma.project.update({
        where: {
          id: projectId,
        },
        data: {
          clientId: req.body.clientId,
          name: req.body.name,
          description:req.body.description,   
          endDate:req.body.endDate,
          category: req.body.category,
          framework: req.body.framework,
        },
        include: {
          client: true,
        },
      });
  
      res.json({ project });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
export default router;