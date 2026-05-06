function StatCard({ title, value, tone }) {
  return (
    <article className={`stat-card ${tone}`}>
      <p>{title}</p>
      <h3>{value}</h3>
    </article>
  );
}

export default function StatsCards({ stats, loading }) {
  if (loading) {
    return <section className="stats-grid loading-card">Loading ticket analytics...</section>;
  }

  const urgencyItems = [
    { name: "High", value: stats.high || 0, className: "high" },
    { name: "Medium", value: stats.medium || 0, className: "medium" },
    { name: "Low", value: stats.low || 0, className: "low" }
  ];

  const maxCount = Math.max(...urgencyItems.map((item) => item.value), 1);

  return (
    <>
      <section className="stats-grid">
        <StatCard title="Total Tickets" value={stats.total ?? 0} tone="neutral" />
        <StatCard title="High Urgency" value={stats.high ?? 0} tone="danger" />
        <StatCard title="Medium Urgency" value={stats.medium ?? 0} tone="warning" />
        <StatCard title="Low Urgency" value={stats.low ?? 0} tone="success" />
      </section>

      <section className="urgency-visual">
        <h3>Urgency Distribution</h3>
        {urgencyItems.map((item) => {
          const width = (item.value / maxCount) * 100;
          return (
            <div key={item.name} className="urgency-row">
              <span>{item.name}</span>
              <div className="urgency-bar-track">
                <div
                  className={`urgency-bar ${item.className}`}
                  style={{ width: `${width}%` }}
                  aria-label={`${item.name} urgency volume bar`}
                />
              </div>
              <strong>{item.value}</strong>
            </div>
          );
        })}
      </section>
    </>
  );
}
