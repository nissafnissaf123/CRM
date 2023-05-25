"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("./middleware/errorHandler");
const auth_1 = __importDefault(require("./routes/auth"));
const createProject_1 = __importDefault(require("./project/createProject"));
const getProject_1 = __importDefault(require("./project/getProject"));
const updateProject_1 = __importDefault(require("./project/updateProject"));
const deleteProject_1 = __importDefault(require("./project/deleteProject"));
const createClient_1 = __importDefault(require("./client/createClient"));
const deleteClient_1 = __importDefault(require("./client/deleteClient"));
const updateClient_1 = __importDefault(require("./client/updateClient"));
const getClient_1 = __importDefault(require("./client/getClient"));
const createDepartment_1 = __importDefault(require("./department/createDepartment"));
const detailDepartment_1 = __importDefault(require("./department/detailDepartment"));
const createInvoice_1 = __importDefault(require("./invoice/createInvoice"));
const getInvoice_1 = __importDefault(require("./invoice/getInvoice"));
const updateInvoice_1 = __importDefault(require("./invoice/updateInvoice"));
const createTask_1 = __importDefault(require("./task/createTask"));
const detailTask_1 = __importDefault(require("./task/detailTask"));
const updateTask_1 = __importDefault(require("./task/updateTask"));
const deleteTask_1 = __importDefault(require("./task/deleteTask"));
const CreateLabel_1 = __importDefault(require("./label/CreateLabel"));
const createCategory_1 = __importDefault(require("./category/createCategory"));
const detailCategory_1 = __importDefault(require("./category/detailCategory"));
const createTicket_1 = __importDefault(require("./ticket/createTicket"));
const detailTicket_1 = __importDefault(require("./ticket/detailTicket"));
const updateTicket_1 = __importDefault(require("./ticket/updateTicket"));
const deleteTicket_1 = __importDefault(require("./ticket/deleteTicket"));
const createEmployee_1 = __importDefault(require("./employee/createEmployee"));
const detailEmployee_1 = __importDefault(require("./employee/detailEmployee"));
const updateEmployee_1 = __importDefault(require("./employee/updateEmployee"));
const createTrainee_1 = __importDefault(require("./trainee/createTrainee"));
const detailTrainee_1 = __importDefault(require("./trainee/detailTrainee"));
const updateTrainee_1 = __importDefault(require("./trainee/updateTrainee"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const cors = require('cors');
app.use(cors());
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Methods", "GET, post, PATCH, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use('/auth', auth_1.default);
app.use('/project', createProject_1.default, getProject_1.default, updateProject_1.default, deleteProject_1.default);
app.use('/client', createClient_1.default, deleteClient_1.default, updateClient_1.default, getClient_1.default);
app.use('/department', createDepartment_1.default, detailDepartment_1.default);
app.use('/invoice', createInvoice_1.default, getInvoice_1.default, updateInvoice_1.default);
app.use('/task', createTask_1.default, detailTask_1.default, deleteTask_1.default, updateTask_1.default);
app.use('/category', createCategory_1.default, detailCategory_1.default);
app.use('/ticket', createTicket_1.default, deleteTicket_1.default, detailTicket_1.default, updateTicket_1.default);
app.use('/employee', createEmployee_1.default, updateEmployee_1.default, detailEmployee_1.default);
app.use('/trainee', createTrainee_1.default, detailTrainee_1.default, updateTrainee_1.default);
app.use('/label', CreateLabel_1.default);
app.use(errorHandler_1.errorHandler);
async function testConnection() {
    try {
        await prisma.$connect();
        console.log('Connected to the database');
    }
    catch (error) {
        console.error('Failed to connect to the database:', error);
    }
    finally {
        await prisma.$disconnect();
    }
}
testConnection();
app.listen(4001, () => {
    console.log('Server listening on port 4001');
});
//# sourceMappingURL=index.js.map