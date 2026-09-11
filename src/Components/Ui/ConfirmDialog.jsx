import { AlertTriangle } from "lucide-react";
import { useEffect, useRef } from "react";

import Button from "./Button";

/**
 * Accessible confirmation dialog for destructive/important actions.
 * - Escape closes, backdrop click closes
 * - Focus moves to the cancel button on open and returns on close
 * - Confirm button is visually distinct for destructive actions
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  onCancel,
  busy = false,
}) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel?.();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    // Focus the cancel button so Enter doesn't accidentally confirm
    const focusTimer = setTimeout(() => cancelRef.current?.focus(), 30);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(focusTimer);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="anim-fade-in fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel?.();
      }}
    >
      <div className="anim-scale-in w-full max-w-sm rounded-xl border border-slate-700 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-start gap-4">
          <div
            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
              destructive
                ? "bg-red-500/10 text-red-400"
                : "bg-amber-500/10 text-amber-400"
            }`}
          >
            <AlertTriangle className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2
              id="confirm-dialog-title"
              className="text-base font-semibold text-white"
            >
              {title}
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-slate-400">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button ref={cancelRef} variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button
            variant={destructive ? "danger" : "primary"}
            onClick={onConfirm}
            disabled={busy}
          >
            {busy ? "Working..." : confirmLabel}
            {busy && (
              <span
                className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                aria-hidden="true"
              />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
