import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prisma';

interface User {
  username: string;
  email: string;
  password: string;
}

const users: User[] = []; // Initialize the users array with the User interface

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST': // For logging in
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
      res.status(200).json({ token });
      break;

    case 'PUT': // For signing up
      const { newEmail, newPassword, newUsername } = req.body;

      if (!newUsername) {
        res.status(400).json({ error: 'Username is required' });
        return;
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const newUser = await prisma.user.create({
        data: {
          email: newEmail,
          password: hashedPassword,
          username: newUsername,
        },
      });

      res.status(201).json({ message: 'User created', user: newUser });
      break;

    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
