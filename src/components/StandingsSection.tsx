import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FetchState, DriverStanding, ConstructorStanding } from '../types/f1'
import { flagEmoji } from '../utils/nationality'
import { teamColor } from '../utils/teamColors'
import { SectionHeading } from './ui/SectionHeading'
import { LoadingState, ErrorState, EmptyState } from './ui/States'

interface Props {
  drivers: FetchState<DriverStanding[]>
  constructors: FetchState<ConstructorStanding[]>
}

export function StandingsSection({ drivers, constructors }: Props) {
  const [tab, setTab] = useState<'drivers' | 'constructors'>('drivers')

  return (
    <section id="standings" className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        <SectionHeading
          eyebrow="Championship"
          title="Standings"
          description="Ranked by points across the season so far."
        />
        <div className="flex gap-1 rounded-full border border-carbon-border p-1 self-start">
          {(['drivers', 'constructors'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest2 transition-colors ${
                tab === t ? 'bg-violet text-void' : 'text-mist hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        {tab === 'drivers' ? (
          <DriverTable state={drivers} />
        ) : (
          <ConstructorTable state={constructors} />
        )}
      </div>
    </section>
  )
}

function DriverTable({ state }: { state: FetchState<DriverStanding[]> }) {
  if (state.status === 'loading') return <LoadingState label="Loading driver standings" />
  if (state.status === 'error') return <ErrorState message={state.message} />
  if (state.data.length === 0) return <EmptyState message="No standings available yet for this season." />

  return (
    <div className="apex-card overflow-hidden">
      <div className="hidden sm:grid grid-cols-[3rem,1fr,1fr,6rem,5rem] gap-4 border-b border-carbon-border px-6 py-4 font-mono text-[10px] uppercase tracking-widest2 text-mist-dim">
        <span>Pos</span>
        <span>Driver</span>
        <span>Team</span>
        <span className="text-right">Wins</span>
        <span className="text-right">Points</span>
      </div>
      {state.data.map((s, i) => (
        <motion.div
          key={s.driver.id}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
          className="grid grid-cols-[2.5rem,1fr,5rem] sm:grid-cols-[3rem,1fr,1fr,6rem,5rem] items-center gap-4 border-b border-carbon-border/60 px-6 py-4 last:border-none hover:bg-carbon-light/40 transition-colors"
        >
          <span className="font-display text-xl font-bold text-mist-dim">{s.position}</span>
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="h-8 w-1 rounded-full shrink-0"
              style={{ backgroundColor: teamColor(s.driver.team.id) }}
            />
            <div className="min-w-0">
              <p className="truncate font-medium text-white">
                {s.driver.givenName} <span className="font-semibold">{s.driver.familyName}</span>
              </p>
              <p className="sm:hidden truncate text-xs text-mist-dim">{s.driver.team.name}</p>
            </div>
            <span className="hidden sm:inline text-xs text-mist-dim">{flagEmoji(s.driver.countryCode)}</span>
          </div>
          <span className="hidden sm:block truncate text-sm text-mist">{s.driver.team.name}</span>
          <span className="hidden sm:block text-right font-mono text-sm text-mist">{s.wins}</span>
          <span className="text-right font-display text-xl font-bold text-white">{s.points}</span>
        </motion.div>
      ))}
    </div>
  )
}

function ConstructorTable({ state }: { state: FetchState<ConstructorStanding[]> }) {
  if (state.status === 'loading') return <LoadingState label="Loading constructor standings" />
  if (state.status === 'error') return <ErrorState message={state.message} />
  if (state.data.length === 0) return <EmptyState message="No standings available yet for this season." />

  return (
    <div className="apex-card overflow-hidden">
      <div className="hidden sm:grid grid-cols-[3rem,1fr,6rem,5rem] gap-4 border-b border-carbon-border px-6 py-4 font-mono text-[10px] uppercase tracking-widest2 text-mist-dim">
        <span>Pos</span>
        <span>Team</span>
        <span className="text-right">Wins</span>
        <span className="text-right">Points</span>
      </div>
      {state.data.map((s, i) => (
        <motion.div
          key={s.team.id}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
          className="grid grid-cols-[2.5rem,1fr,5rem] sm:grid-cols-[3rem,1fr,6rem,5rem] items-center gap-4 border-b border-carbon-border/60 px-6 py-4 last:border-none hover:bg-carbon-light/40 transition-colors"
        >
          <span className="font-display text-xl font-bold text-mist-dim">{s.position}</span>
          <div className="flex items-center gap-3 min-w-0">
            <span className="h-8 w-1 rounded-full shrink-0" style={{ backgroundColor: teamColor(s.team.id) }} />
            <p className="truncate font-medium text-white">{s.team.name}</p>
          </div>
          <span className="hidden sm:block text-right font-mono text-sm text-mist">{s.wins}</span>
          <span className="text-right font-display text-xl font-bold text-white">{s.points}</span>
        </motion.div>
      ))}
    </div>
  )
}
