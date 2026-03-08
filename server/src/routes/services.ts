import type { FastifyPluginAsync } from 'fastify'

const SERVICES = [
  'General Nursing Care',
  'Injection Services',
  'Post-Operative Care',
  'Chronic Disease Management',
  'Elderly Care',
  'Maternal & Child Care',
]

const servicesRoutes: FastifyPluginAsync = async (app) => {
  app.get('/', async () => {
    return SERVICES
  })
}

export default servicesRoutes
