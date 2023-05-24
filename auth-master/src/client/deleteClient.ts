import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
// delete a client
router.delete("/:id", async (req, res, next) => {
    try {
        await prisma.client.delete({
            where: {
                id: String(req.params.id),
            },
        });

        res.send("Client Deleted Successfully");
    } catch (error: any) {
        next(error.message);
    }

});
export default router;