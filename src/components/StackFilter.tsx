import { useEffect, useState } from "react";

interface Props {
  tags: string[];
  targetId: string;
}

/**
 * Progressive enhancement: the page renders every card as static HTML, this
 * island only toggles visibility. With JS off, everything stays visible.
 */
export default function StackFilter({ tags, targetId }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState<number | null>(null);

  useEffect(() => {
    const container = document.getElementById(targetId);
    if (!container) return;

    let visible = 0;
    container.querySelectorAll<HTMLElement>("[data-stack]").forEach((card) => {
      const match =
        !active || (card.dataset.stack ?? "").split("|").includes(active);
      card.hidden = !match;
      if (match) visible += 1;
    });

    container.querySelectorAll<HTMLElement>("[data-group]").forEach((group) => {
      const anyVisible = Array.from(
        group.querySelectorAll<HTMLElement>("[data-stack]"),
      ).some((card) => !card.hidden);
      group.hidden = !anyVisible;
    });

    setShown(active ? visible : null);
  }, [active, targetId]);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter by technology"
        className="flex flex-wrap gap-2"
      >
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => setActive(null)}
          className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
            active === null
              ? "border-signal bg-signal text-ink"
              : "border-panel-line text-muted hover:border-trace hover:text-paper"
          }`}
        >
          Everything
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            aria-pressed={active === tag}
            onClick={() => setActive(active === tag ? null : tag)}
            className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
              active === tag
                ? "border-signal bg-signal text-ink"
                : "border-panel-line text-muted hover:border-trace hover:text-paper"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <p aria-live="polite" className="mt-3 font-mono text-[11px] text-muted">
        {shown === null
          ? " "
          : `${shown} ${shown === 1 ? "entry" : "entries"} using ${active}`}
      </p>
    </div>
  );
}
