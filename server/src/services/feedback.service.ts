import { PrismaClient } from '@prisma/client'

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

  return prisma.feedback.create({ data })
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
