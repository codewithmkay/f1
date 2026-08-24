import { useAsync } from './useAsync'
import { getDriverStandings, getConstructorStandings } from '../services/jolpica'
import type { FetchState, DriverStanding, ConstructorStanding } from '../types/f1'

export function useDriverStandings(season: string = 'current'): FetchState<DriverStanding[]> {
  return useAsync(() => getDriverStandings(season), [season])
}

export function useConstructorStandings(season: string = 'current'): FetchState<ConstructorStanding[]> {
  return useAsync(() => getConstructorStandings(season), [season])
}
