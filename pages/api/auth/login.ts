import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '/../../prisma/prisma';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { id: true, username: true, email: true, password: true},
      });

      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign(
        { email: user.email, id: user.id},
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
      );
      
      return res.status(200).json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Failed to login. Please try again later.' });
    }
  } 
  else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
