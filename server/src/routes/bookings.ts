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
  app.get('/', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Bookings'],
      summary: 'List bookings',
      description: 'Returns paginated bookings. Supports filtering by status and keyword search.',
      security: [{ cookieAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          status: { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'CONFIRMED', 'COMPLETED'] },
          search: { type: 'string' },
          limit:  { type: 'string', default: '50' },
          offset: { type: 'string', default: '0' }
        }
      }
    }
  }, async (request) => {
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

  app.get('/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Bookings'],
      summary: 'Get booking by ID',
      security: [{ cookieAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      }
    }
  }, async (request) => {
    const { id } = request.params as { id: string }

    const booking = await app.prisma.booking.findUnique({
      where: { id }
    })

    if (!booking) {
      throw new Error('Booking not found')
    }

    return booking
  })

  app.patch('/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Bookings'],
      summary: 'Update booking status / notes',
      security: [{ cookieAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          status:   { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'CONFIRMED', 'COMPLETED'] },
          notes:    { type: 'string' },
          service:  { type: 'string' },
          dateTime: { type: 'string' },
          phone:    { type: 'string' },
          address:  { type: 'string' }
        }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const data = request.body as any

    const updateData: Record<string, unknown> = {}
    if (data.status   !== undefined) updateData.status   = data.status
    if (data.notes    !== undefined) updateData.notes    = data.notes
    if (data.service  !== undefined) updateData.service  = data.service
    if (data.dateTime !== undefined) updateData.dateTime = data.dateTime
    if (data.phone    !== undefined) updateData.phone    = data.phone
    if (data.address  !== undefined) updateData.address  = data.address

    const booking = await app.prisma.booking.update({
      where: { id },
      data: updateData
    })

    return booking
  })

  app.delete('/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Bookings'],
      summary: 'Delete a booking',
      security: [{ cookieAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      }
    }
  }, async (request, reply) => {
    const { id } = request.params as { id: string }

    await app.prisma.booking.delete({
      where: { id }
    })

    return { success: true, message: 'Booking deleted' }
  })
}

export default bookingsRoutes
