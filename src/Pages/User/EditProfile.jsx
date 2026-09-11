import { ChevronLeft, ImageUp, Save, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import HomeLayout from "../../Layouts/HomeLayout";
import { getUserData, updateProfile } from "../../Redux/Slices/AuthSlice";

function EditProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentData = useSelector((state) => state?.auth?.data);

  const [data, setData] = useState({
    previewImage: "",
    fullName: currentData?.fullName || "",
    avatar: undefined,
    userId: currentData?._id,
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleImageUpload(event) {
    const uploadedImage = event.target.files?.[0];
    if (!uploadedImage) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setData((prev) => ({
        ...prev,
        previewImage: this.result,
        avatar: uploadedImage,
      }));
      setFieldErrors((prev) => ({ ...prev, avatar: undefined }));
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  async function onFormSubmit(event) {
    event.preventDefault();

    const errors = {};
    if (!data.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (data.fullName.trim().length < 5) {
      errors.fullName = "Name cannot be less than 5 characters";
    }
    if (!data.avatar) {
      errors.avatar = "Please choose a new profile picture to update";
    }
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("avatar", data.avatar);

    const response = await dispatch(updateProfile([data.userId, formData]));
    setIsSubmitting(false);

    if (response?.payload?.success) {
      await dispatch(getUserData());
      toast.success("Profile updated successfully!");
      navigate("/user/profile");
    }
  }

  return (
    <HomeLayout>
      <div className="container-page flex min-h-[80vh] items-center justify-center py-14">
        <div className="anim-fade-up w-full max-w-md">
          <button
            type="button"
            onClick={() => navigate("/user/profile")}
            className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition-colors hover:text-white"
          >
            <ChevronLeft className="size-4" aria-hidden="true" />
            Back to profile
          </button>

          <div className="card p-8 shadow-xl shadow-black/20">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">Edit profile</h1>
              <p className="mt-1 text-sm text-slate-400">
                Update your name and profile picture
              </p>
            </div>

            <form onSubmit={onFormSubmit} noValidate className="space-y-5">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <label
                  htmlFor="image_uploads"
                  className="group relative cursor-pointer"
                >
                  {data.previewImage ? (
                    <img
                      className="size-24 rounded-full border-2 border-rose-500/60 object-cover"
                      src={data.previewImage}
                      alt="Profile preview"
                    />
                  ) : data?.avatar?.secure_url || currentData?.avatar?.secure_url ? (
                    <img
                      className="size-24 rounded-full border-2 border-slate-700 object-cover transition-colors group-hover:border-rose-500/50"
                      src={currentData?.avatar?.secure_url}
                      alt="Current profile"
                    />
                  ) : (
                    <div className="flex size-24 items-center justify-center rounded-full border-2 border-slate-700 bg-slate-900 transition-colors group-hover:border-rose-500/50">
                      <User className="size-10 text-slate-500" aria-hidden="true" />
                    </div>
                  )}
                  <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-slate-950 bg-rose-600 text-white transition-transform group-hover:scale-105">
                    <ImageUp className="size-3.5" aria-hidden="true" />
                  </span>
                </label>
                <input
                  onChange={handleImageUpload}
                  className="sr-only"
                  type="file"
                  id="image_uploads"
                  name="image_uploads"
                  accept=".jpg, .png, .svg, .jpeg"
                  aria-label="Select new profile picture"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Click the avatar to choose a new picture
                </p>
                {fieldErrors.avatar && (
                  <p className="field-error" role="alert">
                    {fieldErrors.avatar}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label htmlFor="fullName" className="label">
                  Full name
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  id="fullName"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  className={`input ${fieldErrors.fullName ? "input-error" : ""}`}
                  value={data.fullName}
                  onChange={handleInputChange}
                  aria-invalid={Boolean(fieldErrors.fullName)}
                />
                {fieldErrors.fullName ? (
                  <p className="field-error" role="alert">
                    {fieldErrors.fullName}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-slate-500">
                    Minimum 5 characters
                  </p>
                )}
              </div>

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
                    Updating...
                  </>
                ) : (
                  <>
                    Save changes
                    <Save className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default EditProfile;
