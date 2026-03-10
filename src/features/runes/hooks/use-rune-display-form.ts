import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { REFERENCE_COMPONENTS, getRuneStrokesForNumber } from '../utils'
import { type RuneEntry, type RuneStrokes, type RuneValueInputHandler, type RuneValueInputProps } from '../types'

const runeFormSchema = z.object({
  value: z
    .string()
    .regex(/^\d*$|^$/, 'Only digits are allowed.')
    .transform((value) => {
      if (value === '') {
        return undefined
      }

      return Number.parseInt(value, 10)
    })
    .pipe(z.number().int().min(1, 'Value must be between 1 and 9999.').max(9999, 'Value must be between 1 and 9999.').optional()),
})

type RuneFormValues = z.input<typeof runeFormSchema>
type RuneFormOutput = z.output<typeof runeFormSchema>

export interface UseRuneDisplayFormResult {
  value: string
  valueInputProps: RuneValueInputProps
  onValueInput: RuneValueInputHandler
  strokes: RuneStrokes | null
  runeEntries: RuneEntry[]
  error?: string
}

export const useRuneDisplayForm = (): UseRuneDisplayFormResult => {
  const {
    register,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<RuneFormValues, unknown, RuneFormOutput>({
    mode: 'onChange',
    resolver: zodResolver(runeFormSchema),
    defaultValues: {
      value: '',
    },
  })

  const value = watch('value') ?? ''
  const [hasInvalidNumberInput, setHasInvalidNumberInput] = useState(false)

  const valueInputProps = register('value', {
    onChange: (event) => {
      const input = event.target as HTMLInputElement
      setHasInvalidNumberInput(input.validity.badInput)

      if (input.validity.badInput) {
        return
      }

      if (input.value === '') {
        clearErrors('value')
        return
      }
    },
  })

  const onValueInput: RuneValueInputHandler = (input) => {
    setHasInvalidNumberInput(input.validity.badInput)
  }

  const runeEntries = useMemo(
    () =>
      REFERENCE_COMPONENTS.map((entryValue) => ({
        value: entryValue,
        strokes: getRuneStrokesForNumber(entryValue),
      })),
    [],
  )

  const numericValue = useMemo(() => {
    const parsed = runeFormSchema.safeParse({ value })
    if (!parsed.success) {
      return null
    }

    return parsed.data.value ?? null
  }, [value])

  const strokes = useMemo(() => {
    if (numericValue === null) {
      return null
    }

    const merged = getRuneStrokesForNumber(numericValue)
    return merged.length > 0 ? merged : null
  }, [numericValue])

  const error = hasInvalidNumberInput ? 'Only digits are allowed.' : value === '' ? undefined : errors.value?.message

  return {
    value,
    valueInputProps,
    onValueInput,
    error,
    strokes,
    runeEntries,
  }
}
