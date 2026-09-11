import { Compass } from "lucide-react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-slate-950 px-4 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="anim-fade-up relative">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400">
          <Compass className="size-8" aria-hidden="true" />
        </div>
        <h1 className="mt-6 font-display text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
          404
        </h1>
        <p className="mt-3 text-lg font-medium text-slate-200">
          Page not found
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
          The page you&rsquo;re looking for doesn&rsquo;t exist or may have been moved.
          Check the URL or head back to explore the courses.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link to="/" className="btn btn-primary">
            Go home
          </Link>
          <Link to="/courses" className="btn btn-secondary">
            Browse courses
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
