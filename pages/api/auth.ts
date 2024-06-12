import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../prisma/prisma';
import { getSession } from 'next-auth/react';

// interface User {
//   username: string;
//   email: string;
//   password: string;
// }

//const users: User[] = []; // Initialize the users array with the User interface

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  switch (method) {
    case 'POST': // For logging in
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
      return res.status(200).json({ token });

    case 'PUT': // For signing up
      const { newEmail, newPassword, newUsername } = req.body;

      if (!newUsername) {
        return res.status(400).json({ error: 'Username is required' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const newUser = await prisma.user.create({
        data: {
          email: newEmail,
          password: hashedPassword,
          username: newUsername,
        },
      });

      return res.status(201).json({ message: 'User created', user: newUser });

    default:
      res.setHeader('Allow', ['POST', 'PUT']);
      return res.status(405).end(`Method ${method} Not Allowed`);
  }
}
