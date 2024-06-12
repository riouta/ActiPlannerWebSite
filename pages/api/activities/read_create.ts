//route handler for operations related to readin all tasks & creatin new task
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '/../../prisma/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  console.log('Session:', session);

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // if (!session.user || !session.user.id) {
  //   return res.status(400).json({ error: 'User information is missing' });  
  // }

  const userId = Number(session.user.id);

  switch (req.method) {
    case 'GET':
      try {
        const activities = await prisma.activity.findMany({
          where: { userId: userId },
        });
        return res.status(200).json(activities);
      } catch (error: any) {
        return res.status(500).json({ error: 'Failed to fetch activities', details: error.message });
      }
      

    case 'POST':
      try {
        const { name, description, date, time, adress } = req.body;
        if (!name || !date || !time || !adress) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
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
        return res.status(201).json(newActivity);
      } catch (error: any) {
        console.error('Error creating activity:', error);
        return res.status(500).json({ error: 'Failed to create activity', details: error.message });
      }
      

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

