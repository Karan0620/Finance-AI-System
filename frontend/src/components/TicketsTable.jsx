const statusOptions = ["", "PROCESSING", "COMPLETED", "FAILED"];
const categoryOptions = ["", "fraud", "payment_issue", "account", "compliance", "other"];
const urgencyOptions = ["", "high", "medium", "low"];

function Badge({ text, type }) {
  return <span className={`badge ${type || "neutral"}`}>{text || "N/A"}</span>;
}

export default function TicketsTable({
  tickets,
  loading,
  filters,
  onFilterChange,
  onViewTicket,
  page,
  totalPages,
  onPageChange
}) {
  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Tickets Pipeline</h2>
        <span className="pill">Realtime operations</span>
      </div>

      <div className="filters">
        <label>
          Status
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ ...filters, status: e.target.value, page: 1 })}
          >
            {statusOptions.map((option) => (
              <option key={option || "all"} value={option}>
                {option || "All"}
              </option>
            ))}
          </select>
        </label>
        <label>
          Category
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value, page: 1 })}
          >
            {categoryOptions.map((option) => (
              <option key={option || "all"} value={option}>
                {option || "All"}
              </option>
            ))}
          </select>
        </label>
        <label>
          Urgency
          <select
            value={filters.urgency}
            onChange={(e) => onFilterChange({ ...filters, urgency: e.target.value, page: 1 })}
          >
            {urgencyOptions.map((option) => (
              <option key={option || "all"} value={option}>
                {option || "All"}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Query</th>
              <th>Status</th>
              <th>Category</th>
              <th>Urgency</th>
              <th>Amount</th>
              <th>Date</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7}>Loading tickets...</td>
              </tr>
            ) : tickets.length === 0 ? (
              <tr>
                <td colSpan={7}>No tickets match these filters.</td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="query-cell">{ticket.query}</td>
                  <td>
                    <Badge text={ticket.status} type="status" />
                  </td>
                  <td>
                    <Badge text={ticket.category} />
                  </td>
                  <td>
                    <Badge text={ticket.urgency} type={ticket.urgency} />
                  </td>
                  <td>{ticket.amount ?? "-"}</td>
                  <td>{ticket.date ? new Date(ticket.date).toLocaleString() : "-"}</td>
                  <td>
                    <button className="link-button" onClick={() => onViewTicket(ticket.id)}>
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} / {totalPages}
        </span>
        <button disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </section>
  );
}
