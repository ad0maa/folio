import { useState } from "react";
import { copyText } from "../lib/copyText";

export default function CopyEmailButton({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyText(email);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="group inline-flex items-center gap-3 rounded border border-panel-line bg-panel px-4 py-3 font-mono text-sm text-paper transition-colors hover:border-signal"
      aria-live="polite"
    >
      <span>{copied ? "Copied to clipboard" : email}</span>
      <span aria-hidden="true" className="text-signal">
        {copied ? "✓" : "⧉"}
      </span>
    </button>
  );
}
