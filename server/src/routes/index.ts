import type { FastifyPluginAsync } from 'fastify'
import bookingsRoutes from './bookings.js'
import servicesRoutes from './services.js'

const routes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => ({ 
    message: 'Welcome to SESI Consults API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      bookings: '/bookings',
      services: '/services'
    }
  }))

  app.get('/health', async () => ({ status: 'ok' }))

  app.register(bookingsRoutes, { prefix: '/bookings' })
  app.register(servicesRoutes, { prefix: '/services' })
}

export default routes
