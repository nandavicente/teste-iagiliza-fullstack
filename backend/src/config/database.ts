import { PrismaClient } from '@prisma/client';

// =====================================
// PRISMA CLIENT INSTANCE
// =====================================
export const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

// =====================================
// GRACEFUL SHUTDOWN
// =====================================
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});