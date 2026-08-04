import { useEffect, useRef, useState } from "react"
import sunflowerSourceUrl from "@/assets/cofounder-white-sky.avif"

type Cell = {
  x: number
  y: number
  char: string
  color: string
  opacity: number
}

const ASCII_CHARS = ".,:;+*xX$&"
type AsciiConfig = {
  cellStep: number
  fontScale: number
  flickerInterval: number
}

const DEFAULT_CONFIG: AsciiConfig = {
  cellStep: 4,
  fontScale: 1.8,
  flickerInterval: 30,
}

const controlDefinitions = [
  { key: "fontScale", en: "Character size", zh: "字符大小", min: 0.75, max: 1.8, step: 0.05 },
  { key: "cellStep", en: "Grid spacing", zh: "网格间距", min: 4, max: 10, step: 1 },
  { key: "flickerInterval", en: "Flicker speed", zh: "闪烁间隔", min: 30, max: 240, step: 5 },
] as const

export function HomepageAsciiBackground({ label, language }: { label: string; language: "en" | "zh" }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [config, setConfig] = useState(DEFAULT_CONFIG)
  const configRef = useRef(DEFAULT_CONFIG)

  const updateConfig = (key: keyof AsciiConfig, value: number) => {
    setConfig((current) => {
      const next = { ...current, [key]: value }
      configRef.current = next
      return next
    })
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const source = new Image()
    source.src = sunflowerSourceUrl
    let cells: Cell[] = []
    let frameId = 0
    let lastFlicker = 0
    let cellFontSize = 6
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const randomChar = () => ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)]

    const sampleImage = () => {
      if (!source.naturalWidth || !source.naturalHeight) return

      const bounds = canvas.getBoundingClientRect()
      const width = Math.max(1, Math.round(bounds.width))
      const height = Math.max(1, Math.round(bounds.height))
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const step = width < 390 ? Math.max(4, configRef.current.cellStep - 1) : configRef.current.cellStep
      cellFontSize = step * configRef.current.fontScale
      const columns = Math.max(1, Math.floor(width / step))
      const rows = Math.max(1, Math.floor(height / step))
      const sampler = document.createElement("canvas")
      sampler.width = columns
      sampler.height = rows
      const samplerContext = sampler.getContext("2d", { willReadFrequently: true })
      if (!samplerContext) return

      const scale = Math.max(columns / source.naturalWidth, rows / source.naturalHeight)
      const drawWidth = source.naturalWidth * scale
      const drawHeight = source.naturalHeight * scale
      const drawX = (columns - drawWidth) / 2
      const drawY = (rows - drawHeight) / 2
      samplerContext.clearRect(0, 0, columns, rows)
      samplerContext.drawImage(source, drawX, drawY, drawWidth, drawHeight)
      const pixels = samplerContext.getImageData(0, 0, columns, rows).data
      const nextCells: Cell[] = []

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const index = (row * columns + column) * 4
          const red = pixels[index]
          const green = pixels[index + 1]
          const blue = pixels[index + 2]
          const alpha = pixels[index + 3]
          if (alpha < 16) continue

          const brightness = red * 0.299 + green * 0.587 + blue * 0.114
          const saturation = Math.max(red, green, blue) - Math.min(red, green, blue)
          const signal = Math.max(255 - brightness, saturation * 0.92)
          if (signal < 16) continue

          nextCells.push({
            x: (column + 0.5) * step,
            y: (row + 0.5) * step,
            char: randomChar(),
            color: `${red}, ${green}, ${blue}`,
            opacity: Math.min(1, 0.58 + signal / 190),
          })
        }
      }

      cells = nextCells
      lastFlicker = 0
    }

    const render = (time: number) => {
      const bounds = canvas.getBoundingClientRect()
      const shouldDraw = lastFlicker === 0 || (!reduceMotion && time - lastFlicker >= configRef.current.flickerInterval)
      if (shouldDraw) {
        context.clearRect(0, 0, bounds.width, bounds.height)
        cellFontSize = (bounds.width < 390 ? Math.max(4, configRef.current.cellStep - 1) : configRef.current.cellStep) * configRef.current.fontScale
        context.font = `500 ${cellFontSize}px "MAIR Jost Emphasis", ui-monospace, monospace`
        context.textAlign = "center"
        context.textBaseline = "middle"

        for (const cell of cells) {
          if (lastFlicker !== 0 && Math.random() < 0.34) cell.char = randomChar()
          context.fillStyle = `rgba(${cell.color}, ${cell.opacity})`
          context.fillText(cell.char, cell.x, cell.y)
        }
        lastFlicker = time
      }

      frameId = window.requestAnimationFrame(render)
    }

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const resizeObserver = new ResizeObserver(sampleImage)
    resizeObserver.observe(canvas)
    motionPreference.addEventListener("change", handleMotionPreference)
    source.addEventListener("load", sampleImage)
    if (source.complete) sampleImage()
    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      motionPreference.removeEventListener("change", handleMotionPreference)
      source.removeEventListener("load", sampleImage)
    }
  }, [config.cellStep])

  return (
    <div className="homepage-ascii-background">
      <canvas ref={canvasRef} className="homepage-ascii-canvas" role="img" aria-label={label} />
      <details className="ascii-controls" open hidden>
        <summary>{language === "zh" ? "ASCII 参数（临时）" : "ASCII controls (temporary)"}</summary>
        <div className="ascii-control-list">
          {controlDefinitions.map((control) => (
            <label key={control.key} className="ascii-control">
              <span>{language === "zh" ? control.zh : control.en}</span>
              <output>{config[control.key].toFixed(control.step < 0.01 ? 3 : control.step < 1 ? 2 : 0)}</output>
              <input
                type="range"
                min={control.min}
                max={control.max}
                step={control.step}
                value={config[control.key]}
                onChange={(event) => updateConfig(control.key, Number(event.target.value))}
              />
            </label>
          ))}
          <button type="button" onClick={() => {
            configRef.current = DEFAULT_CONFIG
            setConfig(DEFAULT_CONFIG)
          }}>
            {language === "zh" ? "恢复默认" : "Reset"}
          </button>
        </div>
      </details>
    </div>
  )
}
