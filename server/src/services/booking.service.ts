import { PrismaClient } from '@prisma/client'
import { sendConfirmationEmail } from '../utils/email.js'

export async function createBooking(
  prisma: PrismaClient,
  data: {
    service: string
    dateTime: string
    contactDetails: {
      name: string
      email: string
      phone: string
      address: string
    }
    notes?: string
  }
) {
  const booking = await prisma.booking.create({
    data: {
      service:  data.service,
      dateTime: data.dateTime,
      name:     data.contactDetails.name,
      email:    data.contactDetails.email,
      phone:    data.contactDetails.phone,
      address:  data.contactDetails.address,
      notes:    data.notes ?? null,
      status:   'PENDING'
    }
  })

  await sendConfirmationEmail(booking)

  return booking
}
