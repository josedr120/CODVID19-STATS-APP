import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchGlobalStats } from '../../store/slices/globalStatsSlice'
import StatCard from '../dashboard/StatCard'
import StatsGrid from '../dashboard/StatsGrid'

function GlobalStats() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.globalStats)

  useEffect(() => {
    dispatch(fetchGlobalStats())
  }, [dispatch])

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading global stats: {error}</span>
        <button className="btn btn-sm" onClick={() => dispatch(fetchGlobalStats())}>
          Retry
        </button>
      </div>
    )
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A'
    return new Date(timestamp).toLocaleString()
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          <span className="text-3xl">🌍</span>
          Global Statistics
        </h2>
        {data?.updated && (
          <span className="badge badge-ghost text-xs">
            Updated: {formatDate(data.updated)}
          </span>
        )}
      </div>

      <StatsGrid columns={4}>
        <StatCard
          title="Total Cases"
          value={data?.cases}
          description={`+${data?.todayCases?.toLocaleString() || 0} today`}
          color="warning"
          loading={loading}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        />

        <StatCard
          title="Total Deaths"
          value={data?.deaths}
          description={`+${data?.todayDeaths?.toLocaleString() || 0} today`}
          color="error"
          loading={loading}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />

        <StatCard
          title="Recovered"
          value={data?.recovered}
          description={`+${data?.todayRecovered?.toLocaleString() || 0} today`}
          color="success"
          loading={loading}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />

        <StatCard
          title="Active Cases"
          value={data?.active}
          description={`${data?.critical?.toLocaleString() || 0} critical`}
          color="info"
          loading={loading}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
      </StatsGrid>

      <div className="mt-4">
        <StatsGrid columns={5}>
          <StatCard
            title="Tests"
            value={data?.tests}
            color="neutral"
            loading={loading}
          />
          <StatCard
            title="Cases/Million"
            value={data?.casesPerOneMillion}
            color="neutral"
            loading={loading}
          />
          <StatCard
            title="Deaths/Million"
            value={data?.deathsPerOneMillion}
            color="neutral"
            loading={loading}
          />
          <StatCard
            title="Tests/Million"
            value={data?.testsPerOneMillion}
            color="neutral"
            loading={loading}
          />
          <StatCard
            title="Affected Countries"
            value={data?.affectedCountries}
            color="primary"
            loading={loading}
          />
        </StatsGrid>
      </div>
    </section>
  )
}

export default GlobalStats
