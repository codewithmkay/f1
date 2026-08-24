import { getJSON, buildQuery } from './http'

const BASE_URL = import.meta.env.VITE_OPENF1_BASE_URL ?? 'https://api.openf1.org/v1'

export interface OpenF1Session {
  session_key: number
  session_name: string
  session_type: string
  date_start: string
  date_end: string
  location: string
  country_name: string
  circuit_short_name: string
  year: number
}

export interface OpenF1Driver {
  driver_number: number
  full_name: string
  name_acronym: string
  team_name: string
  team_colour: string
  headshot_url: string | null
  country_code: string | null
}

/** The most recently started session (used to detect "is a session live right now"). */
export async function getLatestSession(): Promise<OpenF1Session | null> {
  const sessions = await getJSON<OpenF1Session[]>(`${BASE_URL}/sessions?session_key=latest`)
  return sessions[0] ?? null
}

/** True when the latest known session's window contains the current time. */
export function isSessionLive(session: OpenF1Session | null): boolean {
  if (!session) return false
  const now = Date.now()
  const start = new Date(session.date_start).getTime()
  const end = new Date(session.date_end).getTime()
  return now >= start && now <= end
}

/** Driver roster (with headshots) for a given session; defaults to the latest session. */
export async function getSessionDrivers(sessionKey: number | 'latest' = 'latest'): Promise<OpenF1Driver[]> {
  return getJSON<OpenF1Driver[]>(`${BASE_URL}/drivers${buildQuery({ session_key: sessionKey })}`)
}

/** Builds a lookup of driver acronym -> headshot URL from OpenF1's roster. */
export async function getDriverHeadshots(): Promise<Record<string, string>> {
  try {
    const drivers = await getSessionDrivers('latest')
    const map: Record<string, string> = {}
    for (const d of drivers) {
      if (d.headshot_url) map[d.name_acronym] = d.headshot_url
    }
    return map
  } catch {
    // Headshots are a visual enhancement, not critical — fail soft.
    return {}
  }
}
