import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { LiveTicker } from './ui/LiveTicker'

const LINKS = [
  { label: 'Races', href: '#calendar' },
  { label: 'Standings', href: '#standings' },
  { label: 'Drivers', href: '#drivers' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'News', href: '#news' },
]

interface Props {
  live: boolean
  tickerItems: { label: string; value: string }[]
}

export function Nav({ live, tickerItems }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav
        className={`transition-colors duration-300 ${
          scrolled ? 'bg-void/85 backdrop-blur-md border-b border-carbon-border' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-4">
          <a href="#top" className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-extrabold tracking-wide text-white">APEX</span>
            <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-widest2 text-mist-dim">
              F1 Intelligence
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-widest2 text-mist hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-carbon-border px-3 py-1.5">
              <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-gold animate-pulse-slow' : 'bg-mist-dim'}`} />
              <span className="font-mono text-[10px] uppercase tracking-widest2 text-mist">
                {live ? 'Session Live' : 'No Session'}
              </span>
            </div>
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden overflow-hidden border-t border-carbon-border bg-void/95"
            >
              <div className="flex flex-col px-5 py-4 gap-1">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="py-3 font-display text-xl uppercase text-white border-b border-carbon-border/60 last:border-none"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <LiveTicker items={tickerItems} live={live} />
    </header>
  )
}
