import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

// update a ticket
router.patch("/:id", async (req, res, next) => {
    try {
        const ticket = await prisma.ticket.update({
            where: {
                id: String(req.params.id),
            },
            data: req.body,
        });

        res.json({ ticket });
    } catch (error: any) {
        next(error.message);
    }
});
export default router;