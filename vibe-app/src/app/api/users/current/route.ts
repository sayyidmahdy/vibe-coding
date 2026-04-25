import { NextRequest, NextResponse } from 'next/server'
import { SessionService } from '@/services/sessions-service'

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('Authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    const token = authHeader.split(' ')[1]

    const user = await SessionService.getCurrentUser(token)

    return NextResponse.json({ data: user }, { status: 200 })
  } catch (error: any) {
    if (error.message === 'unauthorized') {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
    }

    console.error('GetCurrentUser Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
