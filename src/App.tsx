import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { NextRaceSection } from './components/NextRaceSection'
import { StandingsSection } from './components/StandingsSection'
import { CalendarSection } from './components/CalendarSection'
import { DriverSpotlight } from './components/DriverSpotlight'
import { AnalyticsSection } from './components/AnalyticsSection'
import { NewsSection } from './components/NewsSection'
import { FinalCTA } from './components/FinalCTA'
import { Footer } from './components/Footer'

import { useSeasonSchedule, useNextRace } from './hooks/useSeasonSchedule'
import { useDriverStandings, useConstructorStandings } from './hooks/useStandings'
import { useNews } from './hooks/useNews'
import { useLiveSession, useIsLive, useDriverHeadshots } from './hooks/useLiveStatus'
import { usePointsProgression } from './hooks/usePointsProgression'
import { formatSessionTimeShort } from './utils/format'

const SEASON = '2026'

function App() {
  const schedule = useSeasonSchedule(SEASON)
  const nextRace = useNextRace(schedule)

  const driverStandings = useDriverStandings(SEASON)
  const constructorStandings = useConstructorStandings(SEASON)

  const news = useNews(6)

  const liveSession = useLiveSession()
  const isLive = useIsLive(liveSession)
  const headshots = useDriverHeadshots()

  const progression = usePointsProgression(SEASON, schedule, driverStandings)

  const tickerItems = [
    {
      label: 'Season',
      value: SEASON,
    },
    {
      label: 'Next Round',
      value: nextRace ? nextRace.name.replace(' Grand Prix', '') : '—',
    },
    {
      label: 'Session',
      value:
        liveSession.status === 'success' && liveSession.data
          ? `${liveSession.data.session_name} · ${formatSessionTimeShort(liveSession.data.date_start)}`
          : 'Awaiting schedule',
    },
    {
      label: 'Leader',
      value:
        driverStandings.status === 'success' && driverStandings.data[0]
          ? `${driverStandings.data[0].driver.code} · ${driverStandings.data[0].points} PTS`
          : '—',
    },
  ]

  return (
    <div className="min-h-screen bg-void">
      <Nav live={isLive} tickerItems={tickerItems} />
      <main>
        <Hero nextRace={nextRace} />
        <NextRaceSection race={nextRace} />
        <StandingsSection drivers={driverStandings} constructors={constructorStandings} />
        <CalendarSection state={schedule} />
        <DriverSpotlight standings={driverStandings} headshots={headshots} />
        <AnalyticsSection
          progression={progression}
          driverStandings={driverStandings}
          constructorStandings={constructorStandings}
        />
        <NewsSection state={news} />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
