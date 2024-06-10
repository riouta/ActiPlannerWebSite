//route handler for operations related to editin & deleting specific task by id
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
  const activityId = parseInt(req.query.id as string);

  switch (req.method) {
    case 'GET':
      try {
        const activity = await prisma.activity.findFirst({
          where: { id: activityId, userId: userId },
        });
        if (!activity) {
          res.status(404).json({ error: 'Activity not found' });
          return;
        }
        res.status(200).json(activity);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch activity' });
      }
      break;

    case 'PUT':
      try {
        const { name, description, date, time, adress } = req.body;
        const updatedActivity = await prisma.activity.update({
          where: { id: activityId, userId: userId },
          data: { name, description, date, time, adress },
        });
        res.status(200).json(updatedActivity);
      } catch (error) {
        res.status(404).json({ error: 'Activity not found' });
      }
      break;

    case 'DELETE':
      try {
        await prisma.activity.delete({
          where: { id: activityId, userId: userId },
        });
        res.status(204).end();
      } catch (error) {
        res.status(404).json({ error: 'Activity not found' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
