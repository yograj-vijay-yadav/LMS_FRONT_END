import {
  ChevronDown,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  UserCircle2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";

import { navlinks } from "../Constants/navlink";
import { logout } from "../Redux/Slices/AuthSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector((state) => state?.auth?.role);

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setUserMenuOpen(false);
  }, [navigate]);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  async function handleLogout() {
    setUserMenuOpen(false);
    setMenuOpen(false);
    await dispatch(logout());
    navigate("/");
  }

  const linkClasses = ({ isActive }) =>
    `rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-white" : "text-slate-400 hover:text-white"
    }`;

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-slate-950/85 backdrop-blur-md"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 250, damping: 30 }}
    >
      <nav
        className="container-page flex h-16 items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="SimpliLearn home">
          <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600 shadow-sm shadow-rose-950/50">
            <img
              src="/favicon.ico"
              alt=""
              className="size-5 object-contain"
              aria-hidden="true"
            />
            </span>
          <span className="font-display text-lg font-bold text-white">
            Simpli<span className="text-gradient">Learn</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 lg:flex">
          {navlinks.map((link) => (
            <NavLink key={link.name} to={link.href} end className={linkClasses}>
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Auth area */}
        <div className="flex items-center gap-2">
          {!isLoggedIn ? (
            <div className="hidden items-center gap-2 lg:flex">
              <Link to="/login" className="btn btn-ghost">
                Log in
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign up free
              </Link>
            </div>
          ) : (
            <div className="relative hidden lg:block">
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-slate-800"
                onClick={() => setUserMenuOpen((open) => !open)}
                aria-expanded={userMenuOpen}
                aria-haspopup="menu"
              >
                <UserCircle2 className="size-8 text-slate-300" aria-hidden="true" />
                <span className="max-w-[8rem] truncate text-sm font-medium text-slate-200">
                  {role === "ADMIN" ? "Admin" : "My account"}
                </span>
                <ChevronDown
                  className={`size-4 text-slate-400 transition-transform duration-200 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    className="anim-scale-in absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-slate-700 bg-slate-900 py-1.5 shadow-2xl"
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    role="menu"
                  >
                    {role === "ADMIN" ? (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:bg-slate-800"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="size-4 text-slate-400" aria-hidden="true" />
                        Admin dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/user/profile"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-slate-200 transition-colors hover:bg-slate-800"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <UserCircle2 className="size-4 text-slate-400" aria-hidden="true" />
                        My profile
                      </Link>
                    )}
                    <button
                      type="button"
                      className="flex w-full items-center gap-2.5 px-4 py-2.5 text-left text-sm text-red-400 transition-colors hover:bg-slate-800"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <LogOut className="size-4" aria-hidden="true" />
                      Log out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-slate-800 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 top-16 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              id="mobile-menu"
              className="anim-slide-in-right fixed right-0 top-16 z-50 flex h-[calc(100dvh-4rem)] w-72 flex-col border-l border-slate-800 bg-slate-950 p-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
            >
              <div className="flex flex-col gap-1">
                {navlinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.href}
                    className={({ isActive }) =>
                      `rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                        isActive
                          ? "bg-slate-800 text-white"
                          : "text-slate-300 hover:bg-slate-800/60 hover:text-white"
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}
              </div>

              <div className="mt-auto flex flex-col gap-3 border-t border-slate-800 pt-6">
                {!isLoggedIn ? (
                  <>
                    <Link to="/login" className="btn btn-secondary w-full">
                      <LogIn className="size-4" aria-hidden="true" />
                      Log in
                    </Link>
                    <Link to="/signup" className="btn btn-primary w-full">
                      Sign up free
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to={role === "ADMIN" ? "/admin/dashboard" : "/user/profile"}
                      className="btn btn-secondary w-full"
                    >
                      <LayoutDashboard className="size-4" aria-hidden="true" />
                      {role === "ADMIN" ? "Admin dashboard" : "My profile"}
                    </Link>
                    <button type="button" className="btn btn-danger w-full" onClick={handleLogout}>
                      <LogOut className="size-4" aria-hidden="true" />
                      Log out
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
