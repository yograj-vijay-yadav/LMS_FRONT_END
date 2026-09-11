import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const socialLinks = [
  { name: "Facebook", icon: Facebook, url: "#" },
  { name: "Instagram", icon: Instagram, url: "#" },
  { name: "Twitter", icon: Twitter, url: "#" },
  { name: "LinkedIn", icon: Linkedin, url: "#" },
  { name: "GitHub", icon: Github, url: "#" },
];

const linkGroups = [
  {
    title: "Platform",
    links: [
      { name: "Courses", href: "/courses" },
      { name: "About", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "Log in", href: "/login" },
      { name: "Sign up", href: "/signup" },
      { name: "My profile", href: "/user/profile" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Use", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-pink-600">
                <img src="/favicon.ico" alt="" className="size-5 object-contain" aria-hidden="true" />
              </span>
              <span className="font-display text-lg font-bold text-white">
                Simpli<span className="text-gradient">Learn</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Modern learning, structured for real progress. Courses, lectures,
              and progress tracking in one place.
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map(({ name, icon: Icon, url }) => (
                <a
                  key={name}
                  href={url}
                  aria-label={name}
                  className="flex size-9 items-center justify-center rounded-lg border border-slate-800 text-slate-400 transition-colors duration-200 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-400"
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {linkGroups.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800/70 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} SimpliLearn. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Built for structured, career-ready learning.
          </p>
        </div>
      </div>
    </footer>
  );
}
