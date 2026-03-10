import { type UseFormRegisterReturn } from 'react-hook-form'

export type RuneStrokes = string[]

export interface RuneEntry {
  value: number
  strokes: RuneStrokes
}

export type RuneValueInputProps = UseFormRegisterReturn<'value'>

export type RuneValueInputHandler = (input: HTMLInputElement) => void