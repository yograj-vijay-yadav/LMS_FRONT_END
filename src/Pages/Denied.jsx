import { ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

function Denied() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="anim-fade-up relative">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
          <ShieldAlert className="size-8" aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-display text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
          403
        </h1>
        <p className="mt-3 text-lg font-medium text-slate-200">
          Access denied
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
          You don&rsquo;t have permission to view this page. If you believe this is a
          mistake, try signing in with an account that has the right access.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
          <Link to="/login" className="btn btn-secondary">
            Switch account
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Denied;
