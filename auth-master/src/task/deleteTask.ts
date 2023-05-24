import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.delete("/:id", async (req, res, next) => {
    try {
        await prisma.task.delete({
            where: {
                id: String(req.params.id),
            },
        });

        res.send("task Deleted Successfully");
    } catch (error: any) {
        next(error.message);
    }

});
export default router;