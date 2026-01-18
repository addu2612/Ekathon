import VoiceForm from "./components/VoiceForm";

export default function Home() {
  return (
    <main>
      <header className="header">
        <h1>Vani-Health Helpline</h1>
        <p>Speak your health concern. We will guide you to the right care.</p>
      </header>
      <section className="content">
        <div className="panel">
          <div className="status info">
            This service is for guidance only. It does not give diagnosis or treatment.
          </div>
        </div>
        <VoiceForm />
        <div className="panel">
          <h2>How to use</h2>
          <p>Press the green button and speak in Hindi, Marathi, or English.</p>
          <p>Share how long the problem is present and how serious it feels.</p>
        </div>
      </section>
      <footer className="footer">
        If you have chest pain, trouble breathing, heavy bleeding, fainting, or pregnancy problems, go to emergency care now.
      </footer>
    </main>
  );
}
