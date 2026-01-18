type TriageStatusProps = {
  status: string;
  followUpPrompt: string | null;
  error: string;
};

export default function TriageStatus({ status, followUpPrompt, error }: TriageStatusProps) {
  return (
    <div className="status-stack">
      <div className="status info">{status}</div>
      {followUpPrompt ? <div className="status info">{followUpPrompt}</div> : null}
      {error ? <div className="status warn">{error}</div> : null}
    </div>
  );
}
