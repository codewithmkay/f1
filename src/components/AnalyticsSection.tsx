import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  Legend,
} from 'recharts'
import type { FetchState, PointsProgressionPoint, DriverStanding, ConstructorStanding } from '../types/f1'
import { teamColor } from '../utils/teamColors'
import { SectionHeading } from './ui/SectionHeading'
import { LoadingState, ErrorState, EmptyState } from './ui/States'

interface Props {
  progression: FetchState<PointsProgressionPoint[]>
  driverStandings: FetchState<DriverStanding[]>
  constructorStandings: FetchState<ConstructorStanding[]>
}

const CHART_LINE_COLORS = ['#8B6BFF', '#F0B429', '#3FD0E0', '#FF6FD8', '#3FE0A5']

function ChartTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-carbon-border bg-void/95 px-4 py-3 shadow-xl">
      <p className="font-mono text-[10px] uppercase tracking-widest2 text-mist-dim">{label}</p>
      <div className="mt-2 space-y-1">
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center gap-2 text-xs">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-mist">{p.dataKey}</span>
            <span className="ml-auto font-mono text-white">{p.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AnalyticsSection({ progression, driverStandings, constructorStandings }: Props) {
  const topDriverCodes =
    driverStandings.status === 'success' ? driverStandings.data.slice(0, 5).map((s) => s.driver.code) : []

  return (
    <section id="analytics" className="relative mx-auto max-w-7xl px-5 sm:px-8 py-24 sm:py-32">
      <SectionHeading
        eyebrow="Telemetry"
        title="Performance Analytics"
        description="Championship points progression and constructor comparison across the season."
      />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="apex-card p-6 sm:p-8">
          <p className="eyebrow">Points Progression — Top 5</p>
          <div className="mt-6 h-72">
            {progression.status === 'loading' && <LoadingState label="Charting progression" />}
            {progression.status === 'error' && <ErrorState message={progression.message} />}
            {progression.status === 'success' && progression.data.length === 0 && (
              <EmptyState message="No completed rounds yet this season." />
            )}
            {progression.status === 'success' && progression.data.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={progression.data} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262835" vertical={false} />
                  <XAxis dataKey="raceLabel" stroke="#787E8F" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#787E8F" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTooltip />} />
                  <Legend wrapperStyle={{ fontSize: 11, color: '#B7BCC9' }} />
                  {topDriverCodes.map((code, i) => (
                    <Line
                      key={code}
                      type="monotone"
                      dataKey={code}
                      stroke={CHART_LINE_COLORS[i % CHART_LINE_COLORS.length]}
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 4 }}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="apex-card p-6 sm:p-8">
          <p className="eyebrow">Constructor Comparison</p>
          <div className="mt-6 h-72">
            {constructorStandings.status === 'loading' && <LoadingState label="Comparing teams" />}
            {constructorStandings.status === 'error' && <ErrorState message={constructorStandings.message} />}
            {constructorStandings.status === 'success' && constructorStandings.data.length === 0 && (
              <EmptyState message="No constructor data yet this season." />
            )}
            {constructorStandings.status === 'success' && constructorStandings.data.length > 0 && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={constructorStandings.data.slice(0, 10)}
                  layout="vertical"
                  margin={{ top: 4, right: 24, left: 8, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#262835" horizontal={false} />
                  <XAxis type="number" stroke="#787E8F" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis
                    type="category"
                    dataKey={(d: ConstructorStanding) => d.team.name}
                    stroke="#787E8F"
                    fontSize={11}
                    width={110}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                    content={<ChartTooltip />}
                  />
                  <Bar dataKey="points" radius={[0, 4, 4, 0]}>
                    {constructorStandings.data.slice(0, 10).map((d) => (
                      <Cell key={d.team.id} fill={teamColor(d.team.id)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
