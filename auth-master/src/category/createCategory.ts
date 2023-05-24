import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
    try {
        const categorie = await prisma.categorie.create({
            data: { name: '', ...req.body },
        });

        res.json({ categorie });
    } catch (error: any) {
        next(new Error(error.message));
    }
});
export default router;