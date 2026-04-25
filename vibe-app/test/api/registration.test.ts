import { POST } from '@/app/api/users/route'
import { UserService } from '@/services/users-service'
import { NextRequest } from 'next/server'

// Mock UserService
jest.mock('@/services/users-service', () => ({
  UserService: {
    registerUser: jest.fn(),
  },
}))



describe('POST /api/users', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })


  const createRequest = (body: any) => {
    return new NextRequest('http://localhost:3000/api/users', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  }

  it('should return 201 and user data on successful registration', async () => {
    const userData = {
      name: 'Budi',
      email: 'budi@gmail.com',
      password: 'password123',
    }

    const mockResponse = {
      id: 1,
      name: 'Budi',
      email: 'budi@gmail.com',
      created_at: new Date(),
    }

    ;(UserService.registerUser as any).mockResolvedValue(mockResponse)

    const req = createRequest(userData)
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(201)
    expect(data.name).toBe('Budi')
    expect(UserService.registerUser).toHaveBeenCalledWith(userData)
  })

  it('should return 400 if fields are missing', async () => {
    const req = createRequest({ name: 'Budi' }) // Missing email and password
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.message).toBe('Missing required fields')
  })

  it('should return 400 if email is invalid', async () => {
    const req = createRequest({ name: 'Budi', email: 'invalid-email', password: 'password123' })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.message).toBe('Invalid email')
  })

  it('should return 400 if password is too short', async () => {
    const req = createRequest({ name: 'Budi', email: 'budi@gmail.com', password: '123' })
    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(400)
    expect(data.message).toBe('Password must be at least 6 characters')
  })
})
