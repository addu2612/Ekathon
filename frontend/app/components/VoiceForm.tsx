"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type TriageResult = {
  language: "hindi" | "marathi" | "english" | "unknown";
  summary: string;
  urgency: "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";
  facility: string;
  next_step: string;
  follow_up_question?: string;
};

type Recognition = typeof window extends {
  webkitSpeechRecognition: infer T;
}
  ? T
  : SpeechRecognition;

type RecognitionCtor = new () => Recognition;

const urgencyLabels: Record<TriageResult["urgency"], string> = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  UNKNOWN: "UNKNOWN",
};

const defaultResult: TriageResult = {
  language: "unknown",
  summary: "",
  urgency: "UNKNOWN",
  facility: "",
  next_step: "",
  follow_up_question: undefined,
};

function getRecognizer(): RecognitionCtor | null {
  if (typeof window === "undefined") {
    return null;
  }
  const anyWindow = window as unknown as {
    webkitSpeechRecognition?: RecognitionCtor;
    SpeechRecognition?: RecognitionCtor;
  };
  return anyWindow.SpeechRecognition ?? anyWindow.webkitSpeechRecognition ?? null;
}

function safeParseJSON(text: string): TriageResult | null {
  try {
    return JSON.parse(text) as TriageResult;
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]) as TriageResult;
    } catch {
      return null;
    }
  }
}

export default function VoiceForm() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<TriageResult>(defaultResult);
  const [status, setStatus] = useState("Ready to listen.");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [followUpPrompt, setFollowUpPrompt] = useState<string | null>(null);
  const recognitionRef = useRef<Recognition | null>(null);
  const transcriptRef = useRef("");
  const apiBase = (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/$/, "");

  const hasSpeechSupport = useMemo(() => !!getRecognizer(), []);

  useEffect(() => {
    if (!hasSpeechSupport) {
      setStatus("Voice input is not supported on this device.");
    }
  }, [hasSpeechSupport]);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const startListening = () => {
    if (!hasSpeechSupport) return;
    const Recognizer = getRecognizer();
    if (!Recognizer) return;

    const recognition = new Recognizer();
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus("Listening... speak clearly.");
      setError("");
    };

    recognition.onerror = (event) => {
      setError(`Voice input error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        finalTranscript += event.results[i][0].transcript;
      }
      const cleaned = finalTranscript.trim();
      setTranscript(cleaned);
      transcriptRef.current = cleaned;
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatus("Recording stopped.");
      if (transcriptRef.current) {
        submitTranscript({ text: transcriptRef.current, followUp: followUpPrompt });
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const submitTranscript = async (payload: {
    text: string;
    followUp?: string | null;
  }) => {
    if (!payload.text) {
      setError("Please speak your symptoms first.");
      return;
    }
    setIsLoading(true);
    setStatus("Processing your request...");
    setError("");

    try {
      const response = await fetch(`${apiBase}/api/triage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const parsed = safeParseJSON(data?.result ?? "");
      if (!parsed) {
        throw new Error("Invalid response format");
      }

      setResult(parsed);
      setFollowUpPrompt(parsed.follow_up_question ?? null);
      setStatus("Guidance ready.");
    } catch (err) {
      setError("We could not process that. Please try again.");
      setStatus("Ready to listen.");
    } finally {
      setIsLoading(false);
    }
  };

  const onPrimaryClick = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening();
  };

  const primaryLabel = isListening ? "Stop recording" : "Press and speak";

  return (
    <div className="panel">
      <div className="status info">{status}</div>
      <button className="primary-action" onClick={onPrimaryClick} disabled={!hasSpeechSupport || isLoading}>
        {primaryLabel}
      </button>
      {followUpPrompt ? (
        <div className="status info">
          {followUpPrompt}
        </div>
      ) : null}
      {transcript ? (
        <div className="status good">Heard: {transcript}</div>
      ) : null}
      {error ? <div className="status info">{error}</div> : null}
      {result.summary ? (
        <div className="result">
          <h2>Guidance</h2>
          <p><span className="badge">Care urgency: {urgencyLabels[result.urgency]}</span></p>
          <p><strong>Summary:</strong> {result.summary}</p>
          <p><strong>Facility:</strong> {result.facility}</p>
          <p><strong>Next step:</strong> {result.next_step}</p>
        </div>
      ) : null}
    </div>
  );
}
