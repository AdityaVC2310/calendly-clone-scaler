const { PrismaClient } = require('@prisma/client');

// Reuse a single Prisma instance in development to prevent connection pool exhaustion
// during hot-reloads (a common Next.js / nodemon pattern)
const globalForPrisma = globalThis;

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'info', 'warn', 'error']
        : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

module.exports = prisma;
