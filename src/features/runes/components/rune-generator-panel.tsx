import { type RefObject } from 'react'
import { cn } from '../../../shared/utils/class-names'
import { type RuneStrokes, type RuneValueInputHandler, type RuneValueInputProps } from '../types'

const RUNE_MIN_VALUE = 1
const RUNE_MAX_VALUE = 9999

interface RuneGeneratorPanelProps {
  value: string
  valueInputProps: RuneValueInputProps
  onValueInput: RuneValueInputHandler
  strokes: RuneStrokes | null
  svgRef: RefObject<SVGSVGElement | null>
  isDownloadDisabled: boolean
  isDownloading: boolean
  onDownloadClick: () => Promise<void>
  error?: string
}

export const RuneGeneratorPanel = ({
  value,
  valueInputProps,
  onValueInput,
  error,
  strokes,
  svgRef,
  isDownloadDisabled,
  isDownloading,
  onDownloadClick,
}: RuneGeneratorPanelProps) => {
  const isDisabled = isDownloadDisabled || isDownloading

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
            value={value}
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
              <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 90" width="240" height="360">
                {strokes.map((points: string) => (
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
            ) : (
              <p className="text-center text-sm text-slate-600">Enter a number to see its Cistercian rune.</p>
            )}
          </div>
        </div>

        <div className="mt-3 flex justify-start">
          <button
            type="button"
            disabled={isDisabled}
            onClick={onDownloadClick}
            className={cn(
              'inline-flex items-center justify-center rounded-md border px-3.5 py-2 text-sm font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-700',
              isDisabled
                ? 'cursor-not-allowed border-zinc-800 bg-zinc-800 text-zinc-400'
                : 'border-neutral-950 bg-neutral-950 text-neutral-100 hover:border-black hover:bg-black hover:opacity-90',
            )}
          >
            {isDownloading ? 'Downloading...' : 'Download SVG'}
          </button>
        </div>
      </div>
    </section>
  )
}