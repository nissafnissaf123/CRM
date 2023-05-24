import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

router.patch("/:id", async (req, res, next) => {
    try {
        const trainee = await prisma.trainee.update({
            where: {
                id: String(req.params.id),
            },
            data: req.body,
        });

        res.json({ trainee });
    } catch (error: any) {
        next(error.message);
    }
});
export default router;