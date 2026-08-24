import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import type { Race } from '../types/f1'
import { useCountdown } from '../hooks/useCountdown'
import { flagEmoji } from '../utils/nationality'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1631392426516-affff6b1d41c?q=80&w=2400&auto=format&fit=crop'

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-4xl sm:text-6xl font-bold tabular-nums text-white leading-none">
        {value.toString().padStart(2, '0')}
      </span>
      <span className="mt-1 font-mono text-[10px] sm:text-xs uppercase tracking-widest2 text-mist-dim">{label}</span>
    </div>
  )
}

export function Hero({ nextRace }: { nextRace: Race | null }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const countdown = useCountdown(nextRace?.date ?? null)

  return (
    <section id="top" ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-void">
      <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
        <img
          src={HERO_IMAGE}
          alt="Formula 1 race car"
          className="h-full w-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/70 to-void/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/20 to-void/70" />
        <div className="absolute inset-0 apex-grid-bg opacity-20 mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')]" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-5 sm:px-8 pb-16 sm:pb-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-gold" />
          <span className="font-mono text-xs uppercase tracking-widest2 text-gold">The 2026 Season</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.25 }}
          className="font-display text-[18vw] sm:text-[10rem] md:text-[11rem] font-black uppercase leading-[0.82] tracking-tight text-white"
        >
          Apex
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          className="mt-2 font-mono text-sm sm:text-base uppercase tracking-widest2 text-mist"
        >
          Formula 1 Intelligence
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.55 }}
          className="mt-10 flex flex-col sm:flex-row sm:items-end gap-8 sm:gap-16"
        >
          <div>
            <p className="eyebrow">Next Race</p>
            {nextRace ? (
              <>
                <p className="mt-2 font-display text-2xl sm:text-3xl font-bold uppercase text-white">
                  {nextRace.name.replace(' Grand Prix', '')}
                </p>
                <p className="mt-1 flex items-center gap-2 text-sm text-mist">
                  <span>{flagEmoji(nextRace.circuit.countryCode)}</span>
                  {nextRace.circuit.locality}, {nextRace.circuit.country}
                </p>
              </>
            ) : (
              <p className="mt-2 text-sm text-mist-dim">Loading schedule…</p>
            )}
          </div>

          {countdown && (
            <div className="flex gap-4 sm:gap-6">
              <CountdownUnit value={countdown.days} label="Days" />
              <CountdownUnit value={countdown.hours} label="Hrs" />
              <CountdownUnit value={countdown.minutes} label="Min" />
              <CountdownUnit value={countdown.seconds} label="Sec" />
            </div>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-mist-dim"
      >
        <ChevronDown className="h-5 w-5" />
      </motion.div>
    </section>
  )
}
