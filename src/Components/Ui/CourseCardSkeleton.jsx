/**
 * Skeleton placeholders that mirror the CourseCard layout.
 * Used while course data is loading.
 */
export default function CourseCardSkeleton() {
  return (
    <div
      className="card w-full max-w-[22rem] overflow-hidden p-0"
      aria-hidden="true"
    >
      <div className="skeleton aspect-video w-full rounded-b-none" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-3.5 w-full" />
        <div className="skeleton h-3.5 w-2/3" />
        <div className="flex items-center justify-between pt-3">
          <div className="skeleton h-3.5 w-24" />
          <div className="skeleton h-3.5 w-16" />
        </div>
      </div>
    </div>
  );
}
