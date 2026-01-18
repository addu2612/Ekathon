"use client";

import { useMemo, useState } from "react";
import { defaultResult, TriageResult } from "./types";

type SubmitPayload = {
  text: string;
  followUp?: string | null;
};

type UseTriageState = {
  status: string;
  error: string;
  isLoading: boolean;
  followUpPrompt: string | null;
  result: TriageResult;
  submitTranscript: (payload: SubmitPayload) => Promise<void>;
  setStatus: (value: string) => void;
  setError: (value: string) => void;
};

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

export function useTriage(): UseTriageState {
  const [status, setStatus] = useState("Ready to listen.");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [followUpPrompt, setFollowUpPrompt] = useState<string | null>(null);
  const [result, setResult] = useState<TriageResult>(defaultResult);

  const apiBase = useMemo(
    () => (process.env.NEXT_PUBLIC_API_BASE ?? "").replace(/\/$/, ""),
    []
  );

  const submitTranscript = async (payload: SubmitPayload) => {
    if (!payload.text) {
      setError("Please share your symptoms first.");
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
    } catch {
      setError("We could not process that. Please try again.");
      setStatus("Ready to listen.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    status,
    error,
    isLoading,
    followUpPrompt,
    result,
    submitTranscript,
    setStatus,
    setError,
  };
}
