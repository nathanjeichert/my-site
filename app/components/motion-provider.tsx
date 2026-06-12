'use client'

import { MotionConfig } from 'framer-motion'
import type { ReactNode } from 'react'

// Honors prefers-reduced-motion for every Framer Motion animation:
// transform/layout animations are skipped, opacity fades still run.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
