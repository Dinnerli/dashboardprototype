// Gauge.tsx

import { cn } from '@/lib/utils'
import type { CSSProperties, SVGProps } from 'react'

export interface GaugeProps extends Omit<SVGProps<SVGSVGElement>, 'className'> {
  /**
   * Three raw values (e.g. 65, 20, 10). Internally they are normalized
   * so that value1+value2+value3 = 100%. Then we draw three arcs with
   * exactly one “gap” of gapPercent between each, but only over a 180° arc.
   */
  value1: number
  value2: number
  value3: number

  /** Overall width/height of the SVG. */
  size?: number | string

  /**
   * Gap size, in percent‐of‐semicircle, between each pair of arcs.
   * e.g. gapPercent = 5 → 5% of the semicircle (i.e. 9°) is left blank
   * between arc1→arc2, arc2→arc3, and arc3→arc1.
   */
  gapPercent?: number

  /** Stroke thickness of each arc. */
  strokeWidth?: number

  /**
   * Pass either a string or an object so you can style each circle individually:
   *   { svgClassName, firstClassName, secondClassName, thirdClassName }
   */
  className?:
    | string
    | {
        svgClassName?: string
        firstClassName?: string
        secondClassName?: string
        thirdClassName?: string
      }

  /** Fill‐colors of the three arcs. */
  color1?: string
  color2?: string
  color3?: string

  /**
   * Simple fade/size transition on the stroke. Defaults to length=1000ms, delay=0.
   * (If you don’t want any animation, set length=0.)
   */
  transition?: {
    length?: number
    delay?: number
  }
  /** Click handlers for each arc */
  onArc1Click?: () => void
  onArc2Click?: () => void
  onArc3Click?: () => void

  /** Which arc is currently active (1, 2, or 3). Only the active arc shows its color, others are gray */
  activeArc?: 1 | 2 | 3
}

/**
 * A three‐segment “donut” gauge but drawn as a 180° (half) circle.
 * Each of the three arcs still gets exactly one gap of size `gapPercent%`
 * (now relative to the semicircle), so that the three arcs + gaps fill 180°.
 * This version flips it to the top half (9 o’clock → 3 o’clock).
 */
function HalfGauge({
  value1,
  value2,
  value3,
  size = '100%',
  gapPercent = 5,
  strokeWidth = 10,
  color1 = '#3b82f6',
  color2 = '#f59e0b',
  color3 = '#22c55e',
  transition = {
    length: 1000,
    delay: 0,
  },
  className,
  onArc1Click,
  onArc2Click,
  onArc3Click,
  activeArc = 1,
  ...props
}: GaugeProps) {
  // 1) Normalize the three raw values so that they sum to exactly 100%.
  const total = value1 + value2 + value3 || 1
  const pct1 = (value1 / total) * 100
  const pct2 = (value2 / total) * 100
  const pct3 = (value3 / total) * 100

  // 2) Draw everything inside a 100×100 viewBox for simplicity.
  const circleSize = 100
  const radius = circleSize / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  // 3) “Percent → degrees” over 180° (not 360°):
  const percentToDegree = 180 / 100 // 1% = 1.8°
  //    and “percent → px” for a half circle is (circumference/2)/100:
  const percentToPx = circumference / 200 // 1% of semicircle = (circumference/2)/100

  // 4) Compute how many degrees (and px) each gap occupies on the 180° arc:
  const gapDeg = gapPercent * percentToDegree // e.g. 5% → 9°
  const gapPx = gapPercent * percentToPx     // e.g. 5% → (circumference/200 * 5)

  // 5) Compute how many degrees each visible arc should occupy:
  //    (We subtract one full gapDeg from each segment so that the three arcs
  //     + the three gaps together exactly fill 180°.)
  const visibleDeg1 = pct1 * percentToDegree - gapDeg
  const visibleDeg2 = pct2 * percentToDegree - gapDeg
  const visibleDeg3 = pct3 * percentToDegree - gapDeg

  // 6) Convert “visible degrees” into actual stroke lengths in px:
  //    (visibleDeg / 360) × circumference = px of arc
  const visiblePx1 = Math.max((visibleDeg1 / 360) * circumference, 0)
  const visiblePx2 = Math.max((visibleDeg2 / 360) * circumference, 0)
  const visiblePx3 = Math.max((visibleDeg3 / 360) * circumference, 0)

  // 7) Compute the starting angle for each arc so that:
  //    – We begin at 180° + (gapDeg/2).  (That places the first arc just above 9 o’clock.)
  //    – Then, after drawing visibleDeg1°, we add a full gapDeg to get startAngle2.
  //    – After drawing visibleDeg2°, add another gapDeg to get startAngle3.
  //
  //    Finally, after drawing visibleDeg3°, there is a final half‐gap that exactly hits 360° (i.e. 3 o’clock).
  const startAngle1 = 180 + gapDeg / 2
  const startAngle2 = startAngle1 + visibleDeg1 + gapDeg
  const startAngle3 = startAngle2 + visibleDeg2 + gapDeg
  // 8) Build a reusable circle‐style object (rounded ends, transitions, etc.)
  const circleStyles: CSSProperties = {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeDashoffset: 0,
    strokeWidth: strokeWidth,
    transition: `all ${transition.length}ms ease ${transition.delay}ms`,
    transformOrigin: '50% 50%',
    shapeRendering: 'geometricPrecision',
    cursor: 'pointer',
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${circleSize} ${circleSize}`}
      width={size}
      height={size}
      fill="none"
      style={{ userSelect: 'none' }}
      className={cn('', typeof className === 'string' ? className : className?.svgClassName)}
      {...props}
    >
      {/** ── FIRST ARC ── **/}
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        style={{
          ...circleStyles,
          // Draw exactly visiblePx1 of the circumference, then leave the rest blank
          strokeDasharray: `${visiblePx1} ${circumference}`,
          // Rotate so that it starts at 180° + half-gap
          transform: `rotate(${startAngle1}deg)`,
          stroke: color1,
        }}
        className={cn('', typeof className === 'object' && className.firstClassName)}
        onClick={onArc1Click}
      />

      {/** ── SECOND ARC ── **/}
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        style={{
          ...circleStyles,
          strokeDasharray: `${visiblePx2} ${circumference}`,
          transform: `rotate(${startAngle2}deg)`,
          stroke: color2,
        }}
        className={cn('', typeof className === 'object' && className.secondClassName)}
        onClick={onArc2Click}
      />

      {/** ── THIRD ARC ── **/}
      <circle
        cx={circleSize / 2}
        cy={circleSize / 2}
        r={radius}
        style={{
          ...circleStyles,
          strokeDasharray: `${visiblePx3} ${circumference}`,
          transform: `rotate(${startAngle3}deg)`,
          stroke: color3,
        }}
        className={cn('', typeof className === 'object' && className.thirdClassName)}
        onClick={onArc3Click}
      />
    </svg>
  )
}

export { HalfGauge }
