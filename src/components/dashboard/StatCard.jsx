import CountUp from 'react-countup'

const colorMap = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  accent: 'text-accent',
  info: 'text-info',
  success: 'text-success',
  warning: 'text-warning',
  error: 'text-error',
  neutral: 'text-base-content'
}

const bgColorMap = {
  primary: 'bg-primary/10',
  secondary: 'bg-secondary/10',
  accent: 'bg-accent/10',
  info: 'bg-info/10',
  success: 'bg-success/10',
  warning: 'bg-warning/10',
  error: 'bg-error/10',
  neutral: 'bg-base-200'
}

function StatCard({ title, value, description, color = 'primary', icon, loading = false }) {
  const textColor = colorMap[color] || colorMap.primary
  const bgColor = bgColorMap[color] || bgColorMap.primary

  if (loading) {
    return (
      <div className="card bg-base-100 shadow-md stat-card">
        <div className="card-body p-4">
          <div className="skeleton h-4 w-20 mb-2"></div>
          <div className="skeleton h-8 w-32 mb-1"></div>
          <div className="skeleton h-3 w-24"></div>
        </div>
      </div>
    )
  }

  return (
    <div className={`card bg-base-100 shadow-md stat-card border-l-4 border-${color}`}>
      <div className="card-body p-4">
        <div className="flex items-center justify-between">
          <h3 className="card-title text-sm font-medium text-base-content/70">{title}</h3>
          {icon && (
            <div className={`p-2 rounded-full ${bgColor}`}>
              <span className={textColor}>{icon}</span>
            </div>
          )}
        </div>
        <p className={`text-2xl md:text-3xl font-bold ${textColor} counter-value`}>
          {typeof value === 'number' ? (
            <CountUp end={value} separator="," duration={2} />
          ) : (
            value
          )}
        </p>
        {description && (
          <p className="text-xs text-base-content/60">{description}</p>
        )}
      </div>
    </div>
  )
}

export default StatCard
