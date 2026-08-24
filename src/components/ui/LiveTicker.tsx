interface TickerItem {
  label: string
  value: string
}

export function LiveTicker({ items, live }: { items: TickerItem[]; live: boolean }) {
  const track = [...items, ...items] // duplicated for seamless loop

  return (
    <div className="relative overflow-hidden border-b border-carbon-border bg-carbon/70 backdrop-blur-sm">
      <div className="flex animate-ticker whitespace-nowrap py-2">
        {track.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-6 font-mono text-[11px] uppercase tracking-widest2 text-mist-dim">
            {i % items.length === 0 && (
              <span className={`h-1.5 w-1.5 rounded-full ${live ? 'bg-gold animate-pulse-slow' : 'bg-mist-dim'}`} />
            )}
            <span className="text-mist-dim">{item.label}</span>
            <span className="text-mist">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
