// AboutUs1.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Globe,
  Users,
  Heart,
  Lightbulb,
  Sparkles,
  Rocket,
  Target,
} from "lucide-react";

// ✅ Temporary placeholder components (replace with your real ones)
const Spotlight = ({ ...props }) => (
  <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
    {/* gradient props ignored in placeholder */}
  </div>
);

const BorderBeam = ({ ...props }) => (
  <div style={{ position: "absolute", inset: 0, border: "1px dashed #ccc" }} />
);

const CardHoverEffect = ({ icon, title, description }) => (
  <div className="p-6 rounded-xl border shadow hover:shadow-lg transition">
    <div className="mb-4">{icon}</div>
    <h3 className="font-bold text-lg mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// ✅ Icon mapping
const iconComponents = {
  Users,
  Heart,
  Lightbulb,
  Globe,
  Sparkles,
  Rocket,
  Target,
};

// ✅ Default values
const defaultValues = [
  {
    title: "Innovation",
    description:
      "We constantly push boundaries and explore new possibilities to create cutting-edge solutions.",
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
      "We strive for perfection in everything we do, consistently delivering high-quality work.",
    icon: "Sparkles",
  },
  {
    title: "Impact",
    description:
      "We measure our success by the positive difference we make in people's lives and businesses.",
    icon: "Globe",
  },
];

export default function Aboutus() {
  const aboutData = {
    title: "About Us",
    subtitle:
      "Building the future of web development with beautiful, reusable components.",
    mission:
      "Our mission is to democratize web development by providing high-quality, customizable components that help developers build stunning websites quickly and efficiently.",
    vision:
      "We envision a world where creating beautiful websites is accessible to everyone, regardless of their design or development experience.",
    values: defaultValues,
    className: "relative overflow-hidden py-20",
  };

  const missionRef = useRef(null);
  const valuesRef = useRef(null);

  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });

  return (
    <section className="relative w-full overflow-hidden pt-20">
      <Spotlight />

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <h1 className="bg-gradient-to-r from-gray-700 via-gray-900 to-black bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl">
            {aboutData.title}
          </h1>
          <p className="mt-6 text-xl text-gray-500">{aboutData.subtitle}</p>
        </motion.div>

        {/* Mission & Vision Section */}
        <div ref={missionRef} className="relative mx-auto mb-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={
              missionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
            }
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative z-10 grid gap-12 md:grid-cols-2"
          >
            {/* Mission */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="group relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-200 to-purple-50">
                <Rocket className="h-8 w-8 text-purple-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-gray-600">{aboutData.mission}</p>
            </motion.div>

            {/* Vision */}
            <motion.div
              whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
              className="group relative block overflow-hidden rounded-2xl border bg-gradient-to-br p-10 backdrop-blur-3xl"
            >
              <BorderBeam />
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-200 to-blue-50">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h2 className="mb-4 text-3xl font-bold">Our Vision</h2>
              <p className="text-lg text-gray-600">{aboutData.vision}</p>
            </motion.div>
          </motion.div>
        </div>

        {/* Values */}
        <div ref={valuesRef} className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold sm:text-4xl">Our Core Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-500">
              The principles that guide everything we do and every decision we
              make.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {aboutData.values.map((value, index) => {
              const IconComponent = iconComponents[value.icon];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={
                    valuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1 + 0.2,
                    ease: "easeOut",
                  }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <CardHoverEffect
                    icon={<IconComponent className="h-6 w-6" />}
                    title={value.title}
                    description={value.description}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
