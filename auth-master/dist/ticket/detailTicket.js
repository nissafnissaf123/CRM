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
        const tickets = await prisma.ticket.findMany({
            include: {
                client: true,
                project: true
            }
        });
        res.json({ tickets });
    }
    catch (error) {
        next(error.message);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: String(req.params.id),
            },
            include: {
                client: true
            }
        });
        res.json({ ticket });
    }
    catch (error) {
        next(error.message);
    }
});
exports.default = router;
//# sourceMappingURL=detailTicket.js.map