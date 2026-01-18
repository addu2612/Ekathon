import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="landing">
      <div className="landing-bg" aria-hidden="true" />
      <header className="landing-header">
        <p className="eyebrow">Vani-Health</p>
        <nav className="nav-links">
          <Link href="/helpline">Helpline</Link>
          <a href="#how">How it works</a>
          <a href="#impact">Impact</a>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <h1>Voice-first guidance for healthcare access in India.</h1>
          <p>
            Speak your symptoms in Hindi, Marathi, or English. We route you to the right level of care without diagnosis or
            treatment.
          </p>
          <div className="hero-actions">
            <Link className="cta" href="/helpline">
              Start the helpline
            </Link>
            <a className="ghost" href="#how">
              See how it works
            </a>
          </div>
          <div className="hero-badges">
            <span>Fast triage guidance</span>
            <span>Local facility mapping</span>
            <span>Simple, calm language</span>
          </div>
          <div className="hero-metrics">
            <div>
              <h3>3+</h3>
              <p>Languages supported</p>
            </div>
            <div>
              <h3>1</h3>
              <p>Clear next step</p>
            </div>
            <div>
              <h3>0</h3>
              <p>Diagnosis or treatment</p>
            </div>
          </div>
        </div>
        <div className="hero-card">
          <h2>What you get</h2>
          <ul>
            <li>One clear next step tailored to urgency.</li>
            <li>Community-level facility recommendations.</li>
            <li>Follow-up question if symptoms are unclear.</li>
          </ul>
          <div className="hero-card-tag">Built for low-bandwidth, high-trust settings.</div>
        </div>
      </section>

      <section id="how" className="steps">
        <h2>How it works</h2>
        <div className="step-grid">
          <div className="step">
            <span>01</span>
            <h3>Speak or type</h3>
            <p>Describe what you feel and how long it has been happening.</p>
          </div>
          <div className="step">
            <span>02</span>
            <h3>Get urgency</h3>
            <p>We check for red flags and assign an urgency tier.</p>
          </div>
          <div className="step">
            <span>03</span>
            <h3>Go to care</h3>
            <p>Receive the most appropriate facility and next step.</p>
          </div>
        </div>
      </section>

      <section id="impact" className="impact">
        <div>
          <h2>Designed for real-world constraints.</h2>
          <p>
            Vani-Health delivers a calm, consistent triage experience so callers know where to go next, even when they are
            unsure or anxious.
          </p>
        </div>
        <div className="impact-grid">
          <div>
            <h3>Vernacular first</h3>
            <p>Built for Hindi, Marathi, and English speakers.</p>
          </div>
          <div>
            <h3>Low bandwidth</h3>
            <p>Short responses that load quickly and guide action.</p>
          </div>
          <div>
            <h3>Safety focused</h3>
            <p>Explicit escalation for emergency symptoms.</p>
          </div>
        </div>
      </section>

      <section className="signal">
        <div className="signal-card">
          <h2>Signals we listen for</h2>
          <p>Chest pain, breathlessness, heavy bleeding, fainting, or pregnancy complications trigger urgent escalation.</p>
        </div>
        <div className="signal-card">
          <h2>Signals we avoid</h2>
          <p>No diagnosis. No treatment or medication advice. Just the right place to go next.</p>
        </div>
      </section>

      <section className="cta-band">
        <div>
          <h2>Ready to start?</h2>
          <p>Open the helpline and tell us what is happening.</p>
        </div>
        <Link className="cta" href="/helpline">
          Launch helpline
        </Link>
      </section>

      <footer className="landing-footer">
        <p>Vani-Health provides guidance, not diagnosis or treatment.</p>
      </footer>
    </main>
  );
}
