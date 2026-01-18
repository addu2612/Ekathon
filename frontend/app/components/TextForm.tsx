"use client";

import { useState } from "react";
import type { FormEvent } from "react";

type TextFormProps = {
  followUpPrompt: string | null;
  isLoading: boolean;
  onSubmit: (payload: { text: string; followUp?: string | null }) => Promise<void>;
};

export default function TextForm({ followUpPrompt, isLoading, onSubmit }: TextFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit({ text: text.trim(), followUp: followUpPrompt });
  };

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <div className="panel-header">
        <h3>Type your symptoms</h3>
        <span className="hint">Short, simple sentences work best</span>
      </div>
      <textarea
        className="text-input"
        rows={4}
        placeholder="Example: My child has fever and cough since two days."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button className="secondary-action" type="submit" disabled={isLoading}>
        Get guidance
      </button>
    </form>
  );
}
