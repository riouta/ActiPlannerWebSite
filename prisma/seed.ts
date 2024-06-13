import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {

  //await prisma.activity.deleteMany({});

  // Create sample activities
  // const activity1 = await prisma.activity.create({
  //   data: {
  //     name: 'Yoga Class',
  //     description: 'A relaxing yoga session.',
  //     date: new Date('2024-06-01'),
  //     time: '09:00',
  //     adress: '123 Yoga Studio', 
  //     //user: { connect: { id: user.id } }, // Connect activity to user
  //   },
  // });

  // const activity2 = await prisma.activity.create({
  //   data: {
  //     name: 'Cooking Workshop',
  //     description: 'Learn to cook delicious meals.',
  //     date: new Date('2024-06-02'),
  //     time: '12:00',
  //     adress: '456 Cooking School',
  //   },
  // });
  // //upsert fct will only create new activity if no activity matches the where cdt
  const activity3 = await prisma.activity.upsert({
    where: { name: 'bunny hunt'},
    update: {},
    create: {
      name: 'bunny hunt',
      description: 'A fun acti',
      date: new Date('2024-03-01'),
      time: '08:00',
      adress: '1 bun field', 
    },
  });

  const activities = await prisma.activity.findMany()
  console.log(activities)

  const users = await prisma.user.findMany()
  console.log(users)

}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
