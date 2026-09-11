import { ChevronLeft, FileVideo, UploadCloud } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

function AddLecture() {
  const courseDetails = useLocation().state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    id: courseDetails?._id,
    lecture: undefined,
    title: "",
    description: "",
    videoSrc: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  }

  function handleVideo(event) {
    const video = event.target.files?.[0];
    if (!video) return;
    setUserInput((prev) => ({
      ...prev,
      lecture: video,
      videoSrc: window.URL.createObjectURL(video),
    }));
  }

  function removeVideo() {
    if (userInput.videoSrc) {
      window.URL.revokeObjectURL(userInput.videoSrc);
    }
    setUserInput((prev) => ({
      ...prev,
      lecture: undefined,
      videoSrc: "",
    }));
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    if (!userInput.lecture || !userInput.title.trim() || !userInput.description.trim()) {
      toast.error("All fields are mandatory");
      return;
    }

    setIsSubmitting(true);
    const response = await dispatch(addCourseLecture(userInput));
    setIsSubmitting(false);

    if (response?.payload?.success) {
      navigate(-1);
    }
  }

  useEffect(() => {
    if (!courseDetails) navigate("/courses");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!courseDetails) return null;

  return (
    <HomeLayout>
      <div className="container-page flex min-h-[80vh] items-center justify-center py-14">
        <div className="anim-fade-up w-full max-w-xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back to lectures
          </button>

          <div className="card p-6 sm:p-8">
            <div className="mb-6">
              <span className="badge badge-rose mb-2 font-semibold uppercase tracking-wider">
                {courseDetails?.title}
              </span>
              <h1 className="text-2xl font-bold">Add a new lecture</h1>
              <p className="mt-1 text-sm text-slate-400">
                Upload the video and describe what learners will learn.
              </p>
            </div>

            <form onSubmit={onFormSubmit} className="space-y-5">
              <div>
                <label htmlFor="title" className="label">
                  Lecture title
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={userInput.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Introduction to React hooks"
                  className="input"
                />
              </div>

              <div>
                <label htmlFor="description" className="label">
                  Lecture description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={userInput.description}
                  onChange={handleInputChange}
                  placeholder="What does this lecture cover?"
                  className="input resize-none"
                />
              </div>

              {/* Video upload / preview */}
              {userInput.videoSrc ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-lg border border-slate-800 bg-black">
                    <video
                      muted
                      src={userInput.videoSrc}
                      controls
                      controlsList="nodownload nofullscreen"
                      disablePictureInPicture
                      className="aspect-video w-full"
                      aria-label="Selected lecture video preview"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-xs text-slate-500">
                      {userInput.lecture?.name}
                    </p>
                    <button
                      type="button"
                      onClick={removeVideo}
                      className="text-xs font-medium text-red-400 transition-colors hover:text-red-300"
                    >
                      Remove video
                    </button>
                  </div>
                </div>
              ) : (
                <label
                  htmlFor="lecture"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-700 bg-slate-900/60 px-6 py-10 text-center transition-colors duration-200 hover:border-rose-500/50 hover:bg-slate-900"
                >
                  <UploadCloud
                    className="size-8 text-slate-500"
                    aria-hidden="true"
                  />
                  <span className="text-sm font-medium text-slate-300">
                    Choose a video file
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <FileVideo className="size-3.5" aria-hidden="true" />
                    MP4 or compatible video format
                  </span>
                  <input
                    type="file"
                    className="sr-only"
                    id="lecture"
                    name="lecture"
                    onChange={handleVideo}
                    accept="video/mp4 video/x-mp4 video/*"
                    aria-label="Select lecture video"
                  />
                </label>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full py-3"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Uploading lecture...
                  </>
                ) : (
                  "Add lecture"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AddLecture;
