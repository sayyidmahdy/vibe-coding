import { UserService } from './users-service'
import prisma from '../lib/prisma-lib'
import bcrypt from 'bcryptjs'

// Mock Prisma
jest.mock('../lib/prisma-lib', () => ({
  __esModule: true,
  default: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}))

// Mock bcrypt
jest.mock('bcryptjs', () => ({
  __esModule: true,
  default: {
    hash: jest.fn(),
  },
}))


describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })


  it('should register a new user successfully', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    }

    // Mock findUnique to return null (email doesn't exist)
    ;(prisma.user.findUnique as any).mockResolvedValue(null)
    
    // Mock bcrypt hash
    ;(bcrypt.hash as any).mockResolvedValue('hashed_password')

    // Mock create to return the created user
    const mockCreatedUser = {
      id: 1,
      ...userData,
      password: 'hashed_password',
      created_at: new Date(),
    }
    ;(prisma.user.create as any).mockResolvedValue(mockCreatedUser)

    const result = await UserService.registerUser(userData)

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    })
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10)
    expect(result).toHaveProperty('id', 1)
    expect(result.email).toBe(userData.email)
    expect(result).not.toHaveProperty('password')
  })

  it('should throw error if email already exists', async () => {
    const userData = {
      name: 'Test User',
      email: 'existing@example.com',
      password: 'password123',
    }

    // Mock findUnique to return an existing user
    ;(prisma.user.findUnique as any).mockResolvedValue({ id: 1, email: userData.email })

    await expect(UserService.registerUser(userData)).rejects.toThrow('Email already exists')
  })
})
