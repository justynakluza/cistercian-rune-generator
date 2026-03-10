import { useRef } from 'react'
import { cn } from '../../../shared/utils/class-names'
import { type RuneStrokes, type RuneValueInputHandler, type RuneValueInputProps } from '../types'
import { DownloadRuneButton } from './download-rune-button'
import { RuneSvg } from './rune-svg'

const RUNE_MIN_VALUE = 1
const RUNE_MAX_VALUE = 9999

interface RuneGeneratorPanelProps {
  numericValue: number | null
  valueInputProps: RuneValueInputProps
  onValueInput: RuneValueInputHandler
  strokes: RuneStrokes | null
  error?: string
}

export const RuneGeneratorPanel = ({
  numericValue,
  valueInputProps,
  onValueInput,
  error,
  strokes,
}: RuneGeneratorPanelProps) => {
  const svgRef = useRef<SVGSVGElement>(null)

  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white p-5 shadow-sm panel:flex panel:justify-center panel:h-[640px]">
      <div className="mx-auto w-full max-w-lg panel:flex panel:h-full panel:flex-col">
        <div className="space-y-1">
          <label htmlFor="rune-value" className="block text-sm font-medium text-slate-700">
            Number to convert ({RUNE_MIN_VALUE}-{RUNE_MAX_VALUE})
          </label>
          <input
            id="rune-value"
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            step={1}
            min={RUNE_MIN_VALUE}
            max={RUNE_MAX_VALUE}
            placeholder="e.g. 7, 40, 500, 9000"
            aria-invalid={Boolean(error)}
            aria-describedby="rune-value-message"
            {...valueInputProps}
            onInput={(event) => onValueInput(event.currentTarget)}
            className={cn(
              'w-full rounded-md border px-3 py-2 text-sm outline-none transition focus:ring-2',
              error ? 'border-red-400 focus:ring-red-200' : 'border-slate-300 focus:ring-sky-200',
            )}
          />
          <p id="rune-value-message" className="min-h-4 text-xs text-red-600">
            {error ?? ''}
          </p>
        </div>

        <div className="mt-2 rounded-lg border border-slate-200 bg-slate-50 p-4 panel:flex-1">
          <div className="mx-auto flex h-full min-h-[360px] w-[240px] items-center justify-center">
            {strokes ? (
              <RuneSvg ref={svgRef} strokes={strokes} width={240} height={360} />
            ) : (
              <p className="text-center text-sm text-slate-600">Enter a number to see its Cistercian rune.</p>
            )}
          </div>
        </div>

        <div className="mt-3 flex justify-start">
          <DownloadRuneButton svgRef={svgRef} numericValue={numericValue} />
        </div>
      </div>
    </section>
  )
}