
import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// get an employee by id
router.get("/:userId", async (req, res, next) => {
    try {
        const admin = await prisma.admin.findUnique({
            where: {
                userId: String(req.params.userId),
            },
            include: {   user:true },

        });
        res.json({ admin });
    } catch (error: any) {
        next(new Error('Something went wrong to get Admin!'));
    }
});

export default router;