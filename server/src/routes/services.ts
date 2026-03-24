import type { FastifyPluginAsync } from 'fastify'
import { authMiddleware } from '../middleware/auth.middleware.js'

const SERVICES = [
  'General Nursing Care',
  'Injection Services',
  'Post-Operative Care',
  'Chronic Disease Management',
  'Elderly Care',
  'Maternal & Child Care',
]

const servicesRoutes: FastifyPluginAsync = async (app) => {
  // Public endpoint - returns hardcoded service names for booking form
  app.get('/public', {
    schema: {
      tags: ['Services'],
      summary: 'List public services',
      description: 'Returns available service names for the booking form. No auth required.',
      response: {
        200: { type: 'array', items: { type: 'string' } }
      }
    }
  }, async () => {
    return SERVICES
  })

  // Admin endpoints - manage services in database
  app.get('/', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Services'],
      summary: 'List all services (admin)',
      security: [{ cookieAuth: [] }]
    }
  }, async () => {
    return app.prisma.service.findMany({
      orderBy: { displayOrder: 'asc' }
    })
  })

  app.get('/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Services'],
      summary: 'Get service by ID',
      security: [{ cookieAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      }
    }
  }, async (request) => {
    const { id } = request.params as { id: string }

    const service = await app.prisma.service.findUnique({
      where: { id }
    })

    if (!service) {
      throw new Error('Service not found')
    }

    return service
  })

  app.post('/', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Services'],
      summary: 'Create a service',
      security: [{ cookieAuth: [] }],
      body: {
        type: 'object',
        required: ['name', 'description'],
        properties: {
          name:         { type: 'string' },
          description:  { type: 'string' },
          price:        { type: 'string' },
          features:     { type: 'array', items: { type: 'string' } },
          enabled:      { type: 'boolean' },
          displayOrder: { type: 'number' }
        }
      }
    }
  }, async (request) => {
    const data = request.body as any

    const service = await app.prisma.service.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        features: data.features || [],
        enabled: data.enabled ?? true,
        displayOrder: data.displayOrder || 0
      }
    })

    return service
  })

  app.patch('/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Services'],
      summary: 'Update a service',
      security: [{ cookieAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      },
      body: {
        type: 'object',
        properties: {
          name:         { type: 'string' },
          description:  { type: 'string' },
          price:        { type: 'string' },
          features:     { type: 'array', items: { type: 'string' } },
          enabled:      { type: 'boolean' },
          displayOrder: { type: 'number' }
        }
      }
    }
  }, async (request) => {
    const { id } = request.params as { id: string }
    const data = request.body as any

    const service = await app.prisma.service.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        features: data.features,
        enabled: data.enabled,
        displayOrder: data.displayOrder
      }
    })

    return service
  })

  app.delete('/:id', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Services'],
      summary: 'Delete a service',
      security: [{ cookieAuth: [] }],
      params: {
        type: 'object',
        properties: { id: { type: 'string' } }
      }
    }
  }, async (request) => {
    const { id } = request.params as { id: string }

    await app.prisma.service.delete({
      where: { id }
    })

    return { success: true, message: 'Service deleted' }
  })
}

export default servicesRoutes
