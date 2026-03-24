import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { generateToken, type JwtPayload } from '../utils/jwt.js'

export async function loginAdmin(
  prisma: PrismaClient,
  data: {
    email: string
    password: string
  }
): Promise<{ token: string; admin: { id: string; email: string; name: string } }> {
  // Find admin by email
  const admin = await prisma.admin.findUnique({
    where: { email: data.email }
  })

  if (!admin) {
    throw new Error('Invalid credentials')
  }

  // Verify password
  const isValidPassword = await bcrypt.compare(data.password, admin.password)

  if (!isValidPassword) {
    throw new Error('Invalid credentials')
  }

  // Generate JWT token
  const payload: JwtPayload = {
    adminId: admin.id,
    email: admin.email
  }

  const token = generateToken(payload)

  return {
    token,
    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name
    }
  }
}
