import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
    try {
        const trainee = await prisma.trainee.create({
            data: { ...req.body },
        });
        res.json({ trainee });
    } catch (error: any) {
        next(new Error('Something went wrong to add an Trainee!'));
    }
});
export default router;