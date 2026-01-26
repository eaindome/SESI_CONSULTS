import type { FastifyRequest, FastifyReply } from 'fastify'
import { createBooking } from '../services/booking.service.js'

export async function createBookingHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const booking = await createBooking(req.server.prisma, req.body as any)

  reply.code(201).send(booking)
}
