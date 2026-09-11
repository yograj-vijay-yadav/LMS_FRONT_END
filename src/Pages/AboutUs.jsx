import { Globe, Heart, Lightbulb, Rocket, Sparkles, Target, Users } from "lucide-react";
import { motion } from "motion/react";

import PageHeader from "../Components/Ui/PageHeader";
import HomeLayout from "../Layouts/HomeLayout";

const iconComponents = {
  Users,
  Heart,
  Lightbulb,
  Globe,
  Sparkles,
  Rocket,
  Target,
};

const values = [
  {
    title: "Innovation",
    description:
      "We constantly push boundaries and explore new possibilities to create cutting-edge learning experiences.",
    icon: "Lightbulb",
  },
  {
    title: "Collaboration",
    description:
      "We believe in the power of teamwork and diverse perspectives to achieve extraordinary results.",
    icon: "Users",
  },
  {
    title: "Excellence",
    description:
      "We strive for the highest quality in everything we do, consistently delivering excellent work.",
    icon: "Sparkles",
  },
  {
    title: "Impact",
    description:
      "We measure our success by the positive difference we make in people's learning journeys.",
    icon: "Globe",
  },
];

export default function Aboutus() {
  return (
    <HomeLayout>
      <div className="container-page py-16">
        <PageHeader
          center
          eyebrow="About us"
          title="Building the future of online learning"
          description="We make structured, practical education accessible to everyone — regardless of design or development experience."
        />

        {/* Mission & Vision */}
        <motion.div
          className="grid gap-6 md:grid-cols-2"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card card-interactive p-8">
            <div className="flex size-12 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
              <Rocket className="size-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">Our mission</h2>
            <p className="mt-3 leading-relaxed text-slate-400">
              Our mission is to democratize online education by providing
              high-quality, structured courses that help learners build
              real, career-ready skills efficiently.
            </p>
          </div>

          <div className="card card-interactive p-8">
            <div className="flex size-12 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Target className="size-6" aria-hidden="true" />
            </div>
            <h2 className="mt-5 text-xl font-semibold">Our vision</h2>
            <p className="mt-3 leading-relaxed text-slate-400">
              We envision a world where building new skills is accessible to
              everyone — with clear paths, expert guidance, and measurable
              progress at every step.
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.section
          className="mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          aria-label="Core values"
        >
          <h2 className="text-center text-2xl font-bold sm:text-3xl">
            Our core values
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-center text-slate-400">
            The principles that guide everything we do and every decision we
            make.
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {values.map((value, index) => {
              const Icon = iconComponents[value.icon];
              return (
                <div
                  key={value.title}
                  className="card card-interactive anim-fade-up p-6"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-400">
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 font-semibold text-white">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </HomeLayout>
  );
}
