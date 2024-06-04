import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prisma';

interface User {
  email: string;
  password: string;
}

const users: User[] = []; // Initialize the users array with the User interface

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST':
      const { email, password } = req.body;

      const user = users.find((user) => user.email === email);
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

    case 'POST':
      const { newEmail, newPassword } = req.body;

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      users.push({ email: newEmail, password: hashedPassword });

      res.status(201).json({ message: 'User created' });
      break;

    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
