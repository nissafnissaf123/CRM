// middleware/authenticate.ts

import { Request as ExpressRequest, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
interface Request extends ExpressRequest {
    userId?: User['id'];
}
interface TokenPayload {
    userId: string;
}

export const authenticate = async(req: Request, res: Response, next: NextFunction) => {
     const user = await prisma.user.findUnique({
          where: {
          id: req.userId,
        },
    });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: `Hello, ${user.email}! This is a protected endpoint.` });
    
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
        req.userId = decodedToken.userId;
        next();
    } catch (err) {
        return res.status(401).send({ message: 'Invalid token' });
    }
};
