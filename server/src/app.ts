import Fastify from 'fastify'
import cookie from '@fastify/cookie'
import swagger from '@fastify/swagger'
import scalarReference from '@scalar/fastify-api-reference'
import cors from './plugins/cors.js'
import prisma from './plugins/prisma.js'
import routes from './routes/index.js'

export const app = Fastify({
  logger: true
})

export async function buildApp() {
  // API documentation - must be registered before routes
  await app.register(swagger, {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'SESI Consults API',
        description: 'REST API for SESI Consults – admin auth, bookings, and service management',
        version: '1.0.0'
      },
      components: {
        securitySchemes: {
          cookieAuth: {
            type: 'apiKey',
            in: 'cookie',
            name: 'auth_token',
            description: 'JWT token stored in an httpOnly cookie. Log in via POST /auth/login to set it.'
          }
        }
      },
      tags: [
        { name: 'Auth', description: 'Admin authentication' },
        { name: 'Bookings', description: 'Booking management' },
        { name: 'Services', description: 'Service management' }
      ]
    }
  })

  await app.register(scalarReference, {
    routePrefix: '/docs'
  })

  await app.register(cookie)
  await app.register(cors)
  await app.register(prisma)
  await app.register(routes)

  app.setErrorHandler((error, _req, reply) => {
    app.log.error(error)
    const statusCode = error.statusCode ?? 500
    reply.code(statusCode).send({
      success: false,
      message: statusCode >= 500 ? 'Internal server error' : error.message
    })
  })

  return app
}
