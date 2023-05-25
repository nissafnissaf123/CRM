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
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
cloudinary.config({
    cloud_name: 'dymjsitwp',
    api_key: '444551698815242',
    api_secret: 'n5Ru7UvyLOR9t9Vwb7FSKxEx4m0'
});
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'avatar',
        format: async (req, file) => 'jpg',
        public_id: (req, file) => 'avatar_' + Date.now()
    }
});
const upload = multer({ storage: storage });
router.patch("/:id", upload.single('avatar'), async (req, res, next) => {
    try {
        const { id } = req.params;
        const { email, username, password, phone, departmentId, fullname, poste, startDate, endDate } = req.body;
        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: { email, username, password },
        });
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        const updatedEmployee = await prisma.employee.update({
            where: { userId: id },
            data: { avatar: req.file.path, phone, departmentId, fullname, poste, startDate, endDate },
            include: { department: true },
        });
        console.log(updatedUser);
        console.log(updatedEmployee);
        res.json({ employee: updatedEmployee });
    }
    catch (error) {
        console.error('Error updating employee:', error);
        next(new Error('Something went wrong while updating the employee!'));
    }
});
exports.default = router;
//# sourceMappingURL=updateEmployee.js.map