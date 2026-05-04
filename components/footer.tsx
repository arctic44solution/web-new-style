'use client'

import { useEffect, useState, useRef } from 'react'

const CITIES = [
  { name: 'TORONTO', tz: 'America/Toronto' },
  { name: 'TOKYO',   tz: 'Asia/Tokyo' },
  { name: 'LONDON',  tz: 'Europe/London' },
  { name: 'PARIS',   tz: 'Europe/Paris' },
]

function useClock(tz: string) {
  const [time, setTime] = useState('')
  useEffect(() => {
    const tick = () => {
      const t = new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      }).format(new Date())
      setTime(t.replace(' ', '').toUpperCase())
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [tz])
  return time
}

function CityTime({ name, tz }: { name: string; tz: string }) {
  const time = useClock(tz)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '10px', letterSpacing: '0.15em', fontWeight: 700 }}>
        <span style={{
          width: '6px', height: '6px', borderRadius: '50%',
          background: '#0A0A0A', display: 'inline-block', flexShrink: 0
        }} />
        {name}
      </div>
      <div style={{ fontSize: '11px', letterSpacing: '0.05em', paddingLeft: '14px', fontWeight: 400 }}>
        {time}
      </div>
    </div>
  )
}

export default function Home() {
  const nameRef = useRef<HTMLDivElement>(null)
  const [fontSize, setFontSize] = useState('20vw')

  useEffect(() => {
    const resize = () => {
      const vw = window.innerWidth
      setFontSize(`${vw * 0.265}px`)
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <main style={{
      minHeight: '100vh',
      background: '#E84000',
      color: '#0A0A0A',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    }}>
      {/* Top bar */}
      <header style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        alignItems: 'center',
        padding: '20px 24px',
        borderBottom: '1px solid rgba(10,10,10,0.15)',
      }}>
        <div style={{ fontSize: '17px', letterSpacing: '0.12em', fontWeight: 700 }}>
          New Business Inquiries
        </div>
        <div style={{ fontSize: '14px', letterSpacing: '0.12em', fontWeight: 700, textAlign: 'center' }}>
          Email
        </div>
        <div style={{ fontSize: '14px', letterSpacing: '0.05em', textAlign: 'right' }}>
          brandinhall (a) gmail.com
        </div>
      </header>

      {/* About section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        padding: '40px 24px 0',
        gap: '24px',
      }}>
        <div style={{ fontSize: '17px', letterSpacing: '0.12em', fontWeight: 700 }}>
          About
        </div>
        <div style={{
          fontSize: '15px',
          lineHeight: '1.65',
          letterSpacing: '0.04em',
          maxWidth: '700px',
          opacity: 0.9,
        }}>
          Brandin Hall is a brand designer helping ambitious companies uncover the truth of who they are and turn it into powerful brands. Through strategy, identity, and intelligent systems, he creates work that reveals meaning, shapes perception, and helps exceptional businesses stand apart in an increasingly automated world.
        </div>
      </section>

      {/* Giant name */}
      <div
        ref={nameRef}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          padding: '0',
          overflow: 'hidden',
          marginTop: '20px',
          width: '100%',
        }}
      >
        <div style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: fontSize,
          lineHeight: 0.85,
          color: 'var(--black)',
          letterSpacing: '0.03em',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          marginLeft: '0.45em',
          display: 'block',
          width: 'max-content',
        }}>
          BRANDIN
        </div>
      </div>

      {/* World clocks */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        padding: '32px 24px 28px',
        gap: '16px',
        borderTop: '1px solid rgba(10,10,10,0.12)',
        marginTop: '20px',
      }}>
        {CITIES.map((c) => (
          <CityTime key={c.name} name={c.name} tz={c.tz} />
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 24px 20px',
        borderTop: '1px solid rgba(10,10,10,0.12)',
      }}>
        <a
          href="#"
          style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            fontWeight: 700,
            color: 'var(--black)',
            textDecoration: 'none',
          }}
        >
          LinkedIn
        </a>
        <span style={{ fontSize: '10px', letterSpacing: '0.06em', opacity: 0.7, fontWeight: 700 }}>
          © 2023 – 2026 Design By Brandin
        </span>
      </footer>
    </main>
  )
}