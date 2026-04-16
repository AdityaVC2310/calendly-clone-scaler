const prisma = require('../src/config/prisma');
const bcrypt = require('bcryptjs');

// ─────────────────────────────────────────────────────────────────────────────
// Fixed UUID for the dev default user — matches DEFAULT_USER_ID in .env
// ─────────────────────────────────────────────────────────────────────────────
const DEFAULT_USER_ID = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

async function main() {
  console.log('🌱  Seeding database...');

  const passwordHash = await bcrypt.hash('Password123', 12);

  // Upsert the default dev user with the fixed UUID
  const alice = await prisma.user.upsert({
    where: { email: 'alice@example.com' },
    update: {},
    create: {
      id: DEFAULT_USER_ID,
      email: 'alice@example.com',
      username: 'alice',
      firstName: 'Alice',
      lastName: 'Wonderland',
      passwordHash,
      timezone: 'America/New_York',
      isVerified: true,
    },
  });

  console.log(`✅  Default user: ${alice.email} (id: ${alice.id})`);
  console.log(`\n👉  Set this in your .env:\n    DEFAULT_USER_ID=${alice.id}\n`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
