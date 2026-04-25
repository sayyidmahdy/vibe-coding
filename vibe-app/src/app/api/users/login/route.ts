import { NextRequest, NextResponse } from 'next/server'
import { SessionService } from '@/services/sessions-service'
import { isValidEmail } from '@/utils/validator'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    // 1. Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }

    // 2. Call service
    const response = await SessionService.loginUser({ email, password })

    return NextResponse.json(response, { status: 200 })
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      return NextResponse.json({ message: error.message }, { status: 401 })
    }

    console.error('Login Error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
