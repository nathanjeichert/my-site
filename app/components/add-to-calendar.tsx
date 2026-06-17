'use client'

import { useEffect, useRef, useState } from 'react'
import { CalendarPlus } from 'lucide-react'
import type { Show } from '@/types/content'
import {
  buildShowIcs,
  showIcsFilename,
  googleCalendarUrl,
  outlookCalendarUrl,
} from '@/lib/calendar'

function downloadIcs(show: Show) {
  const ics = buildShowIcs(show)
  if (!ics) return
  const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }))
  const link = document.createElement('a')
  link.href = url
  link.download = showIcsFilename(show)
  link.click()
  URL.revokeObjectURL(url)
}

/*
  Device-agnostic "Add to Calendar": instead of dropping a raw .ics that many
  visitors won't know what to do with, this opens a small picker so the event
  lands in whatever calendar they actually use. Apple Calendar (and any desktop
  calendar app) gets the .ics; Google and Outlook get a prefilled add-event link.
*/
export default function AddToCalendar({ show }: { show: Show }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const google = googleCalendarUrl(show)
  const outlook = outlookCalendarUrl(show)

  type Option = { label: string; href?: string; onSelect?: () => void }
  const options: Option[] = [
    ...(google ? [{ label: 'Google Calendar', href: google }] : []),
    { label: 'Apple Calendar', onSelect: () => downloadIcs(show) },
    ...(outlook ? [{ label: 'Outlook', href: outlook }] : []),
    { label: 'Download .ics', onSelect: () => downloadIcs(show) },
  ]

  const itemClass =
    'block w-full px-4 py-2.5 text-left text-[0.7rem] font-bold uppercase tracking-[0.15em] text-rust transition-colors hover:bg-moss/60 hover:text-cream'

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-rust/80 transition-colors hover:text-gold"
      >
        <CalendarPlus size={14} className="shrink-0" />
        Add to Calendar
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-0 top-full z-30 mt-2 min-w-[12rem] border-2 border-rust/50 bg-pine shadow-[5px_5px_0_rgba(215,180,138,0.25)]"
        >
          {options.map((option) =>
            option.href ? (
              <a
                key={option.label}
                role="menuitem"
                href={option.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={itemClass}
              >
                {option.label}
              </a>
            ) : (
              <button
                key={option.label}
                type="button"
                role="menuitem"
                onClick={() => {
                  option.onSelect?.()
                  setOpen(false)
                }}
                className={itemClass}
              >
                {option.label}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  )
}
