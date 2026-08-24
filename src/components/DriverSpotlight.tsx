import { motion } from 'framer-motion'
import type { FetchState, DriverStanding } from '../types/f1'
import { flagEmoji } from '../utils/nationality'
import { teamColor } from '../utils/teamColors'
import { SectionHeading } from './ui/SectionHeading'
import { LoadingState, ErrorState, EmptyState } from './ui/States'

interface Props {
  standings: FetchState<DriverStanding[]>
  headshots: FetchState<Record<string, string>>
}

export function DriverSpotlight({ standings, headshots }: Props) {
  const headshotMap = headshots.status === 'success' ? headshots.data : {}

  return (
    <section id="drivers" className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
      <SectionHeading
        eyebrow="The Grid"
        title="Driver Spotlight"
        description="Every driver's number, nationality and season form at a glance."
      />

      <div className="mt-12">
        {standings.status === 'loading' && <LoadingState label="Loading the grid" />}
        {standings.status === 'error' && <ErrorState message={standings.message} />}
        {standings.status === 'success' && standings.data.length === 0 && (
          <EmptyState message="Driver data isn't available yet." />
        )}
        {standings.status === 'success' && standings.data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {standings.data.map((s, i) => {
              const accent = teamColor(s.driver.team.id)
              const headshot = headshotMap[s.driver.code]
              return (
                <motion.div
                  key={s.driver.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: Math.min((i % 6) * 0.05, 0.3) }}
                  whileHover={{ y: -6 }}
                  className="group relative overflow-hidden rounded-2xl border border-carbon-border bg-carbon p-6"
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ backgroundColor: accent }}
                  />
                  <div
                    className="pointer-events-none absolute -right-6 -top-10 font-display text-[9rem] font-black leading-none opacity-[0.08] transition-opacity group-hover:opacity-[0.16]"
                    style={{ color: accent }}
                  >
                    {s.driver.number ?? '–'}
                  </div>

                  <div className="relative flex items-start justify-between">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest2 text-mist-dim">
                        P{s.position} · {s.driver.team.name}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-bold uppercase leading-tight text-white">
                        {s.driver.givenName}
                        <br />
                        {s.driver.familyName}
                      </h3>
                    </div>
                    {headshot ? (
                      <img
                        src={headshot}
                        alt={`${s.driver.givenName} ${s.driver.familyName}`}
                        loading="lazy"
                        className="h-16 w-16 rounded-full object-cover border-2"
                        style={{ borderColor: accent }}
                        onError={(e) => {
                          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
                        }}
                      />
                    ) : (
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full border-2 font-display text-lg font-bold"
                        style={{ borderColor: accent, color: accent }}
                      >
                        {s.driver.code}
                      </div>
                    )}
                  </div>

                  <div className="relative mt-6 flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-mist">
                      {flagEmoji(s.driver.countryCode)} {s.driver.nationality}
                    </span>
                    <span className="font-mono text-xs text-mist-dim">
                      W{s.wins} · {s.points} PTS
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
