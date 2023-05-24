import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// get all categories
router.get("/", async (req, res, next) => {
    try {
        const categories = await prisma.categorie.findMany({
            
        });
        res.json({categories });
    } catch (error: any) {
        next(error.message);
    }
});

export default router;