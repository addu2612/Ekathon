"use client";

import Link from "next/link";
import TextForm from "../components/TextForm";
import VoiceForm from "../components/VoiceForm";
import TriageResultCard from "../components/triage/TriageResultCard";
import TriageStatus from "../components/triage/TriageStatus";
import { useTriage } from "../components/triage/useTriage";

export default function HelplinePage() {
  const triage = useTriage();

  return (
    <main className="helpline">
      <header className="helpline-header">
        <div>
          <p className="eyebrow">Vani-Health Helpline</p>
          <h1>Speak or type your health concern.</h1>
          <p className="lede">We guide you to the right level of care. No diagnosis, only guidance.</p>
        </div>
        <Link className="text-link" href="/">
          Back to landing
        </Link>
      </header>

      <section className="helpline-grid">
        <div className="panel intro-card">
          <h3>Before you start</h3>
          <p>Share how long the problem has been present and how serious it feels.</p>
          <div className="chip-row">
            <span>Fever</span>
            <span>Breathing</span>
            <span>Pregnancy</span>
            <span>Injury</span>
          </div>
        </div>
        <TriageStatus
          status={triage.status}
          followUpPrompt={triage.followUpPrompt}
          error={triage.error}
        />
        <VoiceForm
          followUpPrompt={triage.followUpPrompt}
          isLoading={triage.isLoading}
          onSubmit={triage.submitTranscript}
          setStatus={triage.setStatus}
          setError={triage.setError}
        />
        <TextForm
          followUpPrompt={triage.followUpPrompt}
          isLoading={triage.isLoading}
          onSubmit={triage.submitTranscript}
        />
        <TriageResultCard result={triage.result} />
        <div className="panel tips-card">
          <h3>Call tips</h3>
          <ul>
            <li>Use short sentences.</li>
            <li>Say when it started.</li>
            <li>Share any red flags.</li>
          </ul>
        </div>
      </section>

      <footer className="helpline-footer">
        If you have chest pain, trouble breathing, heavy bleeding, fainting, or pregnancy problems, go to emergency care now.
      </footer>
    </main>
  );
}
