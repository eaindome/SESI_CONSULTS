import type { FastifyRequest, FastifyReply } from 'fastify'
import { createFeedback, listFeedback } from '../services/feedback.service.js'

export async function submitFeedbackHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { name, email, rating, message, service } = req.body as {
      name: string
      email?: string
      rating: number
      message: string
      service?: string
    }

    const feedback = await createFeedback(req.server.prisma, {
      name,
      ...(email !== undefined && { email }),
      rating,
      message,
      ...(service !== undefined && { service })
    })

    reply.code(201).send({ success: true, feedback })
  } catch (error: any) {
    const status = error.message.includes('Rating') ? 400 : 500
    reply.code(status).send({ success: false, message: error.message })
  }
}

export async function listFeedbackHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const { limit = '50', offset = '0' } = req.query as {
      limit?: string
      offset?: string
    }

    const result = await listFeedback(req.server.prisma, {
      limit: parseInt(limit),
      offset: parseInt(offset)
    })

    return result
  } catch (error: any) {
    reply.code(500).send({ success: false, message: error.message })
  }
}
