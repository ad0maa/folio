import { useEffect, useMemo, useRef, useState } from "react";
import { copyText } from "../lib/copyText";

interface PaletteItem {
  group: string;
  label: string;
  hint?: string;
  href: string;
  external?: boolean;
  copyEmail?: boolean;
}

interface Props {
  items: PaletteItem[];
  email: string;
}

const GROUP_ORDER = ["Go to", "Projects", "Elsewhere"];

export default function CommandPalette({ items, email }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const matches = !q
      ? items
      : items.filter((item) =>
          `${item.label} ${item.hint ?? ""} ${item.group}`
            .toLowerCase()
            .includes(q),
        );
    return GROUP_ORDER.flatMap((group) =>
      matches.filter((item) => item.group === group),
    );
  }, [items, query]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query, open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      if (isMod && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape" && open) {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setCopied(false);
      triggerRef.current?.focus();
    }
  }, [open]);

  function activate(item: PaletteItem) {
    if (item.copyEmail) {
      copyText(email).then((ok) => {
        if (ok) setCopied(true);
      });
      window.setTimeout(() => setOpen(false), 500);
      return;
    }
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = item.href;
    }
    setOpen(false);
  }

  function onInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) activate(item);
    }
  }

  let runningIndex = -1;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded border border-panel-line bg-panel px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-signal hover:text-paper"
      >
        <span>Jump to</span>
        <kbd className="rounded border border-panel-line bg-ink px-1.5 py-0.5 text-[10px] text-signal">
          &#8984;K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-ink/80 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-lg border border-panel-line bg-panel shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-panel-line px-4 py-3">
              <span className="font-mono text-xs text-signal">&gt;</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKeyDown}
                placeholder="Jump to a section, project, or link…"
                aria-label="Search"
                className="w-full bg-transparent font-mono text-sm text-paper placeholder:text-muted focus:outline-none"
              />
              <kbd className="rounded border border-panel-line px-1.5 py-0.5 text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            <ul className="max-h-80 overflow-y-auto py-2" role="listbox">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-center font-mono text-xs text-muted">
                  No matches.
                </li>
              )}
              {GROUP_ORDER.map((group) => {
                const groupItems = filtered.filter((i) => i.group === group);
                if (groupItems.length === 0) return null;
                return (
                  <li key={group}>
                    <p className="px-4 pb-1 pt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">
                      {group}
                    </p>
                    <ul role="group">
                      {groupItems.map((item) => {
                        runningIndex += 1;
                        const index = runningIndex;
                        const active = index === activeIndex;
                        return (
                          <li key={`${item.group}-${item.label}`}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={active}
                              onMouseEnter={() => setActiveIndex(index)}
                              onClick={() => activate(item)}
                              className={`flex w-full items-center justify-between gap-4 px-4 py-2 text-left transition-colors ${
                                active
                                  ? "bg-ink text-paper"
                                  : "text-muted hover:bg-ink/60"
                              }`}
                            >
                              <span className="font-body text-sm">
                                {item.copyEmail && copied
                                  ? "Copied!"
                                  : item.label}
                              </span>
                              {item.hint && (
                                <span className="truncate font-mono text-xs text-muted">
                                  {item.hint}
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
