"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type SpeechRecognitionEventLike = {
  resultIndex: number;
  results: ArrayLike<ArrayLike<{ transcript: string }>>;
};

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  onstart: (() => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type Recognition = typeof window extends {
  webkitSpeechRecognition: infer T;
}
  ? T
  : SpeechRecognitionLike;

type RecognitionCtor = new () => Recognition;

type VoiceFormProps = {
  followUpPrompt: string | null;
  isLoading: boolean;
  onSubmit: (payload: { text: string; followUp?: string | null }) => Promise<void>;
  setStatus: (value: string) => void;
  setError: (value: string) => void;
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

export default function VoiceForm({
  followUpPrompt,
  isLoading,
  onSubmit,
  setStatus,
  setError,
}: VoiceFormProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef<Recognition | null>(null);
  const transcriptRef = useRef("");

  const hasSpeechSupport = useMemo(() => !!getRecognizer(), []);

  useEffect(() => {
    if (!hasSpeechSupport) {
      setStatus("Voice input is not supported on this device. Type your symptoms below.");
    }
  }, [hasSpeechSupport, setStatus]);

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const startListening = () => {
    if (!hasSpeechSupport) {
      setError("Speech recognition is unavailable. Please type your symptoms.");
      return;
    }
    const Recognizer = getRecognizer();
    if (!Recognizer) {
      setError("Speech recognition is unavailable. Please type your symptoms.");
      return;
    }

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
        onSubmit({ text: transcriptRef.current, followUp: followUpPrompt });
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const onPrimaryClick = () => {
    if (isListening) {
      stopListening();
      return;
    }
    startListening();
  };

  const primaryLabel = isListening ? "Stop recording" : "Speak now";

  return (
    <div className="panel">
      <div className="panel-header">
        <h3>Voice triage</h3>
        <span className="hint">Hindi, Marathi, or English</span>
      </div>
      <button className="primary-action" onClick={onPrimaryClick} disabled={isLoading}>
        {primaryLabel}
      </button>
      {transcript ? <div className="status good">Heard: {transcript}</div> : null}
    </div>
  );
}
