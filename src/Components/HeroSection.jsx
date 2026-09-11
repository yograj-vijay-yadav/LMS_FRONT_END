import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  GraduationCap,
  PlayCircle,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

const highlights = [
  "Industry-ready learning paths",
  "Live projects and assessments",
  "Progress tracking with certificates",
];

const stats = [
  { icon: BookOpen, label: "Structured courses, lecture by lecture" },
  { icon: TrendingUp, label: "Track progress as you learn" },
  { icon: GraduationCap, label: "One subscription, full catalog access" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft ambient glow, purely decorative */}
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-rose-600/15 blur-[140px]"
        aria-hidden="true"
      />

      <div className="container-page relative flex flex-col items-center pb-20 pt-20 text-center md:pt-28">
        <motion.div
          initial={{ y: -16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            to="/courses"
            className="group inline-flex items-center gap-2 rounded-full border border-rose-500/25 bg-rose-500/10 py-1.5 pl-2 pr-3 text-sm text-rose-300 transition-colors hover:bg-rose-500/20"
          >
            <span className="rounded-full bg-rose-600 px-2.5 py-0.5 text-xs font-semibold text-white">
              NEW
            </span>
            Explore our newest learning tracks
            <ChevronRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        <motion.h1
          className="mt-8 max-w-3xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.08 }}
        >
          Build career-ready skills with your{" "}
          <span className="text-gradient">LMS platform.</span>
        </motion.h1>

        <motion.p
          className="mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.16 }}
        >
          Learn from expert instructors, track your progress, and complete
          guided assignments — all in one place. Designed for students,
          professionals, and teams who want structured, practical learning.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.24 }}
        >
          <Link to="/courses" className="btn btn-primary h-11 px-7 text-base">
            Explore Courses
          </Link>
          <Link
            to="/contact"
            className="btn btn-secondary h-11 px-6 text-base"
          >
            <PlayCircle className="size-5" aria-hidden="true" />
            Book a demo
          </Link>
        </motion.div>

        {/* Highlights */}
        <motion.ul
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.36 }}
        >
          {highlights.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 text-sm text-slate-400"
            >
              <CheckCircle2 className="size-4.5 text-rose-500" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </motion.ul>

        {/* Capability strip */}
        <motion.dl
          className="mt-16 grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44 }}
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="card flex items-center gap-3 px-5 py-4 text-left">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                  <Icon className="size-4.5" aria-hidden="true" />
                </div>
                <dd className="text-sm font-medium text-slate-300">{stat.label}</dd>
              </div>
            );
          })}
        </motion.dl>
      </div>
    </section>
  );
}
