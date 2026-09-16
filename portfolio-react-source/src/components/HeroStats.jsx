import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: '67%', label: 'faster Sev-1 root-cause', accent: 'signal', style: { top: '16%', right: '9%' }, depth: 18 },
  { value: '41K+', label: 'req/s sustained by a custom load balancer', accent: 'warm', style: { top: '42%', right: '2%' }, depth: 28 },
  { value: '100K+', label: 'kernel events/sec traced via eBPF', accent: 'signal', style: { bottom: '20%', right: '14%' }, depth: 14 },
  { value: '2.71x', label: 'GPU speedup over CPU', accent: 'warm', style: { bottom: '8%', right: '32%' }, depth: 24 },
]

export default function HeroStats() {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 150)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return
    function onMove(e) {
      const w = window.innerWidth, h = window.innerHeight
      setPos({ x: (e.clientX / w - 0.5), y: (e.clientY / h - 0.5) })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div className="hero-stats" ref={ref} aria-hidden="true">
      {STATS.map((s, i) => (
        <div
          key={i}
          className={`stat-card stat-${s.accent}${mounted ? ' in' : ''}`}
          style={{
            ...s.style,
            transitionDelay: `${300 + i * 90}ms`,
            transform: mounted
              ? `translate(${pos.x * s.depth}px, ${pos.y * s.depth}px)`
              : 'translateY(14px)',
          }}
        >
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}
