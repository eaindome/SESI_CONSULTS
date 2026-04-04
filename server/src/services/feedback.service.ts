import { PrismaClient } from '@prisma/client'
import { sendFeedbackReceiptEmail } from '../utils/email.js'

export async function createFeedback(
  prisma: PrismaClient,
  data: {
    name: string
    email?: string
    rating: number
    message: string
    service?: string
  }
) {
  if (data.rating < 1 || data.rating > 5) {
    throw new Error('Rating must be between 1 and 5')
  }

  const feedback = await prisma.feedback.create({ data })

  if (feedback.email) {
    sendFeedbackReceiptEmail({
      name: feedback.name,
      email: feedback.email,
      rating: feedback.rating,
      message: feedback.message,
      service: feedback.service,
    }).catch((err) => console.error('Feedback email error:', err))
  }

  return feedback
}

export async function listFeedback(
  prisma: PrismaClient,
  opts: { limit?: number; offset?: number } = {}
) {
  const { limit = 50, offset = 0 } = opts

  const [feedback, total] = await Promise.all([
    prisma.feedback.findMany({
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset
    }),
    prisma.feedback.count()
  ])

  return { feedback, total }
}
