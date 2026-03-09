import { cn } from '../lib/utils.ts'
import { useNumericForm } from '../hooks/useNumericForm.ts'

export const NumericFormView = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    submitted,
    onSubmit,
    onNumericChange,
  } = useNumericForm()

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-14 text-slate-900">
      <section className="mx-auto w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
          Starter Setup
        </p>
        <h1 className="mt-2 text-2xl font-bold">React + Tailwind + RHF + Zod</h1>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Number</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="12345"
              className={cn(
                'w-full rounded-lg border px-3 py-2 text-sm outline-none transition',
                'focus:ring-2 focus:ring-cyan-200',
                errors.value
                  ? 'border-red-400 bg-red-50 focus:border-red-400'
                  : 'border-slate-300 focus:border-cyan-500',
              )}
              {...register('value')}
              onChange={onNumericChange}
            />
            {errors.value ? (
              <p className="mt-1 text-xs text-red-600">{errors.value.message}</p>
            ) : null}
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              'w-full rounded-lg px-4 py-2 text-sm font-semibold text-white transition',
              isSubmitting
                ? 'cursor-not-allowed bg-slate-400'
                : 'bg-cyan-700 hover:bg-cyan-800',
            )}
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>

        {submitted ? (
          <p className="mt-4 text-sm text-green-700">Saved value: {submitted}</p>
        ) : null}
      </section>
    </main>
  )
}
