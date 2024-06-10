// prismaService.ts

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class PrismaService {
  async getAllActivities() {
    return prisma.activity.findMany();
  }

  async getActivityById(id: number) {
    return prisma.activity.findUnique({
      where: {
        id,
      },
    });
  }

  // Implement other CRUD operations as needed
}
