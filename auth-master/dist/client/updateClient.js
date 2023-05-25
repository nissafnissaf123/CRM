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
        const { id } = req.params;
        const { email, username, password, fullname, facebook, instagram, taxId, whatsapp, avatar, phone, companyName } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: { email, username, password },
        });
        const updatedClient = await prisma.client.update({
            where: { userId: id },
            data: { fullname, facebook, instagram, taxId, whatsapp, avatar, phone, companyName },
        });
        console.log(updatedUser);
        console.log(updatedClient);
        res.json({ client: updatedClient });
    }
    catch (error) {
        console.error('Error updating employee:', error);
        next(new Error('Something went wrong while updating the employee!'));
    }
});
exports.default = router;
//# sourceMappingURL=updateClient.js.map