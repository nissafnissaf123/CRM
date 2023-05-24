// routes/auth.ts
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();
const jwtConfig = {
  JWT_SECRET: 'your-access-token-secret', 
  expirationTime: '1h', 
};


router.get('/me',async  (req, res) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Invalid token format' });
  }

  const token = authorizationHeader.substring(7).trim();

  try {
    // Verify the access token against the secret key
    const decodedToken = jwt.verify(token, jwtConfig.JWT_SECRET) as { userId: string };
    const userId = decodedToken.userId;

    // Retrieve the user data from the database using the user ID
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    // Logic to retrieve the user data based on the user ID
    // ...

    // Return  userData: { role: user.roles, id: user.id, email: user.email } the response
    res.json({ userData: { role: user?.roles, id: user?.id, email: user?.email }});
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ error: 'Invalid access token' });
  }
});

//accessToken n refreshToken
const generateAccessToken = (user: { id: String }) => {
  return jwt.sign({ userId: user.id }, 'your-access-token-secret', {
    expiresIn: '10m',
  });
};
const generateRefreshToken = (user: { id: String })  => {
  return jwt.sign({ userId: user.id }, 'your-refresh-token-secret', {
    expiresIn: '1d',
  });
};
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
 let user=null
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

  res.json({ accessToken, refreshToken, userData: { role: user.roles, id: user.id, email: user.email } });
});


//Register admin
router.post('/register', async (req: Request, res: Response) => {
  const { password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
      data: {
          password: hashedPassword,
          email,
          ...req.body
      },
  });

  res.send({user, message: 'Registered Successfully' })
 
});
 


router.post('/token/refresh', async (req, res) => {
  const {  refresh } = req.body;
 
 console.log(refresh)
 
 
 
 

 
 try {
    // Verify the refresh token against the secret key
    const decodedToken = jwt.verify(refresh, 'your-refresh-token-secret') as { userId: string };

    // Logic to check the validity and expiration of the refresh token
    // ...

    // Generate a new access token
    const accessToken = jwt.sign({ userId: decodedToken.userId }, 'your-refresh-token-secret', {
      expiresIn: jwtConfig.expirationTime,
    });

    // Return the new access token in the response
    res.json({ accessToken });
  } catch (error) {
    // Handle token verification errors
    res.status(401).json({ error: 'Invalid refresh token' });
  }
});
 

 
 
 

 
 

  


export default router; // Ajouter cette ligne à la fin du fichier
