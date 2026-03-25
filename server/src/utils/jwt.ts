import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is required')
const SECRET: string = JWT_SECRET
const JWT_EXPIRES_IN = '8h'

export interface JwtPayload {
  adminId: string
  email: string
}

export function generateToken(payload: JwtPayload): string {
  return jwt.sign(payload, SECRET, { expiresIn: JWT_EXPIRES_IN })
}

export function verifyToken(token: string): JwtPayload {
  try {
    const decoded = jwt.verify(token, SECRET) as JwtPayload
    return decoded
  } catch (error) {
    throw new Error('Invalid or expired token')
  }
}
