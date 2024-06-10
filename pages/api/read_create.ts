//route handler for operations related to readin all tasks & creatin new task
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  if (!session.user || !session.user.id) {
    res.status(400).json({ error: 'User information is missing' });
    return;
  }

  const userId = Number(session.user.id);

  switch (req.method) {
    case 'GET':
      try {
        const activities = await prisma.activity.findMany({
          where: { userId: userId },
        });
        res.status(200).json(activities);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch activities' });
      }
      break;

    case 'POST':
      try {
        const { name, description, date, time, adress } = req.body;
        const newActivity = await prisma.activity.create({
          data: {
            name,
            description,
            userId: userId,
            date,
            time,
            adress,
          },
        });
        res.status(201).json(newActivity);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

