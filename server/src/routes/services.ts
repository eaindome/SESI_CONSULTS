import type { FastifyPluginAsync } from 'fastify'

const servicesRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return app.prisma.service.findMany()
  })
}

export default servicesRoutes
