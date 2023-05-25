"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get("/", async (req, res, next) => {
    try {
        const employees = await prisma.employee.findMany({
            include: {
                department: true,
                user: true
            }
        });
        res.json({ employees });
    }
    catch (error) {
        console.error('Error fetching employees:', error);
        next(new Error('Something went wrong while fetching employees!'));
    }
});
router.get("/:userId", async (req, res, next) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                userId: String(req.params.userId),
            },
            include: { department: true, user: true },
        });
        res.json({ employee });
    }
    catch (error) {
        next(new Error('Something went wrong to get Employee!'));
    }
});
exports.default = router;
//# sourceMappingURL=detailEmployee.js.map