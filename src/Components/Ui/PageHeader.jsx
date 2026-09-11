import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * Consistent page header: optional back link, eyebrow badge, title, subtitle,
 * and right-aligned action slot.
 */
export default function PageHeader({
  eyebrow,
  title,
  description,
  backTo,
  backLabel = "Back",
  actions,
  center = false,
}) {
  return (
    <header
      className={`anim-fade-up mb-10 ${center ? "text-center" : ""}`}
    >
      {backTo && (
        <Link
          to={backTo}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          {backLabel}
          <span className="sr-only">— navigate back</span>
        </Link>
      )}
      {eyebrow && (
        <span className="badge badge-rose mb-3 font-semibold uppercase tracking-wider">
          {eyebrow}
          {center && <span className="sr-only">section</span>}
        </span>
      )}
      <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
      {description && (
        <p
          className={`mt-2 text-sm leading-relaxed text-slate-400 sm:text-base ${
            center ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {description}
        </p>
      )}
      {actions && (
        <div className={`mt-6 flex flex-wrap gap-3 ${center ? "justify-center" : ""}`}>
          {actions}
        </div>
      )}
    </header>
  );
}
