import type { FastifyPluginAsync } from 'fastify'
import authRoutes from './auth.js'
import bookingsRoutes from './bookings.js'
import servicesRoutes from './services.js'

const routes: FastifyPluginAsync = async (app) => {
  app.get('/health', async () => ({ status: 'ok' }))

  app.register(authRoutes, { prefix: '/auth' })
  app.register(bookingsRoutes, { prefix: '/bookings' })
  app.register(servicesRoutes, { prefix: '/services' })
}

export default routes
