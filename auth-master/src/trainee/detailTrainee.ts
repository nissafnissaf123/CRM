import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// get all Trainees
router.get("/", async (req, res, next) => {
    try {
        const trainee = await prisma.trainee.findMany({
          
        });
        res.json({ trainee });
    } catch (error: any) {
        next(error.message);
    }
});
// get a client by id
router.get("/:id", async (req, res, next) => {
    try {
        const trainee = await prisma.trainee.findUnique({
            where: {
                id: String(req.params.id),
            },
            

        });
        res.json({ trainee });
    } catch (error: any) {
        next(error.message);
    }
});

export default router;