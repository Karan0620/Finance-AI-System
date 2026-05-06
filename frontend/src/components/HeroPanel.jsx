import { API_BASE_URL } from "../api";

export default function HeroPanel() {
  return (
    <section className="hero-panel">
      <div>
        <p className="label">Finance-AI-System</p>
        <h1>GenAI + Agentic AI + DevOps Control Center</h1>
        <p className="hero-copy">
          Monitor intelligent triage workflows, submit financial risk queries, and track
          ticket outcomes in one operational dashboard.
        </p>
        <div className="chips">
          <span>GenAI Analysis</span>
          <span>Agentic Workflows</span>
          <span>Ops Visibility</span>
        </div>
      </div>
      <div className="hero-metrics">
        <p className="label">Backend Endpoint</p>
        <p className="endpoint">{API_BASE_URL}</p>
      </div>
    </section>
  );
}
