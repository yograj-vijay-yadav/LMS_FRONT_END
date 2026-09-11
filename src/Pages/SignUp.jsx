import { Eye, EyeOff, ImageUp, Lock, Mail, User, UserPlus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { isEmail, isValidPassword } from "../Helpers/regexMatcher";
import HomeLayout from "../Layouts/HomeLayout";
import { createAccount } from "../Redux/Slices/AuthSlice";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [previewImage, setPreviewImage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
    avatar: null,
  });

  function handleUserInput(event) {
    const { name, value } = event.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function getImage(event) {
    const uploadedImage = event.target.files?.[0];
    if (!uploadedImage) return;

    setSignupData((prev) => ({ ...prev, avatar: uploadedImage }));
    setFieldErrors((prev) => ({ ...prev, avatar: undefined }));

    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setPreviewImage(this.result);
    });
  }

  function validate() {
    const errors = {};
    if (!signupData.fullName.trim()) {
      errors.fullName = "Full name is required";
    } else if (signupData.fullName.trim().length < 5) {
      errors.fullName = "Name should be at least 5 characters";
    }
    if (!signupData.email.trim()) {
      errors.email = "Email is required";
    } else if (!isEmail(signupData.email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!signupData.password) {
      errors.password = "Password is required";
    } else if (!isValidPassword(signupData.password)) {
      errors.password =
        "Password must be 6-16 characters with at least one number and one special character";
    }
    if (!signupData.avatar) {
      errors.avatar = "Please choose a profile picture";
    }
    return errors;
  }

  async function createNewAccount(event) {
    event.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      toast.error("Please fix the highlighted fields");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("fullName", signupData.fullName);
    formData.append("email", signupData.email);
    formData.append("password", signupData.password);
    formData.append("avatar", signupData.avatar);

    const response = await dispatch(createAccount(formData));
    setIsLoading(false);

    // The thunk returns the raw axios response, so success lives under `.data`
    if (response?.payload?.data?.success) {
      toast.success("Account created successfully!");
      navigate("/login");
    }
  }

  return (
    <HomeLayout>
      <div className="container-page flex min-h-[calc(100vh-4rem)] items-center justify-center py-14">
        <div className="anim-fade-up w-full max-w-md">
          <div className="card p-8 shadow-xl shadow-black/20">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-rose-500/10 text-rose-400">
                <UserPlus className="size-5" aria-hidden="true" />
              </div>
              <h1 className="mt-4 text-2xl font-bold">Create your account</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Start learning in minutes
              </p>
            </div>

            {/* Avatar upload */}
            <div className="mb-6 flex flex-col items-center">
              <label
                htmlFor="image_uploads"
                className="group relative cursor-pointer"
              >
                <div
                  className={`flex size-20 items-center justify-center overflow-hidden rounded-full border-2 bg-slate-900 transition-colors duration-200 group-hover:border-rose-400 ${
                    fieldErrors.avatar ? "border-red-500/70" : "border-slate-700"
                  }`}
                >
                  {previewImage ? (
                    <img
                      className="size-full object-cover"
                      src={previewImage}
                      alt="Avatar preview"
                    />
                  ) : (
                    <User className="size-8 text-slate-500" aria-hidden="true" />
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-slate-950 bg-rose-600 text-white">
                  <ImageUp className="size-3.5" aria-hidden="true" />
                </span>
              </label>
              <input
                onChange={getImage}
                className="sr-only"
                type="file"
                name="image_uploads"
                id="image_uploads"
                accept=".jpg, .jpeg, .png, .svg"
                aria-label="Upload profile picture"
              />
              <p className="mt-2 text-xs text-slate-500">
                Click the avatar to upload a profile picture
              </p>
              {fieldErrors.avatar && (
                <p className="field-error" role="alert">
                  {fieldErrors.avatar}
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={createNewAccount} noValidate className="space-y-5">
              <div>
                <label htmlFor="fullName" className="label">
                  Full name
                </label>
                <div className="relative">
                  <User
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    value={signupData.fullName}
                    onChange={handleUserInput}
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(fieldErrors.fullName)}
                    className={`input pl-10 ${fieldErrors.fullName ? "input-error" : ""}`}
                  />
                </div>
                {fieldErrors.fullName && (
                  <p className="field-error" role="alert">
                    {fieldErrors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="label">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={signupData.email}
                    onChange={handleUserInput}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(fieldErrors.email)}
                    className={`input pl-10 ${fieldErrors.email ? "input-error" : ""}`}
                  />
                </div>
                {fieldErrors.email && (
                  <p className="field-error" role="alert">
                    {fieldErrors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-500"
                    aria-hidden="true"
                  />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={signupData.password}
                    onChange={handleUserInput}
                    placeholder="Create a password"
                    aria-invalid={Boolean(fieldErrors.password)}
                    className={`input pl-10 pr-11 ${fieldErrors.password ? "input-error" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((show) => !show)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition-colors hover:text-slate-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" aria-hidden="true" />
                    ) : (
                      <Eye className="size-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {fieldErrors.password ? (
                  <p className="field-error" role="alert">
                    {fieldErrors.password}
                  </p>
                ) : (
                  <p className="mt-1.5 text-xs text-slate-500">
                    6-16 characters with at least one number and one special
                    character
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full py-3"
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="inline-block size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
                      aria-hidden="true"
                    />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <UserPlus className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-rose-400 transition-colors hover:text-rose-300"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>

          <p className="mt-6 text-center text-xs text-slate-500">
            By signing up, you agree to our Terms of Service.
          </p>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Signup;
