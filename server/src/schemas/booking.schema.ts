export const createBookingSchema = {
  body: {
    type: 'object',
    required: ['service', 'dateTime', 'contactDetails'],
    properties: {
      service: { type: 'string' },
      dateTime: { type: 'string' },
      contactDetails: {
        type: 'object',
        required: ['name', 'email', 'phone', 'address'],
        properties: {
          name:    { type: 'string' },
          email:   { type: 'string' },
          phone:   { type: 'string' },
          address: { type: 'string' }
        }
      },
      notes: { type: 'string' }
    }
  }
}
