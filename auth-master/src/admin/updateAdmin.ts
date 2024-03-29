import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));
router.use(express.urlencoded({ extended: true }));
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dbopvb3i8',
  api_key: '743974992731346',
  api_secret: 'hRFjFTyFXF87wIH3AxOtt7MZ_dc'
});

// Configure multer and Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'avatar', // The folder in your Cloudinary account where the avatars will be stored
format: async (file: { mimetype: string; }) => {
      // Determine the file format based on the original file's mimetype
      if (file.mimetype === 'image/jpeg') {
        return 'jpg';
      }
      if (file.mimetype === 'image/png') {
        return 'png';
      }
      
    },   
  public_id: () => 'avatar_' + Date.now() // The public ID of the image
  }
});
    const upload = multer({ storage: storage });
    router.patch("/:id", upload.single('avatar'), async (req, res, next) => {
      try {
        const { id } = req.params;
        const { email, username, password, phone, 
          fullname,  adresse, facebook, instagram,
          linkedin,  createdAt } = req.body;
    
        const updatedUser = await prisma.user.update({
          where: { id: id },
          data: { email, username, password,phone },
        });
    
        let avatarPath = null;
        const existingAdmin = await prisma.admin.findUnique({
          where: { userId: id },
        });
    
        if (existingAdmin && req.file) {
          // New avatar is uploaded
          avatarPath = req.file.path;
        } else if (existingAdmin) {
          avatarPath = existingAdmin.avatar;
        }
    
        const updatedAdmin = await prisma.admin.update({
          where: { userId: id },
          data: {
            avatar: avatarPath, fullname,
             createdAt, adresse,
            facebook,instagram,linkedin
          },
         
        });
    
        console.log(updatedUser);
        console.log(updatedAdmin);
    
        res.json({ employee: updatedAdmin });
      } catch (error: any) {
      console.error('Error updating employee:', error);
        const updatedError = new error('Something went wrong while updating the employee!');
        next(updatedError);
      }
    });
export default router;