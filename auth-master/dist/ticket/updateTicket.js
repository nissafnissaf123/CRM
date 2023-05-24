"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.use(express_1.default.urlencoded({ extended: true }));
router.patch("/:id", async (req, res, next) => {
    try {
        const ticket = await prisma.ticket.update({
            where: {
                id: String(req.params.id),
            },
            data: req.body,
        });
        res.json({ ticket });
    }
    catch (error) {
        next(error.message);
    }
});
exports.default = router;
//# sourceMappingURL=updateTicket.js.map