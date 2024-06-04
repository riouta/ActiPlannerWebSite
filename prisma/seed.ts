import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create sample activities
  const activity1 = await prisma.activity.create({
    data: {
      name: 'Yoga Class',
      description: 'A relaxing yoga session.',
      date: new Date('2024-06-01'),
      time: '09:00',
      adress: '123 Yoga Studio', 
      //user: { connect: { id: user.id } }, // Connect activity to user
    },
  });

  const activity2 = await prisma.activity.create({
    data: {
      name: 'Cooking Workshop',
      description: 'Learn to cook delicious meals.',
      date: new Date('2024-06-02'),
      time: '12:00',
      adress: '456 Cooking School',
    },
  });

  // Create a sample user with activities
  const user = await prisma.user.create({
    data: {
      username: 'sampleuser',
      email: 'user@example.com',
      password: 'securepassword',
      activities: {
        connect: [{ id: activity1.id }, { id: activity2.id }],
      },
    },
  });

  console.log({ user, activity1, activity2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
