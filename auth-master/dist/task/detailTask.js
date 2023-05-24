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
        const tasks = await prisma.task.findMany({});
        res.json({ tasks });
    }
    catch (error) {
        next(error.message);
    }
});
router.get("/:id", async (req, res, next) => {
    try {
        const task = await prisma.task.findUnique({
            where: {
                id: String(req.params.id),
            },
        });
        res.json({ task });
    }
    catch (error) {
        next(error.message);
    }
});
exports.default = router;
//# sourceMappingURL=detailTask.js.map