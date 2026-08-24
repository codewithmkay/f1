import { useAsync } from './useAsync'
import { getLatestSession, isSessionLive, getDriverHeadshots } from '../services/openf1'
import type { FetchState } from '../types/f1'
import type { OpenF1Session } from '../services/openf1'

export function useLiveSession(): FetchState<OpenF1Session | null> {
  return useAsync(() => getLatestSession(), [])
}

export function useIsLive(session: FetchState<OpenF1Session | null>): boolean {
  return session.status === 'success' && isSessionLive(session.data)
}

export function useDriverHeadshots(): FetchState<Record<string, string>> {
  return useAsync(() => getDriverHeadshots(), [])
}
