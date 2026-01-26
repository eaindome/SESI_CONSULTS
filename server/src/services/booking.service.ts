import { PrismaClient } from '@prisma/client'
import { sendConfirmationEmail } from '../utils/email.js'

export async function createBooking(
  prisma: PrismaClient,
  data: {
    name: string
    phone: string
    email?: string
    serviceId: string
    date: string
    time: string
    notes?: string
  }
) {
  const booking = await prisma.booking.create({
    data: {
      ...data,
      status: 'PENDING'
    }
  })

  await sendConfirmationEmail(booking)

  return booking
}
