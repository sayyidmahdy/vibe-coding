import { NextRequest, NextResponse } from 'next/server'
import { UserService } from '@/services/users-service'
import { isValidEmail } from '@/utils/validator'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, password } = body

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (name.length > 255) {
      return NextResponse.json(
        { message: 'Name must be at most 255 characters' },
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

    const user = await UserService.registerUser({ name, email, password })

    return NextResponse.json(user, { status: 201 })
  } catch (error: any) {
    if (error.message === 'Email already exists') {
      return NextResponse.json({ message: error.message }, { status: 400 })
    }

    console.error('Registration Error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}
