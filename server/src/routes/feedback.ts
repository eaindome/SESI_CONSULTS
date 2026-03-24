import type { FastifyPluginAsync } from 'fastify'
import { submitFeedbackHandler, listFeedbackHandler } from '../controllers/feedback.controller.js'
import { authMiddleware } from '../middleware/auth.middleware.js'

const feedbackRoutes: FastifyPluginAsync = async (app) => {
  // Public - submit feedback
  app.post('/', {
    schema: {
      tags: ['Feedback'],
      summary: 'Submit feedback',
      body: {
        type: 'object',
        required: ['name', 'rating', 'message'],
        properties: {
          name:    { type: 'string' },
          email:   { type: 'string', format: 'email' },
          rating:  { type: 'number', minimum: 1, maximum: 5 },
          message: { type: 'string' },
          service: { type: 'string' }
        }
      }
    }
  }, submitFeedbackHandler)

  // Protected - list all feedback
  app.get('/', {
    preHandler: authMiddleware,
    schema: {
      tags: ['Feedback'],
      summary: 'List all feedback (admin)',
      security: [{ cookieAuth: [] }],
      querystring: {
        type: 'object',
        properties: {
          limit:  { type: 'string', default: '50' },
          offset: { type: 'string', default: '0' }
        }
      }
    }
  }, listFeedbackHandler)
}

export default feedbackRoutes
