export default function TicketDetailDrawer({ ticket, loading, onClose }) {
  return (
    <aside className={`drawer ${ticket || loading ? "open" : ""}`}>
      <div className="drawer-header">
        <h3>Ticket Detail</h3>
        <button onClick={onClose}>Close</button>
      </div>

      {loading ? (
        <p className="drawer-empty">Fetching ticket detail...</p>
      ) : !ticket ? (
        <p className="drawer-empty">Pick a ticket to inspect AI output.</p>
      ) : (
        <div className="drawer-content">
          <section>
            <h4>Metadata</h4>
            <p>
              <strong>ID:</strong> {ticket.id}
            </p>
            <p>
              <strong>Status:</strong> {ticket.status}
            </p>
            <p>
              <strong>Created:</strong>{" "}
              {ticket.created_at ? new Date(ticket.created_at).toLocaleString() : "-"}
            </p>
          </section>

          <section>
            <h4>Original Query</h4>
            <p>{ticket.query}</p>
          </section>

          <section>
            <h4>Parsed Signals</h4>
            <pre>{JSON.stringify(ticket.parsed || {}, null, 2)}</pre>
          </section>

          <section>
            <h4>AI Response</h4>
            <pre>{ticket.ai_response || "No response was saved for this ticket."}</pre>
          </section>
        </div>
      )}
    </aside>
  );
}
