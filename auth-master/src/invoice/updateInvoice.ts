import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));
// update a invoice
router.patch("/:id", async (req, res, next) => {
    try {

        const invoiceId = String(req.params.id);

        const invoice = await prisma.invoice.update({
            where: {
                id: invoiceId,
            },
            data: {
                projectId: req.body.projectId,
                description:req.body.description,   
                endDate:req.body.endDate,
                issueDate:req.body.issueDate,
                cost: req.body.cost,
                jour: req.body.jour,
                price: req.body.price,
                status:req.body.status,
                total: req.body.total,
              },
              include: {
                project: true,
              },
        });

        res.json({ invoice });
    } catch (error: any) {
        next(error.message);
    }
});
export default router;