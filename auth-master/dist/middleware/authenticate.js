"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const authenticate = async (req, res, next) => {
    var _a;
    const user = await prisma.user.findUnique({
        where: {
            id: req.userId,
        },
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `Hello, ${user.email}! This is a protected endpoint.` });
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }
    try {
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId;
        next();
    }
    catch (err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map