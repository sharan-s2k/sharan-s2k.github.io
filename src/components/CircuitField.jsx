import { useEffect, useRef } from 'react'

// A circuit-board scene: static glowing right-angle traces with "vias" at each
// turn, animated current pulses that leave a short comet trail as they travel,
// and a couple of chip-like accents with blinking status LEDs.
export default function CircuitField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width, height, dpr
    let traces = []
    let signals = []
    let chips = []
    let raf
    let t = 0

    const SIGNAL = '94, 179, 255'
    const WARM = '255, 180, 84'
    const GRID = 46

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.clientWidth
      height = canvas.clientHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    function snap(v) { return Math.round(v / GRID) * GRID }

    function buildTrace() {
      const cols = Math.max(4, Math.floor(width / GRID))
      const rows = Math.max(4, Math.floor(height / GRID))
      let x = snap(Math.random() * width)
      let y = snap(Math.random() * height)
      const points = [{ x, y }]
      const turns = 3 + Math.floor(Math.random() * 4)
      let horizontal = Math.random() < 0.5
      for (let i = 0; i < turns; i++) {
        const len = (1 + Math.floor(Math.random() * 5)) * GRID
        const dir = Math.random() < 0.5 ? -1 : 1
        if (horizontal) x = Math.min(Math.max(x + dir * len, 0), cols * GRID)
        else y = Math.min(Math.max(y + dir * len, 0), rows * GRID)
        points.push({ x, y })
        horizontal = !horizontal
      }
      // cumulative lengths for interpolation
      let total = 0
      const segLens = []
      for (let i = 1; i < points.length; i++) {
        const d = Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y)
        segLens.push(d)
        total += d
      }
      return {
        points,
        segLens,
        total,
        color: Math.random() < 0.72 ? SIGNAL : WARM,
      }
    }

    function pointAt(trace, progress) {
      const target = trace.total * progress
      let acc = 0
      for (let i = 0; i < trace.segLens.length; i++) {
        const segLen = trace.segLens[i]
        if (acc + segLen >= target || i === trace.segLens.length - 1) {
          const localT = segLen === 0 ? 0 : (target - acc) / segLen
          const a = trace.points[i], b = trace.points[i + 1]
          return { x: a.x + (b.x - a.x) * localT, y: a.y + (b.y - a.y) * localT }
        }
        acc += segLen
      }
      return trace.points[trace.points.length - 1]
    }

    function spawnSignal() {
      const trace = traces[Math.floor(Math.random() * traces.length)]
      signals.push({
        trace,
        progress: 0,
        speed: 0.0022 + Math.random() * 0.0026,
        history: [],
      })
    }

    function init() {
      resize()
      const count = Math.max(10, Math.round((width * height) / 70000))
      traces = Array.from({ length: count }, buildTrace)
      signals = []
      for (let i = 0; i < Math.min(7, traces.length); i++) spawnSignal()

      chips = Array.from({ length: width > 760 ? 3 : 1 }, () => ({
        x: snap(Math.random() * width * 0.8) + GRID,
        y: snap(Math.random() * height * 0.8) + GRID,
        w: GRID * (2 + Math.floor(Math.random() * 2)),
        h: GRID * (1 + Math.floor(Math.random() * 2)),
        phase: Math.random() * Math.PI * 2,
        color: Math.random() < 0.5 ? SIGNAL : WARM,
      }))
    }

    function drawTraces() {
      for (const trace of traces) {
        ctx.strokeStyle = `rgba(${trace.color}, 0.16)`
        ctx.lineWidth = 1.4
        ctx.lineJoin = 'round'
        ctx.beginPath()
        trace.points.forEach((p, i) => (i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)))
        ctx.stroke()
        // vias at each vertex
        for (const p of trace.points) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${trace.color}, 0.28)`
          ctx.fill()
        }
      }
    }

    function drawChips() {
      for (const c of chips) {
        const glow = 0.4 + 0.35 * Math.sin(t * 0.03 + c.phase)
        ctx.strokeStyle = `rgba(${c.color}, 0.35)`
        ctx.lineWidth = 1.2
        ctx.strokeRect(c.x, c.y, c.w, c.h)
        // pins
        ctx.fillStyle = `rgba(${c.color}, 0.3)`
        const pinCount = 4
        for (let i = 1; i <= pinCount; i++) {
          const px = c.x + (c.w / (pinCount + 1)) * i
          ctx.fillRect(px - 1, c.y - 6, 2, 6)
          ctx.fillRect(px - 1, c.y + c.h, 2, 6)
        }
        // status LED
        const lx = c.x + c.w - 10, ly = c.y + 10
        ctx.beginPath()
        ctx.arc(lx, ly, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${c.color}, ${0.5 + glow * 0.5})`
        ctx.shadowColor = `rgba(${c.color}, 0.8)`
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0
      }
    }

    function drawSignals() {
      for (const s of signals) {
        s.progress += s.speed
        const pos = pointAt(s.trace, Math.min(s.progress, 1))
        s.history.push(pos)
        if (s.history.length > 9) s.history.shift()

        for (let i = 0; i < s.history.length; i++) {
          const p = s.history[i]
          const a = (i + 1) / s.history.length
          ctx.beginPath()
          ctx.arc(p.x, p.y, 1.4 + a * 1.8, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${s.trace.color}, ${a * 0.85})`
          if (i === s.history.length - 1) {
            ctx.shadowColor = `rgba(${s.trace.color}, 0.9)`
            ctx.shadowBlur = 9
          }
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }
      signals = signals.filter((s) => s.progress < 1)
      if (!prefersReduced && Math.random() < 0.035 && signals.length < 10) spawnSignal()
    }

    function step() {
      t += 1
      ctx.clearRect(0, 0, width, height)
      drawTraces()
      drawChips()
      if (!prefersReduced) drawSignals()
      raf = requestAnimationFrame(step)
    }

    init()
    step()

    const onResize = () => init()
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="network-field" aria-hidden="true" />
}
