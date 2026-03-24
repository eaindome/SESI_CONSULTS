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
  app.get('/public', async () => {
    return SERVICES
  })

  // Admin endpoints - manage services in database
  app.get('/', { preHandler: authMiddleware }, async () => {
    return app.prisma.service.findMany({
      orderBy: { displayOrder: 'asc' }
    })
  })

  app.get('/:id', { preHandler: authMiddleware }, async (request) => {
    const { id } = request.params as { id: string }

    const service = await app.prisma.service.findUnique({
      where: { id }
    })

    if (!service) {
      throw new Error('Service not found')
    }

    return service
  })

  app.post('/', { preHandler: authMiddleware }, async (request) => {
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

  app.patch('/:id', { preHandler: authMiddleware }, async (request) => {
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

  app.delete('/:id', { preHandler: authMiddleware }, async (request) => {
    const { id } = request.params as { id: string }

    await app.prisma.service.delete({
      where: { id }
    })

    return { success: true, message: 'Service deleted' }
  })
}

export default servicesRoutes
