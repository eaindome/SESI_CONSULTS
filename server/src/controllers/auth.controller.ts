import type { FastifyRequest, FastifyReply } from 'fastify'
import { loginAdmin } from '../services/auth.service.js'

export async function loginHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { email, password } = req.body as { email: string; password: string }

    const result = await loginAdmin(req.server.prisma, { email, password })

    // Set httpOnly cookie with JWT token
    reply.setCookie('auth_token', result.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    })

    return {
      success: true,
      admin: result.admin
    }
  } catch (error: any) {
    reply.code(401).send({
      success: false,
      message: error.message || 'Login failed'
    })
  }
}

export async function logoutHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  reply.clearCookie('auth_token', { path: '/' })

  return {
    success: true,
    message: 'Logged out successfully'
  }
}

export async function verifyHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  // This handler will only be called if the auth middleware passes
  // So we can safely access req.admin (we'll add this in middleware)
  return {
    success: true,
    admin: (req as any).admin
  }
}
