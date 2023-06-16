import { Notification } from './../node_modules/.prisma/client/index.d';
import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth';
import resetPassword from './routes/resetPassword';
import updateAdmin from './admin/updateAdmin';
import createProject from './project/createProject';
import projectDetails from './project/getProject';
import updateProject from './project/updateProject';
import deleteProject from './project/deleteProject';

import createClient from './client/createClient';
import deleteClient from './client/deleteClient';
import clientUpdate from './client/updateClient';
import clientDetails from './client/getClient';

import createDepartment from './department/createDepartment'
import departmentDetails from './department/detailDepartment'
import updateDepartment from './department/updateDepartment'

import createInvoice from './invoice/createInvoice';
import invoiceDetails from './invoice/getInvoice';
import updateInvoice from './invoice/updateInvoice';

import createTask from './task/createTask';
import taskDetails from './task/detailTask';
import updateTask from './task/updateTask';
import deleteTask from './task/deleteTask';

import notificationDetails from './notification/detailNotification';

import createCategory from './category/createCategory';
import categoryDetails from './category/detailCategory';

import createTicket from './ticket/createTicket';
import ticketDetails from './ticket/detailTicket';
import updateTicket    from './ticket/updateTicket';
import deleteTicket from './ticket/deleteTicket';

import createEmployee from './employee/createEmployee';
import employeeDetails from './employee/detailEmployee';
import updateEmployee from './employee/updateEmployee';

const app = express();
app.use(express.json());

// Import le module "cors"
const cors = require('cors');
app.use(cors());
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Use prisma object to perform database operations


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, post, PATCH, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use('/auth', authRoutes, resetPassword);
app.use('/admin', updateAdmin);
app.use('/project', createProject, projectDetails, updateProject, deleteProject);
app.use('/client', createClient, deleteClient, clientUpdate, clientDetails);
app.use('/department', createDepartment, departmentDetails,updateDepartment);
app.use('/invoice', createInvoice, invoiceDetails, updateInvoice);
app.use('/task', createTask, taskDetails, deleteTask, updateTask);
app.use('/notification',  notificationDetails);
app.use('/category', createCategory, categoryDetails);
app.use('/ticket', createTicket, deleteTicket, ticketDetails, updateTicket);
app.use('/employee', createEmployee, updateEmployee, employeeDetails);
app.use(errorHandler);

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  } finally {
    await prisma.$disconnect();
  }
}
testConnection();

app.listen(4001, () => {
    console.log('Server listening on port 4001');
});
