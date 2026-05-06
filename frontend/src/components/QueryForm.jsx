import { useState } from "react";

const samplePrompts = [
  "A customer transferred 75,000 INR to a new beneficiary at midnight and requested urgent reversal.",
  "Flag unusual repeated withdrawals under 10,000 INR from linked cards in a 2-hour window.",
  "Detect suspicious trade settlement mismatch with amount variance above expected thresholds."
];

export default function QueryForm({ onSubmit, isSubmitting }) {
  const [query, setQuery] = useState(samplePrompts[0]);
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!query.trim()) {
      setError("Please enter a query before triaging.");
      return;
    }
    setError("");
    onSubmit(query.trim());
  }

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Create New Triage Ticket</h2>
        <span className="pill">Agentic intake</span>
      </div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          rows={5}
          placeholder="Describe a financial event or customer query..."
        />
        {error && <p className="error-text">{error}</p>}
        <div className="form-actions">
          <label>
            Quick template:
            <select onChange={(e) => setQuery(e.target.value)} value={query}>
              {samplePrompts.map((prompt) => (
                <option key={prompt} value={prompt}>
                  {prompt.slice(0, 70)}...
                </option>
              ))}
            </select>
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Triaging..." : "Submit to AI Triage"}
          </button>
        </div>
      </form>
    </section>
  );
}
