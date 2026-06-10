import { NextResponse } from 'next/server'

const RESEND_API = 'https://api.resend.com'

// Subscribers live in a Resend Audience (free tier) — no database to keep alive.
// Unsubscribes are managed by Resend and automatically excluded from broadcasts.
export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (
      !email ||
      typeof email !== 'string' ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const apiKey = process.env.RESEND_API_KEY
    const audienceId = process.env.RESEND_AUDIENCE_ID

    if (!apiKey || !audienceId) {
      return NextResponse.json(
        { error: 'Signups are temporarily offline — please try again soon.' },
        { status: 503 }
      )
    }

    const normalized = email.trim().toLowerCase()
    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    }

    const created = await fetch(`${RESEND_API}/audiences/${audienceId}/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email: normalized, unsubscribed: false }),
    })

    if (created.ok) {
      return NextResponse.json({ success: true })
    }

    // Already subscribed once before — re-opt them in by email address.
    if (created.status === 409) {
      const updated = await fetch(
        `${RESEND_API}/audiences/${audienceId}/contacts/${encodeURIComponent(normalized)}`,
        {
          method: 'PATCH',
          headers,
          body: JSON.stringify({ unsubscribed: false }),
        }
      )
      if (updated.ok) {
        return NextResponse.json({ success: true })
      }
    }

    console.error('Resend contact error:', created.status, await created.text())
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 502 })
  } catch (error) {
    console.error('Subscription error:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  }
}
