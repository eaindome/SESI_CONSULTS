import type { FastifyPluginAsync } from 'fastify'
import { createBookingHandler } from '../controllers/booking.controller.js'
import { createBookingSchema } from '../schemas/booking.schema.js'

const bookingsRoutes: FastifyPluginAsync = async (app) => {
  app.post(
    '/',
    { schema: createBookingSchema },
    createBookingHandler
  )

  app.get('/', async () => {
    return app.prisma.booking.findMany({
      orderBy: { createdAt: 'desc' }
    })
  })
}

export default bookingsRoutes
