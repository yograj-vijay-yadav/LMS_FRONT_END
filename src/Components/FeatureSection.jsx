import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { featuresData } from "../Constants/features";
import SectionTitle from "./SectionTitle";

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container-page">
        <SectionTitle
          text1="Platform"
          text2="Everything you need to teach and learn"
          text3="From content delivery to learner progress — run your full learning lifecycle in one platform."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="card card-interactive anim-fade-up p-6"
                style={{ animationDelay: `${index * 60}ms` }}
              >
                <div className="flex size-11 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                  <Icon className="size-5.5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight banner */}
        <div className="card anim-fade-up mt-14 flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-xl font-semibold">
              Manage outcomes, not just content
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-400">
              Keep instructors, learners, and admins aligned with a single
              dashboard for courses, lectures, subscriptions, and
              certification workflows.
            </p>
          </div>
          <Link to="/courses" className="btn btn-primary shrink-0">
            Browse all courses
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
