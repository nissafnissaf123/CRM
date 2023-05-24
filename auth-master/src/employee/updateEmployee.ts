import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));
/*
router.patch("/:id", async (req, res) => {
  try {
      const employee = await prisma.employee.update({
        where: {
          id: String(req.params.id),
        },
        data: req.body,
      });
  
      res.json({ employee });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
});*/
  router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, username,password, avatar, phone, departmentId } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { email, username,password },
    });

    const updatedEmployee = await prisma.employee.update({
      where: { userId: id },
      data: { avatar, phone, departmentId },
      include: { department: true },
    });

    console.log(updatedUser);
    console.log(updatedEmployee);

    res.json({ employee: updatedEmployee });
  } catch (error: any) {
    console.error('Error updating employee:', error);
    next(new Error('Something went wrong while updating the employee!'));
  }
});

export default router;