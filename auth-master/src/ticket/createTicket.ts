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
//const imageUpload = multer({ storage: imageStorage });
const videoUpload = multer({ storage: videoStorage });
router.post("/",videoUpload.single('video'), async (req, res, next) => {
    try {
    const projectId = req.body.projectId;
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

      const clientId = project?.clientId;
      console.log(clientId)
    const ticket = await prisma.ticket.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        emergencyLevel: req.body.emergencyLevel,
        projectId: req.body.projectId,
        status: req.body.status,
        screenshots: req.file?.path,
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
        name: `Ticket created by ${clientName}`,
        adminId: adminId,
        read: false
      },
    });

    res.json({ ticket, notification });
  } catch (error: any) {
 console.error("An error occurred:", error);
  next(new Error("An error occurred while creating the ticket. Please try again later."));
}
});

export default router;
