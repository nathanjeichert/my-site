import type { Show } from '@/types/content'

// Show dates are human-readable strings like "June 26th, 2026".
// Strip ordinal suffixes so Date.parse can handle them.
export function parseShowDate(value: string): Date | null {
  const cleaned = value.replace(/(\d+)(st|nd|rd|th)/i, '$1')
  const parsed = new Date(cleaned)
  return Number.isNaN(parsed.getTime()) ? null : parsed
}

export function sortShowsByDate(shows: Show[]): Show[] {
  return [...shows].sort((a, b) => {
    const dateA = parseShowDate(a.date)
    const dateB = parseShowDate(b.date)
    if (!dateA && !dateB) return 0
    if (!dateA) return 1
    if (!dateB) return -1
    return dateA.getTime() - dateB.getTime()
  })
}

// Index (within the date-sorted list) of the first show on or after today.
export function findNextShowIndex(sortedShows: Show[]): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return sortedShows.findIndex((show) => {
    const date = parseShowDate(show.date)
    return date !== null && date.getTime() >= today.getTime()
  })
}

export function getWeekday(show: Show): string | null {
  const date = parseShowDate(show.date)
  if (!date) return null
  return date.toLocaleDateString('en-US', { weekday: 'long' })
}

export function getDateParts(show: Show): { month: string; day: string; year: string } | null {
  const date = parseShowDate(show.date)
  if (!date) return null
  return {
    month: date.toLocaleDateString('en-US', { month: 'short' }),
    day: date.toLocaleDateString('en-US', { day: 'numeric' }),
    year: date.toLocaleDateString('en-US', { year: 'numeric' }),
  }
}
