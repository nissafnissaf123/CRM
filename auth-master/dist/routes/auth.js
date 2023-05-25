"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const router = express_1.default.Router();
const jwtConfig = {
    JWT_SECRET: 'your-access-token-secret',
    expirationTime: '1h',
};
router.get('/me', async (req, res) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Invalid token format' });
    }
    const token = authorizationHeader.substring(7).trim();
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, jwtConfig.JWT_SECRET);
        const userId = decodedToken.userId;
        const user = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        res.json({ userData: { role: user === null || user === void 0 ? void 0 : user.roles, id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email } });
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid access token' });
    }
});
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id }, 'your-access-token-secret', {
        expiresIn: '10m',
    });
};
const generateRefreshToken = (user) => {
    return jsonwebtoken_1.default.sign({ userId: user.id }, 'your-refresh-token-secret', {
        expiresIn: '1d',
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
    if (user.roles == 'admin') {
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        console.log(password, '00000000000000', user.password, passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
    }
    if (user.password !== password && user.roles !== 'admin') {
        return res.status(401).json({ message: 'Invalid password' });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.json({ accessToken, refreshToken, userData: { role: user.roles, id: user.id, email: user.email } });
});
router.post('/register', async (req, res) => {
    const { password } = req.body;
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    console.log(password);
    const user = await prisma.user.create({
        data: {
            password: hashedPassword,
            email: req.body.email,
            roles: 'admin'
        },
    });
    const admin = await prisma.admin.create({
        data: {
            avatar: req.body.avatar,
            userId: user.id
        },
    });
    res.send({ user, admin });
});
router.post('/token/refresh', async (req, res) => {
    const { refresh } = req.body;
    console.log(refresh);
    try {
        const decodedToken = jsonwebtoken_1.default.verify(refresh, 'your-refresh-token-secret');
        const accessToken = jsonwebtoken_1.default.sign({ userId: decodedToken.userId }, 'your-refresh-token-secret', {
            expiresIn: jwtConfig.expirationTime,
        });
        res.json({ accessToken });
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid refresh token' });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map