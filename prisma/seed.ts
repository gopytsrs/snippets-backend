import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async (numRecords: number = 64) => {
  console.log('Starting seed script');
  await prisma.snippet.deleteMany({});
  console.log('deleted all records');
  await Promise.all(
    Array(numRecords)
      .fill(0)
      .map(async (_, i) => {
        await prisma.snippet.create({
          data: {
            title: `Snippet Title #${i}`,
            content: `This is the description of snippet ${1} ${
              i % 2 == 0 ? '\n\n\t With line breaks' : 'Without any linebreaks'
            }`,
            createdAt: new Date(Date.now() - 1000 * 60 * Math.random() * 40),
            expiresAt: new Date(Date.now() + 1000 * 60 * Math.random() * 15),
            views: Math.random() * numRecords,
          },
        });
      }),
  );
  return numRecords;
};

main()
  .then((numRecords) =>
    console.log(`Succesfully seeded with ${numRecords} dummy records`),
  )
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('Ending seed script');
  });
