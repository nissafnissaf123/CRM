import express, { Request as ExpressRequest, Response } from 'express';
import { authenticate } from '../middleware/authenticate';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { User } from '@prisma/client';

// Déclarer l'interface Request personnalisée qui étend ExpressRequest
interface Request extends ExpressRequest {
    userId?: User['id'];
}
const router = express.Router();
router.get('/protected', authenticate, async (req: Request, res: Response) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.userId,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `Hello, ${user.username}! This is a protected endpoint.` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router; // Ajouter cette ligne à la fin du fichier

