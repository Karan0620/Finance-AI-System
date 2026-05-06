import { useEffect, useMemo, useState } from "react";
import {
  createTicket,
  fetchStats,
  fetchTicketDetail,
  fetchTickets
} from "./api";
import HeroPanel from "./components/HeroPanel";
import QueryForm from "./components/QueryForm";
import StatsCards from "./components/StatsCards";
import TicketDetailDrawer from "./components/TicketDetailDrawer";
import TicketsTable from "./components/TicketsTable";

const defaultFilters = {
  page: 1,
  per_page: 8,
  status: "",
  category: "",
  urgency: ""
};

export default function App() {
  const [stats, setStats] = useState({});
  const [tickets, setTickets] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState(defaultFilters);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [isTicketsLoading, setIsTicketsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isDrawerLoading, setIsDrawerLoading] = useState(false);
  const [banner, setBanner] = useState({ type: "", message: "" });

  const requestParams = useMemo(
    () => ({
      page: filters.page,
      per_page: filters.per_page,
      status: filters.status || undefined,
      category: filters.category || undefined,
      urgency: filters.urgency || undefined
    }),
    [filters]
  );

  async function loadStats() {
    setIsStatsLoading(true);
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (error) {
      setBanner({ type: "error", message: error.message });
    } finally {
      setIsStatsLoading(false);
    }
  }

  async function loadTickets() {
    setIsTicketsLoading(true);
    try {
      const data = await fetchTickets(requestParams);
      setTickets(data.tickets || []);
      setTotalPages(data.total_pages || 1);
    } catch (error) {
      setBanner({ type: "error", message: error.message });
    } finally {
      setIsTicketsLoading(false);
    }
  }

  useEffect(() => {
    loadStats();
  }, []);

  useEffect(() => {
    loadTickets();
  }, [requestParams]);

  useEffect(() => {
    const interval = setInterval(() => {
      loadStats();
      loadTickets();
    }, 30000);

    return () => clearInterval(interval);
  }, [requestParams]);

  async function handleCreateTicket(query) {
    setIsSubmitting(true);
    try {
      const result = await createTicket(query);
      setBanner({
        type: "success",
        message: `Ticket ${result.ticket_id} created successfully with status ${result.status}.`
      });
      await Promise.all([loadStats(), loadTickets()]);
    } catch (error) {
      setBanner({ type: "error", message: error.message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleViewTicket(ticketId) {
    setIsDrawerLoading(true);
    try {
      const detail = await fetchTicketDetail(ticketId);
      setSelectedTicket(detail);
    } catch (error) {
      setBanner({ type: "error", message: error.message });
      setSelectedTicket(null);
    } finally {
      setIsDrawerLoading(false);
    }
  }

  function handleFilterChange(nextFilterState) {
    setFilters((prev) => ({ ...prev, ...nextFilterState }));
  }

  return (
    <main className="app-shell">
      <HeroPanel />

      {banner.message && (
        <p className={`banner ${banner.type}`}>
          {banner.message}
          <button onClick={() => setBanner({ type: "", message: "" })}>Dismiss</button>
        </p>
      )}

      <StatsCards stats={stats} loading={isStatsLoading} />

      <div className="grid-layout">
        <QueryForm onSubmit={handleCreateTicket} isSubmitting={isSubmitting} />
        <TicketsTable
          tickets={tickets}
          loading={isTicketsLoading}
          filters={filters}
          onFilterChange={handleFilterChange}
          onViewTicket={handleViewTicket}
          page={filters.page}
          totalPages={totalPages}
          onPageChange={(page) => handleFilterChange({ page })}
        />
      </div>

      <TicketDetailDrawer
        ticket={selectedTicket}
        loading={isDrawerLoading}
        onClose={() => setSelectedTicket(null)}
      />
    </main>
  );
}
