
import 'dotenv/config'; 

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
  

  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    console.error('❌ FATAL: ADMIN_EMAIL or ADMIN_PASSWORD is not set in .env file.');
    process.exit(1);
  }




 const saltRounds = 10; 
  const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

  const existingAdmin = await prisma.user.findUnique({
    where: { email: ADMIN_EMAIL },
  });

  if (existingAdmin) {
    console.log(`\n✅ Admin user already exists with email: ${ADMIN_EMAIL}`);
    return;
  }


  const adminUser = await prisma.user.create({
    data: {
      name: 'Portfolio Administrator (Seed)',
      email: ADMIN_EMAIL,
      password: hashedPassword,
      phone: '01933946077', 
      role: 'ADMIN', 
    },
  });

  // console.log(` Admin user created successfully from .env!`);
  // console.log(`   Email: ${adminUser.email}`);
  // console.log(`   Password (Raw): ${ADMIN_PASSWORD} (Do NOT share this)`);
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });