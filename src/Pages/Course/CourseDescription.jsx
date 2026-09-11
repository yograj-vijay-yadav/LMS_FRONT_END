import { BookOpen, GraduationCap, PlayCircle, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import EmptyState from "../../Components/Ui/EmptyState";
import HomeLayout from "../../Layouts/HomeLayout";

function CourseDescription() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { role, data } = useSelector((state) => state.auth);

  const hasAccess =
    role === "ADMIN" || data?.subscription?.status === "active";

  // Course data is passed via navigation state; without it there is nothing to show
  if (!state) {
    return (
      <HomeLayout>
        <div className="container-page py-20">
          <EmptyState
            icon={BookOpen}
            title="Course not found"
            description="We couldn&rsquo;t find the course you&rsquo;re looking for. Browse the catalog to pick a course."
            actionLabel="Browse courses"
            onAction={() => navigate("/courses")}
          />
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="container-page py-12">
        {/* Breadcrumb */}
        <nav className="anim-fade-up mb-8 flex items-center gap-2 text-sm text-slate-500" aria-label="Breadcrumb">
          <Link to="/courses" className="transition-colors hover:text-slate-300">
            Courses
          </Link>
          <span aria-hidden="true">/</span>
          <span className="max-w-[16rem] truncate text-slate-300">{state?.title}</span>
        </nav>

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Left: thumbnail + CTA card */}
          <div className="anim-fade-up card overflow-hidden p-0">
            <img
              src={state?.thumbnail?.secure_url}
              alt={`Thumbnail for ${state?.title}`}
              className="aspect-video w-full object-cover"
            />
            <div className="space-y-5 p-6">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span className="flex items-center gap-2">
                  <PlayCircle className="size-4.5 text-rose-400" aria-hidden="true" />
                  {state?.numberOfLectures || state?.numberoflectures || 0} lectures
                </span>
                <span className="flex items-center gap-2">
                  <GraduationCap className="size-4.5 text-rose-400" aria-hidden="true" />
                  <span className="max-w-[12rem] truncate">{state?.createdBy}</span>
                </span>
              </div>

              {hasAccess ? (
                <button
                  type="button"
                  onClick={() =>
                    navigate("/course/displaylectures", { state: { ...state } })
                  }
                  className="btn btn-primary w-full py-3 text-base"
                >
                  <PlayCircle className="size-5" aria-hidden="true" />
                  Start watching
                </button>
              ) : (
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => navigate("/checkout")}
                    className="btn btn-primary w-full py-3 text-base"
                  >
                    <Sparkles className="size-5" aria-hidden="true" />
                    Subscribe to unlock
                  </button>
                  <p className="text-center text-xs text-slate-500">
                    One subscription unlocks every course on the platform.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right: course info */}
          <div className="anim-fade-up" style={{ animationDelay: "80ms" }}>
            <span className="badge badge-rose">{state?.category}</span>
            <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              {state?.title}
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Created by{" "}
              <span className="font-medium text-slate-200">{state?.createdBy}</span>
            </p>

            <div className="mt-8">
              <h2 className="text-lg font-semibold">Course description</h2>
              <p className="mt-3 leading-relaxed text-slate-300">
                {state?.description}
              </p>
            </div>

            <div className="card mt-8 p-5">
              <h3 className="text-sm font-semibold text-white">
                What&rsquo;s included
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-400">
                <li className="flex items-center gap-2">
                  <PlayCircle className="size-4 shrink-0 text-rose-400" aria-hidden="true" />
                  {state?.numberOfLectures || state?.numberoflectures || 0} structured video lectures
                </li>
                <li className="flex items-center gap-2">
                  <Sparkles className="size-4 shrink-0 text-rose-400" aria-hidden="true" />
                  Full lifetime access while your subscription is active
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="size-4 shrink-0 text-rose-400" aria-hidden="true" />
                  Guidance from {state?.createdBy}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;
