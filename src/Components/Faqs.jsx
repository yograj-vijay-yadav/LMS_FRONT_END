import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";

/* ---------------- utils (cn) ---------------- */
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

/* ---------------- Badge ---------------- */
function Badge({ children, className = "" }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border px-3 py-1 text-xs font-medium uppercase tracking-wider",
        "border-pink-500 text-pink-500",
        className
      )}
    >
      {children}
    </span>
  );
}

/* ---------------- FAQ Item ---------------- */
function FAQItem({ question, answer, index }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={cn(
        "rounded-lg border border-white/10",
        "transition-all duration-300",
        isOpen ? "bg-white/5 shadow-lg" : "hover:bg-white/5"
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between gap-4 px-6 py-4"
      >
        <h3
          className={cn(
            "text-left text-base font-medium",
            isOpen ? "text-pink-400" : "text-white/80"
          )}
        >
          {question}
        </h3>

        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={cn(
            "rounded-full p-1",
            isOpen ? "text-pink-400" : "text-white/50"
          )}
        >
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-white/10 px-6 pb-4 pt-2">
              <p className="text-sm leading-relaxed text-white/60">
                {answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ---------------- Main Component ---------------- */
export default function Faq3() {
  const faqs = [
    {
      question: "What makes MVPBlocks unique?",
      answer:
        "MVPBlocks stands out through its intuitive design, powerful component library, and seamless integration options.",
    },
    {
      question: "How can I customize the components?",
      answer:
        "All components are built with Tailwind CSS and can be customized via class names and theme variables.",
    },
    {
      question: "Do the components work with dark mode?",
      answer:
        "Yes, all components support dark mode automatically.",
    },
    {
      question: "How can I get started with MVPBlocks?",
      answer:
        "Browse the component library, copy the code, and integrate it directly into your project.",
    },
    {
      question: "Can I use MVPBlocks for commercial projects?",
      answer:
        "Yes! MVPBlocks is free for both personal and commercial use.",
    },
  ];

  return (
    <section className="relative w-full overflow-hidden bg-black py-20">
      {/* Pink glow background */}
      <div className="absolute top-20 -left-20 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />
      <div className="absolute bottom-20 -right-20 h-64 w-64 rounded-full bg-pink-500/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <Badge>FAQs</Badge>

          <h2 className="mt-4 bg-gradient-to-r from-pink-500 to-rose-400 bg-clip-text text-3xl font-bold text-transparent">
            Frequently Asked Questions
          </h2>

          <p className="mt-2 text-sm text-white/60">
            Everything you need to know
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} {...faq} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mx-auto mt-16 max-w-md rounded-xl border border-pink-500/30 bg-pink-500/10 p-6 text-center"
        >
          <div className="mx-auto mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-pink-500/20 text-pink-400">
            <Mail className="h-4 w-4" />
          </div>

          <p className="text-sm font-medium text-white">
            Still have questions?
          </p>
          <p className="mt-1 text-xs text-white/60">
            We’re here to help you
          </p>

          <button className="mt-4 rounded-md bg-pink-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-pink-600">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
}
