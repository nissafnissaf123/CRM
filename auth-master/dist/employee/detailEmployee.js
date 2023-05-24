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
        const employee = await prisma.employee.findMany({
            include: {
                department: true
            }
        });
        res.json({ employee });
    }
    catch (error) {
        next(new Error('Something went wrong to get Employee!'));
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const employee = await prisma.employee.findUnique({
            where: {
                id: String(req.params.id),
            },
            include: { department: true },
        });
        console.log('can not Show ');
        res.json({ employee });
    }
    catch (error) {
        next(new Error('Something went wrong to get Employee!'));
    }
});
exports.default = router;
//# sourceMappingURL=detailEmployee.js.map