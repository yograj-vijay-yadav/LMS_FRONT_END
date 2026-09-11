import { GraduationCap, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
  const navigate = useNavigate();

  function openCourse() {
    navigate("/course/description/", { state: { ...data } });
  }

  return (
    <button
      type="button"
      onClick={openCourse}
      aria-label={`View course: ${data?.title}`}
      className="card card-interactive group w-full max-w-[22rem] overflow-hidden p-0 text-left focus-visible:-translate-y-1"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={data?.thumbnail?.secure_url}
          alt={`Thumbnail for ${data?.title}`}
          loading="lazy"
        />
        <span className="badge badge-slate absolute left-3 top-3 bg-slate-950/80 backdrop-blur-sm">
          {data?.category}
        </span>
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <PlayCircle className="size-12 text-white/90" aria-hidden="true" />
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2.5 p-5">
        <h3 className="line-clamp-2 text-base font-semibold text-white transition-colors group-hover:text-rose-400">
          {data?.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-slate-400">
          {data?.description}
        </p>

        <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <GraduationCap className="size-4 text-slate-500" aria-hidden="true" />
            <span className="max-w-[9rem] truncate">{data?.createdBy}</span>
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-300">
            <PlayCircle className="size-4 text-slate-500" aria-hidden="true" />
            {data?.numberOfLectures || data?.numberoflectures || 0} lectures
          </span>
        </div>
      </div>
    </button>
  );
}

export default CourseCard;
