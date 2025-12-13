import { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { fetchTodayStats, fetchYesterdayStats } from '../../store/slices/usStatesSlice'
import StatCard from '../dashboard/StatCard'
import StatsGrid from '../dashboard/StatsGrid'
import ChartCard from '../dashboard/ChartCard'
import DataTable from '../dashboard/DataTable'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function USStatesStats() {
  const dispatch = useDispatch()
  const { today, yesterday, loading, error } = useSelector(state => state.usStates)
  const [selectedState, setSelectedState] = useState('')

  useEffect(() => {
    dispatch(fetchTodayStats())
    dispatch(fetchYesterdayStats())
  }, [dispatch])

  const stateOptions = useMemo(() => {
    return today.map(state => ({
      value: state.state,
      label: state.state
    })).sort((a, b) => a.label.localeCompare(b.label))
  }, [today])

  const selectedStateData = useMemo(() => {
    if (!selectedState) return null
    return today.find(s => s.state === selectedState)
  }, [today, selectedState])

  const chartData = useMemo(() => {
    const dataToUse = selectedState
      ? today.filter(s => s.state === selectedState)
      : today.slice(0, 10)

    return {
      labels: dataToUse.map(s => s.state),
      datasets: [
        {
          label: 'Cases',
          data: dataToUse.map(s => s.cases),
          backgroundColor: 'rgba(251, 191, 36, 0.7)',
          borderColor: 'rgb(251, 191, 36)',
          borderWidth: 1
        },
        {
          label: 'Deaths',
          data: dataToUse.map(s => s.deaths),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1
        },
        {
          label: 'Active',
          data: dataToUse.map(s => s.active),
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1
        }
      ]
    }
  }, [today, selectedState])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: selectedState ? `${selectedState} Statistics` : 'Top 10 States by Cases'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => value.toLocaleString()
        }
      }
    }
  }

  const tableColumns = [
    { key: 'state', label: 'State' },
    { key: 'cases', label: 'Cases' },
    { key: 'todayCases', label: 'Today' },
    { key: 'deaths', label: 'Deaths' },
    { key: 'todayDeaths', label: 'Deaths Today' },
    { key: 'active', label: 'Active' },
    { key: 'tests', label: 'Tests' },
    {
      key: 'testsPerOneMillion',
      label: 'Tests/1M',
      render: (val) => val?.toLocaleString() || 'N/A'
    }
  ]

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading US states data: {error}</span>
        <button className="btn btn-sm" onClick={() => {
          dispatch(fetchTodayStats())
          dispatch(fetchYesterdayStats())
        }}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">🇺🇸</span>
          US States Statistics
        </h2>

        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">All States (Top 10)</option>
          {stateOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {selectedStateData && (
        <StatsGrid columns={4}>
          <StatCard
            title="Total Cases"
            value={selectedStateData.cases}
            description={`+${selectedStateData.todayCases?.toLocaleString() || 0} today`}
            color="warning"
            loading={loading}
          />
          <StatCard
            title="Deaths"
            value={selectedStateData.deaths}
            description={`+${selectedStateData.todayDeaths?.toLocaleString() || 0} today`}
            color="error"
            loading={loading}
          />
          <StatCard
            title="Active Cases"
            value={selectedStateData.active}
            color="info"
            loading={loading}
          />
          <StatCard
            title="Tests"
            value={selectedStateData.tests}
            description={`${selectedStateData.testsPerOneMillion?.toLocaleString() || 0}/million`}
            color="success"
            loading={loading}
          />
        </StatsGrid>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Cases Comparison" loading={loading}>
          <Bar data={chartData} options={chartOptions} />
        </ChartCard>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">All US States Data</h3>
            <DataTable
              columns={tableColumns}
              data={today}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default USStatesStats
