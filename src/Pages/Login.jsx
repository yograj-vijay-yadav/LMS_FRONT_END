import { Eye, EyeOff, Lock, LogIn, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import HomeLayout from "../Layouts/HomeLayout";
import { login } from "../Redux/Slices/AuthSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleUserInput(event) {
    const { name, value } = event.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function validate() {
    const errors = {};
    if (!loginData.email.trim()) errors.email = "Email is required";
    if (!loginData.password) errors.password = "Password is required";
    return errors;
  }

  // Already signed in? Skip the form and go straight to the app
  useEffect(() => {
    if (isLoggedIn) {
      navigate(location.state?.from || "/courses", { replace: true });
    }
  }, [isLoggedIn, navigate, location.state]);

  async function onLogin(event) {
    event.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsLoading(true);
    const response = await dispatch(login(loginData));
    setIsLoading(false);

    // The thunk returns the raw axios response, so success lives under `.data`
    const payload = response?.payload?.data;
    if (payload?.success) {
      // Send the user where RequireAuth intended, or to their default landing page
      const userRole = payload?.user?.role;
      navigate(location.state?.from || (userRole === "ADMIN" ? "/admin/dashboard" : "/courses"), {
        replace: true,
      });
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
                <LogIn className="size-5" aria-hidden="true" />
              </div>
              <h1 className="mt-4 text-2xl font-bold">Welcome back</h1>
              <p className="mt-1.5 text-sm text-slate-400">
                Log in to continue learning
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onLogin} noValidate className="space-y-5">
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
                    value={loginData.email}
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
                    autoComplete="current-password"
                    value={loginData.password}
                    onChange={handleUserInput}
                    placeholder="Enter your password"
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
                {fieldErrors.password && (
                  <p className="field-error" role="alert">
                    {fieldErrors.password}
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
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <LogIn className="size-4" aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="text-center text-sm text-slate-400">
                Don&rsquo;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-rose-400 transition-colors hover:text-rose-300"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Login;
