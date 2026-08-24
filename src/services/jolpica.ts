import { getJSON } from './http'
import { nationalityToCode, countryToCode } from '../utils/nationality'
import type {
  Race,
  RaceSession,
  RaceStatus,
  DriverStanding,
  ConstructorStanding,
  RaceResultRow,
} from '../types/f1'

const BASE_URL = import.meta.env.VITE_JOLPICA_BASE_URL ?? 'https://api.jolpi.ca/ergast/f1'

// --- Raw Ergast/Jolpica response shapes (only the fields we use) -----------

interface ErgastSessionTime {
  date: string
  time?: string
}

interface ErgastCircuit {
  circuitId: string
  circuitName: string
  Location: { lat: string; long: string; locality: string; country: string }
}

interface ErgastRace {
  season: string
  round: string
  raceName: string
  Circuit: ErgastCircuit
  date: string
  time?: string
  FirstPractice?: ErgastSessionTime
  SecondPractice?: ErgastSessionTime
  ThirdPractice?: ErgastSessionTime
  Qualifying?: ErgastSessionTime
  Sprint?: ErgastSessionTime
  SprintQualifying?: ErgastSessionTime
}

interface ErgastDriver {
  driverId: string
  code?: string
  permanentNumber?: string
  givenName: string
  familyName: string
  nationality: string
}

interface ErgastConstructor {
  constructorId: string
  name: string
  nationality: string
}

interface ErgastDriverStanding {
  position: string
  points: string
  wins: string
  Driver: ErgastDriver
  Constructors: ErgastConstructor[]
}

interface ErgastConstructorStanding {
  position: string
  points: string
  wins: string
  Constructor: ErgastConstructor
}

interface ErgastResult {
  position: string
  points: string
  status: string
  Driver: ErgastDriver
  Constructor: ErgastConstructor
}

function computeStatus(raceDateISO: string): RaceStatus {
  const now = Date.now()
  const raceTime = new Date(raceDateISO).getTime()
  const dayMs = 24 * 60 * 60 * 1000
  if (raceTime > now) return 'upcoming'
  if (now - raceTime < dayMs) return 'live'
  return 'completed'
}

function toISO(date: string, time?: string): string | null {
  if (!date) return null
  return time ? `${date}T${time}` : `${date}T00:00:00Z`
}

function mapRace(r: ErgastRace): Race {
  const sessions: RaceSession[] = []
  if (r.FirstPractice) sessions.push({ type: 'FP1', date: toISO(r.FirstPractice.date, r.FirstPractice.time) })
  if (r.SecondPractice) sessions.push({ type: 'FP2', date: toISO(r.SecondPractice.date, r.SecondPractice.time) })
  if (r.ThirdPractice) sessions.push({ type: 'FP3', date: toISO(r.ThirdPractice.date, r.ThirdPractice.time) })
  if (r.SprintQualifying) sessions.push({ type: 'Sprint Qualifying', date: toISO(r.SprintQualifying.date, r.SprintQualifying.time) })
  if (r.Sprint) sessions.push({ type: 'Sprint', date: toISO(r.Sprint.date, r.Sprint.time) })
  if (r.Qualifying) sessions.push({ type: 'Qualifying', date: toISO(r.Qualifying.date, r.Qualifying.time) })
  sessions.push({ type: 'Race', date: toISO(r.date, r.time) })

  const raceISO = toISO(r.date, r.time) ?? r.date

  return {
    season: r.season,
    round: Number(r.round),
    name: r.raceName,
    circuit: {
      id: r.Circuit.circuitId,
      name: r.Circuit.circuitName,
      locality: r.Circuit.Location.locality,
      country: r.Circuit.Location.country,
      countryCode: countryToCode(r.Circuit.Location.country),
      lat: Number(r.Circuit.Location.lat),
      lng: Number(r.Circuit.Location.long),
    },
    date: raceISO,
    time: r.time ?? null,
    sessions,
    status: computeStatus(raceISO),
    hasSprint: Boolean(r.Sprint),
  }
}

function mapDriverStanding(d: ErgastDriverStanding): DriverStanding {
  const constructor = d.Constructors[d.Constructors.length - 1]
  return {
    position: Number(d.position),
    points: Number(d.points),
    wins: Number(d.wins),
    form: [],
    driver: {
      id: d.Driver.driverId,
      code: d.Driver.code ?? d.Driver.familyName.slice(0, 3).toUpperCase(),
      number: d.Driver.permanentNumber ? Number(d.Driver.permanentNumber) : null,
      givenName: d.Driver.givenName,
      familyName: d.Driver.familyName,
      nationality: d.Driver.nationality,
      countryCode: nationalityToCode(d.Driver.nationality),
      team: {
        id: constructor.constructorId,
        name: constructor.name,
        nationality: constructor.nationality,
      },
    },
  }
}

function mapConstructorStanding(c: ErgastConstructorStanding): ConstructorStanding {
  return {
    position: Number(c.position),
    points: Number(c.points),
    wins: Number(c.wins),
    team: {
      id: c.Constructor.constructorId,
      name: c.Constructor.name,
      nationality: c.Constructor.nationality,
    },
  }
}

/** Full race calendar for a season ('current' resolves to the active season). */
export async function getSeasonSchedule(season: string = 'current'): Promise<Race[]> {
  const data = await getJSON<{ MRData: { RaceTable: { Races: ErgastRace[] } } }>(
    `${BASE_URL}/${season}.json?limit=40`,
  )
  return data.MRData.RaceTable.Races.map(mapRace)
}

export async function getDriverStandings(season: string = 'current'): Promise<DriverStanding[]> {
  const data = await getJSON<{
    MRData: { StandingsTable: { StandingsLists: { DriverStandings: ErgastDriverStanding[] }[] } }
  }>(`${BASE_URL}/${season}/driverStandings.json`)
  const list = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? []
  return list.map(mapDriverStanding)
}

export async function getConstructorStandings(season: string = 'current'): Promise<ConstructorStanding[]> {
  const data = await getJSON<{
    MRData: { StandingsTable: { StandingsLists: { ConstructorStandings: ErgastConstructorStanding[] }[] } }
  }>(`${BASE_URL}/${season}/constructorStandings.json`)
  const list = data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings ?? []
  return list.map(mapConstructorStanding)
}

export async function getRaceResults(season: string, round: number): Promise<RaceResultRow[]> {
  const data = await getJSON<{
    MRData: { RaceTable: { Races: { Results: ErgastResult[] }[] } }
  }>(`${BASE_URL}/${season}/${round}/results.json`)
  const results = data.MRData.RaceTable.Races[0]?.Results ?? []
  return results.map((r) => ({
    position: Number(r.position),
    driverCode: r.Driver.code ?? r.Driver.familyName.slice(0, 3).toUpperCase(),
    driverName: `${r.Driver.givenName} ${r.Driver.familyName}`,
    team: r.Constructor.name,
    points: Number(r.points),
    status: r.status,
  }))
}

/**
 * Points progression across the season for the top N drivers, derived from
 * each completed round's standings snapshot. Jolpica doesn't expose this
 * directly, so we fetch the standings after each completed round.
 */
export async function getPointsProgression(season: string, completedRounds: number[], topDriverCodes: string[]) {
  const snapshots = await Promise.all(
    completedRounds.map(async (round) => {
      const data = await getJSON<{
        MRData: { StandingsTable: { StandingsLists: { DriverStandings: ErgastDriverStanding[] }[] } }
      }>(`${BASE_URL}/${season}/${round}/driverStandings.json`)
      const list = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings ?? []
      return { round, standings: list.map(mapDriverStanding) }
    }),
  )

  return snapshots.map(({ round, standings }) => {
    const point: Record<string, number | string> = { round, raceLabel: `R${round}` }
    for (const code of topDriverCodes) {
      const entry = standings.find((s) => s.driver.code === code)
      point[code] = entry?.points ?? 0
    }
    return point
  })
}
