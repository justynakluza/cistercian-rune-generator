import { type RefObject } from 'react'

export const downloadSvg = (svgRef: RefObject<SVGSVGElement | null>, value: number): void => {
  const svgElement = svgRef.current
  if (!svgElement || !Number.isInteger(value) || value < 1 || value > 9999) {
    return
  }

  const svgString = new XMLSerializer().serializeToString(svgElement)
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = `rune-${value}.svg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)

  URL.revokeObjectURL(url)
}
