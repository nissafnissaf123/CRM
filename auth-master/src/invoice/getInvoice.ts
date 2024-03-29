import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// get all facture
router.get("/", async (req, res, next) => {
    try {
        const invoice = await prisma.invoice.findMany({
            include: {
               
                project: {
                    include: {
                        client: {
                            include: {
                              user: true,
                            },
                          },
                    },
                }
            }
        });
       
        res.json({ invoice });
    } catch (error: any) {
        next(error.message);
    }
});
// invoice payed or not
router.get("/count", async (req, res, next) => {
  try {
    const invoiceCount = await prisma.invoice.count();

    res.json({ invoiceCount });
  } catch (error: any) {
    console.error('Error counting invoices:', error);
    next(new Error('Something went wrong while counting invoices!'));
  }
});

// get a invoice by id
router.get("/:id", async (req, res, next) => {
    try {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: String(req.params.id),
            },

            include: {
               
                project: {
                    include: {
                        client: {
                            include: {
                              user: true,
                            },
                          },
                    },
                }
            }
            
        });

        res.json({ invoice });
    } catch (error: any) {
        next(error.message);
    }
});

export default router;