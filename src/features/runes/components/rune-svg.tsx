import { type Ref } from 'react'
import { type RuneStrokes } from '../types'

interface RuneSvgProps {
  strokes: RuneStrokes
  width: number
  height: number
  ref?: Ref<SVGSVGElement>
  className?: string
}

export const RuneSvg = ({ strokes, width, height, ref, className }: RuneSvgProps) => {
  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 60 90"
      width={width}
      height={height}
      className={className}
    >
      {strokes.map((points) => (
        <polyline
          key={points}
          points={points}
          fill="none"
          stroke="#1f2937"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  )
}
