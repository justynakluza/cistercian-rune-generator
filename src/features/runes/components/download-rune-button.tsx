import { type RefObject } from 'react'
import { cn } from '../../../shared/utils/class-names'
import { useDownloadRune } from '../hooks/use-download-rune'

interface DownloadRuneButtonProps {
  svgRef: RefObject<SVGSVGElement | null>
  numericValue: number | null
}

export const DownloadRuneButton = ({ svgRef, numericValue }: DownloadRuneButtonProps) => {
  const { isDownloading, isDownloadDisabled, onDownloadClick } = useDownloadRune({ svgRef, numericValue })
  const isDisabled = isDownloadDisabled || isDownloading

  return (
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
  )
}
