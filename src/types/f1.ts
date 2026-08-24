export interface Circuit {
  id: string
  name: string
  locality: string
  country: string
  countryCode: string
  lat?: number
  lng?: number
}

export type SessionType = 'FP1' | 'FP2' | 'FP3' | 'Sprint Qualifying' | 'Sprint' | 'Qualifying' | 'Race'

export interface RaceSession {
  type: SessionType
  date: string | null // ISO string, null if not announced
}

export type RaceStatus = 'completed' | 'live' | 'upcoming'

export interface Race {
  season: string
  round: number
  name: string
  circuit: Circuit
  date: string // ISO date of the main race
  time: string | null
  sessions: RaceSession[]
  status: RaceStatus
  hasSprint: boolean
}

export interface ConstructorInfo {
  id: string
  name: string
  nationality: string
}

export interface DriverInfo {
  id: string
  code: string // 3-letter code, e.g. VER
  number: number | null
  givenName: string
  familyName: string
  nationality: string
  countryCode: string
  team: ConstructorInfo
  imageUrl?: string
}

export interface DriverStanding {
  position: number
  driver: DriverInfo
  points: number
  wins: number
  podiums?: number
  form: ('W' | 'P' | 'Q' | 'R' | '-')[] // recent finish glyphs, best to worst simplified
}

export interface ConstructorStanding {
  position: number
  team: ConstructorInfo
  points: number
  wins: number
}

export interface RaceResultRow {
  position: number
  driverCode: string
  driverName: string
  team: string
  points: number
  status: string
}

export interface NewsArticle {
  id: string
  title: string
  summary: string
  source: string
  url: string
  imageUrl: string | null
  publishedAt: string
}

export interface PointsProgressionPoint {
  round: number
  raceLabel: string
  [driverCode: string]: number | string
}

export type FetchState<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'success'; data: T }
