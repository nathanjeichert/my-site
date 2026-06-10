// Sends a show-alert email (Resend Broadcast) when new shows are added to
// content/shows.json. Run by .github/workflows/announce-shows.yml on push.
//
// Only genuinely NEW shows are announced: it diffs the file between two git
// refs and keys shows by venue+date, so edits to existing entries (time,
// description, typo fixes) never trigger an email. Past-dated shows are
// ignored. All new shows in one push go out as a single digest.
//
// Env:
//   RESEND_API_KEY, RESEND_AUDIENCE_ID — required to send (no-op if missing)
//   BEFORE_REF / AFTER_REF — git refs to diff (default HEAD^ / HEAD)
//   BEFORE_FILE / AFTER_FILE — file paths that override git refs (for testing)
//   DRY_RUN=1 — render the email to a temp file and print it, don't send
import { execFileSync } from 'node:child_process'
import { writeFileSync, readFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const SHOWS_PATH = 'content/shows.json'
const SITE_URL = 'https://www.northerndisconnection.com'
const FROM = 'Northern Disconnection <shows@northerndisconnection.com>'
const REPLY_TO = 'nathanjeichert@gmail.com'

function loadShows(ref, fileOverride) {
  let raw
  if (fileOverride) {
    raw = readFileSync(fileOverride, 'utf8')
  } else {
    try {
      raw = execFileSync('git', ['show', `${ref}:${SHOWS_PATH}`], {
        encoding: 'utf8',
        maxBuffer: 10 * 1024 * 1024,
      })
    } catch {
      return null // ref unreachable (first push, force push, shallow clone)
    }
  }
  try {
    return JSON.parse(raw.replace(/^﻿/, '')).upcomingShows ?? []
  } catch {
    return null
  }
}

// "June 26th, 2026" → Date (same logic as lib/dates.ts)
function parseShowDate(value) {
  const cleaned = String(value ?? '').replace(/(\d+)(st|nd|rd|th)/i, '$1')
  const parsed = new Date(cleaned)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

const showKey = (s) =>
  `${String(s.date ?? '').trim().toLowerCase()}|${String(s.venue ?? '').trim().toLowerCase()}`

function escapeHtml(s) {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function renderShowHtml(show) {
  const weekday = parseShowDate(show.date)?.toLocaleDateString('en-US', { weekday: 'long' })
  const dateLine = [weekday, show.date].filter(Boolean).join(', ')
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
      <tr><td style="border-left:3px solid #b45a33;padding:4px 0 4px 16px;">
        <p style="margin:0;font-size:13px;letter-spacing:2px;text-transform:uppercase;color:#b45a33;">${escapeHtml(dateLine)}${show.time ? ` &middot; ${escapeHtml(show.time)}` : ''}</p>
        <p style="margin:4px 0 0;font-size:20px;font-weight:bold;color:#1d3a2f;">${escapeHtml(show.venue)}</p>
        <p style="margin:2px 0 0;font-size:15px;color:#4a5d52;">${escapeHtml(show.location)}</p>
        ${show.description ? `<p style="margin:6px 0 0;font-size:14px;font-style:italic;color:#4a5d52;">${escapeHtml(show.description)}</p>` : ''}
      </td></tr>
    </table>`
}

function renderEmail(newShows) {
  const plural = newShows.length > 1
  const heading = plural ? `We&rsquo;ve added ${newShows.length} new shows` : 'We&rsquo;ve added a new show'
  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background-color:#f4ecd9;font-family:Georgia,'Times New Roman',serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4ecd9;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
        <tr><td style="padding:0 0 24px;text-align:center;">
          <p style="margin:0;font-size:24px;font-weight:bold;letter-spacing:1px;color:#1d3a2f;">Northern Disconnection</p>
          <p style="margin:4px 0 0;font-size:13px;letter-spacing:3px;text-transform:uppercase;color:#b45a33;">Show Alert</p>
        </td></tr>
        <tr><td style="background-color:#fffdf5;border:2px solid #1d3a2f;padding:28px;">
          <p style="margin:0 0 20px;font-size:17px;color:#1d3a2f;">${heading} &mdash; hope to see you out there:</p>
          ${newShows.map(renderShowHtml).join('')}
          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px auto 0;"><tr><td style="background-color:#1d3a2f;text-align:center;">
            <a href="${SITE_URL}/shows" style="display:inline-block;padding:12px 28px;font-size:14px;letter-spacing:1px;text-transform:uppercase;color:#f4ecd9;text-decoration:none;">All shows &amp; details</a>
          </td></tr></table>
        </td></tr>
        <tr><td style="padding:24px 12px 0;text-align:center;">
          <p style="margin:0;font-size:12px;color:#6b7a70;">You&rsquo;re getting this because you signed up for show alerts at <a href="${SITE_URL}" style="color:#6b7a70;">northerndisconnection.com</a>. We only email when new shows are announced.</p>
          <p style="margin:8px 0 0;font-size:12px;color:#6b7a70;"><a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#6b7a70;">Unsubscribe</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`

  const text = [
    plural ? `We've added ${newShows.length} new shows — hope to see you out there:` : `We've added a new show — hope to see you out there:`,
    '',
    ...newShows.map((s) => {
      const weekday = parseShowDate(s.date)?.toLocaleDateString('en-US', { weekday: 'long' })
      return [
        `${[weekday, s.date].filter(Boolean).join(', ')}${s.time ? ` · ${s.time}` : ''}`,
        `${s.venue} — ${s.location}`,
        s.description || null,
        '',
      ].filter((l) => l !== null).join('\n')
    }),
    `All shows & details: ${SITE_URL}/shows`,
    '',
    `You're getting this because you signed up for show alerts at northerndisconnection.com.`,
    'Unsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}',
  ].join('\n')

  const subject = plural
    ? `${newShows.length} new Northern Disconnection shows announced`
    : `New show: ${newShows[0].venue}, ${newShows[0].location} — ${newShows[0].date}`

  return { subject, html, text }
}

async function resend(path, body, apiKey) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(`Resend ${path} failed (${res.status}): ${JSON.stringify(json)}`)
  }
  return json
}

const beforeRef = process.env.BEFORE_REF || 'HEAD^'
const afterRef = process.env.AFTER_REF || 'HEAD'

const before =
  /^0+$/.test(beforeRef) // all-zero SHA = branch creation; nothing to diff against
    ? loadShows('HEAD^', process.env.BEFORE_FILE)
    : loadShows(beforeRef, process.env.BEFORE_FILE)
const after = loadShows(afterRef, process.env.AFTER_FILE)

if (!after) {
  console.log('Could not read current shows.json — nothing to do.')
  process.exit(0)
}
if (!before) {
  console.log('No previous version of shows.json to diff against — skipping (will not mass-announce existing shows).')
  process.exit(0)
}

const known = new Set(before.map(showKey))
// 24h grace so a show added on the day of the gig still announces across timezones
const cutoff = Date.now() - 24 * 60 * 60 * 1000
const newShows = after
  .filter((s) => s.venue && s.date && !known.has(showKey(s)))
  .filter((s) => {
    const d = parseShowDate(s.date)
    return d !== null && d.getTime() >= cutoff
  })
  .sort((a, b) => (parseShowDate(a.date)?.getTime() ?? 0) - (parseShowDate(b.date)?.getTime() ?? 0))

if (newShows.length === 0) {
  console.log('No new upcoming shows detected — no email sent.')
  process.exit(0)
}

console.log(`New upcoming show(s) detected:`)
for (const s of newShows) console.log(`  - ${s.date} | ${s.venue} | ${s.location}`)

const { subject, html, text } = renderEmail(newShows)

if (process.env.DRY_RUN === '1') {
  const out = join(tmpdir(), 'nd-announce-preview.html')
  writeFileSync(out, html)
  console.log(`\nDRY RUN — no email sent.\nSubject: ${subject}\nPreview written to: ${out}\n\n--- text version ---\n${text}`)
  process.exit(0)
}

const apiKey = process.env.RESEND_API_KEY
const audienceId = process.env.RESEND_AUDIENCE_ID
if (!apiKey || !audienceId) {
  console.log('RESEND_API_KEY / RESEND_AUDIENCE_ID not set — skipping send (newsletter not configured yet).')
  process.exit(0)
}

const broadcast = await resend('/broadcasts', {
  name: subject,
  audience_id: audienceId,
  from: FROM,
  reply_to: REPLY_TO,
  subject,
  html,
  text,
}, apiKey)

await resend(`/broadcasts/${broadcast.id}/send`, {}, apiKey)
console.log(`Broadcast ${broadcast.id} sent to audience ${audienceId}.`)
