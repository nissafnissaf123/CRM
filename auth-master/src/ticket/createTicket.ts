import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
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

// Configure multer and Cloudinary storage for images
/*const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'screenshots',
    format: async (file: { mimetype: string; }) => {
      // Determine the file format based on the original file's mimetype
      if (file.mimetype === 'image/jpeg') {
        return 'jpg';
      }
      if (file.mimetype === 'image/png') {
        return 'png';
      }
      // Default to JPEG format if the file is neither JPG nor PNG
      return 'jpg';
    },
    public_id: () => 'screenshots_' + Date.now()
  }
});

const imageUpload = multer({ storage: imageStorage });*/
 
// Configure multer and Cloudinary storage for videos
const videoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'video',
    resource_type: 'video',
    format: async () => 'mp4',
    public_id: () => 'video_' + Date.now()
  }
});
const videoUpload = multer({ storage: videoStorage });
router.post("/",videoUpload.single('video'), async (req, res, next) => {
    try {
       
    const client = await prisma.client.findFirst({});
    const clientId = client?.userId;

    const ticket = await prisma.ticket.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        emergencyLevel: req.body.emergencyLevel,
        projectId: req.body.projectId,
        status: req.body.status,
        //screenshots: req.file?.path,
        clientId: clientId,
        video: req.file?.path,
      },
      include: {
        employee: true,
        client: true
      }
    });

    const admin = await prisma.admin.findFirst();
    const adminId = admin?.userId;
    if (!adminId) {
      throw new Error("No admin found in the database");
    }

    const clientName = ticket.client?.fullname;
    const notification = await prisma.notification.create({
      data: {
        name: `Ticket created by '${clientName}'`,
        adminId: adminId,
      },
    });

    res.json({ ticket, notification });
  } catch (error: any) {
 console.error("An error occurred:", error);
  next(new Error("An error occurred while creating the ticket. Please try again later."));
}
});

export default router;
