import {
  ChevronLeft,
  ChevronRight,
  ListVideo,
  Plus,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import ConfirmDialog from "../../Components/Ui/ConfirmDialog";
import EmptyState from "../../Components/Ui/EmptyState";
import HomeLayout from "../../Layouts/HomeLayout";
import {
  deleteCourseLecture,
  getCourseLectures,
} from "../../Redux/Slices/LectureSlice";

function DisplayLectures() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { lectures } = useSelector((state) => state.lecture);
  const { role } = useSelector((state) => state.auth);

  const [currentVideo, setCurrentVideo] = useState(0);
  const [lectureToDelete, setLectureToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  async function confirmDelete() {
    if (!lectureToDelete) return;
    setIsDeleting(true);
    await dispatch(
      deleteCourseLecture({
        courseId: state._id,
        lectureId: lectureToDelete._id,
      })
    );
    await dispatch(getCourseLectures(state._id));
    setIsDeleting(false);
    setLectureToDelete(null);
    setCurrentVideo(0);
  }

  useEffect(() => {
    if (!state) {
      navigate("/courses");
      return;
    }
    async function loadLectures() {
      setIsLoading(true);
      await dispatch(getCourseLectures(state._id));
      setIsLoading(false);
    }
    loadLectures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lectures not loaded yet
  if (!state) return null;

  const hasLectures = lectures && lectures.length > 0;
  const currentLecture = hasLectures ? lectures[currentVideo] : null;

  if (isLoading) {
    return (
      <HomeLayout>
        <div
          className="container-page flex min-h-[70vh] flex-col items-center justify-center gap-4"
          role="status"
          aria-live="polite"
        >
          <span
            className="inline-block size-8 animate-spin rounded-full border-2 border-slate-700 border-t-rose-500"
            aria-hidden="true"
          />
          <p className="text-sm text-slate-500">Loading lectures…</p>
        </div>
      </HomeLayout>
    );
  }

  return (
    <HomeLayout>
      <div className="container-page py-10">
        {/* Course header */}
        <div className="anim-fade-up mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="badge badge-rose mb-2 font-semibold uppercase tracking-wider">
              {role === "ADMIN" ? "Managing" : "Now learning"}
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {state?.title}
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              {state?.createdBy} · {hasLectures ? lectures.length : 0} lectures
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate("/courses")}
            className="btn btn-secondary btn-sm self-start sm:self-auto"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back to courses
          </button>
        </div>

        {hasLectures ? (
          <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
            {/* Video player section */}
            <div className="anim-fade-up card overflow-hidden p-0">
              <div className="aspect-video w-full bg-black">
                <video
                  key={currentLecture?._id}
                  src={currentLecture?.lecture?.secure_url}
                  className="size-full"
                  controls
                  disablePictureInPicture
                  controlsList="nodownload"
                  aria-label={`Lecture video: ${currentLecture?.title}`}
                >
                  Your browser does not support the video tag.
                </video>
              </div>

              <div className="space-y-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                  Lecture {currentVideo + 1} of {lectures.length}
                </p>
                <h2 className="text-lg font-semibold text-white">
                  {currentLecture?.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-400">
                  {currentLecture?.description}
                </p>

                {/* Prev / Next navigation */}
                <div className="flex items-center justify-between gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentVideo((index) => Math.max(0, index - 1))
                    }
                    disabled={currentVideo === 0}
                    className="btn btn-secondary btn-sm"
                  >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                    Previous
                  </button>
                  <span className="text-xs text-slate-500">
                    {currentVideo + 1} / {lectures.length}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setCurrentVideo((index) =>
                        Math.min(lectures.length - 1, index + 1)
                      )
                    }
                    disabled={currentVideo === lectures.length - 1}
                    className="btn btn-secondary btn-sm"
                  >
                    Next
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Playlist */}
            <aside
              className="card anim-fade-up overflow-hidden p-0"
              style={{ animationDelay: "80ms" }}
              aria-label="Lecture playlist"
            >
              <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4">
                <h2 className="flex items-center gap-2 text-sm font-semibold text-white">
                  <ListVideo className="size-4 text-rose-400" aria-hidden="true" />
                  Lectures
                </h2>
                {role === "ADMIN" && (
                  <button
                    type="button"
                    onClick={() =>
                      navigate("/course/addlecture", { state: { ...state } })
                    }
                    className="btn btn-primary btn-sm"
                  >
                    <Plus className="size-4" aria-hidden="true" />
                    Add
                  </button>
                )}
              </div>

              <ol className="max-h-[32rem] space-y-1 overflow-y-auto p-3">
                {lectures.map((lecture, index) => {
                  const isActive = index === currentVideo;
                  return (
                    <li key={lecture._id}>
                      <div
                        className={`group flex items-start gap-3 rounded-lg p-3 transition-colors duration-150 ${
                          isActive ? "bg-rose-500/10" : "hover:bg-slate-800/70"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setCurrentVideo(index)}
                          className="flex flex-1 items-start gap-3 text-left"
                          aria-current={isActive ? "true" : undefined}
                        >
                          <span
                            className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                              isActive
                                ? "bg-rose-600 text-white"
                                : "bg-slate-800 text-slate-300 group-hover:bg-slate-700"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span>
                            <span
                              className={`block text-sm font-medium ${
                                isActive ? "text-white" : "text-slate-200"
                              }`}
                            >
                              {lecture?.title}
                            </span>
                            <span className="mt-0.5 line-clamp-1 block text-xs text-slate-500">
                              {lecture?.description}
                            </span>
                          </span>
                        </button>
                        {role === "ADMIN" && (
                          <button
                            type="button"
                            onClick={() => setLectureToDelete(lecture)}
                            className="rounded-md p-1.5 text-slate-500 opacity-0 transition-all duration-150 hover:bg-red-500/10 hover:text-red-400 focus-visible:opacity-100 group-hover:opacity-100"
                            aria-label={`Delete lecture: ${lecture?.title}`}
                          >
                            <Trash2 className="size-4" aria-hidden="true" />
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </aside>
          </div>
        ) : (
          <EmptyState
            icon={ListVideo}
            title="No lectures yet"
            description={
              role === "ADMIN"
                ? "This course doesn't have any lectures. Add the first one to make it available to learners."
                : "Lectures for this course are being prepared. Check back soon!"
            }
            actionLabel={role === "ADMIN" ? "Add lecture" : undefined}
            onAction={
              role === "ADMIN"
                ? () => navigate("/course/addlecture", { state: { ...state } })
                : undefined
            }
          />
        )}
      </div>

      {/* Delete confirmation */}
      <ConfirmDialog
        open={Boolean(lectureToDelete)}
        destructive
        title="Delete this lecture?"
        message={`"${lectureToDelete?.title}" will be permanently removed from this course. This action cannot be undone.`}
        confirmLabel="Delete lecture"
        busy={isDeleting}
        onConfirm={confirmDelete}
        onCancel={() => setLectureToDelete(null)}
      />
    </HomeLayout>
  );
}

export default DisplayLectures;
