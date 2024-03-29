import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
    try {
        const project = await prisma.project.create({
            data: {...req.body },
            include: {
                client:true
            }
        });

        res.json({ project });
    } catch (error) {
        console.error(error);
        next(new Error('Failed to create project'));
    }
});

export default router;