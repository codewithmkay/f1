import { useAsync } from './useAsync'
import { getPointsProgression } from '../services/jolpica'
import type { FetchState, Race, DriverStanding, PointsProgressionPoint } from '../types/f1'

/**
 * Builds a per-round points progression series for the current top-5
 * drivers. Depends on the schedule (to know which rounds are complete)
 * and the current standings (to know who the top drivers are).
 */
export function usePointsProgression(
  season: string,
  schedule: FetchState<Race[]>,
  standings: FetchState<DriverStanding[]>,
): FetchState<PointsProgressionPoint[]> {
  const ready = schedule.status === 'success' && standings.status === 'success'
  const completedRounds = ready
    ? (schedule as { status: 'success'; data: Race[] }).data.filter((r) => r.status === 'completed').map((r) => r.round)
    : []
  const topCodes = ready
    ? (standings as { status: 'success'; data: DriverStanding[] }).data.slice(0, 5).map((s) => s.driver.code)
    : []

  return useAsync(async () => {
    if (!ready || completedRounds.length === 0) return []
    return getPointsProgression(season, completedRounds, topCodes) as Promise<PointsProgressionPoint[]>
  }, [season, ready, completedRounds.join(','), topCodes.join(',')])
}
