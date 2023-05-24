"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id }, 'your-access-token-secret', {
        expiresIn: '30m',
    });
};
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id }, 'your-refresh-token-secret', {
        expiresIn: '7d',
    });
};
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    let user = null;
    user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (!user) {
        return res.status(401).json({ message: 'Invalid email' });
    }
    if (user.password !== password) {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({ accessToken, refreshToken, Role: user.roles });
});
router.post('/register', async (req, res) => {
    const { password, email } = req.body;
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    const user = await prisma.admin.create({
        data: Object.assign({ password: hashedPassword, email }, req.body),
    });
    res.send({ user, message: 'Registered Successfully' });
});
exports.default = router;
//# sourceMappingURL=auth.js.map