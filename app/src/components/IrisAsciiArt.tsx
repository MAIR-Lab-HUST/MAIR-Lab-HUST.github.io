import { useEffect, useRef } from "react"
import irisSourceUrl from "@/assets/iris-ascii-source.png"

type Cell = {
  x: number
  y: number
  offsetX: number
  offsetY: number
  vx: number
  vy: number
  char: string
  color: string
  opacity: number
}

const ASCII_CHARS = ".,:;+*xX$&"
const PUSH_RADIUS = 104
const PUSH_FORCE = 0.78
const SPRING = 0.022
const DAMPING = 0.94

export function IrisAsciiArt({ label }: { label: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const source = new Image()
    source.src = irisSourceUrl
    let cells: Cell[] = []
    let frameId = 0
    let lastFlicker = 0
    let cellFontSize = 6
    let reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mouse = { x: 0, y: 0, lastMove: 0, inside: false }

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

      const step = width < 390 ? 5 : 6
      cellFontSize = step * 0.96
      const columns = Math.max(1, Math.floor(width / step))
      const rows = Math.max(1, Math.floor(height / step))
      const sampler = document.createElement("canvas")
      sampler.width = columns
      sampler.height = rows
      const samplerContext = sampler.getContext("2d", { willReadFrequently: true })
      if (!samplerContext) return

      const sampleWidth = Math.max(1, columns - 4)
      const sampleHeight = Math.max(1, rows - 4)
      const scale = Math.max(sampleWidth / source.naturalWidth, sampleHeight / source.naturalHeight)
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
            offsetX: 0,
            offsetY: 0,
            vx: 0,
            vy: 0,
            char: randomChar(),
            color: `${red}, ${green}, ${blue}`,
            opacity: Math.min(1, 0.58 + signal / 190),
          })
        }
      }

      cells = nextCells
    }

    const render = (time: number) => {
      const bounds = canvas.getBoundingClientRect()
      context.clearRect(0, 0, bounds.width, bounds.height)
      context.font = `500 ${cellFontSize}px "MAIR Jost Emphasis", ui-monospace, monospace`
      context.textAlign = "center"
      context.textBaseline = "middle"

      const mouseIsMoving = mouse.inside && time - mouse.lastMove < 160 && !reduceMotion
      if (!reduceMotion && time - lastFlicker > 72) {
        for (const cell of cells) {
          if (Math.random() < 0.34) cell.char = randomChar()
        }
        lastFlicker = time
      }

      for (const cell of cells) {
        const currentX = cell.x + cell.offsetX
        const currentY = cell.y + cell.offsetY
        const dx = currentX - mouse.x
        const dy = currentY - mouse.y
        const distance = Math.hypot(dx, dy) || 0.001

        if (mouseIsMoving && distance < PUSH_RADIUS) {
          const proximity = (PUSH_RADIUS - distance) / PUSH_RADIUS
          const force = Math.sin(proximity * Math.PI * 0.5)
          cell.vx += (dx / distance) * force * PUSH_FORCE
          cell.vy += (dy / distance) * force * PUSH_FORCE
        }

        cell.vx = (cell.vx - cell.offsetX * SPRING) * DAMPING
        cell.vy = (cell.vy - cell.offsetY * SPRING) * DAMPING
        cell.offsetX += cell.vx
        cell.offsetY += cell.vy

        if (Math.abs(cell.vx) + Math.abs(cell.vy) < 0.008 && Math.abs(cell.offsetX) + Math.abs(cell.offsetY) < 0.08) {
          cell.vx = 0
          cell.vy = 0
          cell.offsetX = 0
          cell.offsetY = 0
        }

        context.fillStyle = `rgba(${cell.color}, ${cell.opacity})`
        context.fillText(cell.char, cell.x + cell.offsetX, cell.y + cell.offsetY)
      }

      frameId = window.requestAnimationFrame(render)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect()
      mouse.x = event.clientX - bounds.left
      mouse.y = event.clientY - bounds.top
      mouse.lastMove = performance.now()
      mouse.inside = true
    }
    const handlePointerLeave = () => {
      mouse.inside = false
    }
    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reduceMotion = event.matches
    }

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const resizeObserver = new ResizeObserver(sampleImage)
    resizeObserver.observe(canvas)
    canvas.addEventListener("pointermove", handlePointerMove)
    canvas.addEventListener("pointerleave", handlePointerLeave)
    motionPreference.addEventListener("change", handleMotionPreference)
    source.addEventListener("load", sampleImage)
    if (source.complete) sampleImage()
    frameId = window.requestAnimationFrame(render)

    return () => {
      window.cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      canvas.removeEventListener("pointermove", handlePointerMove)
      canvas.removeEventListener("pointerleave", handlePointerLeave)
      motionPreference.removeEventListener("change", handleMotionPreference)
      source.removeEventListener("load", sampleImage)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-ascii-canvas" role="img" aria-label={label} />
}
