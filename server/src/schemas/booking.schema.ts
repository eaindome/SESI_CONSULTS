export const createBookingSchema = {
  body: {
    type: 'object',
    required: ['name', 'phone', 'serviceId', 'date', 'time'],
    properties: {
      name: { type: 'string' },
      phone: { type: 'string' },
      email: { type: 'string' },
      serviceId: { type: 'string' },
      date: { type: 'string', format: 'date' },
      time: { type: 'string' },
      notes: { type: 'string' }
    }
  }
}
