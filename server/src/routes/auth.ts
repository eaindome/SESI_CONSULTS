import type { FastifyPluginAsync } from 'fastify'
import { loginHandler, logoutHandler, verifyHandler } from '../controllers/auth.controller.js'
import { loginSchema, logoutSchema, verifySchema } from '../schemas/auth.schema.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const authRoutes: FastifyPluginAsync = async (app) => {
  // Login route
  app.post('/login', { schema: loginSchema }, loginHandler)

  // Logout route
  app.post('/logout', { schema: logoutSchema }, logoutHandler)

  // Verify token route (protected)
  app.get('/verify', { schema: verifySchema, preHandler: authMiddleware }, verifyHandler)
}

export default authRoutes
