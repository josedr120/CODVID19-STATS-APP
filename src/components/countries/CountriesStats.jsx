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
import { fetchAllCountries } from '../../store/slices/countriesSlice'
import StatCard from '../dashboard/StatCard'
import StatsGrid from '../dashboard/StatsGrid'
import ChartCard from '../dashboard/ChartCard'
import DataTable from '../dashboard/DataTable'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function CountriesStats() {
  const dispatch = useDispatch()
  const { data, loading, error } = useSelector(state => state.countries)
  const [selectedCountry, setSelectedCountry] = useState('')

  useEffect(() => {
    dispatch(fetchAllCountries())
  }, [dispatch])

  const countryOptions = useMemo(() => {
    return data.map(country => ({
      value: country.country,
      label: country.country
    })).sort((a, b) => a.label.localeCompare(b.label))
  }, [data])

  const selectedCountryData = useMemo(() => {
    if (!selectedCountry) return null
    return data.find(c => c.country === selectedCountry)
  }, [data, selectedCountry])

  const chartData = useMemo(() => {
    const dataToUse = selectedCountry
      ? data.filter(c => c.country === selectedCountry)
      : data.slice(0, 10)

    return {
      labels: dataToUse.map(c => c.country),
      datasets: [
        {
          label: 'Cases',
          data: dataToUse.map(c => c.cases),
          backgroundColor: 'rgba(251, 191, 36, 0.7)',
          borderColor: 'rgb(251, 191, 36)',
          borderWidth: 1
        },
        {
          label: 'Deaths',
          data: dataToUse.map(c => c.deaths),
          backgroundColor: 'rgba(239, 68, 68, 0.7)',
          borderColor: 'rgb(239, 68, 68)',
          borderWidth: 1
        },
        {
          label: 'Recovered',
          data: dataToUse.map(c => c.recovered),
          backgroundColor: 'rgba(34, 197, 94, 0.7)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1
        }
      ]
    }
  }, [data, selectedCountry])

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        text: selectedCountry ? `${selectedCountry} Statistics` : 'Top 10 Countries by Cases'
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
    {
      key: 'country',
      label: 'Country',
      render: (val, row) => (
        <div className="flex items-center gap-2">
          {row.countryInfo?.flag && (
            <img
              src={row.countryInfo.flag}
              alt={`${val} flag`}
              className="w-6 h-4 object-cover rounded"
            />
          )}
          <span>{val}</span>
        </div>
      )
    },
    { key: 'cases', label: 'Cases' },
    { key: 'todayCases', label: 'Today' },
    { key: 'deaths', label: 'Deaths' },
    { key: 'todayDeaths', label: 'Deaths Today' },
    { key: 'recovered', label: 'Recovered' },
    { key: 'active', label: 'Active' },
    { key: 'critical', label: 'Critical' }
  ]

  if (error) {
    return (
      <div className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Error loading countries data: {error}</span>
        <button className="btn btn-sm" onClick={() => dispatch(fetchAllCountries())}>
          Retry
        </button>
      </div>
    )
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold flex items-center gap-3">
          <span className="text-3xl">🌐</span>
          Countries Statistics
        </h2>

        <select
          className="select select-bordered w-full max-w-xs"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">All Countries (Top 10)</option>
          {countryOptions.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {selectedCountryData && (
        <>
          <div className="flex items-center gap-4 mb-4">
            {selectedCountryData.countryInfo?.flag && (
              <img
                src={selectedCountryData.countryInfo.flag}
                alt={`${selectedCountry} flag`}
                className="w-16 h-10 object-cover rounded shadow"
              />
            )}
            <div>
              <h3 className="text-xl font-bold">{selectedCountry}</h3>
              <p className="text-sm text-base-content/60">
                Continent: {selectedCountryData.continent || 'N/A'}
              </p>
            </div>
          </div>

          <StatsGrid columns={4}>
            <StatCard
              title="Total Cases"
              value={selectedCountryData.cases}
              description={`+${selectedCountryData.todayCases?.toLocaleString() || 0} today`}
              color="warning"
              loading={loading}
            />
            <StatCard
              title="Deaths"
              value={selectedCountryData.deaths}
              description={`+${selectedCountryData.todayDeaths?.toLocaleString() || 0} today`}
              color="error"
              loading={loading}
            />
            <StatCard
              title="Recovered"
              value={selectedCountryData.recovered}
              description={`+${selectedCountryData.todayRecovered?.toLocaleString() || 0} today`}
              color="success"
              loading={loading}
            />
            <StatCard
              title="Active Cases"
              value={selectedCountryData.active}
              description={`${selectedCountryData.critical?.toLocaleString() || 0} critical`}
              color="info"
              loading={loading}
            />
          </StatsGrid>

          <StatsGrid columns={4}>
            <StatCard
              title="Cases/Million"
              value={selectedCountryData.casesPerOneMillion}
              color="neutral"
              loading={loading}
            />
            <StatCard
              title="Deaths/Million"
              value={selectedCountryData.deathsPerOneMillion}
              color="neutral"
              loading={loading}
            />
            <StatCard
              title="Tests"
              value={selectedCountryData.tests}
              color="neutral"
              loading={loading}
            />
            <StatCard
              title="Tests/Million"
              value={selectedCountryData.testsPerOneMillion}
              color="neutral"
              loading={loading}
            />
          </StatsGrid>
        </>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Cases Comparison" loading={loading}>
          <Bar data={chartData} options={chartOptions} />
        </ChartCard>

        <div className="card bg-base-100 shadow-md">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">All Countries Data</h3>
            <DataTable
              columns={tableColumns}
              data={data}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default CountriesStats
