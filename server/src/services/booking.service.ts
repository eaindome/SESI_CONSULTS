import { PrismaClient } from '@prisma/client'
import { sendBookingAcknowledgement, sendAdminBookingNotification } from '../utils/email.js'

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

  // Fire emails without blocking the booking response
  Promise.all([
    sendBookingAcknowledgement(booking),
    sendAdminBookingNotification(booking),
  ]).catch((err) => console.error('Booking email error:', err))

  return booking
}
