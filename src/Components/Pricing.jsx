import { Check } from "lucide-react";
import { Link } from "react-router-dom";

import { pricingData } from "../Constants/pricingData";
import SectionTitle from "./SectionTitle";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20">
      <div className="container-page">
        <SectionTitle
          text1="Pricing"
          text2="One simple plan for everything"
          text3="A single subscription unlocks the entire catalog. No per-course fees, no hidden charges."
        />

        <div className="mt-14 flex justify-center">
          {pricingData.map((plan, index) => (
            <div
              key={plan.name}
              className={`card card-interactive anim-fade-up relative flex w-full max-w-xl flex-col p-7 ${
                plan.mostPopular
                  ? "border-rose-500/50 bg-rose-950/20 shadow-lg shadow-rose-950/30"
                  : ""
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {plan.mostPopular && (
                <span className="badge badge-rose absolute -top-3 left-6 font-semibold">
                  Most popular
                </span>
              )}

              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                {plan.name}
              </h3>
              <p className="mt-3">                <span className="font-display text-4xl font-bold text-white">₹{plan.price}</span>
                <span className="text-sm text-slate-500">/{plan.period}</span>
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-sm text-slate-300"
                  >
                    <Check
                      className="mt-0.5 size-4 shrink-0 text-rose-500"
                      aria-hidden="true"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/checkout"
                className={`btn mt-8 w-full ${
                  plan.mostPopular ? "btn-primary" : "btn-secondary"
                }`}
              >
                Get started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
