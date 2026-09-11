import { ChevronLeft, ImageUp } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { createNewCourse } from "../../Redux/Slices/CourseSlice";

function CreateCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userInput, setUserInput] = useState({
    title: "",
    category: "",
    createdBy: "",
    description: "",
    thumbnail: null,
    previewImage: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImageUpload(event) {
    const uploadedImage = event.target.files?.[0];
    if (!uploadedImage) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setUserInput((prev) => ({
        ...prev,
        previewImage: this.result,
        thumbnail: uploadedImage,
      }));
    });
  }

  function handleUserInput(event) {
    const { name, value } = event.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    if (
      !userInput.title.trim() ||
      !userInput.description.trim() ||
      !userInput.category.trim() ||
      !userInput.thumbnail ||
      !userInput.createdBy.trim()
    ) {
      toast.error("All fields are mandatory");
      return;
    }

    setIsSubmitting(true);
    const response = await dispatch(createNewCourse(userInput));
    setIsSubmitting(false);

    if (response?.payload?.success) {
      navigate("/courses");
    }
  }

  return (
    <HomeLayout>
      <div className="container-page flex min-h-[80vh] items-center justify-center py-14">
        <div className="anim-fade-up w-full max-w-2xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back
          </button>

          <div className="card p-6 sm:p-8">
            <div className="mb-6">
              <span className="badge badge-rose mb-2 font-semibold uppercase tracking-wider">
                Admin
              </span>
              <h1 className="text-2xl font-bold">Create a new course</h1>
              <p className="mt-1 text-sm text-slate-400">
                Publish a course with a thumbnail, category, and description.
              </p>
            </div>

            <form onSubmit={onFormSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {/* Thumbnail upload */}
                <div className="sm:order-1">
                  <label
                    htmlFor="image_uploads"
                    className={`flex h-44 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border border-dashed px-4 text-center transition-colors duration-200 hover:border-rose-500/50 ${
                      userInput.previewImage
                        ? "border-solid border-slate-700"
                        : "border-slate-700 bg-slate-900/60"
                    }`}
                  >
                    {userInput.previewImage ? (
                      <img
                        className="size-full object-cover"
                        src={userInput.previewImage}
                        alt="Course thumbnail preview"
                      />
                    ) : (
                      <>
                        <ImageUp
                          className="size-8 text-slate-500"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium text-slate-300">
                          Upload course thumbnail
                        </span>
                        <span className="text-xs text-slate-500">
                          JPG, JPEG or PNG
                        </span>
                      </>
                    )}
                  </label>
                  <input
                    className="sr-only"
                    type="file"
                    id="image_uploads"
                    accept=".jpg, .jpeg, .png"
                    name="image_uploads"
                    onChange={handleImageUpload}
                    aria-label="Select course thumbnail"
                  />
                </div>

                {/* Title */}
                <div className="space-y-5 sm:order-2">
                  <div>
                    <label htmlFor="title" className="label">
                      Course title
                    </label>
                    <input
                      required
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Enter course title"
                      className="input"
                      value={userInput.title}
                      onChange={handleUserInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="createdBy" className="label">
                      Course instructor
                    </label>
                    <input
                      required
                      type="text"
                      name="createdBy"
                      id="createdBy"
                      placeholder="Enter instructor name"
                      className="input"
                      value={userInput.createdBy}
                      onChange={handleUserInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="label">
                      Course category
                    </label>
                    <input
                      required
                      type="text"
                      name="category"
                      id="category"
                      placeholder="e.g. Web Development"
                      className="input"
                      value={userInput.category}
                      onChange={handleUserInput}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="description" className="label">
                  Course description
                </label>
                <textarea
                  required
                  name="description"
                  id="description"
                  rows={5}
                  placeholder="What will learners get from this course?"
                  className="input resize-none"
                  value={userInput.description}
                  onChange={handleUserInput}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full py-3 text-base"
                aria-busy={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span
                      className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Creating course...
                  </>
                ) : (
                  "Create course"
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CreateCourse;
