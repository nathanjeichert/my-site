import { createClient } from 'redis'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  let client

  try {
    const { email } = await request.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // Connect to Redis
    client = createClient({
      url: process.env.REDIS_URL
    })
    await client.connect()

    // Add email to set (automatically handles duplicates)
    await client.sAdd('newsletter-subscribers', email.toLowerCase())

    await client.disconnect()

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Subscription error:', error)
    if (client) {
      await client.disconnect().catch(() => {})
    }
    return NextResponse.json(
      { error: 'Failed to subscribe', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
