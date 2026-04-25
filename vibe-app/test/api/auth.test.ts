import { POST as loginPost } from '@/app/api/users/login/route'
import { GET as currentUserGet } from '@/app/api/users/current/route'
import { DELETE as logoutDelete } from '@/app/api/users/logout/route'
import { SessionService } from '@/services/sessions-service'
import { NextRequest } from 'next/server'

// Mock SessionService
jest.mock('@/services/sessions-service', () => ({
  SessionService: {
    loginUser: jest.fn(),
    getCurrentUser: jest.fn(),
    logoutUser: jest.fn(),
  },
}))

describe('Auth API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const createRequest = (url: string, method: string, body?: any, headers?: any) => {
    return new NextRequest(url, {
      method,
      body: body ? JSON.stringify(body) : null,
      headers: new Headers(headers || {}),
    })
  }

  describe('POST /api/users/login', () => {
    it('should return 200 and token on successful login', async () => {
      const loginData = { email: 'test@example.com', password: 'password123' }
      const mockResponse = { token: 'mock-uuid-token' }
      
      ;(SessionService.loginUser as jest.Mock).mockResolvedValue(mockResponse)

      const req = createRequest('http://localhost/api/users/login', 'POST', loginData)
      const res = await loginPost(req)
      const data = await res.json()

      expect(res.status).toBe(200)
      expect(data.token).toBe('mock-uuid-token')
    })

    it('should return 400 if email is invalid', async () => {
      const loginData = { email: 'invalid', password: 'password123' }
      const req = createRequest('http://localhost/api/users/login', 'POST', loginData)
      const res = await loginPost(req)
      const data = await res.json()

      expect(res.status).toBe(400)
      expect(data.message).toBe('Invalid email')
    })
  })

  describe('GET /api/users/current', () => {
    it('should return 200 and user data if token is valid', async () => {
      const mockUser = { id: 1, name: 'Budi', email: 'budi@example.com', created_at: new Date() }
      ;(SessionService.getCurrentUser as jest.Mock).mockResolvedValue(mockUser)

      const req = createRequest('http://localhost/api/users/current', 'GET', null, {
        'Authorization': 'Bearer valid-token'
      })
      const res = await currentUserGet(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.data.name).toBe('Budi')
    })

    it('should return 401 if token is missing', async () => {
      const req = createRequest('http://localhost/api/users/current', 'GET')
      const res = await currentUserGet(req)
      const body = await res.json()

      expect(res.status).toBe(401)
      expect(body.error).toBe('unauthorized')
    })
  })

  describe('DELETE /api/users/logout', () => {
    it('should return 200 on successful logout', async () => {
      ;(SessionService.logoutUser as jest.Mock).mockResolvedValue(undefined)

      const req = createRequest('http://localhost/api/users/logout', 'DELETE', null, {
        'Authorization': 'Bearer valid-token'
      })
      const res = await logoutDelete(req)
      const body = await res.json()

      expect(res.status).toBe(200)
      expect(body.message).toBe('Logout success')
    })

    it('should return 401 if token is invalid', async () => {
      ;(SessionService.logoutUser as jest.Mock).mockRejectedValue(new Error('unauthorized'))

      const req = createRequest('http://localhost/api/users/logout', 'DELETE', null, {
        'Authorization': 'Bearer invalid-token'
      })
      const res = await logoutDelete(req)
      const body = await res.json()

      expect(res.status).toBe(401)
      expect(body.error).toBe('unauthorized')
    })
  })
})
