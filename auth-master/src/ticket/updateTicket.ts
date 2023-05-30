/*import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

// update a ticket
router.patch("/:id", async (req, res, next) => {
    try {
        const updateTicketByAdmin = await prisma.ticket.update({
            where: {
                id: String(req.params.id),
            },
            data: {                
                employeeId: req.body.employeeId,
            },
        });
        res.json({ updateTicketByAdmin });
    } catch (error: any) {
        next(error.message);
    }
});
export default router;*/

import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

// Create a notification
const createNotification = async (name: string, adminId: string | undefined, employeeId: string | undefined, clientId: string | undefined) => {
  return prisma.notification.create({
    data: {
      name: name,
      adminId: adminId,
      employeeId: employeeId,
      clientId: clientId,
    },
  });
};

// Update a ticket
router.patch("/:id", async (req, res, next) => {
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
        screenshots: req.body.screenshots,    
        projectId: req.body.projectId,

      },
      include: {
        employee: true,
        client: true,
      },
    });

    let notification;
    const employee = await prisma.employee.findFirst({});
    const employeeName = employee?.fullname;
    const client = await prisma.client.findFirst({});
    const clientName = client?.fullname;
    if (req.body.employeeId) {
      // If an admin updates the ticket (adds an employee), send notification to the employee
      const employee = await prisma.employee.findFirst();
      const employeeId = employee?.userId;
        notification = await createNotification("Ticket assigned to you", undefined, employeeId, undefined);
      
    } else if (req.body.status == 'resolved') {
      // If an employee updates the ticket (updates the status to resolved), send notification to the admin and client
        const admin = await prisma.admin.findFirst();
        const adminId = admin?.userId;
        const client = await prisma.client.findFirst();
        const clientId = client?.userId;
      notification = await createNotification(`Ticket Resolved by the employee ${employeeName}`, adminId, undefined, clientId);
      
    }else if (req.body.status) {
      // If an employee updates the ticket (updates the status), send notification to the admin 
        const admin = await prisma.admin.findFirst();
        const adminId = admin?.userId;
        notification = await createNotification(`Ticket status updated by ${employeeName}`, adminId, undefined, undefined);
      
    }
    else {
      const admin = await prisma.admin.findFirst();
      const adminId = admin?.userId;
      const employee = await prisma.employee.findFirst();
      const employeeId = employee?.userId;
      notification = await createNotification(`Ticket updated by the customer ${clientName}`, adminId, employeeId, undefined);
    }
    res.json({ updatedTicket, notification });
  } catch (error: any) {
    next(error.message);
  }
});

export default router;