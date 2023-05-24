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
        const categories = await prisma.categorie.findMany({});
        res.json({ categories });
    }
    catch (error) {
        next(error.message);
    }
});
exports.default = router;
//# sourceMappingURL=detailCategory.js.map