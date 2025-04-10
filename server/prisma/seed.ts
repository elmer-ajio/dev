import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = Array.from({ length: 20 }).map((_, i) => ({
    name: `User ${i + 1}`,
  }))

  await prisma.user.createMany({
    data: users,
  })

  console.log('✅ Seeded 20 users')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
