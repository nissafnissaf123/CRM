import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// get all clients
router.get("/", async (req, res, next) => {
    try {
        const client = await prisma.client.findMany({
        include:{user:true}
        });

        res.json({ client });
    } catch (error: any) {
        next(error.message);
    }
});
// get a client by id

router.get("/:userId", async (req, res, next) => {
    try {
        const client = await prisma.client.findUnique({
            where: {
                userId: String(req.params.userId),
            },
            include: {  user:true },
        });
        res.json({ client });
    } catch (error: any) {
        next(error.message);
    }
});

export default router;