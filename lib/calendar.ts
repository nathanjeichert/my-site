import type { Show } from '@/types/content'
import { parseShowDate } from './dates'

type TimeOfDay = { hours: number; minutes: number }

const DEFAULT_DURATION_HOURS = 2

// Show times are loose strings like "6:00–8:00 PM" or "7 PM". A meridiem
// given on only one side applies to both ("6:00–8:00 PM" → 6 PM to 8 PM).
function parseTimeRange(value: string): { start: TimeOfDay; end: TimeOfDay | null } | null {
  const tokens = [...value.matchAll(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/gi)]
    .map((match) => ({
      hours: Number(match[1]),
      minutes: match[2] ? Number(match[2]) : 0,
      meridiem: match[3]?.toLowerCase() ?? null,
    }))
    .slice(0, 2)

  if (tokens.length === 0) return null

  const sharedMeridiem = tokens.find((token) => token.meridiem)?.meridiem ?? null

  const toTimeOfDay = (token: (typeof tokens)[number]): TimeOfDay | null => {
    if (token.hours > 23 || token.minutes > 59) return null
    const meridiem = token.meridiem ?? sharedMeridiem
    let hours = token.hours
    if (meridiem === 'pm' && hours < 12) hours += 12
    if (meridiem === 'am' && hours === 12) hours = 0
    return { hours, minutes: token.minutes }
  }

  const start = toTimeOfDay(tokens[0])
  if (!start) return null

  return { start, end: tokens[1] ? toTimeOfDay(tokens[1]) : null }
}

function pad(value: number): string {
  return String(value).padStart(2, '0')
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`
}

// Floating local time (no TZID) — shows are local affairs, so the event
// should land at the venue's wall-clock time on every device.
function formatLocalDateTime(date: Date): string {
  return `${formatDate(date)}T${pad(date.getHours())}${pad(date.getMinutes())}00`
}

function escapeText(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n')
}

// RFC 5545 §3.1: content lines over 75 octets must be folded with a
// CRLF + single space continuation.
function foldLine(line: string): string {
  const segments: string[] = []
  let rest = line
  while (rest.length > 74) {
    segments.push(rest.slice(0, 74))
    rest = ' ' + rest.slice(74)
  }
  segments.push(rest)
  return segments.join('\r\n')
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export interface ShowDateTimes {
  start: Date
  end: Date
  allDay: boolean
}

// Resolve a show's loose date/time strings into concrete start/end Dates.
// Floating local time — a show should land at the venue's wall-clock time on
// every device — so no timezone is attached.
export function getShowDateTimes(show: Show): ShowDateTimes | null {
  const date = parseShowDate(show.date)
  if (!date) return null

  const range = show.time ? parseTimeRange(show.time) : null
  if (!range) {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    const end = new Date(start)
    end.setDate(end.getDate() + 1)
    return { start, end, allDay: true }
  }

  const start = new Date(date)
  start.setHours(range.start.hours, range.start.minutes, 0, 0)
  const end = new Date(date)
  if (range.end) {
    end.setHours(range.end.hours, range.end.minutes, 0, 0)
  } else {
    end.setHours(range.start.hours + DEFAULT_DURATION_HOURS, range.start.minutes, 0, 0)
  }
  if (end <= start) {
    end.setDate(end.getDate() + 1)
  }
  return { start, end, allDay: false }
}

function isoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function isoLocalDateTime(date: Date): string {
  return `${isoDate(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}:00`
}

function eventTitle(show: Show): string {
  return `Northern Disconnection at ${show.venue}`
}

export function buildShowIcs(show: Show): string | null {
  const times = getShowDateTimes(show)
  if (!times) return null

  const dtStart = times.allDay
    ? `DTSTART;VALUE=DATE:${formatDate(times.start)}`
    : `DTSTART:${formatLocalDateTime(times.start)}`
  const dtEnd = times.allDay
    ? `DTEND;VALUE=DATE:${formatDate(times.end)}`
    : `DTEND:${formatLocalDateTime(times.end)}`

  const stamp = new Date()
  const dtStamp =
    `${stamp.getUTCFullYear()}${pad(stamp.getUTCMonth() + 1)}${pad(stamp.getUTCDate())}` +
    `T${pad(stamp.getUTCHours())}${pad(stamp.getUTCMinutes())}${pad(stamp.getUTCSeconds())}Z`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Northern Disconnection//Shows//EN',
    'BEGIN:VEVENT',
    `UID:${formatDate(times.start)}-${slugify(show.venue)}@northerndisconnection`,
    `DTSTAMP:${dtStamp}`,
    dtStart,
    dtEnd,
    `SUMMARY:${escapeText(eventTitle(show))}`,
    `LOCATION:${escapeText(`${show.venue}, ${show.location}`)}`,
  ]
  if (show.description) {
    lines.push(`DESCRIPTION:${escapeText(show.description)}`)
  }
  lines.push('END:VEVENT', 'END:VCALENDAR')

  return lines.map(foldLine).join('\r\n') + '\r\n'
}

export function showIcsFilename(show: Show): string {
  const date = parseShowDate(show.date)
  return `northern-disconnection-${date ? formatDate(date) : 'show'}-${slugify(show.venue)}.ics`
}

// Google Calendar "add event" link. Floating datetimes (no Z) so the event
// lands at the venue's wall-clock time, matching the .ics.
export function googleCalendarUrl(show: Show): string | null {
  const times = getShowDateTimes(show)
  if (!times) return null
  const dates = times.allDay
    ? `${formatDate(times.start)}/${formatDate(times.end)}`
    : `${formatLocalDateTime(times.start)}/${formatLocalDateTime(times.end)}`
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventTitle(show),
    dates,
    location: `${show.venue}, ${show.location}`,
  })
  if (show.description) params.set('details', show.description)
  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

// Outlook.com "compose event" deep link.
export function outlookCalendarUrl(show: Show): string | null {
  const times = getShowDateTimes(show)
  if (!times) return null
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: eventTitle(show),
    location: `${show.venue}, ${show.location}`,
  })
  if (times.allDay) {
    params.set('allday', 'true')
    params.set('startdt', isoDate(times.start))
    params.set('enddt', isoDate(times.end))
  } else {
    params.set('startdt', isoLocalDateTime(times.start))
    params.set('enddt', isoLocalDateTime(times.end))
  }
  if (show.description) params.set('body', show.description)
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}
