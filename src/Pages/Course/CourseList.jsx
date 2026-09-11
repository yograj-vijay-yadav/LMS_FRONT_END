import { BookOpen, RefreshCw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CourseCard from "../../Components/CourseCard";
import CourseCardSkeleton from "../../Components/Ui/CourseCardSkeleton";
import EmptyState from "../../Components/Ui/EmptyState";
import HomeLayout from "../../Layouts/HomeLayout";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";

function CourseList() {
  const dispatch = useDispatch();
  const { courseData } = useSelector((state) => state.course);

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  async function loadCourses() {
    setIsLoading(true);
    setHasError(false);
    const result = await dispatch(getAllCourses());
    if (!result?.payload) {
      setHasError(true);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    loadCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Categories derived only from what the backend actually returns
  const categories = useMemo(() => {
    const unique = [
      ...new Set(courseData.map((course) => course?.category).filter(Boolean)),
    ];
    return ["All", ...unique.sort()];
  }, [courseData]);

  const visibleCourses = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return courseData.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course?.category === selectedCategory;
      const matchesQuery =
        !query ||
        course?.title?.toLowerCase().includes(query) ||
        course?.description?.toLowerCase().includes(query) ||
        course?.createdBy?.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [courseData, searchQuery, selectedCategory]);

  return (
    <HomeLayout>
      <div className="container-page min-h-[80vh] py-14">
        {/* Header */}
        <div className="anim-fade-up mb-10 text-center">
          <span className="badge badge-rose font-semibold uppercase tracking-wider">
            Catalog
          </span>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Explore courses by industry experts
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400">
            Structured, practical courses designed to take you from where you
            are to where you want to be.
          </p>
        </div>

        {/* Search + filters */}
        {!isLoading && !hasError && courseData.length > 0 && (
          <div className="anim-fade-up mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search courses..."
                aria-label="Search courses"
                className="input pl-10"
              />
            </div>

            {categories.length > 2 && (
              <div
                className="flex flex-wrap items-center gap-2"
                role="group"
                aria-label="Filter by category"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                      selectedCategory === category
                        ? "bg-rose-600 text-white"
                        : "bg-slate-800/70 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content states */}
        {isLoading ? (
          <div className="grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <CourseCardSkeleton key={index} />
            ))}
          </div>
        ) : hasError ? (
          <EmptyState
            variant="error"
            icon={RefreshCw}
            title="Couldn't load courses"
            description="We had trouble reaching the server. Check your connection and try again."
            actionLabel="Retry"
            onAction={loadCourses}
          />
        ) : courseData.length === 0 ? (
          <EmptyState
            icon={BookOpen}
            title="No courses published yet"
            description="Courses will appear here as soon as instructors publish them. Check back soon!"
          />
        ) : visibleCourses.length === 0 ? (
          <EmptyState
            icon={Search}
            title="No matching courses"
            description={`No courses match "${
              searchQuery || selectedCategory
            }". Try a different search or category.`}
            actionLabel="Clear filters"
            onAction={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          />
        ) : (
          <div className="stagger grid justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course) => (
              <CourseCard key={course._id} data={course} />
            ))}
          </div>
        )}
      </div>
    </HomeLayout>
  );
}

export default CourseList;
