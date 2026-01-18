export type TriageResult = {
  language: "hindi" | "marathi" | "english" | "unknown";
  summary: string;
  urgency: "LOW" | "MEDIUM" | "HIGH" | "UNKNOWN";
  facility: string;
  next_step: string;
  follow_up_question?: string;
};

export const urgencyLabels: Record<TriageResult["urgency"], string> = {
  LOW: "LOW",
  MEDIUM: "MEDIUM",
  HIGH: "HIGH",
  UNKNOWN: "UNKNOWN",
};

export const defaultResult: TriageResult = {
  language: "unknown",
  summary: "",
  urgency: "UNKNOWN",
  facility: "",
  next_step: "",
  follow_up_question: undefined,
};
