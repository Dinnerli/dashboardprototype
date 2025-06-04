// Gauge.tsx

import { cn } from '@/lib/utils'
import type { CSSProperties, SVGProps } from 'react'

export interface GaugeProps extends Omit<SVGProps<SVGSVGElement>, 'className'> {
  /**
   * Three raw values (e.g. 65, 20, 10). Internally they are normalized
   * so that value1+value2+value3 = 100%. Then we draw three arcs with
   * exactly one “gap” of gapPercent between each.
   */
  value1: number
  value2: number
  value3: number

  /** Overall width/height of the SVG. */
  size?: number | string

  /**
   * Gap size, in percent‐of‐circle, between each pair of arcs.
   * e.g. gapPercent = 5 → 5% of the circumference is left blank
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
}

/**
 * A three‐segment “donut” gauge. Each of the three arcs gets exactly one
 * gap of size `gapPercent%` between it and the next arc. Rounded ends are preserved.
 */
function Gauge({
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
  ...props
}: GaugeProps) {
  // 1) Normalize the three raw values so that they sum to exactly 100%.
  const total = value1 + value2 + value3 || 1
  const pct1 = (value1 / total) * 100
  const pct2 = (value2 / total) * 100
  const pct3 = (value3 / total) * 100

  // 2) We will draw everything inside a 100×100 viewBox for simplicity.
  const circleSize = 100
  const radius = circleSize / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius

  // “Percent → degrees” and “percent → pixels on the circle”
  const percentToDegree = 360 / 100 // 1% = 3.6°
  const percentToPx = circumference / 100 // 1% = circumference/100 px

  // 3) Compute how many degrees (and px) each gap occupies:
  const gapDeg = gapPercent * percentToDegree // e.g. 5% → 5×3.6 = 18°
  const gapPx = gapPercent * percentToPx

  // 4) Compute how many degrees each visible arc should occupy:
  //    (We subtract one full gapDeg from each segment so that the three
  //     arcs + the three gaps together exactly fill 360°.)
  const visibleDeg1 = pct1 * percentToDegree - gapDeg
  const visibleDeg2 = pct2 * percentToDegree - gapDeg
  const visibleDeg3 = pct3 * percentToDegree - gapDeg

  // 5) Convert “visible degrees” into actual stroke lengths in px:
  //    Because (visibleDeg / 360) × circumference = (pct - gapPercent) × percentToPx.
  const visiblePx1 = Math.max((pct1 - gapPercent) * percentToPx, 0)
  const visiblePx2 = Math.max((pct2 - gapPercent) * percentToPx, 0)
  const visiblePx3 = Math.max((pct3 - gapPercent) * percentToPx, 0)

  // 6) Compute the starting angle for each arc so that:
  //    – The first arc begins at:   −90° − (gapDeg/2).  (That leaves a half-gap before and half after,
  //      once you draw visibleDeg1, so that the gap is evenly split.)
  //    – Then, after drawing arc 1, you insert a full gapDeg. → start2 = start1 + visibleDeg1 + gapDeg
  //    – Then, after drawing arc 2, you insert another gapDeg. → start3 = start2 + visibleDeg2 + gapDeg
  //
  //    Finally, after drawing arc 3 (visibleDeg3), the leftover ½-gap to close the circle is implicit,
  //    because visibleDeg1+visibleDeg2+visibleDeg3 + 3×gapDeg = 360° exactly.
  const startAngle1 = -90 - gapDeg / 2
  const startAngle2 = startAngle1 + visibleDeg1 + gapDeg
  const startAngle3 = startAngle2 + visibleDeg2 + gapDeg

  // 7) Build a reusable circle style object (rounded ends, transitions, etc.)
  const circleStyles: CSSProperties = {
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeDashoffset: 0,
    strokeWidth: strokeWidth,
    transition: `all ${transition.length}ms ease ${transition.delay}ms`,
    transformOrigin: '50% 50%',
    shapeRendering: 'geometricPrecision',
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
          transform: `rotate(${startAngle1}deg)`,
          stroke: color1,
        }}
        className={cn('', typeof className === 'object' && className.firstClassName)}
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
      />
    </svg>
  )
}

export { Gauge }
