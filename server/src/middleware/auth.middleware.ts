import type { FastifyRequest, FastifyReply } from 'fastify'
import { verifyToken } from '../utils/jwt.js'

export async function authMiddleware(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    // Get token from cookie
    const token = req.cookies.auth_token

    if (!token) {
      return reply.code(401).send({
        success: false,
        message: 'Authentication required'
      })
    }

    // Verify token
    const payload = verifyToken(token)

    // Find admin
    const admin = await req.server.prisma.admin.findUnique({
      where: { id: payload.adminId },
      select: { id: true, email: true, name: true }
    })

    if (!admin) {
      return reply.code(401).send({
        success: false,
        message: 'Invalid authentication'
      })
    }

    // Attach admin to request
    (req as any).admin = admin
  } catch (error) {
    return reply.code(401).send({
      success: false,
      message: 'Invalid or expired token'
    })
  }
}
