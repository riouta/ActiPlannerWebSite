import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
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
          return res.status(404).json({ error: 'Activity not found' });
        }
        return res.status(200).json(activity);
      } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch activity' });
      }

    case 'PUT':
      try {
        const { name, description, date, time, adress } = req.body;
        const updatedActivity = await prisma.activity.update({
          where: { id: activityId, userId: userId },
          data: { name, description, date, time, adress },
        });
        return res.status(200).json(updatedActivity);
      } catch (error) {
        return res.status(404).json({ error: 'Activity not found' });
      }

    case 'DELETE':
      try {
        await prisma.activity.delete({
          where: { id: activityId, userId: userId },
        });
        return res.status(204).end();
      } catch (error) {
        return res.status(404).json({ error: 'Activity not found' });
      }

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
