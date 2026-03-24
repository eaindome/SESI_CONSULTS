import type { FastifyPluginAsync } from 'fastify'
import { createBookingHandler } from '../controllers/booking.controller.js'
import { createBookingSchema } from '../schemas/booking.schema.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const bookingsRoutes: FastifyPluginAsync = async (app) => {
  // Public endpoint - create booking
  app.post(
    '/',
    { schema: createBookingSchema },
    createBookingHandler
  )

  // Admin endpoints - require authentication
  app.get('/', { preHandler: authMiddleware }, async (request) => {
    const { status, search, limit = '50', offset = '0' } = request.query as any

    const where: any = {}

    if (status) {
      where.status = status
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [bookings, total] = await Promise.all([
      app.prisma.booking.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: parseInt(limit),
        skip: parseInt(offset)
      }),
      app.prisma.booking.count({ where })
    ])

    return { bookings, total, limit: parseInt(limit), offset: parseInt(offset) }
  })

  app.get('/:id', { preHandler: authMiddleware }, async (request) => {
    const { id } = request.params as { id: string }

    const booking = await app.prisma.booking.findUnique({
      where: { id }
    })

    if (!booking) {
      throw new Error('Booking not found')
    }

    return booking
  })

  app.patch('/:id', { preHandler: authMiddleware }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const data = request.body as any

    const booking = await app.prisma.booking.update({
      where: { id },
      data: {
        status: data.status,
        notes: data.notes
      }
    })

    return booking
  })

  app.delete('/:id', { preHandler: authMiddleware }, async (request, reply) => {
    const { id } = request.params as { id: string }

    await app.prisma.booking.delete({
      where: { id }
    })

    return { success: true, message: 'Booking deleted' }
  })
}

export default bookingsRoutes
