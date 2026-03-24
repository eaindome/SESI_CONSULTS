export const loginSchema = {
  tags: ['Auth'],
  summary: 'Admin login',
  description: 'Authenticates an admin and sets an httpOnly auth_token cookie.',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email', examples: ['admin@sesi.com'] },
      password: { type: 'string', minLength: 6, examples: ['admin123'] }
    }
  },
  response: {
    200: {
      description: 'Login successful',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        admin: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' }
          }
        }
      }
    },
    401: {
      description: 'Invalid credentials',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    }
  }
}

export const logoutSchema = {
  tags: ['Auth'],
  summary: 'Admin logout',
  description: 'Clears the auth_token cookie.',
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    }
  }
}

export const verifySchema = {
  tags: ['Auth'],
  summary: 'Verify token',
  description: 'Returns the authenticated admin. Requires auth_token cookie.',
  security: [{ cookieAuth: [] }],
  response: {
    200: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        admin: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            name: { type: 'string' }
          }
        }
      }
    },
    401: {
      description: 'Unauthorized',
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    }
  }
}
