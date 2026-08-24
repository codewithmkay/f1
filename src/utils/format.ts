export function formatRaceDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export function formatSessionTime(iso: string | null): string {
  if (!iso) return 'TBC'
  const d = new Date(iso)
  return d.toLocaleString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

export function formatSessionTimeShort(iso: string | null): string {
  if (!iso) return 'TBC'
  const d = new Date(iso)
  return d.toLocaleString('en-GB', {
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export interface Countdown {
  days: number
  hours: number
  minutes: number
  seconds: number
  totalMs: number
}

export function getCountdown(targetIso: string): Countdown {
  const totalMs = Math.max(0, new Date(targetIso).getTime() - Date.now())
  const days = Math.floor(totalMs / (1000 * 60 * 60 * 24))
  const hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((totalMs / (1000 * 60)) % 60)
  const seconds = Math.floor((totalMs / 1000) % 60)
  return { days, hours, minutes, seconds, totalMs }
}

export function pad2(n: number): string {
  return n.toString().padStart(2, '0')
}

export function timeAgo(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(ms / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  return `${days}d ago`
}
