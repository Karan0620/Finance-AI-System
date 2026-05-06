const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "http://localhost:8000";

async function parseResponse(response) {
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.detail || "Something went wrong while calling the API.");
  }
  return payload;
}

export async function createTicket(query) {
  const response = await fetch(`${API_BASE_URL}/api/v1/triage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query })
  });
  return parseResponse(response);
}

export async function fetchStats() {
  const response = await fetch(`${API_BASE_URL}/api/v1/stats`);
  return parseResponse(response);
}

export async function fetchTickets(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      query.set(key, String(value));
    }
  });

  const response = await fetch(`${API_BASE_URL}/api/v1/tickets?${query.toString()}`);
  return parseResponse(response);
}

export async function fetchTicketDetail(ticketId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/tickets/${ticketId}`);
  return parseResponse(response);
}

export { API_BASE_URL };
