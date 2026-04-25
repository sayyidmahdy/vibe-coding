import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import prisma from '../lib/prisma-lib'
import { LoginRequest, LoginResponse } from '../interfaces/session'

export class SessionService {
  static async loginUser(data: LoginRequest): Promise<LoginResponse> {
    // 1. Find user by email
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    // 2. Verify password
    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    // 3. Generate UUID token
    const token = crypto.randomUUID()

    // 4. Save session to database
    await prisma.session.create({
      data: {
        token: token,
        user_id: user.id,
      },
    })

    return { token }
  }
}
