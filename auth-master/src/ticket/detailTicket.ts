import express from "express";
import {  PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// get all tickets
router.get("/", async (req, res, next) => {
    try {
        const tickets = await prisma.ticket.findMany({
            include: {
                client: {
                  include: {
                    user: true
                  }
                },
                project: true,
                employee:true
              }
        });
        res.json({ tickets });
    } catch (error: any) {
        next(error.message);
    }
});
// get a ticket by id

router.get("/:id", async (req, res, next) => {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: String(req.params.id),
            },
            include: {
                client: true,
                employee:true,
                project:true 
            }
        });

        res.json({ ticket });
    } catch (error: any) {
        next(error.message);
    }
});

export default router;