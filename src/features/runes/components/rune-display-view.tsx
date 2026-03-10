import { useRuneDisplayView } from '../hooks/use-rune-display-view'
import { RuneGeneratorPanel } from './rune-generator-panel'
import { RuneSidebarPanels } from './rune-sidebar-panels'
import { type RuneEntry, type RuneStrokes, type RuneValueInputHandler, type RuneValueInputProps } from '../types'

interface RuneDisplayViewProps {
  value: string
  valueInputProps: RuneValueInputProps
  onValueInput: RuneValueInputHandler
  strokes: RuneStrokes | null
  runeEntries: RuneEntry[]
  error?: string
}

export const RuneDisplayView = ({
  value,
  valueInputProps,
  onValueInput,
  error,
  strokes,
  runeEntries,
}: RuneDisplayViewProps) => {
  const { svgRef, isDownloading, isDownloadDisabled, onDownloadClick } = useRuneDisplayView({ value, error })

  return (
    <div className="min-h-screen p-4 panel:p-6">
      <section className="mx-auto mb-4 w-full max-w-5xl rounded-xl border border-slate-200 bg-white p-4 text-center shadow-sm panel:mb-6">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">Cistercian Rune Display</h1>
        <p className="mx-auto mt-2 max-w-[600px] text-center text-xs leading-relaxed text-slate-600">
          Type any natural number from <code>1</code> to <code>9999</code>. The app builds one Cistercian rune by placing
          digits into units, tens, hundreds, and thousands quadrants around a single central stave.
        </p>
      </section>

      <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 panel:grid-cols-[minmax(0,1fr)_minmax(0,550px)] panel:items-start panel:gap-5">
        <RuneGeneratorPanel
          value={value}
          valueInputProps={valueInputProps}
          onValueInput={onValueInput}
          error={error}
          strokes={strokes}
          svgRef={svgRef}
          isDownloadDisabled={isDownloadDisabled}
          isDownloading={isDownloading}
          onDownloadClick={onDownloadClick}
        />

        <RuneSidebarPanels runeEntries={runeEntries} />
      </div>
    </div>
  )
}
