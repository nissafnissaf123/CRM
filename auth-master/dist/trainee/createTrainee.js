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
router.post("/", async (req, res, next) => {
    try {
        const trainee = await prisma.trainee.create({
            data: Object.assign({}, req.body),
        });
        res.json({ trainee });
    }
    catch (error) {
        next(new Error('Something went wrong to add an Trainee!'));
    }
});
exports.default = router;
//# sourceMappingURL=createTrainee.js.map