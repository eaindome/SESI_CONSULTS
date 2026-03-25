export const createBookingSchema = {
  tags: ['Bookings'],
  summary: 'Create a booking',
  description: 'Public endpoint. Creates a new service booking.',
  body: {
    type: 'object',
    required: ['service', 'dateTime', 'contactDetails'],
    properties: {
      service: { type: 'string', examples: ['General Nursing Care'] },
      dateTime: { type: 'string', examples: ['2025-09-01T10:00:00.000Z'] },
      contactDetails: {
        type: 'object',
        required: ['name', 'email', 'phone', 'address'],
        properties: {
          name:    { type: 'string' },
          email:   { type: 'string', format: 'email' },
          phone:   { type: 'string' },
          address: { type: 'string' }
        }
      },
      notes: { type: 'string' }
    }
  },
  response: {
    200: {
      description: 'Booking created',
      type: 'object',
      properties: {
        id: { type: 'string' },
        service: { type: 'string' },
        dateTime: { type: 'string' },
        name: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        address: { type: 'string' },
        notes: { type: 'string', nullable: true },
        status: { type: 'string', enum: ['PENDING', 'IN_PROGRESS', 'CONFIRMED', 'COMPLETED'] },
        createdAt: { type: 'string' }
      }
    }
  }
}
