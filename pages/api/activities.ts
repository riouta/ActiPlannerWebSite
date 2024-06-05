import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../prisma/prisma';

interface Activity {
  id: string;
  name: string;
  description: string;
}

let activities: Activity[] = [];

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

  const userId = session.user.id as string; // Type assertion to ensure TypeScript knows userId is a string

  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        const activity = await prisma.activity.findUnique({ where: { id: Number(req.query.id) } });
        if (!activity) {
          res.status(404).json({ error: 'Activity not found' });
          return;
        }
        res.status(200).json(activity);
      } else {
        const activities = await prisma.activity.findMany();
        res.status(200).json(activities);
      }
      break;

    case 'POST':
      try {
        const newActivity = await prisma.activity.create({
          data: {
            ...req.body,
            userId: userId, // Use the userId variable here
          },
        });
        res.status(201).json(newActivity);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create activity' });
      }
      break;

    case 'PUT':
      try {
        const updatedActivity = await prisma.activity.update({
          where: { id: Number(req.query.id) },
          data: { ...req.body },
        });
        res.status(200).json(updatedActivity);
      } catch (error) {
        res.status(404).json({ error: 'Activity not found' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.activity.delete({ where: { id: Number(req.query.id) } });
        res.status(204).end();
      } catch (error) {
        res.status(404).json({ error: 'Activity not found' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
