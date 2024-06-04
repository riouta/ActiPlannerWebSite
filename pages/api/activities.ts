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

  const { method } = req;

  switch (method) {
    case 'GET':
      if (req.query.id) {
        const activity = activities.find((activity) => activity.id === req.query.id);
        if (!activity) {
          res.status(404).json({ error: 'Activity not found' });
          return;
        }
        res.status(200).json(activity);
      } else {
        res.status(200).json(activities);
      }
      break;

    case 'POST':
      const newActivity = { ...req.body, id: String(activities.length + 1) };
      activities.push(newActivity);
      res.status(201).json(newActivity);
      break;

    case 'PUT':
      const index = activities.findIndex((activity) => activity.id === req.query.id);
      if (index === -1) {
        res.status(404).json({ error: 'Activity not found' });
        return;
      }
      activities[index] = { ...activities[index], ...req.body };
      res.status(200).json(activities[index]);
      break;

    case 'DELETE':
      activities = activities.filter((activity) => activity.id !== req.query.id);
      res.status(204).end();
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
