import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap } from 'lucide-react'
import type { FetchState, Race } from '../types/f1'
import { formatRaceDate, formatSessionTime } from '../utils/format'
import { flagEmoji } from '../utils/nationality'
import { SectionHeading } from './ui/SectionHeading'
import { LoadingState, ErrorState, EmptyState } from './ui/States'

const STATUS_LABEL: Record<Race['status'], string> = {
  completed: 'Completed',
  live: 'Live Now',
  upcoming: 'Upcoming',
}

export function CalendarSection({ state }: { state: FetchState<Race[]> }) {
  const [selected, setSelected] = useState<Race | null>(null)

  return (
    <section id="calendar" className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
      <SectionHeading eyebrow="Full Season" title="Race Calendar" description="Every round of the 2026 championship." />

      <div className="mt-12">
        {state.status === 'loading' && <LoadingState label="Loading calendar" />}
        {state.status === 'error' && <ErrorState message={state.message} />}
        {state.status === 'success' && state.data.length === 0 && (
          <EmptyState message="The season calendar isn't published yet." />
        )}
        {state.status === 'success' && state.data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.data.map((race, i) => (
              <motion.button
                key={`${race.season}-${race.round}`}
                onClick={() => setSelected(race)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min((i % 6) * 0.05, 0.3) }}
                className={`group relative overflow-hidden rounded-xl border p-5 text-left transition-colors ${
                  race.status === 'live'
                    ? 'border-gold/50 bg-gold/5'
                    : 'border-carbon-border bg-carbon hover:border-violet/50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest2 text-mist-dim">
                    Round {race.round.toString().padStart(2, '0')}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest2 ${
                      race.status === 'live'
                        ? 'bg-gold text-void'
                        : race.status === 'completed'
                          ? 'bg-carbon-light text-mist-dim'
                          : 'bg-violet/15 text-violet-glow'
                    }`}
                  >
                    {STATUS_LABEL[race.status]}
                  </span>
                </div>

                <div className="mt-4 flex items-center gap-2 text-2xl">
                  <span>{flagEmoji(race.circuit.countryCode)}</span>
                  {race.hasSprint && <Zap className="h-4 w-4 text-gold" />}
                </div>

                <h3 className="mt-2 font-display text-xl font-bold uppercase text-white group-hover:text-violet-glow transition-colors">
                  {race.name.replace(' Grand Prix', '')}
                </h3>
                <p className="mt-1 text-xs text-mist-dim">{race.circuit.name}</p>
                <p className="mt-3 font-mono text-xs text-mist">{formatRaceDate(race.date)}</p>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>{selected && <RaceDetailModal race={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}

function RaceDetailModal({ race, onClose }: { race: Race; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-void/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        className="apex-card relative w-full max-w-lg p-6 sm:p-8"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 text-mist-dim hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <p className="font-mono text-xs uppercase tracking-widest2 text-violet-glow">
          Round {race.round.toString().padStart(2, '0')} · {race.season}
        </p>
        <h3 className="mt-2 font-display text-3xl sm:text-4xl font-bold uppercase text-white">{race.name}</h3>
        <p className="mt-2 flex items-center gap-2 text-sm text-mist">
          <span>{flagEmoji(race.circuit.countryCode)}</span>
          {race.circuit.name} — {race.circuit.locality}, {race.circuit.country}
        </p>

        <div className="mt-6 space-y-2">
          {race.sessions.map((session) => (
            <div
              key={session.type}
              className="flex items-center justify-between rounded-lg border border-carbon-border px-4 py-3"
            >
              <span className="font-mono text-xs uppercase tracking-widest2 text-mist-dim">{session.type}</span>
              <span className="text-sm text-white">{formatSessionTime(session.date)}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
