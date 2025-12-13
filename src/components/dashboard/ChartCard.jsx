function ChartCard({ title, children, loading = false }) {
  if (loading) {
    return (
      <div className="card bg-base-100 shadow-md">
        <div className="card-body">
          <div className="skeleton h-6 w-48 mb-4"></div>
          <div className="skeleton h-64 w-full"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        {title && <h2 className="card-title text-lg mb-4">{title}</h2>}
        <div className="chart-container">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ChartCard
