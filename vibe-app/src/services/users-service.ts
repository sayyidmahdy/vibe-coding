import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma-lib'

import { RegisterUserRequest, UserResponse } from '../interfaces/user'


export class UserService {
  static async registerUser(data: RegisterUserRequest): Promise<UserResponse> {
    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    })

    if (existingUser) {
      throw new Error('Email already exists')
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    })

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    }
  }
}
