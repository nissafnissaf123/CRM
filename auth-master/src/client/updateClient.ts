import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, username, password,fullname,facebook,instagram,taxId,whatsapp, avatar, phone, companyName } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { email, username ,password},
    });

    const updatedClient = await prisma.client.update({
      where: { userId: id },
      data: {fullname,facebook,instagram,taxId,whatsapp,avatar, phone,companyName  },
    });

    console.log(updatedUser);
    console.log(updatedClient);

    res.json({ client: updatedClient });
  } catch (error: any) {
    console.error('Error updating employee:', error);
    next(new Error('Something went wrong while updating the employee!'));
  }
});

export default router;