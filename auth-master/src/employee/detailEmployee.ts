import express from "express";
import { PrismaClient } from "@prisma/client";
const router = express.Router();
const prisma = new PrismaClient();

// get all employees
router.get("/", async (req, res, next) => {
  try {
    const employees = await prisma.employee.findMany({
      include: {
        department: true,
        user: true
      }
    });

    res.json({ employees });
  } catch (error: any) {
    console.error('Error fetching employees:', error);
    next(new Error('Something went wrong while fetching employees!'));
  }
});

// get an employee by id
router.get("/:userId", async (req, res, next) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                userId: String(req.params.userId),
            },
            include: {  department: true, user:true },

        });
        res.json({ employee });
    } catch (error: any) {
        next(new Error('Something went wrong to get Employee!'));
    }
});




export default router;