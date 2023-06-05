import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {

  try {
    const notifications = await prisma.notification.findMany();

    // Filter notifications based on the recipient (employee, admin, client)
    const employeeNotifications = notifications.filter(notification => notification.employeeId && !notification.read);
    const adminNotifications = notifications.filter(notification => notification.adminId && !notification.read);
    const clientNotifications = notifications.filter(notification => notification.clientId && !notification.read);
    // Count unread notifications for each recipient
    const employeeUnreadNotificationCount = employeeNotifications.filter(notification => !notification.read).length;
    const adminUnreadNotificationCount = adminNotifications.filter(notification => !notification.read).length;
    const clientUnreadNotificationCount = clientNotifications.filter(notification => !notification.read).length;

    res.json({ notifications,employeeUnreadNotificationCount, adminUnreadNotificationCount, clientUnreadNotificationCount });
  } catch (error) {
    next(error);
  }
});
router.get("/admin", async (req, res, next) => {
  try {
    const adminNotifications = await prisma.notification.findMany({
      where: {
        adminId: { not: null },
        read: false
      }
    });

    const adminUnreadNotificationCount = adminNotifications.length*0;

    res.json({ adminUnreadNotificationCount });
  } catch (error) {
    next(error);
  }
});
router.get("/employee", async (req, res, next) => {
  try {
    const employeeNotifications = await prisma.notification.findMany({
      where: {
        employeeId: { not: null },
        read: false
      }
    });

    const employeeUnreadNotificationCount = employeeNotifications.length*0;

    res.json({ employeeUnreadNotificationCount });
  } catch (error) {
    next(error);
  }
});
router.get("/client", async (req, res, next) => {
  try {
    const clientNotifications = await prisma.notification.findMany({
      where: {
        clientId: { not: null },
        read: false
      }
    });

    const clientUnreadNotificationCount = clientNotifications.length*0;

    res.json({ clientUnreadNotificationCount });
  } catch (error) {
    next(error);
  }
});
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    // Update the notification to mark it as read
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: { read: true }
    });

    // Retrieve the updated notifications after marking one as read
    const notifications = await prisma.notification.findMany();

    // Filter and count unread notifications for each recipient
    const employeeNotifications = notifications.filter(notification => notification.employeeId && !notification.read);
    const adminNotifications = notifications.filter(notification => notification.adminId && !notification.read);
    const clientNotifications = notifications.filter(notification => notification.clientId && !notification.read);
    const employeeUnreadNotificationCount = employeeNotifications.length;
    const adminUnreadNotificationCount = adminNotifications.length;
    const clientUnreadNotificationCount = clientNotifications.length;

    res.json({ updatedNotification, employeeUnreadNotificationCount, adminUnreadNotificationCount, clientUnreadNotificationCount });
  } catch (error) {
    next(error);
  }
});
export default router;
