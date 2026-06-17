import type { Show } from '@/types/content'
import { getWeekday, parseShowDate } from './dates'

/*
  Generative show flyer, drawn on a canvas in the site's design system.
  The background is seeded — each show gets a signature artwork, and
  re-rolling the seed produces a fresh variation: a palette (dusk /
  ember / night), a motif (striped sun + rays, tree rings, or flowing
  ribbons), ridgeline silhouettes with a conifer treeline, optional
  stars, film grain, and a letterpress double-rule frame.
*/

export type FlyerFormat = 'post' | 'story'

export const FLYER_DIMENSIONS: Record<FlyerFormat, { width: number; height: number; label: string }> = {
  post: { width: 1080, height: 1350, label: 'Post · 4:5' },
  story: { width: 1080, height: 1920, label: 'Story · 9:16' },
}

const CREAM = '#f7f2e5'
const SAND = '#e8dcc6'
const GOLD = '#e9b949'
const RUST = '#d7b48a'

interface Palette {
  sky: [string, string]
  glow: string
  accent: string
  soft: string
  ridges: [string, string, string]
  starChance: number
}

const PALETTES: Palette[] = [
  {
    // golden dusk over the ridge
    sky: ['#143524', '#0c2318'],
    glow: 'rgba(233, 185, 73, 0.16)',
    accent: GOLD,
    soft: RUST,
    ridges: ['#16382a', '#0f291d', '#081710'],
    starChance: 0.4,
  },
  {
    // ember sunset
    sky: ['#34141d', '#150a0e'],
    glow: 'rgba(215, 180, 138, 0.15)',
    accent: RUST,
    soft: GOLD,
    ridges: ['#27101b', '#180a10', '#0c0509'],
    starChance: 0.25,
  },
  {
    // deep night in the redwoods
    sky: ['#0a2015', '#05110b'],
    glow: 'rgba(125, 132, 113, 0.18)',
    accent: CREAM,
    soft: '#7d8471',
    ridges: ['#0e2419', '#091a11', '#040d08'],
    starChance: 1,
  },
]

export function hashSeed(value: string): number {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function mulberry32(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

type Ctx = CanvasRenderingContext2D
type Rand = () => number

// Canvas letter-spacing is newer than this project's TS DOM lib;
// browsers without it just render the text untracked.
function setLetterSpacing(ctx: Ctx, value: string) {
  ;(ctx as Ctx & { letterSpacing?: string }).letterSpacing = value
}

function drawSun(ctx: Ctx, w: number, h: number, rand: Rand, palette: Palette) {
  const cx = w * (0.25 + rand() * 0.5)
  const cy = h * (0.16 + rand() * 0.16)
  const r = w * (0.1 + rand() * 0.08)

  const halo = ctx.createRadialGradient(cx, cy, r * 0.4, cx, cy, r * 3.5)
  halo.addColorStop(0, hexToRgba(palette.accent, 0.3))
  halo.addColorStop(1, 'rgba(0, 0, 0, 0)')
  ctx.fillStyle = halo
  ctx.fillRect(0, 0, w, h)

  // rays — alternating wedges out to the canvas edge
  const rays = 2 * (14 + Math.floor(rand() * 8))
  const baseAngle = rand() * Math.PI
  const reach = Math.hypot(w, h)
  ctx.fillStyle = hexToRgba(palette.accent, 0.06 + rand() * 0.04)
  for (let i = 0; i < rays; i += 2) {
    const a0 = baseAngle + (i / rays) * Math.PI * 2
    const a1 = baseAngle + ((i + 1) / rays) * Math.PI * 2
    ctx.beginPath()
    ctx.moveTo(cx, cy)
    ctx.lineTo(cx + Math.cos(a0) * reach, cy + Math.sin(a0) * reach)
    ctx.lineTo(cx + Math.cos(a1) * reach, cy + Math.sin(a1) * reach)
    ctx.closePath()
    ctx.fill()
  }

  // striped retro sun disc
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.clip()
  ctx.fillStyle = hexToRgba(palette.accent, 0.9)
  ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
  ctx.fillStyle = palette.sky[0]
  let stripeY = cy + r * 0.05
  let stripeH = r * 0.05
  while (stripeY < cy + r) {
    ctx.fillRect(cx - r, stripeY, r * 2, stripeH)
    stripeY += stripeH * 2.4
    stripeH *= 1.35
  }
  ctx.restore()
}

function drawRings(ctx: Ctx, w: number, h: number, rand: Rand, palette: Palette) {
  const cx = w * (rand() < 0.5 ? 0.12 : 0.88) + (rand() - 0.5) * w * 0.1
  const cy = h * (0.14 + rand() * 0.2)
  let r = w * (0.05 + rand() * 0.05)
  const rings = 8 + Math.floor(rand() * 6)
  ctx.lineCap = 'round'
  for (let i = 0; i < rings; i++) {
    const color = i % 2 === 0 ? palette.accent : palette.soft
    ctx.strokeStyle = hexToRgba(color, Math.max(0.04, 0.18 - i * 0.012))
    ctx.lineWidth = 3 + rand() * 4
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.stroke()
    r *= 1.26 + rand() * 0.1
  }
}

function drawRibbons(ctx: Ctx, w: number, h: number, rand: Rand, palette: Palette) {
  const bands = 3 + Math.floor(rand() * 3)
  for (let k = 0; k < bands; k++) {
    const yCenter = h * (0.12 + 0.45 * (k / bands) + rand() * 0.08)
    const amp = h * (0.02 + rand() * 0.035)
    const wavelength = w * (0.55 + rand() * 0.8)
    const phase = rand() * Math.PI * 2
    const thickness = h * (0.018 + rand() * 0.05)
    const color = k % 2 === 0 ? palette.accent : palette.soft

    ctx.beginPath()
    for (let x = 0; x <= w; x += 12) {
      const y = yCenter + amp * Math.sin((x / wavelength) * Math.PI * 2 + phase)
      if (x === 0) ctx.moveTo(x, y)
      else ctx.lineTo(x, y)
    }
    for (let x = w; x >= 0; x -= 12) {
      const y =
        yCenter +
        thickness +
        amp * 0.7 * Math.sin((x / wavelength) * Math.PI * 2 + phase + 0.6)
      ctx.lineTo(x, y)
    }
    ctx.closePath()
    ctx.fillStyle = hexToRgba(color, 0.09 + rand() * 0.05)
    ctx.fill()
  }
}

function drawStars(ctx: Ctx, w: number, h: number, rand: Rand) {
  const count = 30 + Math.floor(rand() * 50)
  for (let i = 0; i < count; i++) {
    const x = rand() * w
    const y = rand() * h * 0.55
    const radius = 0.8 + rand() * 1.8
    ctx.fillStyle = hexToRgba(CREAM, 0.15 + rand() * 0.45)
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
  }
}

function drawRidges(ctx: Ctx, w: number, h: number, rand: Rand, palette: Palette) {
  palette.ridges.forEach((color, layer) => {
    const isFront = layer === palette.ridges.length - 1
    const yBase = h * (0.56 + 0.08 * layer + rand() * 0.03)
    const amp = h * (0.05 - 0.012 * layer)
    const f1 = 0.6 + rand() * 0.8
    const f2 = 1.5 + rand() * 2
    const p1 = rand() * Math.PI * 2
    const p2 = rand() * Math.PI * 2

    const points: Array<[number, number]> = []
    for (let x = 0; x <= w; x += 8) {
      const t = x / w
      const y =
        yBase +
        amp *
          (0.6 * Math.sin(t * f1 * Math.PI * 2 + p1) +
            0.4 * Math.sin(t * f2 * Math.PI * 2 + p2))
      points.push([x, y])
    }

    ctx.beginPath()
    ctx.moveTo(0, h)
    points.forEach(([x, y]) => ctx.lineTo(x, y))
    ctx.lineTo(w, h)
    ctx.closePath()
    ctx.fillStyle = color
    ctx.fill()

    // conifer treeline along the front ridge
    if (isFront) {
      ctx.fillStyle = color
      let x = rand() * 30
      while (x < w) {
        const index = Math.min(points.length - 1, Math.floor(x / 8))
        const y = points[index][1]
        const treeH = h * (0.02 + rand() * 0.035)
        const halfW = treeH * (0.2 + rand() * 0.12)
        ctx.beginPath()
        ctx.moveTo(x - halfW, y + 4)
        ctx.lineTo(x + (rand() - 0.5) * halfW * 0.5, y - treeH)
        ctx.lineTo(x + halfW, y + 4)
        ctx.closePath()
        ctx.fill()
        x += 16 + rand() * 44
      }
    }
  })
}

function drawGrain(ctx: Ctx, w: number, h: number, rand: Rand) {
  const size = 140
  const tile = document.createElement('canvas')
  tile.width = size
  tile.height = size
  const tileCtx = tile.getContext('2d')
  if (!tileCtx) return
  const data = tileCtx.createImageData(size, size)
  for (let i = 0; i < data.data.length; i += 4) {
    const value = Math.floor(rand() * 255)
    data.data[i] = value
    data.data[i + 1] = value
    data.data[i + 2] = value
    data.data[i + 3] = 26
  }
  tileCtx.putImageData(data, 0, 0)
  const pattern = ctx.createPattern(tile, 'repeat')
  if (!pattern) return
  ctx.save()
  ctx.globalAlpha = 0.55
  ctx.fillStyle = pattern
  ctx.fillRect(0, 0, w, h)
  ctx.restore()
}

function drawBackground(ctx: Ctx, w: number, h: number, rand: Rand) {
  const palette = PALETTES[Math.floor(rand() * PALETTES.length)]
  const motif = (['sun', 'rings', 'ribbons'] as const)[Math.floor(rand() * 3)]

  const sky = ctx.createLinearGradient(0, 0, 0, h)
  sky.addColorStop(0, palette.sky[0])
  sky.addColorStop(1, palette.sky[1])
  ctx.fillStyle = sky
  ctx.fillRect(0, 0, w, h)

  for (let i = 0; i < 2; i++) {
    const gx = w * (0.2 + rand() * 0.6)
    const gy = h * (0.05 + rand() * 0.4)
    const gr = w * (0.5 + rand() * 0.5)
    const glow = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr)
    glow.addColorStop(0, palette.glow)
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = glow
    ctx.fillRect(0, 0, w, h)
  }

  if (motif === 'sun') drawSun(ctx, w, h, rand, palette)
  else if (motif === 'rings') drawRings(ctx, w, h, rand, palette)
  else drawRibbons(ctx, w, h, rand, palette)

  if (rand() < palette.starChance) drawStars(ctx, w, h, rand)

  drawRidges(ctx, w, h, rand, palette)

  // scrim so the text block reads over whatever the seed produced
  const scrim = ctx.createLinearGradient(0, h * 0.42, 0, h)
  scrim.addColorStop(0, 'rgba(6, 16, 11, 0)')
  scrim.addColorStop(0.55, 'rgba(6, 16, 11, 0.5)')
  scrim.addColorStop(1, 'rgba(6, 16, 11, 0.93)')
  ctx.fillStyle = scrim
  ctx.fillRect(0, 0, w, h)

  const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.75)
  vignette.addColorStop(0, 'rgba(0, 0, 0, 0)')
  vignette.addColorStop(1, 'rgba(0, 0, 0, 0.3)')
  ctx.fillStyle = vignette
  ctx.fillRect(0, 0, w, h)

  drawGrain(ctx, w, h, rand)

  // letterpress double-rule frame
  ctx.strokeStyle = hexToRgba(CREAM, 0.85)
  ctx.lineWidth = 3
  ctx.strokeRect(26, 26, w - 52, h - 52)
  ctx.strokeStyle = hexToRgba(CREAM, 0.45)
  ctx.lineWidth = 1.5
  ctx.strokeRect(44, 44, w - 88, h - 88)
}

/* ---------- foreground: logo + text block ---------- */

const CREAM_RGB: [number, number, number] = [247, 242, 229]

// The logo is decoupled into two black-ink artworks: the guitar/tree mark
// and the stylized wordmark. They live on transparency as high-resolution
// line art so they scale crisply onto the flyer.
let markPromise: Promise<HTMLImageElement> | null = null
let wordmarkPromise: Promise<HTMLImageElement> | null = null
let tintedMark: HTMLCanvasElement | null = null
let tintedWordmark: HTMLCanvasElement | null = null

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// Recolor black-ink line art to `color`, mapping each pixel's lightness to
// transparency. This keeps the inked lines (dark → opaque colour) while the
// white-filled interior of the mark drops out (light → transparent), so the
// guitar/tree reads as a clean line drawing instead of a flat silhouette.
function tintInk(img: HTMLImageElement, color: [number, number, number]): HTMLCanvasElement {
  const w = img.naturalWidth
  const h = img.naturalHeight
  const off = document.createElement('canvas')
  off.width = w
  off.height = h
  const ctx = off.getContext('2d')
  if (!ctx) return off
  ctx.drawImage(img, 0, 0)
  const image = ctx.getImageData(0, 0, w, h)
  const d = image.data
  const [r, g, b] = color
  for (let i = 0; i < d.length; i += 4) {
    const a = d[i + 3]
    if (a === 0) continue
    const lum = (d[i] * 0.299 + d[i + 1] * 0.587 + d[i + 2] * 0.114) / 255
    d[i] = r
    d[i + 1] = g
    d[i + 2] = b
    d[i + 3] = Math.round(a * (1 - lum))
  }
  ctx.putImageData(image, 0, 0)
  return off
}

interface LogoAssets {
  mark: HTMLCanvasElement
  wordmark: HTMLCanvasElement
}

async function loadLogoAssets(): Promise<LogoAssets | null> {
  markPromise ??= loadImage('/logo-mark.png')
  wordmarkPromise ??= loadImage('/logo-wordmark.png')
  try {
    const [mark, wordmark] = await Promise.all([markPromise, wordmarkPromise])
    tintedMark ??= tintInk(mark, CREAM_RGB)
    tintedWordmark ??= tintInk(wordmark, CREAM_RGB)
    return { mark: tintedMark, wordmark: tintedWordmark }
  } catch {
    return null
  }
}

// Fraunces' default capital J drops a deep descender that reads oddly in the
// all-caps date line. Character variant cv16 swaps it for a J that rests on the
// baseline and changes nothing else. Canvas can't set font-feature-settings
// through ctx.font, so register a FontFace built from a self-hosted copy of
// Fraunces (public/fonts/fraunces-flyer.woff2) with cv16 baked in, and draw the
// headline type with it. Self-hosting at a fixed path keeps this working in
// production, where the next/font asset URL isn't discoverable at runtime.
let displayFamilyPromise: Promise<string> | null = null

function loadDisplayFamily(fallback: string): Promise<string> {
  displayFamilyPromise ??= (async () => {
    try {
      if (typeof FontFace === 'undefined') return fallback
      const face = new FontFace('FrauncesFlyer', 'url(/fonts/fraunces-flyer.woff2)', {
        weight: '100 900',
        featureSettings: "'cv16' 1",
      })
      await face.load()
      document.fonts.add(face)
      return `"FrauncesFlyer", ${fallback}`
    } catch {
      return fallback // fall back to the stock face (descending J) if the file is missing
    }
  })()
  return displayFamilyPromise
}

async function ensureFonts(): Promise<{ display: string; body: string }> {
  const styles = getComputedStyle(document.documentElement)
  const baseDisplay = styles.getPropertyValue('--font-display').trim() || 'Georgia, serif'
  const body = styles.getPropertyValue('--font-body').trim() || 'Georgia, serif'
  const display = await loadDisplayFamily(baseDisplay)
  try {
    await Promise.all([
      document.fonts.load(`600 90px ${display}`),
      document.fonts.load(`700 36px ${body}`),
      document.fonts.load(`500 36px ${body}`),
      document.fonts.load(`italic 500 34px ${body}`),
    ])
  } catch {
    // draw with fallback faces
  }
  return { display, body }
}

function fitFontSize(
  ctx: Ctx,
  text: string,
  maxSize: number,
  maxWidth: number,
  fontFor: (size: number) => string,
): number {
  let size = maxSize
  ctx.font = fontFor(size)
  while (size > 24 && ctx.measureText(text).width > maxWidth) {
    size -= 2
    ctx.font = fontFor(size)
  }
  return size
}

function wrapText(ctx: Ctx, text: string, maxWidth: number, maxLines: number): string[] {
  const words = text.split(/\s+/)
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (ctx.measureText(candidate).width <= maxWidth || !current) {
      current = candidate
    } else {
      lines.push(current)
      current = word
    }
  }
  if (current) lines.push(current)
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = kept[maxLines - 1].replace(/\W*$/, '') + '…'
    return kept
  }
  return lines
}

interface Block {
  height: number
  gap: number
  draw: (y: number) => void
}

function drawForeground(
  ctx: Ctx,
  w: number,
  h: number,
  show: Show,
  fonts: { display: string; body: string },
  logo: LogoAssets | null,
) {
  const centerX = w / 2
  const isStory = h > 1500
  const maxWidth = w - 200

  const blocks: Block[] = []

  // --- identity lockup: guitar/tree mark beside the stylized wordmark ---
  if (logo) {
    const markH = isStory ? 392 : 344
    const markW = markH * (logo.mark.width / logo.mark.height)
    const wordW = isStory ? 724 : 688
    const wordH = wordW * (logo.wordmark.height / logo.wordmark.width)
    const innerGap = 34
    const lockupW = markW + innerGap + wordW
    const lockupH = Math.max(markH, wordH)
    blocks.push({
      height: lockupH,
      gap: isStory ? 80 : 66,
      draw: (y) => {
        const x0 = centerX - lockupW / 2
        ctx.save()
        ctx.shadowColor = 'rgba(8, 18, 12, 0.55)'
        ctx.shadowBlur = 18
        ctx.shadowOffsetY = 6
        ctx.drawImage(logo.mark, x0, y + (lockupH - markH) / 2, markW, markH)
        ctx.drawImage(logo.wordmark, x0 + markW + innerGap, y + (lockupH - wordH) / 2, wordW, wordH)
        ctx.restore()
      },
    })
  }

  // --- show details ---
  const weekday = getWeekday(show)
  const dateSansYear = show.date.replace(/,?\s*\d{4}\s*$/, '')
  const dateLine = `${weekday ? `${weekday}, ` : ''}${dateSansYear}`.toUpperCase()
  const infoLine = [show.location, show.time].filter(Boolean).join('  ·  ')

  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'

  const dateSize = fitFontSize(ctx, dateLine, isStory ? 94 : 90, maxWidth, (s) => `600 ${s}px ${fonts.display}`)
  const venueSize = fitFontSize(ctx, show.venue, 66, maxWidth, (s) => `600 ${s}px ${fonts.display}`)

  ctx.font = `italic 500 34px ${fonts.body}`
  const descLines = show.description ? wrapText(ctx, show.description, maxWidth, 3) : []

  blocks.push(
    {
      height: 32,
      gap: 34,
      draw: (y) => {
        ctx.font = `700 32px ${fonts.body}`
        setLetterSpacing(ctx, '16px')
        ctx.fillStyle = RUST
        ctx.fillText('LIVE', centerX, y)
        setLetterSpacing(ctx, '0px')
      },
    },
    {
      height: dateSize,
      gap: 22,
      draw: (y) => {
        ctx.font = `600 ${dateSize}px ${fonts.display}`
        ctx.fillStyle = CREAM
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'
        ctx.shadowBlur = 14
        ctx.shadowOffsetY = 4
        ctx.fillText(dateLine, centerX, y)
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetY = 0
      },
    },
    {
      height: venueSize,
      gap: 24,
      draw: (y) => {
        ctx.font = `600 ${venueSize}px ${fonts.display}`
        ctx.fillStyle = GOLD
        ctx.fillText(show.venue, centerX, y)
      },
    },
    {
      height: 38,
      gap: descLines.length > 0 ? 26 : 34,
      draw: (y) => {
        ctx.font = `500 38px ${fonts.body}`
        ctx.fillStyle = SAND
        ctx.fillText(infoLine, centerX, y)
      },
    },
    ...descLines.map((line, index) => ({
      height: 34,
      gap: index === descLines.length - 1 ? 34 : 12,
      draw: (y: number) => {
        ctx.font = `italic 500 34px ${fonts.body}`
        ctx.fillStyle = hexToRgba(SAND, 0.85)
        ctx.fillText(line, centerX, y)
      },
    })),
    {
      height: 30,
      gap: 26,
      draw: (y) => {
        // ── ◆ ── ornament; the diamond is drawn (not a glyph) so it
        // can't fall back to tofu on devices missing fleuron chars
        const mid = y + 15
        ctx.strokeStyle = hexToRgba(RUST, 0.7)
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(centerX - 170, mid)
        ctx.lineTo(centerX - 36, mid)
        ctx.moveTo(centerX + 36, mid)
        ctx.lineTo(centerX + 170, mid)
        ctx.stroke()
        ctx.save()
        ctx.translate(centerX, mid)
        ctx.rotate(Math.PI / 4)
        ctx.fillStyle = hexToRgba(RUST, 0.9)
        ctx.fillRect(-8, -8, 16, 16)
        ctx.restore()
      },
    },
    {
      height: 28,
      gap: 0,
      draw: (y) => {
        ctx.font = `700 28px ${fonts.body}`
        setLetterSpacing(ctx, '2px')
        ctx.fillStyle = hexToRgba(RUST, 0.95)
        ctx.fillText('northerndisconnection.com', centerX, y)
        setLetterSpacing(ctx, '0px')
      },
    },
  )

  // Center the whole composition vertically (lifted slightly so the dark
  // base scrim still sits under the show details), filling the canvas evenly
  // on both the 4:5 and the taller 9:16 formats.
  const total = blocks.reduce((sum, b) => sum + b.height + b.gap, 0)
  let y = Math.max(h * 0.06, (h - total) * 0.46)
  for (const b of blocks) {
    b.draw(y)
    y += b.height + b.gap
  }
}

export async function drawFlyer(
  canvas: HTMLCanvasElement,
  show: Show,
  format: FlyerFormat,
  seed: number,
): Promise<void> {
  const { width, height } = FLYER_DIMENSIONS[format]
  const fonts = await ensureFonts()
  const logo = await loadLogoAssets()

  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  drawBackground(ctx, width, height, mulberry32(seed))
  drawForeground(ctx, width, height, show, fonts, logo)
}

export function flyerFilename(show: Show, format: FlyerFormat): string {
  const date = parseShowDate(show.date)
  const datePart = date
    ? `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`
    : 'show'
  const venuePart = show.venue
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  return `northern-disconnection-${datePart}-${venuePart}-${format}.png`
}
