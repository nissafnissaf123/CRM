import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// get all facture
router.get("/", async (req, res, next) => {
    try {
        const invoice = await prisma.invoice.findMany({});

        res.json({ invoice });
    } catch (error: any) {
        next(error.message);
    }
});
// get a invoice by id

router.get("/:id", async (req, res, next) => {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: String(req.params.id),
            },
        });

        res.json({ invoice });
    } catch (error: any) {
        next(error.message);
    }
});

export default router;