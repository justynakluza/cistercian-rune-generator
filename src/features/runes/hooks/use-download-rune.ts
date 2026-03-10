import { type RefObject, useState } from 'react'
import { downloadSvg } from '../utils'

// Minimum duration the loading indicator is shown to prevent a visual flash
const MINIMUM_LOADING_DURATION_MS = 220

interface UseDownloadRuneParams {
  svgRef: RefObject<SVGSVGElement | null>
  numericValue: number | null
}

interface UseDownloadRuneResult {
  isDownloading: boolean
  isDownloadDisabled: boolean
  onDownloadClick: () => Promise<void>
}

export const useDownloadRune = ({ svgRef, numericValue }: UseDownloadRuneParams): UseDownloadRuneResult => {
  const [isDownloading, setIsDownloading] = useState(false)
  const isDownloadDisabled = numericValue === null

  const onDownloadClick = async () => {
    if (isDownloadDisabled || numericValue === null) {
      return
    }

    setIsDownloading(true)

    try {
      await new Promise<void>((resolve) => {
        setTimeout(resolve, MINIMUM_LOADING_DURATION_MS)
      })

      downloadSvg(svgRef, numericValue)
    } finally {
      setIsDownloading(false)
    }
  }

  return {
    isDownloading,
    isDownloadDisabled,
    onDownloadClick,
  }
}
