import runeReferenceImage from '../../../assets/runes-reference.png'
import { ChevronDownIcon } from '../../../shared/ui'
import { RUNE_ENTRIES } from '../utils'

export const RuneSidebarPanels = () => {
  return (
    <div className="flex flex-col gap-5">
      <section className="w-full rounded-xl border border-slate-200 bg-white p-4 shadow-sm h-fit">
        <p className="mb-2 text-left text-sm font-medium text-slate-700">Examples</p>
        <div className="mx-auto w-full max-w-[540px]">
          <img
            src={runeReferenceImage}
            alt="Rune reference chart"
            className="h-auto w-full rounded-sm"
            loading="lazy"
          />
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <details className="group panel:open:h-[370px]">
          <summary className="flex list-none cursor-pointer items-center justify-between text-sm font-medium text-slate-700 [&::-webkit-details-marker]:hidden">
            <span>Reference Components</span>
            <ChevronDownIcon className="group-open:rotate-180" />
          </summary>
          <div className="mt-3 grid grid-cols-9 gap-1.5">
            {RUNE_ENTRIES.map((entry) => (
              <div key={entry.value} className="rounded border border-slate-200 bg-white p-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 90" width="36" height="54" className="mx-auto">
                  {entry.strokes.map((points: string, index: number) => (
                    <polyline
                      key={`${entry.value}-${index}`}
                      points={points}
                      fill="none"
                      stroke="#1f2937"
                      strokeWidth={4}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ))}
                </svg>
                <p className="mt-0.5 text-center text-[10px] leading-none text-slate-600">{entry.value}</p>
              </div>
            ))}
          </div>
        </details>
      </section>
    </div>
  )
}