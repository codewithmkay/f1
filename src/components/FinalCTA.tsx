import { motion } from 'framer-motion'

export function FinalCTA() {
  return (
    <section className="relative mx-auto max-w-7xl px-5 sm:px-8 pb-24 sm:pb-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-2xl border border-carbon-border bg-apex-radial bg-carbon px-8 py-16 sm:px-16 sm:py-24 text-center"
      >
        <div className="apex-grid-bg pointer-events-none absolute inset-0 opacity-20" />
        <p className="eyebrow relative">Lights Out</p>
        <h2 className="relative mt-4 font-display text-4xl sm:text-6xl font-black uppercase leading-[0.95] text-white">
          Every Sector.
          <br />
          Every Second.
        </h2>
        <p className="relative mx-auto mt-6 max-w-lg text-sm sm:text-base text-mist">
          APEX tracks the 2026 season end to end — standings, calendar and telemetry-grade analytics, updated as the
          grid moves.
        </p>
        <a
          href="#calendar"
          className="relative mt-10 inline-flex items-center gap-3 rounded-full bg-violet px-8 py-3 font-mono text-xs uppercase tracking-widest2 text-void transition-transform hover:scale-105"
        >
          Explore the season
        </a>
      </motion.div>
    </section>
  )
}
