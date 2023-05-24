import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// get all Departments
router.get("/", async (req, res, next) => {
    try {
        const departments = await prisma.department.findMany({
            include: {
                employee: true,
            }
        });
        res.json({ departments });

    } catch (error: any) {
        next(error.message);
    }
});
// get a Department by id

router.get("/:id", async (req, res, next) => {
    try {
        const department= await prisma.department.findUnique({
            where: {
                id: String(req.params.id),
            },
            include: {
                employee: true
            }
        });

        res.json({ department });
    } catch (error: any) {
        next(error.message);
    }
});

export default router;