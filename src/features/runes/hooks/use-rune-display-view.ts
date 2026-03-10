import { type RefObject, useRef, useState } from 'react'
import { downloadSvg } from '../utils'

interface UseRuneDisplayViewParams {
  value: string
  error?: string
}

interface UseRuneDisplayViewResult {
  svgRef: RefObject<SVGSVGElement | null>
  isDownloading: boolean
  isDownloadDisabled: boolean
  onDownloadClick: () => Promise<void>
}

export const useRuneDisplayView = ({ value, error }: UseRuneDisplayViewParams): UseRuneDisplayViewResult => {
  const svgRef = useRef<SVGSVGElement>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const parsedValue = Number.parseInt(value, 10)
  const isParsedValueValid = Number.isInteger(parsedValue) && parsedValue >= 1 && parsedValue <= 9999
  const isDownloadDisabled = value === '' || Boolean(error) || !isParsedValueValid

  const onDownloadClick = async () => {
    if (!isParsedValueValid || isDownloadDisabled) {
      return
    }

    setIsDownloading(true)

    // Allow the UI to paint the loading state before generating and downloading the SVG.
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => {
        resolve()
      })
    })

    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 220)
    })

    downloadSvg(svgRef, parsedValue)
    setIsDownloading(false)
  }

  return {
    svgRef,
    isDownloading,
    isDownloadDisabled,
    onDownloadClick,
  }
}