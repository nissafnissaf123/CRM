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
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dymjsitwp',
  api_key: '444551698815242',
  api_secret: 'n5Ru7UvyLOR9t9Vwb7FSKxEx4m0'
});

// Configure multer and Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar', // The folder in your Cloudinary account where the avatars will be stored
    format: async (req: any, file: any) => 'jpg', // The desired image format
    public_id: (req: any, file: any) => 'avatar_' + Date.now() // The public ID of the image
  }
});
const upload = multer({ storage: storage });
  router.patch("/:id", upload.single('avatar'),async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, username,password, phone, departmentId ,fullname,poste,startDate,endDate} = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: id },
      data: { email, username,password },
    });
 if (!req.file) {
      throw new Error('No file uploaded');
      }   
    const updatedEmployee = await prisma.employee.update({
      where: { userId: id },
      data: { avatar:req.file.path, phone, departmentId ,fullname,poste,startDate,endDate},
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