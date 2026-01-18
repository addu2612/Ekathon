import { TriageResult, urgencyLabels } from "./types";

type TriageResultCardProps = {
  result: TriageResult;
};

export default function TriageResultCard({ result }: TriageResultCardProps) {
  if (!result.summary) {
    return null;
  }

  return (
    <div className="result-card">
      <div className="result-header">
        <h2>Guidance</h2>
        <span className="badge">Care urgency: {urgencyLabels[result.urgency]}</span>
      </div>
      <div className="result-body">
        <p><strong>Summary:</strong> {result.summary}</p>
        <p><strong>Facility:</strong> {result.facility}</p>
        <p><strong>Next step:</strong> {result.next_step}</p>
      </div>
    </div>
  );
}
