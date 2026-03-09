import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const numericFormSchema = z.object({
  value: z
    .string()
    .min(1, 'This field is required.')
    .regex(/^\d+$/, 'Only numbers are allowed.'),
})

type NumericFormValues = z.infer<typeof numericFormSchema>

export const useNumericForm = () => {
  const [submitted, setSubmitted] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NumericFormValues>({
    defaultValues: {
      value: '',
    },
  })

  const onSubmit = async (values: NumericFormValues) => {
    const parsed = numericFormSchema.safeParse(values)

    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const field = issue.path[0]
        if (field === 'value') {
          setError(field, { type: 'zod', message: issue.message })
        }
      }
      return
    }

    setSubmitted(parsed.data.value)
  }

  const onNumericChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    target.value = target.value.replace(/\D/g, '')
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitted,
    onSubmit,
    onNumericChange,
  }
}
