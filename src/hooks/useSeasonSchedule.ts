import { useMemo } from 'react'
import { useAsync } from './useAsync'
import { getSeasonSchedule } from '../services/jolpica'
import type { FetchState, Race } from '../types/f1'

export function useSeasonSchedule(season: string = 'current'): FetchState<Race[]> {
  return useAsync(() => getSeasonSchedule(season), [season])
}

/** Derives the next upcoming (or currently live) race from a schedule. */
export function useNextRace(schedule: FetchState<Race[]>): Race | null {
  return useMemo(() => {
    if (schedule.status !== 'success') return null
    return schedule.data.find((r) => r.status === 'upcoming' || r.status === 'live') ?? null
  }, [schedule])
}
