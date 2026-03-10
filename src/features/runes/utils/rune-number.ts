import { type RuneEntry, type RuneStrokes } from '../types'

const RUNE_COMPONENT_VALUES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 20, 30, 40, 50, 60, 70, 80, 90,
  100, 200, 300, 400, 500, 600, 700, 800, 900,
  1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
] as const

export type RuneComponent = (typeof RUNE_COMPONENT_VALUES)[number]

const RUNE_COMPONENT_SET = new Set<RuneComponent>(RUNE_COMPONENT_VALUES)

export const REFERENCE_COMPONENTS: RuneComponent[] = Array.from(RUNE_COMPONENT_VALUES)

const isRuneComponent = (value: number): value is RuneComponent => {
  return RUNE_COMPONENT_SET.has(value as RuneComponent)
}

type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type Place = 'units' | 'tens' | 'hundreds' | 'thousands'
type Point = { x: number; y: number }

const X_BASE = 30
const X_RIGHT = 45
const X_RIGHT_INNER = 40
const Y_TOP = 10
const Y_THIRD = 33
const Y_MID = 45
const Y_BOTTOM = 80

const toStroke = (points: Point[]): string => points.map((point) => `${point.x},${point.y}`).join(' ')

const mirrorX = (point: Point): Point => ({ x: 2 * X_BASE - point.x, y: point.y })
const mirrorY = (point: Point): Point => ({ x: point.x, y: 2 * Y_MID - point.y })

const transformPointForPlace = (point: Point, place: Place): Point => {
  if (place === 'units') {
    return point
  }

  if (place === 'tens') {
    return mirrorX(point)
  }

  if (place === 'hundreds') {
    return mirrorY(point)
  }

  return mirrorY(mirrorX(point))
}

const BASE_UNIT_DIGIT_STROKES: Record<Digit, Point[][]> = {
  1: [[{ x: X_BASE, y: Y_TOP }, { x: X_RIGHT, y: Y_TOP }]],
  2: [[{ x: X_BASE, y: Y_THIRD }, { x: X_RIGHT, y: Y_THIRD }]],
  3: [[{ x: X_BASE, y: Y_TOP }, { x: X_RIGHT, y: Y_THIRD }]],
  4: [[{ x: X_BASE, y: Y_THIRD }, { x: X_RIGHT, y: Y_TOP }]],
  5: [
    [{ x: X_BASE, y: Y_TOP }, { x: X_RIGHT, y: Y_TOP }],
    [{ x: X_RIGHT, y: Y_TOP }, { x: X_BASE, y: Y_THIRD }],
  ],
  6: [[{ x: X_RIGHT_INNER, y: Y_TOP }, { x: X_RIGHT_INNER, y: Y_THIRD }]],
  7: [
    [{ x: X_BASE, y: Y_TOP }, { x: X_RIGHT, y: Y_TOP }],
    [{ x: X_RIGHT, y: Y_TOP }, { x: X_RIGHT, y: Y_THIRD }],
  ],
  8: [
    [{ x: X_BASE, y: Y_THIRD }, { x: X_RIGHT, y: Y_THIRD }],
    [{ x: X_RIGHT, y: Y_TOP }, { x: X_RIGHT, y: Y_THIRD }],
  ],
  9: [
    [{ x: X_BASE, y: Y_TOP }, { x: X_RIGHT, y: Y_TOP }],
    [{ x: X_BASE, y: Y_THIRD }, { x: X_RIGHT, y: Y_THIRD }],
    [{ x: X_RIGHT, y: Y_TOP }, { x: X_RIGHT, y: Y_THIRD }],
  ],
}

const componentToDigitAndPlace = (component: RuneComponent): { digit: Digit; place: Place } => {
  if (component < 10) {
    return { digit: component as Digit, place: 'units' }
  }

  if (component < 100) {
    return { digit: (component / 10) as Digit, place: 'tens' }
  }

  if (component < 1000) {
    return { digit: (component / 100) as Digit, place: 'hundreds' }
  }

  return { digit: (component / 1000) as Digit, place: 'thousands' }
}

const getComponentStrokes = (component: RuneComponent): RuneStrokes => {
  const { digit, place } = componentToDigitAndPlace(component)
  const baseStrokes = BASE_UNIT_DIGIT_STROKES[digit]

  return baseStrokes.map((strokePoints) =>
    toStroke(strokePoints.map((point) => transformPointForPlace(point, place))),
  )
}

export const decomposeNumber = (n: number): RuneComponent[] => {
  if (!Number.isInteger(n) || n < 1 || n > 9999) {
    return []
  }

  const thousands = Math.trunc(n / 1000) * 1000
  const hundreds = Math.trunc((n % 1000) / 100) * 100
  const tens = Math.trunc((n % 100) / 10) * 10
  const ones = n % 10

  return [thousands, hundreds, tens, ones].filter(isRuneComponent)
}

export const getRuneStrokesForNumber = (n: number): RuneStrokes => {
  const runeComponents = decomposeNumber(n)
  if (runeComponents.length === 0) {
    return []
  }

  const baseStroke = toStroke([
    { x: X_BASE, y: Y_TOP },
    { x: X_BASE, y: Y_BOTTOM },
  ])

  const componentStrokes = runeComponents.flatMap((component) => getComponentStrokes(component))

  return [baseStroke, ...componentStrokes]
}

export const RUNE_ENTRIES: RuneEntry[] = REFERENCE_COMPONENTS.map((entryValue) => ({
  value: entryValue,
  strokes: getRuneStrokesForNumber(entryValue),
}))
