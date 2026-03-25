import { PrismaClient, Role, PaymentStatus } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await bcrypt.hash('123456', 10)

  // 🔐 ADMIN
  const admin = await prisma.user.upsert({
    where: { email: 'admin@paymanager.com' },
    update: {},
    create: {
      email: 'admin@paymanager.com',
      username: 'admin',
      password,
      name: 'Administrador',
      role: Role.ADMIN,
    },
  })

  // 📝 REGISTRATION USER
  const requester = await prisma.user.upsert({
    where: { email: 'user@paymanager.com' },
    update: {},
    create: {
      email: 'user@paymanager.com',
      username: 'user',
      password,
      name: 'Usuário Cadastro',
      role: Role.REGISTRATION,
    },
  })

  // ✅ AUTHORIZATION USER
  const authorizer = await prisma.user.upsert({
    where: { email: 'auth@paymanager.com' },
    update: {},
    create: {
      email: 'auth@paymanager.com',
      username: 'authorizer',
      password,
      name: 'Usuário Autorizador',
      role: Role.AUTHORIZATION,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })