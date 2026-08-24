import { motion } from 'framer-motion'
import { Flag, MapPin } from 'lucide-react'
import type { Race } from '../types/f1'
import { formatSessionTime } from '../utils/format'
import { flagEmoji } from '../utils/nationality'
import { SectionHeading } from './ui/SectionHeading'
import { LoadingState } from './ui/States'

export function NextRaceSection({ race }: { race: Race | null }) {
  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
      <SectionHeading eyebrow="Race Weekend" title="Next On Track" />

      <div className="mt-12">
        {!race ? (
          <LoadingState label="Loading next race" />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6 }}
            className="apex-card relative overflow-hidden p-6 sm:p-10"
          >
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet/10 blur-3xl" />

            <div className="relative grid gap-10 lg:grid-cols-[1.1fr,1.4fr]">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest2 text-violet-glow">
                  Round {race.round.toString().padStart(2, '0')}
                </p>
                <h3 className="mt-3 font-display text-4xl sm:text-5xl font-bold uppercase leading-[0.95] text-white">
                  {race.name}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-mist">
                  <MapPin className="h-4 w-4 text-mist-dim" />
                  <span>{race.circuit.name}</span>
                </div>
                <div className="mt-1 flex items-center gap-2 text-mist">
                  <span>{flagEmoji(race.circuit.countryCode)}</span>
                  <span>
                    {race.circuit.locality}, {race.circuit.country}
                  </span>
                </div>

                <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-carbon-border px-4 py-2">
                  <Flag className="h-4 w-4 text-gold" />
                  <span className="font-mono text-xs uppercase tracking-widest2 text-mist">
                    {race.hasSprint ? 'Sprint Weekend' : 'Standard Weekend'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {race.sessions.map((session) => (
                  <div
                    key={session.type}
                    className={`rounded-lg border px-4 py-3 ${
                      session.type === 'Race'
                        ? 'border-gold/40 bg-gold/5'
                        : 'border-carbon-border bg-void/40'
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-widest2 text-mist-dim">{session.type}</p>
                    <p className="mt-1 text-sm font-medium text-white">{formatSessionTime(session.date)}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
