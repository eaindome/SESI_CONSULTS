import Fastify from 'fastify'
import cors from './plugins/cors.js'
import prisma from './plugins/prisma.js'
import routes from './routes/index.js'

export const app = Fastify({
  logger: true
})

export async function buildApp() {
  await app.register(cors)
  await app.register(prisma)
  await app.register(routes)

  return app
}
