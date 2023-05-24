import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
    try {
        const ticket = await prisma.ticket.create({
            data: { name: '', ...req.body },
            include:{
                employee: true
            }
        });

        res.json({ ticket });
    } catch (error: any) {
        next(new Error(error.message));
    }
});
export default router;