import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use(express.urlencoded({ extended: true }));

router.post("/", async (req, res, next) => {
    try {
        const client = await prisma.client.findFirst({});
        const clientId = client?.userId;

        const ticket = await prisma.ticket.create({
            data: {
                name: req.body.name,
                description:req.body.description,
                emergencyLevel:req.body.emergencyLevel,
                projectId: req.body.projectId,
                status:req.body.status,
                screenshots: req.body.screenshots,
                clientId: clientId,
                //video
            },
            include:{
                employee: true,
                client:true
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
        res.json({ ticket,notification });
    } catch (error: any) {
        next(new Error(error.message));
    }
});
export default router;