import { useEffect, useState } from 'react'
import { getCountdown, type Countdown } from '../utils/format'

export function useCountdown(targetIso: string | null): Countdown | null {
  const [countdown, setCountdown] = useState<Countdown | null>(targetIso ? getCountdown(targetIso) : null)

  useEffect(() => {
    if (!targetIso) return
    setCountdown(getCountdown(targetIso))
    const interval = setInterval(() => setCountdown(getCountdown(targetIso)), 1000)
    return () => clearInterval(interval)
  }, [targetIso])

  return countdown
}
