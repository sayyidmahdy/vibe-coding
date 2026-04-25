import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import prisma from '../lib/prisma-lib'
import { LoginRequest, LoginResponse } from '../interfaces/session'
import { UserResponse } from '../interfaces/user'

export class SessionService {
  static async loginUser(data: LoginRequest): Promise<LoginResponse> {
    // ... (tetap sama)
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password)
    if (!isPasswordValid) {
      throw new Error('Invalid credentials')
    }

    const token = crypto.randomUUID()

    await prisma.session.create({
      data: {
        token: token,
        user_id: user.id,
      },
    })

    return { token }
  }

  static async getCurrentUser(token: string): Promise<UserResponse> {
    const session = await prisma.session.findFirst({
      where: { token: token },
      include: {
        user: true,
      },
    })

    if (!session) {
      throw new Error('unauthorized')
    }

    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      created_at: session.user.created_at,
    }
  }

  static async logoutUser(token: string): Promise<void> {
    const result = await prisma.session.deleteMany({
      where: { token: token },
    })

    if (result.count === 0) {
      throw new Error('unauthorized')
    }
  }
}



