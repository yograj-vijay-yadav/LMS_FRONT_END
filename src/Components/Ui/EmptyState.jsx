import Button from "./Button";

/**
 * Consistent empty/error state block.
 * `variant="error"` renders the error styling; `retry` renders a retry button.
 */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  variant = "default",
  className = "",
}) {
  const isError = variant === "error";

  return (
    <div
      className={`anim-fade-up flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-14 text-center ${className}`}
      role="status"
    >
      {Icon && (
        <div
          className={`mb-4 flex size-14 items-center justify-center rounded-full ${
            isError
              ? "bg-red-500/10 text-red-400"
              : "bg-slate-800 text-slate-400"
          }`}
        >
          <Icon className="size-7" aria-hidden="true" />
        </div>
      )}
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && (
        <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      )}
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button
            variant={isError ? "secondary" : "primary"}
            onClick={onAction}
          >
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}
