import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');

router.use(express.urlencoded({ extended: true }));

// Create a notification
const createNotification = async (name: string, adminId: string | undefined, employeeId: string | undefined, clientId: string | undefined,read:boolean) => {
  return prisma.notification.create({
    data: {
      name: name,
      adminId: adminId,
      employeeId: employeeId,
      clientId: clientId,
      read: false
    },
  });
};

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dbopvb3i8',
  api_key: '743974992731346',
  api_secret: 'hRFjFTyFXF87wIH3AxOtt7MZ_dc'
});
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
// Update a ticket
router.patch("/:id",videoUpload.single('video'), async (req, res, next) => {
  try {
    const ticketId = String(req.params.id);

    const updatedTicket = await prisma.ticket.update({
      where: {
        id: ticketId,
      },
      data: {
        employeeId: req.body.employeeId,
        status: req.body.status,
        name: req.body.name,
        description:req.body.description,
        emergencyLevel:req.body.emergencyLevel,
        video: req.file?.path,    
        projectId: req.body.projectId,
      },
      include: {
        employee: true,
        client: true,
      },
    });

    let notification;
        const tickets = await prisma.ticket.findUnique({
            where: {
                id: ticketId,
            },
        });

    const ticketName = tickets?.name;
    const employeeName = updatedTicket.employee?.fullname ?? "";
    const clientName = updatedTicket.client?.fullname ?? "";
  
    if (req.body.employeeId) {
      // If an admin updates the ticket (assign an employee), send notification to the employee
      const employeeId = updatedTicket.employee?.userId;
        notification = await createNotification(`The ${ticketName} Ticket assigned to you`, undefined, employeeId, undefined,true);
    } else if (req.body.status === 'resolved') {
      // If an employee updates the ticket (updates the status to resolved), send notification to the admin and client
        const admin = await prisma.admin.findFirst();
        const adminId = admin?.userId;
        const clientId = updatedTicket.client?.userId;
      notification = await createNotification(`The ${ticketName} Ticket Resolved by the employee ${employeeName}`, adminId, undefined, clientId,true);
      
    }
    else {
      const admin = await prisma.admin.findFirst();
      const adminId = admin?.userId;
      const employeeId = updatedTicket.employee?.userId;
      notification = await createNotification(`The ${ticketName} Ticket updated by the customer ${clientName}`, adminId, employeeId, undefined,true);
    }
    res.json({ updatedTicket, notification });
  } catch (error: any) {
    next(error.message);
  }
});

export default router;